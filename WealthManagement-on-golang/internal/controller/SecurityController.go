package controller

import (
    SecurityDAO "WealthManagement-on-golang/internal/dao"
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"net/http"
	"strconv"
)

//----------------------------------------------------------------------------
// Create controller, delegates to SecurityDAO for database creation
//----------------------------------------------------------------------------
func CreateSecurity(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty Security model
	//----------------------------------------------------------------------------
	data := model.Security{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a Security model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the Security data access object to create
	//----------------------------------------------------------------------------
	requestResult := SecurityDAO.CreateSecurity( data )
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Get controller, delegates to SecurityDAO to find the relevant Security
//----------------------------------------------------------------------------
func GetSecurity(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the Security data access object
	// find the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := SecurityDAO.GetSecurity(ID)
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}


//----------------------------------------------------------------------------
// GetAll controller, delegates to SecurityDAO for database read of all Securitys
//----------------------------------------------------------------------------
func GetAllSecurity(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Delegate to the Security data access object to get all
	//----------------------------------------------------------------------------
	requestResult := SecurityDAO.GetAllSecurity()
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Update controller, delegates to SecurityDAO for database save
//----------------------------------------------------------------------------
func UpdateSecurity(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty Security model
	//----------------------------------------------------------------------------
	var data = model.Security{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a Security model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the Security data access object
	// update the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := SecurityDAO.UpdateSecurity(data)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Delete controller, delegates to SecurityDAO for database deletion
//----------------------------------------------------------------------------
func DeleteSecurity(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the Security data access object
	// delete the one with the matching identifier
	//----------------------------------------------------------------------------	
	requestResult := SecurityDAO.DeleteSecurity(ID)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}


	//----------------------------------------------------------------------------
	// adds one or more corporateActionsIds as a CorporateActions to a Security
	//----------------------------------------------------------------------------
func AddCorporateActionsToSecurity(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	securityId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	corporateActionsIds,_ := vars["corporateActionsIds"]

	//----------------------------------------------------------------------------
	// Delegate to the Security DAO
	//----------------------------------------------------------------------------
	requestResult := SecurityDAO.AddCorporateActionsToSecurity(securityId, corporateActionsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more corporateActionsIds as a CorporateActions from a Security
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func RemoveCorporateActionsFromSecurity(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	securityId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	corporateActionsIds,_ := vars["corporateActionsIds"]

	//----------------------------------------------------------------------------
	// Delegate to the Security DAO
	//----------------------------------------------------------------------------
	requestResult := SecurityDAO.RemoveCorporateActionsFromSecurity(securityId, corporateActionsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
	//----------------------------------------------------------------------------
	// adds one or more pricesIds as a Prices to a Security
	//----------------------------------------------------------------------------
func AddPricesToSecurity(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	securityId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	pricesIds,_ := vars["pricesIds"]

	//----------------------------------------------------------------------------
	// Delegate to the Security DAO
	//----------------------------------------------------------------------------
	requestResult := SecurityDAO.AddPricesToSecurity(securityId, pricesIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more pricesIds as a Prices from a Security
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func RemovePricesFromSecurity(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	securityId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	pricesIds,_ := vars["pricesIds"]

	//----------------------------------------------------------------------------
	// Delegate to the Security DAO
	//----------------------------------------------------------------------------
	requestResult := SecurityDAO.RemovePricesFromSecurity(securityId, pricesIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
	//----------------------------------------------------------------------------
	// adds one or more benchmarksIds as a Benchmarks to a Security
	//----------------------------------------------------------------------------
func AddBenchmarksToSecurity(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	securityId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	benchmarksIds,_ := vars["benchmarksIds"]

	//----------------------------------------------------------------------------
	// Delegate to the Security DAO
	//----------------------------------------------------------------------------
	requestResult := SecurityDAO.AddBenchmarksToSecurity(securityId, benchmarksIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more benchmarksIds as a Benchmarks from a Security
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func RemoveBenchmarksFromSecurity(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	securityId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	benchmarksIds,_ := vars["benchmarksIds"]

	//----------------------------------------------------------------------------
	// Delegate to the Security DAO
	//----------------------------------------------------------------------------
	requestResult := SecurityDAO.RemoveBenchmarksFromSecurity(securityId, benchmarksIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
