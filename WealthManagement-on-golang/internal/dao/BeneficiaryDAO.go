package dao

import (
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing BeneficiaryDAO..." ) )
}

//----------------------------------------------------------------------------
// CreateBeneficiary - creates a new db entry
//----------------------------------------------------------------------------
func CreateBeneficiary(obj model.Beneficiary)(utils.RequestResult){
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
	    createMsg = fmt.Sprintf( "Created a Beneficiary with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a Beneficiary", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreateBeneficiary", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetBeneficiary - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetBeneficiary(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.Beneficiary

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a Beneficiary with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a Beneficiary using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a Beneficiary using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetBeneficiary", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllBeneficiary - returns all
//----------------------------------------------------------------------------
func GetAllBeneficiary()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.Beneficiary

	//----------------------------------------------------------------------------
	// Request the ORM to find all Beneficiary
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all Beneficiary" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all Beneficiary", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllBeneficiary", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdateBeneficiary - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdateBeneficiary(obj model.Beneficiary)(requestResult utils.RequestResult){
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
	    updateMsg = fmt.Sprintf( "Updated a Beneficiary using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a Beneficiary using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdateBeneficiary", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeleteBeneficiary - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeleteBeneficiary(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the Beneficiary with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetBeneficiary(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Beneficiary so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.Beneficiary)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a Beneficiary using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a Beneficiary using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeleteBeneficiary", requestResult.Data}

	}

	return requestResult
}


//----------------------------------------------------------------------------
// assigns a Client on a Beneficiary
//----------------------------------------------------------------------------
func AssignClientToBeneficiary( beneficiaryId uint64, clientId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the Beneficiary with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetBeneficiary(beneficiaryId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Beneficiary so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		BeneficiaryObj,_ := parentRequestResult.Data. (model.Beneficiary)

		//----------------------------------------------------------------------------
		// Pass the reference to the ORM to get
		//----------------------------------------------------------------------------
		var ClientObj model.Client

		//----------------------------------------------------------------------------
		// Retrieve the 1st occurrence from the ORM of a Client with a
		// matching clientId
		//----------------------------------------------------------------------------
		childRequestResult := utils.GetDB().First(&ClientObj, clientId).Error // find first using identifier

		if childRequestResult == nil {
			//----------------------------------------------------------------------------
			// assign the Client	to the Beneficiary
			//----------------------------------------------------------------------------
			BeneficiaryObj.Client = &ClientObj

			//----------------------------------------------------------------------------
			// save the Beneficiary
			//----------------------------------------------------------------------------
			return UpdateBeneficiary(BeneficiaryObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Client", clientId )
			return utils.RequestResult{false, msg, "assignClient", ClientObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Client on a Beneficiary
//----------------------------------------------------------------------------
func UnassignClientFromBeneficiary(beneficiaryId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Beneficiary with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetBeneficiary(beneficiaryId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Beneficiary so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		BeneficiaryObj,_ := parentRequestResult.Data. (model.Beneficiary)

		//----------------------------------------------------------------------------
		// assign an empty Client to the Client
		//----------------------------------------------------------------------------
		BeneficiaryObj.Client = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Client
		//----------------------------------------------------------------------------
		BeneficiaryObj.ClientId = nil;

		//----------------------------------------------------------------------------
		// save the Beneficiary
		//----------------------------------------------------------------------------
		return UpdateBeneficiary(BeneficiaryObj)

	} else {
		return parentRequestResult
	}

}


//----------------------------------------------------------------------------
// adds one or more accountsIds as a Accounts to a Beneficiary
//----------------------------------------------------------------------------
func AddAccountsToBeneficiary ( beneficiaryId uint64, accountsIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Beneficiary with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetBeneficiary(beneficiaryId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Beneficiary so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		BeneficiaryObj,_ := parentRequestResult.Data. (model.Beneficiary)

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
				utils.GetDB().Model(&BeneficiaryObj).Association("Accounts").Append( &AccountObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Accounts", accountsId )
				return utils.RequestResult{false, msg, "unassignAccounts", AccountObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Beneficiary from the gorm
		//----------------------------------------------------------------------------
		return GetBeneficiary(beneficiaryId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more accountsIds as a Accounts from a Beneficiary
//----------------------------------------------------------------------------
func RemoveAccountsFromBeneficiary( beneficiaryId uint64, accountsIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the Beneficiary with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetBeneficiary(beneficiaryId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Beneficiary so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		BeneficiaryObj,_ := parentRequestResult.Data. (model.Beneficiary)

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
				utils.GetDB().Model(&BeneficiaryObj).Association("Accounts").Delete( &AccountObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Accounts", accountsId )
				return utils.RequestResult{false, msg, "removeAccounts", AccountObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Beneficiary from the gorm
		//----------------------------------------------------------------------------
		return GetBeneficiary(beneficiaryId)

	} else {
		return parentRequestResult
	}
}

