function initModel() {
	var sUrl = "/sap/opu/odata/sap/ZODATA_TRAVEL_APP1_SRV/";
	var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
	sap.ui.getCore().setModel(oModel);
}