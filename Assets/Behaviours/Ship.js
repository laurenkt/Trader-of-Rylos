#pragma strict

// Manages the interaction of all ship operations. Delegates a lot of responsibility
// to other components, i.e. Propulsion, Weapon, Engine...
//
// @author Lauren Tomasello <lauren@tomasello.me>

import System.Collections.Generic;

@script RequireComponent(Propulsion)

class Ship extends MonoBehaviour {

	private var engine:Engine;
	private var exhaust:Exhaust;
	private var propulsion:Propulsion;
	private var weapon:int = 0;
	private var weapons:Cannon[] = new Cannon[2];
	
	private var maxForward:float = 10;
	private var maxRotational:Vector3 = Vector3(100, 100, 100);
	
	private var listeners = List.<ShipListener>();
	
	function AddListener(listener:ShipListener) {
		listeners.Add(listener);
	}
	
	function NotifyListeners() {
		// notify all the ShipListeners in listeners of the ShipListener callbacks
		// we do it this way so that modules like the HUD need have no knowledge of
		// how ship physics are implemented, they only need the values.
		for (var listener in listeners) {
			listener.OnSpeedChange(propulsion.forward, propulsion.rotational.x, propulsion.rotational.y);
			listener.OnThrustChange(engine.forward.output, engine.backward.output, engine.left.output,
				engine.right.output, engine.up.output, engine.down.output);
		}
	}
	
	function Start() {
		engine     = new Engine();
		propulsion = GetComponent.<Propulsion>();
		exhaust    = GetComponentInChildren.<Exhaust>();
		weapons    = GetComponentsInChildren.<Cannon>();
	}
	
	var forwardTarget:float;
	var rotationalTarget:Vector3 = Vector3.zero;
	
	function Update() {
		if (Input.GetButtonDown("Fire1")) OnWeaponFire();
		
		forwardTarget      = Input.GetAxis("Speed");
		rotationalTarget.x = Input.GetAxis("Horizontal");
		rotationalTarget.y = Input.GetAxis("Vertical");
		rotationalTarget.z = Input.GetAxis("Pitch");
		
		engine.forward.Set  (forwardTarget - (propulsion.forward/maxForward));
		engine.backward.Set (-(forwardTarget - (propulsion.forward/maxForward)));
		engine.right.Set    (rotationalTarget.x - (propulsion.rotational.x/maxRotational.x));
		engine.left.Set     (-(rotationalTarget.x - (propulsion.rotational.x/maxRotational.x)));
		engine.up.Set       (rotationalTarget.y - (propulsion.rotational.y/maxRotational.y));
		engine.down.Set     (-(rotationalTarget.y - (propulsion.rotational.y/maxRotational.y)));
		engine.clockwise.Set(rotationalTarget.z - (propulsion.rotational.z/maxRotational.z));
		engine.counter.Set  (-(rotationalTarget.z - (propulsion.rotational.z/maxRotational.z)));
		
		propulsion.forward      += (engine.forward.output   - engine.backward.output);
		propulsion.rotational.x += (engine.right.output     - engine.left.output);
		propulsion.rotational.y += (engine.up.output        - engine.down.output);
		propulsion.rotational.z += (engine.clockwise.output - engine.counter.output);
		
		// Having a maximum speed is unrealistic.. but having no maximum speed
		// *feels* unrealistic when playing, and very hard to control.
		propulsion.forward      = Mathf.Clamp(propulsion.forward, 0, maxForward);
		propulsion.rotational.x = Mathf.Clamp(propulsion.rotational.x, -maxRotational.x, maxRotational.x);
		propulsion.rotational.y = Mathf.Clamp(propulsion.rotational.y, -maxRotational.y, maxRotational.y);
		propulsion.rotational.z = Mathf.Clamp(propulsion.rotational.z, -maxRotational.z, maxRotational.z);
		
		exhaust.intensity = propulsion.forward/maxForward;
	}
	
	function LateUpdate() {
		// do this in LateUpdate because there's no point notifying about changes before
		// we know what the changes actually are.
		NotifyListeners();
	}
	
	// implementing ControlsDelegate:
	
	function OnWeaponFire() {
		var cannon:Cannon = weapons[weapon];
		cannon.Fire();
		
		if (++weapon == weapons.length) weapon = 0;
	}
	
}