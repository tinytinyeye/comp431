$(window).load(function() {
	$("#btnCancel").click(function() {
		$("#post").val("");
	})

	$("#btnUpdate").click(function() {
		if ($("#txtStatus").val() != "") {
			$("#status").html($("#txtStatus").val());
		}
	})
})