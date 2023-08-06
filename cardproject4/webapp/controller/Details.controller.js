sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("ar.com.cardproject4.controller.Details", {
            onInit: function () {
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.getRoute("RouteDetail").attachPatternMatched(this._onObjectMatched, this);
            },
            _onObjectMatched: function (oEvent) {
                let view = this.getView(); //Capture instance of current view in a vairable
                let LocalBusinessData = this.BusinessData;
                var oArgs = oEvent.getParameter("arguments");
                var CardCode = oArgs.CardCode;
            }
        });
    });