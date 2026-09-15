
package controller

import (
    AlertDAO "iotOnGolang/internal/dao"
    "iotOnGolang/internal/model"
    "iotOnGolang/internal/utils"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"net/http"
	"strconv"
)

//----------------------------------------------------------------------------
// Create controller, delegates to AlertDAO for database creation
//----------------------------------------------------------------------------
func create(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty Alert model
	//----------------------------------------------------------------------------
	data := model.Alert{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a Alert model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the Alert data access object to create
	//----------------------------------------------------------------------------
	requestResult := AlertDAO.CreateAlert( data )
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Get controller, delegates to AlertDAO to find the relevant Alert
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
	// Delegate to the Alert data access object
	// find the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := AlertDAO.GetAlert(ID)
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}


//----------------------------------------------------------------------------
// GetAll controller, delegates to AlertDAO for database read of all Alerts
//----------------------------------------------------------------------------
func getAll(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Delegate to the Alert data access object to get all
	//----------------------------------------------------------------------------
	requestResult := AlertDAO.GetAllAlert()
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Update controller, delegates to AlertDAO for database save
//----------------------------------------------------------------------------
func update(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty Alert model
	//----------------------------------------------------------------------------
	var data = model.Alert{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a Alert model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the Alert data access object
	// update the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := AlertDAO.UpdateAlert(data)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Delete controller, delegates to AlertDAO for database deletion
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
	// Delegate to the Alert data access object
	// delete the one with the matching identifier
	//----------------------------------------------------------------------------	
	requestResult := AlertDAO.DeleteAlert(ID)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// assigns a Device on a Alert
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func assignDevice(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	alertId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	deviceId,_ := strconv.ParseUint( vars["childId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Alert DAO
	//----------------------------------------------------------------------------
	requestResult := AlertDAO.AssignDeviceToAlert(alertId, deviceId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a Device on a Alert
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func unassignDevice( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	alertId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Alert DAO
	//----------------------------------------------------------------------------
	requestResult := AlertDAO.UnassignDeviceFromAlert(alertId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}

	//----------------------------------------------------------------------------
	// assigns a AlertRule on a Alert
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func assignAlertRule(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	alertId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	alertRuleId,_ := strconv.ParseUint( vars["childId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Alert DAO
	//----------------------------------------------------------------------------
	requestResult := AlertDAO.AssignAlertRuleToAlert(alertId, alertRuleId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a AlertRule on a Alert
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func unassignAlertRule( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	alertId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Alert DAO
	//----------------------------------------------------------------------------
	requestResult := AlertDAO.UnassignAlertRuleFromAlert(alertId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}


