package controller

import (
    PerformanceReportDAO "WealthManagement-on-golang/internal/dao"
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"net/http"
	"strconv"
)

//----------------------------------------------------------------------------
// Create controller, delegates to PerformanceReportDAO for database creation
//----------------------------------------------------------------------------
func CreatePerformanceReport(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty PerformanceReport model
	//----------------------------------------------------------------------------
	data := model.PerformanceReport{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a PerformanceReport model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the PerformanceReport data access object to create
	//----------------------------------------------------------------------------
	requestResult := PerformanceReportDAO.CreatePerformanceReport( data )
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Get controller, delegates to PerformanceReportDAO to find the relevant PerformanceReport
//----------------------------------------------------------------------------
func GetPerformanceReport(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the PerformanceReport data access object
	// find the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := PerformanceReportDAO.GetPerformanceReport(ID)
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}


//----------------------------------------------------------------------------
// GetAll controller, delegates to PerformanceReportDAO for database read of all PerformanceReports
//----------------------------------------------------------------------------
func GetAllPerformanceReport(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Delegate to the PerformanceReport data access object to get all
	//----------------------------------------------------------------------------
	requestResult := PerformanceReportDAO.GetAllPerformanceReport()
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Update controller, delegates to PerformanceReportDAO for database save
//----------------------------------------------------------------------------
func UpdatePerformanceReport(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty PerformanceReport model
	//----------------------------------------------------------------------------
	var data = model.PerformanceReport{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a PerformanceReport model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the PerformanceReport data access object
	// update the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := PerformanceReportDAO.UpdatePerformanceReport(data)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Delete controller, delegates to PerformanceReportDAO for database deletion
//----------------------------------------------------------------------------
func DeletePerformanceReport(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the PerformanceReport data access object
	// delete the one with the matching identifier
	//----------------------------------------------------------------------------	
	requestResult := PerformanceReportDAO.DeletePerformanceReport(ID)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// assigns a Portfolio on a PerformanceReport
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func AssignPortfolioToPerformanceReport(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	performanceReportId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	portfolioId,_ := strconv.ParseUint( vars["portfolioId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the PerformanceReport DAO
	//----------------------------------------------------------------------------
	requestResult := PerformanceReportDAO.AssignPortfolioToPerformanceReport(performanceReportId, portfolioId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a Portfolio on a PerformanceReport
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func UnassignPortfolioFromPerformanceReport( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	performanceReportId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the PerformanceReport DAO
	//----------------------------------------------------------------------------
	requestResult := PerformanceReportDAO.UnassignPortfolioFromPerformanceReport(performanceReportId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}

	//----------------------------------------------------------------------------
	// assigns a Benchmark on a PerformanceReport
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func AssignBenchmarkToPerformanceReport(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	performanceReportId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	benchmarkId,_ := strconv.ParseUint( vars["benchmarkId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the PerformanceReport DAO
	//----------------------------------------------------------------------------
	requestResult := PerformanceReportDAO.AssignBenchmarkToPerformanceReport(performanceReportId, benchmarkId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a Benchmark on a PerformanceReport
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func UnassignBenchmarkFromPerformanceReport( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	performanceReportId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the PerformanceReport DAO
	//----------------------------------------------------------------------------
	requestResult := PerformanceReportDAO.UnassignBenchmarkFromPerformanceReport(performanceReportId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}


