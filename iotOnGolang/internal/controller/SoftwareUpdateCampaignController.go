package controller

import (
    SoftwareUpdateCampaignDAO "iotOnGolang/internal/dao"
    "iotOnGolang/internal/model"
    "iotOnGolang/internal/utils"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"net/http"
	"strconv"
)

//----------------------------------------------------------------------------
// Create controller, delegates to SoftwareUpdateCampaignDAO for database creation
//----------------------------------------------------------------------------
func create(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty SoftwareUpdateCampaign model
	//----------------------------------------------------------------------------
	data := model.SoftwareUpdateCampaign{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a SoftwareUpdateCampaign model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the SoftwareUpdateCampaign data access object to create
	//----------------------------------------------------------------------------
	requestResult := SoftwareUpdateCampaignDAO.CreateSoftwareUpdateCampaign( data )
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Get controller, delegates to SoftwareUpdateCampaignDAO to find the relevant SoftwareUpdateCampaign
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
	// Delegate to the SoftwareUpdateCampaign data access object
	// find the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := SoftwareUpdateCampaignDAO.GetSoftwareUpdateCampaign(ID)
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}


//----------------------------------------------------------------------------
// GetAll controller, delegates to SoftwareUpdateCampaignDAO for database read of all SoftwareUpdateCampaigns
//----------------------------------------------------------------------------
func getAll(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Delegate to the SoftwareUpdateCampaign data access object to get all
	//----------------------------------------------------------------------------
	requestResult := SoftwareUpdateCampaignDAO.GetAllSoftwareUpdateCampaign()
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Update controller, delegates to SoftwareUpdateCampaignDAO for database save
//----------------------------------------------------------------------------
func update(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty SoftwareUpdateCampaign model
	//----------------------------------------------------------------------------
	var data = model.SoftwareUpdateCampaign{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a SoftwareUpdateCampaign model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the SoftwareUpdateCampaign data access object
	// update the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := SoftwareUpdateCampaignDAO.UpdateSoftwareUpdateCampaign(data)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Delete controller, delegates to SoftwareUpdateCampaignDAO for database deletion
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
	// Delegate to the SoftwareUpdateCampaign data access object
	// delete the one with the matching identifier
	//----------------------------------------------------------------------------	
	requestResult := SoftwareUpdateCampaignDAO.DeleteSoftwareUpdateCampaign(ID)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// assigns a FirmwareRelease on a SoftwareUpdateCampaign
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func assignFirmwareRelease(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	softwareUpdateCampaignId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	firmwareReleaseId,_ := strconv.ParseUint( vars["childId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the SoftwareUpdateCampaign DAO
	//----------------------------------------------------------------------------
	requestResult := SoftwareUpdateCampaignDAO.AssignFirmwareReleaseToSoftwareUpdateCampaign(softwareUpdateCampaignId, firmwareReleaseId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a FirmwareRelease on a SoftwareUpdateCampaign
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func unassignFirmwareRelease( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	softwareUpdateCampaignId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the SoftwareUpdateCampaign DAO
	//----------------------------------------------------------------------------
	requestResult := SoftwareUpdateCampaignDAO.UnassignFirmwareReleaseFromSoftwareUpdateCampaign(softwareUpdateCampaignId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}

	//----------------------------------------------------------------------------
	// assigns a DeviceGroup on a SoftwareUpdateCampaign
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func assignDeviceGroup(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	softwareUpdateCampaignId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	deviceGroupId,_ := strconv.ParseUint( vars["childId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the SoftwareUpdateCampaign DAO
	//----------------------------------------------------------------------------
	requestResult := SoftwareUpdateCampaignDAO.AssignDeviceGroupToSoftwareUpdateCampaign(softwareUpdateCampaignId, deviceGroupId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a DeviceGroup on a SoftwareUpdateCampaign
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func unassignDeviceGroup( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	softwareUpdateCampaignId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the SoftwareUpdateCampaign DAO
	//----------------------------------------------------------------------------
	requestResult := SoftwareUpdateCampaignDAO.UnassignDeviceGroupFromSoftwareUpdateCampaign(softwareUpdateCampaignId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}


	//----------------------------------------------------------------------------
	// adds one or more executionsIds as a Executions to a SoftwareUpdateCampaign
	//----------------------------------------------------------------------------
func addToExecutions(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	softwareUpdateCampaignId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	executionsIds,_ := strconv.ParseUint( vars["childIds"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the SoftwareUpdateCampaign DAO
	//----------------------------------------------------------------------------
	requestResult := SoftwareUpdateCampaignDAO.AddExecutionsToSoftwareUpdateCampaign(softwareUpdateCampaignId, executionsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more executionsIds as a Executions from a SoftwareUpdateCampaign
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func removeFromExecutions(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	softwareUpdateCampaignId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	executionsIds,_ := strconv.ParseUint( vars["childIds"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the SoftwareUpdateCampaign DAO
	//----------------------------------------------------------------------------
	requestResult := SoftwareUpdateCampaignDAO.RemoveExecutionsFromSoftwareUpdateCampaign(softwareUpdateCampaignId, executionsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
