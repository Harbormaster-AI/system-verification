package controller

import (
    TaxLotDAO "WealthManagement-on-golang/internal/dao"
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"net/http"
	"strconv"
)

//----------------------------------------------------------------------------
// Create controller, delegates to TaxLotDAO for database creation
//----------------------------------------------------------------------------
func CreateTaxLot(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty TaxLot model
	//----------------------------------------------------------------------------
	data := model.TaxLot{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a TaxLot model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the TaxLot data access object to create
	//----------------------------------------------------------------------------
	requestResult := TaxLotDAO.CreateTaxLot( data )
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Get controller, delegates to TaxLotDAO to find the relevant TaxLot
//----------------------------------------------------------------------------
func GetTaxLot(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the TaxLot data access object
	// find the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := TaxLotDAO.GetTaxLot(ID)
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}


//----------------------------------------------------------------------------
// GetAll controller, delegates to TaxLotDAO for database read of all TaxLots
//----------------------------------------------------------------------------
func GetAllTaxLot(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Delegate to the TaxLot data access object to get all
	//----------------------------------------------------------------------------
	requestResult := TaxLotDAO.GetAllTaxLot()
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Update controller, delegates to TaxLotDAO for database save
//----------------------------------------------------------------------------
func UpdateTaxLot(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty TaxLot model
	//----------------------------------------------------------------------------
	var data = model.TaxLot{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a TaxLot model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the TaxLot data access object
	// update the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := TaxLotDAO.UpdateTaxLot(data)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Delete controller, delegates to TaxLotDAO for database deletion
//----------------------------------------------------------------------------
func DeleteTaxLot(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the TaxLot data access object
	// delete the one with the matching identifier
	//----------------------------------------------------------------------------	
	requestResult := TaxLotDAO.DeleteTaxLot(ID)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// assigns a Position on a TaxLot
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func AssignPositionToTaxLot(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	taxLotId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	positionId,_ := strconv.ParseUint( vars["positionId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the TaxLot DAO
	//----------------------------------------------------------------------------
	requestResult := TaxLotDAO.AssignPositionToTaxLot(taxLotId, positionId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a Position on a TaxLot
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func UnassignPositionFromTaxLot( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	taxLotId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the TaxLot DAO
	//----------------------------------------------------------------------------
	requestResult := TaxLotDAO.UnassignPositionFromTaxLot(taxLotId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}


