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

        return Controller.extend("ar.com.cardproject2.controller.Details", {
            // Declare the global variable at the controller level
            // BusinessData: [], //:ANURADHA++
            onInit: function () {
                var BusinessData = []; //:ANURADHA++

                // Create a new instance of the JSONModel and set the data
                // var FakeoModel = new JSONModel(oData);
                this.getView().setModel(BusinessData, "FakeoModel");
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.getRoute("RouteDetail").attachPatternMatched(this._onObjectMatched, this);
            },
            _onObjectMatched: function (oEvent) {
                let view = this.getView(); //Capture instance of current view in a vairable
                let LocalBusinessData = this.BusinessData;
                var oArgs = oEvent.getParameter("arguments");
                var CardCode = oArgs.CardCode;
                var Url1 = "/proxy/b1s/v2/BusinessPartners('";
                var Url2 = "')";
                // var sUrl = "/proxy/b1s/v2/BusinessPartners('VMAT100002')";
                var sUrl = Url1 + CardCode + Url2;
                // Load jQuery library using sap.ui.require()
                sap.ui.require(["sap/ui/thirdparty/jquery"], function (jQuery) {
                    // Make an HTTP GET request using jQuery.ajax()
                    jQuery.ajax({
                        url: sUrl,
                        type: "GET",
                        dataType: "json", // Change the dataType based on your response format (e.g., "json", "xml", "text", etc.)
                        success: function (data) {
                            // Process the response data
                            // console.log("Data:", data);
                            const Tempcontroller =
                                sap.ui.controller("ar.com.cardproject2.controller.Details"); //capture instance of your controller in another method
                            Tempcontroller.getView = function () { //get instance of the view
                                return view;
                            };

                            Tempcontroller.getView().setModel(data, "FakeoModel")
                            // Tempcontroller.setBusinessGlobalData(data); //whatever data is coming ,store it in global variablr :ANURADHA++
                            Tempcontroller.setInputValue(Tempcontroller, "_IDGenInput1", data.CardType);
                            Tempcontroller.setInputValue(Tempcontroller, "_IDGenInput2", data.GroupCode);
                            Tempcontroller.setInputValue(Tempcontroller, "_IDGenInput3", data.Address);
                            Tempcontroller.setInputValue(Tempcontroller, "_IDGenInput4", data.ZipCode);
                            Tempcontroller.setInputValue(Tempcontroller, "_IDGenInput5", data.Phone1);
                            Tempcontroller.setInputValue(Tempcontroller, "_IDGenInput6", data.Phone2);
                            Tempcontroller.setInputValue(Tempcontroller, "_IDGenInput7", data.Currency);
                            Tempcontroller.setInputValue(Tempcontroller, "_IDGenInput8", data.EmailAddress);

                            // Tempcontroller.BusinessData = data;
                            try {
                                Tempcontroller.getView().byId("_IDGenInput9").setValue(data.CardCode);
                            } catch { }
                            try {
                                Tempcontroller.getView().byId("_IDGenInput10").setValue(data.CardName);
                            } catch { }

                        },
                        error: function (xhr, status, error) {
                            // Handle error
                            console.error("Error:", error);
                        }
                    });
                });
            },
            setInputValue: function (oTemp, oID, oValue) {
                try {
                    var Input = oTemp.getView().byId(oID);
                    Input.setValue(oValue);
                }
                catch {
                    var Input = oTemp.getView().byId(oID);
                    Input.setValue('');
                }
            },
            onEdit: function () {
                this.setEditableInput("_IDGenInput1");
                this.setEditableInput("_IDGenInput2");
                this.setEditableInput("_IDGenInput3");
                this.setEditableInput("_IDGenInput4");
                this.setEditableInput("_IDGenInput5");
                this.setEditableInput("_IDGenInput6");
                this.setEditableInput("_IDGenInput7");
                this.setEditableInput("_IDGenInput8");

            },
            onSave: function () {
                // Assuming you have access to the view and its ID
                var oView = this.getView();
                try { var CardType = oView.byId("_IDGenInput1").getValue(); } catch { };
                try { var GroupCode = oView.byId("_IDGenInput2").getValue(); } catch { };
                try { var Address = oView.byId("_IDGenInput3").getValue(); } catch { };
                try { var ZipCode = oView.byId("_IDGenInput4").getValue(); } catch { };
                try { var Phone1 = oView.byId("_IDGenInput5").getValue(); } catch { };
                try { var Phone2 = oView.byId("_IDGenInput6").getValue(); } catch { };
                try { var Currency = oView.byId("_IDGenInput7").getValue(); } catch { };
                try { var EmailAddress = oView.byId("_IDGenInput8").getValue(); } catch { };
                try { var CardCode = oView.byId("_IDGenInput9").getValue(); } catch { };
                try { var CardName = oView.byId("_IDGenInput10").getValue(); } catch { };

                let view = this.getView(); //Capture instance of current view in a vairable

                // var sUrl = "/proxy/b1s/v2/BusinessPartners('VMAT100002')";
                var sUrl = "/proxy/b1s/v2/BusinessPartners";
                // debugger;
                try { var oParameters = this.getView().getModel("FakeoModel"); } catch { }
                //ANURADHA++ //First store the Global variable in this
                oParameters.CardCode = CardCode,
                    oParameters.CardName = CardName;
                oParameters.CardType = CardType;
                oParameters.GroupCode = GroupCode;
                oParameters.Address = Address;
                oParameters.ZipCode = ZipCode;
                oParameters.Phone1 = Phone1;
                oParameters.Phone2 = Phone2;
                oParameters.Currency = Currency;
                oParameters.EmailAddress = EmailAddress;
                //Additional Code
                oParameters.ContactEmployees = [];
                oParameters.ContactPerson = "";
                //

                // var oParameters = {
                //     CardCode: CardCode,
                //     CardName: CardName,
                //     CardType: CardType,
                //     GroupCode: GroupCode,
                //     Address: Address,
                //     ZipCode: ZipCode,
                //     Phone1: Phone1,
                //     Phone2: Phone2,
                //     Currency: Currency,
                //     EmailAddress: EmailAddress,
                //     BPAddresses: [{
                //         State: "MH"
                //     }]
                // };
                // Load jQuery library using sap.ui.require()
                sap.ui.require(["sap/ui/thirdparty/jquery"], function (jQuery) {
                    // Make an HTTP GET request using jQuery.ajax()
                    jQuery.ajax({
                        url: sUrl,
                        type: "POST",
                        data: JSON.stringify(oParameters),
                        contentType: "application/json",
                        dataType: "json", // Change the dataType based on your response format (e.g., "json", "xml", "text", etc.)
                        success: function (data) {
                            // Process the response data
                            // console.log("Data:", data);
                            const Tempcontroller =
                                sap.ui.controller("ar.com.cardproject2.controller.Details"); //capture instance of your controller in another method
                            Tempcontroller.getView = function () { //get instance of the view
                                return view;
                            };
                            // alert("Data saved Succesfully");
                            var lv_msg = 'Data saved in new CardCode' + " " + data.CardCode;
                            alert(lv_msg);
                        },
                        error: function (xhr, status, error) {
                            // Handle error
                            // console.error("Error:", error);
                            const Tempcontroller =
                                sap.ui.controller("ar.com.cardproject2.controller.Details"); //capture instance of your controller in another method
                            Tempcontroller.getView = function () { //get instance of the view
                                return view;
                            };
                            alert(error);
                        }
                    });
                });
            },
            setEditableInput: function (oId) {
                // Assuming you have access to the view and its ID
                var oView = this.getView();
                // Access the Input control using its ID
                var oInputCardType = oView.byId(oId);

                var currentEdit = oInputCardType.getEditable();
                // Set the Input field as non-editable (read-only)
                oInputCardType.setEditable(!currentEdit);
            }
            // ,
            // setBusinessGlobalData: function (oData) {
            //     this.BusinessData = oData;
            // },
            // getBusinessGlobalData: function () {
            //     return this.BusinessData;
            // }
        });
    });
