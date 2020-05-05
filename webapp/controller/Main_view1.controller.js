sap.ui.define(["sap/ui/core/mvc/Controller",	"../model/formatter",], function (Controller, formatter) {
	"use strict";
	return Controller.extend("com.sap.TRAVEL_PROJECT_1.controller.Main_view1", {
		formatter: formatter,
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.sap.TRAVEL_PROJECT_1.view.Main_view1
		 */
		onInit: function (oEvent) {
			var oR = sap.ui.core.UIComponent.getRouterFor(this);
			oR.getRoute("route_mainv").attachMatched(this._onLoad1, this);
		},
		logout: function () {
			var oR = sap.ui.core.UIComponent.getRouterFor(this);
			oR.navTo("route_login");
		},
		//	
		createRequest: function (oEvent3) {
			if (!this.newCreate) {
				this.newCreate = sap.ui.xmlfragment("com.sap.TRAVEL_PROJECT_1.view.create", this);
			}
			this.newCreate.open();
		},
		close: function () {
			this.newCreate.close();
		},
		//
		viewDetails: function (oEvent2) {
			var oR = sap.ui.core.UIComponent.getRouterFor(this);
			var name1 = this.oArg.Name;
			var reqid1 = oEvent2.getSource().getBindingContext().getProperty("Reqid");
			
;			oR.navTo("route_details", {
				name_d: name1,
				reqid: reqid1
			});
		},
		Onsave :function(oEvent){
		var postData = {};
	   postData.INumber = this.oArg.Name;
		var destination = sap.ui.getCore().byId("dest1").getValue();
		var exp = sap.ui.getCore().byId("box01").getSelectedKey();
		var billamt = sap.ui.getCore().byId("bamt1").getValue();
		var billno = sap.ui.getCore().byId("bno1").getValue();
		var travd = new Date(sap.ui.getCore().byId("picker01").getValue());
		var comments = sap.ui.getCore().byId("comments1").getValue();
		var mdate = new Date().getTime();
		var cdate = new Date().getTime();
	
		//postData.Reqid = this.getView().byId("rid").getText();
		postData.Status = "PROGRESS";
		postData.Destination = destination;
		postData.ExpenseType = exp;
		postData.Comments = comments;
		postData.Billamt = billamt;
		postData.Billno = billno;
		postData.Transd = this.formatDate(travd.toString()).slice(0,15);
		postData.Reqdate = "\/Date("+cdate+")\/";
		 //postData.Moddate ="\/Date(1584835200000)\/";
		 postData.Moddate ="\/Date("+mdate+")\/";
		 var oModel = this.getOwnerComponent().getModel();
	
		
		//postData.INumber = oEvent.getSource().getBindingContext().getProperty("INumber");
			oModel.create("/TRAVEL_DETAILSet", postData,  {
				success: function() {
					sap.m.MessageBox.show("Created successfully!", {
						icon: sap.m.MessageBox.Icon.SUCCESS,
						title: "Information!"
					});
					oModel.refresh(true);
				},
				error: function() {
					sap.m.MessageBox.show("Error. Failed to create the Request! Please try again later,", {
						icon: sap.m.MessageBox.Icon.ERROR,
						title: "Info!"
					});
				}
			});
			
			oModel.refresh(true);
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
},
		// _onLoad : function(oEvent){
		// 	 var oModel = this.getView().getModel();
		//        var oArg = oEvent.getParameter("arguments");
		// 	 var name1 = oArg.Name;
		// 	// var password1 = oArg.Password; 
		//  		 var oView = this.getView();
		//           var oHandle = oModel.callFunction("/DISPLAY_TRAVEL_DETAILS", {urlParameters: {INUMBER : name1}});
		//           oHandle.contextCreated().then(function(oContext) {
		//          	oView.setBindingContext(oContext);
		//             }).catch(function(oError){sap.m.MessageToast.show("ERROR", {duration: 3000});});
		// },
		_onLoad1: function (oEvent) {
				var oModel = this.getView().getModel();
				//var oArg = oEvent.getParameter("arguments");
				//var name1 = oArg.Name;
				this.oArg = oEvent.getParameter("arguments");
				var b = this.oArg;
				var name1 = this.oArg.Name;
				var oView = this.getView();
				oModel.callFunction("/DISPLAY_TRAVEL_DETAILS", {
					method: "GET",
					urlParameters: {
						INUMBER: name1
					},
					success: function (oData) {
						var jModel = new sap.ui.model.json.JSONModel();
						jModel.setData(oData);
						oView.setModel(jModel);
					},
					error: function (oError) {
						sap.m.MessageToast.show("FAILURE", {
							duration: 3000
						});
					}
				});
			}
			/**
			 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
			 * (NOT before the first rendering! onInit() is used for that one!).
			 * @memberOf com.sap.TRAVEL_PROJECT_1.view.Main_view1
			 */
			//	onBeforeRendering: function() {
			//
			//	},
			/**
			 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
			 * This hook is the same one that SAPUI5 controls get after being rendered.
			 * @memberOf com.sap.TRAVEL_PROJECT_1.view.Main_view1
			 */
			//	onAfterRendering: function() {
			//
			//	},
			/**
			 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
			 * @memberOf com.sap.TRAVEL_PROJECT_1.view.Main_view1
			 */
			//	onExit: function() {
			//
			//	}
			,
		/**
		 *@memberOf com.sap.TRAVEL_PROJECT_1.controller.Main_view1
		 */
		action: function (oEvent) {
			var that = this;
			var actionParameters = JSON.parse(oEvent.getSource().data("wiring").replace(/'/g, "\""));
			var eventType = oEvent.getId();
			var aTargets = actionParameters[eventType].targets || [];
			aTargets.forEach(function (oTarget) {
				var oControl = that.byId(oTarget.id);
				if (oControl) {
					var oParams = {};
					for (var prop in oTarget.parameters) {
						oParams[prop] = oEvent.getParameter(oTarget.parameters[prop]);
					}
					oControl[oTarget.action](oParams);
				}
			});
			var oNavigation = actionParameters[eventType].navigation;
			if (oNavigation) {
				var oParams = {};
				(oNavigation.keys || []).forEach(function (prop) {
					oParams[prop.name] = encodeURIComponent(JSON.stringify({
						value: oEvent.getSource().getBindingContext(oNavigation.model).getProperty(prop.name),
						type: prop.type
					}));
				});
				if (Object.getOwnPropertyNames(oParams).length !== 0) {
					this.getOwnerComponent().getRouter().navTo(oNavigation.routeName, oParams);
				} else {
					this.getOwnerComponent().getRouter().navTo(oNavigation.routeName);
				}
			}
		}
	});
});