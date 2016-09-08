// User information
var user = {displayName: "Eddie",
			emailAddress: "abc@aol.com",
			phoneNumber: "315-244-6088",
			zipcode: "77065",
			password: "abc",
			pwdConfirm: "abc"};

window.onload = loadProfile;

function loadProfile() {
	document.getElementById("currentDisplayName").innerHTML = user.displayName;
	document.getElementById("currentEmailAddress").innerHTML = user.emailAddress;
	document.getElementById("currentPhoneNumber").innerHTML = user.phoneNumber;
	document.getElementById("currentZipcode").innerHTML = user.zipcode;
	document.getElementById("btnUpdate").addEventListener("click", validate);
	document.getElementById("btnReturn").addEventListener("click", returnHome);
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
			return true
		} else {
			return false
		}
	} else {
		return true;
	}
}

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

function clearInput() {
	Object.keys(user).forEach(function(key) {
		document.getElementById(key).value = "";
	});
}

function returnHome() {
	window.location.replace("main.html")
}