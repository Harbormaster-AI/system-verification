package controller

import (
    CashMovementDAO "WealthManagement-on-golang/internal/dao"
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"net/http"
	"strconv"
)

//----------------------------------------------------------------------------
// Create controller, delegates to CashMovementDAO for database creation
//----------------------------------------------------------------------------
func CreateCashMovement(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty CashMovement model
	//----------------------------------------------------------------------------
	data := model.CashMovement{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a CashMovement model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the CashMovement data access object to create
	//----------------------------------------------------------------------------
	requestResult := CashMovementDAO.CreateCashMovement( data )
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Get controller, delegates to CashMovementDAO to find the relevant CashMovement
//----------------------------------------------------------------------------
func GetCashMovement(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the CashMovement data access object
	// find the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := CashMovementDAO.GetCashMovement(ID)
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}


//----------------------------------------------------------------------------
// GetAll controller, delegates to CashMovementDAO for database read of all CashMovements
//----------------------------------------------------------------------------
func GetAllCashMovement(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Delegate to the CashMovement data access object to get all
	//----------------------------------------------------------------------------
	requestResult := CashMovementDAO.GetAllCashMovement()
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Update controller, delegates to CashMovementDAO for database save
//----------------------------------------------------------------------------
func UpdateCashMovement(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty CashMovement model
	//----------------------------------------------------------------------------
	var data = model.CashMovement{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a CashMovement model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the CashMovement data access object
	// update the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := CashMovementDAO.UpdateCashMovement(data)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Delete controller, delegates to CashMovementDAO for database deletion
//----------------------------------------------------------------------------
func DeleteCashMovement(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the CashMovement data access object
	// delete the one with the matching identifier
	//----------------------------------------------------------------------------	
	requestResult := CashMovementDAO.DeleteCashMovement(ID)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// assigns a Account on a CashMovement
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func AssignAccountToCashMovement(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	cashMovementId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	accountId,_ := strconv.ParseUint( vars["accountId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the CashMovement DAO
	//----------------------------------------------------------------------------
	requestResult := CashMovementDAO.AssignAccountToCashMovement(cashMovementId, accountId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a Account on a CashMovement
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func UnassignAccountFromCashMovement( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	cashMovementId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the CashMovement DAO
	//----------------------------------------------------------------------------
	requestResult := CashMovementDAO.UnassignAccountFromCashMovement(cashMovementId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}

	//----------------------------------------------------------------------------
	// assigns a RelatedInstruction on a CashMovement
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func AssignRelatedInstructionToCashMovement(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	cashMovementId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	relatedInstructionId,_ := strconv.ParseUint( vars["relatedInstructionId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the CashMovement DAO
	//----------------------------------------------------------------------------
	requestResult := CashMovementDAO.AssignRelatedInstructionToCashMovement(cashMovementId, relatedInstructionId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a RelatedInstruction on a CashMovement
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func UnassignRelatedInstructionFromCashMovement( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	cashMovementId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the CashMovement DAO
	//----------------------------------------------------------------------------
	requestResult := CashMovementDAO.UnassignRelatedInstructionFromCashMovement(cashMovementId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}

	//----------------------------------------------------------------------------
	// assigns a RelatedTransaction on a CashMovement
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func AssignRelatedTransactionToCashMovement(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	cashMovementId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	relatedTransactionId,_ := strconv.ParseUint( vars["relatedTransactionId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the CashMovement DAO
	//----------------------------------------------------------------------------
	requestResult := CashMovementDAO.AssignRelatedTransactionToCashMovement(cashMovementId, relatedTransactionId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a RelatedTransaction on a CashMovement
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func UnassignRelatedTransactionFromCashMovement( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	cashMovementId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the CashMovement DAO
	//----------------------------------------------------------------------------
	requestResult := CashMovementDAO.UnassignRelatedTransactionFromCashMovement(cashMovementId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}


