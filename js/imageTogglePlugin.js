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
 * This plugin provides a way to create a toggle button that will swap between
 * two different images each time the button is pushed.
 *
 * Please refer to the home automation system repository Wiki for detailed
 * usage information.
 *
 * @author Mark Frisbey
 */
;(function ( $, window, document, undefined ) {

	// default option values for the plugin
    var defaults = {
		toggleOnUrl: "",
		toggleOffUrl: "",
		width: 0,
		height: 0,
		enableClick: true
	};
	
	/** 
	 * Does the work of converting an element into an image toggle. The function
	 * assumes that  the active/inactive images are the same size.
	 *
	 * Invoking this method on a previously-initialized imageToggle element will
	 * toggle the element between its active and inactive state.
	 * 
	 * @param onElement The element that will be displayed when the toggle is active.
	 * @param offElement The element that will be displayed when the toggle is inactive.
	 * @param options The custom options that the can change the way the plugin
	 *        behaves.
	 */
    $.fn.imageToggle = function(onElement, offElement, options) {
		// remember if the plugin has already been initialized using
		// data attributes
		var initialized = (this.data("toggle-on-element") != null);
		
		if (initialized) {
			// plugin has already been initialized, toggle between active
			// and inactive.
			doToggle($("#" + this.data("toggle-on-element")), $("#" + this.data("toggle-off-element")));
		} else {
			// plugin is uninitialized. do initialization routine
			this.data("toggle-on-element", onElement.attr("id"));
            this.data("toggle-off-element", offElement.attr("id"));
			
			// add user provided options and set defaults for those not provided
			var props = $.extend( {}, defaults, options) ;
			
			// apply styling to toggle elements. This will, in essence, "stack" the
			// images on top of each other and make the inactive element visible
			prepareToggleElement(onElement, onElement, offElement, props, props.toggleOnUrl, true);
			prepareToggleElement(offElement, onElement, offElement, props, props.toggleOffUrl, false);
		}
		
        return this;
    };
	
	/** 
	 * Creates a toggle element by setting its size and 
	 * 
	 * @param element The element that will be converted into a toggle image.
	 * @param onElement The element that will be displayed when the toggle is active.
     * @param offElement The element that will be displayed when the toggle is inactive.
	 * @param props The custom options that the can change the way the plugin
	 *        behaves.
	 * @param url The image that will be used for the toggle state.
	 * @param hidden Whether or not the element will be hidden initially.
	 */
	function prepareToggleElement(element, onElement, offElement, props, url, hidden) {
		// add back ground, size element, and position element
		element.css("background", "white url("+url+") no-repeat 0 0");
		element.css("background-size", props.width+" "+props.height);
		element.css("position", "absolute");
		element.css("width", props.width);
		element.css("height", props.height);
		
		// set visibility of the element.
		if (hidden) {
			element.css("display", "none");
		}
		
		// if clicking is enabled, wire up the element so that clicking it
		// will toggle states.
		if (props.enableClick) {
			element.click(function(e) {
				e.preventDefault();
				
				doToggle(onElement, offElement);
			});
		}
	}
	
	/** 
	 * Toggles the element by swapping the visibility of the on/off elements.
	 * 
	 * @param onElement The element that is visible in the active state.
     * @param offElement The element that is visible in the inactive state.
	 */
	function doToggle(onElement, offElement) {
		var currVisible = onElement.css("display");
        var currOffVisible = "inline";
		
		if (currVisible == "none") {
			// element is invisible, show it
            currVisible = "inline";
            currOffVisible = "none";
		} else {
			// element is visible, show it
            currVisible = "none";
            currOffVisible = "inline";
		}
		
		onElement.css("display", currVisible);
        offElement.css("display", currOffVisible);
	}
}( jQuery, window, document ));
