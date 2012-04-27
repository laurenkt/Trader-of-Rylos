#pragma strict

// Class for storing engine data, includes inner-class `Thruster` for storing data
// on particular thrusters.
//
// @author Lauren Tomasello <lauren@tomasello.me>

class Engine extends Component {

	class Thruster {
		var output:float = 0;
		var force:float;
		
		function Thruster(force:float) {
			this.force = force;
		}
		
		function Set(value:float) {
			this.output = Mathf.Clamp01(value);
		}
	}

	var forward   = new Thruster(20);
	var backward  = new Thruster(10);
	var left      = new Thruster(10);
	var right     = new Thruster(10);
	var up        = new Thruster(10);
	var down      = new Thruster(10);
	var clockwise = new Thruster(10);
	var counter   = new Thruster(10);

}