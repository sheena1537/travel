/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"com/sap/TRAVEL_PROJECT_1/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});