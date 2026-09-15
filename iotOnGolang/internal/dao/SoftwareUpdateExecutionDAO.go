
package dao

import (
    "iotOnGolang/internal/model"
    "iotOnGolang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing SoftwareUpdateExecutionDAO..." ) )
}

//----------------------------------------------------------------------------
// CreateSoftwareUpdateExecution - creates a new db entry
//----------------------------------------------------------------------------
func CreateSoftwareUpdateExecution(obj model.SoftwareUpdateExecution)(utils.RequestResult){
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
	    createMsg = fmt.Sprintf( "Created a SoftwareUpdateExecution with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a SoftwareUpdateExecution", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreateSoftwareUpdateExecution", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetSoftwareUpdateExecution - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetSoftwareUpdateExecution(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.SoftwareUpdateExecution

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a SoftwareUpdateExecution with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a SoftwareUpdateExecution using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a SoftwareUpdateExecution using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetSoftwareUpdateExecution", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllSoftwareUpdateExecution - returns all
//----------------------------------------------------------------------------
func GetAllSoftwareUpdateExecution()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.SoftwareUpdateExecution

	//----------------------------------------------------------------------------
	// Request the ORM to find all SoftwareUpdateExecution
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all SoftwareUpdateExecution" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all SoftwareUpdateExecution", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllSoftwareUpdateExecution", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdateSoftwareUpdateExecution - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdateSoftwareUpdateExecution(obj model.SoftwareUpdateExecution)(requestResult utils.RequestResult){
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
	    updateMsg = fmt.Sprintf( "Updated a SoftwareUpdateExecution using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a SoftwareUpdateExecution using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdateSoftwareUpdateExecution", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeleteSoftwareUpdateExecution - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeleteSoftwareUpdateExecution(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the SoftwareUpdateExecution with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetSoftwareUpdateExecution(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.SoftwareUpdateExecution so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.SoftwareUpdateExecution)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a SoftwareUpdateExecution using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a SoftwareUpdateExecution using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeleteSoftwareUpdateExecution", requestResult.Data}

	}

	return requestResult
}


//----------------------------------------------------------------------------
// assigns a Campaign on a SoftwareUpdateExecution
//----------------------------------------------------------------------------
func AssignCampaignToSoftwareUpdateExecution( softwareUpdateExecutionId uint64, campaignId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the SoftwareUpdateExecution with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetSoftwareUpdateExecution(softwareUpdateExecutionId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.SoftwareUpdateExecution so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.SoftwareUpdateExecution)

		//----------------------------------------------------------------------------
		// Pass the reference to the ORM to get
		//----------------------------------------------------------------------------
		var childObj model.SoftwareUpdateCampaign

		//----------------------------------------------------------------------------
		// Retrieve the 1st occurrence from the ORM of a SoftwareUpdateCampaign with a
		// matching campaignId
		//----------------------------------------------------------------------------
		childRequestResult := utils.GetDB().First(&childObj, campaignId).Error // find first using identifier

		if childRequestResult == nil {
			//----------------------------------------------------------------------------
			// assign the Campaign	to the SoftwareUpdateExecution
			//----------------------------------------------------------------------------
			parentObj.Campaign = &childObj

			//----------------------------------------------------------------------------
			// save the SoftwareUpdateExecution
			//----------------------------------------------------------------------------
			return UpdateSoftwareUpdateExecution(parentObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Campaign", campaignId )
			return utils.RequestResult{false, msg, "assignCampaign", childObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Campaign on a SoftwareUpdateExecution
//----------------------------------------------------------------------------
func UnassignCampaignFromSoftwareUpdateExecution(softwareUpdateExecutionId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the SoftwareUpdateExecution with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetSoftwareUpdateExecution(softwareUpdateExecutionId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.SoftwareUpdateExecution so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.SoftwareUpdateExecution)

		//----------------------------------------------------------------------------
		// assign an empty SoftwareUpdateCampaign to the Campaign
		//----------------------------------------------------------------------------
		parentObj.Campaign = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Campaign
		//----------------------------------------------------------------------------
		parentObj.CampaignId = nil;

		//----------------------------------------------------------------------------
		// save the SoftwareUpdateExecution
		//----------------------------------------------------------------------------
		return UpdateSoftwareUpdateExecution(parentObj)

	} else {
		return parentRequestResult
	}

}

//----------------------------------------------------------------------------
// assigns a Device on a SoftwareUpdateExecution
//----------------------------------------------------------------------------
func AssignDeviceToSoftwareUpdateExecution( softwareUpdateExecutionId uint64, deviceId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the SoftwareUpdateExecution with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetSoftwareUpdateExecution(softwareUpdateExecutionId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.SoftwareUpdateExecution so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.SoftwareUpdateExecution)

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
			// assign the Device	to the SoftwareUpdateExecution
			//----------------------------------------------------------------------------
			parentObj.Device = &childObj

			//----------------------------------------------------------------------------
			// save the SoftwareUpdateExecution
			//----------------------------------------------------------------------------
			return UpdateSoftwareUpdateExecution(parentObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Device", deviceId )
			return utils.RequestResult{false, msg, "assignDevice", childObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Device on a SoftwareUpdateExecution
//----------------------------------------------------------------------------
func UnassignDeviceFromSoftwareUpdateExecution(softwareUpdateExecutionId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the SoftwareUpdateExecution with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetSoftwareUpdateExecution(softwareUpdateExecutionId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.SoftwareUpdateExecution so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.SoftwareUpdateExecution)

		//----------------------------------------------------------------------------
		// assign an empty IoTDevice to the Device
		//----------------------------------------------------------------------------
		parentObj.Device = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Device
		//----------------------------------------------------------------------------
		parentObj.DeviceId = nil;

		//----------------------------------------------------------------------------
		// save the SoftwareUpdateExecution
		//----------------------------------------------------------------------------
		return UpdateSoftwareUpdateExecution(parentObj)

	} else {
		return parentRequestResult
	}

}


