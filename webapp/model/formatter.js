sap.ui.define([], function () {
	"use strict";

	return {
		/**
		 * Rounds the currency value to 2 digits
		 *
		 * @public
		 * @param {string} sStatus value to be formatted
		 * @returns {string} formatted status
		 */
		status : function (sStatus) {
		
			if (sStatus === "APPROVED") {
		        return "Success";
		      } else if (sStatus === "PROGRESS") {
		        return "Warning";
		      } else if (sStatus === "REJECTED"){
		        return "Error";
		      } else {
		        return "None";
		      }
		},
	
			status1 :  function (sStatus) {
			
				if (sStatus === "INFO") {
					var a ="AJHS";
					
					return a;
				} else if (sStatus === "APPROVED") {
					return "Warning";
				} else if (sStatus === "FAIL"){
					return "Error";
				} else {
					return "None";
				}
		}
	};
});