package dao

import (
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing InvoiceDAO..." ) )
}

//----------------------------------------------------------------------------
// CreateInvoice - creates a new db entry
//----------------------------------------------------------------------------
func CreateInvoice(obj model.Invoice)(utils.RequestResult){
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
	    createMsg = fmt.Sprintf( "Created a Invoice with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a Invoice", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreateInvoice", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetInvoice - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetInvoice(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.Invoice

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a Invoice with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a Invoice using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a Invoice using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetInvoice", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllInvoice - returns all
//----------------------------------------------------------------------------
func GetAllInvoice()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.Invoice

	//----------------------------------------------------------------------------
	// Request the ORM to find all Invoice
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all Invoice" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all Invoice", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllInvoice", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdateInvoice - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdateInvoice(obj model.Invoice)(requestResult utils.RequestResult){
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
	    updateMsg = fmt.Sprintf( "Updated a Invoice using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a Invoice using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdateInvoice", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeleteInvoice - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeleteInvoice(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the Invoice with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetInvoice(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Invoice so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.Invoice)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a Invoice using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a Invoice using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeleteInvoice", requestResult.Data}

	}

	return requestResult
}


//----------------------------------------------------------------------------
// assigns a Account on a Invoice
//----------------------------------------------------------------------------
func AssignAccountToInvoice( invoiceId uint64, accountId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the Invoice with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetInvoice(invoiceId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Invoice so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		InvoiceObj,_ := parentRequestResult.Data. (model.Invoice)

		//----------------------------------------------------------------------------
		// Pass the reference to the ORM to get
		//----------------------------------------------------------------------------
		var AccountObj model.Account

		//----------------------------------------------------------------------------
		// Retrieve the 1st occurrence from the ORM of a Account with a
		// matching accountId
		//----------------------------------------------------------------------------
		childRequestResult := utils.GetDB().First(&AccountObj, accountId).Error // find first using identifier

		if childRequestResult == nil {
			//----------------------------------------------------------------------------
			// assign the Account	to the Invoice
			//----------------------------------------------------------------------------
			InvoiceObj.Account = &AccountObj

			//----------------------------------------------------------------------------
			// save the Invoice
			//----------------------------------------------------------------------------
			return UpdateInvoice(InvoiceObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Account", accountId )
			return utils.RequestResult{false, msg, "assignAccount", AccountObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Account on a Invoice
//----------------------------------------------------------------------------
func UnassignAccountFromInvoice(invoiceId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Invoice with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetInvoice(invoiceId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Invoice so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		InvoiceObj,_ := parentRequestResult.Data. (model.Invoice)

		//----------------------------------------------------------------------------
		// assign an empty Account to the Account
		//----------------------------------------------------------------------------
		InvoiceObj.Account = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Account
		//----------------------------------------------------------------------------
		InvoiceObj.AccountId = nil;

		//----------------------------------------------------------------------------
		// save the Invoice
		//----------------------------------------------------------------------------
		return UpdateInvoice(InvoiceObj)

	} else {
		return parentRequestResult
	}

}

//----------------------------------------------------------------------------
// assigns a BillingRun on a Invoice
//----------------------------------------------------------------------------
func AssignBillingRunToInvoice( invoiceId uint64, billingRunId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the Invoice with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetInvoice(invoiceId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Invoice so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		InvoiceObj,_ := parentRequestResult.Data. (model.Invoice)

		//----------------------------------------------------------------------------
		// Pass the reference to the ORM to get
		//----------------------------------------------------------------------------
		var BillingRunObj model.BillingRun

		//----------------------------------------------------------------------------
		// Retrieve the 1st occurrence from the ORM of a BillingRun with a
		// matching billingRunId
		//----------------------------------------------------------------------------
		childRequestResult := utils.GetDB().First(&BillingRunObj, billingRunId).Error // find first using identifier

		if childRequestResult == nil {
			//----------------------------------------------------------------------------
			// assign the BillingRun	to the Invoice
			//----------------------------------------------------------------------------
			InvoiceObj.BillingRun = &BillingRunObj

			//----------------------------------------------------------------------------
			// save the Invoice
			//----------------------------------------------------------------------------
			return UpdateInvoice(InvoiceObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "BillingRun", billingRunId )
			return utils.RequestResult{false, msg, "assignBillingRun", BillingRunObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a BillingRun on a Invoice
//----------------------------------------------------------------------------
func UnassignBillingRunFromInvoice(invoiceId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Invoice with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetInvoice(invoiceId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Invoice so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		InvoiceObj,_ := parentRequestResult.Data. (model.Invoice)

		//----------------------------------------------------------------------------
		// assign an empty BillingRun to the BillingRun
		//----------------------------------------------------------------------------
		InvoiceObj.BillingRun = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the BillingRun
		//----------------------------------------------------------------------------
		InvoiceObj.BillingRunId = nil;

		//----------------------------------------------------------------------------
		// save the Invoice
		//----------------------------------------------------------------------------
		return UpdateInvoice(InvoiceObj)

	} else {
		return parentRequestResult
	}

}


//----------------------------------------------------------------------------
// adds one or more feesIds as a Fees to a Invoice
//----------------------------------------------------------------------------
func AddFeesToInvoice ( invoiceId uint64, feesIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Invoice with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetInvoice(invoiceId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Invoice so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		InvoiceObj,_ := parentRequestResult.Data. (model.Invoice)

		// slice the ids on comma with no spaces
		ids := strings.Split( feesIds, ",")

		for _, feesId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var FeeObj model.Fee

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a Fee
			// with a matching feesId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&FeeObj , feesId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the Fees using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&InvoiceObj).Association("Fees").Append( &FeeObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Fees", feesId )
				return utils.RequestResult{false, msg, "unassignFees", FeeObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Invoice from the gorm
		//----------------------------------------------------------------------------
		return GetInvoice(invoiceId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more feesIds as a Fees from a Invoice
//----------------------------------------------------------------------------
func RemoveFeesFromInvoice( invoiceId uint64, feesIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the Invoice with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetInvoice(invoiceId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Invoice so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		InvoiceObj,_ := parentRequestResult.Data. (model.Invoice)

		// slice the ids on comma with no spaces
		ids := strings.Split( feesIds, ",")

		for _, feesId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var FeeObj model.Fee

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a Fee
			// with a matching feesId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&FeeObj , feesId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove FeeObj from the Fees array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&InvoiceObj).Association("Fees").Delete( &FeeObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Fees", feesId )
				return utils.RequestResult{false, msg, "removeFees", FeeObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Invoice from the gorm
		//----------------------------------------------------------------------------
		return GetInvoice(invoiceId)

	} else {
		return parentRequestResult
	}
}

