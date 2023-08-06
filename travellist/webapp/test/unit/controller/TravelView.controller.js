/*global QUnit*/

sap.ui.define([
	"arcom/travellist/controller/TravelView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("TravelView Controller");

	QUnit.test("I should test the TravelView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
