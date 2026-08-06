package controller

import (
    HouseholdDAO "WealthManagement-on-golang/internal/dao"
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"net/http"
	"strconv"
)

//----------------------------------------------------------------------------
// Create controller, delegates to HouseholdDAO for database creation
//----------------------------------------------------------------------------
func CreateHousehold(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty Household model
	//----------------------------------------------------------------------------
	data := model.Household{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a Household model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the Household data access object to create
	//----------------------------------------------------------------------------
	requestResult := HouseholdDAO.CreateHousehold( data )
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Get controller, delegates to HouseholdDAO to find the relevant Household
//----------------------------------------------------------------------------
func GetHousehold(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the Household data access object
	// find the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := HouseholdDAO.GetHousehold(ID)
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}


//----------------------------------------------------------------------------
// GetAll controller, delegates to HouseholdDAO for database read of all Households
//----------------------------------------------------------------------------
func GetAllHousehold(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Delegate to the Household data access object to get all
	//----------------------------------------------------------------------------
	requestResult := HouseholdDAO.GetAllHousehold()
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Update controller, delegates to HouseholdDAO for database save
//----------------------------------------------------------------------------
func UpdateHousehold(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty Household model
	//----------------------------------------------------------------------------
	var data = model.Household{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a Household model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the Household data access object
	// update the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := HouseholdDAO.UpdateHousehold(data)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Delete controller, delegates to HouseholdDAO for database deletion
//----------------------------------------------------------------------------
func DeleteHousehold(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the Household data access object
	// delete the one with the matching identifier
	//----------------------------------------------------------------------------	
	requestResult := HouseholdDAO.DeleteHousehold(ID)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// assigns a PrimaryAdvisor on a Household
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func AssignPrimaryAdvisorToHousehold(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	householdId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	primaryAdvisorId,_ := strconv.ParseUint( vars["primaryAdvisorId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Household DAO
	//----------------------------------------------------------------------------
	requestResult := HouseholdDAO.AssignPrimaryAdvisorToHousehold(householdId, primaryAdvisorId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a PrimaryAdvisor on a Household
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func UnassignPrimaryAdvisorFromHousehold( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	householdId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Household DAO
	//----------------------------------------------------------------------------
	requestResult := HouseholdDAO.UnassignPrimaryAdvisorFromHousehold(householdId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}


	//----------------------------------------------------------------------------
	// adds one or more clientsIds as a Clients to a Household
	//----------------------------------------------------------------------------
func AddClientsToHousehold(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	householdId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	clientsIds,_ := vars["clientsIds"]

	//----------------------------------------------------------------------------
	// Delegate to the Household DAO
	//----------------------------------------------------------------------------
	requestResult := HouseholdDAO.AddClientsToHousehold(householdId, clientsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more clientsIds as a Clients from a Household
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func RemoveClientsFromHousehold(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	householdId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	clientsIds,_ := vars["clientsIds"]

	//----------------------------------------------------------------------------
	// Delegate to the Household DAO
	//----------------------------------------------------------------------------
	requestResult := HouseholdDAO.RemoveClientsFromHousehold(householdId, clientsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
	//----------------------------------------------------------------------------
	// adds one or more portfoliosIds as a Portfolios to a Household
	//----------------------------------------------------------------------------
func AddPortfoliosToHousehold(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	householdId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	portfoliosIds,_ := vars["portfoliosIds"]

	//----------------------------------------------------------------------------
	// Delegate to the Household DAO
	//----------------------------------------------------------------------------
	requestResult := HouseholdDAO.AddPortfoliosToHousehold(householdId, portfoliosIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more portfoliosIds as a Portfolios from a Household
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func RemovePortfoliosFromHousehold(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	householdId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	portfoliosIds,_ := vars["portfoliosIds"]

	//----------------------------------------------------------------------------
	// Delegate to the Household DAO
	//----------------------------------------------------------------------------
	requestResult := HouseholdDAO.RemovePortfoliosFromHousehold(householdId, portfoliosIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
	//----------------------------------------------------------------------------
	// adds one or more goalsIds as a Goals to a Household
	//----------------------------------------------------------------------------
func AddGoalsToHousehold(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	householdId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	goalsIds,_ := vars["goalsIds"]

	//----------------------------------------------------------------------------
	// Delegate to the Household DAO
	//----------------------------------------------------------------------------
	requestResult := HouseholdDAO.AddGoalsToHousehold(householdId, goalsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more goalsIds as a Goals from a Household
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func RemoveGoalsFromHousehold(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	householdId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	goalsIds,_ := vars["goalsIds"]

	//----------------------------------------------------------------------------
	// Delegate to the Household DAO
	//----------------------------------------------------------------------------
	requestResult := HouseholdDAO.RemoveGoalsFromHousehold(householdId, goalsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
	//----------------------------------------------------------------------------
	// adds one or more riskAssessmentsIds as a RiskAssessments to a Household
	//----------------------------------------------------------------------------
func AddRiskAssessmentsToHousehold(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	householdId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	riskAssessmentsIds,_ := vars["riskAssessmentsIds"]

	//----------------------------------------------------------------------------
	// Delegate to the Household DAO
	//----------------------------------------------------------------------------
	requestResult := HouseholdDAO.AddRiskAssessmentsToHousehold(householdId, riskAssessmentsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more riskAssessmentsIds as a RiskAssessments from a Household
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func RemoveRiskAssessmentsFromHousehold(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	householdId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	riskAssessmentsIds,_ := vars["riskAssessmentsIds"]

	//----------------------------------------------------------------------------
	// Delegate to the Household DAO
	//----------------------------------------------------------------------------
	requestResult := HouseholdDAO.RemoveRiskAssessmentsFromHousehold(householdId, riskAssessmentsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
