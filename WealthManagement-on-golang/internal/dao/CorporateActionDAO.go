package dao

import (
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing CorporateActionDAO..." ) )
}

//----------------------------------------------------------------------------
// CreateCorporateAction - creates a new db entry
//----------------------------------------------------------------------------
func CreateCorporateAction(obj model.CorporateAction)(utils.RequestResult){
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
	    createMsg = fmt.Sprintf( "Created a CorporateAction with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a CorporateAction", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreateCorporateAction", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetCorporateAction - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetCorporateAction(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.CorporateAction

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a CorporateAction with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a CorporateAction using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a CorporateAction using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetCorporateAction", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllCorporateAction - returns all
//----------------------------------------------------------------------------
func GetAllCorporateAction()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.CorporateAction

	//----------------------------------------------------------------------------
	// Request the ORM to find all CorporateAction
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all CorporateAction" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all CorporateAction", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllCorporateAction", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdateCorporateAction - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdateCorporateAction(obj model.CorporateAction)(requestResult utils.RequestResult){
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
	    updateMsg = fmt.Sprintf( "Updated a CorporateAction using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a CorporateAction using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdateCorporateAction", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeleteCorporateAction - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeleteCorporateAction(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the CorporateAction with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetCorporateAction(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.CorporateAction so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.CorporateAction)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a CorporateAction using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a CorporateAction using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeleteCorporateAction", requestResult.Data}

	}

	return requestResult
}


//----------------------------------------------------------------------------
// assigns a Security on a CorporateAction
//----------------------------------------------------------------------------
func AssignSecurityToCorporateAction( corporateActionId uint64, securityId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the CorporateAction with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetCorporateAction(corporateActionId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.CorporateAction so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		CorporateActionObj,_ := parentRequestResult.Data. (model.CorporateAction)

		//----------------------------------------------------------------------------
		// Pass the reference to the ORM to get
		//----------------------------------------------------------------------------
		var SecurityObj model.Security

		//----------------------------------------------------------------------------
		// Retrieve the 1st occurrence from the ORM of a Security with a
		// matching securityId
		//----------------------------------------------------------------------------
		childRequestResult := utils.GetDB().First(&SecurityObj, securityId).Error // find first using identifier

		if childRequestResult == nil {
			//----------------------------------------------------------------------------
			// assign the Security	to the CorporateAction
			//----------------------------------------------------------------------------
			CorporateActionObj.Security = &SecurityObj

			//----------------------------------------------------------------------------
			// save the CorporateAction
			//----------------------------------------------------------------------------
			return UpdateCorporateAction(CorporateActionObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Security", securityId )
			return utils.RequestResult{false, msg, "assignSecurity", SecurityObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Security on a CorporateAction
//----------------------------------------------------------------------------
func UnassignSecurityFromCorporateAction(corporateActionId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the CorporateAction with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetCorporateAction(corporateActionId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.CorporateAction so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		CorporateActionObj,_ := parentRequestResult.Data. (model.CorporateAction)

		//----------------------------------------------------------------------------
		// assign an empty Security to the Security
		//----------------------------------------------------------------------------
		CorporateActionObj.Security = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Security
		//----------------------------------------------------------------------------
		CorporateActionObj.SecurityId = nil;

		//----------------------------------------------------------------------------
		// save the CorporateAction
		//----------------------------------------------------------------------------
		return UpdateCorporateAction(CorporateActionObj)

	} else {
		return parentRequestResult
	}

}


//----------------------------------------------------------------------------
// adds one or more dividendsIds as a Dividends to a CorporateAction
//----------------------------------------------------------------------------
func AddDividendsToCorporateAction ( corporateActionId uint64, dividendsIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the CorporateAction with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetCorporateAction(corporateActionId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.CorporateAction so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		CorporateActionObj,_ := parentRequestResult.Data. (model.CorporateAction)

		// slice the ids on comma with no spaces
		ids := strings.Split( dividendsIds, ",")

		for _, dividendsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var DividendObj model.Dividend

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a Dividend
			// with a matching dividendsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&DividendObj , dividendsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the Dividends using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&CorporateActionObj).Association("Dividends").Append( &DividendObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Dividends", dividendsId )
				return utils.RequestResult{false, msg, "unassignDividends", DividendObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified CorporateAction from the gorm
		//----------------------------------------------------------------------------
		return GetCorporateAction(corporateActionId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more dividendsIds as a Dividends from a CorporateAction
//----------------------------------------------------------------------------
func RemoveDividendsFromCorporateAction( corporateActionId uint64, dividendsIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the CorporateAction with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetCorporateAction(corporateActionId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.CorporateAction so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		CorporateActionObj,_ := parentRequestResult.Data. (model.CorporateAction)

		// slice the ids on comma with no spaces
		ids := strings.Split( dividendsIds, ",")

		for _, dividendsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var DividendObj model.Dividend

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a Dividend
			// with a matching dividendsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&DividendObj , dividendsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove DividendObj from the Dividends array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&CorporateActionObj).Association("Dividends").Delete( &DividendObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Dividends", dividendsId )
				return utils.RequestResult{false, msg, "removeDividends", DividendObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified CorporateAction from the gorm
		//----------------------------------------------------------------------------
		return GetCorporateAction(corporateActionId)

	} else {
		return parentRequestResult
	}
}

