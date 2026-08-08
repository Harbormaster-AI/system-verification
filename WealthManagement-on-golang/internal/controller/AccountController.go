package controller

import (
    AccountDAO "WealthManagement-on-golang/internal/dao"
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"net/http"
	"strconv"
)

//----------------------------------------------------------------------------
// Create controller, delegates to AccountDAO for database creation
//----------------------------------------------------------------------------
func CreateAccount(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty Account model
	//----------------------------------------------------------------------------
	data := model.Account{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a Account model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the Account data access object to create
	//----------------------------------------------------------------------------
	requestResult := AccountDAO.CreateAccount( data )
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Get controller, delegates to AccountDAO to find the relevant Account
//----------------------------------------------------------------------------
func GetAccount(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the Account data access object
	// find the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := AccountDAO.GetAccount(ID)
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}


//----------------------------------------------------------------------------
// GetAll controller, delegates to AccountDAO for database read of all Accounts
//----------------------------------------------------------------------------
func GetAllAccount(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Delegate to the Account data access object to get all
	//----------------------------------------------------------------------------
	requestResult := AccountDAO.GetAllAccount()
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Update controller, delegates to AccountDAO for database save
//----------------------------------------------------------------------------
func UpdateAccount(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty Account model
	//----------------------------------------------------------------------------
	var data = model.Account{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a Account model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the Account data access object
	// update the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := AccountDAO.UpdateAccount(data)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Delete controller, delegates to AccountDAO for database deletion
//----------------------------------------------------------------------------
func DeleteAccount(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the Account data access object
	// delete the one with the matching identifier
	//----------------------------------------------------------------------------	
	requestResult := AccountDAO.DeleteAccount(ID)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// assigns a Household on a Account
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func AssignHouseholdToAccount(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	accountId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	householdId,_ := strconv.ParseUint( vars["householdId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Account DAO
	//----------------------------------------------------------------------------
	requestResult := AccountDAO.AssignHouseholdToAccount(accountId, householdId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a Household on a Account
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func UnassignHouseholdFromAccount( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	accountId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Account DAO
	//----------------------------------------------------------------------------
	requestResult := AccountDAO.UnassignHouseholdFromAccount(accountId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}

	//----------------------------------------------------------------------------
	// assigns a Advisor on a Account
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func AssignAdvisorToAccount(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	accountId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	advisorId,_ := strconv.ParseUint( vars["advisorId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Account DAO
	//----------------------------------------------------------------------------
	requestResult := AccountDAO.AssignAdvisorToAccount(accountId, advisorId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a Advisor on a Account
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func UnassignAdvisorFromAccount( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	accountId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Account DAO
	//----------------------------------------------------------------------------
	requestResult := AccountDAO.UnassignAdvisorFromAccount(accountId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}

	//----------------------------------------------------------------------------
	// assigns a Custodian on a Account
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func AssignCustodianToAccount(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	accountId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	custodianId,_ := strconv.ParseUint( vars["custodianId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Account DAO
	//----------------------------------------------------------------------------
	requestResult := AccountDAO.AssignCustodianToAccount(accountId, custodianId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a Custodian on a Account
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func UnassignCustodianFromAccount( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	accountId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Account DAO
	//----------------------------------------------------------------------------
	requestResult := AccountDAO.UnassignCustodianFromAccount(accountId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}

	//----------------------------------------------------------------------------
	// assigns a Portfolio on a Account
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func AssignPortfolioToAccount(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	accountId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	portfolioId,_ := strconv.ParseUint( vars["portfolioId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Account DAO
	//----------------------------------------------------------------------------
	requestResult := AccountDAO.AssignPortfolioToAccount(accountId, portfolioId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a Portfolio on a Account
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func UnassignPortfolioFromAccount( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	accountId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Account DAO
	//----------------------------------------------------------------------------
	requestResult := AccountDAO.UnassignPortfolioFromAccount(accountId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}


	//----------------------------------------------------------------------------
	// adds one or more beneficiariesIds as a Beneficiaries to a Account
	//----------------------------------------------------------------------------
func AddBeneficiariesToAccount(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	accountId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	beneficiariesIds,_ := vars["beneficiariesIds"]

	//----------------------------------------------------------------------------
	// Delegate to the Account DAO
	//----------------------------------------------------------------------------
	requestResult := AccountDAO.AddBeneficiariesToAccount(accountId, beneficiariesIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more beneficiariesIds as a Beneficiaries from a Account
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func RemoveBeneficiariesFromAccount(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	accountId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	beneficiariesIds,_ := vars["beneficiariesIds"]

	//----------------------------------------------------------------------------
	// Delegate to the Account DAO
	//----------------------------------------------------------------------------
	requestResult := AccountDAO.RemoveBeneficiariesFromAccount(accountId, beneficiariesIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
	//----------------------------------------------------------------------------
	// adds one or more positionsIds as a Positions to a Account
	//----------------------------------------------------------------------------
func AddPositionsToAccount(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	accountId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	positionsIds,_ := vars["positionsIds"]

	//----------------------------------------------------------------------------
	// Delegate to the Account DAO
	//----------------------------------------------------------------------------
	requestResult := AccountDAO.AddPositionsToAccount(accountId, positionsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more positionsIds as a Positions from a Account
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func RemovePositionsFromAccount(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	accountId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	positionsIds,_ := vars["positionsIds"]

	//----------------------------------------------------------------------------
	// Delegate to the Account DAO
	//----------------------------------------------------------------------------
	requestResult := AccountDAO.RemovePositionsFromAccount(accountId, positionsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
	//----------------------------------------------------------------------------
	// adds one or more transactionsIds as a Transactions to a Account
	//----------------------------------------------------------------------------
func AddTransactionsToAccount(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	accountId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	transactionsIds,_ := vars["transactionsIds"]

	//----------------------------------------------------------------------------
	// Delegate to the Account DAO
	//----------------------------------------------------------------------------
	requestResult := AccountDAO.AddTransactionsToAccount(accountId, transactionsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more transactionsIds as a Transactions from a Account
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func RemoveTransactionsFromAccount(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	accountId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	transactionsIds,_ := vars["transactionsIds"]

	//----------------------------------------------------------------------------
	// Delegate to the Account DAO
	//----------------------------------------------------------------------------
	requestResult := AccountDAO.RemoveTransactionsFromAccount(accountId, transactionsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
	//----------------------------------------------------------------------------
	// adds one or more feesIds as a Fees to a Account
	//----------------------------------------------------------------------------
func AddFeesToAccount(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	accountId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	feesIds,_ := vars["feesIds"]

	//----------------------------------------------------------------------------
	// Delegate to the Account DAO
	//----------------------------------------------------------------------------
	requestResult := AccountDAO.AddFeesToAccount(accountId, feesIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more feesIds as a Fees from a Account
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func RemoveFeesFromAccount(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	accountId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	feesIds,_ := vars["feesIds"]

	//----------------------------------------------------------------------------
	// Delegate to the Account DAO
	//----------------------------------------------------------------------------
	requestResult := AccountDAO.RemoveFeesFromAccount(accountId, feesIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
	//----------------------------------------------------------------------------
	// adds one or more standingInstructionsIds as a StandingInstructions to a Account
	//----------------------------------------------------------------------------
func AddStandingInstructionsToAccount(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	accountId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	standingInstructionsIds,_ := vars["standingInstructionsIds"]

	//----------------------------------------------------------------------------
	// Delegate to the Account DAO
	//----------------------------------------------------------------------------
	requestResult := AccountDAO.AddStandingInstructionsToAccount(accountId, standingInstructionsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more standingInstructionsIds as a StandingInstructions from a Account
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func RemoveStandingInstructionsFromAccount(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	accountId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	standingInstructionsIds,_ := vars["standingInstructionsIds"]

	//----------------------------------------------------------------------------
	// Delegate to the Account DAO
	//----------------------------------------------------------------------------
	requestResult := AccountDAO.RemoveStandingInstructionsFromAccount(accountId, standingInstructionsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
	//----------------------------------------------------------------------------
	// adds one or more invoicesIds as a Invoices to a Account
	//----------------------------------------------------------------------------
func AddInvoicesToAccount(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	accountId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	invoicesIds,_ := vars["invoicesIds"]

	//----------------------------------------------------------------------------
	// Delegate to the Account DAO
	//----------------------------------------------------------------------------
	requestResult := AccountDAO.AddInvoicesToAccount(accountId, invoicesIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more invoicesIds as a Invoices from a Account
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func RemoveInvoicesFromAccount(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	accountId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	invoicesIds,_ := vars["invoicesIds"]

	//----------------------------------------------------------------------------
	// Delegate to the Account DAO
	//----------------------------------------------------------------------------
	requestResult := AccountDAO.RemoveInvoicesFromAccount(accountId, invoicesIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
