#pragma strict

// Trackable does nothing except inform the HUD component that the current
// GameObject should be tracked in the HUD.
//
// @author Lauren Tomasello <lauren@tomasello.me>

function Start () {
	Camera.main.GetComponent.<HUD>().AddTrackable(gameObject);
}