package dao

import (
    "iotOnGolang/internal/model"
    "iotOnGolang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing AccessPolicyDAO..." ) )
}

//----------------------------------------------------------------------------
// CreateAccessPolicy - creates a new db entry
//----------------------------------------------------------------------------
func CreateAccessPolicy(obj model.AccessPolicy)(utils.RequestResult){
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
	    createMsg = fmt.Sprintf( "Created a AccessPolicy with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a AccessPolicy", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreateAccessPolicy", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetAccessPolicy - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetAccessPolicy(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.AccessPolicy

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a AccessPolicy with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a AccessPolicy using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a AccessPolicy using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetAccessPolicy", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllAccessPolicy - returns all
//----------------------------------------------------------------------------
func GetAllAccessPolicy()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.AccessPolicy

	//----------------------------------------------------------------------------
	// Request the ORM to find all AccessPolicy
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all AccessPolicy" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all AccessPolicy", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllAccessPolicy", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdateAccessPolicy - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdateAccessPolicy(obj model.AccessPolicy)(requestResult utils.RequestResult){
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
	    updateMsg = fmt.Sprintf( "Updated a AccessPolicy using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a AccessPolicy using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdateAccessPolicy", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeleteAccessPolicy - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeleteAccessPolicy(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the AccessPolicy with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetAccessPolicy(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.AccessPolicy so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.AccessPolicy)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a AccessPolicy using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a AccessPolicy using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeleteAccessPolicy", requestResult.Data}

	}

	return requestResult
}


//----------------------------------------------------------------------------
// assigns a Tenant on a AccessPolicy
//----------------------------------------------------------------------------
func AssignTenantToAccessPolicy( accessPolicyId uint64, tenantId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the AccessPolicy with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetAccessPolicy(accessPolicyId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.AccessPolicy so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.AccessPolicy)

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
			// assign the Tenant	to the AccessPolicy
			//----------------------------------------------------------------------------
			parentObj.Tenant = &childObj

			//----------------------------------------------------------------------------
			// save the AccessPolicy
			//----------------------------------------------------------------------------
			return UpdateAccessPolicy(parentObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Tenant", tenantId )
			return utils.RequestResult{false, msg, "assignTenant", childObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Tenant on a AccessPolicy
//----------------------------------------------------------------------------
func UnassignTenantFromAccessPolicy(accessPolicyId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the AccessPolicy with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetAccessPolicy(accessPolicyId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.AccessPolicy so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.AccessPolicy)

		//----------------------------------------------------------------------------
		// assign an empty Tenant to the Tenant
		//----------------------------------------------------------------------------
		parentObj.Tenant = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Tenant
		//----------------------------------------------------------------------------
		parentObj.TenantId = nil;

		//----------------------------------------------------------------------------
		// save the AccessPolicy
		//----------------------------------------------------------------------------
		return UpdateAccessPolicy(parentObj)

	} else {
		return parentRequestResult
	}

}


//----------------------------------------------------------------------------
// adds one or more apiKeysIds as a ApiKeys to a AccessPolicy
//----------------------------------------------------------------------------
func AddApiKeysToAccessPolicy ( accessPolicyId uint64, apiKeysIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the AccessPolicy with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetAccessPolicy(accessPolicyId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.AccessPolicy so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.AccessPolicy)

		// slice the ids on comma with no spaces
		ids := strings.Split( apiKeysIds, ",")

		for _, apiKeysId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.ApiKey

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a ApiKey
			// with a matching apiKeysId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , apiKeysId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the ApiKeys using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("ApiKeys").Append( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "ApiKeys", apiKeysId )
				return utils.RequestResult{false, msg, "unassignApiKeys", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified AccessPolicy from the gorm
		//----------------------------------------------------------------------------
		return GetAccessPolicy(accessPolicyId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more apiKeysIds as a ApiKeys from a AccessPolicy
//----------------------------------------------------------------------------
func RemoveApiKeysFromAccessPolicy( accessPolicyId uint64, apiKeysIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the AccessPolicy with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetAccessPolicy(accessPolicyId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.AccessPolicy so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.AccessPolicy)

		// slice the ids on comma with no spaces
		ids := strings.Split( apiKeysIds, ",")

		for _, apiKeysId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.ApiKey

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a ApiKey
			// with a matching apiKeysId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , apiKeysId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove ApiKeyObj from the ApiKeys array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("ApiKeys").Delete( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "ApiKeys", apiKeysId )
				return utils.RequestResult{false, msg, "removeApiKeys", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified AccessPolicy from the gorm
		//----------------------------------------------------------------------------
		return GetAccessPolicy(accessPolicyId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// adds one or more usersIds as a Users to a AccessPolicy
//----------------------------------------------------------------------------
func AddUsersToAccessPolicy ( accessPolicyId uint64, usersIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the AccessPolicy with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetAccessPolicy(accessPolicyId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.AccessPolicy so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.AccessPolicy)

		// slice the ids on comma with no spaces
		ids := strings.Split( usersIds, ",")

		for _, usersId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.TenantUser

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a TenantUser
			// with a matching usersId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , usersId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the Users using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("Users").Append( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Users", usersId )
				return utils.RequestResult{false, msg, "unassignUsers", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified AccessPolicy from the gorm
		//----------------------------------------------------------------------------
		return GetAccessPolicy(accessPolicyId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more usersIds as a Users from a AccessPolicy
//----------------------------------------------------------------------------
func RemoveUsersFromAccessPolicy( accessPolicyId uint64, usersIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the AccessPolicy with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetAccessPolicy(accessPolicyId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.AccessPolicy so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.AccessPolicy)

		// slice the ids on comma with no spaces
		ids := strings.Split( usersIds, ",")

		for _, usersId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.TenantUser

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a TenantUser
			// with a matching usersId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , usersId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove TenantUserObj from the Users array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("Users").Delete( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Users", usersId )
				return utils.RequestResult{false, msg, "removeUsers", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified AccessPolicy from the gorm
		//----------------------------------------------------------------------------
		return GetAccessPolicy(accessPolicyId)

	} else {
		return parentRequestResult
	}
}

