package controller

import (
    PositionDAO "WealthManagement-on-golang/internal/dao"
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"net/http"
	"strconv"
)

//----------------------------------------------------------------------------
// Create controller, delegates to PositionDAO for database creation
//----------------------------------------------------------------------------
func CreatePosition(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty Position model
	//----------------------------------------------------------------------------
	data := model.Position{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a Position model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the Position data access object to create
	//----------------------------------------------------------------------------
	requestResult := PositionDAO.CreatePosition( data )
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Get controller, delegates to PositionDAO to find the relevant Position
//----------------------------------------------------------------------------
func GetPosition(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the Position data access object
	// find the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := PositionDAO.GetPosition(ID)
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}


//----------------------------------------------------------------------------
// GetAll controller, delegates to PositionDAO for database read of all Positions
//----------------------------------------------------------------------------
func GetAllPosition(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Delegate to the Position data access object to get all
	//----------------------------------------------------------------------------
	requestResult := PositionDAO.GetAllPosition()
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Update controller, delegates to PositionDAO for database save
//----------------------------------------------------------------------------
func UpdatePosition(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty Position model
	//----------------------------------------------------------------------------
	var data = model.Position{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a Position model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the Position data access object
	// update the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := PositionDAO.UpdatePosition(data)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Delete controller, delegates to PositionDAO for database deletion
//----------------------------------------------------------------------------
func DeletePosition(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the Position data access object
	// delete the one with the matching identifier
	//----------------------------------------------------------------------------	
	requestResult := PositionDAO.DeletePosition(ID)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// assigns a Portfolio on a Position
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func AssignPortfolioToPosition(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	positionId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	portfolioId,_ := strconv.ParseUint( vars["portfolioId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Position DAO
	//----------------------------------------------------------------------------
	requestResult := PositionDAO.AssignPortfolioToPosition(positionId, portfolioId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a Portfolio on a Position
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func UnassignPortfolioFromPosition( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	positionId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Position DAO
	//----------------------------------------------------------------------------
	requestResult := PositionDAO.UnassignPortfolioFromPosition(positionId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}

	//----------------------------------------------------------------------------
	// assigns a Security on a Position
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func AssignSecurityToPosition(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	positionId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	securityId,_ := strconv.ParseUint( vars["securityId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Position DAO
	//----------------------------------------------------------------------------
	requestResult := PositionDAO.AssignSecurityToPosition(positionId, securityId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a Security on a Position
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func UnassignSecurityFromPosition( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	positionId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Position DAO
	//----------------------------------------------------------------------------
	requestResult := PositionDAO.UnassignSecurityFromPosition(positionId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}


	//----------------------------------------------------------------------------
	// adds one or more taxLotsIds as a TaxLots to a Position
	//----------------------------------------------------------------------------
func AddTaxLotsToPosition(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	positionId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	taxLotsIds,_ := vars["taxLotsIds"]

	//----------------------------------------------------------------------------
	// Delegate to the Position DAO
	//----------------------------------------------------------------------------
	requestResult := PositionDAO.AddTaxLotsToPosition(positionId, taxLotsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more taxLotsIds as a TaxLots from a Position
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func RemoveTaxLotsFromPosition(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	positionId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	taxLotsIds,_ := vars["taxLotsIds"]

	//----------------------------------------------------------------------------
	// Delegate to the Position DAO
	//----------------------------------------------------------------------------
	requestResult := PositionDAO.RemoveTaxLotsFromPosition(positionId, taxLotsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
	//----------------------------------------------------------------------------
	// adds one or more transactionsIds as a Transactions to a Position
	//----------------------------------------------------------------------------
func AddTransactionsToPosition(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	positionId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	transactionsIds,_ := vars["transactionsIds"]

	//----------------------------------------------------------------------------
	// Delegate to the Position DAO
	//----------------------------------------------------------------------------
	requestResult := PositionDAO.AddTransactionsToPosition(positionId, transactionsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more transactionsIds as a Transactions from a Position
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func RemoveTransactionsFromPosition(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	positionId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	transactionsIds,_ := vars["transactionsIds"]

	//----------------------------------------------------------------------------
	// Delegate to the Position DAO
	//----------------------------------------------------------------------------
	requestResult := PositionDAO.RemoveTransactionsFromPosition(positionId, transactionsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
