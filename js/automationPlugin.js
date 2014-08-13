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
 * This plugin provides a way to tap into the home automation system. The
 * plugin will wire up all "a" child elements so that when they are clicked
 * the "buttonPush" function is invoked; the plugin will also send whatever
 * value is returned by the buttonPush function to the server. In addition,
 * the plugin will invoke the loadData function when data for the configured
 * dataKey is read from the server.
 *
 * Please refer to the home automation system repository Wiki for detailed
 * usage information.
 *
 * @author Mark Frisbey
 */
;(function ( $, window, document, undefined ) {

	// default option values for the plugin
    var defaults = {
		buttonPush: function() {},
		loadData: function() {},
		dataKey: ""
	};
	
	// path to the JSON file on the server that will retrieve all persisted
	// automation values
	var jsonPath = "data/homeAutomation.json";

	/** 
	 * Does the work of converting an element into a home automation element. Wires up
	 * the click event of all child "a" elements and invokes the loadData function
	 * when appropriate.
	 *
	 * @param options The custom options that the can change the way the plugin
	 *        behaves.
	 */
    $.fn.homeAutomation = function(options) {
		// add user provided options and set defaults for those not provided
		var props = $.extend( {}, defaults, options) ;
		
		// retrieve data from the server
		loadData(props);
		
		// react to click event of all "a" tags in the element.
		this.find("a").click(function(e) {
			e.preventDefault();
			
			// invoke the buttonPush callback
			var retVal = props.buttonPush.call(this, e);
			
			// if buttonPush gave us a value back and we have a dataKey, send
			// the returned value back to the server
			if (retVal != null && props.dataKey != "") {
				$.ajax({
					url: "updateValue.php",
					data: props.dataKey+"="+encodeURIComponent(retVal),
					dataType: "json",
					type: "GET"
				}).done(function(data) {
					// got a response! Make sure it was successful...
					if (data.result != "success") {
						logError("Server failed to process value "+retVal+" for key "+props.dataKey);
					}
				}).fail(function() {
					// couldn't complete the request, log a message indicating so
					logError("Unable to send value "+retVal+" to server for key "+props.dataKey);
				});
			}
		});
		
        return this;
    };
	
	/** 
	 * Logs a message to the console.log if it is available.
	 *
	 * @param message The message to be logged.
	 */
	function logInfo(message) {
		if (console && console.log) {
			console.log(message);
		}
	}
	
	/** 
	 * Logs a message to the console.error if it is available. If unavailable,
	 * will call logInfo.
	 *
	 * @param message The message to be logged.
	 */
	function logError(message) {
		if (console && console.error) {
			console.error(message);
		} else {
			logInfo(message);
		}
	}
	
	/** 
	 * Retrieves the plugin's JSON file from the server and invokes the
	 * loadData callback.
	 *
	 * @param props The message to be logged.
	 */
	function loadData(props) {
		// only try to load data if dataKey is set
		if (props.dataKey != "") {
			$.getJSON(jsonPath, function( data ) {
				// invoke callback
				props.loadData.call(this, data[props.dataKey]);
			}).fail(function() {
				logError("There was an error reading the automation plugin's JSON file at "+jsonPath);
			});
		}
	}
}( jQuery, window, document ));
