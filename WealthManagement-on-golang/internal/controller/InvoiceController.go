package controller

import (
    InvoiceDAO "WealthManagement-on-golang/internal/dao"
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"net/http"
	"strconv"
)

//----------------------------------------------------------------------------
// Create controller, delegates to InvoiceDAO for database creation
//----------------------------------------------------------------------------
func CreateInvoice(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty Invoice model
	//----------------------------------------------------------------------------
	data := model.Invoice{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a Invoice model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the Invoice data access object to create
	//----------------------------------------------------------------------------
	requestResult := InvoiceDAO.CreateInvoice( data )
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Get controller, delegates to InvoiceDAO to find the relevant Invoice
//----------------------------------------------------------------------------
func GetInvoice(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the Invoice data access object
	// find the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := InvoiceDAO.GetInvoice(ID)
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}


//----------------------------------------------------------------------------
// GetAll controller, delegates to InvoiceDAO for database read of all Invoices
//----------------------------------------------------------------------------
func GetAllInvoice(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Delegate to the Invoice data access object to get all
	//----------------------------------------------------------------------------
	requestResult := InvoiceDAO.GetAllInvoice()
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Update controller, delegates to InvoiceDAO for database save
//----------------------------------------------------------------------------
func UpdateInvoice(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty Invoice model
	//----------------------------------------------------------------------------
	var data = model.Invoice{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a Invoice model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the Invoice data access object
	// update the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := InvoiceDAO.UpdateInvoice(data)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Delete controller, delegates to InvoiceDAO for database deletion
//----------------------------------------------------------------------------
func DeleteInvoice(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the Invoice data access object
	// delete the one with the matching identifier
	//----------------------------------------------------------------------------	
	requestResult := InvoiceDAO.DeleteInvoice(ID)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// assigns a Account on a Invoice
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func AssignAccountToInvoice(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	invoiceId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	accountId,_ := strconv.ParseUint( vars["accountId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Invoice DAO
	//----------------------------------------------------------------------------
	requestResult := InvoiceDAO.AssignAccountToInvoice(invoiceId, accountId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a Account on a Invoice
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func UnassignAccountFromInvoice( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	invoiceId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Invoice DAO
	//----------------------------------------------------------------------------
	requestResult := InvoiceDAO.UnassignAccountFromInvoice(invoiceId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}

	//----------------------------------------------------------------------------
	// assigns a BillingRun on a Invoice
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func AssignBillingRunToInvoice(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	invoiceId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	billingRunId,_ := strconv.ParseUint( vars["billingRunId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Invoice DAO
	//----------------------------------------------------------------------------
	requestResult := InvoiceDAO.AssignBillingRunToInvoice(invoiceId, billingRunId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a BillingRun on a Invoice
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func UnassignBillingRunFromInvoice( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	invoiceId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Invoice DAO
	//----------------------------------------------------------------------------
	requestResult := InvoiceDAO.UnassignBillingRunFromInvoice(invoiceId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}


	//----------------------------------------------------------------------------
	// adds one or more feesIds as a Fees to a Invoice
	//----------------------------------------------------------------------------
func AddFeesToInvoice(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	invoiceId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	feesIds,_ := vars["feesIds"]

	//----------------------------------------------------------------------------
	// Delegate to the Invoice DAO
	//----------------------------------------------------------------------------
	requestResult := InvoiceDAO.AddFeesToInvoice(invoiceId, feesIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more feesIds as a Fees from a Invoice
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func RemoveFeesFromInvoice(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	invoiceId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	feesIds,_ := vars["feesIds"]

	//----------------------------------------------------------------------------
	// Delegate to the Invoice DAO
	//----------------------------------------------------------------------------
	requestResult := InvoiceDAO.RemoveFeesFromInvoice(invoiceId, feesIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
