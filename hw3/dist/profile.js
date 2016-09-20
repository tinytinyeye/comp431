// User information
var user = {displayName: "Frankie Huang",
			emailAddress: "abc@aol.com",
			phoneNumber: "315-244-6088",
			birthday: "12-25-1995", 
			zipcode: "77065",
			password: "abc",
			pwdConfirm: "abc"};

$(window).load(function() {

	loadProfile();

	$("#btnUpdate").click(function() {
		validate();
	});
})

// This function displays user's current information
// on the side of input field.
function loadProfile() {
	$("#currentDisplayName").html(user.displayName);
	$("#currentEmailAddress").html(user.emailAddress);
	$("#currentPhoneNumber").html(user.phoneNumber);
	$("#currentBrithday").html(user.birthday);
	$("#currentZipcode").html(user.zipcode);
}

// Function for validation
function validate() {
	if (!validEmail()) { // Validate email address.
		sendAlert(0, "<strong>Invalid!</strong> Please enter a valid email address.");
		return false
	} else if (!validPhone()) { // Validate phone number.
		sendAlert(0, "<strong>Invalid!</strong> Please enter a valid phone number.");
		return false
	} else if (!validZipcode()) { // Validate zipcode.
		sendAlert(0, "<strong>Invalid!</strong> Please enter a valid zipcode.");
		return false
	} else if (!confirmPassword()) { // Validate password.
		sendAlert(0, "<strong>Invalid!</strong> Please enter the same password for confirmation.");
		return false
	} else {
		updateProfile();
		return true
	}
}

// Function to display alert. 0 for invalid alert message
// and 1 for update success message.
function sendAlert(type, alertStr) {
	var closeHtml = "<a href='#'' class='close' data-hide='alert' aria-label='close'>&times;</a>"
	// Invalid alert
	if (type == 0) {
		$("#alert").show();
		$("#alert").html(closeHtml + alertStr);
	// Success alert
	} else {
		$("#alertS").show();
		$("#alertS").html(closeHtml + alertStr);
	}
	$("[data-hide]").on("click", function() {
        $("." + $(this).attr("data-hide")).hide();
    });
}

function validEmail() {
	var email = $("#emailAddress").val();
	if (email != "") {
		return email
			.match(/([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})/g);
	} else {
		return true;
	}
}

function validPhone() {
	var phone = $("#phoneNumber").val();
	if (phone != "") {
		return phone.match(/\d{3}-\d{3}-\d{4}/g);
	} else {
		return true;
	}
}

function validZipcode() {
	var zipcode = $("#zipcode").val();
	if (zipcode != "") {
		return zipcode.match(/^\d{5}(-\d{4})?$/);
	} else {
		return true;
	}
}

function confirmPassword() {
	var pwd = $("#password").val();
	var pwdConfirm = $("#pwdConfirm").val();
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
		if (document.getElementById(key) != null) {
			input = document.getElementById(key).value;
			if (user[key] != input && input != "") {
				updateMsg += "<strong>Success! </strong>" + key + 
				" is changed from " + user[key] + " to " + input + ". </br>"
				user[key] = input;
			}
		}
	});
	sendAlert(1, updateMsg);
	loadProfile();
	clearInput();
}

// This function clear all the input fields in profile page.
function clearInput() {
	Object.keys(user).forEach(function(key) {
		if (document.getElementById(key) != null) {
			document.getElementById(key).value = "";
		}
	});
}