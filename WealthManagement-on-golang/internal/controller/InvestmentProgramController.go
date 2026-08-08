package controller

import (
    InvestmentProgramDAO "WealthManagement-on-golang/internal/dao"
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"net/http"
	"strconv"
)

//----------------------------------------------------------------------------
// Create controller, delegates to InvestmentProgramDAO for database creation
//----------------------------------------------------------------------------
func CreateInvestmentProgram(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty InvestmentProgram model
	//----------------------------------------------------------------------------
	data := model.InvestmentProgram{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a InvestmentProgram model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the InvestmentProgram data access object to create
	//----------------------------------------------------------------------------
	requestResult := InvestmentProgramDAO.CreateInvestmentProgram( data )
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Get controller, delegates to InvestmentProgramDAO to find the relevant InvestmentProgram
//----------------------------------------------------------------------------
func GetInvestmentProgram(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the InvestmentProgram data access object
	// find the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := InvestmentProgramDAO.GetInvestmentProgram(ID)
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}


//----------------------------------------------------------------------------
// GetAll controller, delegates to InvestmentProgramDAO for database read of all InvestmentPrograms
//----------------------------------------------------------------------------
func GetAllInvestmentProgram(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Delegate to the InvestmentProgram data access object to get all
	//----------------------------------------------------------------------------
	requestResult := InvestmentProgramDAO.GetAllInvestmentProgram()
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Update controller, delegates to InvestmentProgramDAO for database save
//----------------------------------------------------------------------------
func UpdateInvestmentProgram(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty InvestmentProgram model
	//----------------------------------------------------------------------------
	var data = model.InvestmentProgram{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a InvestmentProgram model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the InvestmentProgram data access object
	// update the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := InvestmentProgramDAO.UpdateInvestmentProgram(data)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Delete controller, delegates to InvestmentProgramDAO for database deletion
//----------------------------------------------------------------------------
func DeleteInvestmentProgram(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the InvestmentProgram data access object
	// delete the one with the matching identifier
	//----------------------------------------------------------------------------	
	requestResult := InvestmentProgramDAO.DeleteInvestmentProgram(ID)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}


	//----------------------------------------------------------------------------
	// adds one or more modelPortfoliosIds as a ModelPortfolios to a InvestmentProgram
	//----------------------------------------------------------------------------
func AddModelPortfoliosToInvestmentProgram(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	investmentProgramId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	modelPortfoliosIds,_ := vars["modelPortfoliosIds"]

	//----------------------------------------------------------------------------
	// Delegate to the InvestmentProgram DAO
	//----------------------------------------------------------------------------
	requestResult := InvestmentProgramDAO.AddModelPortfoliosToInvestmentProgram(investmentProgramId, modelPortfoliosIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more modelPortfoliosIds as a ModelPortfolios from a InvestmentProgram
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func RemoveModelPortfoliosFromInvestmentProgram(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	investmentProgramId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	modelPortfoliosIds,_ := vars["modelPortfoliosIds"]

	//----------------------------------------------------------------------------
	// Delegate to the InvestmentProgram DAO
	//----------------------------------------------------------------------------
	requestResult := InvestmentProgramDAO.RemoveModelPortfoliosFromInvestmentProgram(investmentProgramId, modelPortfoliosIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
	//----------------------------------------------------------------------------
	// adds one or more feeSchedulesIds as a FeeSchedules to a InvestmentProgram
	//----------------------------------------------------------------------------
func AddFeeSchedulesToInvestmentProgram(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	investmentProgramId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	feeSchedulesIds,_ := vars["feeSchedulesIds"]

	//----------------------------------------------------------------------------
	// Delegate to the InvestmentProgram DAO
	//----------------------------------------------------------------------------
	requestResult := InvestmentProgramDAO.AddFeeSchedulesToInvestmentProgram(investmentProgramId, feeSchedulesIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more feeSchedulesIds as a FeeSchedules from a InvestmentProgram
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func RemoveFeeSchedulesFromInvestmentProgram(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	investmentProgramId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	feeSchedulesIds,_ := vars["feeSchedulesIds"]

	//----------------------------------------------------------------------------
	// Delegate to the InvestmentProgram DAO
	//----------------------------------------------------------------------------
	requestResult := InvestmentProgramDAO.RemoveFeeSchedulesFromInvestmentProgram(investmentProgramId, feeSchedulesIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
