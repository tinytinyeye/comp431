// User information
var user = {displayName: "Eddie",
			emailAddress: "abc@aol.com",
			phoneNumber: "315-244-6088",
			zipcode: "77065",
			password: "abc",
			pwdConfirm: "abc"};

window.onload = loadProfile;

// This function displays user's current information
// on the side of input field.
function loadProfile() {
	document.getElementById("currentDisplayName").innerHTML = user.displayName;
	document.getElementById("currentEmailAddress").innerHTML = user.emailAddress;
	document.getElementById("currentPhoneNumber").innerHTML = user.phoneNumber;
	document.getElementById("currentZipcode").innerHTML = user.zipcode;
	document.getElementById("btnUpdate").addEventListener("click", validate);
	document.getElementById("btnReturn").addEventListener("click", returnHome);
	document.getElementById("btnReveal").addEventListener("click", revealPwd);
}

// Function for validation
function validate() {
	if (!validEmail()) { // Validate email address.
		window.alert("Please enter a valid email address.")
		return false
	} else if (!validPhone()) { // Validate phone number.
		window.alert("Please enter a valid phone number.")
		return false
	} else if (!validZipcode()) { // Validate zipcode.
		window.alert("Please enter a valid zipcode.")
		return false
	} else if (!confirmPassword()) { // Validate password.
		window.alert("Please enter the same password for confirmation.")
		return false
	} else {
		updateProfile();
		return true
	}
}

function validEmail() {
	var email = document.getElementById("emailAddress").value;
	if (email != "") {
		return email
			.match(/([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})/g);
	} else {
		return true;
	}
}

function validPhone() {
	var phone = document.getElementById("phoneNumber").value;
	if (phone != "") {
		return phone.match(/\d{3}-\d{3}-\d{4}/g);
	} else {
		return true;
	}
}

function validZipcode() {
	var zipcode = document.getElementById("zipcode").value;
	if (zipcode != "") {
		return zipcode.match(/^\d{5}(-\d{4})?$/);
	} else {
		return true;
	}
}

function confirmPassword() {
	var pwd = document.getElementById("password").value;
	var pwdConfirm = document.getElementById("pwdConfirm").value;
	if (pwd != "" && pwdConfirm != "") {
		if (pwd == pwdConfirm) {
			return true;
		} else {
			return false;
		}
	} else if ((pwd == "" && pwdConfirm != "") || 
			   (pwd != "" && pwdConfirm == "")) {
		return false;
	} else {
		return true;
	}
}

// This function updates the profile info
// with user's input.
function updateProfile() {
	var updateMsg = "";
	var input = "";
	Object.keys(user).forEach(function(key) {
		input = document.getElementById(key).value;
		if (user[key] != input && input != "") {
			updateMsg += key + " is changed from " + 
						 user[key] + " to " + input + ".\n"
			user[key] = input;
		}
	});
	window.alert(updateMsg);
	loadProfile();
	clearInput();
}

// This function clear all the input fields in profile page.
function clearInput() {
	Object.keys(user).forEach(function(key) {
		document.getElementById(key).value = "";
	});
}

// This function returns to home page.
function returnHome() {
	window.location.replace("main.html")
}

// This function reveals hidden password
function revealPwd() {
	document.getElementById("currentPassword").innerHTML = user.password;
	document.getElementById("btnReveal").style.display = "none";
}