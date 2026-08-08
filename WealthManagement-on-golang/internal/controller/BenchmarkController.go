package controller

import (
    BenchmarkDAO "WealthManagement-on-golang/internal/dao"
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"net/http"
	"strconv"
)

//----------------------------------------------------------------------------
// Create controller, delegates to BenchmarkDAO for database creation
//----------------------------------------------------------------------------
func CreateBenchmark(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty Benchmark model
	//----------------------------------------------------------------------------
	data := model.Benchmark{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a Benchmark model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the Benchmark data access object to create
	//----------------------------------------------------------------------------
	requestResult := BenchmarkDAO.CreateBenchmark( data )
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Get controller, delegates to BenchmarkDAO to find the relevant Benchmark
//----------------------------------------------------------------------------
func GetBenchmark(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the Benchmark data access object
	// find the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := BenchmarkDAO.GetBenchmark(ID)
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}


//----------------------------------------------------------------------------
// GetAll controller, delegates to BenchmarkDAO for database read of all Benchmarks
//----------------------------------------------------------------------------
func GetAllBenchmark(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Delegate to the Benchmark data access object to get all
	//----------------------------------------------------------------------------
	requestResult := BenchmarkDAO.GetAllBenchmark()
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Update controller, delegates to BenchmarkDAO for database save
//----------------------------------------------------------------------------
func UpdateBenchmark(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty Benchmark model
	//----------------------------------------------------------------------------
	var data = model.Benchmark{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a Benchmark model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the Benchmark data access object
	// update the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := BenchmarkDAO.UpdateBenchmark(data)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Delete controller, delegates to BenchmarkDAO for database deletion
//----------------------------------------------------------------------------
func DeleteBenchmark(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the Benchmark data access object
	// delete the one with the matching identifier
	//----------------------------------------------------------------------------	
	requestResult := BenchmarkDAO.DeleteBenchmark(ID)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}


	//----------------------------------------------------------------------------
	// adds one or more performanceReportsIds as a PerformanceReports to a Benchmark
	//----------------------------------------------------------------------------
func AddPerformanceReportsToBenchmark(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	benchmarkId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	performanceReportsIds,_ := vars["performanceReportsIds"]

	//----------------------------------------------------------------------------
	// Delegate to the Benchmark DAO
	//----------------------------------------------------------------------------
	requestResult := BenchmarkDAO.AddPerformanceReportsToBenchmark(benchmarkId, performanceReportsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more performanceReportsIds as a PerformanceReports from a Benchmark
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func RemovePerformanceReportsFromBenchmark(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	benchmarkId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	performanceReportsIds,_ := vars["performanceReportsIds"]

	//----------------------------------------------------------------------------
	// Delegate to the Benchmark DAO
	//----------------------------------------------------------------------------
	requestResult := BenchmarkDAO.RemovePerformanceReportsFromBenchmark(benchmarkId, performanceReportsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
	//----------------------------------------------------------------------------
	// adds one or more constituentsIds as a Constituents to a Benchmark
	//----------------------------------------------------------------------------
func AddConstituentsToBenchmark(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	benchmarkId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	constituentsIds,_ := vars["constituentsIds"]

	//----------------------------------------------------------------------------
	// Delegate to the Benchmark DAO
	//----------------------------------------------------------------------------
	requestResult := BenchmarkDAO.AddConstituentsToBenchmark(benchmarkId, constituentsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more constituentsIds as a Constituents from a Benchmark
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func RemoveConstituentsFromBenchmark(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	benchmarkId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	constituentsIds,_ := vars["constituentsIds"]

	//----------------------------------------------------------------------------
	// Delegate to the Benchmark DAO
	//----------------------------------------------------------------------------
	requestResult := BenchmarkDAO.RemoveConstituentsFromBenchmark(benchmarkId, constituentsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
