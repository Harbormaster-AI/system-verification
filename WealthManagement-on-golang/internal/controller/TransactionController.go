package controller

import (
    TransactionDAO "WealthManagement-on-golang/internal/dao"
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"net/http"
	"strconv"
)

//----------------------------------------------------------------------------
// Create controller, delegates to TransactionDAO for database creation
//----------------------------------------------------------------------------
func CreateTransaction(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty Transaction model
	//----------------------------------------------------------------------------
	data := model.Transaction{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a Transaction model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the Transaction data access object to create
	//----------------------------------------------------------------------------
	requestResult := TransactionDAO.CreateTransaction( data )
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Get controller, delegates to TransactionDAO to find the relevant Transaction
//----------------------------------------------------------------------------
func GetTransaction(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the Transaction data access object
	// find the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := TransactionDAO.GetTransaction(ID)
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}


//----------------------------------------------------------------------------
// GetAll controller, delegates to TransactionDAO for database read of all Transactions
//----------------------------------------------------------------------------
func GetAllTransaction(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Delegate to the Transaction data access object to get all
	//----------------------------------------------------------------------------
	requestResult := TransactionDAO.GetAllTransaction()
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Update controller, delegates to TransactionDAO for database save
//----------------------------------------------------------------------------
func UpdateTransaction(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty Transaction model
	//----------------------------------------------------------------------------
	var data = model.Transaction{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a Transaction model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the Transaction data access object
	// update the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := TransactionDAO.UpdateTransaction(data)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Delete controller, delegates to TransactionDAO for database deletion
//----------------------------------------------------------------------------
func DeleteTransaction(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the Transaction data access object
	// delete the one with the matching identifier
	//----------------------------------------------------------------------------	
	requestResult := TransactionDAO.DeleteTransaction(ID)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// assigns a Account on a Transaction
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func AssignAccountToTransaction(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	transactionId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	accountId,_ := strconv.ParseUint( vars["accountId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Transaction DAO
	//----------------------------------------------------------------------------
	requestResult := TransactionDAO.AssignAccountToTransaction(transactionId, accountId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a Account on a Transaction
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func UnassignAccountFromTransaction( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	transactionId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Transaction DAO
	//----------------------------------------------------------------------------
	requestResult := TransactionDAO.UnassignAccountFromTransaction(transactionId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}

	//----------------------------------------------------------------------------
	// assigns a Security on a Transaction
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func AssignSecurityToTransaction(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	transactionId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	securityId,_ := strconv.ParseUint( vars["securityId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Transaction DAO
	//----------------------------------------------------------------------------
	requestResult := TransactionDAO.AssignSecurityToTransaction(transactionId, securityId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a Security on a Transaction
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func UnassignSecurityFromTransaction( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	transactionId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Transaction DAO
	//----------------------------------------------------------------------------
	requestResult := TransactionDAO.UnassignSecurityFromTransaction(transactionId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}

	//----------------------------------------------------------------------------
	// assigns a Order on a Transaction
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func AssignOrderToTransaction(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	transactionId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	orderId,_ := strconv.ParseUint( vars["orderId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Transaction DAO
	//----------------------------------------------------------------------------
	requestResult := TransactionDAO.AssignOrderToTransaction(transactionId, orderId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a Order on a Transaction
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func UnassignOrderFromTransaction( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	transactionId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Transaction DAO
	//----------------------------------------------------------------------------
	requestResult := TransactionDAO.UnassignOrderFromTransaction(transactionId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}

	//----------------------------------------------------------------------------
	// assigns a Position on a Transaction
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func AssignPositionToTransaction(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	transactionId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	positionId,_ := strconv.ParseUint( vars["positionId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Transaction DAO
	//----------------------------------------------------------------------------
	requestResult := TransactionDAO.AssignPositionToTransaction(transactionId, positionId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a Position on a Transaction
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func UnassignPositionFromTransaction( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	transactionId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Transaction DAO
	//----------------------------------------------------------------------------
	requestResult := TransactionDAO.UnassignPositionFromTransaction(transactionId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}


