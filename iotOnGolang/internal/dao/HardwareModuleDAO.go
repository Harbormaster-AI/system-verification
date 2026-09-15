package dao

import (
    "iotOnGolang/internal/model"
    "iotOnGolang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing HardwareModuleDAO..." ) )
}

//----------------------------------------------------------------------------
// CreateHardwareModule - creates a new db entry
//----------------------------------------------------------------------------
func CreateHardwareModule(obj model.HardwareModule)(utils.RequestResult){
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
	    createMsg = fmt.Sprintf( "Created a HardwareModule with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a HardwareModule", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreateHardwareModule", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetHardwareModule - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetHardwareModule(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.HardwareModule

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a HardwareModule with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a HardwareModule using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a HardwareModule using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetHardwareModule", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllHardwareModule - returns all
//----------------------------------------------------------------------------
func GetAllHardwareModule()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.HardwareModule

	//----------------------------------------------------------------------------
	// Request the ORM to find all HardwareModule
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all HardwareModule" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all HardwareModule", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllHardwareModule", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdateHardwareModule - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdateHardwareModule(obj model.HardwareModule)(requestResult utils.RequestResult){
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
	    updateMsg = fmt.Sprintf( "Updated a HardwareModule using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a HardwareModule using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdateHardwareModule", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeleteHardwareModule - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeleteHardwareModule(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the HardwareModule with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetHardwareModule(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.HardwareModule so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.HardwareModule)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a HardwareModule using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a HardwareModule using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeleteHardwareModule", requestResult.Data}

	}

	return requestResult
}


//----------------------------------------------------------------------------
// assigns a Vendor on a HardwareModule
//----------------------------------------------------------------------------
func AssignVendorToHardwareModule( hardwareModuleId uint64, vendorId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the HardwareModule with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetHardwareModule(hardwareModuleId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.HardwareModule so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.HardwareModule)

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
			// assign the Vendor	to the HardwareModule
			//----------------------------------------------------------------------------
			parentObj.Vendor = &childObj

			//----------------------------------------------------------------------------
			// save the HardwareModule
			//----------------------------------------------------------------------------
			return UpdateHardwareModule(parentObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Vendor", vendorId )
			return utils.RequestResult{false, msg, "assignVendor", childObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Vendor on a HardwareModule
//----------------------------------------------------------------------------
func UnassignVendorFromHardwareModule(hardwareModuleId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the HardwareModule with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetHardwareModule(hardwareModuleId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.HardwareModule so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.HardwareModule)

		//----------------------------------------------------------------------------
		// assign an empty DeviceVendor to the Vendor
		//----------------------------------------------------------------------------
		parentObj.Vendor = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Vendor
		//----------------------------------------------------------------------------
		parentObj.VendorId = nil;

		//----------------------------------------------------------------------------
		// save the HardwareModule
		//----------------------------------------------------------------------------
		return UpdateHardwareModule(parentObj)

	} else {
		return parentRequestResult
	}

}


