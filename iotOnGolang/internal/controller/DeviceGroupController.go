package controller

import (
    DeviceGroupDAO "iotOnGolang/internal/dao"
    "iotOnGolang/internal/model"
    "iotOnGolang/internal/utils"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"net/http"
	"strconv"
)

//----------------------------------------------------------------------------
// Create controller, delegates to DeviceGroupDAO for database creation
//----------------------------------------------------------------------------
func create(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty DeviceGroup model
	//----------------------------------------------------------------------------
	data := model.DeviceGroup{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a DeviceGroup model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the DeviceGroup data access object to create
	//----------------------------------------------------------------------------
	requestResult := DeviceGroupDAO.CreateDeviceGroup( data )
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Get controller, delegates to DeviceGroupDAO to find the relevant DeviceGroup
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
	// Delegate to the DeviceGroup data access object
	// find the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := DeviceGroupDAO.GetDeviceGroup(ID)
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}


//----------------------------------------------------------------------------
// GetAll controller, delegates to DeviceGroupDAO for database read of all DeviceGroups
//----------------------------------------------------------------------------
func getAll(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Delegate to the DeviceGroup data access object to get all
	//----------------------------------------------------------------------------
	requestResult := DeviceGroupDAO.GetAllDeviceGroup()
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Update controller, delegates to DeviceGroupDAO for database save
//----------------------------------------------------------------------------
func update(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty DeviceGroup model
	//----------------------------------------------------------------------------
	var data = model.DeviceGroup{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a DeviceGroup model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the DeviceGroup data access object
	// update the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := DeviceGroupDAO.UpdateDeviceGroup(data)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Delete controller, delegates to DeviceGroupDAO for database deletion
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
	// Delegate to the DeviceGroup data access object
	// delete the one with the matching identifier
	//----------------------------------------------------------------------------	
	requestResult := DeviceGroupDAO.DeleteDeviceGroup(ID)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// assigns a Tenant on a DeviceGroup
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func assignTenant(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	deviceGroupId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	tenantId,_ := strconv.ParseUint( vars["childId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the DeviceGroup DAO
	//----------------------------------------------------------------------------
	requestResult := DeviceGroupDAO.AssignTenantToDeviceGroup(deviceGroupId, tenantId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a Tenant on a DeviceGroup
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func unassignTenant( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	deviceGroupId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the DeviceGroup DAO
	//----------------------------------------------------------------------------
	requestResult := DeviceGroupDAO.UnassignTenantFromDeviceGroup(deviceGroupId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}


	//----------------------------------------------------------------------------
	// adds one or more devicesIds as a Devices to a DeviceGroup
	//----------------------------------------------------------------------------
func addToDevices(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	deviceGroupId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	devicesIds,_ := strconv.ParseUint( vars["childIds"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the DeviceGroup DAO
	//----------------------------------------------------------------------------
	requestResult := DeviceGroupDAO.AddDevicesToDeviceGroup(deviceGroupId, devicesIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more devicesIds as a Devices from a DeviceGroup
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func removeFromDevices(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	deviceGroupId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	devicesIds,_ := strconv.ParseUint( vars["childIds"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the DeviceGroup DAO
	//----------------------------------------------------------------------------
	requestResult := DeviceGroupDAO.RemoveDevicesFromDeviceGroup(deviceGroupId, devicesIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
