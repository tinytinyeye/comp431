// Contents for display
var contents = ["Lorem ipsum dolor sit amet, consectetur adipiscing\
			 	 elit, sed do eiusmod tempor incididunt ut labore et\
			 	 dolore magna aliqua. Ut enim ad minim veniam, quis \
			 	 nostrud exercitation ullamco laboris nisi ut aliquip\
			 	 ex ea commodo consequat. Duis aute irure dolor in \
			 	 reprehenderit in voluptate velit esse cillum dolore \
			 	 eu fugiat nulla pariatur. Excepteur sint occaecat cup\
			 	 idatat non proident, sunt in culpa qui officia deserun\
			 	 t mollit anim id est laborum.",
			 	 "Aenean eget tortor et ipsum convallis convallis non si\
			 	 t amet massa. Donec nec vestibulum sem. Sed et est moles\
			 	 tie, congue magna vitae, aliquet lacus. Ut in scelerisque\
			 	 ante. Curabitur ultricies est id consectetur suscipit. In\
			 	 ut lectus congue, dapibus lectus nec, hendrerit augue. Nu\
			 	 llam dignissim pretium dictum. Fusce maximus condimentum o\
			 	 rci at aliquet. Donec dictum eget leo non vehicula. Morbi \
			 	 consectetur dictum eros in rutrum. Sed quis rhoncus risus.",
			 	 "Curabitur quis malesuada neque. Nulla quis mi congue, aucto\
			 	 r ante id, cursus nunc. Vivamus dui nisl, pharetra quis ris\
			 	 useu, mattis congue mi. In pellentesque hendrerit eros eget \
			 	 port a. Praesent ut metus suscipit, aliquam arcu a, euismod \
			 	 mauris. Lorem ipsum dolor sit amet, consectetur adipiscing el\
			 	 it. Duis rhoncus, dui sed porttitor placerat, felis mauris he\
			 	 ndrerit tortor, non aliquet metus mi non ligula. Nunc velit \
			 	 purus, hendreritac pellentesque at, scelerisque non justo. \
			 	 Fusce ligula ex, sagittis sit amet justo ac, scelerisque faci\
			 	 lisis lectus. Ut in efficitur turpis. Mauris scelerisque dapi\
			 	 bus ligula, vel molestie risus viverra a. Donec in ultrices \
			 	 mauris. Nunc vestibulum quam mauris, sed sollicitudin quam \
			 	 eleifend fermentum.",
			 	 "<img src='http://goo.gl/bt1Y2N' title='jinjya'>\
			 	 </br>This is the most famous place in Kyoto",
			 	 "<img src='http://goo.gl/WyFqUc' title='bamboo'>",
			 	 "<img src='http://goo.gl/lHk1uZ' title='street'>",
			 	 "<img src='http://goo.gl/Cz9nZw' title='sakura'>",
			 	 "<img src='http://goo.gl/l8vlyU' title='redLeaf'>",
			 	 "<img src='http://goo.gl/684zvh' title='kimono'>",
			 	 "<img src='http://goo.gl/mj9WpW' title='take'>",
			 	 "<img src='http://goo.gl/XkQAMk' title='buddism'>",
			 	 "<img src='http://goo.gl/f5NBzz' title='hanami'>",
			 	 "<img src='http://goo.gl/jBAj9O' title='nigiyaka'>",
			 	 "<img src='http://goo.gl/jDe3VK' title='mizuumi'>",
			 	 "<img src='http://goo.gl/X6m34O' title='tokyoTower'>\
			 	 </br>This is Tokyo",
			 	 "<img src='http://goo.gl/HrPEc2' title='tokyoJou'>",
			 	 "<img src='http://goo.gl/8eilH4' title='shinjuku'>",
			 	 "<img src='http://goo.gl/rvrY9H' title='rain'>\
			 	 </br>Raining in Tokyo.",
			 	 "<img src='http://goo.gl/EKRHsx' title='night'>",
			 	 "<img src='http://goo.gl/G63yi6' title='tokyoeki'>",
			 	 "<img src='http://goo.gl/kJNNkh' title='shinjuku2'>",
			 	 "<img src='http://goo.gl/tktIlY' title='iseidan'>",
			 	 "<img src='http://goo.gl/xqL6ZU' title='gyoen'>"]

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