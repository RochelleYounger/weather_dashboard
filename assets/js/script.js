// grabbing elements to manipulate
var queryEl = document.getElementById("query-section");
var formEl = document.getElementById("search-form");
var queryListEl = document.getElementById("query-list");
var queryInput = document.getElementById("city-search");
var clearBtn = document.getElementById("clear-btn");

// creating array to hold queries
var queryArr = [];

// global variables
queryId = 0;


/**********************QUERY_FUNCTIONS******************************/
var formSubmitHandler = function(event) {
    event.preventDefault();
    queryObj = {
        name: queryInput.value,
    };
    createQueryBtns(queryObj);

    queryInput.value = "";
};

// create btns with input value
var createQueryBtns = function(obj) {
    var queryListItem = document.createElement("li");
    queryListItem.setAttribute("id", queryId);

    var queryItemContainer = document.createElement("div");
    queryListItem.appendChild(queryItemContainer);
    
    var queryBtn = document.createElement("button");
    queryBtn.setAttribute("id", obj.name);
    queryBtn.textContent = obj.name;
    queryItemContainer.appendChild(queryBtn);
    queryListEl.appendChild(queryListItem);

    obj.id = queryId;
    queryArr.push(obj);
    console.log(queryArr);
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

var updateQueries = function() {};

var clearQueries = function() {
    queryArr = [];
    localStorage.setItem("queries", JSON.stringify(queryArr));
};

var deleteQueryBtn = function() {};

// event listeners
formEl.addEventListener("submit", formSubmitHandler);
clearBtn.addEventListener("click", clearQueries);

// on page load
renderQueries();