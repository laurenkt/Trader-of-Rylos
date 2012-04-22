#pragma strict

// Behaviour which, when attached to a game object with a light and a lens flare,
// uses those components to animate the firing of cannons and create the projectiles
// themselves. This script does not handle the projectile behaviour.
//
// Call the Fire() method to fire another 'round'.
//
// @author Lauren Tomasello <lauren@tomasello.me>

@script RequireComponent(Light)
@script RequireComponent(LensFlare)

@SerializeField private var ammunition:GameObject;

private var lensFlare:LensFlare;
private var intensity:float = 0;
private var velocity:float = 0;

function Start() {
	lensFlare = GetComponent.<LensFlare>();
}

function Update() {
	if (intensity == 0)
		return;
	
	// animate out the intensity
	intensity = Mathf.SmoothDamp(intensity, 0, velocity, 0.3);
	
	// update visuals from the intensity
	lensFlare.brightness = intensity/5;
	light.intensity = intensity;
}

public function Fire() {
	// sets the current intensity which will be automatically reduced
	intensity = 5.0;
	
	// puts a new projectile in the world
	var laser = Instantiate(ammunition, transform.position, transform.rotation);
}