package dao

import (
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing CashMovementDAO..." ) )
}

//----------------------------------------------------------------------------
// CreateCashMovement - creates a new db entry
//----------------------------------------------------------------------------
func CreateCashMovement(obj model.CashMovement)(utils.RequestResult){
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
	    createMsg = fmt.Sprintf( "Created a CashMovement with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a CashMovement", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreateCashMovement", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetCashMovement - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetCashMovement(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.CashMovement

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a CashMovement with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a CashMovement using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a CashMovement using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetCashMovement", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllCashMovement - returns all
//----------------------------------------------------------------------------
func GetAllCashMovement()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.CashMovement

	//----------------------------------------------------------------------------
	// Request the ORM to find all CashMovement
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all CashMovement" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all CashMovement", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllCashMovement", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdateCashMovement - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdateCashMovement(obj model.CashMovement)(requestResult utils.RequestResult){
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
	    updateMsg = fmt.Sprintf( "Updated a CashMovement using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a CashMovement using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdateCashMovement", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeleteCashMovement - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeleteCashMovement(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the CashMovement with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetCashMovement(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.CashMovement so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.CashMovement)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a CashMovement using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a CashMovement using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeleteCashMovement", requestResult.Data}

	}

	return requestResult
}


//----------------------------------------------------------------------------
// assigns a Account on a CashMovement
//----------------------------------------------------------------------------
func AssignAccountToCashMovement( cashMovementId uint64, accountId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the CashMovement with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetCashMovement(cashMovementId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.CashMovement so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		CashMovementObj,_ := parentRequestResult.Data. (model.CashMovement)

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
			// assign the Account	to the CashMovement
			//----------------------------------------------------------------------------
			CashMovementObj.Account = &AccountObj

			//----------------------------------------------------------------------------
			// save the CashMovement
			//----------------------------------------------------------------------------
			return UpdateCashMovement(CashMovementObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Account", accountId )
			return utils.RequestResult{false, msg, "assignAccount", AccountObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Account on a CashMovement
//----------------------------------------------------------------------------
func UnassignAccountFromCashMovement(cashMovementId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the CashMovement with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetCashMovement(cashMovementId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.CashMovement so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		CashMovementObj,_ := parentRequestResult.Data. (model.CashMovement)

		//----------------------------------------------------------------------------
		// assign an empty Account to the Account
		//----------------------------------------------------------------------------
		CashMovementObj.Account = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Account
		//----------------------------------------------------------------------------
		CashMovementObj.AccountId = nil;

		//----------------------------------------------------------------------------
		// save the CashMovement
		//----------------------------------------------------------------------------
		return UpdateCashMovement(CashMovementObj)

	} else {
		return parentRequestResult
	}

}

//----------------------------------------------------------------------------
// assigns a RelatedInstruction on a CashMovement
//----------------------------------------------------------------------------
func AssignRelatedInstructionToCashMovement( cashMovementId uint64, relatedInstructionId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the CashMovement with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetCashMovement(cashMovementId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.CashMovement so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		CashMovementObj,_ := parentRequestResult.Data. (model.CashMovement)

		//----------------------------------------------------------------------------
		// Pass the reference to the ORM to get
		//----------------------------------------------------------------------------
		var StandingInstructionObj model.StandingInstruction

		//----------------------------------------------------------------------------
		// Retrieve the 1st occurrence from the ORM of a StandingInstruction with a
		// matching relatedInstructionId
		//----------------------------------------------------------------------------
		childRequestResult := utils.GetDB().First(&StandingInstructionObj, relatedInstructionId).Error // find first using identifier

		if childRequestResult == nil {
			//----------------------------------------------------------------------------
			// assign the RelatedInstruction	to the CashMovement
			//----------------------------------------------------------------------------
			CashMovementObj.RelatedInstruction = &StandingInstructionObj

			//----------------------------------------------------------------------------
			// save the CashMovement
			//----------------------------------------------------------------------------
			return UpdateCashMovement(CashMovementObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "RelatedInstruction", relatedInstructionId )
			return utils.RequestResult{false, msg, "assignRelatedInstruction", StandingInstructionObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a RelatedInstruction on a CashMovement
//----------------------------------------------------------------------------
func UnassignRelatedInstructionFromCashMovement(cashMovementId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the CashMovement with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetCashMovement(cashMovementId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.CashMovement so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		CashMovementObj,_ := parentRequestResult.Data. (model.CashMovement)

		//----------------------------------------------------------------------------
		// assign an empty StandingInstruction to the RelatedInstruction
		//----------------------------------------------------------------------------
		CashMovementObj.RelatedInstruction = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the RelatedInstruction
		//----------------------------------------------------------------------------
		CashMovementObj.RelatedInstructionId = nil;

		//----------------------------------------------------------------------------
		// save the CashMovement
		//----------------------------------------------------------------------------
		return UpdateCashMovement(CashMovementObj)

	} else {
		return parentRequestResult
	}

}

//----------------------------------------------------------------------------
// assigns a RelatedTransaction on a CashMovement
//----------------------------------------------------------------------------
func AssignRelatedTransactionToCashMovement( cashMovementId uint64, relatedTransactionId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the CashMovement with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetCashMovement(cashMovementId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.CashMovement so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		CashMovementObj,_ := parentRequestResult.Data. (model.CashMovement)

		//----------------------------------------------------------------------------
		// Pass the reference to the ORM to get
		//----------------------------------------------------------------------------
		var TransactionObj model.Transaction

		//----------------------------------------------------------------------------
		// Retrieve the 1st occurrence from the ORM of a Transaction with a
		// matching relatedTransactionId
		//----------------------------------------------------------------------------
		childRequestResult := utils.GetDB().First(&TransactionObj, relatedTransactionId).Error // find first using identifier

		if childRequestResult == nil {
			//----------------------------------------------------------------------------
			// assign the RelatedTransaction	to the CashMovement
			//----------------------------------------------------------------------------
			CashMovementObj.RelatedTransaction = &TransactionObj

			//----------------------------------------------------------------------------
			// save the CashMovement
			//----------------------------------------------------------------------------
			return UpdateCashMovement(CashMovementObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "RelatedTransaction", relatedTransactionId )
			return utils.RequestResult{false, msg, "assignRelatedTransaction", TransactionObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a RelatedTransaction on a CashMovement
//----------------------------------------------------------------------------
func UnassignRelatedTransactionFromCashMovement(cashMovementId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the CashMovement with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetCashMovement(cashMovementId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.CashMovement so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		CashMovementObj,_ := parentRequestResult.Data. (model.CashMovement)

		//----------------------------------------------------------------------------
		// assign an empty Transaction to the RelatedTransaction
		//----------------------------------------------------------------------------
		CashMovementObj.RelatedTransaction = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the RelatedTransaction
		//----------------------------------------------------------------------------
		CashMovementObj.RelatedTransactionId = nil;

		//----------------------------------------------------------------------------
		// save the CashMovement
		//----------------------------------------------------------------------------
		return UpdateCashMovement(CashMovementObj)

	} else {
		return parentRequestResult
	}

}


