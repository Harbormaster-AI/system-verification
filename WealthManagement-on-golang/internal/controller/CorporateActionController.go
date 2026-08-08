package controller

import (
    CorporateActionDAO "WealthManagement-on-golang/internal/dao"
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"net/http"
	"strconv"
)

//----------------------------------------------------------------------------
// Create controller, delegates to CorporateActionDAO for database creation
//----------------------------------------------------------------------------
func CreateCorporateAction(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty CorporateAction model
	//----------------------------------------------------------------------------
	data := model.CorporateAction{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a CorporateAction model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the CorporateAction data access object to create
	//----------------------------------------------------------------------------
	requestResult := CorporateActionDAO.CreateCorporateAction( data )
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Get controller, delegates to CorporateActionDAO to find the relevant CorporateAction
//----------------------------------------------------------------------------
func GetCorporateAction(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the CorporateAction data access object
	// find the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := CorporateActionDAO.GetCorporateAction(ID)
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}


//----------------------------------------------------------------------------
// GetAll controller, delegates to CorporateActionDAO for database read of all CorporateActions
//----------------------------------------------------------------------------
func GetAllCorporateAction(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Delegate to the CorporateAction data access object to get all
	//----------------------------------------------------------------------------
	requestResult := CorporateActionDAO.GetAllCorporateAction()
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Update controller, delegates to CorporateActionDAO for database save
//----------------------------------------------------------------------------
func UpdateCorporateAction(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty CorporateAction model
	//----------------------------------------------------------------------------
	var data = model.CorporateAction{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a CorporateAction model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the CorporateAction data access object
	// update the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := CorporateActionDAO.UpdateCorporateAction(data)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Delete controller, delegates to CorporateActionDAO for database deletion
//----------------------------------------------------------------------------
func DeleteCorporateAction(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the CorporateAction data access object
	// delete the one with the matching identifier
	//----------------------------------------------------------------------------	
	requestResult := CorporateActionDAO.DeleteCorporateAction(ID)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// assigns a Security on a CorporateAction
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func AssignSecurityToCorporateAction(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	corporateActionId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	securityId,_ := strconv.ParseUint( vars["securityId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the CorporateAction DAO
	//----------------------------------------------------------------------------
	requestResult := CorporateActionDAO.AssignSecurityToCorporateAction(corporateActionId, securityId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a Security on a CorporateAction
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func UnassignSecurityFromCorporateAction( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	corporateActionId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the CorporateAction DAO
	//----------------------------------------------------------------------------
	requestResult := CorporateActionDAO.UnassignSecurityFromCorporateAction(corporateActionId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}


	//----------------------------------------------------------------------------
	// adds one or more dividendsIds as a Dividends to a CorporateAction
	//----------------------------------------------------------------------------
func AddDividendsToCorporateAction(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	corporateActionId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	dividendsIds,_ := vars["dividendsIds"]

	//----------------------------------------------------------------------------
	// Delegate to the CorporateAction DAO
	//----------------------------------------------------------------------------
	requestResult := CorporateActionDAO.AddDividendsToCorporateAction(corporateActionId, dividendsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more dividendsIds as a Dividends from a CorporateAction
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func RemoveDividendsFromCorporateAction(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	corporateActionId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	dividendsIds,_ := vars["dividendsIds"]

	//----------------------------------------------------------------------------
	// Delegate to the CorporateAction DAO
	//----------------------------------------------------------------------------
	requestResult := CorporateActionDAO.RemoveDividendsFromCorporateAction(corporateActionId, dividendsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
