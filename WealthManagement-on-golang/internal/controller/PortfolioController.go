package controller

import (
    PortfolioDAO "WealthManagement-on-golang/internal/dao"
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"net/http"
	"strconv"
)

//----------------------------------------------------------------------------
// Create controller, delegates to PortfolioDAO for database creation
//----------------------------------------------------------------------------
func CreatePortfolio(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty Portfolio model
	//----------------------------------------------------------------------------
	data := model.Portfolio{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a Portfolio model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the Portfolio data access object to create
	//----------------------------------------------------------------------------
	requestResult := PortfolioDAO.CreatePortfolio( data )
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Get controller, delegates to PortfolioDAO to find the relevant Portfolio
//----------------------------------------------------------------------------
func GetPortfolio(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the Portfolio data access object
	// find the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := PortfolioDAO.GetPortfolio(ID)
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}


//----------------------------------------------------------------------------
// GetAll controller, delegates to PortfolioDAO for database read of all Portfolios
//----------------------------------------------------------------------------
func GetAllPortfolio(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Delegate to the Portfolio data access object to get all
	//----------------------------------------------------------------------------
	requestResult := PortfolioDAO.GetAllPortfolio()
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Update controller, delegates to PortfolioDAO for database save
//----------------------------------------------------------------------------
func UpdatePortfolio(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty Portfolio model
	//----------------------------------------------------------------------------
	var data = model.Portfolio{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a Portfolio model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the Portfolio data access object
	// update the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := PortfolioDAO.UpdatePortfolio(data)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Delete controller, delegates to PortfolioDAO for database deletion
//----------------------------------------------------------------------------
func DeletePortfolio(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the Portfolio data access object
	// delete the one with the matching identifier
	//----------------------------------------------------------------------------	
	requestResult := PortfolioDAO.DeletePortfolio(ID)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// assigns a Account on a Portfolio
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func AssignAccountToPortfolio(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	portfolioId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	accountId,_ := strconv.ParseUint( vars["accountId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Portfolio DAO
	//----------------------------------------------------------------------------
	requestResult := PortfolioDAO.AssignAccountToPortfolio(portfolioId, accountId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a Account on a Portfolio
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func UnassignAccountFromPortfolio( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	portfolioId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Portfolio DAO
	//----------------------------------------------------------------------------
	requestResult := PortfolioDAO.UnassignAccountFromPortfolio(portfolioId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}

	//----------------------------------------------------------------------------
	// assigns a ModelPortfolio on a Portfolio
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func AssignModelPortfolioToPortfolio(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	portfolioId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	modelPortfolioId,_ := strconv.ParseUint( vars["modelPortfolioId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Portfolio DAO
	//----------------------------------------------------------------------------
	requestResult := PortfolioDAO.AssignModelPortfolioToPortfolio(portfolioId, modelPortfolioId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a ModelPortfolio on a Portfolio
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func UnassignModelPortfolioFromPortfolio( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	portfolioId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Portfolio DAO
	//----------------------------------------------------------------------------
	requestResult := PortfolioDAO.UnassignModelPortfolioFromPortfolio(portfolioId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}

	//----------------------------------------------------------------------------
	// assigns a Benchmark on a Portfolio
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func AssignBenchmarkToPortfolio(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	portfolioId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	benchmarkId,_ := strconv.ParseUint( vars["benchmarkId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Portfolio DAO
	//----------------------------------------------------------------------------
	requestResult := PortfolioDAO.AssignBenchmarkToPortfolio(portfolioId, benchmarkId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a Benchmark on a Portfolio
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func UnassignBenchmarkFromPortfolio( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	portfolioId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Portfolio DAO
	//----------------------------------------------------------------------------
	requestResult := PortfolioDAO.UnassignBenchmarkFromPortfolio(portfolioId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}

	//----------------------------------------------------------------------------
	// assigns a InvestmentPolicy on a Portfolio
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func AssignInvestmentPolicyToPortfolio(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	portfolioId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	investmentPolicyId,_ := strconv.ParseUint( vars["investmentPolicyId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Portfolio DAO
	//----------------------------------------------------------------------------
	requestResult := PortfolioDAO.AssignInvestmentPolicyToPortfolio(portfolioId, investmentPolicyId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a InvestmentPolicy on a Portfolio
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func UnassignInvestmentPolicyFromPortfolio( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	portfolioId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Portfolio DAO
	//----------------------------------------------------------------------------
	requestResult := PortfolioDAO.UnassignInvestmentPolicyFromPortfolio(portfolioId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}


	//----------------------------------------------------------------------------
	// adds one or more positionsIds as a Positions to a Portfolio
	//----------------------------------------------------------------------------
func AddPositionsToPortfolio(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	portfolioId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	positionsIds,_ := vars["positionsIds"]

	//----------------------------------------------------------------------------
	// Delegate to the Portfolio DAO
	//----------------------------------------------------------------------------
	requestResult := PortfolioDAO.AddPositionsToPortfolio(portfolioId, positionsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more positionsIds as a Positions from a Portfolio
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func RemovePositionsFromPortfolio(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	portfolioId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	positionsIds,_ := vars["positionsIds"]

	//----------------------------------------------------------------------------
	// Delegate to the Portfolio DAO
	//----------------------------------------------------------------------------
	requestResult := PortfolioDAO.RemovePositionsFromPortfolio(portfolioId, positionsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
	//----------------------------------------------------------------------------
	// adds one or more performanceReportsIds as a PerformanceReports to a Portfolio
	//----------------------------------------------------------------------------
func AddPerformanceReportsToPortfolio(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	portfolioId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	performanceReportsIds,_ := vars["performanceReportsIds"]

	//----------------------------------------------------------------------------
	// Delegate to the Portfolio DAO
	//----------------------------------------------------------------------------
	requestResult := PortfolioDAO.AddPerformanceReportsToPortfolio(portfolioId, performanceReportsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more performanceReportsIds as a PerformanceReports from a Portfolio
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func RemovePerformanceReportsFromPortfolio(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	portfolioId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	performanceReportsIds,_ := vars["performanceReportsIds"]

	//----------------------------------------------------------------------------
	// Delegate to the Portfolio DAO
	//----------------------------------------------------------------------------
	requestResult := PortfolioDAO.RemovePerformanceReportsFromPortfolio(portfolioId, performanceReportsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
	//----------------------------------------------------------------------------
	// adds one or more rebalancePlansIds as a RebalancePlans to a Portfolio
	//----------------------------------------------------------------------------
func AddRebalancePlansToPortfolio(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	portfolioId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	rebalancePlansIds,_ := vars["rebalancePlansIds"]

	//----------------------------------------------------------------------------
	// Delegate to the Portfolio DAO
	//----------------------------------------------------------------------------
	requestResult := PortfolioDAO.AddRebalancePlansToPortfolio(portfolioId, rebalancePlansIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more rebalancePlansIds as a RebalancePlans from a Portfolio
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func RemoveRebalancePlansFromPortfolio(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	portfolioId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	rebalancePlansIds,_ := vars["rebalancePlansIds"]

	//----------------------------------------------------------------------------
	// Delegate to the Portfolio DAO
	//----------------------------------------------------------------------------
	requestResult := PortfolioDAO.RemoveRebalancePlansFromPortfolio(portfolioId, rebalancePlansIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
