#pragma strict

// LaserFire does nothing except project the gameobject at a high speed.
//
// @author Lauren Tomasello <lauren@tomasello.me>

function Update () {
	transform.Translate(Vector3.up * Time.deltaTime * 1000);
}