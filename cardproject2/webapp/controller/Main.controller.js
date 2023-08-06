sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/m/MessageToast'
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast) {
        "use strict";

        return Controller.extend("ar.com.cardproject2.controller.Main", {
            onInit: function () {

            },
            onPress: function () {
                var oRouter = this.getOwnerComponent().getRouter();
                try {

                    var sParamValue = this.getView().byId("_IDGenComboBox1").getValue(); // Replace with the parameter value you want to pass

                    oRouter.navTo("RouteDetail", {
                        CardCode: sParamValue
                    });
                }
                catch {
                    MessageToast.show("No Value selected");
                }
            }
        });
    });
