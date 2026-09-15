package controller

import (
    TenantDAO "iotOnGolang/internal/dao"
    "iotOnGolang/internal/model"
    "iotOnGolang/internal/utils"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"net/http"
	"strconv"
)

//----------------------------------------------------------------------------
// Create controller, delegates to TenantDAO for database creation
//----------------------------------------------------------------------------
func create(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty Tenant model
	//----------------------------------------------------------------------------
	data := model.Tenant{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a Tenant model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the Tenant data access object to create
	//----------------------------------------------------------------------------
	requestResult := TenantDAO.CreateTenant( data )
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Get controller, delegates to TenantDAO to find the relevant Tenant
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
	// Delegate to the Tenant data access object
	// find the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := TenantDAO.GetTenant(ID)
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}


//----------------------------------------------------------------------------
// GetAll controller, delegates to TenantDAO for database read of all Tenants
//----------------------------------------------------------------------------
func getAll(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Delegate to the Tenant data access object to get all
	//----------------------------------------------------------------------------
	requestResult := TenantDAO.GetAllTenant()
	
	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res,_ := json.Marshal(requestResult)

	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Update controller, delegates to TenantDAO for database save
//----------------------------------------------------------------------------
func update(w http.ResponseWriter, r *http.Request) {
	//----------------------------------------------------------------------------
	// Initialize an empty Tenant model
	//----------------------------------------------------------------------------
	var data = model.Tenant{}
	
	//----------------------------------------------------------------------------
	// Parse the body into a Tenant model structure
	//----------------------------------------------------------------------------
	utils.ParseBody(r, data)

	//----------------------------------------------------------------------------
	// Delegate to the Tenant data access object
	// update the one with the matching identifier
	//----------------------------------------------------------------------------
	requestResult := TenantDAO.UpdateTenant(data)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//----------------------------------------------------------------------------
// Delete controller, delegates to TenantDAO for database deletion
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
	// Delegate to the Tenant data access object
	// delete the one with the matching identifier
	//----------------------------------------------------------------------------	
	requestResult := TenantDAO.DeleteTenant(ID)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}


	//----------------------------------------------------------------------------
	// adds one or more sitesIds as a Sites to a Tenant
	//----------------------------------------------------------------------------
func addToSites(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	tenantId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	sitesIds,_ := strconv.ParseUint( vars["childIds"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Tenant DAO
	//----------------------------------------------------------------------------
	requestResult := TenantDAO.AddSitesToTenant(tenantId, sitesIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more sitesIds as a Sites from a Tenant
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func removeFromSites(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	tenantId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	sitesIds,_ := strconv.ParseUint( vars["childIds"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Tenant DAO
	//----------------------------------------------------------------------------
	requestResult := TenantDAO.RemoveSitesFromTenant(tenantId, sitesIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
	//----------------------------------------------------------------------------
	// adds one or more usersIds as a Users to a Tenant
	//----------------------------------------------------------------------------
func addToUsers(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	tenantId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	usersIds,_ := strconv.ParseUint( vars["childIds"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Tenant DAO
	//----------------------------------------------------------------------------
	requestResult := TenantDAO.AddUsersToTenant(tenantId, usersIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more usersIds as a Users from a Tenant
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func removeFromUsers(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	tenantId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	usersIds,_ := strconv.ParseUint( vars["childIds"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Tenant DAO
	//----------------------------------------------------------------------------
	requestResult := TenantDAO.RemoveUsersFromTenant(tenantId, usersIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
	//----------------------------------------------------------------------------
	// adds one or more devicesIds as a Devices to a Tenant
	//----------------------------------------------------------------------------
func addToDevices(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	tenantId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	devicesIds,_ := strconv.ParseUint( vars["childIds"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Tenant DAO
	//----------------------------------------------------------------------------
	requestResult := TenantDAO.AddDevicesToTenant(tenantId, devicesIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more devicesIds as a Devices from a Tenant
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func removeFromDevices(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	tenantId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	devicesIds,_ := strconv.ParseUint( vars["childIds"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Tenant DAO
	//----------------------------------------------------------------------------
	requestResult := TenantDAO.RemoveDevicesFromTenant(tenantId, devicesIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
	//----------------------------------------------------------------------------
	// adds one or more dataRetentionPoliciesIds as a DataRetentionPolicies to a Tenant
	//----------------------------------------------------------------------------
func addToDataRetentionPolicies(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	tenantId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	dataRetentionPoliciesIds,_ := strconv.ParseUint( vars["childIds"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Tenant DAO
	//----------------------------------------------------------------------------
	requestResult := TenantDAO.AddDataRetentionPoliciesToTenant(tenantId, dataRetentionPoliciesIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more dataRetentionPoliciesIds as a DataRetentionPolicies from a Tenant
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func removeFromDataRetentionPolicies(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	tenantId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	dataRetentionPoliciesIds,_ := strconv.ParseUint( vars["childIds"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Tenant DAO
	//----------------------------------------------------------------------------
	requestResult := TenantDAO.RemoveDataRetentionPoliciesFromTenant(tenantId, dataRetentionPoliciesIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
	//----------------------------------------------------------------------------
	// adds one or more connectivityPlansIds as a ConnectivityPlans to a Tenant
	//----------------------------------------------------------------------------
func addToConnectivityPlans(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	tenantId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	connectivityPlansIds,_ := strconv.ParseUint( vars["childIds"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Tenant DAO
	//----------------------------------------------------------------------------
	requestResult := TenantDAO.AddConnectivityPlansToTenant(tenantId, connectivityPlansIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more connectivityPlansIds as a ConnectivityPlans from a Tenant
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func removeFromConnectivityPlans(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	tenantId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	connectivityPlansIds,_ := strconv.ParseUint( vars["childIds"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Tenant DAO
	//----------------------------------------------------------------------------
	requestResult := TenantDAO.RemoveConnectivityPlansFromTenant(tenantId, connectivityPlansIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
	//----------------------------------------------------------------------------
	// adds one or more simCardsIds as a SimCards to a Tenant
	//----------------------------------------------------------------------------
func addToSimCards(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	tenantId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	simCardsIds,_ := strconv.ParseUint( vars["childIds"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Tenant DAO
	//----------------------------------------------------------------------------
	requestResult := TenantDAO.AddSimCardsToTenant(tenantId, simCardsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more simCardsIds as a SimCards from a Tenant
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func removeFromSimCards(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	tenantId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	simCardsIds,_ := strconv.ParseUint( vars["childIds"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Tenant DAO
	//----------------------------------------------------------------------------
	requestResult := TenantDAO.RemoveSimCardsFromTenant(tenantId, simCardsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
	//----------------------------------------------------------------------------
	// adds one or more messagingEndpointsIds as a MessagingEndpoints to a Tenant
	//----------------------------------------------------------------------------
func addToMessagingEndpoints(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	tenantId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	messagingEndpointsIds,_ := strconv.ParseUint( vars["childIds"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Tenant DAO
	//----------------------------------------------------------------------------
	requestResult := TenantDAO.AddMessagingEndpointsToTenant(tenantId, messagingEndpointsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more messagingEndpointsIds as a MessagingEndpoints from a Tenant
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func removeFromMessagingEndpoints(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	tenantId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	messagingEndpointsIds,_ := strconv.ParseUint( vars["childIds"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Tenant DAO
	//----------------------------------------------------------------------------
	requestResult := TenantDAO.RemoveMessagingEndpointsFromTenant(tenantId, messagingEndpointsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
	//----------------------------------------------------------------------------
	// adds one or more accessPoliciesIds as a AccessPolicies to a Tenant
	//----------------------------------------------------------------------------
func addToAccessPolicies(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	tenantId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	accessPoliciesIds,_ := strconv.ParseUint( vars["childIds"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Tenant DAO
	//----------------------------------------------------------------------------
	requestResult := TenantDAO.AddAccessPoliciesToTenant(tenantId, accessPoliciesIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more accessPoliciesIds as a AccessPolicies from a Tenant
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func removeFromAccessPolicies(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	tenantId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	accessPoliciesIds,_ := strconv.ParseUint( vars["childIds"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Tenant DAO
	//----------------------------------------------------------------------------
	requestResult := TenantDAO.RemoveAccessPoliciesFromTenant(tenantId, accessPoliciesIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
	//----------------------------------------------------------------------------
	// adds one or more deviceGroupsIds as a DeviceGroups to a Tenant
	//----------------------------------------------------------------------------
func addToDeviceGroups(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	tenantId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	deviceGroupsIds,_ := strconv.ParseUint( vars["childIds"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Tenant DAO
	//----------------------------------------------------------------------------
	requestResult := TenantDAO.AddDeviceGroupsToTenant(tenantId, deviceGroupsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more deviceGroupsIds as a DeviceGroups from a Tenant
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func removeFromDeviceGroups(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	tenantId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	deviceGroupsIds,_ := strconv.ParseUint( vars["childIds"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Tenant DAO
	//----------------------------------------------------------------------------
	requestResult := TenantDAO.RemoveDeviceGroupsFromTenant(tenantId, deviceGroupsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
	//----------------------------------------------------------------------------
	// adds one or more alertRulesIds as a AlertRules to a Tenant
	//----------------------------------------------------------------------------
func addToAlertRules(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	tenantId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	alertRulesIds,_ := strconv.ParseUint( vars["childIds"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Tenant DAO
	//----------------------------------------------------------------------------
	requestResult := TenantDAO.AddAlertRulesToTenant(tenantId, alertRulesIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more alertRulesIds as a AlertRules from a Tenant
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func removeFromAlertRules(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	tenantId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	alertRulesIds,_ := strconv.ParseUint( vars["childIds"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Tenant DAO
	//----------------------------------------------------------------------------
	requestResult := TenantDAO.RemoveAlertRulesFromTenant(tenantId, alertRulesIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
	//----------------------------------------------------------------------------
	// adds one or more maintenanceTicketsIds as a MaintenanceTickets to a Tenant
	//----------------------------------------------------------------------------
func addToMaintenanceTickets(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	tenantId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	maintenanceTicketsIds,_ := strconv.ParseUint( vars["childIds"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Tenant DAO
	//----------------------------------------------------------------------------
	requestResult := TenantDAO.AddMaintenanceTicketsToTenant(tenantId, maintenanceTicketsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more maintenanceTicketsIds as a MaintenanceTickets from a Tenant
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func removeFromMaintenanceTickets(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	tenantId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	maintenanceTicketsIds,_ := strconv.ParseUint( vars["childIds"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Tenant DAO
	//----------------------------------------------------------------------------
	requestResult := TenantDAO.RemoveMaintenanceTicketsFromTenant(tenantId, maintenanceTicketsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
	//----------------------------------------------------------------------------
	// adds one or more usageRecordsIds as a UsageRecords to a Tenant
	//----------------------------------------------------------------------------
func addToUsageRecords(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	tenantId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	usageRecordsIds,_ := strconv.ParseUint( vars["childIds"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Tenant DAO
	//----------------------------------------------------------------------------
	requestResult := TenantDAO.AddUsageRecordsToTenant(tenantId, usageRecordsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

	//----------------------------------------------------------------------------
	// removes one or more usageRecordsIds as a UsageRecords from a Tenant
	// delegates via URI to an ORM handler
	//----------------------------------------------------------------------------
func removeFromUsageRecords(w http.ResponseWriter, r *http.Request)  {

	vars := mux.Vars(r)

	//----------------------------------------------------------------------------
	// Retrieve the id and child ids
	//----------------------------------------------------------------------------
	tenantId,_ := strconv.ParseUint( vars["parentId"], 10, 64)
	usageRecordsIds,_ := strconv.ParseUint( vars["childIds"], 10, 64)

	//----------------------------------------------------------------------------
	// Delegate to the Tenant DAO
	//----------------------------------------------------------------------------
	requestResult := TenantDAO.RemoveUsageRecordsFromTenant(tenantId, usageRecordsIds)

	//----------------------------------------------------------------------------
	// Marshal the model into a JSON object
	//----------------------------------------------------------------------------
	res, _ := json.Marshal(requestResult)
	w.WriteHeader(http.StatusOK)
	w.Write(res)	
}
		
