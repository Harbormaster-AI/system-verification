package dao

import (
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing TradeDAO..." ) )
}

//----------------------------------------------------------------------------
// CreateTrade - creates a new db entry
//----------------------------------------------------------------------------
func CreateTrade(obj model.Trade)(utils.RequestResult){
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
	    createMsg = fmt.Sprintf( "Created a Trade with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a Trade", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreateTrade", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetTrade - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetTrade(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.Trade

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a Trade with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a Trade using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a Trade using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetTrade", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllTrade - returns all
//----------------------------------------------------------------------------
func GetAllTrade()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.Trade

	//----------------------------------------------------------------------------
	// Request the ORM to find all Trade
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all Trade" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all Trade", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllTrade", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdateTrade - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdateTrade(obj model.Trade)(requestResult utils.RequestResult){
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
	    updateMsg = fmt.Sprintf( "Updated a Trade using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a Trade using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdateTrade", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeleteTrade - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeleteTrade(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the Trade with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetTrade(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Trade so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.Trade)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a Trade using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a Trade using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeleteTrade", requestResult.Data}

	}

	return requestResult
}


//----------------------------------------------------------------------------
// assigns a Order on a Trade
//----------------------------------------------------------------------------
func AssignOrderToTrade( tradeId uint64, orderId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the Trade with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetTrade(tradeId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Trade so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		TradeObj,_ := parentRequestResult.Data. (model.Trade)

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
			// assign the Order	to the Trade
			//----------------------------------------------------------------------------
			TradeObj.Order = &Order_Obj

			//----------------------------------------------------------------------------
			// save the Trade
			//----------------------------------------------------------------------------
			return UpdateTrade(TradeObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Order", orderId )
			return utils.RequestResult{false, msg, "assignOrder", Order_Obj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Order on a Trade
//----------------------------------------------------------------------------
func UnassignOrderFromTrade(tradeId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Trade with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetTrade(tradeId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Trade so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		TradeObj,_ := parentRequestResult.Data. (model.Trade)

		//----------------------------------------------------------------------------
		// assign an empty Order_ to the Order
		//----------------------------------------------------------------------------
		TradeObj.Order = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Order
		//----------------------------------------------------------------------------
		TradeObj.OrderId = nil;

		//----------------------------------------------------------------------------
		// save the Trade
		//----------------------------------------------------------------------------
		return UpdateTrade(TradeObj)

	} else {
		return parentRequestResult
	}

}

//----------------------------------------------------------------------------
// assigns a Account on a Trade
//----------------------------------------------------------------------------
func AssignAccountToTrade( tradeId uint64, accountId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the Trade with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetTrade(tradeId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Trade so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		TradeObj,_ := parentRequestResult.Data. (model.Trade)

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
			// assign the Account	to the Trade
			//----------------------------------------------------------------------------
			TradeObj.Account = &AccountObj

			//----------------------------------------------------------------------------
			// save the Trade
			//----------------------------------------------------------------------------
			return UpdateTrade(TradeObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Account", accountId )
			return utils.RequestResult{false, msg, "assignAccount", AccountObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Account on a Trade
//----------------------------------------------------------------------------
func UnassignAccountFromTrade(tradeId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Trade with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetTrade(tradeId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Trade so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		TradeObj,_ := parentRequestResult.Data. (model.Trade)

		//----------------------------------------------------------------------------
		// assign an empty Account to the Account
		//----------------------------------------------------------------------------
		TradeObj.Account = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Account
		//----------------------------------------------------------------------------
		TradeObj.AccountId = nil;

		//----------------------------------------------------------------------------
		// save the Trade
		//----------------------------------------------------------------------------
		return UpdateTrade(TradeObj)

	} else {
		return parentRequestResult
	}

}

//----------------------------------------------------------------------------
// assigns a Security on a Trade
//----------------------------------------------------------------------------
func AssignSecurityToTrade( tradeId uint64, securityId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the Trade with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetTrade(tradeId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Trade so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		TradeObj,_ := parentRequestResult.Data. (model.Trade)

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
			// assign the Security	to the Trade
			//----------------------------------------------------------------------------
			TradeObj.Security = &SecurityObj

			//----------------------------------------------------------------------------
			// save the Trade
			//----------------------------------------------------------------------------
			return UpdateTrade(TradeObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Security", securityId )
			return utils.RequestResult{false, msg, "assignSecurity", SecurityObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Security on a Trade
//----------------------------------------------------------------------------
func UnassignSecurityFromTrade(tradeId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Trade with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetTrade(tradeId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Trade so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		TradeObj,_ := parentRequestResult.Data. (model.Trade)

		//----------------------------------------------------------------------------
		// assign an empty Security to the Security
		//----------------------------------------------------------------------------
		TradeObj.Security = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Security
		//----------------------------------------------------------------------------
		TradeObj.SecurityId = nil;

		//----------------------------------------------------------------------------
		// save the Trade
		//----------------------------------------------------------------------------
		return UpdateTrade(TradeObj)

	} else {
		return parentRequestResult
	}

}

//----------------------------------------------------------------------------
// assigns a Transaction on a Trade
//----------------------------------------------------------------------------
func AssignTransactionToTrade( tradeId uint64, transactionId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the Trade with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetTrade(tradeId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Trade so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		TradeObj,_ := parentRequestResult.Data. (model.Trade)

		//----------------------------------------------------------------------------
		// Pass the reference to the ORM to get
		//----------------------------------------------------------------------------
		var TransactionObj model.Transaction

		//----------------------------------------------------------------------------
		// Retrieve the 1st occurrence from the ORM of a Transaction with a
		// matching transactionId
		//----------------------------------------------------------------------------
		childRequestResult := utils.GetDB().First(&TransactionObj, transactionId).Error // find first using identifier

		if childRequestResult == nil {
			//----------------------------------------------------------------------------
			// assign the Transaction	to the Trade
			//----------------------------------------------------------------------------
			TradeObj.Transaction = &TransactionObj

			//----------------------------------------------------------------------------
			// save the Trade
			//----------------------------------------------------------------------------
			return UpdateTrade(TradeObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Transaction", transactionId )
			return utils.RequestResult{false, msg, "assignTransaction", TransactionObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Transaction on a Trade
//----------------------------------------------------------------------------
func UnassignTransactionFromTrade(tradeId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Trade with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetTrade(tradeId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Trade so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		TradeObj,_ := parentRequestResult.Data. (model.Trade)

		//----------------------------------------------------------------------------
		// assign an empty Transaction to the Transaction
		//----------------------------------------------------------------------------
		TradeObj.Transaction = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Transaction
		//----------------------------------------------------------------------------
		TradeObj.TransactionId = nil;

		//----------------------------------------------------------------------------
		// save the Trade
		//----------------------------------------------------------------------------
		return UpdateTrade(TradeObj)

	} else {
		return parentRequestResult
	}

}


