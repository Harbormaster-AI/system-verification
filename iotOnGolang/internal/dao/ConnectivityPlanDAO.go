package dao

import (
    "iotOnGolang/internal/model"
    "iotOnGolang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing ConnectivityPlanDAO..." ) )
}

//----------------------------------------------------------------------------
// CreateConnectivityPlan - creates a new db entry
//----------------------------------------------------------------------------
func CreateConnectivityPlan(obj model.ConnectivityPlan)(utils.RequestResult){
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
	    createMsg = fmt.Sprintf( "Created a ConnectivityPlan with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a ConnectivityPlan", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreateConnectivityPlan", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetConnectivityPlan - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetConnectivityPlan(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.ConnectivityPlan

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a ConnectivityPlan with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a ConnectivityPlan using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a ConnectivityPlan using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetConnectivityPlan", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllConnectivityPlan - returns all
//----------------------------------------------------------------------------
func GetAllConnectivityPlan()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.ConnectivityPlan

	//----------------------------------------------------------------------------
	// Request the ORM to find all ConnectivityPlan
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all ConnectivityPlan" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all ConnectivityPlan", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllConnectivityPlan", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdateConnectivityPlan - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdateConnectivityPlan(obj model.ConnectivityPlan)(requestResult utils.RequestResult){
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
	    updateMsg = fmt.Sprintf( "Updated a ConnectivityPlan using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a ConnectivityPlan using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdateConnectivityPlan", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeleteConnectivityPlan - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeleteConnectivityPlan(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the ConnectivityPlan with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetConnectivityPlan(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.ConnectivityPlan so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.ConnectivityPlan)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a ConnectivityPlan using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a ConnectivityPlan using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeleteConnectivityPlan", requestResult.Data}

	}

	return requestResult
}


//----------------------------------------------------------------------------
// assigns a Tenant on a ConnectivityPlan
//----------------------------------------------------------------------------
func AssignTenantToConnectivityPlan( connectivityPlanId uint64, tenantId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the ConnectivityPlan with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetConnectivityPlan(connectivityPlanId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.ConnectivityPlan so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.ConnectivityPlan)

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
			// assign the Tenant	to the ConnectivityPlan
			//----------------------------------------------------------------------------
			parentObj.Tenant = &childObj

			//----------------------------------------------------------------------------
			// save the ConnectivityPlan
			//----------------------------------------------------------------------------
			return UpdateConnectivityPlan(parentObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Tenant", tenantId )
			return utils.RequestResult{false, msg, "assignTenant", childObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Tenant on a ConnectivityPlan
//----------------------------------------------------------------------------
func UnassignTenantFromConnectivityPlan(connectivityPlanId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the ConnectivityPlan with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetConnectivityPlan(connectivityPlanId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.ConnectivityPlan so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.ConnectivityPlan)

		//----------------------------------------------------------------------------
		// assign an empty Tenant to the Tenant
		//----------------------------------------------------------------------------
		parentObj.Tenant = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Tenant
		//----------------------------------------------------------------------------
		parentObj.TenantId = nil;

		//----------------------------------------------------------------------------
		// save the ConnectivityPlan
		//----------------------------------------------------------------------------
		return UpdateConnectivityPlan(parentObj)

	} else {
		return parentRequestResult
	}

}


//----------------------------------------------------------------------------
// adds one or more simCardsIds as a SimCards to a ConnectivityPlan
//----------------------------------------------------------------------------
func AddSimCardsToConnectivityPlan ( connectivityPlanId uint64, simCardsIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the ConnectivityPlan with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetConnectivityPlan(connectivityPlanId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.ConnectivityPlan so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.ConnectivityPlan)

		// slice the ids on comma with no spaces
		ids := strings.Split( simCardsIds, ",")

		for _, simCardsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.SimCard

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a SimCard
			// with a matching simCardsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , simCardsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the SimCards using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("SimCards").Append( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "SimCards", simCardsId )
				return utils.RequestResult{false, msg, "unassignSimCards", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified ConnectivityPlan from the gorm
		//----------------------------------------------------------------------------
		return GetConnectivityPlan(connectivityPlanId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more simCardsIds as a SimCards from a ConnectivityPlan
//----------------------------------------------------------------------------
func RemoveSimCardsFromConnectivityPlan( connectivityPlanId uint64, simCardsIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the ConnectivityPlan with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetConnectivityPlan(connectivityPlanId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.ConnectivityPlan so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.ConnectivityPlan)

		// slice the ids on comma with no spaces
		ids := strings.Split( simCardsIds, ",")

		for _, simCardsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.SimCard

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a SimCard
			// with a matching simCardsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , simCardsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove SimCardObj from the SimCards array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("SimCards").Delete( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "SimCards", simCardsId )
				return utils.RequestResult{false, msg, "removeSimCards", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified ConnectivityPlan from the gorm
		//----------------------------------------------------------------------------
		return GetConnectivityPlan(connectivityPlanId)

	} else {
		return parentRequestResult
	}
}

