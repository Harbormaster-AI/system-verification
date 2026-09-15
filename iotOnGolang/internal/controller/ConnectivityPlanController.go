package controller

import (
    ConnectivityPlanDAO "iotOnGolang/internal/dao"
    "iotOnGolang/internal/model"
    "iotOnGolang/internal/utils"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"net/http"
	"strconv"
)

//----------------------------------------------------------------------------
// Create controller, delegates to ConnectivityPlanDAO for database creation
//----------------------------------------------------------------------------
func create(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty ConnectivityPlan model
	//----------------------------------------------------------------------------
	data := model.ConnectivityPlan{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a ConnectivityPlan model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the ConnectivityPlan data access object to create
	//----------------------------------------------------------------------------
	requestResult := ConnectivityPlanDAO.CreateConnectivityPlan( data )
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Get controller, delegates to ConnectivityPlanDAO to find the relevant ConnectivityPlan
//----------------------------------------------------------------------------
func get(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the ConnectivityPlan data access object
	// find the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := ConnectivityPlanDAO.GetConnectivityPlan(ID)
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}


//----------------------------------------------------------------------------
// GetAll controller, delegates to ConnectivityPlanDAO for database read of all ConnectivityPlans
//----------------------------------------------------------------------------
func getAll(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Delegate to the ConnectivityPlan data access object to get all
	//----------------------------------------------------------------------------
	requestResult := ConnectivityPlanDAO.GetAllConnectivityPlan()
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Update controller, delegates to ConnectivityPlanDAO for database save
//----------------------------------------------------------------------------
func update(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty ConnectivityPlan model
	//----------------------------------------------------------------------------
	var data = model.ConnectivityPlan{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a ConnectivityPlan model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the ConnectivityPlan data access object
	// update the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := ConnectivityPlanDAO.UpdateConnectivityPlan(data)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Delete controller, delegates to ConnectivityPlanDAO for database deletion
//----------------------------------------------------------------------------
func delete(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the ConnectivityPlan data access object
	// delete the one with the matching identifier
	//----------------------------------------------------------------------------	
	requestResult := ConnectivityPlanDAO.DeleteConnectivityPlan(ID)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// assigns a Tenant on a ConnectivityPlan
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func assignTenant(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	connectivityPlanId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	tenantId,_ := strconv.ParseUint( vars["childId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the ConnectivityPlan DAO
	//----------------------------------------------------------------------------
	requestResult := ConnectivityPlanDAO.AssignTenantToConnectivityPlan(connectivityPlanId, tenantId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a Tenant on a ConnectivityPlan
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func unassignTenant( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	connectivityPlanId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the ConnectivityPlan DAO
	//----------------------------------------------------------------------------
	requestResult := ConnectivityPlanDAO.UnassignTenantFromConnectivityPlan(connectivityPlanId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}


	//----------------------------------------------------------------------------
	// adds one or more simCardsIds as a SimCards to a ConnectivityPlan
	//----------------------------------------------------------------------------
func addToSimCards(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	connectivityPlanId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	simCardsIds,_ := strconv.ParseUint( vars["childIds"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the ConnectivityPlan DAO
	//----------------------------------------------------------------------------
	requestResult := ConnectivityPlanDAO.AddSimCardsToConnectivityPlan(connectivityPlanId, simCardsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more simCardsIds as a SimCards from a ConnectivityPlan
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func removeFromSimCards(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	connectivityPlanId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	simCardsIds,_ := strconv.ParseUint( vars["childIds"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the ConnectivityPlan DAO
	//----------------------------------------------------------------------------
	requestResult := ConnectivityPlanDAO.RemoveSimCardsFromConnectivityPlan(connectivityPlanId, simCardsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
