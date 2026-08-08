package dao

import (
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing PositionDAO..." ) )
}

//----------------------------------------------------------------------------
// CreatePosition - creates a new db entry
//----------------------------------------------------------------------------
func CreatePosition(obj model.Position)(utils.RequestResult){
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
	    createMsg = fmt.Sprintf( "Created a Position with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a Position", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreatePosition", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetPosition - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetPosition(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.Position

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a Position with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a Position using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a Position using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetPosition", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllPosition - returns all
//----------------------------------------------------------------------------
func GetAllPosition()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.Position

	//----------------------------------------------------------------------------
	// Request the ORM to find all Position
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all Position" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all Position", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllPosition", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdatePosition - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdatePosition(obj model.Position)(requestResult utils.RequestResult){
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
	    updateMsg = fmt.Sprintf( "Updated a Position using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a Position using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdatePosition", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeletePosition - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeletePosition(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the Position with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetPosition(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Position so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.Position)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a Position using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a Position using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeletePosition", requestResult.Data}

	}

	return requestResult
}


//----------------------------------------------------------------------------
// assigns a Portfolio on a Position
//----------------------------------------------------------------------------
func AssignPortfolioToPosition( positionId uint64, portfolioId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the Position with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetPosition(positionId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Position so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		PositionObj,_ := parentRequestResult.Data. (model.Position)

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
			// assign the Portfolio	to the Position
			//----------------------------------------------------------------------------
			PositionObj.Portfolio = &PortfolioObj

			//----------------------------------------------------------------------------
			// save the Position
			//----------------------------------------------------------------------------
			return UpdatePosition(PositionObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Portfolio", portfolioId )
			return utils.RequestResult{false, msg, "assignPortfolio", PortfolioObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Portfolio on a Position
//----------------------------------------------------------------------------
func UnassignPortfolioFromPosition(positionId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Position with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetPosition(positionId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Position so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		PositionObj,_ := parentRequestResult.Data. (model.Position)

		//----------------------------------------------------------------------------
		// assign an empty Portfolio to the Portfolio
		//----------------------------------------------------------------------------
		PositionObj.Portfolio = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Portfolio
		//----------------------------------------------------------------------------
		PositionObj.PortfolioId = nil;

		//----------------------------------------------------------------------------
		// save the Position
		//----------------------------------------------------------------------------
		return UpdatePosition(PositionObj)

	} else {
		return parentRequestResult
	}

}

//----------------------------------------------------------------------------
// assigns a Security on a Position
//----------------------------------------------------------------------------
func AssignSecurityToPosition( positionId uint64, securityId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the Position with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetPosition(positionId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Position so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		PositionObj,_ := parentRequestResult.Data. (model.Position)

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
			// assign the Security	to the Position
			//----------------------------------------------------------------------------
			PositionObj.Security = &SecurityObj

			//----------------------------------------------------------------------------
			// save the Position
			//----------------------------------------------------------------------------
			return UpdatePosition(PositionObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Security", securityId )
			return utils.RequestResult{false, msg, "assignSecurity", SecurityObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Security on a Position
//----------------------------------------------------------------------------
func UnassignSecurityFromPosition(positionId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Position with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetPosition(positionId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Position so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		PositionObj,_ := parentRequestResult.Data. (model.Position)

		//----------------------------------------------------------------------------
		// assign an empty Security to the Security
		//----------------------------------------------------------------------------
		PositionObj.Security = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Security
		//----------------------------------------------------------------------------
		PositionObj.SecurityId = nil;

		//----------------------------------------------------------------------------
		// save the Position
		//----------------------------------------------------------------------------
		return UpdatePosition(PositionObj)

	} else {
		return parentRequestResult
	}

}


//----------------------------------------------------------------------------
// adds one or more taxLotsIds as a TaxLots to a Position
//----------------------------------------------------------------------------
func AddTaxLotsToPosition ( positionId uint64, taxLotsIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Position with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetPosition(positionId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Position so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		PositionObj,_ := parentRequestResult.Data. (model.Position)

		// slice the ids on comma with no spaces
		ids := strings.Split( taxLotsIds, ",")

		for _, taxLotsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var TaxLotObj model.TaxLot

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a TaxLot
			// with a matching taxLotsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&TaxLotObj , taxLotsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the TaxLots using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&PositionObj).Association("TaxLots").Append( &TaxLotObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "TaxLots", taxLotsId )
				return utils.RequestResult{false, msg, "unassignTaxLots", TaxLotObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Position from the gorm
		//----------------------------------------------------------------------------
		return GetPosition(positionId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more taxLotsIds as a TaxLots from a Position
//----------------------------------------------------------------------------
func RemoveTaxLotsFromPosition( positionId uint64, taxLotsIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the Position with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetPosition(positionId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Position so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		PositionObj,_ := parentRequestResult.Data. (model.Position)

		// slice the ids on comma with no spaces
		ids := strings.Split( taxLotsIds, ",")

		for _, taxLotsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var TaxLotObj model.TaxLot

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a TaxLot
			// with a matching taxLotsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&TaxLotObj , taxLotsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove TaxLotObj from the TaxLots array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&PositionObj).Association("TaxLots").Delete( &TaxLotObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "TaxLots", taxLotsId )
				return utils.RequestResult{false, msg, "removeTaxLots", TaxLotObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Position from the gorm
		//----------------------------------------------------------------------------
		return GetPosition(positionId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// adds one or more transactionsIds as a Transactions to a Position
//----------------------------------------------------------------------------
func AddTransactionsToPosition ( positionId uint64, transactionsIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Position with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetPosition(positionId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Position so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		PositionObj,_ := parentRequestResult.Data. (model.Position)

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
				utils.GetDB().Model(&PositionObj).Association("Transactions").Append( &TransactionObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Transactions", transactionsId )
				return utils.RequestResult{false, msg, "unassignTransactions", TransactionObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Position from the gorm
		//----------------------------------------------------------------------------
		return GetPosition(positionId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more transactionsIds as a Transactions from a Position
//----------------------------------------------------------------------------
func RemoveTransactionsFromPosition( positionId uint64, transactionsIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the Position with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetPosition(positionId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Position so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		PositionObj,_ := parentRequestResult.Data. (model.Position)

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
				utils.GetDB().Model(&PositionObj).Association("Transactions").Delete( &TransactionObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Transactions", transactionsId )
				return utils.RequestResult{false, msg, "removeTransactions", TransactionObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Position from the gorm
		//----------------------------------------------------------------------------
		return GetPosition(positionId)

	} else {
		return parentRequestResult
	}
}

