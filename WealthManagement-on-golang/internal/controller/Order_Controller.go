package controller

import (
    Order_DAO "WealthManagement-on-golang/internal/dao"
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"net/http"
	"strconv"
)

//----------------------------------------------------------------------------
// Create controller, delegates to Order_DAO for database creation
//----------------------------------------------------------------------------
func CreateOrder_(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty Order_ model
	//----------------------------------------------------------------------------
	data := model.Order_{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a Order_ model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the Order_ data access object to create
	//----------------------------------------------------------------------------
	requestResult := Order_DAO.CreateOrder_( data )
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Get controller, delegates to Order_DAO to find the relevant Order_
//----------------------------------------------------------------------------
func GetOrder_(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the Order_ data access object
	// find the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := Order_DAO.GetOrder_(ID)
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}


//----------------------------------------------------------------------------
// GetAll controller, delegates to Order_DAO for database read of all Order_s
//----------------------------------------------------------------------------
func GetAllOrder_(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Delegate to the Order_ data access object to get all
	//----------------------------------------------------------------------------
	requestResult := Order_DAO.GetAllOrder_()
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Update controller, delegates to Order_DAO for database save
//----------------------------------------------------------------------------
func UpdateOrder_(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty Order_ model
	//----------------------------------------------------------------------------
	var data = model.Order_{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a Order_ model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the Order_ data access object
	// update the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := Order_DAO.UpdateOrder_(data)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Delete controller, delegates to Order_DAO for database deletion
//----------------------------------------------------------------------------
func DeleteOrder_(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the Order_ data access object
	// delete the one with the matching identifier
	//----------------------------------------------------------------------------	
	requestResult := Order_DAO.DeleteOrder_(ID)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// assigns a Account on a Order_
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func AssignAccountToOrder_(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	order_Id,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	accountId,_ := strconv.ParseUint( vars["accountId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Order_ DAO
	//----------------------------------------------------------------------------
	requestResult := Order_DAO.AssignAccountToOrder_(order_Id, accountId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a Account on a Order_
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func UnassignAccountFromOrder_( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	order_Id,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Order_ DAO
	//----------------------------------------------------------------------------
	requestResult := Order_DAO.UnassignAccountFromOrder_(order_Id)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}

	//----------------------------------------------------------------------------
	// assigns a Security on a Order_
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func AssignSecurityToOrder_(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	order_Id,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	securityId,_ := strconv.ParseUint( vars["securityId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Order_ DAO
	//----------------------------------------------------------------------------
	requestResult := Order_DAO.AssignSecurityToOrder_(order_Id, securityId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a Security on a Order_
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func UnassignSecurityFromOrder_( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	order_Id,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Order_ DAO
	//----------------------------------------------------------------------------
	requestResult := Order_DAO.UnassignSecurityFromOrder_(order_Id)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}

	//----------------------------------------------------------------------------
	// assigns a Advisor on a Order_
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func AssignAdvisorToOrder_(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	order_Id,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	advisorId,_ := strconv.ParseUint( vars["advisorId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Order_ DAO
	//----------------------------------------------------------------------------
	requestResult := Order_DAO.AssignAdvisorToOrder_(order_Id, advisorId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a Advisor on a Order_
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func UnassignAdvisorFromOrder_( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	order_Id,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Order_ DAO
	//----------------------------------------------------------------------------
	requestResult := Order_DAO.UnassignAdvisorFromOrder_(order_Id)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}


	//----------------------------------------------------------------------------
	// adds one or more allocationsIds as a Allocations to a Order_
	//----------------------------------------------------------------------------
func AddAllocationsToOrder_(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	order_Id,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	allocationsIds,_ := vars["allocationsIds"]

	//----------------------------------------------------------------------------
	// Delegate to the Order_ DAO
	//----------------------------------------------------------------------------
	requestResult := Order_DAO.AddAllocationsToOrder_(order_Id, allocationsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more allocationsIds as a Allocations from a Order_
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func RemoveAllocationsFromOrder_(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	order_Id,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	allocationsIds,_ := vars["allocationsIds"]

	//----------------------------------------------------------------------------
	// Delegate to the Order_ DAO
	//----------------------------------------------------------------------------
	requestResult := Order_DAO.RemoveAllocationsFromOrder_(order_Id, allocationsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
	//----------------------------------------------------------------------------
	// adds one or more tradesIds as a Trades to a Order_
	//----------------------------------------------------------------------------
func AddTradesToOrder_(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	order_Id,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	tradesIds,_ := vars["tradesIds"]

	//----------------------------------------------------------------------------
	// Delegate to the Order_ DAO
	//----------------------------------------------------------------------------
	requestResult := Order_DAO.AddTradesToOrder_(order_Id, tradesIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more tradesIds as a Trades from a Order_
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func RemoveTradesFromOrder_(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	order_Id,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	tradesIds,_ := vars["tradesIds"]

	//----------------------------------------------------------------------------
	// Delegate to the Order_ DAO
	//----------------------------------------------------------------------------
	requestResult := Order_DAO.RemoveTradesFromOrder_(order_Id, tradesIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
