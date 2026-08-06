package controller

import (
    KycRecordDAO "WealthManagement-on-golang/internal/dao"
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"net/http"
	"strconv"
)

//----------------------------------------------------------------------------
// Create controller, delegates to KycRecordDAO for database creation
//----------------------------------------------------------------------------
func CreateKycRecord(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty KycRecord model
	//----------------------------------------------------------------------------
	data := model.KycRecord{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a KycRecord model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the KycRecord data access object to create
	//----------------------------------------------------------------------------
	requestResult := KycRecordDAO.CreateKycRecord( data )
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Get controller, delegates to KycRecordDAO to find the relevant KycRecord
//----------------------------------------------------------------------------
func GetKycRecord(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the KycRecord data access object
	// find the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := KycRecordDAO.GetKycRecord(ID)
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}


//----------------------------------------------------------------------------
// GetAll controller, delegates to KycRecordDAO for database read of all KycRecords
//----------------------------------------------------------------------------
func GetAllKycRecord(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Delegate to the KycRecord data access object to get all
	//----------------------------------------------------------------------------
	requestResult := KycRecordDAO.GetAllKycRecord()
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Update controller, delegates to KycRecordDAO for database save
//----------------------------------------------------------------------------
func UpdateKycRecord(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty KycRecord model
	//----------------------------------------------------------------------------
	var data = model.KycRecord{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a KycRecord model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the KycRecord data access object
	// update the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := KycRecordDAO.UpdateKycRecord(data)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Delete controller, delegates to KycRecordDAO for database deletion
//----------------------------------------------------------------------------
func DeleteKycRecord(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the KycRecord data access object
	// delete the one with the matching identifier
	//----------------------------------------------------------------------------	
	requestResult := KycRecordDAO.DeleteKycRecord(ID)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// assigns a Client on a KycRecord
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func AssignClientToKycRecord(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	kycRecordId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	clientId,_ := strconv.ParseUint( vars["clientId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the KycRecord DAO
	//----------------------------------------------------------------------------
	requestResult := KycRecordDAO.AssignClientToKycRecord(kycRecordId, clientId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a Client on a KycRecord
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func UnassignClientFromKycRecord( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	kycRecordId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the KycRecord DAO
	//----------------------------------------------------------------------------
	requestResult := KycRecordDAO.UnassignClientFromKycRecord(kycRecordId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}


	//----------------------------------------------------------------------------
	// adds one or more documentsIds as a Documents to a KycRecord
	//----------------------------------------------------------------------------
func AddDocumentsToKycRecord(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	kycRecordId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	documentsIds,_ := vars["documentsIds"]

	//----------------------------------------------------------------------------
	// Delegate to the KycRecord DAO
	//----------------------------------------------------------------------------
	requestResult := KycRecordDAO.AddDocumentsToKycRecord(kycRecordId, documentsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more documentsIds as a Documents from a KycRecord
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func RemoveDocumentsFromKycRecord(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	kycRecordId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	documentsIds,_ := vars["documentsIds"]

	//----------------------------------------------------------------------------
	// Delegate to the KycRecord DAO
	//----------------------------------------------------------------------------
	requestResult := KycRecordDAO.RemoveDocumentsFromKycRecord(kycRecordId, documentsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
