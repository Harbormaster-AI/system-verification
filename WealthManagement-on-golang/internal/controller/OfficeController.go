package controller

import (
    OfficeDAO "WealthManagement-on-golang/internal/dao"
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"net/http"
	"strconv"
)

//----------------------------------------------------------------------------
// Create controller, delegates to OfficeDAO for database creation
//----------------------------------------------------------------------------
func CreateOffice(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty Office model
	//----------------------------------------------------------------------------
	data := model.Office{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a Office model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the Office data access object to create
	//----------------------------------------------------------------------------
	requestResult := OfficeDAO.CreateOffice( data )
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Get controller, delegates to OfficeDAO to find the relevant Office
//----------------------------------------------------------------------------
func GetOffice(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the Office data access object
	// find the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := OfficeDAO.GetOffice(ID)
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}


//----------------------------------------------------------------------------
// GetAll controller, delegates to OfficeDAO for database read of all Offices
//----------------------------------------------------------------------------
func GetAllOffice(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Delegate to the Office data access object to get all
	//----------------------------------------------------------------------------
	requestResult := OfficeDAO.GetAllOffice()
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Update controller, delegates to OfficeDAO for database save
//----------------------------------------------------------------------------
func UpdateOffice(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty Office model
	//----------------------------------------------------------------------------
	var data = model.Office{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a Office model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the Office data access object
	// update the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := OfficeDAO.UpdateOffice(data)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Delete controller, delegates to OfficeDAO for database deletion
//----------------------------------------------------------------------------
func DeleteOffice(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the Office data access object
	// delete the one with the matching identifier
	//----------------------------------------------------------------------------	
	requestResult := OfficeDAO.DeleteOffice(ID)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// assigns a Firm on a Office
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func AssignFirmToOffice(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	officeId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	firmId,_ := strconv.ParseUint( vars["firmId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Office DAO
	//----------------------------------------------------------------------------
	requestResult := OfficeDAO.AssignFirmToOffice(officeId, firmId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a Firm on a Office
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func UnassignFirmFromOffice( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	officeId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Office DAO
	//----------------------------------------------------------------------------
	requestResult := OfficeDAO.UnassignFirmFromOffice(officeId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}


	//----------------------------------------------------------------------------
	// adds one or more advisorsIds as a Advisors to a Office
	//----------------------------------------------------------------------------
func AddAdvisorsToOffice(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	officeId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	advisorsIds,_ := vars["advisorsIds"]

	//----------------------------------------------------------------------------
	// Delegate to the Office DAO
	//----------------------------------------------------------------------------
	requestResult := OfficeDAO.AddAdvisorsToOffice(officeId, advisorsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more advisorsIds as a Advisors from a Office
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func RemoveAdvisorsFromOffice(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	officeId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	advisorsIds,_ := vars["advisorsIds"]

	//----------------------------------------------------------------------------
	// Delegate to the Office DAO
	//----------------------------------------------------------------------------
	requestResult := OfficeDAO.RemoveAdvisorsFromOffice(officeId, advisorsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
