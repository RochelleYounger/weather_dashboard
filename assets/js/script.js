// grabbing elements to manipulate
var queryEl = document.getElementById("query-section");
var formEl = document.getElementById("search-form");
var queryListEl = document.getElementById("query-list");
var queryInput = document.getElementById("city-search");
var weatherEl = document.getElementById("weather-section");
var clearBtn = document.getElementById("clear-btn");
var searchBtn = document.getElementById("search-btn");

// creating array to hold queries
var queryArr = [];

// global variables
queryId = 0;
var apiKey = "2d35594800ba27da2a5d3b9ee479f19f";
var oneCallUrl = "";


// // The date format method is taken from the  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
// var date=new Date(response.dt*1000).toLocaleDateString();
// var date = new Date(data.daily[0].dt*1000).toLocaleDateString();

/**********************API_FUNCTIONS_START******************************/
var firstCall = function(input) {
    var currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + input.value.toLowerCase() + "&appid=" + apiKey;
    fetch(currentWeatherUrl)
    .then(function(response){
        if(response.ok) {
            response.json().then(function(data) {
                console.log(data);
                displayFirstCallData(data);
                secondCall(data.coord.lat, data.coord.lon);
            })
        }
    })
};

var secondCall = function(lat, long) {
    var openCallUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&exclude={part}&appid=" + apiKey;
    fetch(openCallUrl)
    .then(function(response){
        if(response.ok) {
            response.json().then(function(data) {
                console.log(data);
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
    currentSectionEl.classList.add("current");

    var currentCityEl = document.createElement("h3");
    currentCityEl.setAttribute("id", "current-city");
    currentCityEl.classList.add("city");
    currentCityEl.textContent = data.name;
    currentSectionEl.appendChild(currentCityEl);
    weatherEl.appendChild(currentSectionEl);
};

var currentWeatherDisplay = function(data) {
    var currentSectionEl = document.getElementById("current-weather");

    var date = new Date(data.current.dt*1000).toLocaleDateString();
    var currentDate = document.createElement("p");
    currentDate.setAttribute("id", "current-date");
    currentDate.classList.add("date");
    currentDate.textContent = date;
    currentSectionEl.appendChild(currentDate);

    var currentIcon = document.createElement("img");
    currentIcon.setAttribute("src", "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png")
    currentIcon.setAttribute("id", "current-icon");
    currentIcon.classList.add("icon");
    currentSectionEl.appendChild(currentIcon);

    var temperature = data.current.temp;
    var currentTemp = document.createElement("p");
    currentTemp.setAttribute("id", "current-temp");
    currentTemp.classList.add("temp");
    currentTemp.textContent = temperature;
    currentSectionEl.appendChild(currentTemp);

    var currentHumidity = document.createElement("p");
    currentHumidity.setAttribute("id", "current-temp");
    currentHumidity.classList.add("humidity");
    currentHumidity.textContent = data.current.humidity;
    currentSectionEl.appendChild(currentHumidity);

    var currentWind = document.createElement("p");
    currentWind.setAttribute("id", "current-wind");
    currentWind.classList.add("wind");
    currentWind.textContent = data.current.wind_speed;
    currentSectionEl.appendChild(currentWind);

    var currentUvi = document.createElement("p");
    currentUvi.setAttribute("id", "current-uvi");
    currentUvi.classList.add("uvi");
    currentUvi.textContent = data.current.uvi;
    currentSectionEl.appendChild(currentUvi);
};

var forecastDisplay = function(data) {
    var forecastSectionEl = document.createElement("div");
    forecastSectionEl.setAttribute("id", "forecast");
    forecastSectionEl.classList.add("forecast");
    weatherEl.appendChild(forecastSectionEl);

    for (var i=0; i<5; i++) {
        var forecastCard = document.createElement("div");
        forecastCard.setAttribute("id", "forecast-card" + i)
        forecastCard.classList.add("card");
        forecastSectionEl.appendChild(forecastCard);
            
        var date = new Date(data.daily[i+1].dt*1000).toLocaleDateString();
        var forecastDate = document.createElement("p");
        forecastDate.setAttribute("id", "forecast-date");
        forecastDate.classList.add("date");
        forecastDate.textContent = date;
        forecastCard.appendChild(forecastDate);

        var forecastIcon = document.createElement("img");
        forecastIcon.setAttribute("src", "http://openweathermap.org/img/wn/" + data.daily[i+1].weather[0].icon + "@2x.png")
        forecastIcon.setAttribute("id", "forecast-icon");
        forecastIcon.classList.add("icon");
        forecastCard.appendChild(forecastIcon);

        var temperature = data.daily[i+1].temp.day;
        var forecastTemp = document.createElement("p");
        forecastTemp.setAttribute("id", "forecast-temp");
        forecastTemp.classList.add("temp");
        forecastTemp.textContent = temperature;
        forecastCard.appendChild(forecastTemp);

        var forecastWind = document.createElement("p");
        forecastWind.setAttribute("id", "forecast-wind");
        forecastWind.classList.add("wind");
        forecastWind.textContent = data.daily[i+1].wind_speed;
        forecastCard.appendChild(forecastWind);

        var forecastHumidity = document.createElement("p");
        forecastHumidity.setAttribute("id", "forecast-temp");
        forecastHumidity.classList.add("humidity");
        forecastHumidity.textContent = data.daily[i+1].humidity;
        forecastCard.appendChild(forecastHumidity);
    };
};
/**********************WEATHER_FUNCTIONS_END******************************/

/**********************QUERY_FUNCTIONS_START******************************/
var formSubmitHandler = function(event) {
    event.preventDefault();
    queryObj = {
        name: queryInput.value,
    };
    createQueryBtns(queryObj);
    firstCall(queryInput);
    queryInput.value = "";
};

// create btns with input value
var createQueryBtns = function(obj) {
    var queryListItem = document.createElement("li");
    queryListItem.setAttribute("id", queryId);

    var queryItemContainer = document.createElement("div");
    queryListItem.appendChild(queryItemContainer);
    
    var queryBtn = document.createElement("button");
    queryBtn.setAttribute("id", "query");
    queryBtn.setAttribute("data-query", obj.name);
    queryBtn.textContent = obj.name;
    queryItemContainer.appendChild(queryBtn);

    var queryDeleteBtn = document.createElement("button");
    queryDeleteBtn.textContent = "x";
    queryDeleteBtn.setAttribute("id", "delete");
    queryDeleteBtn.setAttribute("data-index", queryId);
    queryItemContainer.appendChild(queryDeleteBtn);
    queryListEl.appendChild(queryListItem);

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
    var queriesToClear = queryListEl.querySelectorAll("li");
    for (i = 0; i < queriesToClear.length; i++) {
        queriesToClear[i].remove();
    }
};

var deleteQueryBtn = function(index) {
    console.log(index)
    var queryToDelete = document.getElementById(index);
    queryToDelete.remove();
    updateQueries(index);
}; 

var queryActionsHandler = function(event) {
    var clickedEl = event.target;

    if (clickedEl.matches("#delete")) {
        console.log("delete", clickedEl);
        var queryIndex = clickedEl.getAttribute("data-index");
        deleteQueryBtn(queryIndex);
    } else if (clickedEl.matches("#query")) {
        console.log("query", clickedEl);
    }
};
/**********************QUERY_FUNCTIONS_END******************************/

// event listeners
formEl.addEventListener("submit", formSubmitHandler);
clearBtn.addEventListener("click", clearQueries);
queryListEl.addEventListener("click", queryActionsHandler);
// searchBtn.addEventListener("click", firstCall(queryInput));

// on page load
renderQueries();