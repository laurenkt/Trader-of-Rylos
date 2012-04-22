#pragma strict

// Moves the gameObject each frame based up `mainSpeed`, `pitchSpeed`,
// and `rollSpeed`.
//
// @author Lauren Tomasello <lauren@tomasello.me>

@HideInInspector public var mainSpeed  :float = 0;
@HideInInspector public var pitchSpeed :float = 0;
@HideInInspector public var rollSpeed  :float = 0;

function Update() {
	MoveBySpeed(mainSpeed);
	PitchBySpeed(pitchSpeed);
	RollBySpeed(rollSpeed);
}

function MoveBySpeed(speed : float) {
	transform.Translate(Vector3.up * speed * Time.deltaTime);
}

function PitchBySpeed(speed : float) {
	transform.Rotate(Vector3.up * speed * Time.deltaTime);
}

function RollBySpeed(speed : float) {
	transform.Rotate(Vector3.right * speed * Time.deltaTime);
}