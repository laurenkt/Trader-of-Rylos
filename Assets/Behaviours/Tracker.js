#pragma strict

// Follows `target` roughly at `offset` with a maximum distance; looks
// at a `tracker` position behind target. The tracker position smoothly
// follows `target` so that `target` has some freedom of movement within
// this object's vision.
//
// @author Lauren Tomasello <lauren@tomasello.me>

@SerializeField private var target : Transform;

private var velocity:Vector3 = Vector3.zero;
private var offset:Vector3;

private var xVelocity:float;
private var yVelocity:float;
private var zVelocity:float;

function Start() {
	offset = target.position - transform.position;
}

function LateUpdate() {
	// Early out if we don't have a target
	if (!target)
		return;
    
    // Move Camera
    transform.position = Vector3.SmoothDamp(transform.position, target.position - offset, velocity, 0.4);
	
	// Look At...	
	var rotation = Quaternion.LookRotation(target.position - transform.position, target.up).eulerAngles;
	rotation.x = Mathf.SmoothDampAngle(transform.rotation.eulerAngles.x, rotation.x, xVelocity, 0.1);
	rotation.y = Mathf.SmoothDampAngle(transform.rotation.eulerAngles.y, rotation.y, yVelocity, 0.1);
	rotation.z = Mathf.SmoothDampAngle(transform.rotation.eulerAngles.z, rotation.z, zVelocity, 0.2);
	transform.rotation = Quaternion.Euler(rotation);
}