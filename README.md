Home Automation Javascript Application
==============
# Overview
This repository contains a simple javascript application that visually simulates a home automation system.
Pressing certain buttons on the automation control panel will trigger specific actions in the house. For
example, pressing a button for turning on a light will "switch on" a house light.

For more detailed documentation, see the plugin's [Wiki](https://github.com/mfrisbey/HomeAutomation/wiki).

**_IMPORTANT NOTE_**: It's worthwhile to note that there is no intended practical purpose for this 
code other than to showcase the author's coding practices and styles. No special effort was made to
utilize existing jQuery plugins; the reason for doing this is to maximize the amount of original code.
In a real-life scenario more of an effort would have been made to incorporate existing plugins. In
addition, the author makes no claim to be a professional graphic designer. The user interface was kept
simple in order to focus attention on the javascript and css code itself. All images are copyright to
their original creators and should not be used for monetary gain.

# Architecture
The application itself consist primarily of the following plugins:

[Image Toggle](https://github.com/mfrisbey/HomeAutomation/wiki/Image-Toggle-Plugin)

[Home Automation](https://github.com/mfrisbey/HomeAutomation/wiki/Home-Automation-Plugin)

[Panel Button](https://github.com/mfrisbey/HomeAutomation/wiki/Panel-Button-Plugin)

Click on the individual plugin names for detailed usage information.

# Usage
To see the application in action, simply open index.html in a browser. The application has been verified to work as
intended in the following browsers:

* Google Chrome Version 36.0

* Mozilla Firefox Version 31.0

* Microsoft Internet Explorer 10

## Adding Functionality
To add new controls to the control panel, leverage the existing plugins. To add a new on/off type button that will
toggle a specific home function when pressed, see the Panel Button plugin. To add a button that needs to perform
a more specialized function when pressed, see the Home Automation plugin.
