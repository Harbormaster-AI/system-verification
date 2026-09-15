
package dao

import (
    "iotOnGolang/internal/model"
    "iotOnGolang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing TelemetrySchemaDAO..." ) )
}

//----------------------------------------------------------------------------
// CreateTelemetrySchema - creates a new db entry
//----------------------------------------------------------------------------
func CreateTelemetrySchema(obj model.TelemetrySchema)(utils.RequestResult){
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
	    createMsg = fmt.Sprintf( "Created a TelemetrySchema with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a TelemetrySchema", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreateTelemetrySchema", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetTelemetrySchema - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetTelemetrySchema(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.TelemetrySchema

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a TelemetrySchema with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a TelemetrySchema using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a TelemetrySchema using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetTelemetrySchema", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllTelemetrySchema - returns all
//----------------------------------------------------------------------------
func GetAllTelemetrySchema()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.TelemetrySchema

	//----------------------------------------------------------------------------
	// Request the ORM to find all TelemetrySchema
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all TelemetrySchema" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all TelemetrySchema", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllTelemetrySchema", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdateTelemetrySchema - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdateTelemetrySchema(obj model.TelemetrySchema)(requestResult utils.RequestResult){
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
	    updateMsg = fmt.Sprintf( "Updated a TelemetrySchema using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a TelemetrySchema using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdateTelemetrySchema", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeleteTelemetrySchema - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeleteTelemetrySchema(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the TelemetrySchema with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetTelemetrySchema(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.TelemetrySchema so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.TelemetrySchema)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a TelemetrySchema using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a TelemetrySchema using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeleteTelemetrySchema", requestResult.Data}

	}

	return requestResult
}



//----------------------------------------------------------------------------
// adds one or more streamsIds as a Streams to a TelemetrySchema
//----------------------------------------------------------------------------
func AddStreamsToTelemetrySchema ( telemetrySchemaId uint64, streamsIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the TelemetrySchema with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetTelemetrySchema(telemetrySchemaId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.TelemetrySchema so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.TelemetrySchema)

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
		// retrieve the modified TelemetrySchema from the gorm
		//----------------------------------------------------------------------------
		return GetTelemetrySchema(telemetrySchemaId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more streamsIds as a Streams from a TelemetrySchema
//----------------------------------------------------------------------------
func RemoveStreamsFromTelemetrySchema( telemetrySchemaId uint64, streamsIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the TelemetrySchema with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetTelemetrySchema(telemetrySchemaId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.TelemetrySchema so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.TelemetrySchema)

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
		// retrieve the modified TelemetrySchema from the gorm
		//----------------------------------------------------------------------------
		return GetTelemetrySchema(telemetrySchemaId)

	} else {
		return parentRequestResult
	}
}

