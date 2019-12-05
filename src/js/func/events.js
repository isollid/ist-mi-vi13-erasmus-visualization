// Global variables used in all of the scripts
var studentDirection = "incoming";
var selectedCountry = "";

var events = d3.dispatch("stateOnMouseOver", "stateOnMouseOut", "stateSelectedEvent", "studentDirectionEvent", "sankeyNodeOnMouseOver", "sankeyNodeOnMouseOut", "barOnMouseOver",   "barOnMouseOut");

/**
 * Assert that the country code is valid. Empty is saved as "".
 * @param code Country code in 2 lowercased letters such as "cz".
 */
function assertStateCode(code) {
    if (!["", "at", "be", "bg", "ch", "cy", "cz", "de", "dk", "ee", "es", "fi", "fr",
        "gb", "gr", "hr", "hu", "ie", "is", "it", "li", "lt", "lu", "lv", "mt",
        "nl", "no", "pl", "pt", "ro", "se", "si", "sk", "tr"].includes(code)) {
        throw("Invalid country code \"" + code + "\".");
    }
}

/**
 * Assert that the direction is correct string.
 * @param direction Direction of the student. Values "incoming" or "outgoing".
 */
function assertStudentDirection(direction) {
    if (!["incoming", "outgoing"].includes(direction)) {
        throw("Invalid student direction \"" + direction + "\".");
    }
}

/**
 * Is called when hovered over a state.
 */
events.on("stateOnMouseOver", function(state){
    console.log("StateOnMouseOver called with \"" + state + "\"");
    assertStateCode(state);

    // Highlight the state on the map
    highlightState(state);
    //Highlight sankeynode
    highlightSankeyNode(state);
    //Highlight bar in barchart
    highlightBarchart(state);
});

events.on("sankeyNodeOnMouseOver", function(state){
    assertStateCode(state);
    highlightState(state);
    highlightBarchart(state);

});

events.on("sankeyNodeOnMouseOut", function(state){
    assertStateCode(state);
    highlightState("");
    highlightBarchart("");

});

events.on("barOnMouseOver", function(state){
    assertStateCode(state);
    highlightState(state);
    highlightBarchart(state);

});

events.on("barOnMouseOut", function(state){
    assertStateCode(state);
    highlightState("");
    highlightBarchart("");

});
/**
 * Is called when hovered off a state.
 */
events.on("stateOnMouseOut", function(state){
    console.log("StateOnMouseOut called with \"" + state + "\"");
    assertStateCode(state);
    unHighlightSankeyNode();
    // Cancel the highlight of the state in the map
    highlightState("");
    highlightBarchart("");
});

/**
 * Is called when a state is selected.
 */
events.on("stateSelectedEvent", function(code){
    console.log("StateSelectedEvent called with \"" + code + "\"");
    assertStateCode(code);

    // Update the global variable
    selectedCountry = code;

    // Hide or unhide the buttons
    let dirButtons = document.getElementById("student_direction");
    if (code === "") {
        dirButtons.classList.remove("visible");
        dirButtons.classList.add("hidden");
    } else {
        dirButtons.classList.remove("hidden");
        dirButtons.classList.add("visible");
    }

    // Set the dropdown
    document.getElementById("dropdown_country").value = selectedCountry;

    drawLines(selectedCountry);
    drawChloropleth();
    drawSankey(selectedCountry, studentDirection);
    drawBarchart();
});

/**
 * Is called when direction of the students is called.
 */
events.on("studentDirectionEvent", function(direction) {
    console.log("StudentDirectionEvent called with \"" + direction + "\"");
    assertStudentDirection(direction);

    // Update the global variable
    studentDirection = direction;

    // Set the direction buttons
    document.getElementById("student_direction").elements["direction"].value = direction;

    drawLines(selectedCountry);
    drawChloropleth();
    drawSankey(selectedCountry, studentDirection);
    drawBarchart();
});