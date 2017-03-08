
var conveyorPositions = [
	0,
	-300,
	-600,
	-900,
	-1200,
	-1500,
	-1800,
	-2100,
	-2400
]

var currentConveyorPosition = 0;

var disabled = false;

var reenable = function() {
	disabled = false;
}

var moveLeft = function() {
	currentConveyorPosition--;
	if (currentConveyorPosition < 0) {
		currentConveyorPosition = conveyorPositions.length - 1;

		TweenMax.set(".items", {x: conveyorPositions[conveyorPositions.length-1]});
		currentConveyorPosition--;
	}

	disabled = true;

	TweenMax.to(".items", 0.3, {x: conveyorPositions[currentConveyorPosition], onComplete: reenable});
}


var moveRight = function() {
	currentConveyorPosition++;
	if (currentConveyorPosition >= conveyorPositions.length) {
		currentConveyorPosition = 0;
	}

	var resetConveyor = reenable;
	if (currentConveyorPosition == conveyorPositions.length - 1) {
		resetConveyor = function() {
			TweenMax.set(".items", {x: conveyorPositions[0]});
			currentConveyorPosition = 0;
			reenable();
		}
	}
	disabled = true;

	TweenMax.to(".items", 0.3, {x: conveyorPositions[currentConveyorPosition], onComplete: resetConveyor});

}

window.addEventListener("keydown", function() {
	if (disabled) return;
	if (event.code == "ArrowLeft") moveLeft();
	if (event.code == "ArrowRight") moveRight();
})