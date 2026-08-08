package controller

import (
    BeneficiaryDAO "WealthManagement-on-golang/internal/dao"
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"net/http"
	"strconv"
)

//----------------------------------------------------------------------------
// Create controller, delegates to BeneficiaryDAO for database creation
//----------------------------------------------------------------------------
func CreateBeneficiary(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty Beneficiary model
	//----------------------------------------------------------------------------
	data := model.Beneficiary{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a Beneficiary model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the Beneficiary data access object to create
	//----------------------------------------------------------------------------
	requestResult := BeneficiaryDAO.CreateBeneficiary( data )
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Get controller, delegates to BeneficiaryDAO to find the relevant Beneficiary
//----------------------------------------------------------------------------
func GetBeneficiary(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the Beneficiary data access object
	// find the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := BeneficiaryDAO.GetBeneficiary(ID)
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}


//----------------------------------------------------------------------------
// GetAll controller, delegates to BeneficiaryDAO for database read of all Beneficiarys
//----------------------------------------------------------------------------
func GetAllBeneficiary(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Delegate to the Beneficiary data access object to get all
	//----------------------------------------------------------------------------
	requestResult := BeneficiaryDAO.GetAllBeneficiary()
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Update controller, delegates to BeneficiaryDAO for database save
//----------------------------------------------------------------------------
func UpdateBeneficiary(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty Beneficiary model
	//----------------------------------------------------------------------------
	var data = model.Beneficiary{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a Beneficiary model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the Beneficiary data access object
	// update the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := BeneficiaryDAO.UpdateBeneficiary(data)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Delete controller, delegates to BeneficiaryDAO for database deletion
//----------------------------------------------------------------------------
func DeleteBeneficiary(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the Beneficiary data access object
	// delete the one with the matching identifier
	//----------------------------------------------------------------------------	
	requestResult := BeneficiaryDAO.DeleteBeneficiary(ID)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// assigns a Client on a Beneficiary
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func AssignClientToBeneficiary(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	beneficiaryId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	clientId,_ := strconv.ParseUint( vars["clientId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Beneficiary DAO
	//----------------------------------------------------------------------------
	requestResult := BeneficiaryDAO.AssignClientToBeneficiary(beneficiaryId, clientId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a Client on a Beneficiary
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func UnassignClientFromBeneficiary( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	beneficiaryId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Beneficiary DAO
	//----------------------------------------------------------------------------
	requestResult := BeneficiaryDAO.UnassignClientFromBeneficiary(beneficiaryId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}


	//----------------------------------------------------------------------------
	// adds one or more accountsIds as a Accounts to a Beneficiary
	//----------------------------------------------------------------------------
func AddAccountsToBeneficiary(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	beneficiaryId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	accountsIds,_ := vars["accountsIds"]

	//----------------------------------------------------------------------------
	// Delegate to the Beneficiary DAO
	//----------------------------------------------------------------------------
	requestResult := BeneficiaryDAO.AddAccountsToBeneficiary(beneficiaryId, accountsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more accountsIds as a Accounts from a Beneficiary
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func RemoveAccountsFromBeneficiary(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	beneficiaryId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	accountsIds,_ := vars["accountsIds"]

	//----------------------------------------------------------------------------
	// Delegate to the Beneficiary DAO
	//----------------------------------------------------------------------------
	requestResult := BeneficiaryDAO.RemoveAccountsFromBeneficiary(beneficiaryId, accountsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
