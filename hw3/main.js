$(window).load(function() {

	// Clear input when cancel button is clicked.
	$("#btnCancel").click(function() {
		$("#post").val("");
	})

	// Change status headline when update is clicked.
	$("#btnUpdate").click(function() {
		if ($("#txtStatus").val() != "") {
			$("#status").html($("#txtStatus").val());
		}
	})
})