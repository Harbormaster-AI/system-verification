package dao

import (
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing BillingRunDAO..." ) )
}

//----------------------------------------------------------------------------
// CreateBillingRun - creates a new db entry
//----------------------------------------------------------------------------
func CreateBillingRun(obj model.BillingRun)(utils.RequestResult){
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
	    createMsg = fmt.Sprintf( "Created a BillingRun with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a BillingRun", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreateBillingRun", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetBillingRun - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetBillingRun(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.BillingRun

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a BillingRun with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a BillingRun using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a BillingRun using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetBillingRun", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllBillingRun - returns all
//----------------------------------------------------------------------------
func GetAllBillingRun()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.BillingRun

	//----------------------------------------------------------------------------
	// Request the ORM to find all BillingRun
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all BillingRun" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all BillingRun", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllBillingRun", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdateBillingRun - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdateBillingRun(obj model.BillingRun)(requestResult utils.RequestResult){
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
	    updateMsg = fmt.Sprintf( "Updated a BillingRun using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a BillingRun using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdateBillingRun", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeleteBillingRun - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeleteBillingRun(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the BillingRun with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetBillingRun(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.BillingRun so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.BillingRun)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a BillingRun using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a BillingRun using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeleteBillingRun", requestResult.Data}

	}

	return requestResult
}


//----------------------------------------------------------------------------
// assigns a FeeSchedule on a BillingRun
//----------------------------------------------------------------------------
func AssignFeeScheduleToBillingRun( billingRunId uint64, feeScheduleId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the BillingRun with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetBillingRun(billingRunId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.BillingRun so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		BillingRunObj,_ := parentRequestResult.Data. (model.BillingRun)

		//----------------------------------------------------------------------------
		// Pass the reference to the ORM to get
		//----------------------------------------------------------------------------
		var FeeScheduleObj model.FeeSchedule

		//----------------------------------------------------------------------------
		// Retrieve the 1st occurrence from the ORM of a FeeSchedule with a
		// matching feeScheduleId
		//----------------------------------------------------------------------------
		childRequestResult := utils.GetDB().First(&FeeScheduleObj, feeScheduleId).Error // find first using identifier

		if childRequestResult == nil {
			//----------------------------------------------------------------------------
			// assign the FeeSchedule	to the BillingRun
			//----------------------------------------------------------------------------
			BillingRunObj.FeeSchedule = &FeeScheduleObj

			//----------------------------------------------------------------------------
			// save the BillingRun
			//----------------------------------------------------------------------------
			return UpdateBillingRun(BillingRunObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "FeeSchedule", feeScheduleId )
			return utils.RequestResult{false, msg, "assignFeeSchedule", FeeScheduleObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a FeeSchedule on a BillingRun
//----------------------------------------------------------------------------
func UnassignFeeScheduleFromBillingRun(billingRunId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the BillingRun with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetBillingRun(billingRunId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.BillingRun so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		BillingRunObj,_ := parentRequestResult.Data. (model.BillingRun)

		//----------------------------------------------------------------------------
		// assign an empty FeeSchedule to the FeeSchedule
		//----------------------------------------------------------------------------
		BillingRunObj.FeeSchedule = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the FeeSchedule
		//----------------------------------------------------------------------------
		BillingRunObj.FeeScheduleId = nil;

		//----------------------------------------------------------------------------
		// save the BillingRun
		//----------------------------------------------------------------------------
		return UpdateBillingRun(BillingRunObj)

	} else {
		return parentRequestResult
	}

}


//----------------------------------------------------------------------------
// adds one or more invoicesIds as a Invoices to a BillingRun
//----------------------------------------------------------------------------
func AddInvoicesToBillingRun ( billingRunId uint64, invoicesIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the BillingRun with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetBillingRun(billingRunId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.BillingRun so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		BillingRunObj,_ := parentRequestResult.Data. (model.BillingRun)

		// slice the ids on comma with no spaces
		ids := strings.Split( invoicesIds, ",")

		for _, invoicesId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var InvoiceObj model.Invoice

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a Invoice
			// with a matching invoicesId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&InvoiceObj , invoicesId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the Invoices using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&BillingRunObj).Association("Invoices").Append( &InvoiceObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Invoices", invoicesId )
				return utils.RequestResult{false, msg, "unassignInvoices", InvoiceObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified BillingRun from the gorm
		//----------------------------------------------------------------------------
		return GetBillingRun(billingRunId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more invoicesIds as a Invoices from a BillingRun
//----------------------------------------------------------------------------
func RemoveInvoicesFromBillingRun( billingRunId uint64, invoicesIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the BillingRun with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetBillingRun(billingRunId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.BillingRun so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		BillingRunObj,_ := parentRequestResult.Data. (model.BillingRun)

		// slice the ids on comma with no spaces
		ids := strings.Split( invoicesIds, ",")

		for _, invoicesId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var InvoiceObj model.Invoice

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a Invoice
			// with a matching invoicesId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&InvoiceObj , invoicesId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove InvoiceObj from the Invoices array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&BillingRunObj).Association("Invoices").Delete( &InvoiceObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Invoices", invoicesId )
				return utils.RequestResult{false, msg, "removeInvoices", InvoiceObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified BillingRun from the gorm
		//----------------------------------------------------------------------------
		return GetBillingRun(billingRunId)

	} else {
		return parentRequestResult
	}
}

