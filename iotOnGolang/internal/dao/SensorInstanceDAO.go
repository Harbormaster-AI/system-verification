
package dao

import (
    "iotOnGolang/internal/model"
    "iotOnGolang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing SensorInstanceDAO..." ) )
}

//----------------------------------------------------------------------------
// CreateSensorInstance - creates a new db entry
//----------------------------------------------------------------------------
func CreateSensorInstance(obj model.SensorInstance)(utils.RequestResult){
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
	    createMsg = fmt.Sprintf( "Created a SensorInstance with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a SensorInstance", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreateSensorInstance", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetSensorInstance - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetSensorInstance(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.SensorInstance

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a SensorInstance with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a SensorInstance using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a SensorInstance using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetSensorInstance", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllSensorInstance - returns all
//----------------------------------------------------------------------------
func GetAllSensorInstance()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.SensorInstance

	//----------------------------------------------------------------------------
	// Request the ORM to find all SensorInstance
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all SensorInstance" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all SensorInstance", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllSensorInstance", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdateSensorInstance - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdateSensorInstance(obj model.SensorInstance)(requestResult utils.RequestResult){
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
	    updateMsg = fmt.Sprintf( "Updated a SensorInstance using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a SensorInstance using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdateSensorInstance", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeleteSensorInstance - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeleteSensorInstance(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the SensorInstance with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetSensorInstance(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.SensorInstance so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.SensorInstance)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a SensorInstance using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a SensorInstance using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeleteSensorInstance", requestResult.Data}

	}

	return requestResult
}


//----------------------------------------------------------------------------
// assigns a Device on a SensorInstance
//----------------------------------------------------------------------------
func AssignDeviceToSensorInstance( sensorInstanceId uint64, deviceId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the SensorInstance with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetSensorInstance(sensorInstanceId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.SensorInstance so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.SensorInstance)

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
			// assign the Device	to the SensorInstance
			//----------------------------------------------------------------------------
			parentObj.Device = &childObj

			//----------------------------------------------------------------------------
			// save the SensorInstance
			//----------------------------------------------------------------------------
			return UpdateSensorInstance(parentObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Device", deviceId )
			return utils.RequestResult{false, msg, "assignDevice", childObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Device on a SensorInstance
//----------------------------------------------------------------------------
func UnassignDeviceFromSensorInstance(sensorInstanceId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the SensorInstance with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetSensorInstance(sensorInstanceId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.SensorInstance so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.SensorInstance)

		//----------------------------------------------------------------------------
		// assign an empty IoTDevice to the Device
		//----------------------------------------------------------------------------
		parentObj.Device = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Device
		//----------------------------------------------------------------------------
		parentObj.DeviceId = nil;

		//----------------------------------------------------------------------------
		// save the SensorInstance
		//----------------------------------------------------------------------------
		return UpdateSensorInstance(parentObj)

	} else {
		return parentRequestResult
	}

}


//----------------------------------------------------------------------------
// adds one or more telemetryStreamsIds as a TelemetryStreams to a SensorInstance
//----------------------------------------------------------------------------
func AddTelemetryStreamsToSensorInstance ( sensorInstanceId uint64, telemetryStreamsIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the SensorInstance with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetSensorInstance(sensorInstanceId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.SensorInstance so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.SensorInstance)

		// slice the ids on comma with no spaces
		ids := strings.Split( telemetryStreamsIds, ",")

		for _, telemetryStreamsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.TelemetryStream

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a TelemetryStream
			// with a matching telemetryStreamsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , telemetryStreamsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the TelemetryStreams using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("TelemetryStreams").Append( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "TelemetryStreams", telemetryStreamsId )
				return utils.RequestResult{false, msg, "unassignTelemetryStreams", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified SensorInstance from the gorm
		//----------------------------------------------------------------------------
		return GetSensorInstance(sensorInstanceId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more telemetryStreamsIds as a TelemetryStreams from a SensorInstance
//----------------------------------------------------------------------------
func RemoveTelemetryStreamsFromSensorInstance( sensorInstanceId uint64, telemetryStreamsIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the SensorInstance with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetSensorInstance(sensorInstanceId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.SensorInstance so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.SensorInstance)

		// slice the ids on comma with no spaces
		ids := strings.Split( telemetryStreamsIds, ",")

		for _, telemetryStreamsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.TelemetryStream

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a TelemetryStream
			// with a matching telemetryStreamsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , telemetryStreamsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove TelemetryStreamObj from the TelemetryStreams array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("TelemetryStreams").Delete( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "TelemetryStreams", telemetryStreamsId )
				return utils.RequestResult{false, msg, "removeTelemetryStreams", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified SensorInstance from the gorm
		//----------------------------------------------------------------------------
		return GetSensorInstance(sensorInstanceId)

	} else {
		return parentRequestResult
	}
}

