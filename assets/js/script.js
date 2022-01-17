// grabbing elements to manipulate
var queryEl = document.getElementById("query-section");
var formEl = document.getElementById("search-form");
var queryListEl = document.getElementById("query-list");
var queryInput = document.getElementById("city-search");
var clearBtn = document.getElementById("clear-btn");
var searchBtn = document.getElementById("search-btn");

// creating array to hold queries
var queryArr = [];

// global variables
queryId = 0;
var apiKey = "2d35594800ba27da2a5d3b9ee479f19f";
var oneCallUrl = "";




/**********************API_FUNCTIONS_START******************************/
var firstCall = function(input) {
    var currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + input.value.toLowerCase() + "&appid=" + apiKey;
    fetch(currentWeatherUrl)
    .then(function(response){
        if(response.ok) {
            response.json().then(function(data) {
                console.log(data);
                // console.log(data.coord);
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
            })
        }
    })
};
/**********************API_FUNCTIONS_END******************************/

/**********************WEATHER_FUNCTIONS_START******************************/
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