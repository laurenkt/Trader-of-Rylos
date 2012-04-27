#pragma strict

// Trackable does nothing except inform the HUD component that the current
// GameObject should be tracked in the HUD.
//
// @author Lauren Tomasello <lauren@tomasello.me>

// can optionally give tracked items a label to display
public var label:String = "";
public var color:Color = Color.white;

function Start () {
	Camera.main.GetComponent.<HUD>().AddTrackable(gameObject);
}