
package dao

import (
    "iotOnGolang/internal/model"
    "iotOnGolang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing TenantDAO..." ) )
}

//----------------------------------------------------------------------------
// CreateTenant - creates a new db entry
//----------------------------------------------------------------------------
func CreateTenant(obj model.Tenant)(utils.RequestResult){
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
	    createMsg = fmt.Sprintf( "Created a Tenant with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a Tenant", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreateTenant", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetTenant - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetTenant(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.Tenant

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a Tenant with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a Tenant using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a Tenant using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetTenant", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllTenant - returns all
//----------------------------------------------------------------------------
func GetAllTenant()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.Tenant

	//----------------------------------------------------------------------------
	// Request the ORM to find all Tenant
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all Tenant" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all Tenant", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllTenant", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdateTenant - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdateTenant(obj model.Tenant)(requestResult utils.RequestResult){
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
	    updateMsg = fmt.Sprintf( "Updated a Tenant using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a Tenant using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdateTenant", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeleteTenant - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeleteTenant(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the Tenant with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetTenant(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Tenant so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.Tenant)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a Tenant using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a Tenant using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeleteTenant", requestResult.Data}

	}

	return requestResult
}



//----------------------------------------------------------------------------
// adds one or more sitesIds as a Sites to a Tenant
//----------------------------------------------------------------------------
func AddSitesToTenant ( tenantId uint64, sitesIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Tenant with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetTenant(tenantId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Tenant so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.Tenant)

		// slice the ids on comma with no spaces
		ids := strings.Split( sitesIds, ",")

		for _, sitesId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.Site

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a Site
			// with a matching sitesId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , sitesId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the Sites using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("Sites").Append( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Sites", sitesId )
				return utils.RequestResult{false, msg, "unassignSites", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Tenant from the gorm
		//----------------------------------------------------------------------------
		return GetTenant(tenantId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more sitesIds as a Sites from a Tenant
//----------------------------------------------------------------------------
func RemoveSitesFromTenant( tenantId uint64, sitesIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the Tenant with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetTenant(tenantId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Tenant so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.Tenant)

		// slice the ids on comma with no spaces
		ids := strings.Split( sitesIds, ",")

		for _, sitesId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.Site

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a Site
			// with a matching sitesId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , sitesId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove SiteObj from the Sites array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("Sites").Delete( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Sites", sitesId )
				return utils.RequestResult{false, msg, "removeSites", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Tenant from the gorm
		//----------------------------------------------------------------------------
		return GetTenant(tenantId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// adds one or more usersIds as a Users to a Tenant
//----------------------------------------------------------------------------
func AddUsersToTenant ( tenantId uint64, usersIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Tenant with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetTenant(tenantId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Tenant so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.Tenant)

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
		// retrieve the modified Tenant from the gorm
		//----------------------------------------------------------------------------
		return GetTenant(tenantId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more usersIds as a Users from a Tenant
//----------------------------------------------------------------------------
func RemoveUsersFromTenant( tenantId uint64, usersIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the Tenant with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetTenant(tenantId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Tenant so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.Tenant)

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
		// retrieve the modified Tenant from the gorm
		//----------------------------------------------------------------------------
		return GetTenant(tenantId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// adds one or more devicesIds as a Devices to a Tenant
//----------------------------------------------------------------------------
func AddDevicesToTenant ( tenantId uint64, devicesIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Tenant with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetTenant(tenantId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Tenant so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.Tenant)

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
		// retrieve the modified Tenant from the gorm
		//----------------------------------------------------------------------------
		return GetTenant(tenantId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more devicesIds as a Devices from a Tenant
//----------------------------------------------------------------------------
func RemoveDevicesFromTenant( tenantId uint64, devicesIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the Tenant with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetTenant(tenantId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Tenant so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.Tenant)

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
		// retrieve the modified Tenant from the gorm
		//----------------------------------------------------------------------------
		return GetTenant(tenantId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// adds one or more dataRetentionPoliciesIds as a DataRetentionPolicies to a Tenant
//----------------------------------------------------------------------------
func AddDataRetentionPoliciesToTenant ( tenantId uint64, dataRetentionPoliciesIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Tenant with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetTenant(tenantId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Tenant so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.Tenant)

		// slice the ids on comma with no spaces
		ids := strings.Split( dataRetentionPoliciesIds, ",")

		for _, dataRetentionPoliciesId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.DataRetentionPolicy

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a DataRetentionPolicy
			// with a matching dataRetentionPoliciesId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , dataRetentionPoliciesId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the DataRetentionPolicies using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("DataRetentionPolicies").Append( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "DataRetentionPolicies", dataRetentionPoliciesId )
				return utils.RequestResult{false, msg, "unassignDataRetentionPolicies", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Tenant from the gorm
		//----------------------------------------------------------------------------
		return GetTenant(tenantId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more dataRetentionPoliciesIds as a DataRetentionPolicies from a Tenant
//----------------------------------------------------------------------------
func RemoveDataRetentionPoliciesFromTenant( tenantId uint64, dataRetentionPoliciesIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the Tenant with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetTenant(tenantId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Tenant so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.Tenant)

		// slice the ids on comma with no spaces
		ids := strings.Split( dataRetentionPoliciesIds, ",")

		for _, dataRetentionPoliciesId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.DataRetentionPolicy

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a DataRetentionPolicy
			// with a matching dataRetentionPoliciesId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , dataRetentionPoliciesId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove DataRetentionPolicyObj from the DataRetentionPolicies array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("DataRetentionPolicies").Delete( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "DataRetentionPolicies", dataRetentionPoliciesId )
				return utils.RequestResult{false, msg, "removeDataRetentionPolicies", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Tenant from the gorm
		//----------------------------------------------------------------------------
		return GetTenant(tenantId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// adds one or more connectivityPlansIds as a ConnectivityPlans to a Tenant
//----------------------------------------------------------------------------
func AddConnectivityPlansToTenant ( tenantId uint64, connectivityPlansIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Tenant with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetTenant(tenantId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Tenant so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.Tenant)

		// slice the ids on comma with no spaces
		ids := strings.Split( connectivityPlansIds, ",")

		for _, connectivityPlansId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.ConnectivityPlan

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a ConnectivityPlan
			// with a matching connectivityPlansId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , connectivityPlansId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the ConnectivityPlans using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("ConnectivityPlans").Append( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "ConnectivityPlans", connectivityPlansId )
				return utils.RequestResult{false, msg, "unassignConnectivityPlans", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Tenant from the gorm
		//----------------------------------------------------------------------------
		return GetTenant(tenantId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more connectivityPlansIds as a ConnectivityPlans from a Tenant
//----------------------------------------------------------------------------
func RemoveConnectivityPlansFromTenant( tenantId uint64, connectivityPlansIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the Tenant with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetTenant(tenantId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Tenant so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.Tenant)

		// slice the ids on comma with no spaces
		ids := strings.Split( connectivityPlansIds, ",")

		for _, connectivityPlansId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.ConnectivityPlan

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a ConnectivityPlan
			// with a matching connectivityPlansId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , connectivityPlansId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove ConnectivityPlanObj from the ConnectivityPlans array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("ConnectivityPlans").Delete( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "ConnectivityPlans", connectivityPlansId )
				return utils.RequestResult{false, msg, "removeConnectivityPlans", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Tenant from the gorm
		//----------------------------------------------------------------------------
		return GetTenant(tenantId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// adds one or more simCardsIds as a SimCards to a Tenant
//----------------------------------------------------------------------------
func AddSimCardsToTenant ( tenantId uint64, simCardsIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Tenant with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetTenant(tenantId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Tenant so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.Tenant)

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
		// retrieve the modified Tenant from the gorm
		//----------------------------------------------------------------------------
		return GetTenant(tenantId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more simCardsIds as a SimCards from a Tenant
//----------------------------------------------------------------------------
func RemoveSimCardsFromTenant( tenantId uint64, simCardsIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the Tenant with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetTenant(tenantId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Tenant so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.Tenant)

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
		// retrieve the modified Tenant from the gorm
		//----------------------------------------------------------------------------
		return GetTenant(tenantId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// adds one or more messagingEndpointsIds as a MessagingEndpoints to a Tenant
//----------------------------------------------------------------------------
func AddMessagingEndpointsToTenant ( tenantId uint64, messagingEndpointsIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Tenant with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetTenant(tenantId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Tenant so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.Tenant)

		// slice the ids on comma with no spaces
		ids := strings.Split( messagingEndpointsIds, ",")

		for _, messagingEndpointsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.MessagingEndpoint

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a MessagingEndpoint
			// with a matching messagingEndpointsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , messagingEndpointsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the MessagingEndpoints using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("MessagingEndpoints").Append( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "MessagingEndpoints", messagingEndpointsId )
				return utils.RequestResult{false, msg, "unassignMessagingEndpoints", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Tenant from the gorm
		//----------------------------------------------------------------------------
		return GetTenant(tenantId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more messagingEndpointsIds as a MessagingEndpoints from a Tenant
//----------------------------------------------------------------------------
func RemoveMessagingEndpointsFromTenant( tenantId uint64, messagingEndpointsIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the Tenant with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetTenant(tenantId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Tenant so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.Tenant)

		// slice the ids on comma with no spaces
		ids := strings.Split( messagingEndpointsIds, ",")

		for _, messagingEndpointsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.MessagingEndpoint

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a MessagingEndpoint
			// with a matching messagingEndpointsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , messagingEndpointsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove MessagingEndpointObj from the MessagingEndpoints array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("MessagingEndpoints").Delete( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "MessagingEndpoints", messagingEndpointsId )
				return utils.RequestResult{false, msg, "removeMessagingEndpoints", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Tenant from the gorm
		//----------------------------------------------------------------------------
		return GetTenant(tenantId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// adds one or more accessPoliciesIds as a AccessPolicies to a Tenant
//----------------------------------------------------------------------------
func AddAccessPoliciesToTenant ( tenantId uint64, accessPoliciesIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Tenant with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetTenant(tenantId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Tenant so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.Tenant)

		// slice the ids on comma with no spaces
		ids := strings.Split( accessPoliciesIds, ",")

		for _, accessPoliciesId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.AccessPolicy

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a AccessPolicy
			// with a matching accessPoliciesId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , accessPoliciesId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the AccessPolicies using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("AccessPolicies").Append( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "AccessPolicies", accessPoliciesId )
				return utils.RequestResult{false, msg, "unassignAccessPolicies", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Tenant from the gorm
		//----------------------------------------------------------------------------
		return GetTenant(tenantId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more accessPoliciesIds as a AccessPolicies from a Tenant
//----------------------------------------------------------------------------
func RemoveAccessPoliciesFromTenant( tenantId uint64, accessPoliciesIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the Tenant with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetTenant(tenantId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Tenant so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.Tenant)

		// slice the ids on comma with no spaces
		ids := strings.Split( accessPoliciesIds, ",")

		for _, accessPoliciesId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.AccessPolicy

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a AccessPolicy
			// with a matching accessPoliciesId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , accessPoliciesId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove AccessPolicyObj from the AccessPolicies array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("AccessPolicies").Delete( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "AccessPolicies", accessPoliciesId )
				return utils.RequestResult{false, msg, "removeAccessPolicies", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Tenant from the gorm
		//----------------------------------------------------------------------------
		return GetTenant(tenantId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// adds one or more deviceGroupsIds as a DeviceGroups to a Tenant
//----------------------------------------------------------------------------
func AddDeviceGroupsToTenant ( tenantId uint64, deviceGroupsIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Tenant with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetTenant(tenantId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Tenant so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.Tenant)

		// slice the ids on comma with no spaces
		ids := strings.Split( deviceGroupsIds, ",")

		for _, deviceGroupsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.DeviceGroup

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a DeviceGroup
			// with a matching deviceGroupsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , deviceGroupsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the DeviceGroups using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("DeviceGroups").Append( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "DeviceGroups", deviceGroupsId )
				return utils.RequestResult{false, msg, "unassignDeviceGroups", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Tenant from the gorm
		//----------------------------------------------------------------------------
		return GetTenant(tenantId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more deviceGroupsIds as a DeviceGroups from a Tenant
//----------------------------------------------------------------------------
func RemoveDeviceGroupsFromTenant( tenantId uint64, deviceGroupsIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the Tenant with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetTenant(tenantId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Tenant so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.Tenant)

		// slice the ids on comma with no spaces
		ids := strings.Split( deviceGroupsIds, ",")

		for _, deviceGroupsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.DeviceGroup

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a DeviceGroup
			// with a matching deviceGroupsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , deviceGroupsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove DeviceGroupObj from the DeviceGroups array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("DeviceGroups").Delete( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "DeviceGroups", deviceGroupsId )
				return utils.RequestResult{false, msg, "removeDeviceGroups", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Tenant from the gorm
		//----------------------------------------------------------------------------
		return GetTenant(tenantId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// adds one or more alertRulesIds as a AlertRules to a Tenant
//----------------------------------------------------------------------------
func AddAlertRulesToTenant ( tenantId uint64, alertRulesIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Tenant with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetTenant(tenantId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Tenant so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.Tenant)

		// slice the ids on comma with no spaces
		ids := strings.Split( alertRulesIds, ",")

		for _, alertRulesId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.AlertRule

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a AlertRule
			// with a matching alertRulesId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , alertRulesId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the AlertRules using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("AlertRules").Append( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "AlertRules", alertRulesId )
				return utils.RequestResult{false, msg, "unassignAlertRules", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Tenant from the gorm
		//----------------------------------------------------------------------------
		return GetTenant(tenantId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more alertRulesIds as a AlertRules from a Tenant
//----------------------------------------------------------------------------
func RemoveAlertRulesFromTenant( tenantId uint64, alertRulesIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the Tenant with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetTenant(tenantId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Tenant so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.Tenant)

		// slice the ids on comma with no spaces
		ids := strings.Split( alertRulesIds, ",")

		for _, alertRulesId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.AlertRule

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a AlertRule
			// with a matching alertRulesId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , alertRulesId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove AlertRuleObj from the AlertRules array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("AlertRules").Delete( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "AlertRules", alertRulesId )
				return utils.RequestResult{false, msg, "removeAlertRules", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Tenant from the gorm
		//----------------------------------------------------------------------------
		return GetTenant(tenantId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// adds one or more maintenanceTicketsIds as a MaintenanceTickets to a Tenant
//----------------------------------------------------------------------------
func AddMaintenanceTicketsToTenant ( tenantId uint64, maintenanceTicketsIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Tenant with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetTenant(tenantId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Tenant so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.Tenant)

		// slice the ids on comma with no spaces
		ids := strings.Split( maintenanceTicketsIds, ",")

		for _, maintenanceTicketsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.MaintenanceTicket

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a MaintenanceTicket
			// with a matching maintenanceTicketsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , maintenanceTicketsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the MaintenanceTickets using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("MaintenanceTickets").Append( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "MaintenanceTickets", maintenanceTicketsId )
				return utils.RequestResult{false, msg, "unassignMaintenanceTickets", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Tenant from the gorm
		//----------------------------------------------------------------------------
		return GetTenant(tenantId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more maintenanceTicketsIds as a MaintenanceTickets from a Tenant
//----------------------------------------------------------------------------
func RemoveMaintenanceTicketsFromTenant( tenantId uint64, maintenanceTicketsIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the Tenant with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetTenant(tenantId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Tenant so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.Tenant)

		// slice the ids on comma with no spaces
		ids := strings.Split( maintenanceTicketsIds, ",")

		for _, maintenanceTicketsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.MaintenanceTicket

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a MaintenanceTicket
			// with a matching maintenanceTicketsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , maintenanceTicketsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove MaintenanceTicketObj from the MaintenanceTickets array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("MaintenanceTickets").Delete( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "MaintenanceTickets", maintenanceTicketsId )
				return utils.RequestResult{false, msg, "removeMaintenanceTickets", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Tenant from the gorm
		//----------------------------------------------------------------------------
		return GetTenant(tenantId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// adds one or more usageRecordsIds as a UsageRecords to a Tenant
//----------------------------------------------------------------------------
func AddUsageRecordsToTenant ( tenantId uint64, usageRecordsIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Tenant with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetTenant(tenantId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Tenant so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.Tenant)

		// slice the ids on comma with no spaces
		ids := strings.Split( usageRecordsIds, ",")

		for _, usageRecordsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.UsageRecord

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a UsageRecord
			// with a matching usageRecordsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , usageRecordsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the UsageRecords using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("UsageRecords").Append( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "UsageRecords", usageRecordsId )
				return utils.RequestResult{false, msg, "unassignUsageRecords", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Tenant from the gorm
		//----------------------------------------------------------------------------
		return GetTenant(tenantId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more usageRecordsIds as a UsageRecords from a Tenant
//----------------------------------------------------------------------------
func RemoveUsageRecordsFromTenant( tenantId uint64, usageRecordsIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the Tenant with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetTenant(tenantId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Tenant so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.Tenant)

		// slice the ids on comma with no spaces
		ids := strings.Split( usageRecordsIds, ",")

		for _, usageRecordsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.UsageRecord

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a UsageRecord
			// with a matching usageRecordsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , usageRecordsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove UsageRecordObj from the UsageRecords array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("UsageRecords").Delete( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "UsageRecords", usageRecordsId )
				return utils.RequestResult{false, msg, "removeUsageRecords", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Tenant from the gorm
		//----------------------------------------------------------------------------
		return GetTenant(tenantId)

	} else {
		return parentRequestResult
	}
}

