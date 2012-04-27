#pragma strict

// Draws the Heads Up Display on the main camera view, includes meters for thrust,
// and tracking pointers for other GameObjects.
//
// @author Lauren Tomasello <lauren@tomasello.me>

@script ExecuteInEditMode()

class HUD extends GUIOverlay implements ShipListener {

	@SerializeField private var ship:Ship;
	
	@SerializeField private var texture:Texture2D;
	@SerializeField private var pointer:Texture2D;
	@SerializeField private var guiStyle:GUIStyle;
	
	private var mainSpeed:float;
	private var pitchSpeed:float;
	private var rollSpeed:float;
	private var sternThrust:float;
	private var bowThrust:float;
	private var portThrust:float;
	private var starboardThrust:float;
	private var upThrust:float;
	private var downThrust:float;
	
	private var trackables = List.<GameObject>();
	
	function Start() {
		// inform the main ship controller that we want to listen for changes
		ship.AddListener(this);
	}

	function OnGUI() {		
		//TODO: Find a way to get 3D GUI.matrix to actually work...
		//GUI.matrix = Matrix4x4.TRS(Vector3.zero, Quaternion.Euler(2, 4, 5), Vector3.one);
		
		// GUI.matrix is changed for rotation.. keep a copy of unrotated matrix
		var previousGuiMatrix:Matrix4x4 = GUI.matrix;
		
		var distance:Vector2 = Vector2.zero;
		var drawAt:Vector2 = Vector2.zero;
		var screenPoint:Vector3;
		var angle:float;
		var label:String;
		var color:Color;
		
		for (var trackable in trackables) {
			label = trackable.GetComponent.<Trackable>().label;
			color = trackable.GetComponent.<Trackable>().color;
			screenPoint = camera.WorldToViewportPoint(trackable.transform.position);
			// only draw the pointer if trackable is offscreen
			if (true || screenPoint.z < 0 || screenPoint.x < 0 || screenPoint.x > Screen.width ||
				screenPoint.y < 0 || screenPoint.y > Screen.height) {
			 
				drawAt.x = Mathf.Clamp01(screenPoint.x);
				drawAt.y = 1 - Mathf.Clamp01(screenPoint.y); // flip Y coordinates
				 
				 // z < 0 implies that trackable is *behind* the camera. If the trackable
				 // is behind the camera we want to normalize the coordinates as if the trackable
				 // was at the front but at the very edge.
				if (screenPoint.z < 0) {
					// distances for X/Y from the middle of the screen
					distance.x = Mathf.Abs(drawAt.x - 0.5);
					distance.y = Mathf.Abs(drawAt.y - 0.5);
					
					// whichever is smallest is furthest from the edge, and will be locked to the 
					// edge of the screen on that axis
					if (distance.x > distance.y)
						drawAt.y = Mathf.Round(drawAt.y);
					else
						drawAt.x = Mathf.Round(drawAt.x);
				 }
				
				// find angle of pointer using view centerpoint as origin
				angle = Mathf.Atan2(drawAt.y - 0.5, drawAt.x - 0.5);
				
				// scale draw location (needs to be leave space to draw pointers on right and bottom)
				drawAt.x *= Screen.width - pointer.width;
				drawAt.y *= Screen.height - pointer.height;
	
				// rotate GUI matrix around the center of the pointer-to-be by angle
				GUIUtility.RotateAroundPivot(angle*Mathf.Rad2Deg + 90, Vector2(drawAt.x + pointer.width/2, drawAt.y + pointer.height/2));
				
				// draw pointer
				GUI.DrawTexture(Rect(drawAt.x, drawAt.y, pointer.width, pointer.height), pointer);
				
				// restore rotational matrix
				GUI.matrix = previousGuiMatrix;
				
				if (label != "" && screenPoint.z >= 0)
					GUI.Label(Rect(drawAt.x + pointer.width, drawAt.y+ pointer.height, 100, 50), label, guiStyle);
			}
		}
		
		// draw main speed bar
		 GUI.DrawTexture(Right(Bottom(Rect(10, 20, 10, mainSpeed))), texture);
		 GUI.DrawTexture(Right(Bottom(Rect(20, 10, mainSpeed, 10))), texture);
		
		// pitch speed
		 GUI.DrawTexture(HCenter(Rect(0, 10, pitchSpeed, 10)), texture);
		 
		// roll speed
		GUI.DrawTexture(VCenter(Rect(10, 0, 10, rollSpeed)), texture);		    
	
		// stern and bow thrust in opposing directions
		GUI.DrawTexture(Right(Bottom(Rect(22, 32, 10, sternThrust * 100))), texture);
		GUI.DrawTexture(Right(Bottom(Rect(32, 22, bowThrust * 100, 10))), texture);
		
		// port and starboard thrust in opposing directions
		GUI.DrawTexture(HCenter(Rect(1, 22, portThrust * 100, 10)), texture);
		GUI.DrawTexture(HCenter(Rect(-1, 22, -starboardThrust * 100, 10)), texture);
	
		// up and down thrust in opposing directions
		GUI.DrawTexture(VCenter(Rect(22, 1, 10, upThrust * 100)), texture);
		GUI.DrawTexture(VCenter(Rect(22, -1, 10, -downThrust * 100)), texture);
	}
	
	// objects can call AddTrackable on this component to be tracked in the HUD
	function AddTrackable(trackable:GameObject) {
		trackables.Add(trackable);
	}
	
	// ShipListener callbacks:
	
	function OnSpeedChange(main:float, pitch:float, roll:float) {
		mainSpeed = main; pitchSpeed = pitch; rollSpeed = roll;
	}
	
	function OnThrustChange(stern:float, bow:float, port:float, starboard:float, up:float, down:float) {
		sternThrust = stern; bowThrust = bow; portThrust = port;
		starboardThrust = starboard; upThrust = up; downThrust = down;
	}
	
}