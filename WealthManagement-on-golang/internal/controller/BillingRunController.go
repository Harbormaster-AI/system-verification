package controller

import (
    BillingRunDAO "WealthManagement-on-golang/internal/dao"
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"net/http"
	"strconv"
)

//----------------------------------------------------------------------------
// Create controller, delegates to BillingRunDAO for database creation
//----------------------------------------------------------------------------
func CreateBillingRun(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty BillingRun model
	//----------------------------------------------------------------------------
	data := model.BillingRun{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a BillingRun model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the BillingRun data access object to create
	//----------------------------------------------------------------------------
	requestResult := BillingRunDAO.CreateBillingRun( data )
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Get controller, delegates to BillingRunDAO to find the relevant BillingRun
//----------------------------------------------------------------------------
func GetBillingRun(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the BillingRun data access object
	// find the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := BillingRunDAO.GetBillingRun(ID)
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}


//----------------------------------------------------------------------------
// GetAll controller, delegates to BillingRunDAO for database read of all BillingRuns
//----------------------------------------------------------------------------
func GetAllBillingRun(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Delegate to the BillingRun data access object to get all
	//----------------------------------------------------------------------------
	requestResult := BillingRunDAO.GetAllBillingRun()
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Update controller, delegates to BillingRunDAO for database save
//----------------------------------------------------------------------------
func UpdateBillingRun(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty BillingRun model
	//----------------------------------------------------------------------------
	var data = model.BillingRun{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a BillingRun model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the BillingRun data access object
	// update the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := BillingRunDAO.UpdateBillingRun(data)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Delete controller, delegates to BillingRunDAO for database deletion
//----------------------------------------------------------------------------
func DeleteBillingRun(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the BillingRun data access object
	// delete the one with the matching identifier
	//----------------------------------------------------------------------------	
	requestResult := BillingRunDAO.DeleteBillingRun(ID)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// assigns a FeeSchedule on a BillingRun
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func AssignFeeScheduleToBillingRun(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	billingRunId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	feeScheduleId,_ := strconv.ParseUint( vars["feeScheduleId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the BillingRun DAO
	//----------------------------------------------------------------------------
	requestResult := BillingRunDAO.AssignFeeScheduleToBillingRun(billingRunId, feeScheduleId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a FeeSchedule on a BillingRun
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func UnassignFeeScheduleFromBillingRun( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	billingRunId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the BillingRun DAO
	//----------------------------------------------------------------------------
	requestResult := BillingRunDAO.UnassignFeeScheduleFromBillingRun(billingRunId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}


	//----------------------------------------------------------------------------
	// adds one or more invoicesIds as a Invoices to a BillingRun
	//----------------------------------------------------------------------------
func AddInvoicesToBillingRun(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	billingRunId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	invoicesIds,_ := vars["invoicesIds"]

	//----------------------------------------------------------------------------
	// Delegate to the BillingRun DAO
	//----------------------------------------------------------------------------
	requestResult := BillingRunDAO.AddInvoicesToBillingRun(billingRunId, invoicesIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more invoicesIds as a Invoices from a BillingRun
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func RemoveInvoicesFromBillingRun(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	billingRunId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	invoicesIds,_ := vars["invoicesIds"]

	//----------------------------------------------------------------------------
	// Delegate to the BillingRun DAO
	//----------------------------------------------------------------------------
	requestResult := BillingRunDAO.RemoveInvoicesFromBillingRun(billingRunId, invoicesIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
