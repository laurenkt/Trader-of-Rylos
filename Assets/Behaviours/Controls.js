#pragma strict

// Listens for input and informs anyone who registers interest.
//
// @author Lauren Tomasello <lauren@tomasello.me>

class Controls extends MonoBehaviour {

	@SerializeField private var sternThruster     : UnityEngine.KeyCode;
	@SerializeField private var bowThruster       : UnityEngine.KeyCode;
	@SerializeField private var portThruster      : UnityEngine.KeyCode;
	@SerializeField private var starboardThruster : UnityEngine.KeyCode;
	@SerializeField private var upThruster        : UnityEngine.KeyCode;
	@SerializeField private var downThruster      : UnityEngine.KeyCode;
	@SerializeField private var fire     		  : UnityEngine.KeyCode;
	
	private var delegate : ControlsDelegate;
	
	function set Delegate(value : ControlsDelegate) {
		delegate = value as ControlsDelegate;
	}
	
	function Update() {
		if (!delegate)
			return;
		
		if (Input.GetKeyDown(sternThruster))     delegate.OnSternThrust();
		if (Input.GetKeyDown(bowThruster))       delegate.OnBowThrust();
		if (Input.GetKeyDown(portThruster))      delegate.OnPortThrust();
		if (Input.GetKeyDown(starboardThruster)) delegate.OnStarboardThrust();
		if (Input.GetKeyDown(upThruster))        delegate.OnUpThrust();
		if (Input.GetKeyDown(downThruster))      delegate.OnDownThrust();
		
		if (Input.GetKeyUp(sternThruster))       delegate.OffSternThrust();
		if (Input.GetKeyUp(bowThruster))         delegate.OffBowThrust();
		if (Input.GetKeyUp(portThruster))        delegate.OffPortThrust();
		if (Input.GetKeyUp(starboardThruster))   delegate.OffStarboardThrust();
		if (Input.GetKeyUp(upThruster))          delegate.OffUpThrust();
		if (Input.GetKeyUp(downThruster))        delegate.OffDownThrust();
		
		if (Input.GetKeyDown(fire))				 delegate.OnWeaponFire();
	}

}