package dao

import (
    "iotOnGolang/internal/model"
    "iotOnGolang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing CommandInvocationDAO..." ) )
}

//----------------------------------------------------------------------------
// CreateCommandInvocation - creates a new db entry
//----------------------------------------------------------------------------
func CreateCommandInvocation(obj model.CommandInvocation)(utils.RequestResult){
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
	    createMsg = fmt.Sprintf( "Created a CommandInvocation with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a CommandInvocation", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreateCommandInvocation", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetCommandInvocation - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetCommandInvocation(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.CommandInvocation

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a CommandInvocation with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a CommandInvocation using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a CommandInvocation using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetCommandInvocation", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllCommandInvocation - returns all
//----------------------------------------------------------------------------
func GetAllCommandInvocation()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.CommandInvocation

	//----------------------------------------------------------------------------
	// Request the ORM to find all CommandInvocation
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all CommandInvocation" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all CommandInvocation", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllCommandInvocation", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdateCommandInvocation - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdateCommandInvocation(obj model.CommandInvocation)(requestResult utils.RequestResult){
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
	    updateMsg = fmt.Sprintf( "Updated a CommandInvocation using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a CommandInvocation using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdateCommandInvocation", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeleteCommandInvocation - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeleteCommandInvocation(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the CommandInvocation with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetCommandInvocation(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.CommandInvocation so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.CommandInvocation)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a CommandInvocation using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a CommandInvocation using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeleteCommandInvocation", requestResult.Data}

	}

	return requestResult
}


//----------------------------------------------------------------------------
// assigns a Device on a CommandInvocation
//----------------------------------------------------------------------------
func AssignDeviceToCommandInvocation( commandInvocationId uint64, deviceId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the CommandInvocation with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetCommandInvocation(commandInvocationId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.CommandInvocation so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.CommandInvocation)

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
			// assign the Device	to the CommandInvocation
			//----------------------------------------------------------------------------
			parentObj.Device = &childObj

			//----------------------------------------------------------------------------
			// save the CommandInvocation
			//----------------------------------------------------------------------------
			return UpdateCommandInvocation(parentObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Device", deviceId )
			return utils.RequestResult{false, msg, "assignDevice", childObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Device on a CommandInvocation
//----------------------------------------------------------------------------
func UnassignDeviceFromCommandInvocation(commandInvocationId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the CommandInvocation with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetCommandInvocation(commandInvocationId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.CommandInvocation so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.CommandInvocation)

		//----------------------------------------------------------------------------
		// assign an empty IoTDevice to the Device
		//----------------------------------------------------------------------------
		parentObj.Device = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Device
		//----------------------------------------------------------------------------
		parentObj.DeviceId = nil;

		//----------------------------------------------------------------------------
		// save the CommandInvocation
		//----------------------------------------------------------------------------
		return UpdateCommandInvocation(parentObj)

	} else {
		return parentRequestResult
	}

}

//----------------------------------------------------------------------------
// assigns a CommandDefinition on a CommandInvocation
//----------------------------------------------------------------------------
func AssignCommandDefinitionToCommandInvocation( commandInvocationId uint64, commandDefinitionId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the CommandInvocation with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetCommandInvocation(commandInvocationId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.CommandInvocation so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.CommandInvocation)

		//----------------------------------------------------------------------------
		// Pass the reference to the ORM to get
		//----------------------------------------------------------------------------
		var childObj model.CommandDefinition

		//----------------------------------------------------------------------------
		// Retrieve the 1st occurrence from the ORM of a CommandDefinition with a
		// matching commandDefinitionId
		//----------------------------------------------------------------------------
		childRequestResult := utils.GetDB().First(&childObj, commandDefinitionId).Error // find first using identifier

		if childRequestResult == nil {
			//----------------------------------------------------------------------------
			// assign the CommandDefinition	to the CommandInvocation
			//----------------------------------------------------------------------------
			parentObj.CommandDefinition = &childObj

			//----------------------------------------------------------------------------
			// save the CommandInvocation
			//----------------------------------------------------------------------------
			return UpdateCommandInvocation(parentObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "CommandDefinition", commandDefinitionId )
			return utils.RequestResult{false, msg, "assignCommandDefinition", childObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a CommandDefinition on a CommandInvocation
//----------------------------------------------------------------------------
func UnassignCommandDefinitionFromCommandInvocation(commandInvocationId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the CommandInvocation with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetCommandInvocation(commandInvocationId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.CommandInvocation so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.CommandInvocation)

		//----------------------------------------------------------------------------
		// assign an empty CommandDefinition to the CommandDefinition
		//----------------------------------------------------------------------------
		parentObj.CommandDefinition = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the CommandDefinition
		//----------------------------------------------------------------------------
		parentObj.CommandDefinitionId = nil;

		//----------------------------------------------------------------------------
		// save the CommandInvocation
		//----------------------------------------------------------------------------
		return UpdateCommandInvocation(parentObj)

	} else {
		return parentRequestResult
	}

}

//----------------------------------------------------------------------------
// assigns a Actuator on a CommandInvocation
//----------------------------------------------------------------------------
func AssignActuatorToCommandInvocation( commandInvocationId uint64, actuatorId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the CommandInvocation with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetCommandInvocation(commandInvocationId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.CommandInvocation so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.CommandInvocation)

		//----------------------------------------------------------------------------
		// Pass the reference to the ORM to get
		//----------------------------------------------------------------------------
		var childObj model.ActuatorInstance

		//----------------------------------------------------------------------------
		// Retrieve the 1st occurrence from the ORM of a ActuatorInstance with a
		// matching actuatorId
		//----------------------------------------------------------------------------
		childRequestResult := utils.GetDB().First(&childObj, actuatorId).Error // find first using identifier

		if childRequestResult == nil {
			//----------------------------------------------------------------------------
			// assign the Actuator	to the CommandInvocation
			//----------------------------------------------------------------------------
			parentObj.Actuator = &childObj

			//----------------------------------------------------------------------------
			// save the CommandInvocation
			//----------------------------------------------------------------------------
			return UpdateCommandInvocation(parentObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Actuator", actuatorId )
			return utils.RequestResult{false, msg, "assignActuator", childObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Actuator on a CommandInvocation
//----------------------------------------------------------------------------
func UnassignActuatorFromCommandInvocation(commandInvocationId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the CommandInvocation with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetCommandInvocation(commandInvocationId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.CommandInvocation so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.CommandInvocation)

		//----------------------------------------------------------------------------
		// assign an empty ActuatorInstance to the Actuator
		//----------------------------------------------------------------------------
		parentObj.Actuator = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Actuator
		//----------------------------------------------------------------------------
		parentObj.ActuatorId = nil;

		//----------------------------------------------------------------------------
		// save the CommandInvocation
		//----------------------------------------------------------------------------
		return UpdateCommandInvocation(parentObj)

	} else {
		return parentRequestResult
	}

}

//----------------------------------------------------------------------------
// assigns a User on a CommandInvocation
//----------------------------------------------------------------------------
func AssignUserToCommandInvocation( commandInvocationId uint64, userId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the CommandInvocation with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetCommandInvocation(commandInvocationId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.CommandInvocation so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.CommandInvocation)

		//----------------------------------------------------------------------------
		// Pass the reference to the ORM to get
		//----------------------------------------------------------------------------
		var childObj model.TenantUser

		//----------------------------------------------------------------------------
		// Retrieve the 1st occurrence from the ORM of a TenantUser with a
		// matching userId
		//----------------------------------------------------------------------------
		childRequestResult := utils.GetDB().First(&childObj, userId).Error // find first using identifier

		if childRequestResult == nil {
			//----------------------------------------------------------------------------
			// assign the User	to the CommandInvocation
			//----------------------------------------------------------------------------
			parentObj.User = &childObj

			//----------------------------------------------------------------------------
			// save the CommandInvocation
			//----------------------------------------------------------------------------
			return UpdateCommandInvocation(parentObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "User", userId )
			return utils.RequestResult{false, msg, "assignUser", childObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a User on a CommandInvocation
//----------------------------------------------------------------------------
func UnassignUserFromCommandInvocation(commandInvocationId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the CommandInvocation with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetCommandInvocation(commandInvocationId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.CommandInvocation so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.CommandInvocation)

		//----------------------------------------------------------------------------
		// assign an empty TenantUser to the User
		//----------------------------------------------------------------------------
		parentObj.User = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the User
		//----------------------------------------------------------------------------
		parentObj.UserId = nil;

		//----------------------------------------------------------------------------
		// save the CommandInvocation
		//----------------------------------------------------------------------------
		return UpdateCommandInvocation(parentObj)

	} else {
		return parentRequestResult
	}

}


