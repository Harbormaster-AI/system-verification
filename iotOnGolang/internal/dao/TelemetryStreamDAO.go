
package dao

import (
    "iotOnGolang/internal/model"
    "iotOnGolang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing TelemetryStreamDAO..." ) )
}

//----------------------------------------------------------------------------
// CreateTelemetryStream - creates a new db entry
//----------------------------------------------------------------------------
func CreateTelemetryStream(obj model.TelemetryStream)(utils.RequestResult){
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
	    createMsg = fmt.Sprintf( "Created a TelemetryStream with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a TelemetryStream", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreateTelemetryStream", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetTelemetryStream - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetTelemetryStream(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.TelemetryStream

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a TelemetryStream with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a TelemetryStream using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a TelemetryStream using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetTelemetryStream", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllTelemetryStream - returns all
//----------------------------------------------------------------------------
func GetAllTelemetryStream()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.TelemetryStream

	//----------------------------------------------------------------------------
	// Request the ORM to find all TelemetryStream
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all TelemetryStream" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all TelemetryStream", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllTelemetryStream", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdateTelemetryStream - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdateTelemetryStream(obj model.TelemetryStream)(requestResult utils.RequestResult){
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
	    updateMsg = fmt.Sprintf( "Updated a TelemetryStream using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a TelemetryStream using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdateTelemetryStream", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeleteTelemetryStream - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeleteTelemetryStream(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the TelemetryStream with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetTelemetryStream(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.TelemetryStream so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.TelemetryStream)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a TelemetryStream using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a TelemetryStream using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeleteTelemetryStream", requestResult.Data}

	}

	return requestResult
}


//----------------------------------------------------------------------------
// assigns a Device on a TelemetryStream
//----------------------------------------------------------------------------
func AssignDeviceToTelemetryStream( telemetryStreamId uint64, deviceId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the TelemetryStream with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetTelemetryStream(telemetryStreamId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.TelemetryStream so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.TelemetryStream)

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
			// assign the Device	to the TelemetryStream
			//----------------------------------------------------------------------------
			parentObj.Device = &childObj

			//----------------------------------------------------------------------------
			// save the TelemetryStream
			//----------------------------------------------------------------------------
			return UpdateTelemetryStream(parentObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Device", deviceId )
			return utils.RequestResult{false, msg, "assignDevice", childObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Device on a TelemetryStream
//----------------------------------------------------------------------------
func UnassignDeviceFromTelemetryStream(telemetryStreamId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the TelemetryStream with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetTelemetryStream(telemetryStreamId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.TelemetryStream so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.TelemetryStream)

		//----------------------------------------------------------------------------
		// assign an empty IoTDevice to the Device
		//----------------------------------------------------------------------------
		parentObj.Device = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Device
		//----------------------------------------------------------------------------
		parentObj.DeviceId = nil;

		//----------------------------------------------------------------------------
		// save the TelemetryStream
		//----------------------------------------------------------------------------
		return UpdateTelemetryStream(parentObj)

	} else {
		return parentRequestResult
	}

}

//----------------------------------------------------------------------------
// assigns a Sensor on a TelemetryStream
//----------------------------------------------------------------------------
func AssignSensorToTelemetryStream( telemetryStreamId uint64, sensorId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the TelemetryStream with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetTelemetryStream(telemetryStreamId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.TelemetryStream so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.TelemetryStream)

		//----------------------------------------------------------------------------
		// Pass the reference to the ORM to get
		//----------------------------------------------------------------------------
		var childObj model.SensorInstance

		//----------------------------------------------------------------------------
		// Retrieve the 1st occurrence from the ORM of a SensorInstance with a
		// matching sensorId
		//----------------------------------------------------------------------------
		childRequestResult := utils.GetDB().First(&childObj, sensorId).Error // find first using identifier

		if childRequestResult == nil {
			//----------------------------------------------------------------------------
			// assign the Sensor	to the TelemetryStream
			//----------------------------------------------------------------------------
			parentObj.Sensor = &childObj

			//----------------------------------------------------------------------------
			// save the TelemetryStream
			//----------------------------------------------------------------------------
			return UpdateTelemetryStream(parentObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Sensor", sensorId )
			return utils.RequestResult{false, msg, "assignSensor", childObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Sensor on a TelemetryStream
//----------------------------------------------------------------------------
func UnassignSensorFromTelemetryStream(telemetryStreamId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the TelemetryStream with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetTelemetryStream(telemetryStreamId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.TelemetryStream so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.TelemetryStream)

		//----------------------------------------------------------------------------
		// assign an empty SensorInstance to the Sensor
		//----------------------------------------------------------------------------
		parentObj.Sensor = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Sensor
		//----------------------------------------------------------------------------
		parentObj.SensorId = nil;

		//----------------------------------------------------------------------------
		// save the TelemetryStream
		//----------------------------------------------------------------------------
		return UpdateTelemetryStream(parentObj)

	} else {
		return parentRequestResult
	}

}

//----------------------------------------------------------------------------
// assigns a Schema on a TelemetryStream
//----------------------------------------------------------------------------
func AssignSchemaToTelemetryStream( telemetryStreamId uint64, schemaId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the TelemetryStream with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetTelemetryStream(telemetryStreamId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.TelemetryStream so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.TelemetryStream)

		//----------------------------------------------------------------------------
		// Pass the reference to the ORM to get
		//----------------------------------------------------------------------------
		var childObj model.TelemetrySchema

		//----------------------------------------------------------------------------
		// Retrieve the 1st occurrence from the ORM of a TelemetrySchema with a
		// matching schemaId
		//----------------------------------------------------------------------------
		childRequestResult := utils.GetDB().First(&childObj, schemaId).Error // find first using identifier

		if childRequestResult == nil {
			//----------------------------------------------------------------------------
			// assign the Schema	to the TelemetryStream
			//----------------------------------------------------------------------------
			parentObj.Schema = &childObj

			//----------------------------------------------------------------------------
			// save the TelemetryStream
			//----------------------------------------------------------------------------
			return UpdateTelemetryStream(parentObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Schema", schemaId )
			return utils.RequestResult{false, msg, "assignSchema", childObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Schema on a TelemetryStream
//----------------------------------------------------------------------------
func UnassignSchemaFromTelemetryStream(telemetryStreamId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the TelemetryStream with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetTelemetryStream(telemetryStreamId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.TelemetryStream so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.TelemetryStream)

		//----------------------------------------------------------------------------
		// assign an empty TelemetrySchema to the Schema
		//----------------------------------------------------------------------------
		parentObj.Schema = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Schema
		//----------------------------------------------------------------------------
		parentObj.SchemaId = nil;

		//----------------------------------------------------------------------------
		// save the TelemetryStream
		//----------------------------------------------------------------------------
		return UpdateTelemetryStream(parentObj)

	} else {
		return parentRequestResult
	}

}

//----------------------------------------------------------------------------
// assigns a MessagingEndpoint on a TelemetryStream
//----------------------------------------------------------------------------
func AssignMessagingEndpointToTelemetryStream( telemetryStreamId uint64, messagingEndpointId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the TelemetryStream with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetTelemetryStream(telemetryStreamId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.TelemetryStream so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.TelemetryStream)

		//----------------------------------------------------------------------------
		// Pass the reference to the ORM to get
		//----------------------------------------------------------------------------
		var childObj model.MessagingEndpoint

		//----------------------------------------------------------------------------
		// Retrieve the 1st occurrence from the ORM of a MessagingEndpoint with a
		// matching messagingEndpointId
		//----------------------------------------------------------------------------
		childRequestResult := utils.GetDB().First(&childObj, messagingEndpointId).Error // find first using identifier

		if childRequestResult == nil {
			//----------------------------------------------------------------------------
			// assign the MessagingEndpoint	to the TelemetryStream
			//----------------------------------------------------------------------------
			parentObj.MessagingEndpoint = &childObj

			//----------------------------------------------------------------------------
			// save the TelemetryStream
			//----------------------------------------------------------------------------
			return UpdateTelemetryStream(parentObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "MessagingEndpoint", messagingEndpointId )
			return utils.RequestResult{false, msg, "assignMessagingEndpoint", childObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a MessagingEndpoint on a TelemetryStream
//----------------------------------------------------------------------------
func UnassignMessagingEndpointFromTelemetryStream(telemetryStreamId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the TelemetryStream with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetTelemetryStream(telemetryStreamId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.TelemetryStream so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.TelemetryStream)

		//----------------------------------------------------------------------------
		// assign an empty MessagingEndpoint to the MessagingEndpoint
		//----------------------------------------------------------------------------
		parentObj.MessagingEndpoint = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the MessagingEndpoint
		//----------------------------------------------------------------------------
		parentObj.MessagingEndpointId = nil;

		//----------------------------------------------------------------------------
		// save the TelemetryStream
		//----------------------------------------------------------------------------
		return UpdateTelemetryStream(parentObj)

	} else {
		return parentRequestResult
	}

}

//----------------------------------------------------------------------------
// assigns a RetentionPolicy on a TelemetryStream
//----------------------------------------------------------------------------
func AssignRetentionPolicyToTelemetryStream( telemetryStreamId uint64, retentionPolicyId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the TelemetryStream with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetTelemetryStream(telemetryStreamId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.TelemetryStream so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.TelemetryStream)

		//----------------------------------------------------------------------------
		// Pass the reference to the ORM to get
		//----------------------------------------------------------------------------
		var childObj model.DataRetentionPolicy

		//----------------------------------------------------------------------------
		// Retrieve the 1st occurrence from the ORM of a DataRetentionPolicy with a
		// matching retentionPolicyId
		//----------------------------------------------------------------------------
		childRequestResult := utils.GetDB().First(&childObj, retentionPolicyId).Error // find first using identifier

		if childRequestResult == nil {
			//----------------------------------------------------------------------------
			// assign the RetentionPolicy	to the TelemetryStream
			//----------------------------------------------------------------------------
			parentObj.RetentionPolicy = &childObj

			//----------------------------------------------------------------------------
			// save the TelemetryStream
			//----------------------------------------------------------------------------
			return UpdateTelemetryStream(parentObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "RetentionPolicy", retentionPolicyId )
			return utils.RequestResult{false, msg, "assignRetentionPolicy", childObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a RetentionPolicy on a TelemetryStream
//----------------------------------------------------------------------------
func UnassignRetentionPolicyFromTelemetryStream(telemetryStreamId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the TelemetryStream with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetTelemetryStream(telemetryStreamId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.TelemetryStream so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.TelemetryStream)

		//----------------------------------------------------------------------------
		// assign an empty DataRetentionPolicy to the RetentionPolicy
		//----------------------------------------------------------------------------
		parentObj.RetentionPolicy = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the RetentionPolicy
		//----------------------------------------------------------------------------
		parentObj.RetentionPolicyId = nil;

		//----------------------------------------------------------------------------
		// save the TelemetryStream
		//----------------------------------------------------------------------------
		return UpdateTelemetryStream(parentObj)

	} else {
		return parentRequestResult
	}

}


