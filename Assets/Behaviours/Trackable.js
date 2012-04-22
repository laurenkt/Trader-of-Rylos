#pragma strict

function Start () {
	Camera.main.GetComponent.<HUD>().AddTrackable(gameObject);
}