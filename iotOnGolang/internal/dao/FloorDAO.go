package dao

import (
    "iotOnGolang/internal/model"
    "iotOnGolang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing FloorDAO..." ) )
}

//----------------------------------------------------------------------------
// CreateFloor - creates a new db entry
//----------------------------------------------------------------------------
func CreateFloor(obj model.Floor)(utils.RequestResult){
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
	    createMsg = fmt.Sprintf( "Created a Floor with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a Floor", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreateFloor", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetFloor - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetFloor(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.Floor

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a Floor with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a Floor using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a Floor using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetFloor", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllFloor - returns all
//----------------------------------------------------------------------------
func GetAllFloor()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.Floor

	//----------------------------------------------------------------------------
	// Request the ORM to find all Floor
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all Floor" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all Floor", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllFloor", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdateFloor - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdateFloor(obj model.Floor)(requestResult utils.RequestResult){
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
	    updateMsg = fmt.Sprintf( "Updated a Floor using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a Floor using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdateFloor", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeleteFloor - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeleteFloor(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the Floor with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetFloor(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Floor so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.Floor)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a Floor using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a Floor using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeleteFloor", requestResult.Data}

	}

	return requestResult
}


//----------------------------------------------------------------------------
// assigns a Building on a Floor
//----------------------------------------------------------------------------
func AssignBuildingToFloor( floorId uint64, buildingId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the Floor with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetFloor(floorId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Floor so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.Floor)

		//----------------------------------------------------------------------------
		// Pass the reference to the ORM to get
		//----------------------------------------------------------------------------
		var childObj model.Building

		//----------------------------------------------------------------------------
		// Retrieve the 1st occurrence from the ORM of a Building with a
		// matching buildingId
		//----------------------------------------------------------------------------
		childRequestResult := utils.GetDB().First(&childObj, buildingId).Error // find first using identifier

		if childRequestResult == nil {
			//----------------------------------------------------------------------------
			// assign the Building	to the Floor
			//----------------------------------------------------------------------------
			parentObj.Building = &childObj

			//----------------------------------------------------------------------------
			// save the Floor
			//----------------------------------------------------------------------------
			return UpdateFloor(parentObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Building", buildingId )
			return utils.RequestResult{false, msg, "assignBuilding", childObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Building on a Floor
//----------------------------------------------------------------------------
func UnassignBuildingFromFloor(floorId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Floor with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetFloor(floorId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Floor so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.Floor)

		//----------------------------------------------------------------------------
		// assign an empty Building to the Building
		//----------------------------------------------------------------------------
		parentObj.Building = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Building
		//----------------------------------------------------------------------------
		parentObj.BuildingId = nil;

		//----------------------------------------------------------------------------
		// save the Floor
		//----------------------------------------------------------------------------
		return UpdateFloor(parentObj)

	} else {
		return parentRequestResult
	}

}


//----------------------------------------------------------------------------
// adds one or more roomsIds as a Rooms to a Floor
//----------------------------------------------------------------------------
func AddRoomsToFloor ( floorId uint64, roomsIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Floor with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetFloor(floorId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Floor so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.Floor)

		// slice the ids on comma with no spaces
		ids := strings.Split( roomsIds, ",")

		for _, roomsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.Room

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a Room
			// with a matching roomsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , roomsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the Rooms using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("Rooms").Append( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Rooms", roomsId )
				return utils.RequestResult{false, msg, "unassignRooms", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Floor from the gorm
		//----------------------------------------------------------------------------
		return GetFloor(floorId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more roomsIds as a Rooms from a Floor
//----------------------------------------------------------------------------
func RemoveRoomsFromFloor( floorId uint64, roomsIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the Floor with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetFloor(floorId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Floor so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.Floor)

		// slice the ids on comma with no spaces
		ids := strings.Split( roomsIds, ",")

		for _, roomsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.Room

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a Room
			// with a matching roomsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , roomsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove RoomObj from the Rooms array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("Rooms").Delete( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Rooms", roomsId )
				return utils.RequestResult{false, msg, "removeRooms", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Floor from the gorm
		//----------------------------------------------------------------------------
		return GetFloor(floorId)

	} else {
		return parentRequestResult
	}
}

