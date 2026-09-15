
package dao

import (
    "iotOnGolang/internal/model"
    "iotOnGolang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing ProvisioningRecordDAO..." ) )
}

//----------------------------------------------------------------------------
// CreateProvisioningRecord - creates a new db entry
//----------------------------------------------------------------------------
func CreateProvisioningRecord(obj model.ProvisioningRecord)(utils.RequestResult){
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
	    createMsg = fmt.Sprintf( "Created a ProvisioningRecord with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a ProvisioningRecord", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreateProvisioningRecord", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetProvisioningRecord - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetProvisioningRecord(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.ProvisioningRecord

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a ProvisioningRecord with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a ProvisioningRecord using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a ProvisioningRecord using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetProvisioningRecord", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllProvisioningRecord - returns all
//----------------------------------------------------------------------------
func GetAllProvisioningRecord()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.ProvisioningRecord

	//----------------------------------------------------------------------------
	// Request the ORM to find all ProvisioningRecord
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all ProvisioningRecord" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all ProvisioningRecord", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllProvisioningRecord", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdateProvisioningRecord - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdateProvisioningRecord(obj model.ProvisioningRecord)(requestResult utils.RequestResult){
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
	    updateMsg = fmt.Sprintf( "Updated a ProvisioningRecord using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a ProvisioningRecord using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdateProvisioningRecord", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeleteProvisioningRecord - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeleteProvisioningRecord(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the ProvisioningRecord with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetProvisioningRecord(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.ProvisioningRecord so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.ProvisioningRecord)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a ProvisioningRecord using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a ProvisioningRecord using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeleteProvisioningRecord", requestResult.Data}

	}

	return requestResult
}


//----------------------------------------------------------------------------
// assigns a Device on a ProvisioningRecord
//----------------------------------------------------------------------------
func AssignDeviceToProvisioningRecord( provisioningRecordId uint64, deviceId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the ProvisioningRecord with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetProvisioningRecord(provisioningRecordId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.ProvisioningRecord so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.ProvisioningRecord)

		//----------------------------------------------------------------------------
		// Pass the reference to the ORM to get
		//----------------------------------------------------------------------------
		var childObj model.IoTDevice

		//----------------------------------------------------------------------------
		// Retrieve the 1st occurrence from the ORM of a IoTDevice with a
		// matching deviceId
		//----------------------------------------------------------------------------
		childRequestResult := utils.GetDB().First(&childObj, deviceId).Error // find first using identifier

		if childRequestResult == nil {
			//----------------------------------------------------------------------------
			// assign the Device	to the ProvisioningRecord
			//----------------------------------------------------------------------------
			parentObj.Device = &childObj

			//----------------------------------------------------------------------------
			// save the ProvisioningRecord
			//----------------------------------------------------------------------------
			return UpdateProvisioningRecord(parentObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Device", deviceId )
			return utils.RequestResult{false, msg, "assignDevice", childObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Device on a ProvisioningRecord
//----------------------------------------------------------------------------
func UnassignDeviceFromProvisioningRecord(provisioningRecordId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the ProvisioningRecord with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetProvisioningRecord(provisioningRecordId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.ProvisioningRecord so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.ProvisioningRecord)

		//----------------------------------------------------------------------------
		// assign an empty IoTDevice to the Device
		//----------------------------------------------------------------------------
		parentObj.Device = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Device
		//----------------------------------------------------------------------------
		parentObj.DeviceId = nil;

		//----------------------------------------------------------------------------
		// save the ProvisioningRecord
		//----------------------------------------------------------------------------
		return UpdateProvisioningRecord(parentObj)

	} else {
		return parentRequestResult
	}

}

//----------------------------------------------------------------------------
// assigns a Certificate on a ProvisioningRecord
//----------------------------------------------------------------------------
func AssignCertificateToProvisioningRecord( provisioningRecordId uint64, certificateId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the ProvisioningRecord with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetProvisioningRecord(provisioningRecordId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.ProvisioningRecord so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.ProvisioningRecord)

		//----------------------------------------------------------------------------
		// Pass the reference to the ORM to get
		//----------------------------------------------------------------------------
		var childObj model.DeviceCertificate

		//----------------------------------------------------------------------------
		// Retrieve the 1st occurrence from the ORM of a DeviceCertificate with a
		// matching certificateId
		//----------------------------------------------------------------------------
		childRequestResult := utils.GetDB().First(&childObj, certificateId).Error // find first using identifier

		if childRequestResult == nil {
			//----------------------------------------------------------------------------
			// assign the Certificate	to the ProvisioningRecord
			//----------------------------------------------------------------------------
			parentObj.Certificate = &childObj

			//----------------------------------------------------------------------------
			// save the ProvisioningRecord
			//----------------------------------------------------------------------------
			return UpdateProvisioningRecord(parentObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Certificate", certificateId )
			return utils.RequestResult{false, msg, "assignCertificate", childObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Certificate on a ProvisioningRecord
//----------------------------------------------------------------------------
func UnassignCertificateFromProvisioningRecord(provisioningRecordId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the ProvisioningRecord with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetProvisioningRecord(provisioningRecordId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.ProvisioningRecord so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.ProvisioningRecord)

		//----------------------------------------------------------------------------
		// assign an empty DeviceCertificate to the Certificate
		//----------------------------------------------------------------------------
		parentObj.Certificate = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Certificate
		//----------------------------------------------------------------------------
		parentObj.CertificateId = nil;

		//----------------------------------------------------------------------------
		// save the ProvisioningRecord
		//----------------------------------------------------------------------------
		return UpdateProvisioningRecord(parentObj)

	} else {
		return parentRequestResult
	}

}

//----------------------------------------------------------------------------
// assigns a Tenant on a ProvisioningRecord
//----------------------------------------------------------------------------
func AssignTenantToProvisioningRecord( provisioningRecordId uint64, tenantId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the ProvisioningRecord with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetProvisioningRecord(provisioningRecordId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.ProvisioningRecord so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.ProvisioningRecord)

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
			// assign the Tenant	to the ProvisioningRecord
			//----------------------------------------------------------------------------
			parentObj.Tenant = &childObj

			//----------------------------------------------------------------------------
			// save the ProvisioningRecord
			//----------------------------------------------------------------------------
			return UpdateProvisioningRecord(parentObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Tenant", tenantId )
			return utils.RequestResult{false, msg, "assignTenant", childObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Tenant on a ProvisioningRecord
//----------------------------------------------------------------------------
func UnassignTenantFromProvisioningRecord(provisioningRecordId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the ProvisioningRecord with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetProvisioningRecord(provisioningRecordId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.ProvisioningRecord so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.ProvisioningRecord)

		//----------------------------------------------------------------------------
		// assign an empty Tenant to the Tenant
		//----------------------------------------------------------------------------
		parentObj.Tenant = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Tenant
		//----------------------------------------------------------------------------
		parentObj.TenantId = nil;

		//----------------------------------------------------------------------------
		// save the ProvisioningRecord
		//----------------------------------------------------------------------------
		return UpdateProvisioningRecord(parentObj)

	} else {
		return parentRequestResult
	}

}


