package controller

import (
    StandingInstructionDAO "WealthManagement-on-golang/internal/dao"
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"net/http"
	"strconv"
)

//----------------------------------------------------------------------------
// Create controller, delegates to StandingInstructionDAO for database creation
//----------------------------------------------------------------------------
func CreateStandingInstruction(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty StandingInstruction model
	//----------------------------------------------------------------------------
	data := model.StandingInstruction{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a StandingInstruction model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the StandingInstruction data access object to create
	//----------------------------------------------------------------------------
	requestResult := StandingInstructionDAO.CreateStandingInstruction( data )
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Get controller, delegates to StandingInstructionDAO to find the relevant StandingInstruction
//----------------------------------------------------------------------------
func GetStandingInstruction(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the StandingInstruction data access object
	// find the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := StandingInstructionDAO.GetStandingInstruction(ID)
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}


//----------------------------------------------------------------------------
// GetAll controller, delegates to StandingInstructionDAO for database read of all StandingInstructions
//----------------------------------------------------------------------------
func GetAllStandingInstruction(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Delegate to the StandingInstruction data access object to get all
	//----------------------------------------------------------------------------
	requestResult := StandingInstructionDAO.GetAllStandingInstruction()
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Update controller, delegates to StandingInstructionDAO for database save
//----------------------------------------------------------------------------
func UpdateStandingInstruction(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty StandingInstruction model
	//----------------------------------------------------------------------------
	var data = model.StandingInstruction{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a StandingInstruction model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the StandingInstruction data access object
	// update the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := StandingInstructionDAO.UpdateStandingInstruction(data)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Delete controller, delegates to StandingInstructionDAO for database deletion
//----------------------------------------------------------------------------
func DeleteStandingInstruction(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the StandingInstruction data access object
	// delete the one with the matching identifier
	//----------------------------------------------------------------------------	
	requestResult := StandingInstructionDAO.DeleteStandingInstruction(ID)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// assigns a Account on a StandingInstruction
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func AssignAccountToStandingInstruction(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	standingInstructionId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	accountId,_ := strconv.ParseUint( vars["accountId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the StandingInstruction DAO
	//----------------------------------------------------------------------------
	requestResult := StandingInstructionDAO.AssignAccountToStandingInstruction(standingInstructionId, accountId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a Account on a StandingInstruction
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func UnassignAccountFromStandingInstruction( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	standingInstructionId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the StandingInstruction DAO
	//----------------------------------------------------------------------------
	requestResult := StandingInstructionDAO.UnassignAccountFromStandingInstruction(standingInstructionId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}

	//----------------------------------------------------------------------------
	// assigns a DestinationAccount on a StandingInstruction
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func AssignDestinationAccountToStandingInstruction(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	standingInstructionId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	destinationAccountId,_ := strconv.ParseUint( vars["destinationAccountId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the StandingInstruction DAO
	//----------------------------------------------------------------------------
	requestResult := StandingInstructionDAO.AssignDestinationAccountToStandingInstruction(standingInstructionId, destinationAccountId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a DestinationAccount on a StandingInstruction
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func UnassignDestinationAccountFromStandingInstruction( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	standingInstructionId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the StandingInstruction DAO
	//----------------------------------------------------------------------------
	requestResult := StandingInstructionDAO.UnassignDestinationAccountFromStandingInstruction(standingInstructionId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}


