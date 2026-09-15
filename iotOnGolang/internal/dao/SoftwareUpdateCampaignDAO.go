
package dao

import (
    "iotOnGolang/internal/model"
    "iotOnGolang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing SoftwareUpdateCampaignDAO..." ) )
}

//----------------------------------------------------------------------------
// CreateSoftwareUpdateCampaign - creates a new db entry
//----------------------------------------------------------------------------
func CreateSoftwareUpdateCampaign(obj model.SoftwareUpdateCampaign)(utils.RequestResult){
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
	    createMsg = fmt.Sprintf( "Created a SoftwareUpdateCampaign with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a SoftwareUpdateCampaign", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreateSoftwareUpdateCampaign", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetSoftwareUpdateCampaign - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetSoftwareUpdateCampaign(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.SoftwareUpdateCampaign

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a SoftwareUpdateCampaign with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a SoftwareUpdateCampaign using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a SoftwareUpdateCampaign using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetSoftwareUpdateCampaign", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllSoftwareUpdateCampaign - returns all
//----------------------------------------------------------------------------
func GetAllSoftwareUpdateCampaign()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.SoftwareUpdateCampaign

	//----------------------------------------------------------------------------
	// Request the ORM to find all SoftwareUpdateCampaign
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all SoftwareUpdateCampaign" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all SoftwareUpdateCampaign", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllSoftwareUpdateCampaign", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdateSoftwareUpdateCampaign - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdateSoftwareUpdateCampaign(obj model.SoftwareUpdateCampaign)(requestResult utils.RequestResult){
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
	    updateMsg = fmt.Sprintf( "Updated a SoftwareUpdateCampaign using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a SoftwareUpdateCampaign using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdateSoftwareUpdateCampaign", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeleteSoftwareUpdateCampaign - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeleteSoftwareUpdateCampaign(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the SoftwareUpdateCampaign with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetSoftwareUpdateCampaign(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.SoftwareUpdateCampaign so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.SoftwareUpdateCampaign)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a SoftwareUpdateCampaign using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a SoftwareUpdateCampaign using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeleteSoftwareUpdateCampaign", requestResult.Data}

	}

	return requestResult
}


//----------------------------------------------------------------------------
// assigns a FirmwareRelease on a SoftwareUpdateCampaign
//----------------------------------------------------------------------------
func AssignFirmwareReleaseToSoftwareUpdateCampaign( softwareUpdateCampaignId uint64, firmwareReleaseId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the SoftwareUpdateCampaign with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetSoftwareUpdateCampaign(softwareUpdateCampaignId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.SoftwareUpdateCampaign so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.SoftwareUpdateCampaign)

		//----------------------------------------------------------------------------
		// Pass the reference to the ORM to get
		//----------------------------------------------------------------------------
		var childObj model.FirmwareRelease

		//----------------------------------------------------------------------------
		// Retrieve the 1st occurrence from the ORM of a FirmwareRelease with a
		// matching firmwareReleaseId
		//----------------------------------------------------------------------------
		childRequestResult := utils.GetDB().First(&childObj, firmwareReleaseId).Error // find first using identifier

		if childRequestResult == nil {
			//----------------------------------------------------------------------------
			// assign the FirmwareRelease	to the SoftwareUpdateCampaign
			//----------------------------------------------------------------------------
			parentObj.FirmwareRelease = &childObj

			//----------------------------------------------------------------------------
			// save the SoftwareUpdateCampaign
			//----------------------------------------------------------------------------
			return UpdateSoftwareUpdateCampaign(parentObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "FirmwareRelease", firmwareReleaseId )
			return utils.RequestResult{false, msg, "assignFirmwareRelease", childObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a FirmwareRelease on a SoftwareUpdateCampaign
//----------------------------------------------------------------------------
func UnassignFirmwareReleaseFromSoftwareUpdateCampaign(softwareUpdateCampaignId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the SoftwareUpdateCampaign with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetSoftwareUpdateCampaign(softwareUpdateCampaignId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.SoftwareUpdateCampaign so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.SoftwareUpdateCampaign)

		//----------------------------------------------------------------------------
		// assign an empty FirmwareRelease to the FirmwareRelease
		//----------------------------------------------------------------------------
		parentObj.FirmwareRelease = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the FirmwareRelease
		//----------------------------------------------------------------------------
		parentObj.FirmwareReleaseId = nil;

		//----------------------------------------------------------------------------
		// save the SoftwareUpdateCampaign
		//----------------------------------------------------------------------------
		return UpdateSoftwareUpdateCampaign(parentObj)

	} else {
		return parentRequestResult
	}

}

//----------------------------------------------------------------------------
// assigns a DeviceGroup on a SoftwareUpdateCampaign
//----------------------------------------------------------------------------
func AssignDeviceGroupToSoftwareUpdateCampaign( softwareUpdateCampaignId uint64, deviceGroupId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the SoftwareUpdateCampaign with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetSoftwareUpdateCampaign(softwareUpdateCampaignId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.SoftwareUpdateCampaign so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.SoftwareUpdateCampaign)

		//----------------------------------------------------------------------------
		// Pass the reference to the ORM to get
		//----------------------------------------------------------------------------
		var childObj model.DeviceGroup

		//----------------------------------------------------------------------------
		// Retrieve the 1st occurrence from the ORM of a DeviceGroup with a
		// matching deviceGroupId
		//----------------------------------------------------------------------------
		childRequestResult := utils.GetDB().First(&childObj, deviceGroupId).Error // find first using identifier

		if childRequestResult == nil {
			//----------------------------------------------------------------------------
			// assign the DeviceGroup	to the SoftwareUpdateCampaign
			//----------------------------------------------------------------------------
			parentObj.DeviceGroup = &childObj

			//----------------------------------------------------------------------------
			// save the SoftwareUpdateCampaign
			//----------------------------------------------------------------------------
			return UpdateSoftwareUpdateCampaign(parentObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "DeviceGroup", deviceGroupId )
			return utils.RequestResult{false, msg, "assignDeviceGroup", childObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a DeviceGroup on a SoftwareUpdateCampaign
//----------------------------------------------------------------------------
func UnassignDeviceGroupFromSoftwareUpdateCampaign(softwareUpdateCampaignId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the SoftwareUpdateCampaign with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetSoftwareUpdateCampaign(softwareUpdateCampaignId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.SoftwareUpdateCampaign so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.SoftwareUpdateCampaign)

		//----------------------------------------------------------------------------
		// assign an empty DeviceGroup to the DeviceGroup
		//----------------------------------------------------------------------------
		parentObj.DeviceGroup = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the DeviceGroup
		//----------------------------------------------------------------------------
		parentObj.DeviceGroupId = nil;

		//----------------------------------------------------------------------------
		// save the SoftwareUpdateCampaign
		//----------------------------------------------------------------------------
		return UpdateSoftwareUpdateCampaign(parentObj)

	} else {
		return parentRequestResult
	}

}


//----------------------------------------------------------------------------
// adds one or more executionsIds as a Executions to a SoftwareUpdateCampaign
//----------------------------------------------------------------------------
func AddExecutionsToSoftwareUpdateCampaign ( softwareUpdateCampaignId uint64, executionsIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the SoftwareUpdateCampaign with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetSoftwareUpdateCampaign(softwareUpdateCampaignId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.SoftwareUpdateCampaign so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.SoftwareUpdateCampaign)

		// slice the ids on comma with no spaces
		ids := strings.Split( executionsIds, ",")

		for _, executionsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.SoftwareUpdateExecution

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a SoftwareUpdateExecution
			// with a matching executionsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , executionsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the Executions using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("Executions").Append( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Executions", executionsId )
				return utils.RequestResult{false, msg, "unassignExecutions", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified SoftwareUpdateCampaign from the gorm
		//----------------------------------------------------------------------------
		return GetSoftwareUpdateCampaign(softwareUpdateCampaignId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more executionsIds as a Executions from a SoftwareUpdateCampaign
//----------------------------------------------------------------------------
func RemoveExecutionsFromSoftwareUpdateCampaign( softwareUpdateCampaignId uint64, executionsIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the SoftwareUpdateCampaign with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetSoftwareUpdateCampaign(softwareUpdateCampaignId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.SoftwareUpdateCampaign so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.SoftwareUpdateCampaign)

		// slice the ids on comma with no spaces
		ids := strings.Split( executionsIds, ",")

		for _, executionsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.SoftwareUpdateExecution

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a SoftwareUpdateExecution
			// with a matching executionsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , executionsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove SoftwareUpdateExecutionObj from the Executions array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("Executions").Delete( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Executions", executionsId )
				return utils.RequestResult{false, msg, "removeExecutions", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified SoftwareUpdateCampaign from the gorm
		//----------------------------------------------------------------------------
		return GetSoftwareUpdateCampaign(softwareUpdateCampaignId)

	} else {
		return parentRequestResult
	}
}

