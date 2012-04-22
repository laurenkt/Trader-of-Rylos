#pragma strict

// Manages the interaction of all ship operations.
//
// @author Lauren Tomasello <lauren@tomasello.me>

@script RequireComponent(Propulsion)

class Ship extends MonoBehaviour implements ControlsDelegate {

	@SerializeField private var controls:Controls;
	@SerializeField private var exhaust:Exhaust;
	
	private var engine:Engine = Engine();
	private var propulsion:Propulsion;
	private var weapon:int = 0;
	private var weapons = Array();
	
	private var sternThrusting     = false;
	private var bowThrusting       = false;
	private var portThrusting      = false;
	private var starboardThrusting = false;
	private var upThrusting        = false;
	private var downThrusting      = false;
	
	private var listeners = Array();
	
	function AddListener(listener:ShipListener) {
		listeners.Push(listener);
	}
	
	function NotifyListeners() {
		for (var listener in listeners) {
			(listener as ShipListener).OnSpeedChange(propulsion.mainSpeed, propulsion.pitchSpeed, propulsion.rollSpeed);
			(listener as ShipListener).OnThrustChange(engine.stern.current, engine.bow.current, engine.port.current,
				engine.starboard.current, engine.up.current, engine.down.current);
		}
	}
	
	function Start() {
		propulsion = GetComponent.<Propulsion>();
		weapons = GetComponentsInChildren.<Cannon>();
		controls.Delegate = this;
	}
	
	function Update() {
		engine.stern.Adjust(sternThrusting, Time.deltaTime);
		engine.bow.Adjust(bowThrusting, Time.deltaTime);

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
		
		if (propulsion.mainSpeed < 0) propulsion.mainSpeed = 0;
		else if (propulsion.mainSpeed > 10) propulsion.mainSpeed = 10;
		
		exhaust.intensity = engine.stern.current;
	}
	
	function LateUpdate() {
		NotifyListeners();
	}
	
	// implementing ControlsDelegate:
	
	function OnWeaponFire() {
		var cannon = weapons[weapon] as Cannon;
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