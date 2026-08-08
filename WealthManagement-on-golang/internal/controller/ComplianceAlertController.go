package controller

import (
    ComplianceAlertDAO "WealthManagement-on-golang/internal/dao"
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"net/http"
	"strconv"
)

//----------------------------------------------------------------------------
// Create controller, delegates to ComplianceAlertDAO for database creation
//----------------------------------------------------------------------------
func CreateComplianceAlert(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty ComplianceAlert model
	//----------------------------------------------------------------------------
	data := model.ComplianceAlert{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a ComplianceAlert model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the ComplianceAlert data access object to create
	//----------------------------------------------------------------------------
	requestResult := ComplianceAlertDAO.CreateComplianceAlert( data )
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Get controller, delegates to ComplianceAlertDAO to find the relevant ComplianceAlert
//----------------------------------------------------------------------------
func GetComplianceAlert(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the ComplianceAlert data access object
	// find the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := ComplianceAlertDAO.GetComplianceAlert(ID)
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}


//----------------------------------------------------------------------------
// GetAll controller, delegates to ComplianceAlertDAO for database read of all ComplianceAlerts
//----------------------------------------------------------------------------
func GetAllComplianceAlert(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Delegate to the ComplianceAlert data access object to get all
	//----------------------------------------------------------------------------
	requestResult := ComplianceAlertDAO.GetAllComplianceAlert()
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Update controller, delegates to ComplianceAlertDAO for database save
//----------------------------------------------------------------------------
func UpdateComplianceAlert(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty ComplianceAlert model
	//----------------------------------------------------------------------------
	var data = model.ComplianceAlert{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a ComplianceAlert model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the ComplianceAlert data access object
	// update the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := ComplianceAlertDAO.UpdateComplianceAlert(data)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Delete controller, delegates to ComplianceAlertDAO for database deletion
//----------------------------------------------------------------------------
func DeleteComplianceAlert(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the ComplianceAlert data access object
	// delete the one with the matching identifier
	//----------------------------------------------------------------------------	
	requestResult := ComplianceAlertDAO.DeleteComplianceAlert(ID)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// assigns a Rule on a ComplianceAlert
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func AssignRuleToComplianceAlert(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	complianceAlertId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	ruleId,_ := strconv.ParseUint( vars["ruleId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the ComplianceAlert DAO
	//----------------------------------------------------------------------------
	requestResult := ComplianceAlertDAO.AssignRuleToComplianceAlert(complianceAlertId, ruleId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a Rule on a ComplianceAlert
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func UnassignRuleFromComplianceAlert( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	complianceAlertId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the ComplianceAlert DAO
	//----------------------------------------------------------------------------
	requestResult := ComplianceAlertDAO.UnassignRuleFromComplianceAlert(complianceAlertId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}

	//----------------------------------------------------------------------------
	// assigns a Account on a ComplianceAlert
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func AssignAccountToComplianceAlert(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	complianceAlertId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	accountId,_ := strconv.ParseUint( vars["accountId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the ComplianceAlert DAO
	//----------------------------------------------------------------------------
	requestResult := ComplianceAlertDAO.AssignAccountToComplianceAlert(complianceAlertId, accountId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a Account on a ComplianceAlert
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func UnassignAccountFromComplianceAlert( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	complianceAlertId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the ComplianceAlert DAO
	//----------------------------------------------------------------------------
	requestResult := ComplianceAlertDAO.UnassignAccountFromComplianceAlert(complianceAlertId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}

	//----------------------------------------------------------------------------
	// assigns a Order on a ComplianceAlert
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func AssignOrderToComplianceAlert(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	complianceAlertId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	orderId,_ := strconv.ParseUint( vars["orderId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the ComplianceAlert DAO
	//----------------------------------------------------------------------------
	requestResult := ComplianceAlertDAO.AssignOrderToComplianceAlert(complianceAlertId, orderId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a Order on a ComplianceAlert
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func UnassignOrderFromComplianceAlert( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	complianceAlertId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the ComplianceAlert DAO
	//----------------------------------------------------------------------------
	requestResult := ComplianceAlertDAO.UnassignOrderFromComplianceAlert(complianceAlertId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}

	//----------------------------------------------------------------------------
	// assigns a Advisor on a ComplianceAlert
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func AssignAdvisorToComplianceAlert(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	complianceAlertId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	advisorId,_ := strconv.ParseUint( vars["advisorId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the ComplianceAlert DAO
	//----------------------------------------------------------------------------
	requestResult := ComplianceAlertDAO.AssignAdvisorToComplianceAlert(complianceAlertId, advisorId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a Advisor on a ComplianceAlert
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func UnassignAdvisorFromComplianceAlert( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	complianceAlertId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the ComplianceAlert DAO
	//----------------------------------------------------------------------------
	requestResult := ComplianceAlertDAO.UnassignAdvisorFromComplianceAlert(complianceAlertId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}


