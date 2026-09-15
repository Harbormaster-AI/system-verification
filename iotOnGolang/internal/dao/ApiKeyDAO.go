package dao

import (
    "iotOnGolang/internal/model"
    "iotOnGolang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing ApiKeyDAO..." ) )
}

//----------------------------------------------------------------------------
// CreateApiKey - creates a new db entry
//----------------------------------------------------------------------------
func CreateApiKey(obj model.ApiKey)(utils.RequestResult){
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
	    createMsg = fmt.Sprintf( "Created a ApiKey with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a ApiKey", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreateApiKey", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetApiKey - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetApiKey(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.ApiKey

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a ApiKey with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a ApiKey using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a ApiKey using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetApiKey", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllApiKey - returns all
//----------------------------------------------------------------------------
func GetAllApiKey()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.ApiKey

	//----------------------------------------------------------------------------
	// Request the ORM to find all ApiKey
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all ApiKey" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all ApiKey", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllApiKey", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdateApiKey - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdateApiKey(obj model.ApiKey)(requestResult utils.RequestResult){
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
	    updateMsg = fmt.Sprintf( "Updated a ApiKey using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a ApiKey using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdateApiKey", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeleteApiKey - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeleteApiKey(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the ApiKey with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetApiKey(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.ApiKey so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.ApiKey)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a ApiKey using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a ApiKey using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeleteApiKey", requestResult.Data}

	}

	return requestResult
}


//----------------------------------------------------------------------------
// assigns a AccessPolicy on a ApiKey
//----------------------------------------------------------------------------
func AssignAccessPolicyToApiKey( apiKeyId uint64, accessPolicyId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the ApiKey with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetApiKey(apiKeyId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.ApiKey so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.ApiKey)

		//----------------------------------------------------------------------------
		// Pass the reference to the ORM to get
		//----------------------------------------------------------------------------
		var childObj model.AccessPolicy

		//----------------------------------------------------------------------------
		// Retrieve the 1st occurrence from the ORM of a AccessPolicy with a
		// matching accessPolicyId
		//----------------------------------------------------------------------------
		childRequestResult := utils.GetDB().First(&childObj, accessPolicyId).Error // find first using identifier

		if childRequestResult == nil {
			//----------------------------------------------------------------------------
			// assign the AccessPolicy	to the ApiKey
			//----------------------------------------------------------------------------
			parentObj.AccessPolicy = &childObj

			//----------------------------------------------------------------------------
			// save the ApiKey
			//----------------------------------------------------------------------------
			return UpdateApiKey(parentObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "AccessPolicy", accessPolicyId )
			return utils.RequestResult{false, msg, "assignAccessPolicy", childObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a AccessPolicy on a ApiKey
//----------------------------------------------------------------------------
func UnassignAccessPolicyFromApiKey(apiKeyId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the ApiKey with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetApiKey(apiKeyId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.ApiKey so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.ApiKey)

		//----------------------------------------------------------------------------
		// assign an empty AccessPolicy to the AccessPolicy
		//----------------------------------------------------------------------------
		parentObj.AccessPolicy = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the AccessPolicy
		//----------------------------------------------------------------------------
		parentObj.AccessPolicyId = nil;

		//----------------------------------------------------------------------------
		// save the ApiKey
		//----------------------------------------------------------------------------
		return UpdateApiKey(parentObj)

	} else {
		return parentRequestResult
	}

}


