// User information
var user = {displayName: "Eddie",
			emailAddress: "abc@aol.com",
			phoneNumber: "315-244-6088",
			zipcode: "77065",
			password: "abc",
			passwordConfirmation: "abc"};

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
	return email.match(/([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})/g)
}

function validPhone() {
	var phone = document.getElementById("phoneNumber").value;
	return phone.match(/\d{3}-\d{3}-\d{4}/g)
}

function validZipcode() {
	var zipcode = document.getElementById("zipcode").value;
	return zipcode.match(/^\d{5}(-\d{4})?$/)
}

function confirmPassword() {
	var pwd = document.getElementById("password").value;
	var pwdConfirm = document.getElementById("pwdConfirm").value;
	if (pwd == pwdConfirm) {
		return true
	} else {
		return false
	}
}

function updateProfile() {
	user.displayName = document.getElementById("emailAddress").value;
	user.phoneNumber = document.getElementById("phoneNumber").value;
	user.zipcode = document.getElementById("zipcode").value;
	user.password = document.getElementById("password").value;
	user.pwdConfirm = document.getElementById("pwdConfirm").value;
	loadProfile();
}

function returnHome() {
	window.location.replace("main.html")
}