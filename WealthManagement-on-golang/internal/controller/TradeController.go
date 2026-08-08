package controller

import (
    TradeDAO "WealthManagement-on-golang/internal/dao"
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"net/http"
	"strconv"
)

//----------------------------------------------------------------------------
// Create controller, delegates to TradeDAO for database creation
//----------------------------------------------------------------------------
func CreateTrade(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty Trade model
	//----------------------------------------------------------------------------
	data := model.Trade{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a Trade model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the Trade data access object to create
	//----------------------------------------------------------------------------
	requestResult := TradeDAO.CreateTrade( data )
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Get controller, delegates to TradeDAO to find the relevant Trade
//----------------------------------------------------------------------------
func GetTrade(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the Trade data access object
	// find the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := TradeDAO.GetTrade(ID)
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}


//----------------------------------------------------------------------------
// GetAll controller, delegates to TradeDAO for database read of all Trades
//----------------------------------------------------------------------------
func GetAllTrade(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Delegate to the Trade data access object to get all
	//----------------------------------------------------------------------------
	requestResult := TradeDAO.GetAllTrade()
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Update controller, delegates to TradeDAO for database save
//----------------------------------------------------------------------------
func UpdateTrade(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty Trade model
	//----------------------------------------------------------------------------
	var data = model.Trade{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a Trade model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the Trade data access object
	// update the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := TradeDAO.UpdateTrade(data)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Delete controller, delegates to TradeDAO for database deletion
//----------------------------------------------------------------------------
func DeleteTrade(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the Trade data access object
	// delete the one with the matching identifier
	//----------------------------------------------------------------------------	
	requestResult := TradeDAO.DeleteTrade(ID)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// assigns a Order on a Trade
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func AssignOrderToTrade(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	tradeId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	orderId,_ := strconv.ParseUint( vars["orderId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Trade DAO
	//----------------------------------------------------------------------------
	requestResult := TradeDAO.AssignOrderToTrade(tradeId, orderId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a Order on a Trade
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func UnassignOrderFromTrade( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	tradeId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Trade DAO
	//----------------------------------------------------------------------------
	requestResult := TradeDAO.UnassignOrderFromTrade(tradeId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}

	//----------------------------------------------------------------------------
	// assigns a Account on a Trade
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func AssignAccountToTrade(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	tradeId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	accountId,_ := strconv.ParseUint( vars["accountId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Trade DAO
	//----------------------------------------------------------------------------
	requestResult := TradeDAO.AssignAccountToTrade(tradeId, accountId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a Account on a Trade
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func UnassignAccountFromTrade( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	tradeId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Trade DAO
	//----------------------------------------------------------------------------
	requestResult := TradeDAO.UnassignAccountFromTrade(tradeId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}

	//----------------------------------------------------------------------------
	// assigns a Security on a Trade
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func AssignSecurityToTrade(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	tradeId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	securityId,_ := strconv.ParseUint( vars["securityId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Trade DAO
	//----------------------------------------------------------------------------
	requestResult := TradeDAO.AssignSecurityToTrade(tradeId, securityId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a Security on a Trade
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func UnassignSecurityFromTrade( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	tradeId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Trade DAO
	//----------------------------------------------------------------------------
	requestResult := TradeDAO.UnassignSecurityFromTrade(tradeId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}

	//----------------------------------------------------------------------------
	// assigns a Transaction on a Trade
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func AssignTransactionToTrade(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	tradeId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	transactionId,_ := strconv.ParseUint( vars["transactionId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Trade DAO
	//----------------------------------------------------------------------------
	requestResult := TradeDAO.AssignTransactionToTrade(tradeId, transactionId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a Transaction on a Trade
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func UnassignTransactionFromTrade( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	tradeId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Trade DAO
	//----------------------------------------------------------------------------
	requestResult := TradeDAO.UnassignTransactionFromTrade(tradeId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}


