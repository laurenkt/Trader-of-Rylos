#pragma strict

// Manages the interaction of all ship operations. Delegates a lot of responsibility
// to other components, i.e. Propulsion, Weapon, Engine...
//
// @author Lauren Tomasello <lauren@tomasello.me>

import System.Collections.Generic;

@script RequireComponent(Propulsion)

class Ship extends MonoBehaviour implements ControlsDelegate {

	private var engine:Engine = Engine();

	private var exhaust:Exhaust;
	private var propulsion:Propulsion;
	private var weapon:int = 0;
	private var weapons:Cannon[] = new Cannon[2];
	
	private var sternThrusting     = false;
	private var bowThrusting       = false;
	private var portThrusting      = false;
	private var starboardThrusting = false;
	private var upThrusting        = false;
	private var downThrusting      = false;
	
	private var listeners = List.<ShipListener>();
	
	function AddListener(listener:ShipListener) {
		listeners.Add(listener);
	}
	
	function NotifyListeners() {
		// notify all the ShipListeners in listeners of the ShipListener callbacks
		// we do it this way so that modules like the HUD need have no knowledge of
		// how ship physics are implemented, they only need the values.
		for (var listener in listeners) {
			listener.OnSpeedChange(propulsion.mainSpeed, propulsion.pitchSpeed, propulsion.rollSpeed);
			listener.OnThrustChange(engine.stern.current, engine.bow.current, engine.port.current,
				engine.starboard.current, engine.up.current, engine.down.current);
		}
	}
	
	function Start() {
		propulsion = GetComponent.<Propulsion>();
		exhaust    = GetComponentInChildren.<Exhaust>();
		weapons    = GetComponentsInChildren.<Cannon>();
		
		// register for control delegate notifications
		Camera.main.GetComponent.<Controls>().delegate = this;
	}
	
	function Update() {
		engine.stern.Adjust(sternThrusting, Time.deltaTime);
		engine.bow.Adjust(bowThrusting, Time.deltaTime);

		// Self-righting mechanism...
		if (!portThrusting && !starboardThrusting) {
			if (propulsion.pitchSpeed < 0) {
				engine.port.Increase(Time.deltaTime);
				engine.starboard.Kill();
			}
			else if (propulsion.pitchSpeed > 0) {
				engine.starboard.Increase(Time.deltaTime);
				engine.port.Kill();
			}
		}
		else {
			engine.starboard.Adjust(starboardThrusting, Time.deltaTime);
			engine.port.Adjust(portThrusting, Time.deltaTime);
		}
				
		if (!upThrusting && !downThrusting) {
			if (propulsion.rollSpeed > 0) {
				engine.down.Increase(Time.deltaTime);
				engine.up.Kill();
			}
			else if (propulsion.rollSpeed < 0) {
				engine.up.Increase(Time.deltaTime);
				engine.down.Kill();
			}
		}
		else {
			engine.up.Adjust(upThrusting, Time.deltaTime);
			engine.down.Adjust(downThrusting, Time.deltaTime);
		}
		
		propulsion.mainSpeed  += (engine.stern.current - engine.bow.current);
		propulsion.pitchSpeed += (engine.port.current - engine.starboard.current);
		propulsion.rollSpeed  += (engine.up.current - engine.down.current);
		
		// Having a maximum speed is unrealistic.. but having no maximum speed
		// *feels* unrealistic when playing, and very hard to control.
		propulsion.mainSpeed = Mathf.Clamp(propulsion.mainSpeed, 0, 10);
		
		exhaust.intensity = engine.stern.current;
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
	
	function OnSternThrust()     {     sternThrusting = true; }
	function OnBowThrust()       {       bowThrusting = true; }
	function OnPortThrust()      {      portThrusting = true; }
	function OnStarboardThrust() { starboardThrusting = true; }
	function OnUpThrust()        {        upThrusting = true; }
	function OnDownThrust()      {      downThrusting = true; }

	function OffSternThrust()     {     sternThrusting = false; }
	function OffBowThrust()       {       bowThrusting = false; }
	function OffPortThrust()      {      portThrusting = false; engine.port.Kill(); }
	function OffStarboardThrust() { starboardThrusting = false; engine.starboard.Kill(); }
	function OffUpThrust()        {        upThrusting = false; engine.up.Kill(); }
	function OffDownThrust()      {      downThrusting = false; engine.down.Kill(); }

}