package controller

import (
    GatewayDAO "iotOnGolang/internal/dao"
    "iotOnGolang/internal/model"
    "iotOnGolang/internal/utils"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"net/http"
	"strconv"
)

//----------------------------------------------------------------------------
// Create controller, delegates to GatewayDAO for database creation
//----------------------------------------------------------------------------
func create(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty Gateway model
	//----------------------------------------------------------------------------
	data := model.Gateway{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a Gateway model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the Gateway data access object to create
	//----------------------------------------------------------------------------
	requestResult := GatewayDAO.CreateGateway( data )
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Get controller, delegates to GatewayDAO to find the relevant Gateway
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
	// Delegate to the Gateway data access object
	// find the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := GatewayDAO.GetGateway(ID)
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}


//----------------------------------------------------------------------------
// GetAll controller, delegates to GatewayDAO for database read of all Gateways
//----------------------------------------------------------------------------
func getAll(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Delegate to the Gateway data access object to get all
	//----------------------------------------------------------------------------
	requestResult := GatewayDAO.GetAllGateway()
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Update controller, delegates to GatewayDAO for database save
//----------------------------------------------------------------------------
func update(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty Gateway model
	//----------------------------------------------------------------------------
	var data = model.Gateway{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a Gateway model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the Gateway data access object
	// update the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := GatewayDAO.UpdateGateway(data)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Delete controller, delegates to GatewayDAO for database deletion
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
	// Delegate to the Gateway data access object
	// delete the one with the matching identifier
	//----------------------------------------------------------------------------	
	requestResult := GatewayDAO.DeleteGateway(ID)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// assigns a Site on a Gateway
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func assignSite(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	gatewayId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	siteId,_ := strconv.ParseUint( vars["childId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Gateway DAO
	//----------------------------------------------------------------------------
	requestResult := GatewayDAO.AssignSiteToGateway(gatewayId, siteId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a Site on a Gateway
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func unassignSite( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	gatewayId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Gateway DAO
	//----------------------------------------------------------------------------
	requestResult := GatewayDAO.UnassignSiteFromGateway(gatewayId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}

	//----------------------------------------------------------------------------
	// assigns a Room on a Gateway
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func assignRoom(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	gatewayId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	roomId,_ := strconv.ParseUint( vars["childId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Gateway DAO
	//----------------------------------------------------------------------------
	requestResult := GatewayDAO.AssignRoomToGateway(gatewayId, roomId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a Room on a Gateway
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func unassignRoom( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	gatewayId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Gateway DAO
	//----------------------------------------------------------------------------
	requestResult := GatewayDAO.UnassignRoomFromGateway(gatewayId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}

	//----------------------------------------------------------------------------
	// assigns a DigitalTwin on a Gateway
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func assignDigitalTwin(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	gatewayId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	digitalTwinId,_ := strconv.ParseUint( vars["childId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Gateway DAO
	//----------------------------------------------------------------------------
	requestResult := GatewayDAO.AssignDigitalTwinToGateway(gatewayId, digitalTwinId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a DigitalTwin on a Gateway
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func unassignDigitalTwin( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	gatewayId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Gateway DAO
	//----------------------------------------------------------------------------
	requestResult := GatewayDAO.UnassignDigitalTwinFromGateway(gatewayId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}


	//----------------------------------------------------------------------------
	// adds one or more devicesIds as a Devices to a Gateway
	//----------------------------------------------------------------------------
func addToDevices(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	gatewayId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	devicesIds,_ := strconv.ParseUint( vars["childIds"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Gateway DAO
	//----------------------------------------------------------------------------
	requestResult := GatewayDAO.AddDevicesToGateway(gatewayId, devicesIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more devicesIds as a Devices from a Gateway
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func removeFromDevices(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	gatewayId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	devicesIds,_ := strconv.ParseUint( vars["childIds"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Gateway DAO
	//----------------------------------------------------------------------------
	requestResult := GatewayDAO.RemoveDevicesFromGateway(gatewayId, devicesIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
	//----------------------------------------------------------------------------
	// adds one or more edgeApplicationsIds as a EdgeApplications to a Gateway
	//----------------------------------------------------------------------------
func addToEdgeApplications(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	gatewayId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	edgeApplicationsIds,_ := strconv.ParseUint( vars["childIds"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Gateway DAO
	//----------------------------------------------------------------------------
	requestResult := GatewayDAO.AddEdgeApplicationsToGateway(gatewayId, edgeApplicationsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more edgeApplicationsIds as a EdgeApplications from a Gateway
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func removeFromEdgeApplications(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	gatewayId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	edgeApplicationsIds,_ := strconv.ParseUint( vars["childIds"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Gateway DAO
	//----------------------------------------------------------------------------
	requestResult := GatewayDAO.RemoveEdgeApplicationsFromGateway(gatewayId, edgeApplicationsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
	//----------------------------------------------------------------------------
	// adds one or more certificatesIds as a Certificates to a Gateway
	//----------------------------------------------------------------------------
func addToCertificates(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	gatewayId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	certificatesIds,_ := strconv.ParseUint( vars["childIds"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Gateway DAO
	//----------------------------------------------------------------------------
	requestResult := GatewayDAO.AddCertificatesToGateway(gatewayId, certificatesIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more certificatesIds as a Certificates from a Gateway
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func removeFromCertificates(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	gatewayId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	certificatesIds,_ := strconv.ParseUint( vars["childIds"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Gateway DAO
	//----------------------------------------------------------------------------
	requestResult := GatewayDAO.RemoveCertificatesFromGateway(gatewayId, certificatesIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
	//----------------------------------------------------------------------------
	// adds one or more networkProfilesIds as a NetworkProfiles to a Gateway
	//----------------------------------------------------------------------------
func addToNetworkProfiles(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	gatewayId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	networkProfilesIds,_ := strconv.ParseUint( vars["childIds"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Gateway DAO
	//----------------------------------------------------------------------------
	requestResult := GatewayDAO.AddNetworkProfilesToGateway(gatewayId, networkProfilesIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more networkProfilesIds as a NetworkProfiles from a Gateway
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func removeFromNetworkProfiles(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	gatewayId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	networkProfilesIds,_ := strconv.ParseUint( vars["childIds"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Gateway DAO
	//----------------------------------------------------------------------------
	requestResult := GatewayDAO.RemoveNetworkProfilesFromGateway(gatewayId, networkProfilesIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
