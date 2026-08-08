package dao

import (
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing TransactionDAO..." ) )
}

//----------------------------------------------------------------------------
// CreateTransaction - creates a new db entry
//----------------------------------------------------------------------------
func CreateTransaction(obj model.Transaction)(utils.RequestResult){
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
	    createMsg = fmt.Sprintf( "Created a Transaction with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a Transaction", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreateTransaction", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetTransaction - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetTransaction(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.Transaction

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a Transaction with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a Transaction using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a Transaction using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetTransaction", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllTransaction - returns all
//----------------------------------------------------------------------------
func GetAllTransaction()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.Transaction

	//----------------------------------------------------------------------------
	// Request the ORM to find all Transaction
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all Transaction" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all Transaction", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllTransaction", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdateTransaction - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdateTransaction(obj model.Transaction)(requestResult utils.RequestResult){
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
	    updateMsg = fmt.Sprintf( "Updated a Transaction using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a Transaction using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdateTransaction", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeleteTransaction - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeleteTransaction(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the Transaction with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetTransaction(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Transaction so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.Transaction)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a Transaction using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a Transaction using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeleteTransaction", requestResult.Data}

	}

	return requestResult
}


//----------------------------------------------------------------------------
// assigns a Account on a Transaction
//----------------------------------------------------------------------------
func AssignAccountToTransaction( transactionId uint64, accountId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the Transaction with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetTransaction(transactionId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Transaction so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		TransactionObj,_ := parentRequestResult.Data. (model.Transaction)

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
			// assign the Account	to the Transaction
			//----------------------------------------------------------------------------
			TransactionObj.Account = &AccountObj

			//----------------------------------------------------------------------------
			// save the Transaction
			//----------------------------------------------------------------------------
			return UpdateTransaction(TransactionObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Account", accountId )
			return utils.RequestResult{false, msg, "assignAccount", AccountObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Account on a Transaction
//----------------------------------------------------------------------------
func UnassignAccountFromTransaction(transactionId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Transaction with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetTransaction(transactionId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Transaction so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		TransactionObj,_ := parentRequestResult.Data. (model.Transaction)

		//----------------------------------------------------------------------------
		// assign an empty Account to the Account
		//----------------------------------------------------------------------------
		TransactionObj.Account = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Account
		//----------------------------------------------------------------------------
		TransactionObj.AccountId = nil;

		//----------------------------------------------------------------------------
		// save the Transaction
		//----------------------------------------------------------------------------
		return UpdateTransaction(TransactionObj)

	} else {
		return parentRequestResult
	}

}

//----------------------------------------------------------------------------
// assigns a Security on a Transaction
//----------------------------------------------------------------------------
func AssignSecurityToTransaction( transactionId uint64, securityId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the Transaction with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetTransaction(transactionId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Transaction so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		TransactionObj,_ := parentRequestResult.Data. (model.Transaction)

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
			// assign the Security	to the Transaction
			//----------------------------------------------------------------------------
			TransactionObj.Security = &SecurityObj

			//----------------------------------------------------------------------------
			// save the Transaction
			//----------------------------------------------------------------------------
			return UpdateTransaction(TransactionObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Security", securityId )
			return utils.RequestResult{false, msg, "assignSecurity", SecurityObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Security on a Transaction
//----------------------------------------------------------------------------
func UnassignSecurityFromTransaction(transactionId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Transaction with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetTransaction(transactionId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Transaction so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		TransactionObj,_ := parentRequestResult.Data. (model.Transaction)

		//----------------------------------------------------------------------------
		// assign an empty Security to the Security
		//----------------------------------------------------------------------------
		TransactionObj.Security = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Security
		//----------------------------------------------------------------------------
		TransactionObj.SecurityId = nil;

		//----------------------------------------------------------------------------
		// save the Transaction
		//----------------------------------------------------------------------------
		return UpdateTransaction(TransactionObj)

	} else {
		return parentRequestResult
	}

}

//----------------------------------------------------------------------------
// assigns a Order on a Transaction
//----------------------------------------------------------------------------
func AssignOrderToTransaction( transactionId uint64, orderId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the Transaction with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetTransaction(transactionId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Transaction so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		TransactionObj,_ := parentRequestResult.Data. (model.Transaction)

		//----------------------------------------------------------------------------
		// Pass the reference to the ORM to get
		//----------------------------------------------------------------------------
		var Order_Obj model.Order_

		//----------------------------------------------------------------------------
		// Retrieve the 1st occurrence from the ORM of a Order_ with a
		// matching orderId
		//----------------------------------------------------------------------------
		childRequestResult := utils.GetDB().First(&Order_Obj, orderId).Error // find first using identifier

		if childRequestResult == nil {
			//----------------------------------------------------------------------------
			// assign the Order	to the Transaction
			//----------------------------------------------------------------------------
			TransactionObj.Order = &Order_Obj

			//----------------------------------------------------------------------------
			// save the Transaction
			//----------------------------------------------------------------------------
			return UpdateTransaction(TransactionObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Order", orderId )
			return utils.RequestResult{false, msg, "assignOrder", Order_Obj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Order on a Transaction
//----------------------------------------------------------------------------
func UnassignOrderFromTransaction(transactionId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Transaction with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetTransaction(transactionId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Transaction so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		TransactionObj,_ := parentRequestResult.Data. (model.Transaction)

		//----------------------------------------------------------------------------
		// assign an empty Order_ to the Order
		//----------------------------------------------------------------------------
		TransactionObj.Order = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Order
		//----------------------------------------------------------------------------
		TransactionObj.OrderId = nil;

		//----------------------------------------------------------------------------
		// save the Transaction
		//----------------------------------------------------------------------------
		return UpdateTransaction(TransactionObj)

	} else {
		return parentRequestResult
	}

}

//----------------------------------------------------------------------------
// assigns a Position on a Transaction
//----------------------------------------------------------------------------
func AssignPositionToTransaction( transactionId uint64, positionId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the Transaction with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetTransaction(transactionId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Transaction so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		TransactionObj,_ := parentRequestResult.Data. (model.Transaction)

		//----------------------------------------------------------------------------
		// Pass the reference to the ORM to get
		//----------------------------------------------------------------------------
		var PositionObj model.Position

		//----------------------------------------------------------------------------
		// Retrieve the 1st occurrence from the ORM of a Position with a
		// matching positionId
		//----------------------------------------------------------------------------
		childRequestResult := utils.GetDB().First(&PositionObj, positionId).Error // find first using identifier

		if childRequestResult == nil {
			//----------------------------------------------------------------------------
			// assign the Position	to the Transaction
			//----------------------------------------------------------------------------
			TransactionObj.Position = &PositionObj

			//----------------------------------------------------------------------------
			// save the Transaction
			//----------------------------------------------------------------------------
			return UpdateTransaction(TransactionObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Position", positionId )
			return utils.RequestResult{false, msg, "assignPosition", PositionObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Position on a Transaction
//----------------------------------------------------------------------------
func UnassignPositionFromTransaction(transactionId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Transaction with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetTransaction(transactionId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Transaction so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		TransactionObj,_ := parentRequestResult.Data. (model.Transaction)

		//----------------------------------------------------------------------------
		// assign an empty Position to the Position
		//----------------------------------------------------------------------------
		TransactionObj.Position = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Position
		//----------------------------------------------------------------------------
		TransactionObj.PositionId = nil;

		//----------------------------------------------------------------------------
		// save the Transaction
		//----------------------------------------------------------------------------
		return UpdateTransaction(TransactionObj)

	} else {
		return parentRequestResult
	}

}


