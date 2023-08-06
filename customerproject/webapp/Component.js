/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "ar/com/customerproject/model/models",
    "sap/ui/model/json/JSONModel"
],
    function (UIComponent, Device, models,JSONModel) {
        "use strict";

        return UIComponent.extend("ar.com.customerproject.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");
                var Ord = {                  //Creating a global Model to bind with the table on Main view
                    "Orders": [
                        {
                            "ItemCode": "",
                            "ItemName": "",
                            "ItemQuantity": "",
                            "ItemPrice": "",
                            "TotalPrice": ""
                        }
                    ]
                }
                var oModel = new JSONModel(Ord);  //Covert it to JSON
                this.setModel(oModel, "Order1");  //Set Model and Model name to be accessable in all views
            }
        });
    }
);