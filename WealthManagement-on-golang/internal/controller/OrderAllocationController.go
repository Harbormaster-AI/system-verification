package controller

import (
    OrderAllocationDAO "WealthManagement-on-golang/internal/dao"
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"net/http"
	"strconv"
)

//----------------------------------------------------------------------------
// Create controller, delegates to OrderAllocationDAO for database creation
//----------------------------------------------------------------------------
func CreateOrderAllocation(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty OrderAllocation model
	//----------------------------------------------------------------------------
	data := model.OrderAllocation{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a OrderAllocation model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the OrderAllocation data access object to create
	//----------------------------------------------------------------------------
	requestResult := OrderAllocationDAO.CreateOrderAllocation( data )
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Get controller, delegates to OrderAllocationDAO to find the relevant OrderAllocation
//----------------------------------------------------------------------------
func GetOrderAllocation(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the OrderAllocation data access object
	// find the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := OrderAllocationDAO.GetOrderAllocation(ID)
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}


//----------------------------------------------------------------------------
// GetAll controller, delegates to OrderAllocationDAO for database read of all OrderAllocations
//----------------------------------------------------------------------------
func GetAllOrderAllocation(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Delegate to the OrderAllocation data access object to get all
	//----------------------------------------------------------------------------
	requestResult := OrderAllocationDAO.GetAllOrderAllocation()
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Update controller, delegates to OrderAllocationDAO for database save
//----------------------------------------------------------------------------
func UpdateOrderAllocation(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty OrderAllocation model
	//----------------------------------------------------------------------------
	var data = model.OrderAllocation{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a OrderAllocation model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the OrderAllocation data access object
	// update the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := OrderAllocationDAO.UpdateOrderAllocation(data)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Delete controller, delegates to OrderAllocationDAO for database deletion
//----------------------------------------------------------------------------
func DeleteOrderAllocation(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the OrderAllocation data access object
	// delete the one with the matching identifier
	//----------------------------------------------------------------------------	
	requestResult := OrderAllocationDAO.DeleteOrderAllocation(ID)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// assigns a Order on a OrderAllocation
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func AssignOrderToOrderAllocation(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	orderAllocationId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	orderId,_ := strconv.ParseUint( vars["orderId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the OrderAllocation DAO
	//----------------------------------------------------------------------------
	requestResult := OrderAllocationDAO.AssignOrderToOrderAllocation(orderAllocationId, orderId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a Order on a OrderAllocation
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func UnassignOrderFromOrderAllocation( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	orderAllocationId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the OrderAllocation DAO
	//----------------------------------------------------------------------------
	requestResult := OrderAllocationDAO.UnassignOrderFromOrderAllocation(orderAllocationId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}

	//----------------------------------------------------------------------------
	// assigns a Account on a OrderAllocation
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func AssignAccountToOrderAllocation(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	orderAllocationId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	accountId,_ := strconv.ParseUint( vars["accountId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the OrderAllocation DAO
	//----------------------------------------------------------------------------
	requestResult := OrderAllocationDAO.AssignAccountToOrderAllocation(orderAllocationId, accountId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a Account on a OrderAllocation
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func UnassignAccountFromOrderAllocation( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	orderAllocationId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the OrderAllocation DAO
	//----------------------------------------------------------------------------
	requestResult := OrderAllocationDAO.UnassignAccountFromOrderAllocation(orderAllocationId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}

	//----------------------------------------------------------------------------
	// assigns a Portfolio on a OrderAllocation
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func AssignPortfolioToOrderAllocation(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	orderAllocationId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	portfolioId,_ := strconv.ParseUint( vars["portfolioId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the OrderAllocation DAO
	//----------------------------------------------------------------------------
	requestResult := OrderAllocationDAO.AssignPortfolioToOrderAllocation(orderAllocationId, portfolioId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a Portfolio on a OrderAllocation
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func UnassignPortfolioFromOrderAllocation( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	orderAllocationId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the OrderAllocation DAO
	//----------------------------------------------------------------------------
	requestResult := OrderAllocationDAO.UnassignPortfolioFromOrderAllocation(orderAllocationId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}


