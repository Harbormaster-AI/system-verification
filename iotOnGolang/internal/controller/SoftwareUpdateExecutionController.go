package controller

import (
    SoftwareUpdateExecutionDAO "iotOnGolang/internal/dao"
    "iotOnGolang/internal/model"
    "iotOnGolang/internal/utils"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"net/http"
	"strconv"
)

//----------------------------------------------------------------------------
// Create controller, delegates to SoftwareUpdateExecutionDAO for database creation
//----------------------------------------------------------------------------
func create(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty SoftwareUpdateExecution model
	//----------------------------------------------------------------------------
	data := model.SoftwareUpdateExecution{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a SoftwareUpdateExecution model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the SoftwareUpdateExecution data access object to create
	//----------------------------------------------------------------------------
	requestResult := SoftwareUpdateExecutionDAO.CreateSoftwareUpdateExecution( data )
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Get controller, delegates to SoftwareUpdateExecutionDAO to find the relevant SoftwareUpdateExecution
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
	// Delegate to the SoftwareUpdateExecution data access object
	// find the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := SoftwareUpdateExecutionDAO.GetSoftwareUpdateExecution(ID)
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}


//----------------------------------------------------------------------------
// GetAll controller, delegates to SoftwareUpdateExecutionDAO for database read of all SoftwareUpdateExecutions
//----------------------------------------------------------------------------
func getAll(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Delegate to the SoftwareUpdateExecution data access object to get all
	//----------------------------------------------------------------------------
	requestResult := SoftwareUpdateExecutionDAO.GetAllSoftwareUpdateExecution()
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Update controller, delegates to SoftwareUpdateExecutionDAO for database save
//----------------------------------------------------------------------------
func update(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty SoftwareUpdateExecution model
	//----------------------------------------------------------------------------
	var data = model.SoftwareUpdateExecution{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a SoftwareUpdateExecution model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the SoftwareUpdateExecution data access object
	// update the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := SoftwareUpdateExecutionDAO.UpdateSoftwareUpdateExecution(data)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Delete controller, delegates to SoftwareUpdateExecutionDAO for database deletion
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
	// Delegate to the SoftwareUpdateExecution data access object
	// delete the one with the matching identifier
	//----------------------------------------------------------------------------	
	requestResult := SoftwareUpdateExecutionDAO.DeleteSoftwareUpdateExecution(ID)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// assigns a Campaign on a SoftwareUpdateExecution
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func assignCampaign(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	softwareUpdateExecutionId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	campaignId,_ := strconv.ParseUint( vars["childId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the SoftwareUpdateExecution DAO
	//----------------------------------------------------------------------------
	requestResult := SoftwareUpdateExecutionDAO.AssignCampaignToSoftwareUpdateExecution(softwareUpdateExecutionId, campaignId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a Campaign on a SoftwareUpdateExecution
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func unassignCampaign( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	softwareUpdateExecutionId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the SoftwareUpdateExecution DAO
	//----------------------------------------------------------------------------
	requestResult := SoftwareUpdateExecutionDAO.UnassignCampaignFromSoftwareUpdateExecution(softwareUpdateExecutionId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}

	//----------------------------------------------------------------------------
	// assigns a Device on a SoftwareUpdateExecution
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func assignDevice(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	softwareUpdateExecutionId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	deviceId,_ := strconv.ParseUint( vars["childId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the SoftwareUpdateExecution DAO
	//----------------------------------------------------------------------------
	requestResult := SoftwareUpdateExecutionDAO.AssignDeviceToSoftwareUpdateExecution(softwareUpdateExecutionId, deviceId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a Device on a SoftwareUpdateExecution
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func unassignDevice( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	softwareUpdateExecutionId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the SoftwareUpdateExecution DAO
	//----------------------------------------------------------------------------
	requestResult := SoftwareUpdateExecutionDAO.UnassignDeviceFromSoftwareUpdateExecution(softwareUpdateExecutionId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}


