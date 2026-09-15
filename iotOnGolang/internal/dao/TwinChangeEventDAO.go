
package dao

import (
    "iotOnGolang/internal/model"
    "iotOnGolang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing TwinChangeEventDAO..." ) )
}

//----------------------------------------------------------------------------
// CreateTwinChangeEvent - creates a new db entry
//----------------------------------------------------------------------------
func CreateTwinChangeEvent(obj model.TwinChangeEvent)(utils.RequestResult){
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
	    createMsg = fmt.Sprintf( "Created a TwinChangeEvent with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a TwinChangeEvent", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreateTwinChangeEvent", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetTwinChangeEvent - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetTwinChangeEvent(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.TwinChangeEvent

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a TwinChangeEvent with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a TwinChangeEvent using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a TwinChangeEvent using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetTwinChangeEvent", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllTwinChangeEvent - returns all
//----------------------------------------------------------------------------
func GetAllTwinChangeEvent()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.TwinChangeEvent

	//----------------------------------------------------------------------------
	// Request the ORM to find all TwinChangeEvent
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all TwinChangeEvent" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all TwinChangeEvent", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllTwinChangeEvent", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdateTwinChangeEvent - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdateTwinChangeEvent(obj model.TwinChangeEvent)(requestResult utils.RequestResult){
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
	    updateMsg = fmt.Sprintf( "Updated a TwinChangeEvent using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a TwinChangeEvent using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdateTwinChangeEvent", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeleteTwinChangeEvent - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeleteTwinChangeEvent(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the TwinChangeEvent with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetTwinChangeEvent(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.TwinChangeEvent so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.TwinChangeEvent)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a TwinChangeEvent using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a TwinChangeEvent using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeleteTwinChangeEvent", requestResult.Data}

	}

	return requestResult
}


//----------------------------------------------------------------------------
// assigns a Twin on a TwinChangeEvent
//----------------------------------------------------------------------------
func AssignTwinToTwinChangeEvent( twinChangeEventId uint64, twinId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the TwinChangeEvent with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetTwinChangeEvent(twinChangeEventId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.TwinChangeEvent so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.TwinChangeEvent)

		//----------------------------------------------------------------------------
		// Pass the reference to the ORM to get
		//----------------------------------------------------------------------------
		var childObj model.DigitalTwin

		//----------------------------------------------------------------------------
		// Retrieve the 1st occurrence from the ORM of a DigitalTwin with a
		// matching twinId
		//----------------------------------------------------------------------------
		childRequestResult := utils.GetDB().First(&childObj, twinId).Error // find first using identifier

		if childRequestResult == nil {
			//----------------------------------------------------------------------------
			// assign the Twin	to the TwinChangeEvent
			//----------------------------------------------------------------------------
			parentObj.Twin = &childObj

			//----------------------------------------------------------------------------
			// save the TwinChangeEvent
			//----------------------------------------------------------------------------
			return UpdateTwinChangeEvent(parentObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Twin", twinId )
			return utils.RequestResult{false, msg, "assignTwin", childObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Twin on a TwinChangeEvent
//----------------------------------------------------------------------------
func UnassignTwinFromTwinChangeEvent(twinChangeEventId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the TwinChangeEvent with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetTwinChangeEvent(twinChangeEventId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.TwinChangeEvent so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.TwinChangeEvent)

		//----------------------------------------------------------------------------
		// assign an empty DigitalTwin to the Twin
		//----------------------------------------------------------------------------
		parentObj.Twin = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Twin
		//----------------------------------------------------------------------------
		parentObj.TwinId = nil;

		//----------------------------------------------------------------------------
		// save the TwinChangeEvent
		//----------------------------------------------------------------------------
		return UpdateTwinChangeEvent(parentObj)

	} else {
		return parentRequestResult
	}

}


