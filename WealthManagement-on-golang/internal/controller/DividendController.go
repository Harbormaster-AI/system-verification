package controller

import (
    DividendDAO "WealthManagement-on-golang/internal/dao"
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"net/http"
	"strconv"
)

//----------------------------------------------------------------------------
// Create controller, delegates to DividendDAO for database creation
//----------------------------------------------------------------------------
func CreateDividend(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty Dividend model
	//----------------------------------------------------------------------------
	data := model.Dividend{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a Dividend model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the Dividend data access object to create
	//----------------------------------------------------------------------------
	requestResult := DividendDAO.CreateDividend( data )
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Get controller, delegates to DividendDAO to find the relevant Dividend
//----------------------------------------------------------------------------
func GetDividend(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the Dividend data access object
	// find the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := DividendDAO.GetDividend(ID)
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}


//----------------------------------------------------------------------------
// GetAll controller, delegates to DividendDAO for database read of all Dividends
//----------------------------------------------------------------------------
func GetAllDividend(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Delegate to the Dividend data access object to get all
	//----------------------------------------------------------------------------
	requestResult := DividendDAO.GetAllDividend()
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Update controller, delegates to DividendDAO for database save
//----------------------------------------------------------------------------
func UpdateDividend(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty Dividend model
	//----------------------------------------------------------------------------
	var data = model.Dividend{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a Dividend model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the Dividend data access object
	// update the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := DividendDAO.UpdateDividend(data)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Delete controller, delegates to DividendDAO for database deletion
//----------------------------------------------------------------------------
func DeleteDividend(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the Dividend data access object
	// delete the one with the matching identifier
	//----------------------------------------------------------------------------	
	requestResult := DividendDAO.DeleteDividend(ID)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// assigns a CorporateAction on a Dividend
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func AssignCorporateActionToDividend(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	dividendId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	corporateActionId,_ := strconv.ParseUint( vars["corporateActionId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Dividend DAO
	//----------------------------------------------------------------------------
	requestResult := DividendDAO.AssignCorporateActionToDividend(dividendId, corporateActionId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a CorporateAction on a Dividend
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func UnassignCorporateActionFromDividend( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	dividendId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Dividend DAO
	//----------------------------------------------------------------------------
	requestResult := DividendDAO.UnassignCorporateActionFromDividend(dividendId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}


