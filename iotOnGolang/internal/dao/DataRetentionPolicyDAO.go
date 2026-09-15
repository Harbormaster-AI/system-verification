
package dao

import (
    "iotOnGolang/internal/model"
    "iotOnGolang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing DataRetentionPolicyDAO..." ) )
}

//----------------------------------------------------------------------------
// CreateDataRetentionPolicy - creates a new db entry
//----------------------------------------------------------------------------
func CreateDataRetentionPolicy(obj model.DataRetentionPolicy)(utils.RequestResult){
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
	    createMsg = fmt.Sprintf( "Created a DataRetentionPolicy with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a DataRetentionPolicy", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreateDataRetentionPolicy", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetDataRetentionPolicy - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetDataRetentionPolicy(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.DataRetentionPolicy

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a DataRetentionPolicy with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a DataRetentionPolicy using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a DataRetentionPolicy using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetDataRetentionPolicy", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllDataRetentionPolicy - returns all
//----------------------------------------------------------------------------
func GetAllDataRetentionPolicy()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.DataRetentionPolicy

	//----------------------------------------------------------------------------
	// Request the ORM to find all DataRetentionPolicy
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all DataRetentionPolicy" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all DataRetentionPolicy", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllDataRetentionPolicy", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdateDataRetentionPolicy - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdateDataRetentionPolicy(obj model.DataRetentionPolicy)(requestResult utils.RequestResult){
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
	    updateMsg = fmt.Sprintf( "Updated a DataRetentionPolicy using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a DataRetentionPolicy using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdateDataRetentionPolicy", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeleteDataRetentionPolicy - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeleteDataRetentionPolicy(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the DataRetentionPolicy with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetDataRetentionPolicy(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.DataRetentionPolicy so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.DataRetentionPolicy)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a DataRetentionPolicy using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a DataRetentionPolicy using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeleteDataRetentionPolicy", requestResult.Data}

	}

	return requestResult
}


//----------------------------------------------------------------------------
// assigns a Tenant on a DataRetentionPolicy
//----------------------------------------------------------------------------
func AssignTenantToDataRetentionPolicy( dataRetentionPolicyId uint64, tenantId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the DataRetentionPolicy with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetDataRetentionPolicy(dataRetentionPolicyId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.DataRetentionPolicy so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.DataRetentionPolicy)

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
			// assign the Tenant	to the DataRetentionPolicy
			//----------------------------------------------------------------------------
			parentObj.Tenant = &childObj

			//----------------------------------------------------------------------------
			// save the DataRetentionPolicy
			//----------------------------------------------------------------------------
			return UpdateDataRetentionPolicy(parentObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Tenant", tenantId )
			return utils.RequestResult{false, msg, "assignTenant", childObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Tenant on a DataRetentionPolicy
//----------------------------------------------------------------------------
func UnassignTenantFromDataRetentionPolicy(dataRetentionPolicyId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the DataRetentionPolicy with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetDataRetentionPolicy(dataRetentionPolicyId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.DataRetentionPolicy so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.DataRetentionPolicy)

		//----------------------------------------------------------------------------
		// assign an empty Tenant to the Tenant
		//----------------------------------------------------------------------------
		parentObj.Tenant = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Tenant
		//----------------------------------------------------------------------------
		parentObj.TenantId = nil;

		//----------------------------------------------------------------------------
		// save the DataRetentionPolicy
		//----------------------------------------------------------------------------
		return UpdateDataRetentionPolicy(parentObj)

	} else {
		return parentRequestResult
	}

}


//----------------------------------------------------------------------------
// adds one or more streamsIds as a Streams to a DataRetentionPolicy
//----------------------------------------------------------------------------
func AddStreamsToDataRetentionPolicy ( dataRetentionPolicyId uint64, streamsIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the DataRetentionPolicy with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetDataRetentionPolicy(dataRetentionPolicyId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.DataRetentionPolicy so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.DataRetentionPolicy)

		// slice the ids on comma with no spaces
		ids := strings.Split( streamsIds, ",")

		for _, streamsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.TelemetryStream

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a TelemetryStream
			// with a matching streamsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , streamsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the Streams using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("Streams").Append( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Streams", streamsId )
				return utils.RequestResult{false, msg, "unassignStreams", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified DataRetentionPolicy from the gorm
		//----------------------------------------------------------------------------
		return GetDataRetentionPolicy(dataRetentionPolicyId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more streamsIds as a Streams from a DataRetentionPolicy
//----------------------------------------------------------------------------
func RemoveStreamsFromDataRetentionPolicy( dataRetentionPolicyId uint64, streamsIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the DataRetentionPolicy with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetDataRetentionPolicy(dataRetentionPolicyId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.DataRetentionPolicy so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.DataRetentionPolicy)

		// slice the ids on comma with no spaces
		ids := strings.Split( streamsIds, ",")

		for _, streamsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.TelemetryStream

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a TelemetryStream
			// with a matching streamsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , streamsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove TelemetryStreamObj from the Streams array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("Streams").Delete( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Streams", streamsId )
				return utils.RequestResult{false, msg, "removeStreams", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified DataRetentionPolicy from the gorm
		//----------------------------------------------------------------------------
		return GetDataRetentionPolicy(dataRetentionPolicyId)

	} else {
		return parentRequestResult
	}
}

