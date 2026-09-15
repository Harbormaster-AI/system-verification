
package dao

import (
    "iotOnGolang/internal/model"
    "iotOnGolang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing AlertDAO..." ) )
}

//----------------------------------------------------------------------------
// CreateAlert - creates a new db entry
//----------------------------------------------------------------------------
func CreateAlert(obj model.Alert)(utils.RequestResult){
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
	    createMsg = fmt.Sprintf( "Created a Alert with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a Alert", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreateAlert", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetAlert - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetAlert(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.Alert

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a Alert with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a Alert using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a Alert using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetAlert", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllAlert - returns all
//----------------------------------------------------------------------------
func GetAllAlert()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.Alert

	//----------------------------------------------------------------------------
	// Request the ORM to find all Alert
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all Alert" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all Alert", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllAlert", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdateAlert - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdateAlert(obj model.Alert)(requestResult utils.RequestResult){
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
	    updateMsg = fmt.Sprintf( "Updated a Alert using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a Alert using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdateAlert", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeleteAlert - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeleteAlert(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the Alert with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetAlert(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Alert so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.Alert)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a Alert using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a Alert using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeleteAlert", requestResult.Data}

	}

	return requestResult
}


//----------------------------------------------------------------------------
// assigns a Device on a Alert
//----------------------------------------------------------------------------
func AssignDeviceToAlert( alertId uint64, deviceId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the Alert with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetAlert(alertId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Alert so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.Alert)

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
			// assign the Device	to the Alert
			//----------------------------------------------------------------------------
			parentObj.Device = &childObj

			//----------------------------------------------------------------------------
			// save the Alert
			//----------------------------------------------------------------------------
			return UpdateAlert(parentObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Device", deviceId )
			return utils.RequestResult{false, msg, "assignDevice", childObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Device on a Alert
//----------------------------------------------------------------------------
func UnassignDeviceFromAlert(alertId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Alert with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetAlert(alertId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Alert so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.Alert)

		//----------------------------------------------------------------------------
		// assign an empty IoTDevice to the Device
		//----------------------------------------------------------------------------
		parentObj.Device = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Device
		//----------------------------------------------------------------------------
		parentObj.DeviceId = nil;

		//----------------------------------------------------------------------------
		// save the Alert
		//----------------------------------------------------------------------------
		return UpdateAlert(parentObj)

	} else {
		return parentRequestResult
	}

}

//----------------------------------------------------------------------------
// assigns a AlertRule on a Alert
//----------------------------------------------------------------------------
func AssignAlertRuleToAlert( alertId uint64, alertRuleId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the Alert with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetAlert(alertId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Alert so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.Alert)

		//----------------------------------------------------------------------------
		// Pass the reference to the ORM to get
		//----------------------------------------------------------------------------
		var childObj model.AlertRule

		//----------------------------------------------------------------------------
		// Retrieve the 1st occurrence from the ORM of a AlertRule with a
		// matching alertRuleId
		//----------------------------------------------------------------------------
		childRequestResult := utils.GetDB().First(&childObj, alertRuleId).Error // find first using identifier

		if childRequestResult == nil {
			//----------------------------------------------------------------------------
			// assign the AlertRule	to the Alert
			//----------------------------------------------------------------------------
			parentObj.AlertRule = &childObj

			//----------------------------------------------------------------------------
			// save the Alert
			//----------------------------------------------------------------------------
			return UpdateAlert(parentObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "AlertRule", alertRuleId )
			return utils.RequestResult{false, msg, "assignAlertRule", childObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a AlertRule on a Alert
//----------------------------------------------------------------------------
func UnassignAlertRuleFromAlert(alertId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Alert with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetAlert(alertId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Alert so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.Alert)

		//----------------------------------------------------------------------------
		// assign an empty AlertRule to the AlertRule
		//----------------------------------------------------------------------------
		parentObj.AlertRule = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the AlertRule
		//----------------------------------------------------------------------------
		parentObj.AlertRuleId = nil;

		//----------------------------------------------------------------------------
		// save the Alert
		//----------------------------------------------------------------------------
		return UpdateAlert(parentObj)

	} else {
		return parentRequestResult
	}

}


