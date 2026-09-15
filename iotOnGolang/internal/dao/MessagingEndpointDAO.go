package dao

import (
    "iotOnGolang/internal/model"
    "iotOnGolang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing MessagingEndpointDAO..." ) )
}

//----------------------------------------------------------------------------
// CreateMessagingEndpoint - creates a new db entry
//----------------------------------------------------------------------------
func CreateMessagingEndpoint(obj model.MessagingEndpoint)(utils.RequestResult){
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
	    createMsg = fmt.Sprintf( "Created a MessagingEndpoint with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a MessagingEndpoint", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreateMessagingEndpoint", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetMessagingEndpoint - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetMessagingEndpoint(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.MessagingEndpoint

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a MessagingEndpoint with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a MessagingEndpoint using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a MessagingEndpoint using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetMessagingEndpoint", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllMessagingEndpoint - returns all
//----------------------------------------------------------------------------
func GetAllMessagingEndpoint()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.MessagingEndpoint

	//----------------------------------------------------------------------------
	// Request the ORM to find all MessagingEndpoint
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all MessagingEndpoint" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all MessagingEndpoint", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllMessagingEndpoint", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdateMessagingEndpoint - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdateMessagingEndpoint(obj model.MessagingEndpoint)(requestResult utils.RequestResult){
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
	    updateMsg = fmt.Sprintf( "Updated a MessagingEndpoint using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a MessagingEndpoint using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdateMessagingEndpoint", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeleteMessagingEndpoint - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeleteMessagingEndpoint(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the MessagingEndpoint with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetMessagingEndpoint(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.MessagingEndpoint so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.MessagingEndpoint)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a MessagingEndpoint using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a MessagingEndpoint using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeleteMessagingEndpoint", requestResult.Data}

	}

	return requestResult
}


//----------------------------------------------------------------------------
// assigns a Tenant on a MessagingEndpoint
//----------------------------------------------------------------------------
func AssignTenantToMessagingEndpoint( messagingEndpointId uint64, tenantId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the MessagingEndpoint with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetMessagingEndpoint(messagingEndpointId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.MessagingEndpoint so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.MessagingEndpoint)

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
			// assign the Tenant	to the MessagingEndpoint
			//----------------------------------------------------------------------------
			parentObj.Tenant = &childObj

			//----------------------------------------------------------------------------
			// save the MessagingEndpoint
			//----------------------------------------------------------------------------
			return UpdateMessagingEndpoint(parentObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Tenant", tenantId )
			return utils.RequestResult{false, msg, "assignTenant", childObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Tenant on a MessagingEndpoint
//----------------------------------------------------------------------------
func UnassignTenantFromMessagingEndpoint(messagingEndpointId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the MessagingEndpoint with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetMessagingEndpoint(messagingEndpointId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.MessagingEndpoint so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.MessagingEndpoint)

		//----------------------------------------------------------------------------
		// assign an empty Tenant to the Tenant
		//----------------------------------------------------------------------------
		parentObj.Tenant = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Tenant
		//----------------------------------------------------------------------------
		parentObj.TenantId = nil;

		//----------------------------------------------------------------------------
		// save the MessagingEndpoint
		//----------------------------------------------------------------------------
		return UpdateMessagingEndpoint(parentObj)

	} else {
		return parentRequestResult
	}

}


//----------------------------------------------------------------------------
// adds one or more streamsIds as a Streams to a MessagingEndpoint
//----------------------------------------------------------------------------
func AddStreamsToMessagingEndpoint ( messagingEndpointId uint64, streamsIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the MessagingEndpoint with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetMessagingEndpoint(messagingEndpointId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.MessagingEndpoint so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.MessagingEndpoint)

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
		// retrieve the modified MessagingEndpoint from the gorm
		//----------------------------------------------------------------------------
		return GetMessagingEndpoint(messagingEndpointId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more streamsIds as a Streams from a MessagingEndpoint
//----------------------------------------------------------------------------
func RemoveStreamsFromMessagingEndpoint( messagingEndpointId uint64, streamsIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the MessagingEndpoint with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetMessagingEndpoint(messagingEndpointId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.MessagingEndpoint so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.MessagingEndpoint)

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
		// retrieve the modified MessagingEndpoint from the gorm
		//----------------------------------------------------------------------------
		return GetMessagingEndpoint(messagingEndpointId)

	} else {
		return parentRequestResult
	}
}

