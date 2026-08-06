package controller

import (
    ComplianceRuleDAO "WealthManagement-on-golang/internal/dao"
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"net/http"
	"strconv"
)

//----------------------------------------------------------------------------
// Create controller, delegates to ComplianceRuleDAO for database creation
//----------------------------------------------------------------------------
func CreateComplianceRule(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty ComplianceRule model
	//----------------------------------------------------------------------------
	data := model.ComplianceRule{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a ComplianceRule model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the ComplianceRule data access object to create
	//----------------------------------------------------------------------------
	requestResult := ComplianceRuleDAO.CreateComplianceRule( data )
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Get controller, delegates to ComplianceRuleDAO to find the relevant ComplianceRule
//----------------------------------------------------------------------------
func GetComplianceRule(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Retrieve the parameter from the request using hte mux
	//----------------------------------------------------------------------------
	vars := mux.Vars(r)
	
	//----------------------------------------------------------------------------
	// Locate the value for the ID key
	//----------------------------------------------------------------------------	
	id := vars["id"]
	
	//----------------------------------------------------------------------------
	// Parse the value into an integer if provided as such
	//----------------------------------------------------------------------------	
	ID, err:= strconv.ParseUint(id, 10, 64)
	if err != nil {
		fmt.Println("Error while parsing")
	}
	
	//----------------------------------------------------------------------------
	// Delegate to the ComplianceRule data access object
	// find the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := ComplianceRuleDAO.GetComplianceRule(ID)
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}


//----------------------------------------------------------------------------
// GetAll controller, delegates to ComplianceRuleDAO for database read of all ComplianceRules
//----------------------------------------------------------------------------
func GetAllComplianceRule(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Delegate to the ComplianceRule data access object to get all
	//----------------------------------------------------------------------------
	requestResult := ComplianceRuleDAO.GetAllComplianceRule()
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Update controller, delegates to ComplianceRuleDAO for database save
//----------------------------------------------------------------------------
func UpdateComplianceRule(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty ComplianceRule model
	//----------------------------------------------------------------------------
	var data = model.ComplianceRule{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a ComplianceRule model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the ComplianceRule data access object
	// update the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := ComplianceRuleDAO.UpdateComplianceRule(data)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Delete controller, delegates to ComplianceRuleDAO for database deletion
//----------------------------------------------------------------------------
func DeleteComplianceRule(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Retrieve the parameter from the request using hte mux
	//----------------------------------------------------------------------------
	vars := mux.Vars(r)
	
	//----------------------------------------------------------------------------
	// Locate the value for the ID key
	//----------------------------------------------------------------------------	
	id := vars["id"]

	//----------------------------------------------------------------------------
	// Parse the value into an integer if provided as such
	//----------------------------------------------------------------------------	
	ID, err:= strconv.ParseUint(id, 10, 64)
	if err != nil {
		fmt.Println("Error while parsing")
	}

	//----------------------------------------------------------------------------
	// Delegate to the ComplianceRule data access object
	// delete the one with the matching identifier
	//----------------------------------------------------------------------------	
	requestResult := ComplianceRuleDAO.DeleteComplianceRule(ID)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}


	//----------------------------------------------------------------------------
	// adds one or more alertsIds as a Alerts to a ComplianceRule
	//----------------------------------------------------------------------------
func AddAlertsToComplianceRule(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	complianceRuleId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	alertsIds,_ := vars["alertsIds"]

	//----------------------------------------------------------------------------
	// Delegate to the ComplianceRule DAO
	//----------------------------------------------------------------------------
	requestResult := ComplianceRuleDAO.AddAlertsToComplianceRule(complianceRuleId, alertsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more alertsIds as a Alerts from a ComplianceRule
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func RemoveAlertsFromComplianceRule(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	complianceRuleId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	alertsIds,_ := vars["alertsIds"]

	//----------------------------------------------------------------------------
	// Delegate to the ComplianceRule DAO
	//----------------------------------------------------------------------------
	requestResult := ComplianceRuleDAO.RemoveAlertsFromComplianceRule(complianceRuleId, alertsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
