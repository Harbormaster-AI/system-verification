package dao

import (
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing CustodianDAO..." ) )
}

//----------------------------------------------------------------------------
// CreateCustodian - creates a new db entry
//----------------------------------------------------------------------------
func CreateCustodian(obj model.Custodian)(utils.RequestResult){
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
	    createMsg = fmt.Sprintf( "Created a Custodian with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a Custodian", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreateCustodian", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetCustodian - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetCustodian(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.Custodian

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a Custodian with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a Custodian using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a Custodian using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetCustodian", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllCustodian - returns all
//----------------------------------------------------------------------------
func GetAllCustodian()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.Custodian

	//----------------------------------------------------------------------------
	// Request the ORM to find all Custodian
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all Custodian" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all Custodian", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllCustodian", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdateCustodian - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdateCustodian(obj model.Custodian)(requestResult utils.RequestResult){
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
	    updateMsg = fmt.Sprintf( "Updated a Custodian using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a Custodian using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdateCustodian", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeleteCustodian - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeleteCustodian(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the Custodian with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetCustodian(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Custodian so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.Custodian)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a Custodian using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a Custodian using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeleteCustodian", requestResult.Data}

	}

	return requestResult
}



//----------------------------------------------------------------------------
// adds one or more accountsIds as a Accounts to a Custodian
//----------------------------------------------------------------------------
func AddAccountsToCustodian ( custodianId uint64, accountsIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Custodian with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetCustodian(custodianId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Custodian so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		CustodianObj,_ := parentRequestResult.Data. (model.Custodian)

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
				utils.GetDB().Model(&CustodianObj).Association("Accounts").Append( &AccountObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Accounts", accountsId )
				return utils.RequestResult{false, msg, "unassignAccounts", AccountObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Custodian from the gorm
		//----------------------------------------------------------------------------
		return GetCustodian(custodianId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more accountsIds as a Accounts from a Custodian
//----------------------------------------------------------------------------
func RemoveAccountsFromCustodian( custodianId uint64, accountsIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the Custodian with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetCustodian(custodianId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Custodian so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		CustodianObj,_ := parentRequestResult.Data. (model.Custodian)

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
				utils.GetDB().Model(&CustodianObj).Association("Accounts").Delete( &AccountObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Accounts", accountsId )
				return utils.RequestResult{false, msg, "removeAccounts", AccountObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Custodian from the gorm
		//----------------------------------------------------------------------------
		return GetCustodian(custodianId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// adds one or more transfersIds as a Transfers to a Custodian
//----------------------------------------------------------------------------
func AddTransfersToCustodian ( custodianId uint64, transfersIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Custodian with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetCustodian(custodianId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Custodian so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		CustodianObj,_ := parentRequestResult.Data. (model.Custodian)

		// slice the ids on comma with no spaces
		ids := strings.Split( transfersIds, ",")

		for _, transfersId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var AccountTransferObj model.AccountTransfer

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a AccountTransfer
			// with a matching transfersId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&AccountTransferObj , transfersId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the Transfers using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&CustodianObj).Association("Transfers").Append( &AccountTransferObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Transfers", transfersId )
				return utils.RequestResult{false, msg, "unassignTransfers", AccountTransferObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Custodian from the gorm
		//----------------------------------------------------------------------------
		return GetCustodian(custodianId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more transfersIds as a Transfers from a Custodian
//----------------------------------------------------------------------------
func RemoveTransfersFromCustodian( custodianId uint64, transfersIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the Custodian with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetCustodian(custodianId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Custodian so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		CustodianObj,_ := parentRequestResult.Data. (model.Custodian)

		// slice the ids on comma with no spaces
		ids := strings.Split( transfersIds, ",")

		for _, transfersId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var AccountTransferObj model.AccountTransfer

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a AccountTransfer
			// with a matching transfersId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&AccountTransferObj , transfersId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove AccountTransferObj from the Transfers array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&CustodianObj).Association("Transfers").Delete( &AccountTransferObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Transfers", transfersId )
				return utils.RequestResult{false, msg, "removeTransfers", AccountTransferObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Custodian from the gorm
		//----------------------------------------------------------------------------
		return GetCustodian(custodianId)

	} else {
		return parentRequestResult
	}
}

