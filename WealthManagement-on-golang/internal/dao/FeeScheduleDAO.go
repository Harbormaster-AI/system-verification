package dao

import (
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing FeeScheduleDAO..." ) )
}

//----------------------------------------------------------------------------
// CreateFeeSchedule - creates a new db entry
//----------------------------------------------------------------------------
func CreateFeeSchedule(obj model.FeeSchedule)(utils.RequestResult){
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
	    createMsg = fmt.Sprintf( "Created a FeeSchedule with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a FeeSchedule", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreateFeeSchedule", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetFeeSchedule - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetFeeSchedule(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.FeeSchedule

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a FeeSchedule with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a FeeSchedule using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a FeeSchedule using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetFeeSchedule", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllFeeSchedule - returns all
//----------------------------------------------------------------------------
func GetAllFeeSchedule()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.FeeSchedule

	//----------------------------------------------------------------------------
	// Request the ORM to find all FeeSchedule
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all FeeSchedule" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all FeeSchedule", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllFeeSchedule", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdateFeeSchedule - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdateFeeSchedule(obj model.FeeSchedule)(requestResult utils.RequestResult){
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
	    updateMsg = fmt.Sprintf( "Updated a FeeSchedule using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a FeeSchedule using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdateFeeSchedule", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeleteFeeSchedule - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeleteFeeSchedule(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the FeeSchedule with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetFeeSchedule(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.FeeSchedule so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.FeeSchedule)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a FeeSchedule using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a FeeSchedule using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeleteFeeSchedule", requestResult.Data}

	}

	return requestResult
}



//----------------------------------------------------------------------------
// adds one or more accountsIds as a Accounts to a FeeSchedule
//----------------------------------------------------------------------------
func AddAccountsToFeeSchedule ( feeScheduleId uint64, accountsIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the FeeSchedule with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetFeeSchedule(feeScheduleId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.FeeSchedule so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		FeeScheduleObj,_ := parentRequestResult.Data. (model.FeeSchedule)

		// slice the ids on comma with no spaces
		ids := strings.Split( accountsIds, ",")

		for _, accountsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var AccountObj model.Account

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a Account
			// with a matching accountsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&AccountObj , accountsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the Accounts using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&FeeScheduleObj).Association("Accounts").Append( &AccountObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Accounts", accountsId )
				return utils.RequestResult{false, msg, "unassignAccounts", AccountObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified FeeSchedule from the gorm
		//----------------------------------------------------------------------------
		return GetFeeSchedule(feeScheduleId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more accountsIds as a Accounts from a FeeSchedule
//----------------------------------------------------------------------------
func RemoveAccountsFromFeeSchedule( feeScheduleId uint64, accountsIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the FeeSchedule with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetFeeSchedule(feeScheduleId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.FeeSchedule so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		FeeScheduleObj,_ := parentRequestResult.Data. (model.FeeSchedule)

		// slice the ids on comma with no spaces
		ids := strings.Split( accountsIds, ",")

		for _, accountsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var AccountObj model.Account

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a Account
			// with a matching accountsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&AccountObj , accountsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove AccountObj from the Accounts array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&FeeScheduleObj).Association("Accounts").Delete( &AccountObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Accounts", accountsId )
				return utils.RequestResult{false, msg, "removeAccounts", AccountObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified FeeSchedule from the gorm
		//----------------------------------------------------------------------------
		return GetFeeSchedule(feeScheduleId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// adds one or more billingRunsIds as a BillingRuns to a FeeSchedule
//----------------------------------------------------------------------------
func AddBillingRunsToFeeSchedule ( feeScheduleId uint64, billingRunsIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the FeeSchedule with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetFeeSchedule(feeScheduleId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.FeeSchedule so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		FeeScheduleObj,_ := parentRequestResult.Data. (model.FeeSchedule)

		// slice the ids on comma with no spaces
		ids := strings.Split( billingRunsIds, ",")

		for _, billingRunsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var BillingRunObj model.BillingRun

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a BillingRun
			// with a matching billingRunsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&BillingRunObj , billingRunsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the BillingRuns using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&FeeScheduleObj).Association("BillingRuns").Append( &BillingRunObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "BillingRuns", billingRunsId )
				return utils.RequestResult{false, msg, "unassignBillingRuns", BillingRunObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified FeeSchedule from the gorm
		//----------------------------------------------------------------------------
		return GetFeeSchedule(feeScheduleId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more billingRunsIds as a BillingRuns from a FeeSchedule
//----------------------------------------------------------------------------
func RemoveBillingRunsFromFeeSchedule( feeScheduleId uint64, billingRunsIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the FeeSchedule with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetFeeSchedule(feeScheduleId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.FeeSchedule so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		FeeScheduleObj,_ := parentRequestResult.Data. (model.FeeSchedule)

		// slice the ids on comma with no spaces
		ids := strings.Split( billingRunsIds, ",")

		for _, billingRunsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var BillingRunObj model.BillingRun

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a BillingRun
			// with a matching billingRunsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&BillingRunObj , billingRunsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove BillingRunObj from the BillingRuns array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&FeeScheduleObj).Association("BillingRuns").Delete( &BillingRunObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "BillingRuns", billingRunsId )
				return utils.RequestResult{false, msg, "removeBillingRuns", BillingRunObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified FeeSchedule from the gorm
		//----------------------------------------------------------------------------
		return GetFeeSchedule(feeScheduleId)

	} else {
		return parentRequestResult
	}
}

