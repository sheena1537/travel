sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("com.sap.TRAVEL_PROJECT_1.controller.Details1", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.sap.TRAVEL_PROJECT_1.view.Details1
		 */
		onInit: function () {
		
			this.getView().byId("adest").setEnabled(false);
			this.getView().byId("box0").setEnabled(false);
			this.getView().byId("bamt").setEnabled(false);
			this.getView().byId("bno").setEnabled(false);
			this.getView().byId("picker0").setEnabled(false);
			this.getView().byId("comments").setEnabled(false);
			this.getView().byId("billupload").setUploadEnabled(false);
			var oR = sap.ui.core.UIComponent.getRouterFor(this);
			oR.getRoute("route_details").attachMatched(this._onLoad_details,this);
		},
		_onLoad_details: function(oEvent){
			this.oArg = oEvent.getParameter("arguments");
			this.name1 = this.oArg.name_d;
			this.reqid1 = this.oArg.reqid;
			
			var ov = this.getView();
			 var oModel = ov.getModel();
			// 	ov.bindElement({
			// 	path: "/TRAVEL_DETAILSet(5)"
			// });
			var path1 = "/TRAVEL_DETAILSet(" + this.reqid1 + ")";
			var p =	ov.bindElement({
				path: path1
			});
			
			// oModel.read(path1, {
					
					// success: function (oData) {
					// alert("success");
					// 	var jModel = new sap.ui.model.json.JSONModel();
					// 	jModel.setData(oData);
					// 	ov.setModel(jModel);
					// 	ov.bindElement(jModel);
					// console.log("odata");
					// console.log(oData);
					// },
					// error: function (oError) {}
						
					// });
			console.log("p");
			console.log(p);
			
		},
		
		goBack : function(){
			this.getView().byId("adest").setEnabled(false);
			this.getView().byId("box0").setEnabled(false);
			this.getView().byId("bamt").setEnabled(false);
			this.getView().byId("bno").setEnabled(false);
			this.getView().byId("picker0").setEnabled(false);
			this.getView().byId("comments").setEnabled(false);
			this.getView().byId("billupload").setUploadEnabled(false);
			var oR = sap.ui.core.UIComponent.getRouterFor(this);
			oR.navTo("route_mainv", {
					Name : this.name1
			      	});
		},
// 		onEdit : function(){
			
// 			this.getView().byId("adest").setEnabled(true);
// 			this.getView().byId("box0").setEnabled(true);
// 			this.getView().byId("bamt").setEnabled(true);
// 			this.getView().byId("bno").setEnabled(true);
// 			this.getView().byId("picker0").setEnabled(true);
// 			this.getView().byId("comments").setEnabled(true);
// 			this.getView().byId("billupload").setUploadEnabled(true);
// 			var oNumberFormat = sap.ui.core.format.NumberFormat.getFloatInstance({
// 				      maxIntegerDigits: 8,
// 					  maxFractionDigits: 2,
// 					  groupingEnabled: true,
// 					  groupingSeparator: ",",
// 					  decimalSeparator: "."
// 					}); //Returns a NumberFormat instance for float
// /*var oNumberFormat = sap.ui.core.format.NumberFormat.getIntegerInstance({
//   maxFractionDigits: 0,
//   groupingEnabled: false
// }); //Returns a NumberFormat instance for integer*/

// 					var oField = this.getView().byId("bamt");
// 						var fValue = this.getView().byId("bamt").getValue();
// 					oField.setValue(oNumberFormat.format(fValue)); // Set the formatted value on the text field
// 					oField.attachChange(function(){
// 					  //Parse the user input
// 					  fValue = oNumberFormat.parse(oField.getValue());
// 					    alert(fValue);
// 					});


// 		}

onEdit : function(){
			var status = this.getView().byId("stat").getText();
			if((status==="PROGRESS")||(status==="INFO"))
			{
			this.getView().byId("adest").setEnabled(true);
			this.getView().byId("box0").setEnabled(true);
			this.getView().byId("bamt").setEnabled(true);
			this.getView().byId("bno").setEnabled(true);
			this.getView().byId("picker0").setEnabled(true);
			this.getView().byId("comments").setEnabled(true);
			this.getView().byId("billupload").setUploadEnabled(true);
			}
		},
		
		
onSave: function (oEvent) {

		var reqid = this.getView().byId("rid").getText();
		var status = this.getView().byId("stat").getText();
		var cdate = this.getView().byId("cid").getText();
		//var mdate = this.getView().byId("mid").getText();
		var destination = this.getView().byId("adest").getValue();
		var exp = this.getView().byId("box0").getSelectedKey();
		var billamt = this.getView().byId("bamt").getValue();
		var billno = this.getView().byId("bno").getValue();
		var travd = new Date(this.getView().byId("picker0").getValue());
		var comments = this.getView().byId("comments").getValue();
		//var botname = oEvent.getBindingContext().getProperty("INumber");
		var inumber = this.getView().byId("i").getText();
		var mdate = new Date().getTime();
		var postData = {};
		//postData.Reqid = this.getView().byId("rid").getText();
		postData.Status =status;
		postData.Destination = destination;
		postData.ExpenseType = exp;
		postData.Comments = comments;
		postData.Billamt = billamt;
		postData.Billno = billno;
		postData.Transd = this.formatDate(travd.toString()).slice(0,15);
		// postData.Reqdate = cdate.getTime();
		 //postData.Moddate ="\/Date(1584835200000)\/";
		 
		 postData.Moddate ="\/Date("+mdate+")\/";
		 
		var a = this.formatDate(travd.toString()).slice(0,15);
		//console.log(a);
		
		postData.INumber = inumber;
		var oModel = this.getOwnerComponent().getModel();
		var updateurl = "/TRAVEL_DETAILSSet('" + reqid + "')";
	  oModel.update("/TRAVEL_DETAILSet(" + reqid + ")", postData, {
				success: function() {
					sap.m.MessageBox.show("Updated successfully!", {
						icon: sap.m.MessageBox.Icon.SUCCESS,
						title: "Info!"
					});
				},
				error: function() {
					sap.m.MessageBox.show("Sorry,Can not Update the Product! Please try again later.", {
						icon: sap.m.MessageBox.Icon.ERROR,
						title: "Oops!"
					});
				}
			});
		
		
		
		
		
		
		
	


},
onDelete: function() {
			//This code was generated by the layout editor.
			var reqid = this.getView().byId("rid").getText();
			var oModel = this.getOwnerComponent().getModel();
				oModel.remove("/TRAVEL_DETAILSet(" + reqid + ")", {
					success: function() {
						
						sap.m.MessageBox.show("Deleted successfully!", {
							icon: sap.m.MessageBox.Icon.SUCCESS,
							title: "Information!"
						});
						//oModel.refresh(true);
					
					},
					error: function() {
						sap.m.MessageBox.show("Oops! Something wrong to Delete.", {
							icon: sap.m.MessageBox.Icon.ERROR,
							title: "Failed!"
						});
					}
				});
				//oModel.refresh(true);
			
			//oModel.refresh(true);
		},
 formatDate: function(date) {
    var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = "0" + month;
    if (day.length < 2) 
        day = "0" + day;

    return [year, month, day].join("-");
}
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.sap.TRAVEL_PROJECT_1.view.Details1
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.sap.TRAVEL_PROJECT_1.view.Details1
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.sap.TRAVEL_PROJECT_1.view.Details1
		 */
		//	onExit: function() {
		//
		//	}

	});

});