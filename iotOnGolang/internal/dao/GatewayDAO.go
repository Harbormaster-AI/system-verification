package dao

import (
    "iotOnGolang/internal/model"
    "iotOnGolang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing GatewayDAO..." ) )
}

//----------------------------------------------------------------------------
// CreateGateway - creates a new db entry
//----------------------------------------------------------------------------
func CreateGateway(obj model.Gateway)(utils.RequestResult){
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
	    createMsg = fmt.Sprintf( "Created a Gateway with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a Gateway", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreateGateway", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetGateway - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetGateway(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.Gateway

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a Gateway with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a Gateway using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a Gateway using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetGateway", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllGateway - returns all
//----------------------------------------------------------------------------
func GetAllGateway()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.Gateway

	//----------------------------------------------------------------------------
	// Request the ORM to find all Gateway
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all Gateway" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all Gateway", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllGateway", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdateGateway - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdateGateway(obj model.Gateway)(requestResult utils.RequestResult){
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
	    updateMsg = fmt.Sprintf( "Updated a Gateway using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a Gateway using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdateGateway", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeleteGateway - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeleteGateway(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the Gateway with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetGateway(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Gateway so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.Gateway)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a Gateway using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a Gateway using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeleteGateway", requestResult.Data}

	}

	return requestResult
}


//----------------------------------------------------------------------------
// assigns a Site on a Gateway
//----------------------------------------------------------------------------
func AssignSiteToGateway( gatewayId uint64, siteId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the Gateway with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetGateway(gatewayId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Gateway so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.Gateway)

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
			// assign the Site	to the Gateway
			//----------------------------------------------------------------------------
			parentObj.Site = &childObj

			//----------------------------------------------------------------------------
			// save the Gateway
			//----------------------------------------------------------------------------
			return UpdateGateway(parentObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Site", siteId )
			return utils.RequestResult{false, msg, "assignSite", childObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Site on a Gateway
//----------------------------------------------------------------------------
func UnassignSiteFromGateway(gatewayId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Gateway with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetGateway(gatewayId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Gateway so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.Gateway)

		//----------------------------------------------------------------------------
		// assign an empty Site to the Site
		//----------------------------------------------------------------------------
		parentObj.Site = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Site
		//----------------------------------------------------------------------------
		parentObj.SiteId = nil;

		//----------------------------------------------------------------------------
		// save the Gateway
		//----------------------------------------------------------------------------
		return UpdateGateway(parentObj)

	} else {
		return parentRequestResult
	}

}

//----------------------------------------------------------------------------
// assigns a Room on a Gateway
//----------------------------------------------------------------------------
func AssignRoomToGateway( gatewayId uint64, roomId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the Gateway with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetGateway(gatewayId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Gateway so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.Gateway)

		//----------------------------------------------------------------------------
		// Pass the reference to the ORM to get
		//----------------------------------------------------------------------------
		var childObj model.Room

		//----------------------------------------------------------------------------
		// Retrieve the 1st occurrence from the ORM of a Room with a
		// matching roomId
		//----------------------------------------------------------------------------
		childRequestResult := utils.GetDB().First(&childObj, roomId).Error // find first using identifier

		if childRequestResult == nil {
			//----------------------------------------------------------------------------
			// assign the Room	to the Gateway
			//----------------------------------------------------------------------------
			parentObj.Room = &childObj

			//----------------------------------------------------------------------------
			// save the Gateway
			//----------------------------------------------------------------------------
			return UpdateGateway(parentObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Room", roomId )
			return utils.RequestResult{false, msg, "assignRoom", childObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Room on a Gateway
//----------------------------------------------------------------------------
func UnassignRoomFromGateway(gatewayId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Gateway with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetGateway(gatewayId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Gateway so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.Gateway)

		//----------------------------------------------------------------------------
		// assign an empty Room to the Room
		//----------------------------------------------------------------------------
		parentObj.Room = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Room
		//----------------------------------------------------------------------------
		parentObj.RoomId = nil;

		//----------------------------------------------------------------------------
		// save the Gateway
		//----------------------------------------------------------------------------
		return UpdateGateway(parentObj)

	} else {
		return parentRequestResult
	}

}

//----------------------------------------------------------------------------
// assigns a DigitalTwin on a Gateway
//----------------------------------------------------------------------------
func AssignDigitalTwinToGateway( gatewayId uint64, digitalTwinId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the Gateway with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetGateway(gatewayId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Gateway so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.Gateway)

		//----------------------------------------------------------------------------
		// Pass the reference to the ORM to get
		//----------------------------------------------------------------------------
		var childObj model.DigitalTwin

		//----------------------------------------------------------------------------
		// Retrieve the 1st occurrence from the ORM of a DigitalTwin with a
		// matching digitalTwinId
		//----------------------------------------------------------------------------
		childRequestResult := utils.GetDB().First(&childObj, digitalTwinId).Error // find first using identifier

		if childRequestResult == nil {
			//----------------------------------------------------------------------------
			// assign the DigitalTwin	to the Gateway
			//----------------------------------------------------------------------------
			parentObj.DigitalTwin = &childObj

			//----------------------------------------------------------------------------
			// save the Gateway
			//----------------------------------------------------------------------------
			return UpdateGateway(parentObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "DigitalTwin", digitalTwinId )
			return utils.RequestResult{false, msg, "assignDigitalTwin", childObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a DigitalTwin on a Gateway
//----------------------------------------------------------------------------
func UnassignDigitalTwinFromGateway(gatewayId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Gateway with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetGateway(gatewayId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Gateway so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.Gateway)

		//----------------------------------------------------------------------------
		// assign an empty DigitalTwin to the DigitalTwin
		//----------------------------------------------------------------------------
		parentObj.DigitalTwin = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the DigitalTwin
		//----------------------------------------------------------------------------
		parentObj.DigitalTwinId = nil;

		//----------------------------------------------------------------------------
		// save the Gateway
		//----------------------------------------------------------------------------
		return UpdateGateway(parentObj)

	} else {
		return parentRequestResult
	}

}


//----------------------------------------------------------------------------
// adds one or more devicesIds as a Devices to a Gateway
//----------------------------------------------------------------------------
func AddDevicesToGateway ( gatewayId uint64, devicesIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Gateway with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetGateway(gatewayId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Gateway so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.Gateway)

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
		// retrieve the modified Gateway from the gorm
		//----------------------------------------------------------------------------
		return GetGateway(gatewayId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more devicesIds as a Devices from a Gateway
//----------------------------------------------------------------------------
func RemoveDevicesFromGateway( gatewayId uint64, devicesIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the Gateway with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetGateway(gatewayId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Gateway so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.Gateway)

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
		// retrieve the modified Gateway from the gorm
		//----------------------------------------------------------------------------
		return GetGateway(gatewayId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// adds one or more edgeApplicationsIds as a EdgeApplications to a Gateway
//----------------------------------------------------------------------------
func AddEdgeApplicationsToGateway ( gatewayId uint64, edgeApplicationsIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Gateway with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetGateway(gatewayId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Gateway so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.Gateway)

		// slice the ids on comma with no spaces
		ids := strings.Split( edgeApplicationsIds, ",")

		for _, edgeApplicationsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.EdgeApplication

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a EdgeApplication
			// with a matching edgeApplicationsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , edgeApplicationsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the EdgeApplications using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("EdgeApplications").Append( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "EdgeApplications", edgeApplicationsId )
				return utils.RequestResult{false, msg, "unassignEdgeApplications", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Gateway from the gorm
		//----------------------------------------------------------------------------
		return GetGateway(gatewayId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more edgeApplicationsIds as a EdgeApplications from a Gateway
//----------------------------------------------------------------------------
func RemoveEdgeApplicationsFromGateway( gatewayId uint64, edgeApplicationsIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the Gateway with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetGateway(gatewayId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Gateway so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.Gateway)

		// slice the ids on comma with no spaces
		ids := strings.Split( edgeApplicationsIds, ",")

		for _, edgeApplicationsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.EdgeApplication

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a EdgeApplication
			// with a matching edgeApplicationsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , edgeApplicationsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove EdgeApplicationObj from the EdgeApplications array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("EdgeApplications").Delete( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "EdgeApplications", edgeApplicationsId )
				return utils.RequestResult{false, msg, "removeEdgeApplications", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Gateway from the gorm
		//----------------------------------------------------------------------------
		return GetGateway(gatewayId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// adds one or more certificatesIds as a Certificates to a Gateway
//----------------------------------------------------------------------------
func AddCertificatesToGateway ( gatewayId uint64, certificatesIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Gateway with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetGateway(gatewayId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Gateway so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.Gateway)

		// slice the ids on comma with no spaces
		ids := strings.Split( certificatesIds, ",")

		for _, certificatesId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.DeviceCertificate

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a DeviceCertificate
			// with a matching certificatesId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , certificatesId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the Certificates using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("Certificates").Append( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Certificates", certificatesId )
				return utils.RequestResult{false, msg, "unassignCertificates", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Gateway from the gorm
		//----------------------------------------------------------------------------
		return GetGateway(gatewayId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more certificatesIds as a Certificates from a Gateway
//----------------------------------------------------------------------------
func RemoveCertificatesFromGateway( gatewayId uint64, certificatesIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the Gateway with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetGateway(gatewayId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Gateway so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.Gateway)

		// slice the ids on comma with no spaces
		ids := strings.Split( certificatesIds, ",")

		for _, certificatesId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.DeviceCertificate

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a DeviceCertificate
			// with a matching certificatesId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , certificatesId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove DeviceCertificateObj from the Certificates array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("Certificates").Delete( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Certificates", certificatesId )
				return utils.RequestResult{false, msg, "removeCertificates", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Gateway from the gorm
		//----------------------------------------------------------------------------
		return GetGateway(gatewayId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// adds one or more networkProfilesIds as a NetworkProfiles to a Gateway
//----------------------------------------------------------------------------
func AddNetworkProfilesToGateway ( gatewayId uint64, networkProfilesIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Gateway with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetGateway(gatewayId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Gateway so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.Gateway)

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
		// retrieve the modified Gateway from the gorm
		//----------------------------------------------------------------------------
		return GetGateway(gatewayId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more networkProfilesIds as a NetworkProfiles from a Gateway
//----------------------------------------------------------------------------
func RemoveNetworkProfilesFromGateway( gatewayId uint64, networkProfilesIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the Gateway with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetGateway(gatewayId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Gateway so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.Gateway)

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
		// retrieve the modified Gateway from the gorm
		//----------------------------------------------------------------------------
		return GetGateway(gatewayId)

	} else {
		return parentRequestResult
	}
}

