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
	 * assumes that onElement and offElement are immediate children of the element
	 * being converted into an imageToggle. It's also assumed that the active/inactive
	 * images are the same size.
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
			doToggle($("#" + this.data("toggle-on-element")));
		} else {
			// plugin is uninitialized. do initialization routine
			this.data("toggle-on-element", onElement.attr("id"));
			
			// add user provided options and set defaults for those not provided
			var props = $.extend( {}, defaults, options) ;
			
			// apply styling to toggle elements. This will, in essence, "stack" the
			// images on top of each other and make the inactive element visible
			prepareToggleElement(onElement, onElement, props, props.toggleOnUrl, -1);
			prepareToggleElement(offElement, onElement, props, props.toggleOffUrl, 2);
		}
		
        return this;
    };
	
	/** 
	 * Creates a toggle element by setting its size and 
	 * 
	 * @param element The element that will be converted into a toggle image.
	 * @param onElement The element that will be displayed when the toggle is active.
	 * @param props The custom options that the can change the way the plugin
	 *        behaves.
	 * @param url The image that will be used for the toggle state.
	 * @param zIndex The z-index that will be used for the element. If less than 0
	 *        then no z-index will be applied.
	 */
	function prepareToggleElement(element, onElement, props, url, zIndex) {
		// add back ground, size element, and position element
		element.css("background", "white url("+url+") no-repeat 0 0");
		element.css("background-size", props.width+" "+props.height);
		element.css("position", "absolute");
		element.css("width", props.width);
		element.css("height", props.height);
		
		// set z-index of the element.
		if (zIndex >= 0) {
			element.css("z-index", zIndex);
		}
		
		// if clicking is enabled, wire up the element so that clicking it
		// will toggle states.
		if (props.enableClick) {
			element.click(function(e) {
				e.preventDefault();
				
				doToggle(onElement);
			});
		}
	}
	
	/** 
	 * Toggles the element by swapping its z-index value between and visible and
	 * non-visible state.
	 * 
	 * @param onElement The element whose z-index will be modified.
	 */
	function doToggle(onElement) {
		var currIndex = onElement.css("z-index");
		
		if (currIndex == 3) {
			// element is visible, hide it
			currIndex = 0;
		} else {
			// element is visible, show it
			currIndex = 3;
		}
		
		onElement.css("z-index", currIndex);
	}
}( jQuery, window, document ));
