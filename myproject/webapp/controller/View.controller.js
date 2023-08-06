sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("ar.com.myproject.controller.View", {
            onInit: function () {
                this.flag = "";
                var oProductData = {
                    "ProductName": "",
                    "SupplierID": "",
                    "CategoryID": "",
                    "QuantityPerUnit": "",
                    "UnitPrice": ""
                };
                var oProductModel = new JSONModel(oProductData)
                this.getView().setModel(oProductModel, "prdctmodel")
                var oFlag = {
                    "flag": ""
                };
            },
            onCreate: function(){
                this.flag="C";
                if(!this.pDialog){

                }
            }
        });
    });
