sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, Filter, FilterOperator) {
        "use strict";

        return Controller.extend("ar.com.northwindtablecount.controller.Main", {
            onInit: function () {
                var oViewModel = new JSONModel({
                    mainTableTitle: this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("mainTableTitle"),
                    tableNoDataText: this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("tableNoDataText"),
                });
                this.getView().setModel(oViewModel, "mainView");

            },
            onUpdateFinished: function (oEvent) {
                var sTitle,
                    oTable = oEvent.getSource(),
                    iTotalItems = oEvent.getParameter("total");
                if (iTotalItems && oTable.getBinding("items").isLengthFinal()) {
                    sTitle = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("mainTableTitleCount", [iTotalItems]);
                } else {
                    sTitle = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("mainTableTitleCount");
                }
                this.getView().getModel("mainView").setProperty("/mainTableTitle", sTitle);
            },
            onPress: function (oEvent) {
                this._showObject(oEvent.getSource());

            },
            _showObject: function (oItem) {
                this.getOwnerComponent().getRouter().navTo("Detail", {
                    Productid: oItem.getBindingContext().getPath().substring("/Products".length)
                })
            },
            onSearch: function (oEvent) {


                var aTableSearchState = [];
                var sQuery = oEvent.getParameter("query");

                if (sQuery && sQuery.length > 0) {

                    aTableSearchState = [new Filter("ProductName", FilterOperator.Contains, sQuery),

                        // new Filter("Category/CategoryName", FilterOperator.Contains, sQuery),
                        // new Filter("Supplier/SupplierID", FilterOperator.Contains, sQuery)
                    ];

                }

                this._applySearch(aTableSearchState);

            },
            _applySearch: function (aTableSearchState) {

                var oTable = this.byId("_IDGenTable1"),

                    oViewModel = this.getView().getModel("mainView");

                oTable.getBinding("items").filter(aTableSearchState, "Application");

                // changes the noDataText of the list in case there are no filter results

                if (oTable.getBinding("items").getLength() == 0) {

                    oViewModel.setProperty("/tableNoDataText",
                     this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("worklistNoDataWithSearchText"));

                }

            },
         });
    });
