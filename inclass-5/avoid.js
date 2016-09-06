var btn;
var msg;

window.onload = function() {
	btn = document.getElementById("clickMe");
	msg = document.getElementById("msg");
	btn.addEventListener("mouseover", moveBtn, true);
	document.onkeydown = stop;
	btn.addEventListener("click", click, true);
	btn.value = "Click me";
}

function init() {
	btn.addEventListener("mouseover", moveBtn, true);
	msg.style.display = "none";
}

function moveBtn() {
	var newWidth = Math.floor(Math.random() * 800);
	var newHeight = Math.floor(Math.random() * 600);
	btn.style.left = newWidth + "px";
	btn.style.top = newHeight + "px";
}

function stop() {
	if (window.event.shiftKey) {
		btn.removeEventListener('mouseover', moveBtn, true);
	}
}

function click() {
	if (btn.value == "Click me") {
		btn.value = "Play again!";
		msg.style.display = "unset";
	} else {
		btn.value = "Click me"
		init();
	}
}