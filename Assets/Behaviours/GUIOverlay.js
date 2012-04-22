#pragma strict

// GUIOverlay is a base class for behaviours that want to access common helpers
// for writing HUD/overlays.
//
// @author Lauren Tomasello <lauren@tomasello.me>

@script RequireComponent(GUILayer)

function HCenter(rect:Rect) :Rect {
	return Rect.MinMaxRect(
		Screen.width/2 + rect.xMin,
		rect.yMin,
		Screen.width/2 + rect.xMax,
		rect.yMax
	);
}

function VCenter(rect:Rect) :Rect {
	return Rect.MinMaxRect(
		rect.xMin,
		Screen.height/2 + rect.yMin,
		rect.xMax,
		Screen.height/2 + rect.yMax
	);
}

function Right(rect:Rect) :Rect {
	return Rect.MinMaxRect(
		Screen.width - rect.xMax,
		rect.yMin,
		Screen.width - rect.xMin,
		rect.yMax
	);
}

function Bottom(rect:Rect) :Rect {
	return Rect.MinMaxRect(
		rect.xMin,
		Screen.height - rect.yMax,
		rect.xMax,
		Screen.height - rect.yMin
	);
}