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
 * Wires up the home automation system by applying plugins to elements.
 * 
 * @author Mark Frisbey
 */
$(document).ready(function () {
	// define the options for the standard light toggle once
	var lightOptions = {
		toggleOnUrl: "images/light_on.gif",
		toggleOffUrl: "images/light_off.gif",
		width: "41px",
		height: "56px",
		enableClick:false
	};

	// define the options for the standard on/off button once
	var onOffOptions = {
		buttonLabel: "On/Off",
		toggleOnUrl: "images/on.gif",
		toggleOffUrl: "images/off.gif",
		width: "84px",
		height: "84px",
		dataKey: "on-off",
		activeValue: "on"
	};
	
	// wire up temperature controls so that pushing the up/down arrows
	// will adjust the temperature text
	$("#temp-controls").homeAutomation({
		buttonPush: adjustTemp,
		dataKey: "temperature",
		loadData: function(val) {
			$("#curr-temp").text(val);
		}
	});
	
	// create the left bed light bulb element that will toggle between an on and off image.
	$("#house-left-bed-light").imageToggle($("#house-left-bed-light-on"), $("#house-left-bed-light-off"), lightOptions);
	
	// create the right bed light bulb element that will toggle between an on and off image.
	$("#house-right-bed-light").imageToggle($("#house-right-bed-light-on"), $("#house-right-bed-light-off"), lightOptions);
	
	// create the attic light bulb element that will toggle between an on and off image.41*
	lightOptions.width = "19px";
	lightOptions.height = "28px";
	$("#house-attic-light").imageToggle($("#house-attic-light-on"), $("#house-attic-light-off"), lightOptions);
	
	// create the entry light bulb element that will toggle between an on and off image.
	lightOptions.width = "33px";
	lightOptions.height = "45px";
	$("#house-entry-light").imageToggle($("#house-entry-light-on"), $("#house-entry-light-off"), lightOptions);
	
	// create the curtain element that will toggle between an open and closed curtain
	$("#house-curtain").imageToggle($("#house-curtain-open"), $("#house-curtain-closed"), {
		toggleOnUrl: "images/curtain_open.gif",
		toggleOffUrl: "images/curtain_closed.gif",
		width: "93px",
		height: "63px",
		enableClick:false
	});
	
	// create the fireplace element that will toggle between chimney smoke and no smoke
	$("#house-fireplace").imageToggle($("#house-fireplace-on"), $("#house-fireplace-off"), {
		toggleOnUrl: "images/smoke.jpg",
		toggleOffUrl: "images/white_pixel.gif",
		width: "40px",
		height: "40px",
		enableClick:false
	});
	
	// add the open/close button for the curtains. Will trigger the
	// houseCurtain's toggle function
	$("#curtain-open-close").panelButton($("#house-curtain"), {
		buttonLabel: "Curtains",
		toggleOnUrl: "images/open.gif",
		toggleOffUrl: "images/closed.gif",
		width: "131px",
		height: "84px",
		dataKey: "curtains",
		activeValue: "open"
	});
	
	// add the on/off button for the left bed lights. Will trigger the
	// house-left-bed-light's toggle function
	configureOnOffButton("light-left-bed-on-off", "house-left-bed-light", "Left Bedroom Lights", "lights-left-bed");
	
	// add the on/off button for the right bed lights. Will trigger the
	// house-right-bed-light's toggle function
	configureOnOffButton("light-right-bed-on-off", "house-right-bed-light", "Right Bedroom Lights", "lights-right-bed");
	
	// add the on/off button for the attic lights. Will trigger the
	// house-attic-light's toggle function
	configureOnOffButton("light-attic-on-off", "house-attic-light", "Attic Lights", "lights-attic");
	
	// add the on/off button for the entry lights. Will trigger the
	// house-entry-light's toggle function
	configureOnOffButton("light-entry-on-off", "house-entry-light", "Entry Lights", "lights-entry");
	
	// add the on/off button for the fireplace. Will trigger the
	// house-fireplace's toggle function
	configureOnOffButton("fireplace-on-off", "house-fireplace", "Fireplace", "fireplace");
});

/**
 * Configures an on off button by converting an element into a panel button.
 *
 * @param onOffId The id of the element to be converted into a panel button.
 * @param toggleId The id of the element that the on/off button will toggle.
 * @param buttonLabel The label that will appear with the on/off button.
 * @param dataKey The key that will be used to persist the panel button's value.
 */
function configureOnOffButton(onOffId, toggleId, buttonLabel, dataKey) {
	$("#"+onOffId).panelButton($("#"+toggleId), {
		buttonLabel: buttonLabel,
		toggleOnUrl: "images/on.gif",
		toggleOffUrl: "images/off.gif",
		width: "84px",
		height: "84px",
		dataKey: dataKey,
		activeValue: "on"
	});
}

/**
 * Determines which temperature control button was pressed and changes
 * the temperature text accordingly.
 *
 * @param e Click event args
 */
function adjustTemp(e) {
	// retrieve the temperature action from the clicked button's data
	// attributes
	var tempAction = $(this).data("temp-action");
	
	// retrieve the current temperature
	var currTemp = parseInt($("#curr-temp").text());
	
	// adjust the temperature depending on the button
	if (tempAction == "up") {
		currTemp++;
	} else {
		currTemp--;
	}
	
	// set temperature
	$("#curr-temp").text(currTemp);
	
	// return the current temperature so it can be sent back to the server
	return currTemp;
}
