sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/ui/thirdparty/jquery"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator, ODataModel) {
        "use strict";

        return Controller.extend("ar.com.cardproject.controsller.main", {
            onInit: function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.getRoute("RouteDetail").attachMatched(this._onRouteMatched, this);
            },
            _onRouteMatched: function (oEvent) {
                var oArgs;
                oArgs = oEvent.getParameter("arguments");
                var sUrl = "/proxy/b1s/v2/BusinessPartners('VMAT100002')";
                // Load jQuery library using sap.ui.require()
                sap.ui.require(["sap/ui/thirdparty/jquery"], function (jQuery) {
                    // Make an HTTP GET request using jQuery.ajax()
                    jQuery.ajax({
                        url: sUrl,
                        type: "GET",
                        dataType: "json", // Change the dataType based on your response format (e.g., "json", "xml", "text", etc.)
                        success: function (data) {
                            // Process the response data
                            console.log("Data:", data);
                        },
                        error: function (xhr, status, error) {
                            // Handle error
                            console.error("Error:", error);
                        }
                    });
                });


            }
        });
    });