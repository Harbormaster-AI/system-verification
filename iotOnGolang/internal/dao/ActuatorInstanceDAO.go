package dao

import (
    "iotOnGolang/internal/model"
    "iotOnGolang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing ActuatorInstanceDAO..." ) )
}

//----------------------------------------------------------------------------
// CreateActuatorInstance - creates a new db entry
//----------------------------------------------------------------------------
func CreateActuatorInstance(obj model.ActuatorInstance)(utils.RequestResult){
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
	    createMsg = fmt.Sprintf( "Created a ActuatorInstance with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a ActuatorInstance", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreateActuatorInstance", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetActuatorInstance - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetActuatorInstance(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.ActuatorInstance

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a ActuatorInstance with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a ActuatorInstance using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a ActuatorInstance using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetActuatorInstance", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllActuatorInstance - returns all
//----------------------------------------------------------------------------
func GetAllActuatorInstance()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.ActuatorInstance

	//----------------------------------------------------------------------------
	// Request the ORM to find all ActuatorInstance
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all ActuatorInstance" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all ActuatorInstance", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllActuatorInstance", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdateActuatorInstance - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdateActuatorInstance(obj model.ActuatorInstance)(requestResult utils.RequestResult){
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
	    updateMsg = fmt.Sprintf( "Updated a ActuatorInstance using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a ActuatorInstance using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdateActuatorInstance", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeleteActuatorInstance - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeleteActuatorInstance(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the ActuatorInstance with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetActuatorInstance(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.ActuatorInstance so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.ActuatorInstance)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a ActuatorInstance using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a ActuatorInstance using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeleteActuatorInstance", requestResult.Data}

	}

	return requestResult
}


//----------------------------------------------------------------------------
// assigns a Device on a ActuatorInstance
//----------------------------------------------------------------------------
func AssignDeviceToActuatorInstance( actuatorInstanceId uint64, deviceId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the ActuatorInstance with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetActuatorInstance(actuatorInstanceId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.ActuatorInstance so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.ActuatorInstance)

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
			// assign the Device	to the ActuatorInstance
			//----------------------------------------------------------------------------
			parentObj.Device = &childObj

			//----------------------------------------------------------------------------
			// save the ActuatorInstance
			//----------------------------------------------------------------------------
			return UpdateActuatorInstance(parentObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Device", deviceId )
			return utils.RequestResult{false, msg, "assignDevice", childObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Device on a ActuatorInstance
//----------------------------------------------------------------------------
func UnassignDeviceFromActuatorInstance(actuatorInstanceId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the ActuatorInstance with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetActuatorInstance(actuatorInstanceId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.ActuatorInstance so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.ActuatorInstance)

		//----------------------------------------------------------------------------
		// assign an empty IoTDevice to the Device
		//----------------------------------------------------------------------------
		parentObj.Device = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Device
		//----------------------------------------------------------------------------
		parentObj.DeviceId = nil;

		//----------------------------------------------------------------------------
		// save the ActuatorInstance
		//----------------------------------------------------------------------------
		return UpdateActuatorInstance(parentObj)

	} else {
		return parentRequestResult
	}

}


//----------------------------------------------------------------------------
// adds one or more supportedCommandsIds as a SupportedCommands to a ActuatorInstance
//----------------------------------------------------------------------------
func AddSupportedCommandsToActuatorInstance ( actuatorInstanceId uint64, supportedCommandsIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the ActuatorInstance with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetActuatorInstance(actuatorInstanceId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.ActuatorInstance so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.ActuatorInstance)

		// slice the ids on comma with no spaces
		ids := strings.Split( supportedCommandsIds, ",")

		for _, supportedCommandsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.CommandDefinition

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a CommandDefinition
			// with a matching supportedCommandsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , supportedCommandsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the SupportedCommands using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("SupportedCommands").Append( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "SupportedCommands", supportedCommandsId )
				return utils.RequestResult{false, msg, "unassignSupportedCommands", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified ActuatorInstance from the gorm
		//----------------------------------------------------------------------------
		return GetActuatorInstance(actuatorInstanceId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more supportedCommandsIds as a SupportedCommands from a ActuatorInstance
//----------------------------------------------------------------------------
func RemoveSupportedCommandsFromActuatorInstance( actuatorInstanceId uint64, supportedCommandsIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the ActuatorInstance with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetActuatorInstance(actuatorInstanceId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.ActuatorInstance so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.ActuatorInstance)

		// slice the ids on comma with no spaces
		ids := strings.Split( supportedCommandsIds, ",")

		for _, supportedCommandsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.CommandDefinition

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a CommandDefinition
			// with a matching supportedCommandsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , supportedCommandsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove CommandDefinitionObj from the SupportedCommands array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("SupportedCommands").Delete( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "SupportedCommands", supportedCommandsId )
				return utils.RequestResult{false, msg, "removeSupportedCommands", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified ActuatorInstance from the gorm
		//----------------------------------------------------------------------------
		return GetActuatorInstance(actuatorInstanceId)

	} else {
		return parentRequestResult
	}
}

