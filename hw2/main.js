// var imgCardList = ["user2", "user3", "user6", "user7"];

var user1 = {displayName: "Eddie",
			 emailAddress: "abc@aol.com",
			 phoneNumber: "315-244-6088",
			 zipcode: "77065",
			 password: "abc",
			 passwordConfirmation: "abc",
			 contents: ["<img src='http://goo.gl/bt1Y2N' title='jinjya'><br>This is the most famous place in Kyoto",
			 			"<img src='http://goo.gl/WyFqUc' title='bamboo'>"]};



// This function is triggered with onload event 
// and give each card a random interval.
function initSlideInterval() {
	// imgCardList.forEach(setSlideInterval(user))
	document.getElementById("user1").innerHTML = user1.contents[0];
	user1.interval = setInterval(slideUpdate, 1000, "user1", user1.contents);
	// document.getElementById("user4").innerHTML = "Hello World";
}

function update(btnUser) {
	if (document.getElementById(btnUser).value == "Stop") {
		document.getElementById(btnUser).value = "Start";

	}
}

function setSlideInterval(user) {

}

// This function will change the content
// of the card for a given user.
function slideUpdate(user, contents) {
	document.getElementById(user).innerHTML = contents[getRandomInt(0, 1)]
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