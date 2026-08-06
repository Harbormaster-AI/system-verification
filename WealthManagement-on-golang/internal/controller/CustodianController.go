package controller

import (
    CustodianDAO "WealthManagement-on-golang/internal/dao"
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"net/http"
	"strconv"
)

//----------------------------------------------------------------------------
// Create controller, delegates to CustodianDAO for database creation
//----------------------------------------------------------------------------
func CreateCustodian(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty Custodian model
	//----------------------------------------------------------------------------
	data := model.Custodian{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a Custodian model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the Custodian data access object to create
	//----------------------------------------------------------------------------
	requestResult := CustodianDAO.CreateCustodian( data )
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Get controller, delegates to CustodianDAO to find the relevant Custodian
//----------------------------------------------------------------------------
func GetCustodian(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the Custodian data access object
	// find the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := CustodianDAO.GetCustodian(ID)
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}


//----------------------------------------------------------------------------
// GetAll controller, delegates to CustodianDAO for database read of all Custodians
//----------------------------------------------------------------------------
func GetAllCustodian(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Delegate to the Custodian data access object to get all
	//----------------------------------------------------------------------------
	requestResult := CustodianDAO.GetAllCustodian()
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Update controller, delegates to CustodianDAO for database save
//----------------------------------------------------------------------------
func UpdateCustodian(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty Custodian model
	//----------------------------------------------------------------------------
	var data = model.Custodian{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a Custodian model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the Custodian data access object
	// update the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := CustodianDAO.UpdateCustodian(data)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Delete controller, delegates to CustodianDAO for database deletion
//----------------------------------------------------------------------------
func DeleteCustodian(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the Custodian data access object
	// delete the one with the matching identifier
	//----------------------------------------------------------------------------	
	requestResult := CustodianDAO.DeleteCustodian(ID)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}


	//----------------------------------------------------------------------------
	// adds one or more accountsIds as a Accounts to a Custodian
	//----------------------------------------------------------------------------
func AddAccountsToCustodian(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	custodianId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	accountsIds,_ := vars["accountsIds"]

	//----------------------------------------------------------------------------
	// Delegate to the Custodian DAO
	//----------------------------------------------------------------------------
	requestResult := CustodianDAO.AddAccountsToCustodian(custodianId, accountsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more accountsIds as a Accounts from a Custodian
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func RemoveAccountsFromCustodian(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	custodianId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	accountsIds,_ := vars["accountsIds"]

	//----------------------------------------------------------------------------
	// Delegate to the Custodian DAO
	//----------------------------------------------------------------------------
	requestResult := CustodianDAO.RemoveAccountsFromCustodian(custodianId, accountsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
	//----------------------------------------------------------------------------
	// adds one or more transfersIds as a Transfers to a Custodian
	//----------------------------------------------------------------------------
func AddTransfersToCustodian(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	custodianId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	transfersIds,_ := vars["transfersIds"]

	//----------------------------------------------------------------------------
	// Delegate to the Custodian DAO
	//----------------------------------------------------------------------------
	requestResult := CustodianDAO.AddTransfersToCustodian(custodianId, transfersIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more transfersIds as a Transfers from a Custodian
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func RemoveTransfersFromCustodian(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	custodianId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	transfersIds,_ := vars["transfersIds"]

	//----------------------------------------------------------------------------
	// Delegate to the Custodian DAO
	//----------------------------------------------------------------------------
	requestResult := CustodianDAO.RemoveTransfersFromCustodian(custodianId, transfersIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
