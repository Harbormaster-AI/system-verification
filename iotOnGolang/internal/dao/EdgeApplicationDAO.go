
package dao

import (
    "iotOnGolang/internal/model"
    "iotOnGolang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing EdgeApplicationDAO..." ) )
}

//----------------------------------------------------------------------------
// CreateEdgeApplication - creates a new db entry
//----------------------------------------------------------------------------
func CreateEdgeApplication(obj model.EdgeApplication)(utils.RequestResult){
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
	    createMsg = fmt.Sprintf( "Created a EdgeApplication with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a EdgeApplication", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreateEdgeApplication", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetEdgeApplication - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetEdgeApplication(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.EdgeApplication

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a EdgeApplication with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a EdgeApplication using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a EdgeApplication using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetEdgeApplication", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllEdgeApplication - returns all
//----------------------------------------------------------------------------
func GetAllEdgeApplication()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.EdgeApplication

	//----------------------------------------------------------------------------
	// Request the ORM to find all EdgeApplication
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all EdgeApplication" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all EdgeApplication", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllEdgeApplication", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdateEdgeApplication - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdateEdgeApplication(obj model.EdgeApplication)(requestResult utils.RequestResult){
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
	    updateMsg = fmt.Sprintf( "Updated a EdgeApplication using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a EdgeApplication using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdateEdgeApplication", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeleteEdgeApplication - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeleteEdgeApplication(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the EdgeApplication with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetEdgeApplication(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.EdgeApplication so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.EdgeApplication)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a EdgeApplication using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a EdgeApplication using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeleteEdgeApplication", requestResult.Data}

	}

	return requestResult
}


//----------------------------------------------------------------------------
// assigns a Gateway on a EdgeApplication
//----------------------------------------------------------------------------
func AssignGatewayToEdgeApplication( edgeApplicationId uint64, gatewayId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the EdgeApplication with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetEdgeApplication(edgeApplicationId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.EdgeApplication so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.EdgeApplication)

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
			// assign the Gateway	to the EdgeApplication
			//----------------------------------------------------------------------------
			parentObj.Gateway = &childObj

			//----------------------------------------------------------------------------
			// save the EdgeApplication
			//----------------------------------------------------------------------------
			return UpdateEdgeApplication(parentObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Gateway", gatewayId )
			return utils.RequestResult{false, msg, "assignGateway", childObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Gateway on a EdgeApplication
//----------------------------------------------------------------------------
func UnassignGatewayFromEdgeApplication(edgeApplicationId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the EdgeApplication with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetEdgeApplication(edgeApplicationId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.EdgeApplication so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.EdgeApplication)

		//----------------------------------------------------------------------------
		// assign an empty Gateway to the Gateway
		//----------------------------------------------------------------------------
		parentObj.Gateway = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Gateway
		//----------------------------------------------------------------------------
		parentObj.GatewayId = nil;

		//----------------------------------------------------------------------------
		// save the EdgeApplication
		//----------------------------------------------------------------------------
		return UpdateEdgeApplication(parentObj)

	} else {
		return parentRequestResult
	}

}


