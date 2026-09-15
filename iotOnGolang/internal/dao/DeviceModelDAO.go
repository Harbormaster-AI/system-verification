
package dao

import (
    "iotOnGolang/internal/model"
    "iotOnGolang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing DeviceModelDAO..." ) )
}

//----------------------------------------------------------------------------
// CreateDeviceModel - creates a new db entry
//----------------------------------------------------------------------------
func CreateDeviceModel(obj model.DeviceModel)(utils.RequestResult){
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
	    createMsg = fmt.Sprintf( "Created a DeviceModel with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a DeviceModel", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreateDeviceModel", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetDeviceModel - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetDeviceModel(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.DeviceModel

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a DeviceModel with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a DeviceModel using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a DeviceModel using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetDeviceModel", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllDeviceModel - returns all
//----------------------------------------------------------------------------
func GetAllDeviceModel()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.DeviceModel

	//----------------------------------------------------------------------------
	// Request the ORM to find all DeviceModel
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all DeviceModel" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all DeviceModel", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllDeviceModel", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdateDeviceModel - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdateDeviceModel(obj model.DeviceModel)(requestResult utils.RequestResult){
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
	    updateMsg = fmt.Sprintf( "Updated a DeviceModel using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a DeviceModel using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdateDeviceModel", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeleteDeviceModel - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeleteDeviceModel(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the DeviceModel with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetDeviceModel(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.DeviceModel so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.DeviceModel)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a DeviceModel using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a DeviceModel using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeleteDeviceModel", requestResult.Data}

	}

	return requestResult
}


//----------------------------------------------------------------------------
// assigns a Vendor on a DeviceModel
//----------------------------------------------------------------------------
func AssignVendorToDeviceModel( deviceModelId uint64, vendorId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the DeviceModel with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetDeviceModel(deviceModelId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.DeviceModel so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.DeviceModel)

		//----------------------------------------------------------------------------
		// Pass the reference to the ORM to get
		//----------------------------------------------------------------------------
		var childObj model.DeviceVendor

		//----------------------------------------------------------------------------
		// Retrieve the 1st occurrence from the ORM of a DeviceVendor with a
		// matching vendorId
		//----------------------------------------------------------------------------
		childRequestResult := utils.GetDB().First(&childObj, vendorId).Error // find first using identifier

		if childRequestResult == nil {
			//----------------------------------------------------------------------------
			// assign the Vendor	to the DeviceModel
			//----------------------------------------------------------------------------
			parentObj.Vendor = &childObj

			//----------------------------------------------------------------------------
			// save the DeviceModel
			//----------------------------------------------------------------------------
			return UpdateDeviceModel(parentObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Vendor", vendorId )
			return utils.RequestResult{false, msg, "assignVendor", childObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Vendor on a DeviceModel
//----------------------------------------------------------------------------
func UnassignVendorFromDeviceModel(deviceModelId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the DeviceModel with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetDeviceModel(deviceModelId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.DeviceModel so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.DeviceModel)

		//----------------------------------------------------------------------------
		// assign an empty DeviceVendor to the Vendor
		//----------------------------------------------------------------------------
		parentObj.Vendor = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Vendor
		//----------------------------------------------------------------------------
		parentObj.VendorId = nil;

		//----------------------------------------------------------------------------
		// save the DeviceModel
		//----------------------------------------------------------------------------
		return UpdateDeviceModel(parentObj)

	} else {
		return parentRequestResult
	}

}

//----------------------------------------------------------------------------
// assigns a TwinTemplate on a DeviceModel
//----------------------------------------------------------------------------
func AssignTwinTemplateToDeviceModel( deviceModelId uint64, twinTemplateId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the DeviceModel with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetDeviceModel(deviceModelId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.DeviceModel so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.DeviceModel)

		//----------------------------------------------------------------------------
		// Pass the reference to the ORM to get
		//----------------------------------------------------------------------------
		var childObj model.TwinTemplate

		//----------------------------------------------------------------------------
		// Retrieve the 1st occurrence from the ORM of a TwinTemplate with a
		// matching twinTemplateId
		//----------------------------------------------------------------------------
		childRequestResult := utils.GetDB().First(&childObj, twinTemplateId).Error // find first using identifier

		if childRequestResult == nil {
			//----------------------------------------------------------------------------
			// assign the TwinTemplate	to the DeviceModel
			//----------------------------------------------------------------------------
			parentObj.TwinTemplate = &childObj

			//----------------------------------------------------------------------------
			// save the DeviceModel
			//----------------------------------------------------------------------------
			return UpdateDeviceModel(parentObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "TwinTemplate", twinTemplateId )
			return utils.RequestResult{false, msg, "assignTwinTemplate", childObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a TwinTemplate on a DeviceModel
//----------------------------------------------------------------------------
func UnassignTwinTemplateFromDeviceModel(deviceModelId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the DeviceModel with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetDeviceModel(deviceModelId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.DeviceModel so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.DeviceModel)

		//----------------------------------------------------------------------------
		// assign an empty TwinTemplate to the TwinTemplate
		//----------------------------------------------------------------------------
		parentObj.TwinTemplate = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the TwinTemplate
		//----------------------------------------------------------------------------
		parentObj.TwinTemplateId = nil;

		//----------------------------------------------------------------------------
		// save the DeviceModel
		//----------------------------------------------------------------------------
		return UpdateDeviceModel(parentObj)

	} else {
		return parentRequestResult
	}

}


//----------------------------------------------------------------------------
// adds one or more hardwareModulesIds as a HardwareModules to a DeviceModel
//----------------------------------------------------------------------------
func AddHardwareModulesToDeviceModel ( deviceModelId uint64, hardwareModulesIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the DeviceModel with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetDeviceModel(deviceModelId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.DeviceModel so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.DeviceModel)

		// slice the ids on comma with no spaces
		ids := strings.Split( hardwareModulesIds, ",")

		for _, hardwareModulesId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.HardwareModule

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a HardwareModule
			// with a matching hardwareModulesId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , hardwareModulesId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the HardwareModules using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("HardwareModules").Append( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "HardwareModules", hardwareModulesId )
				return utils.RequestResult{false, msg, "unassignHardwareModules", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified DeviceModel from the gorm
		//----------------------------------------------------------------------------
		return GetDeviceModel(deviceModelId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more hardwareModulesIds as a HardwareModules from a DeviceModel
//----------------------------------------------------------------------------
func RemoveHardwareModulesFromDeviceModel( deviceModelId uint64, hardwareModulesIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the DeviceModel with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetDeviceModel(deviceModelId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.DeviceModel so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.DeviceModel)

		// slice the ids on comma with no spaces
		ids := strings.Split( hardwareModulesIds, ",")

		for _, hardwareModulesId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.HardwareModule

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a HardwareModule
			// with a matching hardwareModulesId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , hardwareModulesId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove HardwareModuleObj from the HardwareModules array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("HardwareModules").Delete( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "HardwareModules", hardwareModulesId )
				return utils.RequestResult{false, msg, "removeHardwareModules", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified DeviceModel from the gorm
		//----------------------------------------------------------------------------
		return GetDeviceModel(deviceModelId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// adds one or more firmwareReleasesIds as a FirmwareReleases to a DeviceModel
//----------------------------------------------------------------------------
func AddFirmwareReleasesToDeviceModel ( deviceModelId uint64, firmwareReleasesIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the DeviceModel with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetDeviceModel(deviceModelId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.DeviceModel so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.DeviceModel)

		// slice the ids on comma with no spaces
		ids := strings.Split( firmwareReleasesIds, ",")

		for _, firmwareReleasesId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.FirmwareRelease

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a FirmwareRelease
			// with a matching firmwareReleasesId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , firmwareReleasesId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the FirmwareReleases using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("FirmwareReleases").Append( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "FirmwareReleases", firmwareReleasesId )
				return utils.RequestResult{false, msg, "unassignFirmwareReleases", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified DeviceModel from the gorm
		//----------------------------------------------------------------------------
		return GetDeviceModel(deviceModelId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more firmwareReleasesIds as a FirmwareReleases from a DeviceModel
//----------------------------------------------------------------------------
func RemoveFirmwareReleasesFromDeviceModel( deviceModelId uint64, firmwareReleasesIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the DeviceModel with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetDeviceModel(deviceModelId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.DeviceModel so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.DeviceModel)

		// slice the ids on comma with no spaces
		ids := strings.Split( firmwareReleasesIds, ",")

		for _, firmwareReleasesId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.FirmwareRelease

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a FirmwareRelease
			// with a matching firmwareReleasesId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , firmwareReleasesId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove FirmwareReleaseObj from the FirmwareReleases array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("FirmwareReleases").Delete( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "FirmwareReleases", firmwareReleasesId )
				return utils.RequestResult{false, msg, "removeFirmwareReleases", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified DeviceModel from the gorm
		//----------------------------------------------------------------------------
		return GetDeviceModel(deviceModelId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// adds one or more commandDefinitionsIds as a CommandDefinitions to a DeviceModel
//----------------------------------------------------------------------------
func AddCommandDefinitionsToDeviceModel ( deviceModelId uint64, commandDefinitionsIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the DeviceModel with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetDeviceModel(deviceModelId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.DeviceModel so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.DeviceModel)

		// slice the ids on comma with no spaces
		ids := strings.Split( commandDefinitionsIds, ",")

		for _, commandDefinitionsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.CommandDefinition

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a CommandDefinition
			// with a matching commandDefinitionsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , commandDefinitionsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the CommandDefinitions using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("CommandDefinitions").Append( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "CommandDefinitions", commandDefinitionsId )
				return utils.RequestResult{false, msg, "unassignCommandDefinitions", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified DeviceModel from the gorm
		//----------------------------------------------------------------------------
		return GetDeviceModel(deviceModelId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more commandDefinitionsIds as a CommandDefinitions from a DeviceModel
//----------------------------------------------------------------------------
func RemoveCommandDefinitionsFromDeviceModel( deviceModelId uint64, commandDefinitionsIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the DeviceModel with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetDeviceModel(deviceModelId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.DeviceModel so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.DeviceModel)

		// slice the ids on comma with no spaces
		ids := strings.Split( commandDefinitionsIds, ",")

		for _, commandDefinitionsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.CommandDefinition

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a CommandDefinition
			// with a matching commandDefinitionsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , commandDefinitionsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove CommandDefinitionObj from the CommandDefinitions array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("CommandDefinitions").Delete( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "CommandDefinitions", commandDefinitionsId )
				return utils.RequestResult{false, msg, "removeCommandDefinitions", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified DeviceModel from the gorm
		//----------------------------------------------------------------------------
		return GetDeviceModel(deviceModelId)

	} else {
		return parentRequestResult
	}
}

