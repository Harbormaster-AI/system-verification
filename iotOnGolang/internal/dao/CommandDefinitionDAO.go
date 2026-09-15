
package dao

import (
    "iotOnGolang/internal/model"
    "iotOnGolang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing CommandDefinitionDAO..." ) )
}

//----------------------------------------------------------------------------
// CreateCommandDefinition - creates a new db entry
//----------------------------------------------------------------------------
func CreateCommandDefinition(obj model.CommandDefinition)(utils.RequestResult){
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
	    createMsg = fmt.Sprintf( "Created a CommandDefinition with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a CommandDefinition", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreateCommandDefinition", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetCommandDefinition - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetCommandDefinition(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.CommandDefinition

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a CommandDefinition with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a CommandDefinition using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a CommandDefinition using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetCommandDefinition", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllCommandDefinition - returns all
//----------------------------------------------------------------------------
func GetAllCommandDefinition()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.CommandDefinition

	//----------------------------------------------------------------------------
	// Request the ORM to find all CommandDefinition
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all CommandDefinition" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all CommandDefinition", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllCommandDefinition", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdateCommandDefinition - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdateCommandDefinition(obj model.CommandDefinition)(requestResult utils.RequestResult){
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
	    updateMsg = fmt.Sprintf( "Updated a CommandDefinition using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a CommandDefinition using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdateCommandDefinition", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeleteCommandDefinition - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeleteCommandDefinition(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the CommandDefinition with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetCommandDefinition(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.CommandDefinition so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.CommandDefinition)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a CommandDefinition using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a CommandDefinition using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeleteCommandDefinition", requestResult.Data}

	}

	return requestResult
}


//----------------------------------------------------------------------------
// assigns a DeviceModel on a CommandDefinition
//----------------------------------------------------------------------------
func AssignDeviceModelToCommandDefinition( commandDefinitionId uint64, deviceModelId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the CommandDefinition with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetCommandDefinition(commandDefinitionId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.CommandDefinition so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.CommandDefinition)

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
			// assign the DeviceModel	to the CommandDefinition
			//----------------------------------------------------------------------------
			parentObj.DeviceModel = &childObj

			//----------------------------------------------------------------------------
			// save the CommandDefinition
			//----------------------------------------------------------------------------
			return UpdateCommandDefinition(parentObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "DeviceModel", deviceModelId )
			return utils.RequestResult{false, msg, "assignDeviceModel", childObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a DeviceModel on a CommandDefinition
//----------------------------------------------------------------------------
func UnassignDeviceModelFromCommandDefinition(commandDefinitionId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the CommandDefinition with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetCommandDefinition(commandDefinitionId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.CommandDefinition so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.CommandDefinition)

		//----------------------------------------------------------------------------
		// assign an empty DeviceModel to the DeviceModel
		//----------------------------------------------------------------------------
		parentObj.DeviceModel = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the DeviceModel
		//----------------------------------------------------------------------------
		parentObj.DeviceModelId = nil;

		//----------------------------------------------------------------------------
		// save the CommandDefinition
		//----------------------------------------------------------------------------
		return UpdateCommandDefinition(parentObj)

	} else {
		return parentRequestResult
	}

}


//----------------------------------------------------------------------------
// adds one or more actuatorsIds as a Actuators to a CommandDefinition
//----------------------------------------------------------------------------
func AddActuatorsToCommandDefinition ( commandDefinitionId uint64, actuatorsIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the CommandDefinition with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetCommandDefinition(commandDefinitionId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.CommandDefinition so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.CommandDefinition)

		// slice the ids on comma with no spaces
		ids := strings.Split( actuatorsIds, ",")

		for _, actuatorsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.ActuatorInstance

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a ActuatorInstance
			// with a matching actuatorsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , actuatorsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the Actuators using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("Actuators").Append( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Actuators", actuatorsId )
				return utils.RequestResult{false, msg, "unassignActuators", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified CommandDefinition from the gorm
		//----------------------------------------------------------------------------
		return GetCommandDefinition(commandDefinitionId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more actuatorsIds as a Actuators from a CommandDefinition
//----------------------------------------------------------------------------
func RemoveActuatorsFromCommandDefinition( commandDefinitionId uint64, actuatorsIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the CommandDefinition with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetCommandDefinition(commandDefinitionId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.CommandDefinition so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.CommandDefinition)

		// slice the ids on comma with no spaces
		ids := strings.Split( actuatorsIds, ",")

		for _, actuatorsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.ActuatorInstance

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a ActuatorInstance
			// with a matching actuatorsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , actuatorsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove ActuatorInstanceObj from the Actuators array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("Actuators").Delete( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Actuators", actuatorsId )
				return utils.RequestResult{false, msg, "removeActuators", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified CommandDefinition from the gorm
		//----------------------------------------------------------------------------
		return GetCommandDefinition(commandDefinitionId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// adds one or more commandInvocationsIds as a CommandInvocations to a CommandDefinition
//----------------------------------------------------------------------------
func AddCommandInvocationsToCommandDefinition ( commandDefinitionId uint64, commandInvocationsIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the CommandDefinition with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetCommandDefinition(commandDefinitionId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.CommandDefinition so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.CommandDefinition)

		// slice the ids on comma with no spaces
		ids := strings.Split( commandInvocationsIds, ",")

		for _, commandInvocationsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.CommandInvocation

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a CommandInvocation
			// with a matching commandInvocationsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , commandInvocationsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the CommandInvocations using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("CommandInvocations").Append( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "CommandInvocations", commandInvocationsId )
				return utils.RequestResult{false, msg, "unassignCommandInvocations", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified CommandDefinition from the gorm
		//----------------------------------------------------------------------------
		return GetCommandDefinition(commandDefinitionId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more commandInvocationsIds as a CommandInvocations from a CommandDefinition
//----------------------------------------------------------------------------
func RemoveCommandInvocationsFromCommandDefinition( commandDefinitionId uint64, commandInvocationsIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the CommandDefinition with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetCommandDefinition(commandDefinitionId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.CommandDefinition so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.CommandDefinition)

		// slice the ids on comma with no spaces
		ids := strings.Split( commandInvocationsIds, ",")

		for _, commandInvocationsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.CommandInvocation

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a CommandInvocation
			// with a matching commandInvocationsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , commandInvocationsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove CommandInvocationObj from the CommandInvocations array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("CommandInvocations").Delete( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "CommandInvocations", commandInvocationsId )
				return utils.RequestResult{false, msg, "removeCommandInvocations", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified CommandDefinition from the gorm
		//----------------------------------------------------------------------------
		return GetCommandDefinition(commandDefinitionId)

	} else {
		return parentRequestResult
	}
}

