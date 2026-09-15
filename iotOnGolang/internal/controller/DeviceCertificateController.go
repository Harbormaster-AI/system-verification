package controller

import (
    DeviceCertificateDAO "iotOnGolang/internal/dao"
    "iotOnGolang/internal/model"
    "iotOnGolang/internal/utils"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"net/http"
	"strconv"
)

//----------------------------------------------------------------------------
// Create controller, delegates to DeviceCertificateDAO for database creation
//----------------------------------------------------------------------------
func create(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty DeviceCertificate model
	//----------------------------------------------------------------------------
	data := model.DeviceCertificate{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a DeviceCertificate model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the DeviceCertificate data access object to create
	//----------------------------------------------------------------------------
	requestResult := DeviceCertificateDAO.CreateDeviceCertificate( data )
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Get controller, delegates to DeviceCertificateDAO to find the relevant DeviceCertificate
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
	// Delegate to the DeviceCertificate data access object
	// find the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := DeviceCertificateDAO.GetDeviceCertificate(ID)
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}


//----------------------------------------------------------------------------
// GetAll controller, delegates to DeviceCertificateDAO for database read of all DeviceCertificates
//----------------------------------------------------------------------------
func getAll(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Delegate to the DeviceCertificate data access object to get all
	//----------------------------------------------------------------------------
	requestResult := DeviceCertificateDAO.GetAllDeviceCertificate()
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Update controller, delegates to DeviceCertificateDAO for database save
//----------------------------------------------------------------------------
func update(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty DeviceCertificate model
	//----------------------------------------------------------------------------
	var data = model.DeviceCertificate{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a DeviceCertificate model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the DeviceCertificate data access object
	// update the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := DeviceCertificateDAO.UpdateDeviceCertificate(data)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Delete controller, delegates to DeviceCertificateDAO for database deletion
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
	// Delegate to the DeviceCertificate data access object
	// delete the one with the matching identifier
	//----------------------------------------------------------------------------	
	requestResult := DeviceCertificateDAO.DeleteDeviceCertificate(ID)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// assigns a Device on a DeviceCertificate
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func assignDevice(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	deviceCertificateId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	deviceId,_ := strconv.ParseUint( vars["childId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the DeviceCertificate DAO
	//----------------------------------------------------------------------------
	requestResult := DeviceCertificateDAO.AssignDeviceToDeviceCertificate(deviceCertificateId, deviceId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a Device on a DeviceCertificate
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func unassignDevice( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	deviceCertificateId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the DeviceCertificate DAO
	//----------------------------------------------------------------------------
	requestResult := DeviceCertificateDAO.UnassignDeviceFromDeviceCertificate(deviceCertificateId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}

	//----------------------------------------------------------------------------
	// assigns a Gateway on a DeviceCertificate
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func assignGateway(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	deviceCertificateId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	gatewayId,_ := strconv.ParseUint( vars["childId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the DeviceCertificate DAO
	//----------------------------------------------------------------------------
	requestResult := DeviceCertificateDAO.AssignGatewayToDeviceCertificate(deviceCertificateId, gatewayId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a Gateway on a DeviceCertificate
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func unassignGateway( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	deviceCertificateId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the DeviceCertificate DAO
	//----------------------------------------------------------------------------
	requestResult := DeviceCertificateDAO.UnassignGatewayFromDeviceCertificate(deviceCertificateId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}


