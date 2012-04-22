#pragma strict

// Interface for objects that want to listen for notifications about
// changes about a ship.

interface ShipListener {
	function OnSpeedChange(main:float, pitch:float, roll:float);
	function OnThrustChange(stern:float, bow:float, port:float, starboard:float, up:float, down:float);
}