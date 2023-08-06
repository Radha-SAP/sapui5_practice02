sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, MessageBox) {
        "use strict";

        return Controller.extend("ar.com.customerproject.controller.View", {
            onInit: function () {
                // write here code for actions or initialization supposed
                // to be happen before loading the view
            },
            onHandleChange: function () {                                 // This method is called as soon as we select something in customer code
                //Below get customer Name from additional text of customer code
                var customerName = this.getView().byId('_IDGenComboBox1').getSelectedItem().getProperty("additionalText");
                // Below as customer name we are getting is same odata call as of customer code,set value of customer name here
                var inputFieldUsingid = this.getView().byId('_IDGenText1');
                inputFieldUsingid.setValue(customerName);        //Syntax for set value of customer name

            },

            onPress: function () {
                // open below fragment for adding new entry into the table
                if (!this.pDialog) {
                    this.pDialog = this.loadFragment({
                        name: "ar.com.customerproject.view.Fragment.Myfragment"
                    });
                }
                this.pDialog.then(function (oDialog) {
                    oDialog.open();
                });
            },
            onSave: function () {
                // Add entry to the Table once user press save
                var oOrderData = this.getView().getModel("Order1").getData();      //First read what entries are added by user in fragment
                oOrderData.TotalPrice = oOrderData.ItemQuantity * oOrderData.ItemPrice; //Get the value of Total price in Column 
                var TotalPrice = "";                                 //Declare one more Variable to capture total price of all the rows
                var oModel = this.getOwnerComponent().getModel("Order1");  //Get the model ofthe main view    
                var aRegistros = oModel.getData();                          //Get data of model which is binded to the table from main view
                var Ord = {                                                 //Prepare the variable with data from fragment

                    "ItemCode": this.getView().byId('_IDGenComboBox2').getSelectedItem().getProperty("key"),
                    "ItemName": oOrderData.ItemName,
                    "ItemQuantity": oOrderData.ItemQuantity,
                    "ItemPrice": oOrderData.ItemPrice,
                    "TotalPrice": oOrderData.TotalPrice

                }
                aRegistros.Orders.push(Ord);                           //Insert the row in table
                oModel.setData(aRegistros);                             //Set data back to the main view table
                MessageBox.show("Record Added");                        //Display success message
                aRegistros = oModel.getData();                          //Get data again
                for (var i = 0; i < aRegistros.Orders.length; i++) {     //Added a loop on model, this will process the record one by one so that we can do the addition
                    var obj = aRegistros.Orders[i];                      //Select particular index of the model

                    if (!(obj.TotalPrice == "")) {                       // If total price is not blank, add it
                        TotalPrice = +TotalPrice + +obj.TotalPrice;      // Add total price from each row
                    }
                    if ((oModel.getData().Orders[0].ItemCode == "")) {    // Added a Loop on Model, this will process the record one by one, to delte empty row
                        var oData = oModel.getData();                     // Get Model data from main view
                        oData.Orders.splice(0, 1);                        // Delete empty record
                        oModel.setData(oData);
                    }
                }

                var inputFieldUsingid = this.getView().byId('_IDGenText12'); // set total price after addition for all rows calculated above to the view
                inputFieldUsingid.setValue(TotalPrice);
                this.pDialog.then(function (oDialog) {                       // close the dialog agter save
                    oDialog.close();
                }
                )

            },
            onHandleChangeItemCode: function () {                            // This function gets called when we select item code in fragment
                var customerName = this.getView().byId('_IDGenComboBox2').getSelectedItem().getProperty("additionalText");  // Get value of itemname once user selects to item code in dropdown

                var inputFieldUsingid = this.getView().byId('_IDGenInput2');  // Set value of itemName
                inputFieldUsingid.setValue(customerName);

            },
            onCancel: function (oEvent) {                                    //close the dialog
                this.pDialog.then(function (oDialog) {
                    oDialog.close();
                }
                )
            },
            oncreate: function (oEvent) {                                    //This method is called to create sales order
                var oTable = this.getView().byId("_IDGenTable1");                     //Get all table entries
                var aItems = this.getView().byId('_IDGenTable1').getItems();          //Get all table entries
                var child = [];                                                       //Define an array for items
                for (var i = 0; i < aItems.length; i++) {                             //For loop to process selected records one by one
                    var selectedRowdata = oTable.getSelectedContexts()[i].getObject();

                    child.push({                                                      //Push selected records in array                        
                        ItemCode: selectedRowdata.ItemCode,                           //Change body/Paylod details here, if backend team ask us to use different entity set or fieldname
                        ItemName: selectedRowdata.ItemName,
                        QuantityOrderedByCustomers: selectedRowdata.ItemPrice,
                        MovingAveragePrice: selectedRowdata.ItemQuantity
                    });
                }
                
                var oCustomerCode = this.getView().byId('_IDGenComboBox1').getSelectedItem().getProperty("key"); //Get/Read selected customer code from view
                var ocustomerName = this.getView().byId('_IDGenComboBox1').getSelectedItem().getProperty("additionalText"); //Get/Read selected customer Name from view
                var oDate = this.getView().byId('DP1').getValue(); //Get/Read the date from main view

                var requestBody = {};
                requestBody.Code = oCustomerCode;  //Change body/Paylod details here, if backend team ask us to use different entity set or fieldname
                requestBody.Name = ocustomerName;
                requestBody.Date = oDate;
                //Add child to request

                requestBody.Items = child;  //Prepare the final Deep structre

                //Trigger Post call with deep entity set to backend
                var sURI = 'http://14.143.90.245:50001/b1s/v2';
                var oModel = new sap.ui.model.odata.ODataModel(sURI, false);
                oModel.create('/U_CUSTOMERSUBGROUP', requestBody, null, //Send data to backend
                    function () { MessageBox.show('success') },
                    function () { MessageBox.show('failed') });
            }

        });
    });




    
