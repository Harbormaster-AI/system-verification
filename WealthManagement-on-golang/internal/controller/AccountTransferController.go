package controller

import (
    AccountTransferDAO "WealthManagement-on-golang/internal/dao"
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"net/http"
	"strconv"
)

//----------------------------------------------------------------------------
// Create controller, delegates to AccountTransferDAO for database creation
//----------------------------------------------------------------------------
func CreateAccountTransfer(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty AccountTransfer model
	//----------------------------------------------------------------------------
	data := model.AccountTransfer{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a AccountTransfer model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the AccountTransfer data access object to create
	//----------------------------------------------------------------------------
	requestResult := AccountTransferDAO.CreateAccountTransfer( data )
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Get controller, delegates to AccountTransferDAO to find the relevant AccountTransfer
//----------------------------------------------------------------------------
func GetAccountTransfer(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the AccountTransfer data access object
	// find the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := AccountTransferDAO.GetAccountTransfer(ID)
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}


//----------------------------------------------------------------------------
// GetAll controller, delegates to AccountTransferDAO for database read of all AccountTransfers
//----------------------------------------------------------------------------
func GetAllAccountTransfer(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Delegate to the AccountTransfer data access object to get all
	//----------------------------------------------------------------------------
	requestResult := AccountTransferDAO.GetAllAccountTransfer()
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Update controller, delegates to AccountTransferDAO for database save
//----------------------------------------------------------------------------
func UpdateAccountTransfer(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty AccountTransfer model
	//----------------------------------------------------------------------------
	var data = model.AccountTransfer{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a AccountTransfer model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the AccountTransfer data access object
	// update the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := AccountTransferDAO.UpdateAccountTransfer(data)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Delete controller, delegates to AccountTransferDAO for database deletion
//----------------------------------------------------------------------------
func DeleteAccountTransfer(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the AccountTransfer data access object
	// delete the one with the matching identifier
	//----------------------------------------------------------------------------	
	requestResult := AccountTransferDAO.DeleteAccountTransfer(ID)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// assigns a FromCustodian on a AccountTransfer
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func AssignFromCustodianToAccountTransfer(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	accountTransferId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	fromCustodianId,_ := strconv.ParseUint( vars["fromCustodianId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the AccountTransfer DAO
	//----------------------------------------------------------------------------
	requestResult := AccountTransferDAO.AssignFromCustodianToAccountTransfer(accountTransferId, fromCustodianId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a FromCustodian on a AccountTransfer
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func UnassignFromCustodianFromAccountTransfer( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	accountTransferId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the AccountTransfer DAO
	//----------------------------------------------------------------------------
	requestResult := AccountTransferDAO.UnassignFromCustodianFromAccountTransfer(accountTransferId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}

	//----------------------------------------------------------------------------
	// assigns a ToCustodian on a AccountTransfer
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func AssignToCustodianToAccountTransfer(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	accountTransferId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	toCustodianId,_ := strconv.ParseUint( vars["toCustodianId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the AccountTransfer DAO
	//----------------------------------------------------------------------------
	requestResult := AccountTransferDAO.AssignToCustodianToAccountTransfer(accountTransferId, toCustodianId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a ToCustodian on a AccountTransfer
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func UnassignToCustodianFromAccountTransfer( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	accountTransferId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the AccountTransfer DAO
	//----------------------------------------------------------------------------
	requestResult := AccountTransferDAO.UnassignToCustodianFromAccountTransfer(accountTransferId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}

	//----------------------------------------------------------------------------
	// assigns a Account on a AccountTransfer
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func AssignAccountToAccountTransfer(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	accountTransferId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	accountId,_ := strconv.ParseUint( vars["accountId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the AccountTransfer DAO
	//----------------------------------------------------------------------------
	requestResult := AccountTransferDAO.AssignAccountToAccountTransfer(accountTransferId, accountId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a Account on a AccountTransfer
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func UnassignAccountFromAccountTransfer( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	accountTransferId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the AccountTransfer DAO
	//----------------------------------------------------------------------------
	requestResult := AccountTransferDAO.UnassignAccountFromAccountTransfer(accountTransferId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}


