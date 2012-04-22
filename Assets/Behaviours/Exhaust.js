#pragma strict

// Exhaust has an 'intensity' property, which it uses to modulate several
// effects. Change the intensity property to change the intensity of
// the effects.
//
// @author Lauren Tomasello <lauren@tomasello.me>

@HideInInspector public var intensity:float;

@script RequireComponent(TrailRenderer)
@script RequireComponent(ParticleSystem)

private var trailRenderer:TrailRenderer;
private var flareLight:Light;
private var flare:LensFlare;
private var glow:LensFlare;

function Start () {
	// find components that are used
	flareLight    = GetComponentInChildren.<Light>();
	glow          = transform.FindChild("Glow").GetComponent.<LensFlare>();
	flare         = GetComponent.<LensFlare>();
	trailRenderer = GetComponent.<TrailRenderer>(); 
}

function LateUpdate () {
	trailRenderer.time = intensity;
	flare.brightness = intensity / 5;
	glow.brightness = intensity * 5;
	flareLight.intensity = intensity * 4;
	particleSystem.emissionRate = intensity * 2;
}