package dao

import (
    "iotOnGolang/internal/model"
    "iotOnGolang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing TenantUserDAO..." ) )
}

//----------------------------------------------------------------------------
// CreateTenantUser - creates a new db entry
//----------------------------------------------------------------------------
func CreateTenantUser(obj model.TenantUser)(utils.RequestResult){
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
	    createMsg = fmt.Sprintf( "Created a TenantUser with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a TenantUser", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreateTenantUser", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetTenantUser - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetTenantUser(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.TenantUser

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a TenantUser with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a TenantUser using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a TenantUser using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetTenantUser", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllTenantUser - returns all
//----------------------------------------------------------------------------
func GetAllTenantUser()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.TenantUser

	//----------------------------------------------------------------------------
	// Request the ORM to find all TenantUser
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all TenantUser" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all TenantUser", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllTenantUser", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdateTenantUser - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdateTenantUser(obj model.TenantUser)(requestResult utils.RequestResult){
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
	    updateMsg = fmt.Sprintf( "Updated a TenantUser using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a TenantUser using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdateTenantUser", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeleteTenantUser - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeleteTenantUser(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the TenantUser with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetTenantUser(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.TenantUser so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.TenantUser)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a TenantUser using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a TenantUser using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeleteTenantUser", requestResult.Data}

	}

	return requestResult
}


//----------------------------------------------------------------------------
// assigns a Tenant on a TenantUser
//----------------------------------------------------------------------------
func AssignTenantToTenantUser( tenantUserId uint64, tenantId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the TenantUser with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetTenantUser(tenantUserId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.TenantUser so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.TenantUser)

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
			// assign the Tenant	to the TenantUser
			//----------------------------------------------------------------------------
			parentObj.Tenant = &childObj

			//----------------------------------------------------------------------------
			// save the TenantUser
			//----------------------------------------------------------------------------
			return UpdateTenantUser(parentObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Tenant", tenantId )
			return utils.RequestResult{false, msg, "assignTenant", childObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Tenant on a TenantUser
//----------------------------------------------------------------------------
func UnassignTenantFromTenantUser(tenantUserId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the TenantUser with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetTenantUser(tenantUserId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.TenantUser so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.TenantUser)

		//----------------------------------------------------------------------------
		// assign an empty Tenant to the Tenant
		//----------------------------------------------------------------------------
		parentObj.Tenant = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Tenant
		//----------------------------------------------------------------------------
		parentObj.TenantId = nil;

		//----------------------------------------------------------------------------
		// save the TenantUser
		//----------------------------------------------------------------------------
		return UpdateTenantUser(parentObj)

	} else {
		return parentRequestResult
	}

}


//----------------------------------------------------------------------------
// adds one or more commandInvocationsIds as a CommandInvocations to a TenantUser
//----------------------------------------------------------------------------
func AddCommandInvocationsToTenantUser ( tenantUserId uint64, commandInvocationsIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the TenantUser with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetTenantUser(tenantUserId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.TenantUser so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.TenantUser)

		// slice the ids on comma with no spaces
		ids := strings.Split( commandInvocationsIds, ",")

		for _, commandInvocationsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.CommandInvocation

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a CommandInvocation
			// with a matching commandInvocationsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , commandInvocationsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the CommandInvocations using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("CommandInvocations").Append( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "CommandInvocations", commandInvocationsId )
				return utils.RequestResult{false, msg, "unassignCommandInvocations", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified TenantUser from the gorm
		//----------------------------------------------------------------------------
		return GetTenantUser(tenantUserId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more commandInvocationsIds as a CommandInvocations from a TenantUser
//----------------------------------------------------------------------------
func RemoveCommandInvocationsFromTenantUser( tenantUserId uint64, commandInvocationsIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the TenantUser with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetTenantUser(tenantUserId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.TenantUser so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.TenantUser)

		// slice the ids on comma with no spaces
		ids := strings.Split( commandInvocationsIds, ",")

		for _, commandInvocationsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.CommandInvocation

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a CommandInvocation
			// with a matching commandInvocationsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , commandInvocationsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove CommandInvocationObj from the CommandInvocations array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("CommandInvocations").Delete( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "CommandInvocations", commandInvocationsId )
				return utils.RequestResult{false, msg, "removeCommandInvocations", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified TenantUser from the gorm
		//----------------------------------------------------------------------------
		return GetTenantUser(tenantUserId)

	} else {
		return parentRequestResult
	}
}

