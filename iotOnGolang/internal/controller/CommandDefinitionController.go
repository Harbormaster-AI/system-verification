package controller

import (
    CommandDefinitionDAO "iotOnGolang/internal/dao"
    "iotOnGolang/internal/model"
    "iotOnGolang/internal/utils"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"net/http"
	"strconv"
)

//----------------------------------------------------------------------------
// Create controller, delegates to CommandDefinitionDAO for database creation
//----------------------------------------------------------------------------
func create(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty CommandDefinition model
	//----------------------------------------------------------------------------
	data := model.CommandDefinition{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a CommandDefinition model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the CommandDefinition data access object to create
	//----------------------------------------------------------------------------
	requestResult := CommandDefinitionDAO.CreateCommandDefinition( data )
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Get controller, delegates to CommandDefinitionDAO to find the relevant CommandDefinition
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
	// Delegate to the CommandDefinition data access object
	// find the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := CommandDefinitionDAO.GetCommandDefinition(ID)
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}


//----------------------------------------------------------------------------
// GetAll controller, delegates to CommandDefinitionDAO for database read of all CommandDefinitions
//----------------------------------------------------------------------------
func getAll(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Delegate to the CommandDefinition data access object to get all
	//----------------------------------------------------------------------------
	requestResult := CommandDefinitionDAO.GetAllCommandDefinition()
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Update controller, delegates to CommandDefinitionDAO for database save
//----------------------------------------------------------------------------
func update(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty CommandDefinition model
	//----------------------------------------------------------------------------
	var data = model.CommandDefinition{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a CommandDefinition model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the CommandDefinition data access object
	// update the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := CommandDefinitionDAO.UpdateCommandDefinition(data)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Delete controller, delegates to CommandDefinitionDAO for database deletion
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
	// Delegate to the CommandDefinition data access object
	// delete the one with the matching identifier
	//----------------------------------------------------------------------------	
	requestResult := CommandDefinitionDAO.DeleteCommandDefinition(ID)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// assigns a DeviceModel on a CommandDefinition
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func assignDeviceModel(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	commandDefinitionId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	deviceModelId,_ := strconv.ParseUint( vars["childId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the CommandDefinition DAO
	//----------------------------------------------------------------------------
	requestResult := CommandDefinitionDAO.AssignDeviceModelToCommandDefinition(commandDefinitionId, deviceModelId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a DeviceModel on a CommandDefinition
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func unassignDeviceModel( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	commandDefinitionId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the CommandDefinition DAO
	//----------------------------------------------------------------------------
	requestResult := CommandDefinitionDAO.UnassignDeviceModelFromCommandDefinition(commandDefinitionId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}


	//----------------------------------------------------------------------------
	// adds one or more actuatorsIds as a Actuators to a CommandDefinition
	//----------------------------------------------------------------------------
func addToActuators(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	commandDefinitionId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	actuatorsIds,_ := strconv.ParseUint( vars["childIds"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the CommandDefinition DAO
	//----------------------------------------------------------------------------
	requestResult := CommandDefinitionDAO.AddActuatorsToCommandDefinition(commandDefinitionId, actuatorsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more actuatorsIds as a Actuators from a CommandDefinition
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func removeFromActuators(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	commandDefinitionId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	actuatorsIds,_ := strconv.ParseUint( vars["childIds"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the CommandDefinition DAO
	//----------------------------------------------------------------------------
	requestResult := CommandDefinitionDAO.RemoveActuatorsFromCommandDefinition(commandDefinitionId, actuatorsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
	//----------------------------------------------------------------------------
	// adds one or more commandInvocationsIds as a CommandInvocations to a CommandDefinition
	//----------------------------------------------------------------------------
func addToCommandInvocations(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	commandDefinitionId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	commandInvocationsIds,_ := strconv.ParseUint( vars["childIds"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the CommandDefinition DAO
	//----------------------------------------------------------------------------
	requestResult := CommandDefinitionDAO.AddCommandInvocationsToCommandDefinition(commandDefinitionId, commandInvocationsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more commandInvocationsIds as a CommandInvocations from a CommandDefinition
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func removeFromCommandInvocations(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	commandDefinitionId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	commandInvocationsIds,_ := strconv.ParseUint( vars["childIds"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the CommandDefinition DAO
	//----------------------------------------------------------------------------
	requestResult := CommandDefinitionDAO.RemoveCommandInvocationsFromCommandDefinition(commandDefinitionId, commandInvocationsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
