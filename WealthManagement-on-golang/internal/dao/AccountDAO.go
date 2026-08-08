package dao

import (
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing AccountDAO..." ) )
}

//----------------------------------------------------------------------------
// CreateAccount - creates a new db entry
//----------------------------------------------------------------------------
func CreateAccount(obj model.Account)(utils.RequestResult){
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
	    createMsg = fmt.Sprintf( "Created a Account with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a Account", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreateAccount", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetAccount - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetAccount(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.Account

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a Account with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a Account using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a Account using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetAccount", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllAccount - returns all
//----------------------------------------------------------------------------
func GetAllAccount()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.Account

	//----------------------------------------------------------------------------
	// Request the ORM to find all Account
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all Account" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all Account", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllAccount", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdateAccount - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdateAccount(obj model.Account)(requestResult utils.RequestResult){
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
	    updateMsg = fmt.Sprintf( "Updated a Account using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a Account using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdateAccount", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeleteAccount - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeleteAccount(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the Account with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetAccount(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Account so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.Account)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a Account using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a Account using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeleteAccount", requestResult.Data}

	}

	return requestResult
}


//----------------------------------------------------------------------------
// assigns a Household on a Account
//----------------------------------------------------------------------------
func AssignHouseholdToAccount( accountId uint64, householdId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the Account with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetAccount(accountId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Account so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		AccountObj,_ := parentRequestResult.Data. (model.Account)

		//----------------------------------------------------------------------------
		// Pass the reference to the ORM to get
		//----------------------------------------------------------------------------
		var HouseholdObj model.Household

		//----------------------------------------------------------------------------
		// Retrieve the 1st occurrence from the ORM of a Household with a
		// matching householdId
		//----------------------------------------------------------------------------
		childRequestResult := utils.GetDB().First(&HouseholdObj, householdId).Error // find first using identifier

		if childRequestResult == nil {
			//----------------------------------------------------------------------------
			// assign the Household	to the Account
			//----------------------------------------------------------------------------
			AccountObj.Household = &HouseholdObj

			//----------------------------------------------------------------------------
			// save the Account
			//----------------------------------------------------------------------------
			return UpdateAccount(AccountObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Household", householdId )
			return utils.RequestResult{false, msg, "assignHousehold", HouseholdObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Household on a Account
//----------------------------------------------------------------------------
func UnassignHouseholdFromAccount(accountId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Account with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetAccount(accountId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Account so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		AccountObj,_ := parentRequestResult.Data. (model.Account)

		//----------------------------------------------------------------------------
		// assign an empty Household to the Household
		//----------------------------------------------------------------------------
		AccountObj.Household = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Household
		//----------------------------------------------------------------------------
		AccountObj.HouseholdId = nil;

		//----------------------------------------------------------------------------
		// save the Account
		//----------------------------------------------------------------------------
		return UpdateAccount(AccountObj)

	} else {
		return parentRequestResult
	}

}

//----------------------------------------------------------------------------
// assigns a Advisor on a Account
//----------------------------------------------------------------------------
func AssignAdvisorToAccount( accountId uint64, advisorId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the Account with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetAccount(accountId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Account so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		AccountObj,_ := parentRequestResult.Data. (model.Account)

		//----------------------------------------------------------------------------
		// Pass the reference to the ORM to get
		//----------------------------------------------------------------------------
		var AdvisorObj model.Advisor

		//----------------------------------------------------------------------------
		// Retrieve the 1st occurrence from the ORM of a Advisor with a
		// matching advisorId
		//----------------------------------------------------------------------------
		childRequestResult := utils.GetDB().First(&AdvisorObj, advisorId).Error // find first using identifier

		if childRequestResult == nil {
			//----------------------------------------------------------------------------
			// assign the Advisor	to the Account
			//----------------------------------------------------------------------------
			AccountObj.Advisor = &AdvisorObj

			//----------------------------------------------------------------------------
			// save the Account
			//----------------------------------------------------------------------------
			return UpdateAccount(AccountObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Advisor", advisorId )
			return utils.RequestResult{false, msg, "assignAdvisor", AdvisorObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Advisor on a Account
//----------------------------------------------------------------------------
func UnassignAdvisorFromAccount(accountId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Account with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetAccount(accountId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Account so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		AccountObj,_ := parentRequestResult.Data. (model.Account)

		//----------------------------------------------------------------------------
		// assign an empty Advisor to the Advisor
		//----------------------------------------------------------------------------
		AccountObj.Advisor = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Advisor
		//----------------------------------------------------------------------------
		AccountObj.AdvisorId = nil;

		//----------------------------------------------------------------------------
		// save the Account
		//----------------------------------------------------------------------------
		return UpdateAccount(AccountObj)

	} else {
		return parentRequestResult
	}

}

//----------------------------------------------------------------------------
// assigns a Custodian on a Account
//----------------------------------------------------------------------------
func AssignCustodianToAccount( accountId uint64, custodianId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the Account with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetAccount(accountId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Account so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		AccountObj,_ := parentRequestResult.Data. (model.Account)

		//----------------------------------------------------------------------------
		// Pass the reference to the ORM to get
		//----------------------------------------------------------------------------
		var CustodianObj model.Custodian

		//----------------------------------------------------------------------------
		// Retrieve the 1st occurrence from the ORM of a Custodian with a
		// matching custodianId
		//----------------------------------------------------------------------------
		childRequestResult := utils.GetDB().First(&CustodianObj, custodianId).Error // find first using identifier

		if childRequestResult == nil {
			//----------------------------------------------------------------------------
			// assign the Custodian	to the Account
			//----------------------------------------------------------------------------
			AccountObj.Custodian = &CustodianObj

			//----------------------------------------------------------------------------
			// save the Account
			//----------------------------------------------------------------------------
			return UpdateAccount(AccountObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Custodian", custodianId )
			return utils.RequestResult{false, msg, "assignCustodian", CustodianObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Custodian on a Account
//----------------------------------------------------------------------------
func UnassignCustodianFromAccount(accountId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Account with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetAccount(accountId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Account so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		AccountObj,_ := parentRequestResult.Data. (model.Account)

		//----------------------------------------------------------------------------
		// assign an empty Custodian to the Custodian
		//----------------------------------------------------------------------------
		AccountObj.Custodian = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Custodian
		//----------------------------------------------------------------------------
		AccountObj.CustodianId = nil;

		//----------------------------------------------------------------------------
		// save the Account
		//----------------------------------------------------------------------------
		return UpdateAccount(AccountObj)

	} else {
		return parentRequestResult
	}

}

//----------------------------------------------------------------------------
// assigns a Portfolio on a Account
//----------------------------------------------------------------------------
func AssignPortfolioToAccount( accountId uint64, portfolioId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the Account with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetAccount(accountId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Account so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		AccountObj,_ := parentRequestResult.Data. (model.Account)

		//----------------------------------------------------------------------------
		// Pass the reference to the ORM to get
		//----------------------------------------------------------------------------
		var PortfolioObj model.Portfolio

		//----------------------------------------------------------------------------
		// Retrieve the 1st occurrence from the ORM of a Portfolio with a
		// matching portfolioId
		//----------------------------------------------------------------------------
		childRequestResult := utils.GetDB().First(&PortfolioObj, portfolioId).Error // find first using identifier

		if childRequestResult == nil {
			//----------------------------------------------------------------------------
			// assign the Portfolio	to the Account
			//----------------------------------------------------------------------------
			AccountObj.Portfolio = &PortfolioObj

			//----------------------------------------------------------------------------
			// save the Account
			//----------------------------------------------------------------------------
			return UpdateAccount(AccountObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Portfolio", portfolioId )
			return utils.RequestResult{false, msg, "assignPortfolio", PortfolioObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Portfolio on a Account
//----------------------------------------------------------------------------
func UnassignPortfolioFromAccount(accountId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Account with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetAccount(accountId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Account so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		AccountObj,_ := parentRequestResult.Data. (model.Account)

		//----------------------------------------------------------------------------
		// assign an empty Portfolio to the Portfolio
		//----------------------------------------------------------------------------
		AccountObj.Portfolio = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Portfolio
		//----------------------------------------------------------------------------
		AccountObj.PortfolioId = nil;

		//----------------------------------------------------------------------------
		// save the Account
		//----------------------------------------------------------------------------
		return UpdateAccount(AccountObj)

	} else {
		return parentRequestResult
	}

}


//----------------------------------------------------------------------------
// adds one or more beneficiariesIds as a Beneficiaries to a Account
//----------------------------------------------------------------------------
func AddBeneficiariesToAccount ( accountId uint64, beneficiariesIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Account with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetAccount(accountId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Account so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		AccountObj,_ := parentRequestResult.Data. (model.Account)

		// slice the ids on comma with no spaces
		ids := strings.Split( beneficiariesIds, ",")

		for _, beneficiariesId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var BeneficiaryObj model.Beneficiary

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a Beneficiary
			// with a matching beneficiariesId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&BeneficiaryObj , beneficiariesId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the Beneficiaries using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&AccountObj).Association("Beneficiaries").Append( &BeneficiaryObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Beneficiaries", beneficiariesId )
				return utils.RequestResult{false, msg, "unassignBeneficiaries", BeneficiaryObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Account from the gorm
		//----------------------------------------------------------------------------
		return GetAccount(accountId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more beneficiariesIds as a Beneficiaries from a Account
//----------------------------------------------------------------------------
func RemoveBeneficiariesFromAccount( accountId uint64, beneficiariesIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the Account with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetAccount(accountId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Account so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		AccountObj,_ := parentRequestResult.Data. (model.Account)

		// slice the ids on comma with no spaces
		ids := strings.Split( beneficiariesIds, ",")

		for _, beneficiariesId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var BeneficiaryObj model.Beneficiary

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a Beneficiary
			// with a matching beneficiariesId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&BeneficiaryObj , beneficiariesId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove BeneficiaryObj from the Beneficiaries array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&AccountObj).Association("Beneficiaries").Delete( &BeneficiaryObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Beneficiaries", beneficiariesId )
				return utils.RequestResult{false, msg, "removeBeneficiaries", BeneficiaryObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Account from the gorm
		//----------------------------------------------------------------------------
		return GetAccount(accountId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// adds one or more positionsIds as a Positions to a Account
//----------------------------------------------------------------------------
func AddPositionsToAccount ( accountId uint64, positionsIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Account with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetAccount(accountId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Account so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		AccountObj,_ := parentRequestResult.Data. (model.Account)

		// slice the ids on comma with no spaces
		ids := strings.Split( positionsIds, ",")

		for _, positionsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var PositionObj model.Position

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a Position
			// with a matching positionsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&PositionObj , positionsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the Positions using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&AccountObj).Association("Positions").Append( &PositionObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Positions", positionsId )
				return utils.RequestResult{false, msg, "unassignPositions", PositionObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Account from the gorm
		//----------------------------------------------------------------------------
		return GetAccount(accountId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more positionsIds as a Positions from a Account
//----------------------------------------------------------------------------
func RemovePositionsFromAccount( accountId uint64, positionsIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the Account with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetAccount(accountId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Account so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		AccountObj,_ := parentRequestResult.Data. (model.Account)

		// slice the ids on comma with no spaces
		ids := strings.Split( positionsIds, ",")

		for _, positionsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var PositionObj model.Position

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a Position
			// with a matching positionsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&PositionObj , positionsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove PositionObj from the Positions array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&AccountObj).Association("Positions").Delete( &PositionObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Positions", positionsId )
				return utils.RequestResult{false, msg, "removePositions", PositionObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Account from the gorm
		//----------------------------------------------------------------------------
		return GetAccount(accountId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// adds one or more transactionsIds as a Transactions to a Account
//----------------------------------------------------------------------------
func AddTransactionsToAccount ( accountId uint64, transactionsIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Account with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetAccount(accountId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Account so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		AccountObj,_ := parentRequestResult.Data. (model.Account)

		// slice the ids on comma with no spaces
		ids := strings.Split( transactionsIds, ",")

		for _, transactionsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var TransactionObj model.Transaction

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a Transaction
			// with a matching transactionsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&TransactionObj , transactionsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the Transactions using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&AccountObj).Association("Transactions").Append( &TransactionObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Transactions", transactionsId )
				return utils.RequestResult{false, msg, "unassignTransactions", TransactionObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Account from the gorm
		//----------------------------------------------------------------------------
		return GetAccount(accountId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more transactionsIds as a Transactions from a Account
//----------------------------------------------------------------------------
func RemoveTransactionsFromAccount( accountId uint64, transactionsIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the Account with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetAccount(accountId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Account so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		AccountObj,_ := parentRequestResult.Data. (model.Account)

		// slice the ids on comma with no spaces
		ids := strings.Split( transactionsIds, ",")

		for _, transactionsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var TransactionObj model.Transaction

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a Transaction
			// with a matching transactionsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&TransactionObj , transactionsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove TransactionObj from the Transactions array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&AccountObj).Association("Transactions").Delete( &TransactionObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Transactions", transactionsId )
				return utils.RequestResult{false, msg, "removeTransactions", TransactionObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Account from the gorm
		//----------------------------------------------------------------------------
		return GetAccount(accountId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// adds one or more feesIds as a Fees to a Account
//----------------------------------------------------------------------------
func AddFeesToAccount ( accountId uint64, feesIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Account with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetAccount(accountId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Account so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		AccountObj,_ := parentRequestResult.Data. (model.Account)

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
				utils.GetDB().Model(&AccountObj).Association("Fees").Append( &FeeObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Fees", feesId )
				return utils.RequestResult{false, msg, "unassignFees", FeeObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Account from the gorm
		//----------------------------------------------------------------------------
		return GetAccount(accountId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more feesIds as a Fees from a Account
//----------------------------------------------------------------------------
func RemoveFeesFromAccount( accountId uint64, feesIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the Account with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetAccount(accountId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Account so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		AccountObj,_ := parentRequestResult.Data. (model.Account)

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
				utils.GetDB().Model(&AccountObj).Association("Fees").Delete( &FeeObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Fees", feesId )
				return utils.RequestResult{false, msg, "removeFees", FeeObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Account from the gorm
		//----------------------------------------------------------------------------
		return GetAccount(accountId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// adds one or more standingInstructionsIds as a StandingInstructions to a Account
//----------------------------------------------------------------------------
func AddStandingInstructionsToAccount ( accountId uint64, standingInstructionsIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Account with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetAccount(accountId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Account so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		AccountObj,_ := parentRequestResult.Data. (model.Account)

		// slice the ids on comma with no spaces
		ids := strings.Split( standingInstructionsIds, ",")

		for _, standingInstructionsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var StandingInstructionObj model.StandingInstruction

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a StandingInstruction
			// with a matching standingInstructionsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&StandingInstructionObj , standingInstructionsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the StandingInstructions using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&AccountObj).Association("StandingInstructions").Append( &StandingInstructionObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "StandingInstructions", standingInstructionsId )
				return utils.RequestResult{false, msg, "unassignStandingInstructions", StandingInstructionObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Account from the gorm
		//----------------------------------------------------------------------------
		return GetAccount(accountId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more standingInstructionsIds as a StandingInstructions from a Account
//----------------------------------------------------------------------------
func RemoveStandingInstructionsFromAccount( accountId uint64, standingInstructionsIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the Account with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetAccount(accountId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Account so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		AccountObj,_ := parentRequestResult.Data. (model.Account)

		// slice the ids on comma with no spaces
		ids := strings.Split( standingInstructionsIds, ",")

		for _, standingInstructionsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var StandingInstructionObj model.StandingInstruction

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a StandingInstruction
			// with a matching standingInstructionsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&StandingInstructionObj , standingInstructionsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove StandingInstructionObj from the StandingInstructions array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&AccountObj).Association("StandingInstructions").Delete( &StandingInstructionObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "StandingInstructions", standingInstructionsId )
				return utils.RequestResult{false, msg, "removeStandingInstructions", StandingInstructionObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Account from the gorm
		//----------------------------------------------------------------------------
		return GetAccount(accountId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// adds one or more invoicesIds as a Invoices to a Account
//----------------------------------------------------------------------------
func AddInvoicesToAccount ( accountId uint64, invoicesIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Account with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetAccount(accountId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Account so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		AccountObj,_ := parentRequestResult.Data. (model.Account)

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
				utils.GetDB().Model(&AccountObj).Association("Invoices").Append( &InvoiceObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Invoices", invoicesId )
				return utils.RequestResult{false, msg, "unassignInvoices", InvoiceObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Account from the gorm
		//----------------------------------------------------------------------------
		return GetAccount(accountId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more invoicesIds as a Invoices from a Account
//----------------------------------------------------------------------------
func RemoveInvoicesFromAccount( accountId uint64, invoicesIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the Account with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetAccount(accountId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Account so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		AccountObj,_ := parentRequestResult.Data. (model.Account)

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
				utils.GetDB().Model(&AccountObj).Association("Invoices").Delete( &InvoiceObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Invoices", invoicesId )
				return utils.RequestResult{false, msg, "removeInvoices", InvoiceObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Account from the gorm
		//----------------------------------------------------------------------------
		return GetAccount(accountId)

	} else {
		return parentRequestResult
	}
}

