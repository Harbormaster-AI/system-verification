package controller

import (
    FeeScheduleDAO "WealthManagement-on-golang/internal/dao"
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"net/http"
	"strconv"
)

//----------------------------------------------------------------------------
// Create controller, delegates to FeeScheduleDAO for database creation
//----------------------------------------------------------------------------
func CreateFeeSchedule(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty FeeSchedule model
	//----------------------------------------------------------------------------
	data := model.FeeSchedule{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a FeeSchedule model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the FeeSchedule data access object to create
	//----------------------------------------------------------------------------
	requestResult := FeeScheduleDAO.CreateFeeSchedule( data )
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Get controller, delegates to FeeScheduleDAO to find the relevant FeeSchedule
//----------------------------------------------------------------------------
func GetFeeSchedule(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the FeeSchedule data access object
	// find the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := FeeScheduleDAO.GetFeeSchedule(ID)
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}


//----------------------------------------------------------------------------
// GetAll controller, delegates to FeeScheduleDAO for database read of all FeeSchedules
//----------------------------------------------------------------------------
func GetAllFeeSchedule(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Delegate to the FeeSchedule data access object to get all
	//----------------------------------------------------------------------------
	requestResult := FeeScheduleDAO.GetAllFeeSchedule()
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Update controller, delegates to FeeScheduleDAO for database save
//----------------------------------------------------------------------------
func UpdateFeeSchedule(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty FeeSchedule model
	//----------------------------------------------------------------------------
	var data = model.FeeSchedule{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a FeeSchedule model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the FeeSchedule data access object
	// update the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := FeeScheduleDAO.UpdateFeeSchedule(data)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Delete controller, delegates to FeeScheduleDAO for database deletion
//----------------------------------------------------------------------------
func DeleteFeeSchedule(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the FeeSchedule data access object
	// delete the one with the matching identifier
	//----------------------------------------------------------------------------	
	requestResult := FeeScheduleDAO.DeleteFeeSchedule(ID)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}


	//----------------------------------------------------------------------------
	// adds one or more accountsIds as a Accounts to a FeeSchedule
	//----------------------------------------------------------------------------
func AddAccountsToFeeSchedule(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	feeScheduleId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	accountsIds,_ := vars["accountsIds"]

	//----------------------------------------------------------------------------
	// Delegate to the FeeSchedule DAO
	//----------------------------------------------------------------------------
	requestResult := FeeScheduleDAO.AddAccountsToFeeSchedule(feeScheduleId, accountsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more accountsIds as a Accounts from a FeeSchedule
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func RemoveAccountsFromFeeSchedule(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	feeScheduleId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	accountsIds,_ := vars["accountsIds"]

	//----------------------------------------------------------------------------
	// Delegate to the FeeSchedule DAO
	//----------------------------------------------------------------------------
	requestResult := FeeScheduleDAO.RemoveAccountsFromFeeSchedule(feeScheduleId, accountsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
	//----------------------------------------------------------------------------
	// adds one or more billingRunsIds as a BillingRuns to a FeeSchedule
	//----------------------------------------------------------------------------
func AddBillingRunsToFeeSchedule(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	feeScheduleId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	billingRunsIds,_ := vars["billingRunsIds"]

	//----------------------------------------------------------------------------
	// Delegate to the FeeSchedule DAO
	//----------------------------------------------------------------------------
	requestResult := FeeScheduleDAO.AddBillingRunsToFeeSchedule(feeScheduleId, billingRunsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more billingRunsIds as a BillingRuns from a FeeSchedule
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func RemoveBillingRunsFromFeeSchedule(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	feeScheduleId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	billingRunsIds,_ := vars["billingRunsIds"]

	//----------------------------------------------------------------------------
	// Delegate to the FeeSchedule DAO
	//----------------------------------------------------------------------------
	requestResult := FeeScheduleDAO.RemoveBillingRunsFromFeeSchedule(feeScheduleId, billingRunsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
