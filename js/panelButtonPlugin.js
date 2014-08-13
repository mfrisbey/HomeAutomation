/*
 * This code is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 2 only, as
 * published by the Free Software Foundation.
 *
 * This code is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
 * version 2 for more details (a copy is included in the LICENSE file that
 * accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version
 * 2 along with this work; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
 */
 
/**
 * This plugin provides a way to create a toggle button with a label beneath it.
 * The button itself will be wired into the homeAutomation plugin so that the
 * button's value will be saved using the given dataKey and loaded using the
 * activeValue. At a high level, the plugin will add an imageToggle and label
 * as child elements. Toggling the panel button will:
 *
 * 1. Save the toggle's value back to a data store on the server.
 * 2. Trigger a separate imageToggle's toggle action.
 *
 * For example, assume that the panel button is considered an on/off button
 * that will turn a light on and off. The light on/off toggle has been previously
 * configured using the imageToggle plugin. If the panel button's dataKey is "light"
 * and its activeValue is "on," then pushing the on/off button will toggle the 
 * light on/off toggle and save the value "light: !on" back to the server. Toggling
 * the on/off button again will send "light: on" back to the server.
 *
 * Please refer to the home automation system repository Wiki for detailed
 * usage information.
 *
 * @author Mark Frisbey
 */
;(function ( $, window, document, undefined ) {

	// default option values for the plugin
    var defaults = {
		buttonLabel: "[Label]",
		toggleOnUrl: "",
		toggleOnUrl: "",
		width: 0,
		height: 0,
		dataKey: "",
		activeValue: ""
	};

	/** 
	 * Does the work of converting an element into a panel button
	 * 
	 * @param toggleElement The element that will be toggled when the panel's
	 *        toggle on/off button is pushed. The element must be an imageToggle.
	 * @param options The custom options that the can change the way the plugin
	 *        behaves.
	 */
	$.fn.panelButton = function(toggleElement, options) {
		// add user provided options and set defaults for those not provided
		var props = $.extend( {}, defaults, options);
		
		// set the ids of the elements that will become the toggle on/off images
		var toggleOnId = this.attr("id")+"-toggle-on";
		var toggleOffId = this.attr("id")+"-toggle-off";
		
		// add the toggle on/off images as links
		this.append('<a href="#" id="'+toggleOnId+'">');
		this.append('<a href="#" id="'+toggleOffId+'">');
		
		// add the button's label
		this.append('<span class="panel-button-label" style="width:'+props.width+'">'+props.buttonLabel+'</span>');
		
		var toggleOnElement = $("#"+toggleOnId);
		var toggleOffElement = $("#"+toggleOffId);
		
		// convert the newly created toggle on/off images into an imageToggle and wire 
		// the panel button up to the homeAutomation system.
		this.imageToggle(toggleOnElement, toggleOffElement, {
			toggleOnUrl: props.toggleOnUrl, 
			toggleOffUrl: props.toggleOffUrl,
			width: props.width,
			height: props.height
		}).homeAutomation({
			dataKey: props.dataKey,
			loadData: function(val) {
				// check to see if the loaded data matches the provided activeValue.
				// if so, change the toggle's state to "on"
				if (val == props.activeValue) {
					$("#"+toggleOnId).click();
				}
			},
			buttonPush: function() {
				// when the panel's button is toggle, also toggle the target toggle element.
				toggleElement.imageToggle();
				var retVal = props.activeValue;
				
				// determine if the state of toggle element is not active and change
				// the value sent back to the server
				if  (toggleOnElement.css("z-index") < toggleOffElement.css("z-index")) {
					retVal = "!"+retVal;
				}
				
				return retVal;
			}
		});
		
		return this;
	};
}( jQuery, window, document ));
