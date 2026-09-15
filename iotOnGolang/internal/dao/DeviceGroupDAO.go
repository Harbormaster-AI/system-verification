package dao

import (
    "iotOnGolang/internal/model"
    "iotOnGolang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing DeviceGroupDAO..." ) )
}

//----------------------------------------------------------------------------
// CreateDeviceGroup - creates a new db entry
//----------------------------------------------------------------------------
func CreateDeviceGroup(obj model.DeviceGroup)(utils.RequestResult){
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
	    createMsg = fmt.Sprintf( "Created a DeviceGroup with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a DeviceGroup", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreateDeviceGroup", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetDeviceGroup - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetDeviceGroup(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.DeviceGroup

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a DeviceGroup with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a DeviceGroup using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a DeviceGroup using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetDeviceGroup", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllDeviceGroup - returns all
//----------------------------------------------------------------------------
func GetAllDeviceGroup()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.DeviceGroup

	//----------------------------------------------------------------------------
	// Request the ORM to find all DeviceGroup
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all DeviceGroup" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all DeviceGroup", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllDeviceGroup", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdateDeviceGroup - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdateDeviceGroup(obj model.DeviceGroup)(requestResult utils.RequestResult){
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
	    updateMsg = fmt.Sprintf( "Updated a DeviceGroup using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a DeviceGroup using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdateDeviceGroup", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeleteDeviceGroup - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeleteDeviceGroup(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the DeviceGroup with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetDeviceGroup(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.DeviceGroup so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.DeviceGroup)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a DeviceGroup using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a DeviceGroup using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeleteDeviceGroup", requestResult.Data}

	}

	return requestResult
}


//----------------------------------------------------------------------------
// assigns a Tenant on a DeviceGroup
//----------------------------------------------------------------------------
func AssignTenantToDeviceGroup( deviceGroupId uint64, tenantId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the DeviceGroup with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetDeviceGroup(deviceGroupId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.DeviceGroup so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.DeviceGroup)

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
			// assign the Tenant	to the DeviceGroup
			//----------------------------------------------------------------------------
			parentObj.Tenant = &childObj

			//----------------------------------------------------------------------------
			// save the DeviceGroup
			//----------------------------------------------------------------------------
			return UpdateDeviceGroup(parentObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Tenant", tenantId )
			return utils.RequestResult{false, msg, "assignTenant", childObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Tenant on a DeviceGroup
//----------------------------------------------------------------------------
func UnassignTenantFromDeviceGroup(deviceGroupId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the DeviceGroup with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetDeviceGroup(deviceGroupId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.DeviceGroup so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.DeviceGroup)

		//----------------------------------------------------------------------------
		// assign an empty Tenant to the Tenant
		//----------------------------------------------------------------------------
		parentObj.Tenant = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Tenant
		//----------------------------------------------------------------------------
		parentObj.TenantId = nil;

		//----------------------------------------------------------------------------
		// save the DeviceGroup
		//----------------------------------------------------------------------------
		return UpdateDeviceGroup(parentObj)

	} else {
		return parentRequestResult
	}

}


//----------------------------------------------------------------------------
// adds one or more devicesIds as a Devices to a DeviceGroup
//----------------------------------------------------------------------------
func AddDevicesToDeviceGroup ( deviceGroupId uint64, devicesIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the DeviceGroup with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetDeviceGroup(deviceGroupId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.DeviceGroup so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.DeviceGroup)

		// slice the ids on comma with no spaces
		ids := strings.Split( devicesIds, ",")

		for _, devicesId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.IoTDevice

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a IoTDevice
			// with a matching devicesId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , devicesId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the Devices using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("Devices").Append( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Devices", devicesId )
				return utils.RequestResult{false, msg, "unassignDevices", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified DeviceGroup from the gorm
		//----------------------------------------------------------------------------
		return GetDeviceGroup(deviceGroupId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more devicesIds as a Devices from a DeviceGroup
//----------------------------------------------------------------------------
func RemoveDevicesFromDeviceGroup( deviceGroupId uint64, devicesIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the DeviceGroup with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetDeviceGroup(deviceGroupId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.DeviceGroup so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.DeviceGroup)

		// slice the ids on comma with no spaces
		ids := strings.Split( devicesIds, ",")

		for _, devicesId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.IoTDevice

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a IoTDevice
			// with a matching devicesId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , devicesId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove IoTDeviceObj from the Devices array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("Devices").Delete( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Devices", devicesId )
				return utils.RequestResult{false, msg, "removeDevices", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified DeviceGroup from the gorm
		//----------------------------------------------------------------------------
		return GetDeviceGroup(deviceGroupId)

	} else {
		return parentRequestResult
	}
}

