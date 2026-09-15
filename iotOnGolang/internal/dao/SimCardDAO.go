package dao

import (
    "iotOnGolang/internal/model"
    "iotOnGolang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing SimCardDAO..." ) )
}

//----------------------------------------------------------------------------
// CreateSimCard - creates a new db entry
//----------------------------------------------------------------------------
func CreateSimCard(obj model.SimCard)(utils.RequestResult){
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
	    createMsg = fmt.Sprintf( "Created a SimCard with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a SimCard", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreateSimCard", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetSimCard - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetSimCard(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.SimCard

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a SimCard with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a SimCard using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a SimCard using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetSimCard", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllSimCard - returns all
//----------------------------------------------------------------------------
func GetAllSimCard()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.SimCard

	//----------------------------------------------------------------------------
	// Request the ORM to find all SimCard
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all SimCard" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all SimCard", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllSimCard", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdateSimCard - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdateSimCard(obj model.SimCard)(requestResult utils.RequestResult){
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
	    updateMsg = fmt.Sprintf( "Updated a SimCard using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a SimCard using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdateSimCard", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeleteSimCard - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeleteSimCard(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the SimCard with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetSimCard(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.SimCard so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.SimCard)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a SimCard using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a SimCard using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeleteSimCard", requestResult.Data}

	}

	return requestResult
}


//----------------------------------------------------------------------------
// assigns a Tenant on a SimCard
//----------------------------------------------------------------------------
func AssignTenantToSimCard( simCardId uint64, tenantId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the SimCard with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetSimCard(simCardId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.SimCard so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.SimCard)

		//----------------------------------------------------------------------------
		// Pass the reference to the ORM to get
		//----------------------------------------------------------------------------
		var childObj model.Tenant

		//----------------------------------------------------------------------------
		// Retrieve the 1st occurrence from the ORM of a Tenant with a
		// matching tenantId
		//----------------------------------------------------------------------------
		childRequestResult := utils.GetDB().First(&childObj, tenantId).Error // find first using identifier

		if childRequestResult == nil {
			//----------------------------------------------------------------------------
			// assign the Tenant	to the SimCard
			//----------------------------------------------------------------------------
			parentObj.Tenant = &childObj

			//----------------------------------------------------------------------------
			// save the SimCard
			//----------------------------------------------------------------------------
			return UpdateSimCard(parentObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Tenant", tenantId )
			return utils.RequestResult{false, msg, "assignTenant", childObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Tenant on a SimCard
//----------------------------------------------------------------------------
func UnassignTenantFromSimCard(simCardId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the SimCard with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetSimCard(simCardId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.SimCard so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.SimCard)

		//----------------------------------------------------------------------------
		// assign an empty Tenant to the Tenant
		//----------------------------------------------------------------------------
		parentObj.Tenant = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Tenant
		//----------------------------------------------------------------------------
		parentObj.TenantId = nil;

		//----------------------------------------------------------------------------
		// save the SimCard
		//----------------------------------------------------------------------------
		return UpdateSimCard(parentObj)

	} else {
		return parentRequestResult
	}

}

//----------------------------------------------------------------------------
// assigns a ConnectivityPlan on a SimCard
//----------------------------------------------------------------------------
func AssignConnectivityPlanToSimCard( simCardId uint64, connectivityPlanId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the SimCard with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetSimCard(simCardId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.SimCard so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.SimCard)

		//----------------------------------------------------------------------------
		// Pass the reference to the ORM to get
		//----------------------------------------------------------------------------
		var childObj model.ConnectivityPlan

		//----------------------------------------------------------------------------
		// Retrieve the 1st occurrence from the ORM of a ConnectivityPlan with a
		// matching connectivityPlanId
		//----------------------------------------------------------------------------
		childRequestResult := utils.GetDB().First(&childObj, connectivityPlanId).Error // find first using identifier

		if childRequestResult == nil {
			//----------------------------------------------------------------------------
			// assign the ConnectivityPlan	to the SimCard
			//----------------------------------------------------------------------------
			parentObj.ConnectivityPlan = &childObj

			//----------------------------------------------------------------------------
			// save the SimCard
			//----------------------------------------------------------------------------
			return UpdateSimCard(parentObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "ConnectivityPlan", connectivityPlanId )
			return utils.RequestResult{false, msg, "assignConnectivityPlan", childObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a ConnectivityPlan on a SimCard
//----------------------------------------------------------------------------
func UnassignConnectivityPlanFromSimCard(simCardId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the SimCard with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetSimCard(simCardId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.SimCard so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.SimCard)

		//----------------------------------------------------------------------------
		// assign an empty ConnectivityPlan to the ConnectivityPlan
		//----------------------------------------------------------------------------
		parentObj.ConnectivityPlan = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the ConnectivityPlan
		//----------------------------------------------------------------------------
		parentObj.ConnectivityPlanId = nil;

		//----------------------------------------------------------------------------
		// save the SimCard
		//----------------------------------------------------------------------------
		return UpdateSimCard(parentObj)

	} else {
		return parentRequestResult
	}

}


//----------------------------------------------------------------------------
// adds one or more networkProfilesIds as a NetworkProfiles to a SimCard
//----------------------------------------------------------------------------
func AddNetworkProfilesToSimCard ( simCardId uint64, networkProfilesIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the SimCard with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetSimCard(simCardId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.SimCard so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.SimCard)

		// slice the ids on comma with no spaces
		ids := strings.Split( networkProfilesIds, ",")

		for _, networkProfilesId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.NetworkProfile

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a NetworkProfile
			// with a matching networkProfilesId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , networkProfilesId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the NetworkProfiles using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("NetworkProfiles").Append( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "NetworkProfiles", networkProfilesId )
				return utils.RequestResult{false, msg, "unassignNetworkProfiles", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified SimCard from the gorm
		//----------------------------------------------------------------------------
		return GetSimCard(simCardId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more networkProfilesIds as a NetworkProfiles from a SimCard
//----------------------------------------------------------------------------
func RemoveNetworkProfilesFromSimCard( simCardId uint64, networkProfilesIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the SimCard with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetSimCard(simCardId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.SimCard so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.SimCard)

		// slice the ids on comma with no spaces
		ids := strings.Split( networkProfilesIds, ",")

		for _, networkProfilesId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.NetworkProfile

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a NetworkProfile
			// with a matching networkProfilesId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , networkProfilesId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove NetworkProfileObj from the NetworkProfiles array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("NetworkProfiles").Delete( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "NetworkProfiles", networkProfilesId )
				return utils.RequestResult{false, msg, "removeNetworkProfiles", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified SimCard from the gorm
		//----------------------------------------------------------------------------
		return GetSimCard(simCardId)

	} else {
		return parentRequestResult
	}
}

