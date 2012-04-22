#pragma strict

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
	
	intensity = Mathf.SmoothDamp(intensity, 0, velocity, 0.3);
	
	lensFlare.brightness = intensity/5;
	light.intensity = intensity;
}

public function Fire() {
	intensity = 5.0;
	
	var laser = Instantiate(ammunition, transform.position, transform.rotation);
}