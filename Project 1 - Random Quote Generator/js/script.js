// event listener to respond to "Show another quote" button clicks.
document.getElementById('loadQuote').addEventListener("click", refreshRandomQuote, false);
// event listener to respont to "Start the Party!" and "Stop the party..." button clicks.
document.getElementById('raveParty').addEventListener("click", startParty, false);

// Set a callback function to run every 10 seconds and call refreshRandomQuote
var intervalQuote = window.setInterval(refreshRandomQuote, 10000);

/*
 Return a random quote from the quotes array, and move the node to the displayedQuotes array
 so the page will not display it again before cycling through all of the quotes. When it
 has displayed each one, reset the arrays.
 */
function getRandomQuote() {
	if (quotes.length < 1) {
		quotes = displayedQuotes;
		displayedQuotes = [];
	}
	var index = getRandom(0, quotes.length);
	var saying = quotes.splice(index, 1)[0]; // splice returns an array so get the first index to get our object.
	displayedQuotes.push(saying);
	return saying;
}

// Convert 3 base10 random numbers between 0-255 to a base 16 string or hex value and concats them, this represents an rbg value in hex.
// Returns a random hex rbg value.
function getRandomColor() {
	return ('#' + getRandom(0, 255).toString(16) + 
				  getRandom(0, 255).toString(16) + 
				  getRandom(0, 255).toString(16));
}

// Set the background color of the html body to a random color.
function displayRandomColor() {
	document.body.style.backgroundColor = getRandomColor();
}

// Get a random number between two values (inclusive).
function getRandom(min, max) {
	return Math.floor((Math.random() * max) + min );
}

// Get a random quote and update the quote-box, only displaying the filled out properties.
function printQuote() {
	var quoteBox = document.getElementById("quote-box");
	var saying = getRandomQuote();
	var html = "<p class='quote'>" + saying.quote + "</p>";
	html += "<p class='source'>" + saying.source;
	if (saying.hasOwnProperty("citation") && saying.citation !== "") { // Optional Citation section
		html += "<span class='citation'>" + saying.citation + "</span>";
	}
	if (saying.hasOwnProperty("year") && saying.year !== "") { // Optional Year section
		html += "<span class='year'>" + saying.year + "</span>";
	}
	if (saying.hasOwnProperty("tags") && saying.tags.length > 0) { // Show any tags on quote
		html += "<p class='tags'>";
		for( var i = 0; i < saying.tags.length; i++) {
			html += "<span class='tag'>" + saying.tags[i] + "</span>";
		}
		html += "</p>";
	}
	html += "</p>";
	quoteBox.innerHTML = html;
}

// Change the Quote and page color. 
// Reset the auto-refresh to 10 seconds since we just changed the quote.
function refreshRandomQuote() {
	printQuote();
	displayRandomColor();
	window.clearInterval(intervalQuote);
	intervalQuote = window.setInterval(refreshRandomQuote, 10000);
}

// Having fun with the interval and color setting, make the page flashy, and give them a way back.
var party = false;
function startParty() {
	if (party) {
		document.getElementById("raveParty").innerHTML = "Start the Party!";
		window.clearInterval(intervalParty);
		intervalParty = window.setInterval(displayRandomColor, 10000);
		party = false;
	}
	else {
		document.getElementById("raveParty").innerHTML = "Stop the party...";
		intervalParty = window.setInterval(displayRandomColor, 250);
		party = true;
	}
}