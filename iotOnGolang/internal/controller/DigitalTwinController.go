package controller

import (
    DigitalTwinDAO "iotOnGolang/internal/dao"
    "iotOnGolang/internal/model"
    "iotOnGolang/internal/utils"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"net/http"
	"strconv"
)

//----------------------------------------------------------------------------
// Create controller, delegates to DigitalTwinDAO for database creation
//----------------------------------------------------------------------------
func create(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty DigitalTwin model
	//----------------------------------------------------------------------------
	data := model.DigitalTwin{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a DigitalTwin model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the DigitalTwin data access object to create
	//----------------------------------------------------------------------------
	requestResult := DigitalTwinDAO.CreateDigitalTwin( data )
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Get controller, delegates to DigitalTwinDAO to find the relevant DigitalTwin
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
	// Delegate to the DigitalTwin data access object
	// find the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := DigitalTwinDAO.GetDigitalTwin(ID)
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}


//----------------------------------------------------------------------------
// GetAll controller, delegates to DigitalTwinDAO for database read of all DigitalTwins
//----------------------------------------------------------------------------
func getAll(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Delegate to the DigitalTwin data access object to get all
	//----------------------------------------------------------------------------
	requestResult := DigitalTwinDAO.GetAllDigitalTwin()
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Update controller, delegates to DigitalTwinDAO for database save
//----------------------------------------------------------------------------
func update(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty DigitalTwin model
	//----------------------------------------------------------------------------
	var data = model.DigitalTwin{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a DigitalTwin model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the DigitalTwin data access object
	// update the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := DigitalTwinDAO.UpdateDigitalTwin(data)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Delete controller, delegates to DigitalTwinDAO for database deletion
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
	// Delegate to the DigitalTwin data access object
	// delete the one with the matching identifier
	//----------------------------------------------------------------------------	
	requestResult := DigitalTwinDAO.DeleteDigitalTwin(ID)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// assigns a Device on a DigitalTwin
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func assignDevice(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	digitalTwinId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	deviceId,_ := strconv.ParseUint( vars["childId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the DigitalTwin DAO
	//----------------------------------------------------------------------------
	requestResult := DigitalTwinDAO.AssignDeviceToDigitalTwin(digitalTwinId, deviceId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a Device on a DigitalTwin
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func unassignDevice( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	digitalTwinId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the DigitalTwin DAO
	//----------------------------------------------------------------------------
	requestResult := DigitalTwinDAO.UnassignDeviceFromDigitalTwin(digitalTwinId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}

	//----------------------------------------------------------------------------
	// assigns a Gateway on a DigitalTwin
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func assignGateway(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	digitalTwinId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	gatewayId,_ := strconv.ParseUint( vars["childId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the DigitalTwin DAO
	//----------------------------------------------------------------------------
	requestResult := DigitalTwinDAO.AssignGatewayToDigitalTwin(digitalTwinId, gatewayId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a Gateway on a DigitalTwin
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func unassignGateway( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	digitalTwinId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the DigitalTwin DAO
	//----------------------------------------------------------------------------
	requestResult := DigitalTwinDAO.UnassignGatewayFromDigitalTwin(digitalTwinId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}

	//----------------------------------------------------------------------------
	// assigns a Template on a DigitalTwin
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func assignTemplate(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	digitalTwinId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	templateId,_ := strconv.ParseUint( vars["childId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the DigitalTwin DAO
	//----------------------------------------------------------------------------
	requestResult := DigitalTwinDAO.AssignTemplateToDigitalTwin(digitalTwinId, templateId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a Template on a DigitalTwin
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func unassignTemplate( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	digitalTwinId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the DigitalTwin DAO
	//----------------------------------------------------------------------------
	requestResult := DigitalTwinDAO.UnassignTemplateFromDigitalTwin(digitalTwinId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}


	//----------------------------------------------------------------------------
	// adds one or more changeEventsIds as a ChangeEvents to a DigitalTwin
	//----------------------------------------------------------------------------
func addToChangeEvents(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	digitalTwinId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	changeEventsIds,_ := strconv.ParseUint( vars["childIds"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the DigitalTwin DAO
	//----------------------------------------------------------------------------
	requestResult := DigitalTwinDAO.AddChangeEventsToDigitalTwin(digitalTwinId, changeEventsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more changeEventsIds as a ChangeEvents from a DigitalTwin
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func removeFromChangeEvents(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	digitalTwinId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	changeEventsIds,_ := strconv.ParseUint( vars["childIds"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the DigitalTwin DAO
	//----------------------------------------------------------------------------
	requestResult := DigitalTwinDAO.RemoveChangeEventsFromDigitalTwin(digitalTwinId, changeEventsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
