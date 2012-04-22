#pragma strict

@HideInInspector public var intensity:float;

@script RequireComponent(TrailRenderer)
@script RequireComponent(ParticleSystem)

private var trailRenderer:TrailRenderer;
private var flareLight:Light;
private var flare:LensFlare;
private var glow:LensFlare;

function Start () {
	flareLight = GetComponentInChildren.<Light>();
	glow = transform.FindChild("Glow").GetComponent.<LensFlare>();
	flare = GetComponent.<LensFlare>();
	trailRenderer = GetComponent.<TrailRenderer>(); 
}

function LateUpdate () {
	trailRenderer.time = intensity;
	flare.brightness = intensity / 5;
	glow.brightness = intensity * 5;
	flareLight.intensity = intensity * 4;
	particleSystem.emissionRate = intensity * 2;
}