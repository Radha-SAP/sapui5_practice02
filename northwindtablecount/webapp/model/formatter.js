sap.ui.define([
    "sap/ui/library"
] , function (coreLibrary){
    var ValueState = coreLibrary.ValueState;
    "use strict";
    return{
        numberUnit : function (sValue){
            if(!sValue){
                return "";
            }
            return parseFloat(sValue).toFixed(2);
        },
        discountstate: function(iValue){
            if (iValue===0){
                return ValueState.Error;
            } else if (iValue<1){
                return ValueState.Warning;
            } else {
                return ValueState.Success;
            }
        }
    }
})