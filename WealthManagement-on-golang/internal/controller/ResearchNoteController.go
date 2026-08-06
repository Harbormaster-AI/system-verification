package controller

import (
    ResearchNoteDAO "WealthManagement-on-golang/internal/dao"
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"net/http"
	"strconv"
)

//----------------------------------------------------------------------------
// Create controller, delegates to ResearchNoteDAO for database creation
//----------------------------------------------------------------------------
func CreateResearchNote(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty ResearchNote model
	//----------------------------------------------------------------------------
	data := model.ResearchNote{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a ResearchNote model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the ResearchNote data access object to create
	//----------------------------------------------------------------------------
	requestResult := ResearchNoteDAO.CreateResearchNote( data )
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Get controller, delegates to ResearchNoteDAO to find the relevant ResearchNote
//----------------------------------------------------------------------------
func GetResearchNote(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the ResearchNote data access object
	// find the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := ResearchNoteDAO.GetResearchNote(ID)
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}


//----------------------------------------------------------------------------
// GetAll controller, delegates to ResearchNoteDAO for database read of all ResearchNotes
//----------------------------------------------------------------------------
func GetAllResearchNote(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Delegate to the ResearchNote data access object to get all
	//----------------------------------------------------------------------------
	requestResult := ResearchNoteDAO.GetAllResearchNote()
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Update controller, delegates to ResearchNoteDAO for database save
//----------------------------------------------------------------------------
func UpdateResearchNote(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty ResearchNote model
	//----------------------------------------------------------------------------
	var data = model.ResearchNote{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a ResearchNote model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the ResearchNote data access object
	// update the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := ResearchNoteDAO.UpdateResearchNote(data)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Delete controller, delegates to ResearchNoteDAO for database deletion
//----------------------------------------------------------------------------
func DeleteResearchNote(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the ResearchNote data access object
	// delete the one with the matching identifier
	//----------------------------------------------------------------------------	
	requestResult := ResearchNoteDAO.DeleteResearchNote(ID)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// assigns a Security on a ResearchNote
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func AssignSecurityToResearchNote(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	researchNoteId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	securityId,_ := strconv.ParseUint( vars["securityId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the ResearchNote DAO
	//----------------------------------------------------------------------------
	requestResult := ResearchNoteDAO.AssignSecurityToResearchNote(researchNoteId, securityId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a Security on a ResearchNote
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func UnassignSecurityFromResearchNote( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	researchNoteId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the ResearchNote DAO
	//----------------------------------------------------------------------------
	requestResult := ResearchNoteDAO.UnassignSecurityFromResearchNote(researchNoteId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}

	//----------------------------------------------------------------------------
	// assigns a Advisor on a ResearchNote
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func AssignAdvisorToResearchNote(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	researchNoteId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	advisorId,_ := strconv.ParseUint( vars["advisorId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the ResearchNote DAO
	//----------------------------------------------------------------------------
	requestResult := ResearchNoteDAO.AssignAdvisorToResearchNote(researchNoteId, advisorId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a Advisor on a ResearchNote
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func UnassignAdvisorFromResearchNote( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	researchNoteId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the ResearchNote DAO
	//----------------------------------------------------------------------------
	requestResult := ResearchNoteDAO.UnassignAdvisorFromResearchNote(researchNoteId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}


