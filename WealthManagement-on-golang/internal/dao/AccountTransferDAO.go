package dao

import (
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing AccountTransferDAO..." ) )
}

//----------------------------------------------------------------------------
// CreateAccountTransfer - creates a new db entry
//----------------------------------------------------------------------------
func CreateAccountTransfer(obj model.AccountTransfer)(utils.RequestResult){
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
	    createMsg = fmt.Sprintf( "Created a AccountTransfer with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a AccountTransfer", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreateAccountTransfer", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetAccountTransfer - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetAccountTransfer(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.AccountTransfer

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a AccountTransfer with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a AccountTransfer using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a AccountTransfer using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetAccountTransfer", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllAccountTransfer - returns all
//----------------------------------------------------------------------------
func GetAllAccountTransfer()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.AccountTransfer

	//----------------------------------------------------------------------------
	// Request the ORM to find all AccountTransfer
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all AccountTransfer" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all AccountTransfer", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllAccountTransfer", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdateAccountTransfer - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdateAccountTransfer(obj model.AccountTransfer)(requestResult utils.RequestResult){
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
	    updateMsg = fmt.Sprintf( "Updated a AccountTransfer using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a AccountTransfer using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdateAccountTransfer", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeleteAccountTransfer - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeleteAccountTransfer(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the AccountTransfer with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetAccountTransfer(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.AccountTransfer so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.AccountTransfer)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a AccountTransfer using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a AccountTransfer using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeleteAccountTransfer", requestResult.Data}

	}

	return requestResult
}


//----------------------------------------------------------------------------
// assigns a FromCustodian on a AccountTransfer
//----------------------------------------------------------------------------
func AssignFromCustodianToAccountTransfer( accountTransferId uint64, fromCustodianId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the AccountTransfer with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetAccountTransfer(accountTransferId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.AccountTransfer so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		AccountTransferObj,_ := parentRequestResult.Data. (model.AccountTransfer)

		//----------------------------------------------------------------------------
		// Pass the reference to the ORM to get
		//----------------------------------------------------------------------------
		var CustodianObj model.Custodian

		//----------------------------------------------------------------------------
		// Retrieve the 1st occurrence from the ORM of a Custodian with a
		// matching fromCustodianId
		//----------------------------------------------------------------------------
		childRequestResult := utils.GetDB().First(&CustodianObj, fromCustodianId).Error // find first using identifier

		if childRequestResult == nil {
			//----------------------------------------------------------------------------
			// assign the FromCustodian	to the AccountTransfer
			//----------------------------------------------------------------------------
			AccountTransferObj.FromCustodian = &CustodianObj

			//----------------------------------------------------------------------------
			// save the AccountTransfer
			//----------------------------------------------------------------------------
			return UpdateAccountTransfer(AccountTransferObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "FromCustodian", fromCustodianId )
			return utils.RequestResult{false, msg, "assignFromCustodian", CustodianObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a FromCustodian on a AccountTransfer
//----------------------------------------------------------------------------
func UnassignFromCustodianFromAccountTransfer(accountTransferId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the AccountTransfer with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetAccountTransfer(accountTransferId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.AccountTransfer so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		AccountTransferObj,_ := parentRequestResult.Data. (model.AccountTransfer)

		//----------------------------------------------------------------------------
		// assign an empty Custodian to the FromCustodian
		//----------------------------------------------------------------------------
		AccountTransferObj.FromCustodian = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the FromCustodian
		//----------------------------------------------------------------------------
		AccountTransferObj.FromCustodianId = nil;

		//----------------------------------------------------------------------------
		// save the AccountTransfer
		//----------------------------------------------------------------------------
		return UpdateAccountTransfer(AccountTransferObj)

	} else {
		return parentRequestResult
	}

}

//----------------------------------------------------------------------------
// assigns a ToCustodian on a AccountTransfer
//----------------------------------------------------------------------------
func AssignToCustodianToAccountTransfer( accountTransferId uint64, toCustodianId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the AccountTransfer with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetAccountTransfer(accountTransferId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.AccountTransfer so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		AccountTransferObj,_ := parentRequestResult.Data. (model.AccountTransfer)

		//----------------------------------------------------------------------------
		// Pass the reference to the ORM to get
		//----------------------------------------------------------------------------
		var CustodianObj model.Custodian

		//----------------------------------------------------------------------------
		// Retrieve the 1st occurrence from the ORM of a Custodian with a
		// matching toCustodianId
		//----------------------------------------------------------------------------
		childRequestResult := utils.GetDB().First(&CustodianObj, toCustodianId).Error // find first using identifier

		if childRequestResult == nil {
			//----------------------------------------------------------------------------
			// assign the ToCustodian	to the AccountTransfer
			//----------------------------------------------------------------------------
			AccountTransferObj.ToCustodian = &CustodianObj

			//----------------------------------------------------------------------------
			// save the AccountTransfer
			//----------------------------------------------------------------------------
			return UpdateAccountTransfer(AccountTransferObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "ToCustodian", toCustodianId )
			return utils.RequestResult{false, msg, "assignToCustodian", CustodianObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a ToCustodian on a AccountTransfer
//----------------------------------------------------------------------------
func UnassignToCustodianFromAccountTransfer(accountTransferId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the AccountTransfer with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetAccountTransfer(accountTransferId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.AccountTransfer so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		AccountTransferObj,_ := parentRequestResult.Data. (model.AccountTransfer)

		//----------------------------------------------------------------------------
		// assign an empty Custodian to the ToCustodian
		//----------------------------------------------------------------------------
		AccountTransferObj.ToCustodian = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the ToCustodian
		//----------------------------------------------------------------------------
		AccountTransferObj.ToCustodianId = nil;

		//----------------------------------------------------------------------------
		// save the AccountTransfer
		//----------------------------------------------------------------------------
		return UpdateAccountTransfer(AccountTransferObj)

	} else {
		return parentRequestResult
	}

}

//----------------------------------------------------------------------------
// assigns a Account on a AccountTransfer
//----------------------------------------------------------------------------
func AssignAccountToAccountTransfer( accountTransferId uint64, accountId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the AccountTransfer with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetAccountTransfer(accountTransferId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.AccountTransfer so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		AccountTransferObj,_ := parentRequestResult.Data. (model.AccountTransfer)

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
			// assign the Account	to the AccountTransfer
			//----------------------------------------------------------------------------
			AccountTransferObj.Account = &AccountObj

			//----------------------------------------------------------------------------
			// save the AccountTransfer
			//----------------------------------------------------------------------------
			return UpdateAccountTransfer(AccountTransferObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Account", accountId )
			return utils.RequestResult{false, msg, "assignAccount", AccountObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Account on a AccountTransfer
//----------------------------------------------------------------------------
func UnassignAccountFromAccountTransfer(accountTransferId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the AccountTransfer with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetAccountTransfer(accountTransferId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.AccountTransfer so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		AccountTransferObj,_ := parentRequestResult.Data. (model.AccountTransfer)

		//----------------------------------------------------------------------------
		// assign an empty Account to the Account
		//----------------------------------------------------------------------------
		AccountTransferObj.Account = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Account
		//----------------------------------------------------------------------------
		AccountTransferObj.AccountId = nil;

		//----------------------------------------------------------------------------
		// save the AccountTransfer
		//----------------------------------------------------------------------------
		return UpdateAccountTransfer(AccountTransferObj)

	} else {
		return parentRequestResult
	}

}


