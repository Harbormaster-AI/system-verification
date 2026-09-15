
package dao

import (
    "iotOnGolang/internal/model"
    "iotOnGolang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing MaintenanceTicketDAO..." ) )
}

//----------------------------------------------------------------------------
// CreateMaintenanceTicket - creates a new db entry
//----------------------------------------------------------------------------
func CreateMaintenanceTicket(obj model.MaintenanceTicket)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var createMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	result := utils.GetDB().Create(&obj).Error

	if result == nil {
	    createMsg = fmt.Sprintf( "Created a MaintenanceTicket with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a MaintenanceTicket", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreateMaintenanceTicket", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetMaintenanceTicket - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetMaintenanceTicket(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.MaintenanceTicket

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a MaintenanceTicket with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a MaintenanceTicket using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a MaintenanceTicket using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetMaintenanceTicket", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllMaintenanceTicket - returns all
//----------------------------------------------------------------------------
func GetAllMaintenanceTicket()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.MaintenanceTicket

	//----------------------------------------------------------------------------
	// Request the ORM to find all MaintenanceTicket
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all MaintenanceTicket" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all MaintenanceTicket", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllMaintenanceTicket", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdateMaintenanceTicket - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdateMaintenanceTicket(obj model.MaintenanceTicket)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var updateMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to save
	//----------------------------------------------------------------------------
	result := utils.GetDB().Save(&obj).Error

	if result == nil {
	    updateMsg = fmt.Sprintf( "Updated a MaintenanceTicket using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a MaintenanceTicket using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdateMaintenanceTicket", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeleteMaintenanceTicket - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeleteMaintenanceTicket(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the MaintenanceTicket with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetMaintenanceTicket(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.MaintenanceTicket so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.MaintenanceTicket)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a MaintenanceTicket using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a MaintenanceTicket using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeleteMaintenanceTicket", requestResult.Data}

	}

	return requestResult
}


//----------------------------------------------------------------------------
// assigns a Device on a MaintenanceTicket
//----------------------------------------------------------------------------
func AssignDeviceToMaintenanceTicket( maintenanceTicketId uint64, deviceId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the MaintenanceTicket with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetMaintenanceTicket(maintenanceTicketId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.MaintenanceTicket so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.MaintenanceTicket)

		//----------------------------------------------------------------------------
		// Pass the reference to the ORM to get
		//----------------------------------------------------------------------------
		var childObj model.IoTDevice

		//----------------------------------------------------------------------------
		// Retrieve the 1st occurrence from the ORM of a IoTDevice with a
		// matching deviceId
		//----------------------------------------------------------------------------
		childRequestResult := utils.GetDB().First(&childObj, deviceId).Error // find first using identifier

		if childRequestResult == nil {
			//----------------------------------------------------------------------------
			// assign the Device	to the MaintenanceTicket
			//----------------------------------------------------------------------------
			parentObj.Device = &childObj

			//----------------------------------------------------------------------------
			// save the MaintenanceTicket
			//----------------------------------------------------------------------------
			return UpdateMaintenanceTicket(parentObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Device", deviceId )
			return utils.RequestResult{false, msg, "assignDevice", childObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Device on a MaintenanceTicket
//----------------------------------------------------------------------------
func UnassignDeviceFromMaintenanceTicket(maintenanceTicketId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the MaintenanceTicket with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetMaintenanceTicket(maintenanceTicketId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.MaintenanceTicket so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.MaintenanceTicket)

		//----------------------------------------------------------------------------
		// assign an empty IoTDevice to the Device
		//----------------------------------------------------------------------------
		parentObj.Device = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Device
		//----------------------------------------------------------------------------
		parentObj.DeviceId = nil;

		//----------------------------------------------------------------------------
		// save the MaintenanceTicket
		//----------------------------------------------------------------------------
		return UpdateMaintenanceTicket(parentObj)

	} else {
		return parentRequestResult
	}

}

//----------------------------------------------------------------------------
// assigns a Tenant on a MaintenanceTicket
//----------------------------------------------------------------------------
func AssignTenantToMaintenanceTicket( maintenanceTicketId uint64, tenantId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the MaintenanceTicket with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetMaintenanceTicket(maintenanceTicketId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.MaintenanceTicket so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.MaintenanceTicket)

		//----------------------------------------------------------------------------
		// Pass the reference to the ORM to get
		//----------------------------------------------------------------------------
		var childObj model.Tenant

		//----------------------------------------------------------------------------
		// Retrieve the 1st occurrence from the ORM of a Tenant with a
		// matching tenantId
		//----------------------------------------------------------------------------
		childRequestResult := utils.GetDB().First(&childObj, tenantId).Error // find first using identifier

		if childRequestResult == nil {
			//----------------------------------------------------------------------------
			// assign the Tenant	to the MaintenanceTicket
			//----------------------------------------------------------------------------
			parentObj.Tenant = &childObj

			//----------------------------------------------------------------------------
			// save the MaintenanceTicket
			//----------------------------------------------------------------------------
			return UpdateMaintenanceTicket(parentObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Tenant", tenantId )
			return utils.RequestResult{false, msg, "assignTenant", childObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Tenant on a MaintenanceTicket
//----------------------------------------------------------------------------
func UnassignTenantFromMaintenanceTicket(maintenanceTicketId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the MaintenanceTicket with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetMaintenanceTicket(maintenanceTicketId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.MaintenanceTicket so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.MaintenanceTicket)

		//----------------------------------------------------------------------------
		// assign an empty Tenant to the Tenant
		//----------------------------------------------------------------------------
		parentObj.Tenant = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Tenant
		//----------------------------------------------------------------------------
		parentObj.TenantId = nil;

		//----------------------------------------------------------------------------
		// save the MaintenanceTicket
		//----------------------------------------------------------------------------
		return UpdateMaintenanceTicket(parentObj)

	} else {
		return parentRequestResult
	}

}


