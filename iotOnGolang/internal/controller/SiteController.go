
package controller

import (
    SiteDAO "iotOnGolang/internal/dao"
    "iotOnGolang/internal/model"
    "iotOnGolang/internal/utils"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"net/http"
	"strconv"
)

//----------------------------------------------------------------------------
// Create controller, delegates to SiteDAO for database creation
//----------------------------------------------------------------------------
func create(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty Site model
	//----------------------------------------------------------------------------
	data := model.Site{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a Site model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the Site data access object to create
	//----------------------------------------------------------------------------
	requestResult := SiteDAO.CreateSite( data )
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Get controller, delegates to SiteDAO to find the relevant Site
//----------------------------------------------------------------------------
func get(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the Site data access object
	// find the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := SiteDAO.GetSite(ID)
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}


//----------------------------------------------------------------------------
// GetAll controller, delegates to SiteDAO for database read of all Sites
//----------------------------------------------------------------------------
func getAll(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Delegate to the Site data access object to get all
	//----------------------------------------------------------------------------
	requestResult := SiteDAO.GetAllSite()
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Update controller, delegates to SiteDAO for database save
//----------------------------------------------------------------------------
func update(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty Site model
	//----------------------------------------------------------------------------
	var data = model.Site{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a Site model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the Site data access object
	// update the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := SiteDAO.UpdateSite(data)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Delete controller, delegates to SiteDAO for database deletion
//----------------------------------------------------------------------------
func delete(w http.ResponseWriter, r *http.Request) {
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
	// Delegate to the Site data access object
	// delete the one with the matching identifier
	//----------------------------------------------------------------------------	
	requestResult := SiteDAO.DeleteSite(ID)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// assigns a Tenant on a Site
	// delegates to an ORM handler
	///----------------------------------------------------------------------------
func assignTenant(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	siteId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	tenantId,_ := strconv.ParseUint( vars["childId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Site DAO
	//----------------------------------------------------------------------------
	requestResult := SiteDAO.AssignTenantToSite(siteId, tenantId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// unassigns a Tenant on a Site
	// delegates to the ORM handler
	//----------------------------------------------------------------------------
func unassignTenant( w http.ResponseWriter, r *http.Request ) {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id params
	//----------------------------------------------------------------------------
	siteId,_ := strconv.ParseUint( vars["parentId"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Site DAO
	//----------------------------------------------------------------------------
	requestResult := SiteDAO.UnassignTenantFromSite(siteId)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}


	//----------------------------------------------------------------------------
	// adds one or more buildingsIds as a Buildings to a Site
	//----------------------------------------------------------------------------
func addToBuildings(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	siteId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	buildingsIds,_ := strconv.ParseUint( vars["childIds"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Site DAO
	//----------------------------------------------------------------------------
	requestResult := SiteDAO.AddBuildingsToSite(siteId, buildingsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more buildingsIds as a Buildings from a Site
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func removeFromBuildings(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	siteId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	buildingsIds,_ := strconv.ParseUint( vars["childIds"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Site DAO
	//----------------------------------------------------------------------------
	requestResult := SiteDAO.RemoveBuildingsFromSite(siteId, buildingsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
	//----------------------------------------------------------------------------
	// adds one or more devicesIds as a Devices to a Site
	//----------------------------------------------------------------------------
func addToDevices(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	siteId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	devicesIds,_ := strconv.ParseUint( vars["childIds"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Site DAO
	//----------------------------------------------------------------------------
	requestResult := SiteDAO.AddDevicesToSite(siteId, devicesIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more devicesIds as a Devices from a Site
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func removeFromDevices(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	siteId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	devicesIds,_ := strconv.ParseUint( vars["childIds"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Site DAO
	//----------------------------------------------------------------------------
	requestResult := SiteDAO.RemoveDevicesFromSite(siteId, devicesIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
	//----------------------------------------------------------------------------
	// adds one or more gatewaysIds as a Gateways to a Site
	//----------------------------------------------------------------------------
func addToGateways(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	siteId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	gatewaysIds,_ := strconv.ParseUint( vars["childIds"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Site DAO
	//----------------------------------------------------------------------------
	requestResult := SiteDAO.AddGatewaysToSite(siteId, gatewaysIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more gatewaysIds as a Gateways from a Site
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func removeFromGateways(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	siteId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	gatewaysIds,_ := strconv.ParseUint( vars["childIds"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Site DAO
	//----------------------------------------------------------------------------
	requestResult := SiteDAO.RemoveGatewaysFromSite(siteId, gatewaysIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
