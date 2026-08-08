package controller

import (
    WealthGoalDAO "WealthManagement-on-golang/internal/dao"
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"net/http"
	"strconv"
)

//----------------------------------------------------------------------------
// Create controller, delegates to WealthGoalDAO for database creation
//----------------------------------------------------------------------------
func CreateWealthGoal(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty WealthGoal model
	//----------------------------------------------------------------------------
	data := model.WealthGoal{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a WealthGoal model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the WealthGoal data access object to create
	//----------------------------------------------------------------------------
	requestResult := WealthGoalDAO.CreateWealthGoal( data )
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Get controller, delegates to WealthGoalDAO to find the relevant WealthGoal
//----------------------------------------------------------------------------
func GetWealthGoal(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the WealthGoal data access object
	// find the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := WealthGoalDAO.GetWealthGoal(ID)
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}


//----------------------------------------------------------------------------
// GetAll controller, delegates to WealthGoalDAO for database read of all WealthGoals
//----------------------------------------------------------------------------
func GetAllWealthGoal(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Delegate to the WealthGoal data access object to get all
	//----------------------------------------------------------------------------
	requestResult := WealthGoalDAO.GetAllWealthGoal()
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Update controller, delegates to WealthGoalDAO for database save
//----------------------------------------------------------------------------
func UpdateWealthGoal(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty WealthGoal model
	//----------------------------------------------------------------------------
	var data = model.WealthGoal{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a WealthGoal model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the WealthGoal data access object
	// update the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := WealthGoalDAO.UpdateWealthGoal(data)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Delete controller, delegates to WealthGoalDAO for database deletion
//----------------------------------------------------------------------------
func DeleteWealthGoal(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the WealthGoal data access object
	// delete the one with the matching identifier
	//----------------------------------------------------------------------------	
	requestResult := WealthGoalDAO.DeleteWealthGoal(ID)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// assigns a Household on a WealthGoal
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func AssignHouseholdToWealthGoal(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	wealthGoalId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	householdId,_ := strconv.ParseUint( vars["householdId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the WealthGoal DAO
	//----------------------------------------------------------------------------
	requestResult := WealthGoalDAO.AssignHouseholdToWealthGoal(wealthGoalId, householdId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a Household on a WealthGoal
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func UnassignHouseholdFromWealthGoal( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	wealthGoalId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the WealthGoal DAO
	//----------------------------------------------------------------------------
	requestResult := WealthGoalDAO.UnassignHouseholdFromWealthGoal(wealthGoalId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}

	//----------------------------------------------------------------------------
	// assigns a Portfolio on a WealthGoal
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func AssignPortfolioToWealthGoal(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	wealthGoalId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	portfolioId,_ := strconv.ParseUint( vars["portfolioId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the WealthGoal DAO
	//----------------------------------------------------------------------------
	requestResult := WealthGoalDAO.AssignPortfolioToWealthGoal(wealthGoalId, portfolioId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a Portfolio on a WealthGoal
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func UnassignPortfolioFromWealthGoal( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	wealthGoalId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the WealthGoal DAO
	//----------------------------------------------------------------------------
	requestResult := WealthGoalDAO.UnassignPortfolioFromWealthGoal(wealthGoalId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}

	//----------------------------------------------------------------------------
	// assigns a InvestmentPolicy on a WealthGoal
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func AssignInvestmentPolicyToWealthGoal(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	wealthGoalId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	investmentPolicyId,_ := strconv.ParseUint( vars["investmentPolicyId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the WealthGoal DAO
	//----------------------------------------------------------------------------
	requestResult := WealthGoalDAO.AssignInvestmentPolicyToWealthGoal(wealthGoalId, investmentPolicyId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a InvestmentPolicy on a WealthGoal
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func UnassignInvestmentPolicyFromWealthGoal( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	wealthGoalId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the WealthGoal DAO
	//----------------------------------------------------------------------------
	requestResult := WealthGoalDAO.UnassignInvestmentPolicyFromWealthGoal(wealthGoalId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}


