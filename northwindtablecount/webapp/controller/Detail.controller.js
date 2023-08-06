sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("ar.com.northwindtablecount.controller.Detail", {
            onInit: function () {
                var ioriginalBusyDelay,
                    oViewModel = new JSONModel({
                        busy: true,
                        delay: 0
                    });
                {     this.getOwnerComponent().getRouter().getRoute("Detail").attachPatternMatched(this._onObjectMatched, this);
                    //  var oCurrencyModel = new JSONModel({
                    //      currency: "AUD"
                    //  });
                    // this.getView().setModel(oCurrencyModel, "CurrencyModel");
                    ioriginalBusyDelay = this.getView().getBusyIndicatorDelay();
                    this.getView().setModel(oViewModel, "detailView");
                    this.getOwnerComponent().getModel().metadataLoaded().then(function () {
                        oViewModel.setProperty("/delay", ioriginalBusyDelay);
                    });
                }},
            
                _onObjectMatched : function (oEvent) {
                                    var sObjectId =  oEvent.getParameter("arguments").objectId;
                                    this._bindView("/Product" + sObjectId ); 
                                
                            },
            
            _bindView: function (sobjectPath) {
                var oViewModel = this.getView().getModel("detailView"),
                    oDataModel = this.getOwnerComponent().getModel();
                this.getView().bindElement({
                    path: sobjectPath,
                    events: {
                        change: this._onBindingChange.bind(this),
                        dataRequested: function () {
                            oDataModel.metadataLoaded().then(function () {
                                oViewModel.setProperty("/busy", true)
                            });
                        },
                        dataReceived: function () {
                            oViewModel.setProperty("/busy", false);
                        }
                    }
                });
            },
             _onBindingChange: function(){
                 var oView = this.getView(),
                oViewModel = this.getModel("detailView"),
                oElementBinding = oView.getElementBinding();
             }

        });
    });