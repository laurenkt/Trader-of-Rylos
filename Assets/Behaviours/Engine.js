#pragma strict

// Class for storing engine data, includes inner-class `Rocket` for storing data
// on particular thrusters.
//
// @author Lauren Tomasello <lauren@tomasello.me>

class Engine {

	class Rocket {
		var max : float;
		var current : float;
		var acceleration : float;
				
		function Rocket(current : float, max : float, acceleration : float) {
			this.max = max;
			this.current = current;
			this.acceleration = acceleration;
		}
		
		function Increase(t : float) {
			var proposed = current + acceleration*t;
				
			if (proposed <= max)
				current = proposed;
		}
				
		function Decrease(t : float) {
			var proposed = current - acceleration*t;
			
			if (proposed >= 0)
				current = proposed;
		}
		
		function Adjust(increase : boolean, t : float) {
			if (increase)
				Increase(t);
			else
				Decrease(t);
		}
		
		function Kill() {
			current = 0;
		}
	}

	var stern     = Rocket(0, 1.0, 0.2);
	var bow       = Rocket(0, 2.0, 0.15);
	var starboard = Rocket(0, 1.0, 0.6);
	var port      = Rocket(0, 1.0, 0.6);
	var up        = Rocket(0, 1.0, 0.6);
	var down      = Rocket(0, 1.0, 0.6);
	
}