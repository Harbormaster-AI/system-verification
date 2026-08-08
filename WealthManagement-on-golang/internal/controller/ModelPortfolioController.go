package controller

import (
    ModelPortfolioDAO "WealthManagement-on-golang/internal/dao"
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"net/http"
	"strconv"
)

//----------------------------------------------------------------------------
// Create controller, delegates to ModelPortfolioDAO for database creation
//----------------------------------------------------------------------------
func CreateModelPortfolio(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty ModelPortfolio model
	//----------------------------------------------------------------------------
	data := model.ModelPortfolio{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a ModelPortfolio model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the ModelPortfolio data access object to create
	//----------------------------------------------------------------------------
	requestResult := ModelPortfolioDAO.CreateModelPortfolio( data )
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Get controller, delegates to ModelPortfolioDAO to find the relevant ModelPortfolio
//----------------------------------------------------------------------------
func GetModelPortfolio(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the ModelPortfolio data access object
	// find the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := ModelPortfolioDAO.GetModelPortfolio(ID)
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}


//----------------------------------------------------------------------------
// GetAll controller, delegates to ModelPortfolioDAO for database read of all ModelPortfolios
//----------------------------------------------------------------------------
func GetAllModelPortfolio(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Delegate to the ModelPortfolio data access object to get all
	//----------------------------------------------------------------------------
	requestResult := ModelPortfolioDAO.GetAllModelPortfolio()
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Update controller, delegates to ModelPortfolioDAO for database save
//----------------------------------------------------------------------------
func UpdateModelPortfolio(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty ModelPortfolio model
	//----------------------------------------------------------------------------
	var data = model.ModelPortfolio{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a ModelPortfolio model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the ModelPortfolio data access object
	// update the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := ModelPortfolioDAO.UpdateModelPortfolio(data)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Delete controller, delegates to ModelPortfolioDAO for database deletion
//----------------------------------------------------------------------------
func DeleteModelPortfolio(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the ModelPortfolio data access object
	// delete the one with the matching identifier
	//----------------------------------------------------------------------------	
	requestResult := ModelPortfolioDAO.DeleteModelPortfolio(ID)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}


	//----------------------------------------------------------------------------
	// adds one or more allocationsIds as a Allocations to a ModelPortfolio
	//----------------------------------------------------------------------------
func AddAllocationsToModelPortfolio(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	modelPortfolioId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	allocationsIds,_ := vars["allocationsIds"]

	//----------------------------------------------------------------------------
	// Delegate to the ModelPortfolio DAO
	//----------------------------------------------------------------------------
	requestResult := ModelPortfolioDAO.AddAllocationsToModelPortfolio(modelPortfolioId, allocationsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more allocationsIds as a Allocations from a ModelPortfolio
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func RemoveAllocationsFromModelPortfolio(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	modelPortfolioId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	allocationsIds,_ := vars["allocationsIds"]

	//----------------------------------------------------------------------------
	// Delegate to the ModelPortfolio DAO
	//----------------------------------------------------------------------------
	requestResult := ModelPortfolioDAO.RemoveAllocationsFromModelPortfolio(modelPortfolioId, allocationsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
	//----------------------------------------------------------------------------
	// adds one or more portfoliosIds as a Portfolios to a ModelPortfolio
	//----------------------------------------------------------------------------
func AddPortfoliosToModelPortfolio(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	modelPortfolioId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	portfoliosIds,_ := vars["portfoliosIds"]

	//----------------------------------------------------------------------------
	// Delegate to the ModelPortfolio DAO
	//----------------------------------------------------------------------------
	requestResult := ModelPortfolioDAO.AddPortfoliosToModelPortfolio(modelPortfolioId, portfoliosIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more portfoliosIds as a Portfolios from a ModelPortfolio
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func RemovePortfoliosFromModelPortfolio(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	modelPortfolioId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	portfoliosIds,_ := vars["portfoliosIds"]

	//----------------------------------------------------------------------------
	// Delegate to the ModelPortfolio DAO
	//----------------------------------------------------------------------------
	requestResult := ModelPortfolioDAO.RemovePortfoliosFromModelPortfolio(modelPortfolioId, portfoliosIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
