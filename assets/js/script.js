// grabbing elements to manipulate
var queryEl = document.getElementById("query-section");
var formEl = document.getElementById("search-form");
var queryListEl = document.getElementById("query-list");
var queryInput = document.getElementById("city-search");

// creating array to hold queries
var queryArr = [];

// global variables
queryId = 0;

// create btns with input value
var createQueryBtns = function() {
    var queryListItem = document.createElement("li");
    queryListItem.setAttribute("id", queryId);
    var queryBtn = document.createElement("button");
    queryBtn.setAttribute("id", queryInput.value);
    queryBtn.textContent = queryInput.value;
    queryListItem.appendChild(queryBtn);
    queryListEl.appendChild(queryListItem);
    queryObj = {
        index: queryId,
        name: queryInput.value,
    };
    queryArr.push(queryObj);
    queryId++
};

var formSubmitHandler = function(event) {
    event.preventDefault();
    createQueryBtns();
    console.log(queryArr);
};

// event listeners
formEl.addEventListener("submit", formSubmitHandler);