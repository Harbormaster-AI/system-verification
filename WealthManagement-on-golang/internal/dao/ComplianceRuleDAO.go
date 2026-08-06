package dao

import (
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing ComplianceRuleDAO..." ) )
}

//----------------------------------------------------------------------------
// CreateComplianceRule - creates a new db entry
//----------------------------------------------------------------------------
func CreateComplianceRule(obj model.ComplianceRule)(utils.RequestResult){
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
	    createMsg = fmt.Sprintf( "Created a ComplianceRule with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a ComplianceRule", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreateComplianceRule", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetComplianceRule - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetComplianceRule(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.ComplianceRule

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a ComplianceRule with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a ComplianceRule using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a ComplianceRule using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetComplianceRule", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllComplianceRule - returns all
//----------------------------------------------------------------------------
func GetAllComplianceRule()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.ComplianceRule

	//----------------------------------------------------------------------------
	// Request the ORM to find all ComplianceRule
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all ComplianceRule" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all ComplianceRule", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllComplianceRule", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdateComplianceRule - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdateComplianceRule(obj model.ComplianceRule)(requestResult utils.RequestResult){
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
	    updateMsg = fmt.Sprintf( "Updated a ComplianceRule using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a ComplianceRule using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdateComplianceRule", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeleteComplianceRule - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeleteComplianceRule(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the ComplianceRule with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetComplianceRule(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.ComplianceRule so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.ComplianceRule)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a ComplianceRule using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a ComplianceRule using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeleteComplianceRule", requestResult.Data}

	}

	return requestResult
}



//----------------------------------------------------------------------------
// adds one or more alertsIds as a Alerts to a ComplianceRule
//----------------------------------------------------------------------------
func AddAlertsToComplianceRule ( complianceRuleId uint64, alertsIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the ComplianceRule with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetComplianceRule(complianceRuleId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.ComplianceRule so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		ComplianceRuleObj,_ := parentRequestResult.Data. (model.ComplianceRule)

		// slice the ids on comma with no spaces
		ids := strings.Split( alertsIds, ",")

		for _, alertsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var ComplianceAlertObj model.ComplianceAlert

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a ComplianceAlert
			// with a matching alertsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&ComplianceAlertObj , alertsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the Alerts using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&ComplianceRuleObj).Association("Alerts").Append( &ComplianceAlertObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Alerts", alertsId )
				return utils.RequestResult{false, msg, "unassignAlerts", ComplianceAlertObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified ComplianceRule from the gorm
		//----------------------------------------------------------------------------
		return GetComplianceRule(complianceRuleId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more alertsIds as a Alerts from a ComplianceRule
//----------------------------------------------------------------------------
func RemoveAlertsFromComplianceRule( complianceRuleId uint64, alertsIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the ComplianceRule with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetComplianceRule(complianceRuleId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.ComplianceRule so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		ComplianceRuleObj,_ := parentRequestResult.Data. (model.ComplianceRule)

		// slice the ids on comma with no spaces
		ids := strings.Split( alertsIds, ",")

		for _, alertsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var ComplianceAlertObj model.ComplianceAlert

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a ComplianceAlert
			// with a matching alertsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&ComplianceAlertObj , alertsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove ComplianceAlertObj from the Alerts array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&ComplianceRuleObj).Association("Alerts").Delete( &ComplianceAlertObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Alerts", alertsId )
				return utils.RequestResult{false, msg, "removeAlerts", ComplianceAlertObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified ComplianceRule from the gorm
		//----------------------------------------------------------------------------
		return GetComplianceRule(complianceRuleId)

	} else {
		return parentRequestResult
	}
}

