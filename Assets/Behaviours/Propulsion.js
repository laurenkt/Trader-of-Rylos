#pragma strict

// Moves the gameObject each frame based up `mainSpeed`, `pitchSpeed`,
// and `rollSpeed`.
//
// @author Lauren Tomasello <lauren@tomasello.me>

@HideInInspector public var forward:float = 0;
@HideInInspector public var rotational:Vector3 = Vector3.zero;

function Update() {
	TranslateBySpeed(forward);
	YawBySpeed(rotational.x);
	RollBySpeed(rotational.y);
	PitchBySpeed(rotational.z);
}

function TranslateBySpeed(speed : float) {
	transform.Translate(Vector3.up * speed * Time.deltaTime);
}

function YawBySpeed(speed : float) {
	transform.Rotate(Time.deltaTime * speed * Vector3.forward);
}

function PitchBySpeed(speed : float) {
	transform.Rotate(Time.deltaTime * speed * Vector3.up);
}

function RollBySpeed(speed : float) {
	transform.Rotate(Time.deltaTime * speed * Vector3.right);
}