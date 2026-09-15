package controller

import (
    TelemetryStreamDAO "iotOnGolang/internal/dao"
    "iotOnGolang/internal/model"
    "iotOnGolang/internal/utils"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"net/http"
	"strconv"
)

//----------------------------------------------------------------------------
// Create controller, delegates to TelemetryStreamDAO for database creation
//----------------------------------------------------------------------------
func create(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty TelemetryStream model
	//----------------------------------------------------------------------------
	data := model.TelemetryStream{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a TelemetryStream model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the TelemetryStream data access object to create
	//----------------------------------------------------------------------------
	requestResult := TelemetryStreamDAO.CreateTelemetryStream( data )
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Get controller, delegates to TelemetryStreamDAO to find the relevant TelemetryStream
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
	// Delegate to the TelemetryStream data access object
	// find the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := TelemetryStreamDAO.GetTelemetryStream(ID)
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}


//----------------------------------------------------------------------------
// GetAll controller, delegates to TelemetryStreamDAO for database read of all TelemetryStreams
//----------------------------------------------------------------------------
func getAll(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Delegate to the TelemetryStream data access object to get all
	//----------------------------------------------------------------------------
	requestResult := TelemetryStreamDAO.GetAllTelemetryStream()
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Update controller, delegates to TelemetryStreamDAO for database save
//----------------------------------------------------------------------------
func update(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty TelemetryStream model
	//----------------------------------------------------------------------------
	var data = model.TelemetryStream{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a TelemetryStream model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the TelemetryStream data access object
	// update the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := TelemetryStreamDAO.UpdateTelemetryStream(data)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Delete controller, delegates to TelemetryStreamDAO for database deletion
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
	// Delegate to the TelemetryStream data access object
	// delete the one with the matching identifier
	//----------------------------------------------------------------------------	
	requestResult := TelemetryStreamDAO.DeleteTelemetryStream(ID)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// assigns a Device on a TelemetryStream
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func assignDevice(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	telemetryStreamId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	deviceId,_ := strconv.ParseUint( vars["childId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the TelemetryStream DAO
	//----------------------------------------------------------------------------
	requestResult := TelemetryStreamDAO.AssignDeviceToTelemetryStream(telemetryStreamId, deviceId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a Device on a TelemetryStream
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func unassignDevice( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	telemetryStreamId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the TelemetryStream DAO
	//----------------------------------------------------------------------------
	requestResult := TelemetryStreamDAO.UnassignDeviceFromTelemetryStream(telemetryStreamId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}

	//----------------------------------------------------------------------------
	// assigns a Sensor on a TelemetryStream
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func assignSensor(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	telemetryStreamId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	sensorId,_ := strconv.ParseUint( vars["childId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the TelemetryStream DAO
	//----------------------------------------------------------------------------
	requestResult := TelemetryStreamDAO.AssignSensorToTelemetryStream(telemetryStreamId, sensorId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a Sensor on a TelemetryStream
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func unassignSensor( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	telemetryStreamId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the TelemetryStream DAO
	//----------------------------------------------------------------------------
	requestResult := TelemetryStreamDAO.UnassignSensorFromTelemetryStream(telemetryStreamId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}

	//----------------------------------------------------------------------------
	// assigns a Schema on a TelemetryStream
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func assignSchema(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	telemetryStreamId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	schemaId,_ := strconv.ParseUint( vars["childId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the TelemetryStream DAO
	//----------------------------------------------------------------------------
	requestResult := TelemetryStreamDAO.AssignSchemaToTelemetryStream(telemetryStreamId, schemaId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a Schema on a TelemetryStream
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func unassignSchema( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	telemetryStreamId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the TelemetryStream DAO
	//----------------------------------------------------------------------------
	requestResult := TelemetryStreamDAO.UnassignSchemaFromTelemetryStream(telemetryStreamId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}

	//----------------------------------------------------------------------------
	// assigns a MessagingEndpoint on a TelemetryStream
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func assignMessagingEndpoint(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	telemetryStreamId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	messagingEndpointId,_ := strconv.ParseUint( vars["childId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the TelemetryStream DAO
	//----------------------------------------------------------------------------
	requestResult := TelemetryStreamDAO.AssignMessagingEndpointToTelemetryStream(telemetryStreamId, messagingEndpointId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a MessagingEndpoint on a TelemetryStream
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func unassignMessagingEndpoint( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	telemetryStreamId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the TelemetryStream DAO
	//----------------------------------------------------------------------------
	requestResult := TelemetryStreamDAO.UnassignMessagingEndpointFromTelemetryStream(telemetryStreamId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}

	//----------------------------------------------------------------------------
	// assigns a RetentionPolicy on a TelemetryStream
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func assignRetentionPolicy(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	telemetryStreamId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	retentionPolicyId,_ := strconv.ParseUint( vars["childId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the TelemetryStream DAO
	//----------------------------------------------------------------------------
	requestResult := TelemetryStreamDAO.AssignRetentionPolicyToTelemetryStream(telemetryStreamId, retentionPolicyId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a RetentionPolicy on a TelemetryStream
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func unassignRetentionPolicy( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	telemetryStreamId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the TelemetryStream DAO
	//----------------------------------------------------------------------------
	requestResult := TelemetryStreamDAO.UnassignRetentionPolicyFromTelemetryStream(telemetryStreamId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}


