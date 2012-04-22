#pragma strict

// You must implement this delegate to recieve delegate notifications from `Controls`.
//
// @author Lauren Tomasello <lauren@tomasello.me>

interface ControlsDelegate {
	function OnSternThrust();
	function OnBowThrust();
	function OnPortThrust();
	function OnStarboardThrust();
	function OnUpThrust();
	function OnDownThrust();
	
	function OnWeaponFire();
	
	function OffSternThrust();
	function OffBowThrust();
	function OffPortThrust();
	function OffStarboardThrust();
	function OffUpThrust();
	function OffDownThrust();
}