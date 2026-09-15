
package controller

import (
    DeviceModelDAO "iotOnGolang/internal/dao"
    "iotOnGolang/internal/model"
    "iotOnGolang/internal/utils"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"net/http"
	"strconv"
)

//----------------------------------------------------------------------------
// Create controller, delegates to DeviceModelDAO for database creation
//----------------------------------------------------------------------------
func create(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty DeviceModel model
	//----------------------------------------------------------------------------
	data := model.DeviceModel{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a DeviceModel model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the DeviceModel data access object to create
	//----------------------------------------------------------------------------
	requestResult := DeviceModelDAO.CreateDeviceModel( data )
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Get controller, delegates to DeviceModelDAO to find the relevant DeviceModel
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
	// Delegate to the DeviceModel data access object
	// find the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := DeviceModelDAO.GetDeviceModel(ID)
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}


//----------------------------------------------------------------------------
// GetAll controller, delegates to DeviceModelDAO for database read of all DeviceModels
//----------------------------------------------------------------------------
func getAll(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Delegate to the DeviceModel data access object to get all
	//----------------------------------------------------------------------------
	requestResult := DeviceModelDAO.GetAllDeviceModel()
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Update controller, delegates to DeviceModelDAO for database save
//----------------------------------------------------------------------------
func update(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty DeviceModel model
	//----------------------------------------------------------------------------
	var data = model.DeviceModel{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a DeviceModel model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the DeviceModel data access object
	// update the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := DeviceModelDAO.UpdateDeviceModel(data)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Delete controller, delegates to DeviceModelDAO for database deletion
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
	// Delegate to the DeviceModel data access object
	// delete the one with the matching identifier
	//----------------------------------------------------------------------------	
	requestResult := DeviceModelDAO.DeleteDeviceModel(ID)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// assigns a Vendor on a DeviceModel
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func assignVendor(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	deviceModelId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	vendorId,_ := strconv.ParseUint( vars["childId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the DeviceModel DAO
	//----------------------------------------------------------------------------
	requestResult := DeviceModelDAO.AssignVendorToDeviceModel(deviceModelId, vendorId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a Vendor on a DeviceModel
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func unassignVendor( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	deviceModelId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the DeviceModel DAO
	//----------------------------------------------------------------------------
	requestResult := DeviceModelDAO.UnassignVendorFromDeviceModel(deviceModelId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}

	//----------------------------------------------------------------------------
	// assigns a TwinTemplate on a DeviceModel
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func assignTwinTemplate(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	deviceModelId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	twinTemplateId,_ := strconv.ParseUint( vars["childId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the DeviceModel DAO
	//----------------------------------------------------------------------------
	requestResult := DeviceModelDAO.AssignTwinTemplateToDeviceModel(deviceModelId, twinTemplateId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a TwinTemplate on a DeviceModel
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func unassignTwinTemplate( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	deviceModelId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the DeviceModel DAO
	//----------------------------------------------------------------------------
	requestResult := DeviceModelDAO.UnassignTwinTemplateFromDeviceModel(deviceModelId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}


	//----------------------------------------------------------------------------
	// adds one or more hardwareModulesIds as a HardwareModules to a DeviceModel
	//----------------------------------------------------------------------------
func addToHardwareModules(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	deviceModelId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	hardwareModulesIds,_ := strconv.ParseUint( vars["childIds"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the DeviceModel DAO
	//----------------------------------------------------------------------------
	requestResult := DeviceModelDAO.AddHardwareModulesToDeviceModel(deviceModelId, hardwareModulesIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more hardwareModulesIds as a HardwareModules from a DeviceModel
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func removeFromHardwareModules(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	deviceModelId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	hardwareModulesIds,_ := strconv.ParseUint( vars["childIds"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the DeviceModel DAO
	//----------------------------------------------------------------------------
	requestResult := DeviceModelDAO.RemoveHardwareModulesFromDeviceModel(deviceModelId, hardwareModulesIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
	//----------------------------------------------------------------------------
	// adds one or more firmwareReleasesIds as a FirmwareReleases to a DeviceModel
	//----------------------------------------------------------------------------
func addToFirmwareReleases(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	deviceModelId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	firmwareReleasesIds,_ := strconv.ParseUint( vars["childIds"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the DeviceModel DAO
	//----------------------------------------------------------------------------
	requestResult := DeviceModelDAO.AddFirmwareReleasesToDeviceModel(deviceModelId, firmwareReleasesIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more firmwareReleasesIds as a FirmwareReleases from a DeviceModel
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func removeFromFirmwareReleases(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	deviceModelId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	firmwareReleasesIds,_ := strconv.ParseUint( vars["childIds"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the DeviceModel DAO
	//----------------------------------------------------------------------------
	requestResult := DeviceModelDAO.RemoveFirmwareReleasesFromDeviceModel(deviceModelId, firmwareReleasesIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
	//----------------------------------------------------------------------------
	// adds one or more commandDefinitionsIds as a CommandDefinitions to a DeviceModel
	//----------------------------------------------------------------------------
func addToCommandDefinitions(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	deviceModelId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	commandDefinitionsIds,_ := strconv.ParseUint( vars["childIds"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the DeviceModel DAO
	//----------------------------------------------------------------------------
	requestResult := DeviceModelDAO.AddCommandDefinitionsToDeviceModel(deviceModelId, commandDefinitionsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more commandDefinitionsIds as a CommandDefinitions from a DeviceModel
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func removeFromCommandDefinitions(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	deviceModelId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	commandDefinitionsIds,_ := strconv.ParseUint( vars["childIds"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the DeviceModel DAO
	//----------------------------------------------------------------------------
	requestResult := DeviceModelDAO.RemoveCommandDefinitionsFromDeviceModel(deviceModelId, commandDefinitionsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
