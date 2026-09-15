
package dao

import (
    "iotOnGolang/internal/model"
    "iotOnGolang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing DigitalTwinDAO..." ) )
}

//----------------------------------------------------------------------------
// CreateDigitalTwin - creates a new db entry
//----------------------------------------------------------------------------
func CreateDigitalTwin(obj model.DigitalTwin)(utils.RequestResult){
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
	    createMsg = fmt.Sprintf( "Created a DigitalTwin with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a DigitalTwin", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreateDigitalTwin", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetDigitalTwin - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetDigitalTwin(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.DigitalTwin

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a DigitalTwin with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a DigitalTwin using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a DigitalTwin using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetDigitalTwin", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllDigitalTwin - returns all
//----------------------------------------------------------------------------
func GetAllDigitalTwin()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.DigitalTwin

	//----------------------------------------------------------------------------
	// Request the ORM to find all DigitalTwin
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all DigitalTwin" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all DigitalTwin", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllDigitalTwin", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdateDigitalTwin - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdateDigitalTwin(obj model.DigitalTwin)(requestResult utils.RequestResult){
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
	    updateMsg = fmt.Sprintf( "Updated a DigitalTwin using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a DigitalTwin using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdateDigitalTwin", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeleteDigitalTwin - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeleteDigitalTwin(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the DigitalTwin with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetDigitalTwin(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.DigitalTwin so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.DigitalTwin)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a DigitalTwin using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a DigitalTwin using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeleteDigitalTwin", requestResult.Data}

	}

	return requestResult
}


//----------------------------------------------------------------------------
// assigns a Device on a DigitalTwin
//----------------------------------------------------------------------------
func AssignDeviceToDigitalTwin( digitalTwinId uint64, deviceId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the DigitalTwin with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetDigitalTwin(digitalTwinId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.DigitalTwin so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.DigitalTwin)

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
			// assign the Device	to the DigitalTwin
			//----------------------------------------------------------------------------
			parentObj.Device = &childObj

			//----------------------------------------------------------------------------
			// save the DigitalTwin
			//----------------------------------------------------------------------------
			return UpdateDigitalTwin(parentObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Device", deviceId )
			return utils.RequestResult{false, msg, "assignDevice", childObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Device on a DigitalTwin
//----------------------------------------------------------------------------
func UnassignDeviceFromDigitalTwin(digitalTwinId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the DigitalTwin with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetDigitalTwin(digitalTwinId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.DigitalTwin so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.DigitalTwin)

		//----------------------------------------------------------------------------
		// assign an empty IoTDevice to the Device
		//----------------------------------------------------------------------------
		parentObj.Device = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Device
		//----------------------------------------------------------------------------
		parentObj.DeviceId = nil;

		//----------------------------------------------------------------------------
		// save the DigitalTwin
		//----------------------------------------------------------------------------
		return UpdateDigitalTwin(parentObj)

	} else {
		return parentRequestResult
	}

}

//----------------------------------------------------------------------------
// assigns a Gateway on a DigitalTwin
//----------------------------------------------------------------------------
func AssignGatewayToDigitalTwin( digitalTwinId uint64, gatewayId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the DigitalTwin with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetDigitalTwin(digitalTwinId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.DigitalTwin so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.DigitalTwin)

		//----------------------------------------------------------------------------
		// Pass the reference to the ORM to get
		//----------------------------------------------------------------------------
		var childObj model.Gateway

		//----------------------------------------------------------------------------
		// Retrieve the 1st occurrence from the ORM of a Gateway with a
		// matching gatewayId
		//----------------------------------------------------------------------------
		childRequestResult := utils.GetDB().First(&childObj, gatewayId).Error // find first using identifier

		if childRequestResult == nil {
			//----------------------------------------------------------------------------
			// assign the Gateway	to the DigitalTwin
			//----------------------------------------------------------------------------
			parentObj.Gateway = &childObj

			//----------------------------------------------------------------------------
			// save the DigitalTwin
			//----------------------------------------------------------------------------
			return UpdateDigitalTwin(parentObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Gateway", gatewayId )
			return utils.RequestResult{false, msg, "assignGateway", childObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Gateway on a DigitalTwin
//----------------------------------------------------------------------------
func UnassignGatewayFromDigitalTwin(digitalTwinId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the DigitalTwin with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetDigitalTwin(digitalTwinId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.DigitalTwin so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.DigitalTwin)

		//----------------------------------------------------------------------------
		// assign an empty Gateway to the Gateway
		//----------------------------------------------------------------------------
		parentObj.Gateway = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Gateway
		//----------------------------------------------------------------------------
		parentObj.GatewayId = nil;

		//----------------------------------------------------------------------------
		// save the DigitalTwin
		//----------------------------------------------------------------------------
		return UpdateDigitalTwin(parentObj)

	} else {
		return parentRequestResult
	}

}

//----------------------------------------------------------------------------
// assigns a Template on a DigitalTwin
//----------------------------------------------------------------------------
func AssignTemplateToDigitalTwin( digitalTwinId uint64, templateId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the DigitalTwin with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetDigitalTwin(digitalTwinId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.DigitalTwin so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.DigitalTwin)

		//----------------------------------------------------------------------------
		// Pass the reference to the ORM to get
		//----------------------------------------------------------------------------
		var childObj model.TwinTemplate

		//----------------------------------------------------------------------------
		// Retrieve the 1st occurrence from the ORM of a TwinTemplate with a
		// matching templateId
		//----------------------------------------------------------------------------
		childRequestResult := utils.GetDB().First(&childObj, templateId).Error // find first using identifier

		if childRequestResult == nil {
			//----------------------------------------------------------------------------
			// assign the Template	to the DigitalTwin
			//----------------------------------------------------------------------------
			parentObj.Template = &childObj

			//----------------------------------------------------------------------------
			// save the DigitalTwin
			//----------------------------------------------------------------------------
			return UpdateDigitalTwin(parentObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Template", templateId )
			return utils.RequestResult{false, msg, "assignTemplate", childObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Template on a DigitalTwin
//----------------------------------------------------------------------------
func UnassignTemplateFromDigitalTwin(digitalTwinId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the DigitalTwin with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetDigitalTwin(digitalTwinId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.DigitalTwin so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.DigitalTwin)

		//----------------------------------------------------------------------------
		// assign an empty TwinTemplate to the Template
		//----------------------------------------------------------------------------
		parentObj.Template = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Template
		//----------------------------------------------------------------------------
		parentObj.TemplateId = nil;

		//----------------------------------------------------------------------------
		// save the DigitalTwin
		//----------------------------------------------------------------------------
		return UpdateDigitalTwin(parentObj)

	} else {
		return parentRequestResult
	}

}


//----------------------------------------------------------------------------
// adds one or more changeEventsIds as a ChangeEvents to a DigitalTwin
//----------------------------------------------------------------------------
func AddChangeEventsToDigitalTwin ( digitalTwinId uint64, changeEventsIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the DigitalTwin with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetDigitalTwin(digitalTwinId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.DigitalTwin so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.DigitalTwin)

		// slice the ids on comma with no spaces
		ids := strings.Split( changeEventsIds, ",")

		for _, changeEventsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.TwinChangeEvent

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a TwinChangeEvent
			// with a matching changeEventsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , changeEventsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the ChangeEvents using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("ChangeEvents").Append( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "ChangeEvents", changeEventsId )
				return utils.RequestResult{false, msg, "unassignChangeEvents", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified DigitalTwin from the gorm
		//----------------------------------------------------------------------------
		return GetDigitalTwin(digitalTwinId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more changeEventsIds as a ChangeEvents from a DigitalTwin
//----------------------------------------------------------------------------
func RemoveChangeEventsFromDigitalTwin( digitalTwinId uint64, changeEventsIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the DigitalTwin with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetDigitalTwin(digitalTwinId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.DigitalTwin so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.DigitalTwin)

		// slice the ids on comma with no spaces
		ids := strings.Split( changeEventsIds, ",")

		for _, changeEventsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.TwinChangeEvent

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a TwinChangeEvent
			// with a matching changeEventsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , changeEventsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove TwinChangeEventObj from the ChangeEvents array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("ChangeEvents").Delete( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "ChangeEvents", changeEventsId )
				return utils.RequestResult{false, msg, "removeChangeEvents", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified DigitalTwin from the gorm
		//----------------------------------------------------------------------------
		return GetDigitalTwin(digitalTwinId)

	} else {
		return parentRequestResult
	}
}

