package dao

import (
    "iotOnGolang/internal/model"
    "iotOnGolang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing AlertRuleDAO..." ) )
}

//----------------------------------------------------------------------------
// CreateAlertRule - creates a new db entry
//----------------------------------------------------------------------------
func CreateAlertRule(obj model.AlertRule)(utils.RequestResult){
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
	    createMsg = fmt.Sprintf( "Created a AlertRule with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a AlertRule", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreateAlertRule", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetAlertRule - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetAlertRule(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.AlertRule

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a AlertRule with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a AlertRule using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a AlertRule using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetAlertRule", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllAlertRule - returns all
//----------------------------------------------------------------------------
func GetAllAlertRule()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.AlertRule

	//----------------------------------------------------------------------------
	// Request the ORM to find all AlertRule
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all AlertRule" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all AlertRule", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllAlertRule", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdateAlertRule - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdateAlertRule(obj model.AlertRule)(requestResult utils.RequestResult){
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
	    updateMsg = fmt.Sprintf( "Updated a AlertRule using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a AlertRule using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdateAlertRule", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeleteAlertRule - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeleteAlertRule(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the AlertRule with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetAlertRule(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.AlertRule so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.AlertRule)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a AlertRule using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a AlertRule using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeleteAlertRule", requestResult.Data}

	}

	return requestResult
}


//----------------------------------------------------------------------------
// assigns a Tenant on a AlertRule
//----------------------------------------------------------------------------
func AssignTenantToAlertRule( alertRuleId uint64, tenantId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the AlertRule with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetAlertRule(alertRuleId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.AlertRule so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.AlertRule)

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
			// assign the Tenant	to the AlertRule
			//----------------------------------------------------------------------------
			parentObj.Tenant = &childObj

			//----------------------------------------------------------------------------
			// save the AlertRule
			//----------------------------------------------------------------------------
			return UpdateAlertRule(parentObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Tenant", tenantId )
			return utils.RequestResult{false, msg, "assignTenant", childObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Tenant on a AlertRule
//----------------------------------------------------------------------------
func UnassignTenantFromAlertRule(alertRuleId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the AlertRule with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetAlertRule(alertRuleId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.AlertRule so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.AlertRule)

		//----------------------------------------------------------------------------
		// assign an empty Tenant to the Tenant
		//----------------------------------------------------------------------------
		parentObj.Tenant = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Tenant
		//----------------------------------------------------------------------------
		parentObj.TenantId = nil;

		//----------------------------------------------------------------------------
		// save the AlertRule
		//----------------------------------------------------------------------------
		return UpdateAlertRule(parentObj)

	} else {
		return parentRequestResult
	}

}


//----------------------------------------------------------------------------
// adds one or more streamsIds as a Streams to a AlertRule
//----------------------------------------------------------------------------
func AddStreamsToAlertRule ( alertRuleId uint64, streamsIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the AlertRule with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetAlertRule(alertRuleId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.AlertRule so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.AlertRule)

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
		// retrieve the modified AlertRule from the gorm
		//----------------------------------------------------------------------------
		return GetAlertRule(alertRuleId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more streamsIds as a Streams from a AlertRule
//----------------------------------------------------------------------------
func RemoveStreamsFromAlertRule( alertRuleId uint64, streamsIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the AlertRule with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetAlertRule(alertRuleId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.AlertRule so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.AlertRule)

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
		// retrieve the modified AlertRule from the gorm
		//----------------------------------------------------------------------------
		return GetAlertRule(alertRuleId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// adds one or more alertsIds as a Alerts to a AlertRule
//----------------------------------------------------------------------------
func AddAlertsToAlertRule ( alertRuleId uint64, alertsIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the AlertRule with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetAlertRule(alertRuleId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.AlertRule so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.AlertRule)

		// slice the ids on comma with no spaces
		ids := strings.Split( alertsIds, ",")

		for _, alertsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.Alert

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a Alert
			// with a matching alertsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , alertsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the Alerts using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("Alerts").Append( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Alerts", alertsId )
				return utils.RequestResult{false, msg, "unassignAlerts", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified AlertRule from the gorm
		//----------------------------------------------------------------------------
		return GetAlertRule(alertRuleId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more alertsIds as a Alerts from a AlertRule
//----------------------------------------------------------------------------
func RemoveAlertsFromAlertRule( alertRuleId uint64, alertsIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the AlertRule with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetAlertRule(alertRuleId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.AlertRule so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		parentObj,_ := parentRequestResult.Data. (model.AlertRule)

		// slice the ids on comma with no spaces
		ids := strings.Split( alertsIds, ",")

		for _, alertsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var childObj model.Alert

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a Alert
			// with a matching alertsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&childObj , alertsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove AlertObj from the Alerts array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&parentObj).Association("Alerts").Delete( &childObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Alerts", alertsId )
				return utils.RequestResult{false, msg, "removeAlerts", childObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified AlertRule from the gorm
		//----------------------------------------------------------------------------
		return GetAlertRule(alertRuleId)

	} else {
		return parentRequestResult
	}
}

