package controller

import (
    AdvisorDAO "WealthManagement-on-golang/internal/dao"
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"net/http"
	"strconv"
)

//----------------------------------------------------------------------------
// Create controller, delegates to AdvisorDAO for database creation
//----------------------------------------------------------------------------
func CreateAdvisor(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty Advisor model
	//----------------------------------------------------------------------------
	data := model.Advisor{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a Advisor model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the Advisor data access object to create
	//----------------------------------------------------------------------------
	requestResult := AdvisorDAO.CreateAdvisor( data )
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Get controller, delegates to AdvisorDAO to find the relevant Advisor
//----------------------------------------------------------------------------
func GetAdvisor(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the Advisor data access object
	// find the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := AdvisorDAO.GetAdvisor(ID)
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}


//----------------------------------------------------------------------------
// GetAll controller, delegates to AdvisorDAO for database read of all Advisors
//----------------------------------------------------------------------------
func GetAllAdvisor(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Delegate to the Advisor data access object to get all
	//----------------------------------------------------------------------------
	requestResult := AdvisorDAO.GetAllAdvisor()
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Update controller, delegates to AdvisorDAO for database save
//----------------------------------------------------------------------------
func UpdateAdvisor(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty Advisor model
	//----------------------------------------------------------------------------
	var data = model.Advisor{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a Advisor model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the Advisor data access object
	// update the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := AdvisorDAO.UpdateAdvisor(data)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Delete controller, delegates to AdvisorDAO for database deletion
//----------------------------------------------------------------------------
func DeleteAdvisor(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the Advisor data access object
	// delete the one with the matching identifier
	//----------------------------------------------------------------------------	
	requestResult := AdvisorDAO.DeleteAdvisor(ID)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// assigns a Firm on a Advisor
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func AssignFirmToAdvisor(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	advisorId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	firmId,_ := strconv.ParseUint( vars["firmId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Advisor DAO
	//----------------------------------------------------------------------------
	requestResult := AdvisorDAO.AssignFirmToAdvisor(advisorId, firmId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a Firm on a Advisor
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func UnassignFirmFromAdvisor( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	advisorId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Advisor DAO
	//----------------------------------------------------------------------------
	requestResult := AdvisorDAO.UnassignFirmFromAdvisor(advisorId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}

	//----------------------------------------------------------------------------
	// assigns a Office on a Advisor
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func AssignOfficeToAdvisor(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	advisorId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	officeId,_ := strconv.ParseUint( vars["officeId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Advisor DAO
	//----------------------------------------------------------------------------
	requestResult := AdvisorDAO.AssignOfficeToAdvisor(advisorId, officeId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a Office on a Advisor
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func UnassignOfficeFromAdvisor( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	advisorId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Advisor DAO
	//----------------------------------------------------------------------------
	requestResult := AdvisorDAO.UnassignOfficeFromAdvisor(advisorId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}

	//----------------------------------------------------------------------------
	// assigns a AdvisoryTeam on a Advisor
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func AssignAdvisoryTeamToAdvisor(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	advisorId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	advisoryTeamId,_ := strconv.ParseUint( vars["advisoryTeamId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Advisor DAO
	//----------------------------------------------------------------------------
	requestResult := AdvisorDAO.AssignAdvisoryTeamToAdvisor(advisorId, advisoryTeamId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a AdvisoryTeam on a Advisor
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func UnassignAdvisoryTeamFromAdvisor( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	advisorId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Advisor DAO
	//----------------------------------------------------------------------------
	requestResult := AdvisorDAO.UnassignAdvisoryTeamFromAdvisor(advisorId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}


	//----------------------------------------------------------------------------
	// adds one or more clientsIds as a Clients to a Advisor
	//----------------------------------------------------------------------------
func AddClientsToAdvisor(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	advisorId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	clientsIds,_ := vars["clientsIds"]

	//----------------------------------------------------------------------------
	// Delegate to the Advisor DAO
	//----------------------------------------------------------------------------
	requestResult := AdvisorDAO.AddClientsToAdvisor(advisorId, clientsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more clientsIds as a Clients from a Advisor
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func RemoveClientsFromAdvisor(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	advisorId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	clientsIds,_ := vars["clientsIds"]

	//----------------------------------------------------------------------------
	// Delegate to the Advisor DAO
	//----------------------------------------------------------------------------
	requestResult := AdvisorDAO.RemoveClientsFromAdvisor(advisorId, clientsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
