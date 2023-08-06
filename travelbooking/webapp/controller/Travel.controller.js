sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, MessageBox) {
        "use strict";

        return Controller.extend("ar.com.travelbooking.controller.Travel", {
            onInit: function () {
                this.flag = "";
                var oTravelData = {
                    "agencyid": "",
                    "bookingfee": "",
                    "currencycode": "",
                    "customerid": "",
                    "description": ""
                };
                var oTravelModel = new JSONModel(oTravelData)
                this.getView().setModel(oTravelModel, "trvmodel")
                var oFlag = {
                    "flag": ""
                };
                var oFlagModel = new JSONModel(oFlag);
                this.getView().setModel(oFlag, "flagmodel");


            },
            onCreate: function() {
                this.flag = "C";
                if (!this.pDialog) {
                    this.pDialog = this.loadFragment({
                        name: "ar.com.travelbooking.view.Fragment.Travel"
                    });
                }
                this.pDialog.then(function (oDialog) {
                    oDialog.open();
                });
            },
            onUpdate: function () {
                this.flag = "U";
                if (!this.pDialog) {
                    this.pDialog = this.loadFragment({
                        name: "ar.com.travelbooking.view.Fragment.Travel"
                    });
                }
                this.pDialog.then(function (oDialog) {
                    var oSelectedItem = this.byId("_IDGenTable1").getSelectedItem();
                    var oObject = oSelectedItem.getBindingContext().getObject();
                    this.getView().getModel("trvmodel").setData(oObject);
                    this.byId("_IDGenInput1").setEnabled(false);
                    oDialog.open();
                }
                    .bind(this));
            },
            onSave: function () {
                var oModel = this.getOwnerComponent().getModel();
                var oEmployeeData = this.getView().getModel("trvmodel").getData();
                if (this.flag === "C") {
                    oModel.create("/Travel", oTravelData, {
                        success: function (oResponse) {
                            MessageBox.show("Travel Record " + oTravelData.agencyid + " created successfully")
                        },
                        error: function (oError) {

                        }
                    });
                } else {
                    oModel.update("/Travel(agencyid='" + oTravelData.agencyid + "')", oTravelData, {

                        success: function (oResponse) {
                            MessageBox.show("Travel Record " + oTravelData.agencyid + " Updated successfully")
                        },
                        error: function (oError) {

                        }

                    })

                }
            },
            onDelete: function () {
                var oModel = this.getOwnerComponent().getModel();
                var oSelectedItem = this.byId("_IDGenTable1").getSelectedItem();
                var oObject = oSelectedItem.getBindingContext().getObject();
                oModel.remove("/Travel(agencyid='" + oObject.agencyid + "')", {
                    success: function (oResponse) {
                        MessageBox.show("Travel Record " + oObject.agencyid + " Deleted successfully")
                    },
                    error: function (oError) {

                    }
                })
            },
            onCancel: function (oEvent) {
                this.pDialog.then(function (oDialog) {
                    oDialog.close();
                }
                )
            }

        });
    });
