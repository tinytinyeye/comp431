// Contents for display
var contents = ["<img src='http://goo.gl/bt1Y2N' title='jinjya'><br>This is the most famous place in Kyoto",
			 	"<img src='http://goo.gl/WyFqUc' title='bamboo'>"]

// Array to store interval id.
var interval = [0, 0, 0, 0, 0, 0, 0, 0];

// Store reference to all cards on html.
var cards;

// Number of html elements available for display.
var length = contents.length;

window.onload = function() {
	cards = document.getElementsByClassName("card");
	// Initial all cards.
	Array.prototype.forEach.call(cards, init);
}

// This function initialize intervals and contents for each card.
// It also add event listener to each button.
function init(item, index) {
	item.innerHTML = contents[getRandomInt(0, length - 1)];
	interval[index] = setInterval(slideUpdate, getRandomInt(1, 5) * 1000, item);
	var btn = "btnCard" + (index + 1);
	document.getElementById(btn).addEventListener("click", function() {update(btn)})
}


// This function is triggered by the button of each card and
// decides if the contents in the card needs to change.
function update(btnCard) {
	// Obtain index of card
	var i = btnCard.substring(7) - 1;
	// If the content is changing
	if (document.getElementById(btnCard).value == "Stop") {
		document.getElementById(btnCard).value = "Start";
		clearInterval(interval[i]);
	} else {
		document.getElementById(btnCard).value = "Stop";
		interval[i] = setInterval(slideUpdate, getRandomInt(1, 5) * 1000, cards[i]);
	}
}

// This function will change the content
// of a given card.
function slideUpdate(card) {
	card.innerHTML = contents[getRandomInt(0, length - 1)]
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 *
 * Source: Mozilla Developer Network 
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}