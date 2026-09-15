package dao

import (
    "iotOnGolang/internal/model"
    "iotOnGolang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing RoomDAO..." ) )
}

//----------------------------------------------------------------------------
// CreateRoom - creates a new db entry
//----------------------------------------------------------------------------
func CreateRoom(obj model.Room)(utils.RequestResult){
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
	    createMsg = fmt.Sprintf( "Created a Room with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a Room", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreateRoom", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetRoom - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetRoom(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.Room

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a Room with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a Room using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a Room using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetRoom", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllRoom - returns all
//----------------------------------------------------------------------------
func GetAllRoom()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.Room

	//----------------------------------------------------------------------------
	// Request the ORM to find all Room
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all Room" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all Room", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllRoom", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdateRoom - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdateRoom(obj model.Room)(requestResult utils.RequestResult){
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
	    updateMsg = fmt.Sprintf( "Updated a Room using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a Room using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdateRoom", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeleteRoom - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeleteRoom(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the Room with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetRoom(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Room so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.Room)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a Room using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a Room using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeleteRoom", requestResult.Data}

	}

	return requestResult
}


//----------------------------------------------------------------------------
// assigns a Floor on a Room
//----------------------------------------------------------------------------
func AssignFloorToRoom( roomId uint64, floorId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the Room with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetRoom(roomId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Room so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.Room)

		//----------------------------------------------------------------------------
		// Pass the reference to the ORM to get
		//----------------------------------------------------------------------------
		var childObj model.Floor

		//----------------------------------------------------------------------------
		// Retrieve the 1st occurrence from the ORM of a Floor with a
		// matching floorId
		//----------------------------------------------------------------------------
		childRequestResult := utils.GetDB().First(&childObj, floorId).Error // find first using identifier

		if childRequestResult == nil {
			//----------------------------------------------------------------------------
			// assign the Floor	to the Room
			//----------------------------------------------------------------------------
			parentObj.Floor = &childObj

			//----------------------------------------------------------------------------
			// save the Room
			//----------------------------------------------------------------------------
			return UpdateRoom(parentObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Floor", floorId )
			return utils.RequestResult{false, msg, "assignFloor", childObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Floor on a Room
//----------------------------------------------------------------------------
func UnassignFloorFromRoom(roomId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Room with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetRoom(roomId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Room so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.Room)

		//----------------------------------------------------------------------------
		// assign an empty Floor to the Floor
		//----------------------------------------------------------------------------
		parentObj.Floor = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Floor
		//----------------------------------------------------------------------------
		parentObj.FloorId = nil;

		//----------------------------------------------------------------------------
		// save the Room
		//----------------------------------------------------------------------------
		return UpdateRoom(parentObj)

	} else {
		return parentRequestResult
	}

}


//----------------------------------------------------------------------------
// adds one or more devicesIds as a Devices to a Room
//----------------------------------------------------------------------------
func AddDevicesToRoom ( roomId uint64, devicesIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Room with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetRoom(roomId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Room so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.Room)

		// slice the ids on comma with no spaces
		ids := strings.Split( devicesIds, ",")

		for _, devicesId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.IoTDevice

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a IoTDevice
			// with a matching devicesId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , devicesId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the Devices using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("Devices").Append( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Devices", devicesId )
				return utils.RequestResult{false, msg, "unassignDevices", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Room from the gorm
		//----------------------------------------------------------------------------
		return GetRoom(roomId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more devicesIds as a Devices from a Room
//----------------------------------------------------------------------------
func RemoveDevicesFromRoom( roomId uint64, devicesIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the Room with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetRoom(roomId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Room so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.Room)

		// slice the ids on comma with no spaces
		ids := strings.Split( devicesIds, ",")

		for _, devicesId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.IoTDevice

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a IoTDevice
			// with a matching devicesId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , devicesId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove IoTDeviceObj from the Devices array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("Devices").Delete( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Devices", devicesId )
				return utils.RequestResult{false, msg, "removeDevices", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Room from the gorm
		//----------------------------------------------------------------------------
		return GetRoom(roomId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// adds one or more gatewaysIds as a Gateways to a Room
//----------------------------------------------------------------------------
func AddGatewaysToRoom ( roomId uint64, gatewaysIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Room with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetRoom(roomId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Room so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.Room)

		// slice the ids on comma with no spaces
		ids := strings.Split( gatewaysIds, ",")

		for _, gatewaysId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.Gateway

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a Gateway
			// with a matching gatewaysId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , gatewaysId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the Gateways using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("Gateways").Append( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Gateways", gatewaysId )
				return utils.RequestResult{false, msg, "unassignGateways", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Room from the gorm
		//----------------------------------------------------------------------------
		return GetRoom(roomId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more gatewaysIds as a Gateways from a Room
//----------------------------------------------------------------------------
func RemoveGatewaysFromRoom( roomId uint64, gatewaysIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the Room with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetRoom(roomId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Room so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.Room)

		// slice the ids on comma with no spaces
		ids := strings.Split( gatewaysIds, ",")

		for _, gatewaysId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.Gateway

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a Gateway
			// with a matching gatewaysId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , gatewaysId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove GatewayObj from the Gateways array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("Gateways").Delete( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Gateways", gatewaysId )
				return utils.RequestResult{false, msg, "removeGateways", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Room from the gorm
		//----------------------------------------------------------------------------
		return GetRoom(roomId)

	} else {
		return parentRequestResult
	}
}

