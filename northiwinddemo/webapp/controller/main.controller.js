sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast, ODataModel, JSONModel, Filter, FilterOperator) {
        "use strict";

        return Controller.extend("ar.com.northiwinddemo.controller.main", {
            onInit: function () {
                // let view = this.getView();
                // Create a new ODataModel instance
                var oModel = new ODataModel({
                    serviceUrl: "/V2/(S(qyatsm1tu0ef5deve1gs4uz2))/OData/OData.svc",
                    defaultBindingMode: "TwoWay"
                });
                // Set the model to the view
                this.getView().setModel(oModel, "NewRead");

                // Load data from the OData service
                this.loadData(); //without filer

            },
            onFirstComboSelect: function () {
                // var ComboFirst = this.getView().byId("_IDGenComboBox1").getValue();
                try {
                    var ComboFirstadd = this.getView().byId("_IDGenComboBox1").getSelectedItem().getAdditionalText()
                }
                catch {
                    console.log("No Values assigned");
                }
                var inputFirst = this.getView().byId("_IDGenInput1");
                inputFirst.setValue(ComboFirstadd);
                // inputFirst.setVisible(true);


                // Get the value of the input field
                var sValue = inputFirst.getValue();

                // Check if the value is empty (blank)
                if (sValue.trim() === "") {
                    // The input field is blank
                    inputFirst.setVisible(false);
                } else {
                    // The input field has a value
                    inputFirst.setVisible(true);
                }
            },
            onToggleEditPress: function () {
                // Get the reference to the input control by its ID
                var oInput = this.getView().byId("_IDGenInput1");

                // Get the current editable state
                var bEditable = oInput.getEditable();

                // Toggle the editable state
                oInput.setEditable(!bEditable);
            },
            onSelectionChange: function (oEvent) {
                // Get the MultiComboBox control
                var oMultiComboBox = oEvent.getSource();

                // Get the selected keys (entries)
                var aSelectedKeys = oMultiComboBox.getSelectedKeys();

                // Process the selected keys (entries)
                var aSelectedEntries = aSelectedKeys.map(function (sKey) {
                    var oItem = oMultiComboBox.getItemByKey(sKey);
                    return {
                        key: sKey,
                        text: oItem ? oItem.getText() : ""
                    };
                });

                // Show the selected entries in a message toast
                var sMessage = "Selected Entries:\n" + JSON.stringify(aSelectedEntries);
                MessageToast.show(sMessage);

            },
            loadData: function () {
                let view = this.getView();
                var oModel = this.getView().getModel("NewRead");

                // Replace 'EntitySet' with the actual name of the entity set you want to retrieve data from
                oModel.read("/Products", {
                    success: function (oData) {
                        const Tempcontroller = sap.ui.controller("ar.com.northiwinddemo.controller.main");
                        Tempcontroller.getView = function () { //get instance of the view
                            return view;
                        };
                        Tempcontroller.setTableData(oData);
                        // Set the data to the model
                        // oModel.setData(oData);
                    },
                    error: function (oError) {
                        // Handle errors if needed
                    }
                });
            },
            setTableData: function (VaroData) {
                var oJsonModel = new JSONModel(VaroData);
                this.getView().setModel(oJsonModel, "NewRead");
                // var ToModel = this.getView().getModel("NewRead");
                // ToModel.setData(VaroData);
            },
            onButtonClick: function () {
                // try {
                // var ComboFirstadd = this.getView().byId("_IDGenComboBox1").getSelectedItem().getValue();
                var oComboBox = this.byId("_IDGenComboBox1");

                // Get the selected key of the ComboBox
                var sSelectedKey = oComboBox.getSelectedKey();
                // Replace 'Your_Filter_Value' with the value you want to filter by
                var oFilter = new Filter("ID", FilterOperator.EQ, sSelectedKey);
                var oModel = new ODataModel({
                    serviceUrl: "/V2/(S(qyatsm1tu0ef5deve1gs4uz2))/OData/OData.svc",
                    defaultBindingMode: "TwoWay"
                });
                // Set the model to the view
                this.getView().setModel(oModel, "NewRead");
                let view = this.getView();
                var oModel = this.getView().getModel("NewRead");

                // Replace 'EntitySet' with the actual name of the entity set you want to retrieve data from
                oModel.read("/Products", {
                    filters: [oFilter],
                    success: function (oData) {
                        const Tempcontroller = sap.ui.controller("ar.com.northiwinddemo.controller.main");
                        Tempcontroller.getView = function () { //get instance of the view
                            return view;
                        };
                        Tempcontroller.setTableData(oData);
                        // Set the data to the model
                        // oModel.setData(oData);
                    },
                    error: function (oError) {
                        // Handle errors if needed
                    }
                });
                // }
                // catch {
                //     console.log("No Values selected");
                // }
            }
        });
    });
