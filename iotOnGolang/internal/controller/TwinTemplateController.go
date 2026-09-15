
package controller

import (
    TwinTemplateDAO "iotOnGolang/internal/dao"
    "iotOnGolang/internal/model"
    "iotOnGolang/internal/utils"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"net/http"
	"strconv"
)

//----------------------------------------------------------------------------
// Create controller, delegates to TwinTemplateDAO for database creation
//----------------------------------------------------------------------------
func create(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty TwinTemplate model
	//----------------------------------------------------------------------------
	data := model.TwinTemplate{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a TwinTemplate model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the TwinTemplate data access object to create
	//----------------------------------------------------------------------------
	requestResult := TwinTemplateDAO.CreateTwinTemplate( data )
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Get controller, delegates to TwinTemplateDAO to find the relevant TwinTemplate
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
	// Delegate to the TwinTemplate data access object
	// find the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := TwinTemplateDAO.GetTwinTemplate(ID)
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}


//----------------------------------------------------------------------------
// GetAll controller, delegates to TwinTemplateDAO for database read of all TwinTemplates
//----------------------------------------------------------------------------
func getAll(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Delegate to the TwinTemplate data access object to get all
	//----------------------------------------------------------------------------
	requestResult := TwinTemplateDAO.GetAllTwinTemplate()
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Update controller, delegates to TwinTemplateDAO for database save
//----------------------------------------------------------------------------
func update(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty TwinTemplate model
	//----------------------------------------------------------------------------
	var data = model.TwinTemplate{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a TwinTemplate model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the TwinTemplate data access object
	// update the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := TwinTemplateDAO.UpdateTwinTemplate(data)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Delete controller, delegates to TwinTemplateDAO for database deletion
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
	// Delegate to the TwinTemplate data access object
	// delete the one with the matching identifier
	//----------------------------------------------------------------------------	
	requestResult := TwinTemplateDAO.DeleteTwinTemplate(ID)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}


	//----------------------------------------------------------------------------
	// adds one or more deviceModelsIds as a DeviceModels to a TwinTemplate
	//----------------------------------------------------------------------------
func addToDeviceModels(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	twinTemplateId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	deviceModelsIds,_ := strconv.ParseUint( vars["childIds"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the TwinTemplate DAO
	//----------------------------------------------------------------------------
	requestResult := TwinTemplateDAO.AddDeviceModelsToTwinTemplate(twinTemplateId, deviceModelsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more deviceModelsIds as a DeviceModels from a TwinTemplate
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func removeFromDeviceModels(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	twinTemplateId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	deviceModelsIds,_ := strconv.ParseUint( vars["childIds"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the TwinTemplate DAO
	//----------------------------------------------------------------------------
	requestResult := TwinTemplateDAO.RemoveDeviceModelsFromTwinTemplate(twinTemplateId, deviceModelsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
