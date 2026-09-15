package dao

import (
    "iotOnGolang/internal/model"
    "iotOnGolang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing BuildingDAO..." ) )
}

//----------------------------------------------------------------------------
// CreateBuilding - creates a new db entry
//----------------------------------------------------------------------------
func CreateBuilding(obj model.Building)(utils.RequestResult){
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
	    createMsg = fmt.Sprintf( "Created a Building with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a Building", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreateBuilding", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetBuilding - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetBuilding(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.Building

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a Building with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a Building using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a Building using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetBuilding", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllBuilding - returns all
//----------------------------------------------------------------------------
func GetAllBuilding()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.Building

	//----------------------------------------------------------------------------
	// Request the ORM to find all Building
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all Building" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all Building", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllBuilding", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdateBuilding - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdateBuilding(obj model.Building)(requestResult utils.RequestResult){
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
	    updateMsg = fmt.Sprintf( "Updated a Building using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a Building using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdateBuilding", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeleteBuilding - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeleteBuilding(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the Building with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetBuilding(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Building so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.Building)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a Building using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a Building using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeleteBuilding", requestResult.Data}

	}

	return requestResult
}


//----------------------------------------------------------------------------
// assigns a Site on a Building
//----------------------------------------------------------------------------
func AssignSiteToBuilding( buildingId uint64, siteId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the Building with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetBuilding(buildingId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Building so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.Building)

		//----------------------------------------------------------------------------
		// Pass the reference to the ORM to get
		//----------------------------------------------------------------------------
		var childObj model.Site

		//----------------------------------------------------------------------------
		// Retrieve the 1st occurrence from the ORM of a Site with a
		// matching siteId
		//----------------------------------------------------------------------------
		childRequestResult := utils.GetDB().First(&childObj, siteId).Error // find first using identifier

		if childRequestResult == nil {
			//----------------------------------------------------------------------------
			// assign the Site	to the Building
			//----------------------------------------------------------------------------
			parentObj.Site = &childObj

			//----------------------------------------------------------------------------
			// save the Building
			//----------------------------------------------------------------------------
			return UpdateBuilding(parentObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Site", siteId )
			return utils.RequestResult{false, msg, "assignSite", childObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Site on a Building
//----------------------------------------------------------------------------
func UnassignSiteFromBuilding(buildingId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Building with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetBuilding(buildingId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Building so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.Building)

		//----------------------------------------------------------------------------
		// assign an empty Site to the Site
		//----------------------------------------------------------------------------
		parentObj.Site = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Site
		//----------------------------------------------------------------------------
		parentObj.SiteId = nil;

		//----------------------------------------------------------------------------
		// save the Building
		//----------------------------------------------------------------------------
		return UpdateBuilding(parentObj)

	} else {
		return parentRequestResult
	}

}


//----------------------------------------------------------------------------
// adds one or more floorsIds as a Floors to a Building
//----------------------------------------------------------------------------
func AddFloorsToBuilding ( buildingId uint64, floorsIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Building with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetBuilding(buildingId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Building so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.Building)

		// slice the ids on comma with no spaces
		ids := strings.Split( floorsIds, ",")

		for _, floorsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.Floor

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a Floor
			// with a matching floorsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , floorsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the Floors using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("Floors").Append( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Floors", floorsId )
				return utils.RequestResult{false, msg, "unassignFloors", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Building from the gorm
		//----------------------------------------------------------------------------
		return GetBuilding(buildingId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more floorsIds as a Floors from a Building
//----------------------------------------------------------------------------
func RemoveFloorsFromBuilding( buildingId uint64, floorsIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the Building with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetBuilding(buildingId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Building so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.Building)

		// slice the ids on comma with no spaces
		ids := strings.Split( floorsIds, ",")

		for _, floorsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.Floor

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a Floor
			// with a matching floorsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , floorsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove FloorObj from the Floors array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("Floors").Delete( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Floors", floorsId )
				return utils.RequestResult{false, msg, "removeFloors", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Building from the gorm
		//----------------------------------------------------------------------------
		return GetBuilding(buildingId)

	} else {
		return parentRequestResult
	}
}

