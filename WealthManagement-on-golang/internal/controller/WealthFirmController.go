package controller

import (
    WealthFirmDAO "WealthManagement-on-golang/internal/dao"
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"net/http"
	"strconv"
)

//----------------------------------------------------------------------------
// Create controller, delegates to WealthFirmDAO for database creation
//----------------------------------------------------------------------------
func CreateWealthFirm(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty WealthFirm model
	//----------------------------------------------------------------------------
	data := model.WealthFirm{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a WealthFirm model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the WealthFirm data access object to create
	//----------------------------------------------------------------------------
	requestResult := WealthFirmDAO.CreateWealthFirm( data )
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Get controller, delegates to WealthFirmDAO to find the relevant WealthFirm
//----------------------------------------------------------------------------
func GetWealthFirm(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the WealthFirm data access object
	// find the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := WealthFirmDAO.GetWealthFirm(ID)
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}


//----------------------------------------------------------------------------
// GetAll controller, delegates to WealthFirmDAO for database read of all WealthFirms
//----------------------------------------------------------------------------
func GetAllWealthFirm(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Delegate to the WealthFirm data access object to get all
	//----------------------------------------------------------------------------
	requestResult := WealthFirmDAO.GetAllWealthFirm()
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Update controller, delegates to WealthFirmDAO for database save
//----------------------------------------------------------------------------
func UpdateWealthFirm(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty WealthFirm model
	//----------------------------------------------------------------------------
	var data = model.WealthFirm{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a WealthFirm model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the WealthFirm data access object
	// update the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := WealthFirmDAO.UpdateWealthFirm(data)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Delete controller, delegates to WealthFirmDAO for database deletion
//----------------------------------------------------------------------------
func DeleteWealthFirm(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the WealthFirm data access object
	// delete the one with the matching identifier
	//----------------------------------------------------------------------------	
	requestResult := WealthFirmDAO.DeleteWealthFirm(ID)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}


	//----------------------------------------------------------------------------
	// adds one or more advisorsIds as a Advisors to a WealthFirm
	//----------------------------------------------------------------------------
func AddAdvisorsToWealthFirm(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	wealthFirmId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	advisorsIds,_ := vars["advisorsIds"]

	//----------------------------------------------------------------------------
	// Delegate to the WealthFirm DAO
	//----------------------------------------------------------------------------
	requestResult := WealthFirmDAO.AddAdvisorsToWealthFirm(wealthFirmId, advisorsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more advisorsIds as a Advisors from a WealthFirm
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func RemoveAdvisorsFromWealthFirm(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	wealthFirmId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	advisorsIds,_ := vars["advisorsIds"]

	//----------------------------------------------------------------------------
	// Delegate to the WealthFirm DAO
	//----------------------------------------------------------------------------
	requestResult := WealthFirmDAO.RemoveAdvisorsFromWealthFirm(wealthFirmId, advisorsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
	//----------------------------------------------------------------------------
	// adds one or more officesIds as a Offices to a WealthFirm
	//----------------------------------------------------------------------------
func AddOfficesToWealthFirm(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	wealthFirmId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	officesIds,_ := vars["officesIds"]

	//----------------------------------------------------------------------------
	// Delegate to the WealthFirm DAO
	//----------------------------------------------------------------------------
	requestResult := WealthFirmDAO.AddOfficesToWealthFirm(wealthFirmId, officesIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more officesIds as a Offices from a WealthFirm
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func RemoveOfficesFromWealthFirm(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	wealthFirmId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	officesIds,_ := vars["officesIds"]

	//----------------------------------------------------------------------------
	// Delegate to the WealthFirm DAO
	//----------------------------------------------------------------------------
	requestResult := WealthFirmDAO.RemoveOfficesFromWealthFirm(wealthFirmId, officesIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
	//----------------------------------------------------------------------------
	// adds one or more custodiansIds as a Custodians to a WealthFirm
	//----------------------------------------------------------------------------
func AddCustodiansToWealthFirm(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	wealthFirmId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	custodiansIds,_ := vars["custodiansIds"]

	//----------------------------------------------------------------------------
	// Delegate to the WealthFirm DAO
	//----------------------------------------------------------------------------
	requestResult := WealthFirmDAO.AddCustodiansToWealthFirm(wealthFirmId, custodiansIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more custodiansIds as a Custodians from a WealthFirm
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func RemoveCustodiansFromWealthFirm(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	wealthFirmId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	custodiansIds,_ := vars["custodiansIds"]

	//----------------------------------------------------------------------------
	// Delegate to the WealthFirm DAO
	//----------------------------------------------------------------------------
	requestResult := WealthFirmDAO.RemoveCustodiansFromWealthFirm(wealthFirmId, custodiansIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
	//----------------------------------------------------------------------------
	// adds one or more investmentProgramsIds as a InvestmentPrograms to a WealthFirm
	//----------------------------------------------------------------------------
func AddInvestmentProgramsToWealthFirm(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	wealthFirmId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	investmentProgramsIds,_ := vars["investmentProgramsIds"]

	//----------------------------------------------------------------------------
	// Delegate to the WealthFirm DAO
	//----------------------------------------------------------------------------
	requestResult := WealthFirmDAO.AddInvestmentProgramsToWealthFirm(wealthFirmId, investmentProgramsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more investmentProgramsIds as a InvestmentPrograms from a WealthFirm
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func RemoveInvestmentProgramsFromWealthFirm(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	wealthFirmId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	investmentProgramsIds,_ := vars["investmentProgramsIds"]

	//----------------------------------------------------------------------------
	// Delegate to the WealthFirm DAO
	//----------------------------------------------------------------------------
	requestResult := WealthFirmDAO.RemoveInvestmentProgramsFromWealthFirm(wealthFirmId, investmentProgramsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
