// grabbing elements to manipulate
var queryEl = document.getElementById("query-section");
var formEl = document.getElementById("search-form");
var queryListEl = document.getElementById("query-list");
var queryInput = document.getElementById("city-search");
var urlInput = queryInput.value.toLowerCase();
var weatherEl = document.getElementById("weather-section");
var clearBtn = document.getElementById("clear-btn");
var searchBtn = document.getElementById("search-btn");

// creating array to hold queries
var queryArr = [];

// global variables
queryId = 0;
var apiKey = "2d35594800ba27da2a5d3b9ee479f19f";


// // The date format method is taken from the  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
// var date=new Date(response.dt*1000).toLocaleDateString();
// var date = new Date(data.daily[0].dt*1000).toLocaleDateString();

/**********************API_FUNCTIONS_START******************************/
var firstCall = function(input) {
    var currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + input + "&appid=" + apiKey;
    fetch(currentWeatherUrl)
    .then(function(response){
        if(response.ok) {
            response.json().then(function(data) {
                // console.log(data);
                displayFirstCallData(data);
                secondCall(data.coord.lat, data.coord.lon);
            })
        }
    })
};

var secondCall = function(lat, long) {
    var openCallUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&exclude={part}&appid=" + apiKey + "&units=metric";
    fetch(openCallUrl)
    .then(function(response){
        if(response.ok) {
            response.json().then(function(data) {
                // console.log(data);
                currentWeatherDisplay(data);
                forecastDisplay(data);
            })
        }
    })
};
/**********************API_FUNCTIONS_END******************************/

/**********************WEATHER_FUNCTIONS_START******************************/
var displayFirstCallData = function(data) {
    var currentSectionEl = document.createElement("div");
    currentSectionEl.setAttribute("id", "current-weather");
    currentSectionEl.classList.add("ms-3");

    var currentWeatherHeader = document.createElement("div");
    currentWeatherHeader.setAttribute("id", "current-header");
    currentWeatherHeader.classList.add("header");
    currentSectionEl.appendChild(currentWeatherHeader);

    var currentCityEl = document.createElement("h3");
    currentCityEl.setAttribute("id", "current-city");
    currentCityEl.classList.add("d-inline", "mx-2");
    currentCityEl.textContent = data.name;
    currentWeatherHeader.appendChild(currentCityEl);
    weatherEl.appendChild(currentSectionEl);
};

var currentWeatherDisplay = function(data) {
    var currentSectionEl = document.getElementById("current-weather");
    var currentWeatherHeader = document.getElementById("current-header")

    var date = new Date(data.current.dt*1000).toLocaleDateString();
    var currentDate = document.createElement("h3");
    currentDate.setAttribute("id", "current-date");
    currentDate.classList.add("d-inline");
    currentDate.textContent = date;
    currentWeatherHeader.appendChild(currentDate);

    var currentIcon = document.createElement("img");
    currentIcon.setAttribute("src", "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png")
    currentIcon.setAttribute("id", "current-icon");
    currentIcon.classList.add("d-inline", "icon", "bg-secondary", "rounded-circle");
    currentWeatherHeader.appendChild(currentIcon);

    var temperature = data.current.temp;
    var currentTemp = document.createElement("p");
    currentTemp.setAttribute("id", "current-temp");
    currentTemp.classList.add("temp");
    currentTemp.textContent = "Temp: " + temperature + "°C";
    currentSectionEl.appendChild(currentTemp);

    var currentWind = document.createElement("p");
    currentWind.setAttribute("id", "current-wind");
    currentWind.classList.add("wind");
    currentWind.textContent = "Wind: " + data.current.wind_speed + " MPH";
    currentSectionEl.appendChild(currentWind);

    var currentHumidity = document.createElement("p");
    currentHumidity.setAttribute("id", "current-temp");
    currentHumidity.classList.add("humidity");
    currentHumidity.textContent = "Humidity: " + data.current.humidity + " %";
    currentSectionEl.appendChild(currentHumidity);

    var currentUvi = document.createElement("p");
    currentUvi.setAttribute("id", "current-uvi");
    currentUvi.classList.add("uvi", "text-white");
    if (data.current.uvi < 2.5) {
        currentUvi.classList.add("bg-success");
    } else if (data.current.uvi < 5.5) {
        currentUvi.classList.add("bg-warning");
    } else {
        currentUvi.classList.add("bg-danger");
    }
    currentUvi.textContent = "UV Index: " + data.current.uvi;
    currentSectionEl.appendChild(currentUvi);
};

var forecastDisplay = function(data) {
    var forecastSectionEl = document.createElement("div");
    forecastSectionEl.setAttribute("id", "forecast");
    forecastSectionEl.classList.add("container");
    weatherEl.appendChild(forecastSectionEl);

    var forecastTitleEl = document.createElement("h3");
    forecastTitleEl.setAttribute("id", "forecast-title");
    forecastTitleEl.classList.add("forecast-title");
    forecastTitleEl.textContent = "5-Day Forecast";
    forecastSectionEl.appendChild(forecastTitleEl);
    
    var forecastRowEl = document.createElement("div");
    forecastRowEl.setAttribute("id", "forecast-row");
    forecastRowEl.classList.add("row", "justify-content-evenly");
    forecastSectionEl.appendChild(forecastRowEl);

    for (var i=0; i<5; i++) {
        var forecastCard = document.createElement("div");
        forecastCard.setAttribute("id", "forecast-card" + i)
        forecastCard.classList.add("col-12", "col-md-3", "col-lg-2","m-1", "p-3", "bg-light");
        forecastRowEl.appendChild(forecastCard);
            
        var date = new Date(data.daily[i+1].dt*1000).toLocaleDateString();
        var forecastDate = document.createElement("h4");
        forecastDate.setAttribute("id", "forecast-date");
        forecastDate.classList.add("date");
        forecastDate.textContent = date;
        forecastCard.appendChild(forecastDate);

        var forecastIcon = document.createElement("img");
        forecastIcon.setAttribute("src", "http://openweathermap.org/img/wn/" + data.daily[i+1].weather[0].icon + "@2x.png")
        forecastIcon.setAttribute("id", "forecast-icon");
        forecastIcon.classList.add("bg-secondary", "icon", "rounded-circle");
        forecastCard.appendChild(forecastIcon);

        var temperature = data.daily[i+1].temp.day;
        var forecastTemp = document.createElement("p");
        forecastTemp.setAttribute("id", "forecast-temp");
        forecastTemp.classList.add("temp");
        forecastTemp.textContent = "Temp: " + temperature + "°C";
        forecastCard.appendChild(forecastTemp);

        var forecastWind = document.createElement("p");
        forecastWind.setAttribute("id", "forecast-wind");
        forecastWind.classList.add("wind");
        forecastWind.textContent = "Wind: " + data.daily[i+1].wind_speed + "MPH";
        forecastCard.appendChild(forecastWind);

        var forecastHumidity = document.createElement("p");
        forecastHumidity.setAttribute("id", "forecast-temp");
        forecastHumidity.classList.add("humidity");
        forecastHumidity.textContent = "Humidity: " + data.daily[i+1].humidity + " %";
        forecastCard.appendChild(forecastHumidity);
    };
};

var removeWeatherData = function() {
    var currentWeatherEl = document.getElementById("current-weather");
    var forecastEl = document.getElementById("forecast");

    if (!currentWeatherEl) {
        return false;
    } else {
        currentWeatherEl.remove();
        forecastEl.remove();
    }
};
/**********************WEATHER_FUNCTIONS_END******************************/

/**********************QUERY_FUNCTIONS_START******************************/
var formSubmitHandler = function(event) {
    event.preventDefault();
    if (!queryInput.value) {
        alert("Field cannot be left empty.");
        return false;
    } else {
        queryObj = {
            name: queryInput.value.toLowerCase(),
        };
        createQueryBtns(queryObj);
        removeWeatherData();
        firstCall(queryInput.value);
        queryInput.value = "";
    }
};

var createQueryBtns = function(obj) {
    // var queryListItem = document.createElement("li");
    // queryListItem.setAttribute("id", queryId);
    // queryListItem.classList.add("list-group-item", "w-100", "mb-1");

    var queryItemContainer = document.createElement("div");
    queryItemContainer.setAttribute("id", queryId);
    queryItemContainer.classList.add("row", "w-100", "btn-group");
    // queryListItem.appendChild(queryItemContainer);
    
    var queryBtn = document.createElement("button");
    queryBtn.setAttribute("id", "query");
    queryBtn.setAttribute("data-query", obj.name);
    queryBtn.textContent = obj.name;
    queryBtn.classList.add("col-9", "col-sm-9", "col-lg-9", "btn", "btn-outline-dark", "w-85");
    queryItemContainer.appendChild(queryBtn);

    var queryDeleteBtn = document.createElement("button");
    queryDeleteBtn.textContent = "x";
    queryDeleteBtn.setAttribute("id", "delete");
    queryDeleteBtn.setAttribute("data-index", queryId);
    queryDeleteBtn.classList.add("col-1", "col-sm-1", "col-lg-1", "btn", "btn-outline-danger");
    queryItemContainer.appendChild(queryDeleteBtn);
    queryListEl.appendChild(queryItemContainer);

    obj.id = queryId;
    queryArr.push(obj);
    saveQueries();
    queryId++
};

var saveQueries = function() {
    localStorage.setItem("queries", JSON.stringify(queryArr));
};

var renderQueries = function() {
    var savedQueries = localStorage.getItem("queries");

    if (!savedQueries) {
      return false;
    }
  
    savedQueries = JSON.parse(savedQueries);
  
    for (var i = 0; i < savedQueries.length; i++) {
      createQueryBtns(savedQueries[i]);
    }
};

var updateQueries = function(index) {
    var updatedQueryArr = [];

    for (var i = 0; i < queryArr.length; i++) {
        if (queryArr[i].id !== parseInt(index)) {
            updatedQueryArr.push(queryArr[i]);
        }
    }
    queryArr = updatedQueryArr;
    saveQueries();
};

var clearQueries = function() {
    queryArr = [];
    localStorage.setItem("queries", JSON.stringify(queryArr));
    var queriesToClear = queryListEl.querySelectorAll(".btn-group");
    for (i = 0; i < queriesToClear.length; i++) {
        queriesToClear[i].remove();
    }
};

var deleteQueryBtn = function(index) {
    // console.log(index)
    var queryToDelete = document.getElementById(index);
    console.log(queryToDelete)
    queryToDelete.remove();
    updateQueries(index);
}; 

var searchQueries = function(input) {
    removeWeatherData();
    firstCall(input);
};

var queryActionsHandler = function(event) {
    var clickedEl = event.target;

    if (clickedEl.matches("#delete")) {
        // console.log("delete", clickedEl);
        var queryIndex = clickedEl.getAttribute("data-index");
        deleteQueryBtn(queryIndex);
    } else if (clickedEl.matches("#query")) {
        var queryCity = clickedEl.getAttribute("data-query");
        // console.log(queryCity);
        searchQueries(queryCity);
        console.log("query", clickedEl);
    }
};

var searchSavedQuery = function() {
    // console.log("loaded");
    var savedQueries = localStorage.getItem("queries");

    if (!savedQueries) {
      return false;
    } else {
        var parsedQueries = JSON.parse(savedQueries);
        // console.log(parsedQueries);
        var firstQuery = parsedQueries[0].name;
        firstCall(firstQuery);
    }

}
/**********************QUERY_FUNCTIONS_END******************************/

// event listeners
formEl.addEventListener("submit", formSubmitHandler);
clearBtn.addEventListener("click", clearQueries);
queryListEl.addEventListener("click", queryActionsHandler);
// searchBtn.addEventListener("click", firstCall(queryInput));

// on page load
renderQueries();
searchSavedQuery();