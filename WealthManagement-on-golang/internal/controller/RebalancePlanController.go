package controller

import (
    RebalancePlanDAO "WealthManagement-on-golang/internal/dao"
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"net/http"
	"strconv"
)

//----------------------------------------------------------------------------
// Create controller, delegates to RebalancePlanDAO for database creation
//----------------------------------------------------------------------------
func CreateRebalancePlan(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty RebalancePlan model
	//----------------------------------------------------------------------------
	data := model.RebalancePlan{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a RebalancePlan model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the RebalancePlan data access object to create
	//----------------------------------------------------------------------------
	requestResult := RebalancePlanDAO.CreateRebalancePlan( data )
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Get controller, delegates to RebalancePlanDAO to find the relevant RebalancePlan
//----------------------------------------------------------------------------
func GetRebalancePlan(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the RebalancePlan data access object
	// find the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := RebalancePlanDAO.GetRebalancePlan(ID)
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}


//----------------------------------------------------------------------------
// GetAll controller, delegates to RebalancePlanDAO for database read of all RebalancePlans
//----------------------------------------------------------------------------
func GetAllRebalancePlan(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Delegate to the RebalancePlan data access object to get all
	//----------------------------------------------------------------------------
	requestResult := RebalancePlanDAO.GetAllRebalancePlan()
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Update controller, delegates to RebalancePlanDAO for database save
//----------------------------------------------------------------------------
func UpdateRebalancePlan(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty RebalancePlan model
	//----------------------------------------------------------------------------
	var data = model.RebalancePlan{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a RebalancePlan model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the RebalancePlan data access object
	// update the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := RebalancePlanDAO.UpdateRebalancePlan(data)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Delete controller, delegates to RebalancePlanDAO for database deletion
//----------------------------------------------------------------------------
func DeleteRebalancePlan(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the RebalancePlan data access object
	// delete the one with the matching identifier
	//----------------------------------------------------------------------------	
	requestResult := RebalancePlanDAO.DeleteRebalancePlan(ID)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// assigns a Portfolio on a RebalancePlan
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func AssignPortfolioToRebalancePlan(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	rebalancePlanId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	portfolioId,_ := strconv.ParseUint( vars["portfolioId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the RebalancePlan DAO
	//----------------------------------------------------------------------------
	requestResult := RebalancePlanDAO.AssignPortfolioToRebalancePlan(rebalancePlanId, portfolioId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a Portfolio on a RebalancePlan
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func UnassignPortfolioFromRebalancePlan( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	rebalancePlanId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the RebalancePlan DAO
	//----------------------------------------------------------------------------
	requestResult := RebalancePlanDAO.UnassignPortfolioFromRebalancePlan(rebalancePlanId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}

	//----------------------------------------------------------------------------
	// assigns a Advisor on a RebalancePlan
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func AssignAdvisorToRebalancePlan(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	rebalancePlanId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	advisorId,_ := strconv.ParseUint( vars["advisorId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the RebalancePlan DAO
	//----------------------------------------------------------------------------
	requestResult := RebalancePlanDAO.AssignAdvisorToRebalancePlan(rebalancePlanId, advisorId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a Advisor on a RebalancePlan
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func UnassignAdvisorFromRebalancePlan( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	rebalancePlanId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the RebalancePlan DAO
	//----------------------------------------------------------------------------
	requestResult := RebalancePlanDAO.UnassignAdvisorFromRebalancePlan(rebalancePlanId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}


	//----------------------------------------------------------------------------
	// adds one or more proposedOrdersIds as a ProposedOrders to a RebalancePlan
	//----------------------------------------------------------------------------
func AddProposedOrdersToRebalancePlan(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	rebalancePlanId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	proposedOrdersIds,_ := vars["proposedOrdersIds"]

	//----------------------------------------------------------------------------
	// Delegate to the RebalancePlan DAO
	//----------------------------------------------------------------------------
	requestResult := RebalancePlanDAO.AddProposedOrdersToRebalancePlan(rebalancePlanId, proposedOrdersIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more proposedOrdersIds as a ProposedOrders from a RebalancePlan
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func RemoveProposedOrdersFromRebalancePlan(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	rebalancePlanId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	proposedOrdersIds,_ := vars["proposedOrdersIds"]

	//----------------------------------------------------------------------------
	// Delegate to the RebalancePlan DAO
	//----------------------------------------------------------------------------
	requestResult := RebalancePlanDAO.RemoveProposedOrdersFromRebalancePlan(rebalancePlanId, proposedOrdersIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
