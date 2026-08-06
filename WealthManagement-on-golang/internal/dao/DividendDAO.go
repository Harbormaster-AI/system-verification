package dao

import (
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing DividendDAO..." ) )
}

//----------------------------------------------------------------------------
// CreateDividend - creates a new db entry
//----------------------------------------------------------------------------
func CreateDividend(obj model.Dividend)(utils.RequestResult){
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
	    createMsg = fmt.Sprintf( "Created a Dividend with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a Dividend", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreateDividend", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetDividend - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetDividend(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.Dividend

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a Dividend with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a Dividend using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a Dividend using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetDividend", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllDividend - returns all
//----------------------------------------------------------------------------
func GetAllDividend()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.Dividend

	//----------------------------------------------------------------------------
	// Request the ORM to find all Dividend
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all Dividend" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all Dividend", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllDividend", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdateDividend - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdateDividend(obj model.Dividend)(requestResult utils.RequestResult){
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
	    updateMsg = fmt.Sprintf( "Updated a Dividend using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a Dividend using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdateDividend", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeleteDividend - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeleteDividend(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the Dividend with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetDividend(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Dividend so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.Dividend)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a Dividend using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a Dividend using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeleteDividend", requestResult.Data}

	}

	return requestResult
}


//----------------------------------------------------------------------------
// assigns a CorporateAction on a Dividend
//----------------------------------------------------------------------------
func AssignCorporateActionToDividend( dividendId uint64, corporateActionId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the Dividend with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetDividend(dividendId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Dividend so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		DividendObj,_ := parentRequestResult.Data. (model.Dividend)

		//----------------------------------------------------------------------------
		// Pass the reference to the ORM to get
		//----------------------------------------------------------------------------
		var CorporateActionObj model.CorporateAction

		//----------------------------------------------------------------------------
		// Retrieve the 1st occurrence from the ORM of a CorporateAction with a
		// matching corporateActionId
		//----------------------------------------------------------------------------
		childRequestResult := utils.GetDB().First(&CorporateActionObj, corporateActionId).Error // find first using identifier

		if childRequestResult == nil {
			//----------------------------------------------------------------------------
			// assign the CorporateAction	to the Dividend
			//----------------------------------------------------------------------------
			DividendObj.CorporateAction = &CorporateActionObj

			//----------------------------------------------------------------------------
			// save the Dividend
			//----------------------------------------------------------------------------
			return UpdateDividend(DividendObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "CorporateAction", corporateActionId )
			return utils.RequestResult{false, msg, "assignCorporateAction", CorporateActionObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a CorporateAction on a Dividend
//----------------------------------------------------------------------------
func UnassignCorporateActionFromDividend(dividendId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Dividend with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetDividend(dividendId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Dividend so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		DividendObj,_ := parentRequestResult.Data. (model.Dividend)

		//----------------------------------------------------------------------------
		// assign an empty CorporateAction to the CorporateAction
		//----------------------------------------------------------------------------
		DividendObj.CorporateAction = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the CorporateAction
		//----------------------------------------------------------------------------
		DividendObj.CorporateActionId = nil;

		//----------------------------------------------------------------------------
		// save the Dividend
		//----------------------------------------------------------------------------
		return UpdateDividend(DividendObj)

	} else {
		return parentRequestResult
	}

}


