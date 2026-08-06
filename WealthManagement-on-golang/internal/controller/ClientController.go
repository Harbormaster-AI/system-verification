package controller

import (
    ClientDAO "WealthManagement-on-golang/internal/dao"
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"net/http"
	"strconv"
)

//----------------------------------------------------------------------------
// Create controller, delegates to ClientDAO for database creation
//----------------------------------------------------------------------------
func CreateClient(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty Client model
	//----------------------------------------------------------------------------
	data := model.Client{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a Client model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the Client data access object to create
	//----------------------------------------------------------------------------
	requestResult := ClientDAO.CreateClient( data )
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Get controller, delegates to ClientDAO to find the relevant Client
//----------------------------------------------------------------------------
func GetClient(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the Client data access object
	// find the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := ClientDAO.GetClient(ID)
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}


//----------------------------------------------------------------------------
// GetAll controller, delegates to ClientDAO for database read of all Clients
//----------------------------------------------------------------------------
func GetAllClient(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Delegate to the Client data access object to get all
	//----------------------------------------------------------------------------
	requestResult := ClientDAO.GetAllClient()
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Update controller, delegates to ClientDAO for database save
//----------------------------------------------------------------------------
func UpdateClient(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty Client model
	//----------------------------------------------------------------------------
	var data = model.Client{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a Client model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the Client data access object
	// update the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := ClientDAO.UpdateClient(data)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Delete controller, delegates to ClientDAO for database deletion
//----------------------------------------------------------------------------
func DeleteClient(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the Client data access object
	// delete the one with the matching identifier
	//----------------------------------------------------------------------------	
	requestResult := ClientDAO.DeleteClient(ID)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// assigns a Household on a Client
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func AssignHouseholdToClient(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	clientId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	householdId,_ := strconv.ParseUint( vars["householdId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Client DAO
	//----------------------------------------------------------------------------
	requestResult := ClientDAO.AssignHouseholdToClient(clientId, householdId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a Household on a Client
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func UnassignHouseholdFromClient( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	clientId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Client DAO
	//----------------------------------------------------------------------------
	requestResult := ClientDAO.UnassignHouseholdFromClient(clientId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}

	//----------------------------------------------------------------------------
	// assigns a KycRecord on a Client
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func AssignKycRecordToClient(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	clientId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	kycRecordId,_ := strconv.ParseUint( vars["kycRecordId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Client DAO
	//----------------------------------------------------------------------------
	requestResult := ClientDAO.AssignKycRecordToClient(clientId, kycRecordId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a KycRecord on a Client
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func UnassignKycRecordFromClient( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	clientId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Client DAO
	//----------------------------------------------------------------------------
	requestResult := ClientDAO.UnassignKycRecordFromClient(clientId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}


	//----------------------------------------------------------------------------
	// adds one or more accountsIds as a Accounts to a Client
	//----------------------------------------------------------------------------
func AddAccountsToClient(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	clientId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	accountsIds,_ := vars["accountsIds"]

	//----------------------------------------------------------------------------
	// Delegate to the Client DAO
	//----------------------------------------------------------------------------
	requestResult := ClientDAO.AddAccountsToClient(clientId, accountsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more accountsIds as a Accounts from a Client
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func RemoveAccountsFromClient(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	clientId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	accountsIds,_ := vars["accountsIds"]

	//----------------------------------------------------------------------------
	// Delegate to the Client DAO
	//----------------------------------------------------------------------------
	requestResult := ClientDAO.RemoveAccountsFromClient(clientId, accountsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
	//----------------------------------------------------------------------------
	// adds one or more documentsIds as a Documents to a Client
	//----------------------------------------------------------------------------
func AddDocumentsToClient(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	clientId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	documentsIds,_ := vars["documentsIds"]

	//----------------------------------------------------------------------------
	// Delegate to the Client DAO
	//----------------------------------------------------------------------------
	requestResult := ClientDAO.AddDocumentsToClient(clientId, documentsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more documentsIds as a Documents from a Client
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func RemoveDocumentsFromClient(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	clientId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	documentsIds,_ := vars["documentsIds"]

	//----------------------------------------------------------------------------
	// Delegate to the Client DAO
	//----------------------------------------------------------------------------
	requestResult := ClientDAO.RemoveDocumentsFromClient(clientId, documentsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
	//----------------------------------------------------------------------------
	// adds one or more beneficiariesIds as a Beneficiaries to a Client
	//----------------------------------------------------------------------------
func AddBeneficiariesToClient(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	clientId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	beneficiariesIds,_ := vars["beneficiariesIds"]

	//----------------------------------------------------------------------------
	// Delegate to the Client DAO
	//----------------------------------------------------------------------------
	requestResult := ClientDAO.AddBeneficiariesToClient(clientId, beneficiariesIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more beneficiariesIds as a Beneficiaries from a Client
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func RemoveBeneficiariesFromClient(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	clientId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	beneficiariesIds,_ := vars["beneficiariesIds"]

	//----------------------------------------------------------------------------
	// Delegate to the Client DAO
	//----------------------------------------------------------------------------
	requestResult := ClientDAO.RemoveBeneficiariesFromClient(clientId, beneficiariesIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
	//----------------------------------------------------------------------------
	// adds one or more agreementsIds as a Agreements to a Client
	//----------------------------------------------------------------------------
func AddAgreementsToClient(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	clientId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	agreementsIds,_ := vars["agreementsIds"]

	//----------------------------------------------------------------------------
	// Delegate to the Client DAO
	//----------------------------------------------------------------------------
	requestResult := ClientDAO.AddAgreementsToClient(clientId, agreementsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more agreementsIds as a Agreements from a Client
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func RemoveAgreementsFromClient(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	clientId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	agreementsIds,_ := vars["agreementsIds"]

	//----------------------------------------------------------------------------
	// Delegate to the Client DAO
	//----------------------------------------------------------------------------
	requestResult := ClientDAO.RemoveAgreementsFromClient(clientId, agreementsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
