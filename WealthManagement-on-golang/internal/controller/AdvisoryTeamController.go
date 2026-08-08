package controller

import (
    AdvisoryTeamDAO "WealthManagement-on-golang/internal/dao"
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"net/http"
	"strconv"
)

//----------------------------------------------------------------------------
// Create controller, delegates to AdvisoryTeamDAO for database creation
//----------------------------------------------------------------------------
func CreateAdvisoryTeam(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty AdvisoryTeam model
	//----------------------------------------------------------------------------
	data := model.AdvisoryTeam{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a AdvisoryTeam model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the AdvisoryTeam data access object to create
	//----------------------------------------------------------------------------
	requestResult := AdvisoryTeamDAO.CreateAdvisoryTeam( data )
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Get controller, delegates to AdvisoryTeamDAO to find the relevant AdvisoryTeam
//----------------------------------------------------------------------------
func GetAdvisoryTeam(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the AdvisoryTeam data access object
	// find the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := AdvisoryTeamDAO.GetAdvisoryTeam(ID)
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}


//----------------------------------------------------------------------------
// GetAll controller, delegates to AdvisoryTeamDAO for database read of all AdvisoryTeams
//----------------------------------------------------------------------------
func GetAllAdvisoryTeam(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Delegate to the AdvisoryTeam data access object to get all
	//----------------------------------------------------------------------------
	requestResult := AdvisoryTeamDAO.GetAllAdvisoryTeam()
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Update controller, delegates to AdvisoryTeamDAO for database save
//----------------------------------------------------------------------------
func UpdateAdvisoryTeam(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty AdvisoryTeam model
	//----------------------------------------------------------------------------
	var data = model.AdvisoryTeam{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a AdvisoryTeam model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the AdvisoryTeam data access object
	// update the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := AdvisoryTeamDAO.UpdateAdvisoryTeam(data)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Delete controller, delegates to AdvisoryTeamDAO for database deletion
//----------------------------------------------------------------------------
func DeleteAdvisoryTeam(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the AdvisoryTeam data access object
	// delete the one with the matching identifier
	//----------------------------------------------------------------------------	
	requestResult := AdvisoryTeamDAO.DeleteAdvisoryTeam(ID)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}


	//----------------------------------------------------------------------------
	// adds one or more advisorsIds as a Advisors to a AdvisoryTeam
	//----------------------------------------------------------------------------
func AddAdvisorsToAdvisoryTeam(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	advisoryTeamId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	advisorsIds,_ := vars["advisorsIds"]

	//----------------------------------------------------------------------------
	// Delegate to the AdvisoryTeam DAO
	//----------------------------------------------------------------------------
	requestResult := AdvisoryTeamDAO.AddAdvisorsToAdvisoryTeam(advisoryTeamId, advisorsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more advisorsIds as a Advisors from a AdvisoryTeam
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func RemoveAdvisorsFromAdvisoryTeam(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	advisoryTeamId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	advisorsIds,_ := vars["advisorsIds"]

	//----------------------------------------------------------------------------
	// Delegate to the AdvisoryTeam DAO
	//----------------------------------------------------------------------------
	requestResult := AdvisoryTeamDAO.RemoveAdvisorsFromAdvisoryTeam(advisoryTeamId, advisorsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
	//----------------------------------------------------------------------------
	// adds one or more householdsIds as a Households to a AdvisoryTeam
	//----------------------------------------------------------------------------
func AddHouseholdsToAdvisoryTeam(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	advisoryTeamId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	householdsIds,_ := vars["householdsIds"]

	//----------------------------------------------------------------------------
	// Delegate to the AdvisoryTeam DAO
	//----------------------------------------------------------------------------
	requestResult := AdvisoryTeamDAO.AddHouseholdsToAdvisoryTeam(advisoryTeamId, householdsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more householdsIds as a Households from a AdvisoryTeam
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func RemoveHouseholdsFromAdvisoryTeam(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	advisoryTeamId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	householdsIds,_ := vars["householdsIds"]

	//----------------------------------------------------------------------------
	// Delegate to the AdvisoryTeam DAO
	//----------------------------------------------------------------------------
	requestResult := AdvisoryTeamDAO.RemoveHouseholdsFromAdvisoryTeam(advisoryTeamId, householdsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
