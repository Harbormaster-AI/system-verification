package dao

import (
    "iotOnGolang/internal/model"
    "iotOnGolang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing TwinTemplateDAO..." ) )
}

//----------------------------------------------------------------------------
// CreateTwinTemplate - creates a new db entry
//----------------------------------------------------------------------------
func CreateTwinTemplate(obj model.TwinTemplate)(utils.RequestResult){
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
	    createMsg = fmt.Sprintf( "Created a TwinTemplate with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a TwinTemplate", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreateTwinTemplate", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetTwinTemplate - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetTwinTemplate(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.TwinTemplate

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a TwinTemplate with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a TwinTemplate using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a TwinTemplate using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetTwinTemplate", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllTwinTemplate - returns all
//----------------------------------------------------------------------------
func GetAllTwinTemplate()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.TwinTemplate

	//----------------------------------------------------------------------------
	// Request the ORM to find all TwinTemplate
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all TwinTemplate" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all TwinTemplate", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllTwinTemplate", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdateTwinTemplate - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdateTwinTemplate(obj model.TwinTemplate)(requestResult utils.RequestResult){
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
	    updateMsg = fmt.Sprintf( "Updated a TwinTemplate using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a TwinTemplate using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdateTwinTemplate", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeleteTwinTemplate - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeleteTwinTemplate(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the TwinTemplate with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetTwinTemplate(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.TwinTemplate so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.TwinTemplate)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a TwinTemplate using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a TwinTemplate using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeleteTwinTemplate", requestResult.Data}

	}

	return requestResult
}



//----------------------------------------------------------------------------
// adds one or more deviceModelsIds as a DeviceModels to a TwinTemplate
//----------------------------------------------------------------------------
func AddDeviceModelsToTwinTemplate ( twinTemplateId uint64, deviceModelsIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the TwinTemplate with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetTwinTemplate(twinTemplateId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.TwinTemplate so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.TwinTemplate)

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
		// retrieve the modified TwinTemplate from the gorm
		//----------------------------------------------------------------------------
		return GetTwinTemplate(twinTemplateId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more deviceModelsIds as a DeviceModels from a TwinTemplate
//----------------------------------------------------------------------------
func RemoveDeviceModelsFromTwinTemplate( twinTemplateId uint64, deviceModelsIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the TwinTemplate with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetTwinTemplate(twinTemplateId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.TwinTemplate so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.TwinTemplate)

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
		// retrieve the modified TwinTemplate from the gorm
		//----------------------------------------------------------------------------
		return GetTwinTemplate(twinTemplateId)

	} else {
		return parentRequestResult
	}
}

