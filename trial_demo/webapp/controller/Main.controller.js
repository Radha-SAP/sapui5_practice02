sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("ar.com.trialdemo.controller.Main", {
            onInit: function () {

            },
            OnOKPress: function() {
             var oRouter = this.getOwnerComponent().getRouter();
             var sParamValue = this.getView().byId("_IDGenComboBox1").getValue();
             oRouter.navTo("")
            }
        });
    });
