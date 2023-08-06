sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/ui/thirdparty/jquery",
    'sap/m/MessageToast',
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator, ODataModel, MessageToast, JSONModel) {
        "use strict";

        return Controller.extend("ar.com.cardproject3.controller.Details", {
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
