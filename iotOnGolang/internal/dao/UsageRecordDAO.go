
package dao

import (
    "iotOnGolang/internal/model"
    "iotOnGolang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing UsageRecordDAO..." ) )
}

//----------------------------------------------------------------------------
// CreateUsageRecord - creates a new db entry
//----------------------------------------------------------------------------
func CreateUsageRecord(obj model.UsageRecord)(utils.RequestResult){
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
	    createMsg = fmt.Sprintf( "Created a UsageRecord with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a UsageRecord", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreateUsageRecord", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetUsageRecord - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetUsageRecord(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.UsageRecord

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a UsageRecord with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a UsageRecord using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a UsageRecord using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetUsageRecord", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllUsageRecord - returns all
//----------------------------------------------------------------------------
func GetAllUsageRecord()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.UsageRecord

	//----------------------------------------------------------------------------
	// Request the ORM to find all UsageRecord
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all UsageRecord" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all UsageRecord", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllUsageRecord", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdateUsageRecord - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdateUsageRecord(obj model.UsageRecord)(requestResult utils.RequestResult){
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
	    updateMsg = fmt.Sprintf( "Updated a UsageRecord using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a UsageRecord using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdateUsageRecord", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeleteUsageRecord - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeleteUsageRecord(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the UsageRecord with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetUsageRecord(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.UsageRecord so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.UsageRecord)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a UsageRecord using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a UsageRecord using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeleteUsageRecord", requestResult.Data}

	}

	return requestResult
}


//----------------------------------------------------------------------------
// assigns a Tenant on a UsageRecord
//----------------------------------------------------------------------------
func AssignTenantToUsageRecord( usageRecordId uint64, tenantId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the UsageRecord with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetUsageRecord(usageRecordId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.UsageRecord so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.UsageRecord)

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
			// assign the Tenant	to the UsageRecord
			//----------------------------------------------------------------------------
			parentObj.Tenant = &childObj

			//----------------------------------------------------------------------------
			// save the UsageRecord
			//----------------------------------------------------------------------------
			return UpdateUsageRecord(parentObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Tenant", tenantId )
			return utils.RequestResult{false, msg, "assignTenant", childObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Tenant on a UsageRecord
//----------------------------------------------------------------------------
func UnassignTenantFromUsageRecord(usageRecordId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the UsageRecord with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetUsageRecord(usageRecordId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.UsageRecord so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.UsageRecord)

		//----------------------------------------------------------------------------
		// assign an empty Tenant to the Tenant
		//----------------------------------------------------------------------------
		parentObj.Tenant = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Tenant
		//----------------------------------------------------------------------------
		parentObj.TenantId = nil;

		//----------------------------------------------------------------------------
		// save the UsageRecord
		//----------------------------------------------------------------------------
		return UpdateUsageRecord(parentObj)

	} else {
		return parentRequestResult
	}

}

//----------------------------------------------------------------------------
// assigns a Device on a UsageRecord
//----------------------------------------------------------------------------
func AssignDeviceToUsageRecord( usageRecordId uint64, deviceId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the UsageRecord with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetUsageRecord(usageRecordId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.UsageRecord so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.UsageRecord)

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
			// assign the Device	to the UsageRecord
			//----------------------------------------------------------------------------
			parentObj.Device = &childObj

			//----------------------------------------------------------------------------
			// save the UsageRecord
			//----------------------------------------------------------------------------
			return UpdateUsageRecord(parentObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Device", deviceId )
			return utils.RequestResult{false, msg, "assignDevice", childObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Device on a UsageRecord
//----------------------------------------------------------------------------
func UnassignDeviceFromUsageRecord(usageRecordId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the UsageRecord with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetUsageRecord(usageRecordId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.UsageRecord so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.UsageRecord)

		//----------------------------------------------------------------------------
		// assign an empty IoTDevice to the Device
		//----------------------------------------------------------------------------
		parentObj.Device = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Device
		//----------------------------------------------------------------------------
		parentObj.DeviceId = nil;

		//----------------------------------------------------------------------------
		// save the UsageRecord
		//----------------------------------------------------------------------------
		return UpdateUsageRecord(parentObj)

	} else {
		return parentRequestResult
	}

}

//----------------------------------------------------------------------------
// assigns a ConnectivityPlan on a UsageRecord
//----------------------------------------------------------------------------
func AssignConnectivityPlanToUsageRecord( usageRecordId uint64, connectivityPlanId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the UsageRecord with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetUsageRecord(usageRecordId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.UsageRecord so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.UsageRecord)

		//----------------------------------------------------------------------------
		// Pass the reference to the ORM to get
		//----------------------------------------------------------------------------
		var childObj model.ConnectivityPlan

		//----------------------------------------------------------------------------
		// Retrieve the 1st occurrence from the ORM of a ConnectivityPlan with a
		// matching connectivityPlanId
		//----------------------------------------------------------------------------
		childRequestResult := utils.GetDB().First(&childObj, connectivityPlanId).Error // find first using identifier

		if childRequestResult == nil {
			//----------------------------------------------------------------------------
			// assign the ConnectivityPlan	to the UsageRecord
			//----------------------------------------------------------------------------
			parentObj.ConnectivityPlan = &childObj

			//----------------------------------------------------------------------------
			// save the UsageRecord
			//----------------------------------------------------------------------------
			return UpdateUsageRecord(parentObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "ConnectivityPlan", connectivityPlanId )
			return utils.RequestResult{false, msg, "assignConnectivityPlan", childObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a ConnectivityPlan on a UsageRecord
//----------------------------------------------------------------------------
func UnassignConnectivityPlanFromUsageRecord(usageRecordId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the UsageRecord with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetUsageRecord(usageRecordId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.UsageRecord so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.UsageRecord)

		//----------------------------------------------------------------------------
		// assign an empty ConnectivityPlan to the ConnectivityPlan
		//----------------------------------------------------------------------------
		parentObj.ConnectivityPlan = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the ConnectivityPlan
		//----------------------------------------------------------------------------
		parentObj.ConnectivityPlanId = nil;

		//----------------------------------------------------------------------------
		// save the UsageRecord
		//----------------------------------------------------------------------------
		return UpdateUsageRecord(parentObj)

	} else {
		return parentRequestResult
	}

}


