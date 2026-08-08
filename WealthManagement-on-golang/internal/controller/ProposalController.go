package controller

import (
    ProposalDAO "WealthManagement-on-golang/internal/dao"
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"net/http"
	"strconv"
)

//----------------------------------------------------------------------------
// Create controller, delegates to ProposalDAO for database creation
//----------------------------------------------------------------------------
func CreateProposal(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty Proposal model
	//----------------------------------------------------------------------------
	data := model.Proposal{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a Proposal model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the Proposal data access object to create
	//----------------------------------------------------------------------------
	requestResult := ProposalDAO.CreateProposal( data )
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Get controller, delegates to ProposalDAO to find the relevant Proposal
//----------------------------------------------------------------------------
func GetProposal(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the Proposal data access object
	// find the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := ProposalDAO.GetProposal(ID)
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}


//----------------------------------------------------------------------------
// GetAll controller, delegates to ProposalDAO for database read of all Proposals
//----------------------------------------------------------------------------
func GetAllProposal(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Delegate to the Proposal data access object to get all
	//----------------------------------------------------------------------------
	requestResult := ProposalDAO.GetAllProposal()
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Update controller, delegates to ProposalDAO for database save
//----------------------------------------------------------------------------
func UpdateProposal(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty Proposal model
	//----------------------------------------------------------------------------
	var data = model.Proposal{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a Proposal model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the Proposal data access object
	// update the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := ProposalDAO.UpdateProposal(data)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Delete controller, delegates to ProposalDAO for database deletion
//----------------------------------------------------------------------------
func DeleteProposal(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the Proposal data access object
	// delete the one with the matching identifier
	//----------------------------------------------------------------------------	
	requestResult := ProposalDAO.DeleteProposal(ID)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// assigns a Household on a Proposal
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func AssignHouseholdToProposal(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	proposalId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	householdId,_ := strconv.ParseUint( vars["householdId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Proposal DAO
	//----------------------------------------------------------------------------
	requestResult := ProposalDAO.AssignHouseholdToProposal(proposalId, householdId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a Household on a Proposal
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func UnassignHouseholdFromProposal( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	proposalId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Proposal DAO
	//----------------------------------------------------------------------------
	requestResult := ProposalDAO.UnassignHouseholdFromProposal(proposalId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}

	//----------------------------------------------------------------------------
	// assigns a Advisor on a Proposal
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func AssignAdvisorToProposal(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	proposalId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	advisorId,_ := strconv.ParseUint( vars["advisorId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Proposal DAO
	//----------------------------------------------------------------------------
	requestResult := ProposalDAO.AssignAdvisorToProposal(proposalId, advisorId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a Advisor on a Proposal
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func UnassignAdvisorFromProposal( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	proposalId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Proposal DAO
	//----------------------------------------------------------------------------
	requestResult := ProposalDAO.UnassignAdvisorFromProposal(proposalId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}

	//----------------------------------------------------------------------------
	// assigns a ModelPortfolio on a Proposal
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func AssignModelPortfolioToProposal(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	proposalId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	modelPortfolioId,_ := strconv.ParseUint( vars["modelPortfolioId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Proposal DAO
	//----------------------------------------------------------------------------
	requestResult := ProposalDAO.AssignModelPortfolioToProposal(proposalId, modelPortfolioId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a ModelPortfolio on a Proposal
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func UnassignModelPortfolioFromProposal( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	proposalId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Proposal DAO
	//----------------------------------------------------------------------------
	requestResult := ProposalDAO.UnassignModelPortfolioFromProposal(proposalId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}

	//----------------------------------------------------------------------------
	// assigns a Account on a Proposal
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func AssignAccountToProposal(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	proposalId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	accountId,_ := strconv.ParseUint( vars["accountId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Proposal DAO
	//----------------------------------------------------------------------------
	requestResult := ProposalDAO.AssignAccountToProposal(proposalId, accountId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a Account on a Proposal
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func UnassignAccountFromProposal( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	proposalId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Proposal DAO
	//----------------------------------------------------------------------------
	requestResult := ProposalDAO.UnassignAccountFromProposal(proposalId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}


