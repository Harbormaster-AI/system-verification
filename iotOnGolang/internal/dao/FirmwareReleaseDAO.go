
package dao

import (
    "iotOnGolang/internal/model"
    "iotOnGolang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing FirmwareReleaseDAO..." ) )
}

//----------------------------------------------------------------------------
// CreateFirmwareRelease - creates a new db entry
//----------------------------------------------------------------------------
func CreateFirmwareRelease(obj model.FirmwareRelease)(utils.RequestResult){
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
	    createMsg = fmt.Sprintf( "Created a FirmwareRelease with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a FirmwareRelease", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreateFirmwareRelease", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetFirmwareRelease - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetFirmwareRelease(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.FirmwareRelease

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a FirmwareRelease with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a FirmwareRelease using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a FirmwareRelease using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetFirmwareRelease", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllFirmwareRelease - returns all
//----------------------------------------------------------------------------
func GetAllFirmwareRelease()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.FirmwareRelease

	//----------------------------------------------------------------------------
	// Request the ORM to find all FirmwareRelease
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all FirmwareRelease" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all FirmwareRelease", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllFirmwareRelease", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdateFirmwareRelease - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdateFirmwareRelease(obj model.FirmwareRelease)(requestResult utils.RequestResult){
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
	    updateMsg = fmt.Sprintf( "Updated a FirmwareRelease using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a FirmwareRelease using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdateFirmwareRelease", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeleteFirmwareRelease - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeleteFirmwareRelease(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the FirmwareRelease with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetFirmwareRelease(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.FirmwareRelease so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.FirmwareRelease)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a FirmwareRelease using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a FirmwareRelease using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeleteFirmwareRelease", requestResult.Data}

	}

	return requestResult
}


//----------------------------------------------------------------------------
// assigns a DeviceModel on a FirmwareRelease
//----------------------------------------------------------------------------
func AssignDeviceModelToFirmwareRelease( firmwareReleaseId uint64, deviceModelId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the FirmwareRelease with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetFirmwareRelease(firmwareReleaseId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.FirmwareRelease so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.FirmwareRelease)

		//----------------------------------------------------------------------------
		// Pass the reference to the ORM to get
		//----------------------------------------------------------------------------
		var childObj model.DeviceModel

		//----------------------------------------------------------------------------
		// Retrieve the 1st occurrence from the ORM of a DeviceModel with a
		// matching deviceModelId
		//----------------------------------------------------------------------------
		childRequestResult := utils.GetDB().First(&childObj, deviceModelId).Error // find first using identifier

		if childRequestResult == nil {
			//----------------------------------------------------------------------------
			// assign the DeviceModel	to the FirmwareRelease
			//----------------------------------------------------------------------------
			parentObj.DeviceModel = &childObj

			//----------------------------------------------------------------------------
			// save the FirmwareRelease
			//----------------------------------------------------------------------------
			return UpdateFirmwareRelease(parentObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "DeviceModel", deviceModelId )
			return utils.RequestResult{false, msg, "assignDeviceModel", childObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a DeviceModel on a FirmwareRelease
//----------------------------------------------------------------------------
func UnassignDeviceModelFromFirmwareRelease(firmwareReleaseId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the FirmwareRelease with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetFirmwareRelease(firmwareReleaseId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.FirmwareRelease so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.FirmwareRelease)

		//----------------------------------------------------------------------------
		// assign an empty DeviceModel to the DeviceModel
		//----------------------------------------------------------------------------
		parentObj.DeviceModel = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the DeviceModel
		//----------------------------------------------------------------------------
		parentObj.DeviceModelId = nil;

		//----------------------------------------------------------------------------
		// save the FirmwareRelease
		//----------------------------------------------------------------------------
		return UpdateFirmwareRelease(parentObj)

	} else {
		return parentRequestResult
	}

}


