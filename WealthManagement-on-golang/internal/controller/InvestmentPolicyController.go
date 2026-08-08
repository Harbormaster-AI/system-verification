package controller

import (
    InvestmentPolicyDAO "WealthManagement-on-golang/internal/dao"
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"net/http"
	"strconv"
)

//----------------------------------------------------------------------------
// Create controller, delegates to InvestmentPolicyDAO for database creation
//----------------------------------------------------------------------------
func CreateInvestmentPolicy(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty InvestmentPolicy model
	//----------------------------------------------------------------------------
	data := model.InvestmentPolicy{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a InvestmentPolicy model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the InvestmentPolicy data access object to create
	//----------------------------------------------------------------------------
	requestResult := InvestmentPolicyDAO.CreateInvestmentPolicy( data )
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Get controller, delegates to InvestmentPolicyDAO to find the relevant InvestmentPolicy
//----------------------------------------------------------------------------
func GetInvestmentPolicy(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the InvestmentPolicy data access object
	// find the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := InvestmentPolicyDAO.GetInvestmentPolicy(ID)
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}


//----------------------------------------------------------------------------
// GetAll controller, delegates to InvestmentPolicyDAO for database read of all InvestmentPolicys
//----------------------------------------------------------------------------
func GetAllInvestmentPolicy(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Delegate to the InvestmentPolicy data access object to get all
	//----------------------------------------------------------------------------
	requestResult := InvestmentPolicyDAO.GetAllInvestmentPolicy()
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Update controller, delegates to InvestmentPolicyDAO for database save
//----------------------------------------------------------------------------
func UpdateInvestmentPolicy(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty InvestmentPolicy model
	//----------------------------------------------------------------------------
	var data = model.InvestmentPolicy{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a InvestmentPolicy model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the InvestmentPolicy data access object
	// update the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := InvestmentPolicyDAO.UpdateInvestmentPolicy(data)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Delete controller, delegates to InvestmentPolicyDAO for database deletion
//----------------------------------------------------------------------------
func DeleteInvestmentPolicy(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the InvestmentPolicy data access object
	// delete the one with the matching identifier
	//----------------------------------------------------------------------------	
	requestResult := InvestmentPolicyDAO.DeleteInvestmentPolicy(ID)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// assigns a Portfolio on a InvestmentPolicy
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func AssignPortfolioToInvestmentPolicy(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	investmentPolicyId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	portfolioId,_ := strconv.ParseUint( vars["portfolioId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the InvestmentPolicy DAO
	//----------------------------------------------------------------------------
	requestResult := InvestmentPolicyDAO.AssignPortfolioToInvestmentPolicy(investmentPolicyId, portfolioId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a Portfolio on a InvestmentPolicy
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func UnassignPortfolioFromInvestmentPolicy( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	investmentPolicyId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the InvestmentPolicy DAO
	//----------------------------------------------------------------------------
	requestResult := InvestmentPolicyDAO.UnassignPortfolioFromInvestmentPolicy(investmentPolicyId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}

	//----------------------------------------------------------------------------
	// assigns a RiskAssessment on a InvestmentPolicy
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func AssignRiskAssessmentToInvestmentPolicy(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	investmentPolicyId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	riskAssessmentId,_ := strconv.ParseUint( vars["riskAssessmentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the InvestmentPolicy DAO
	//----------------------------------------------------------------------------
	requestResult := InvestmentPolicyDAO.AssignRiskAssessmentToInvestmentPolicy(investmentPolicyId, riskAssessmentId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a RiskAssessment on a InvestmentPolicy
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func UnassignRiskAssessmentFromInvestmentPolicy( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	investmentPolicyId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the InvestmentPolicy DAO
	//----------------------------------------------------------------------------
	requestResult := InvestmentPolicyDAO.UnassignRiskAssessmentFromInvestmentPolicy(investmentPolicyId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}


	//----------------------------------------------------------------------------
	// adds one or more goalsIds as a Goals to a InvestmentPolicy
	//----------------------------------------------------------------------------
func AddGoalsToInvestmentPolicy(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	investmentPolicyId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	goalsIds,_ := vars["goalsIds"]

	//----------------------------------------------------------------------------
	// Delegate to the InvestmentPolicy DAO
	//----------------------------------------------------------------------------
	requestResult := InvestmentPolicyDAO.AddGoalsToInvestmentPolicy(investmentPolicyId, goalsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more goalsIds as a Goals from a InvestmentPolicy
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func RemoveGoalsFromInvestmentPolicy(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	investmentPolicyId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	goalsIds,_ := vars["goalsIds"]

	//----------------------------------------------------------------------------
	// Delegate to the InvestmentPolicy DAO
	//----------------------------------------------------------------------------
	requestResult := InvestmentPolicyDAO.RemoveGoalsFromInvestmentPolicy(investmentPolicyId, goalsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
