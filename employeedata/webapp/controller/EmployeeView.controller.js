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

        return Controller.extend("ar.com.employeedata.controller.EmployeeView", {
            onInit: function () {
                this.flag = "";
                var oEmployeeData = {
                    "employeeid": "",
                    "name": "",
                    "designation": "",
                    "department": "",
                    "salary": ""
                };
                var oEmployeeModel = new JSONModel(oEmployeeData);
                this.getView().setModel(oEmployeeModel, "empmodel");
                var oFlag = {
                    "flag": ""
                };
                var oFlagModel = new JSONModel(oFlag);
                this.getView().setModel(oFlag, "flagmodel");
            },

            onCreate: function () {
                this.flag = "C";
                // this.getView().getModel("flagmodel").setProperty("/flag", "C");
                if (!this.pDialog) {
                    this.pDialog = this.loadFragment({
                        name: "ar.com.employeedata.view.Fragment.Employee"
                    });
                }
                this.pDialog.then(function (oDialog) {
                    oDialog.open();
                });
            },
            onUpdate: function () {
                this.flag = "U";
                // this.getView().getModel("flagmodel").setProperty("/flag", "U");

                if (!this.pDialog) {
                    this.pDialog = this.loadFragment({
                        name: "ar.com.employeedata.view.Fragment.Employee"
                    });
                }
                this.pDialog.then(function (oDialog) {
                    var oSelectedItem = this.byId("_IDGenTable1").getSelectedItem();
                    var oObject = oSelectedItem.getBindingContext().getObject();
                    this.getView().getModel("empmodel").setData(oObject);
                    this.byId("_IDGenInput1").setEnabled(false);
                    oDialog.open();
                }
                    .bind(this));
            },
            onSave: function () {
                var oModel = this.getOwnerComponent().getModel();
                var oEmployeeData = this.getView().getModel("empmodel").getData();

                // if (this.getView().getModel("flagmodel").getProperty("/flag") === "C") {
                if (this.flag === "C") {
                    oModel.create("/Employees", oEmployeeData, {
                        success: function (oResponse) {
                            MessageBox.show("Employee Record " + oEmployeeData.employeeid + " created successfully")
                        },
                        error: function (oError) {

                        }
                    });
                } else {
                    oModel.update("/Employees(employeeid='" + oEmployeeData.employeeid + "')", oEmployeeData, {

                        success: function (oResponse) {
                            MessageBox.show("Employee Record " + oEmployeeData.employeeid + " Updated successfully")
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
                oModel.remove("/Employees(employeeid='" + oObject.employeeid + "')", {
                    success: function (oResponse) {
                        MessageBox.show("Employee Record " + oObject.employeeid + " Deleted successfully")
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
        }

        )
    });
