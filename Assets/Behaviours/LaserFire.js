#pragma strict

var target : Vector3 = Vector3.zero;

function Start () {

}

function Update () {
	if (transform.position == target)
		Destroy(gameObject);

	transform.Translate(Vector3.up * Time.deltaTime * 1000);
}