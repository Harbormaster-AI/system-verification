package dao

import (
    "iotOnGolang/internal/model"
    "iotOnGolang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing DeviceVendorDAO..." ) )
}

//----------------------------------------------------------------------------
// CreateDeviceVendor - creates a new db entry
//----------------------------------------------------------------------------
func CreateDeviceVendor(obj model.DeviceVendor)(utils.RequestResult){
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
	    createMsg = fmt.Sprintf( "Created a DeviceVendor with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a DeviceVendor", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreateDeviceVendor", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetDeviceVendor - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetDeviceVendor(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.DeviceVendor

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a DeviceVendor with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a DeviceVendor using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a DeviceVendor using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetDeviceVendor", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllDeviceVendor - returns all
//----------------------------------------------------------------------------
func GetAllDeviceVendor()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.DeviceVendor

	//----------------------------------------------------------------------------
	// Request the ORM to find all DeviceVendor
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all DeviceVendor" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all DeviceVendor", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllDeviceVendor", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdateDeviceVendor - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdateDeviceVendor(obj model.DeviceVendor)(requestResult utils.RequestResult){
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
	    updateMsg = fmt.Sprintf( "Updated a DeviceVendor using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a DeviceVendor using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdateDeviceVendor", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeleteDeviceVendor - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeleteDeviceVendor(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the DeviceVendor with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetDeviceVendor(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.DeviceVendor so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.DeviceVendor)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a DeviceVendor using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a DeviceVendor using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeleteDeviceVendor", requestResult.Data}

	}

	return requestResult
}



//----------------------------------------------------------------------------
// adds one or more deviceModelsIds as a DeviceModels to a DeviceVendor
//----------------------------------------------------------------------------
func AddDeviceModelsToDeviceVendor ( deviceVendorId uint64, deviceModelsIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the DeviceVendor with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetDeviceVendor(deviceVendorId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.DeviceVendor so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.DeviceVendor)

		// slice the ids on comma with no spaces
		ids := strings.Split( deviceModelsIds, ",")

		for _, deviceModelsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.DeviceModel

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a DeviceModel
			// with a matching deviceModelsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , deviceModelsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the DeviceModels using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("DeviceModels").Append( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "DeviceModels", deviceModelsId )
				return utils.RequestResult{false, msg, "unassignDeviceModels", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified DeviceVendor from the gorm
		//----------------------------------------------------------------------------
		return GetDeviceVendor(deviceVendorId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more deviceModelsIds as a DeviceModels from a DeviceVendor
//----------------------------------------------------------------------------
func RemoveDeviceModelsFromDeviceVendor( deviceVendorId uint64, deviceModelsIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the DeviceVendor with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetDeviceVendor(deviceVendorId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.DeviceVendor so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.DeviceVendor)

		// slice the ids on comma with no spaces
		ids := strings.Split( deviceModelsIds, ",")

		for _, deviceModelsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.DeviceModel

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a DeviceModel
			// with a matching deviceModelsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , deviceModelsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove DeviceModelObj from the DeviceModels array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("DeviceModels").Delete( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "DeviceModels", deviceModelsId )
				return utils.RequestResult{false, msg, "removeDeviceModels", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified DeviceVendor from the gorm
		//----------------------------------------------------------------------------
		return GetDeviceVendor(deviceVendorId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// adds one or more firmwareReleasesIds as a FirmwareReleases to a DeviceVendor
//----------------------------------------------------------------------------
func AddFirmwareReleasesToDeviceVendor ( deviceVendorId uint64, firmwareReleasesIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the DeviceVendor with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetDeviceVendor(deviceVendorId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.DeviceVendor so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.DeviceVendor)

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
		// retrieve the modified DeviceVendor from the gorm
		//----------------------------------------------------------------------------
		return GetDeviceVendor(deviceVendorId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more firmwareReleasesIds as a FirmwareReleases from a DeviceVendor
//----------------------------------------------------------------------------
func RemoveFirmwareReleasesFromDeviceVendor( deviceVendorId uint64, firmwareReleasesIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the DeviceVendor with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetDeviceVendor(deviceVendorId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.DeviceVendor so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.DeviceVendor)

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
		// retrieve the modified DeviceVendor from the gorm
		//----------------------------------------------------------------------------
		return GetDeviceVendor(deviceVendorId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// adds one or more hardwareModulesIds as a HardwareModules to a DeviceVendor
//----------------------------------------------------------------------------
func AddHardwareModulesToDeviceVendor ( deviceVendorId uint64, hardwareModulesIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the DeviceVendor with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetDeviceVendor(deviceVendorId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.DeviceVendor so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.DeviceVendor)

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
		// retrieve the modified DeviceVendor from the gorm
		//----------------------------------------------------------------------------
		return GetDeviceVendor(deviceVendorId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more hardwareModulesIds as a HardwareModules from a DeviceVendor
//----------------------------------------------------------------------------
func RemoveHardwareModulesFromDeviceVendor( deviceVendorId uint64, hardwareModulesIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the DeviceVendor with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetDeviceVendor(deviceVendorId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.DeviceVendor so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.DeviceVendor)

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
		// retrieve the modified DeviceVendor from the gorm
		//----------------------------------------------------------------------------
		return GetDeviceVendor(deviceVendorId)

	} else {
		return parentRequestResult
	}
}

