sap.ui.define([
	"sap/m/MessageBox",
	"sap/ui/core/mvc/Controller"
], function (MessageBox, Controller) {
	"use strict";

	return Controller.extend("com.sap.TRAVEL_PROJECT_1.controller.Login1", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.sap.TRAVEL_PROJECT_1.view.Login1
		 */
		onInit: function () {

		},
		
			Loginfn: function (oEvent) {
		     var oR = sap.ui.core.UIComponent.getRouterFor(this);
		     var lbl = this.getView().byId("lbl");
			 var name = this.getView().byId("UN").getValue();
			 var password = this.getView().byId("PWD").getValue();
			 var oModel = this.getView().getModel();
			 var th=this;
			  oModel.callFunction(
              "/CHECK_IF_EMP_EXISTS", {
                  method: "GET",
                  urlParameters: {
                     INUMBER: name,
                     PWD: password
                    },
                  success: function(oData) {
                  //sap.m.MessageToast.show("SUCCESS", {duration: 3000});
                  	oR.navTo("route_mainv", {
					Name : name
					
			      	});
                    },
                  error: function(oError) {
                   //console.log("oError");
                   //console.log(oError.responseText);
			      // th.show();
			      //lbl.setText("failure");
			       th._showErrorMessage(JSON.parse(oError.responseText).error.message.value, "");
                    } 
                });
		},
		
		// show :function(){
		// 	alert("AJHS");
		// },
		
		_showErrorMessage: function (msgText, msgDetail) {
				var self = this;
				MessageBox.error(msgText, {
					icon: MessageBox.Icon.ERROR,
					title: self.getView().getModel("i18n").getResourceBundle().getText("Error_Title"),
					actions: [MessageBox.Action.CLOSE],
					details: msgDetail
				});
			},
		

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.sap.TRAVEL_PROJECT_1.view.Login1
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.sap.TRAVEL_PROJECT_1.view.Login1
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.sap.TRAVEL_PROJECT_1.view.Login1
		 */
		//	onExit: function() {
		//
		//	}

	});

});