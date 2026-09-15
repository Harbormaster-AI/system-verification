
package dao

import (
    "iotOnGolang/internal/model"
    "iotOnGolang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing SiteDAO..." ) )
}

//----------------------------------------------------------------------------
// CreateSite - creates a new db entry
//----------------------------------------------------------------------------
func CreateSite(obj model.Site)(utils.RequestResult){
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
	    createMsg = fmt.Sprintf( "Created a Site with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a Site", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreateSite", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetSite - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetSite(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.Site

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a Site with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a Site using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a Site using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetSite", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllSite - returns all
//----------------------------------------------------------------------------
func GetAllSite()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.Site

	//----------------------------------------------------------------------------
	// Request the ORM to find all Site
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all Site" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all Site", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllSite", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdateSite - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdateSite(obj model.Site)(requestResult utils.RequestResult){
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
	    updateMsg = fmt.Sprintf( "Updated a Site using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a Site using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdateSite", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeleteSite - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeleteSite(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the Site with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetSite(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Site so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.Site)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a Site using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a Site using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeleteSite", requestResult.Data}

	}

	return requestResult
}


//----------------------------------------------------------------------------
// assigns a Tenant on a Site
//----------------------------------------------------------------------------
func AssignTenantToSite( siteId uint64, tenantId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the Site with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetSite(siteId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Site so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.Site)

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
			// assign the Tenant	to the Site
			//----------------------------------------------------------------------------
			parentObj.Tenant = &childObj

			//----------------------------------------------------------------------------
			// save the Site
			//----------------------------------------------------------------------------
			return UpdateSite(parentObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Tenant", tenantId )
			return utils.RequestResult{false, msg, "assignTenant", childObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Tenant on a Site
//----------------------------------------------------------------------------
func UnassignTenantFromSite(siteId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Site with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetSite(siteId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Site so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.Site)

		//----------------------------------------------------------------------------
		// assign an empty Tenant to the Tenant
		//----------------------------------------------------------------------------
		parentObj.Tenant = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Tenant
		//----------------------------------------------------------------------------
		parentObj.TenantId = nil;

		//----------------------------------------------------------------------------
		// save the Site
		//----------------------------------------------------------------------------
		return UpdateSite(parentObj)

	} else {
		return parentRequestResult
	}

}


//----------------------------------------------------------------------------
// adds one or more buildingsIds as a Buildings to a Site
//----------------------------------------------------------------------------
func AddBuildingsToSite ( siteId uint64, buildingsIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Site with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetSite(siteId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Site so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.Site)

		// slice the ids on comma with no spaces
		ids := strings.Split( buildingsIds, ",")

		for _, buildingsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.Building

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a Building
			// with a matching buildingsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , buildingsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the Buildings using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("Buildings").Append( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Buildings", buildingsId )
				return utils.RequestResult{false, msg, "unassignBuildings", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Site from the gorm
		//----------------------------------------------------------------------------
		return GetSite(siteId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more buildingsIds as a Buildings from a Site
//----------------------------------------------------------------------------
func RemoveBuildingsFromSite( siteId uint64, buildingsIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the Site with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetSite(siteId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Site so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.Site)

		// slice the ids on comma with no spaces
		ids := strings.Split( buildingsIds, ",")

		for _, buildingsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.Building

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a Building
			// with a matching buildingsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , buildingsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove BuildingObj from the Buildings array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("Buildings").Delete( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Buildings", buildingsId )
				return utils.RequestResult{false, msg, "removeBuildings", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Site from the gorm
		//----------------------------------------------------------------------------
		return GetSite(siteId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// adds one or more devicesIds as a Devices to a Site
//----------------------------------------------------------------------------
func AddDevicesToSite ( siteId uint64, devicesIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Site with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetSite(siteId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Site so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.Site)

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
		// retrieve the modified Site from the gorm
		//----------------------------------------------------------------------------
		return GetSite(siteId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more devicesIds as a Devices from a Site
//----------------------------------------------------------------------------
func RemoveDevicesFromSite( siteId uint64, devicesIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the Site with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetSite(siteId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Site so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.Site)

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
		// retrieve the modified Site from the gorm
		//----------------------------------------------------------------------------
		return GetSite(siteId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// adds one or more gatewaysIds as a Gateways to a Site
//----------------------------------------------------------------------------
func AddGatewaysToSite ( siteId uint64, gatewaysIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Site with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetSite(siteId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Site so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.Site)

		// slice the ids on comma with no spaces
		ids := strings.Split( gatewaysIds, ",")

		for _, gatewaysId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.Gateway

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a Gateway
			// with a matching gatewaysId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , gatewaysId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the Gateways using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("Gateways").Append( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Gateways", gatewaysId )
				return utils.RequestResult{false, msg, "unassignGateways", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Site from the gorm
		//----------------------------------------------------------------------------
		return GetSite(siteId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more gatewaysIds as a Gateways from a Site
//----------------------------------------------------------------------------
func RemoveGatewaysFromSite( siteId uint64, gatewaysIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the Site with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetSite(siteId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Site so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.Site)

		// slice the ids on comma with no spaces
		ids := strings.Split( gatewaysIds, ",")

		for _, gatewaysId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.Gateway

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a Gateway
			// with a matching gatewaysId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , gatewaysId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove GatewayObj from the Gateways array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("Gateways").Delete( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Gateways", gatewaysId )
				return utils.RequestResult{false, msg, "removeGateways", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Site from the gorm
		//----------------------------------------------------------------------------
		return GetSite(siteId)

	} else {
		return parentRequestResult
	}
}

