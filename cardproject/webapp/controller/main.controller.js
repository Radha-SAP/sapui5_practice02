sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("ar.com.cardproject.controller.main", {
            onInit: function () {

            },
            onClick: function () {
                var CardCode = this.getView().byId("_IDGenInput1").getValue();
                this.getOwnerComponent().getRouter().navTo("RouteDetail", {
                    CardCode: CardCode
                }
                );

            }
        });
    });
