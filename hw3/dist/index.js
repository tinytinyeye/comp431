$(window).load(function() {

	// Validate input info when submit button is clicked.
	$("#btnSubmit").click(function() {
		return validate();
	})

	// Validate input info when login button is clicked.
	$("#btnLogin").click(function() {
		// Direct to main page if the input is not empty
		if ($("#id").val() != "" && $("#pwd").val() != "") {
			window.location.href = "main.html";
		}
	})

})

// Function for validation
function validate() {
	form = document.getElementById("regForm");
	if (!validAccount(form)) { // Validate account name.
		invalidAlert("<strong>Invalid!</strong> \
			Account name can only be upper or lower case letters \
			and numbers, but may not start with a number.");
		return false;
	} else if (!validEmail(form)) { // Validate email address.
		invalidAlert("<strong>Invalid!</strong> Please enter a valid email address.");
		return false;
	} else if (!validPhone(form)) { // Validate phone number.
		invalidAlert("<strong>Invalid!</strong> Please enter a valid phone number.");
		return false;
	} else if (!validBirthday(form)) { // Validate birthday.
		invalidAlert("<strong>Invalid!</strong> You need to be at least 18 to register.");
		return false;
	} else if (!validZipcode(form)) { // Validate zipcode.
		invalidAlert("<strong>Invalid!</strong> Please enter a valid zipcode.");
		return false
	} else if (!confirmPassword(form)) { // Validate password.
		invalidAlert("<strong>Invalid!</strong> Please enter the same password for confirmation.");
		return false
	} else {
		return true
	}
}

// Function to display alert
function invalidAlert(alertStr) {
	// Display "close" icon on Bootstrap alert
	var closeHtml = "<a href='#'' class='close' data-hide='alert' aria-label='close'>&times;</a>"
	$("#alert").show();
	$("#alert").html(closeHtml + alertStr);
	// Hide alert notification when "close" is clicked.
	$("[data-hide]").on("click", function() {
        $("." + $(this).attr("data-hide")).hide();
    });
}

function validAccount(form) {
	var account = form.account.value
	return account.match(/^([A-Za-z])[A-Za-z0-9]*$/)
}

function validEmail(form) {
	var email = form.email.value
	return email.match(/([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})/g)
}

function validPhone(form) {
	var phone = form.phone.value
	return phone.match(/\d{3}-\d{3}-\d{4}/g)
}

function validBirthday(form) {
	var birthday = new Date(Date.parse(form.birthday.value))
	var today = new Date()
	var cutoffDate = new Date()
	// Compute cutoff date for age validation.
	cutoffDate.setFullYear(today.getFullYear() - 18, today.getMonth(), today.getDate())
	if (birthday < cutoffDate) {
		return true
	} else {
		return false
	}
}

function validZipcode(form) {
	var zipcode = form.zipcode.value
	return zipcode.match(/^\d{5}(-\d{4})?$/)
}

function confirmPassword(form) {
	var pwd = form.pwd.value
	var pwdConfirm = form.pwdConfirm.value
	if (pwd == pwdConfirm) {
		return true
	} else {
		return false
	}
}