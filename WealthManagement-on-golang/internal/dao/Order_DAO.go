package dao

import (
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing Order_DAO..." ) )
}

//----------------------------------------------------------------------------
// CreateOrder_ - creates a new db entry
//----------------------------------------------------------------------------
func CreateOrder_(obj model.Order_)(utils.RequestResult){
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
	    createMsg = fmt.Sprintf( "Created a Order_ with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a Order_", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreateOrder_", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetOrder_ - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetOrder_(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.Order_

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a Order_ with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a Order_ using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a Order_ using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetOrder_", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllOrder_ - returns all
//----------------------------------------------------------------------------
func GetAllOrder_()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.Order_

	//----------------------------------------------------------------------------
	// Request the ORM to find all Order_
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all Order_" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all Order_", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllOrder_", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdateOrder_ - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdateOrder_(obj model.Order_)(requestResult utils.RequestResult){
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
	    updateMsg = fmt.Sprintf( "Updated a Order_ using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a Order_ using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdateOrder_", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeleteOrder_ - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeleteOrder_(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the Order_ with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetOrder_(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Order_ so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.Order_)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a Order_ using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a Order_ using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeleteOrder_", requestResult.Data}

	}

	return requestResult
}


//----------------------------------------------------------------------------
// assigns a Account on a Order_
//----------------------------------------------------------------------------
func AssignAccountToOrder_( order_Id uint64, accountId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the Order_ with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetOrder_(order_Id)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Order_ so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		Order_Obj,_ := parentRequestResult.Data. (model.Order_)

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
			// assign the Account	to the Order_
			//----------------------------------------------------------------------------
			Order_Obj.Account = &AccountObj

			//----------------------------------------------------------------------------
			// save the Order_
			//----------------------------------------------------------------------------
			return UpdateOrder_(Order_Obj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Account", accountId )
			return utils.RequestResult{false, msg, "assignAccount", AccountObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Account on a Order_
//----------------------------------------------------------------------------
func UnassignAccountFromOrder_(order_Id uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Order_ with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetOrder_(order_Id)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Order_ so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		Order_Obj,_ := parentRequestResult.Data. (model.Order_)

		//----------------------------------------------------------------------------
		// assign an empty Account to the Account
		//----------------------------------------------------------------------------
		Order_Obj.Account = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Account
		//----------------------------------------------------------------------------
		Order_Obj.AccountId = nil;

		//----------------------------------------------------------------------------
		// save the Order_
		//----------------------------------------------------------------------------
		return UpdateOrder_(Order_Obj)

	} else {
		return parentRequestResult
	}

}

//----------------------------------------------------------------------------
// assigns a Security on a Order_
//----------------------------------------------------------------------------
func AssignSecurityToOrder_( order_Id uint64, securityId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the Order_ with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetOrder_(order_Id)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Order_ so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		Order_Obj,_ := parentRequestResult.Data. (model.Order_)

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
			// assign the Security	to the Order_
			//----------------------------------------------------------------------------
			Order_Obj.Security = &SecurityObj

			//----------------------------------------------------------------------------
			// save the Order_
			//----------------------------------------------------------------------------
			return UpdateOrder_(Order_Obj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Security", securityId )
			return utils.RequestResult{false, msg, "assignSecurity", SecurityObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Security on a Order_
//----------------------------------------------------------------------------
func UnassignSecurityFromOrder_(order_Id uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Order_ with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetOrder_(order_Id)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Order_ so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		Order_Obj,_ := parentRequestResult.Data. (model.Order_)

		//----------------------------------------------------------------------------
		// assign an empty Security to the Security
		//----------------------------------------------------------------------------
		Order_Obj.Security = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Security
		//----------------------------------------------------------------------------
		Order_Obj.SecurityId = nil;

		//----------------------------------------------------------------------------
		// save the Order_
		//----------------------------------------------------------------------------
		return UpdateOrder_(Order_Obj)

	} else {
		return parentRequestResult
	}

}

//----------------------------------------------------------------------------
// assigns a Advisor on a Order_
//----------------------------------------------------------------------------
func AssignAdvisorToOrder_( order_Id uint64, advisorId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the Order_ with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetOrder_(order_Id)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Order_ so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		Order_Obj,_ := parentRequestResult.Data. (model.Order_)

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
			// assign the Advisor	to the Order_
			//----------------------------------------------------------------------------
			Order_Obj.Advisor = &AdvisorObj

			//----------------------------------------------------------------------------
			// save the Order_
			//----------------------------------------------------------------------------
			return UpdateOrder_(Order_Obj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Advisor", advisorId )
			return utils.RequestResult{false, msg, "assignAdvisor", AdvisorObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Advisor on a Order_
//----------------------------------------------------------------------------
func UnassignAdvisorFromOrder_(order_Id uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Order_ with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetOrder_(order_Id)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Order_ so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		Order_Obj,_ := parentRequestResult.Data. (model.Order_)

		//----------------------------------------------------------------------------
		// assign an empty Advisor to the Advisor
		//----------------------------------------------------------------------------
		Order_Obj.Advisor = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Advisor
		//----------------------------------------------------------------------------
		Order_Obj.AdvisorId = nil;

		//----------------------------------------------------------------------------
		// save the Order_
		//----------------------------------------------------------------------------
		return UpdateOrder_(Order_Obj)

	} else {
		return parentRequestResult
	}

}


//----------------------------------------------------------------------------
// adds one or more allocationsIds as a Allocations to a Order_
//----------------------------------------------------------------------------
func AddAllocationsToOrder_ ( order_Id uint64, allocationsIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Order_ with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetOrder_(order_Id)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Order_ so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		Order_Obj,_ := parentRequestResult.Data. (model.Order_)

		// slice the ids on comma with no spaces
		ids := strings.Split( allocationsIds, ",")

		for _, allocationsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var OrderAllocationObj model.OrderAllocation

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a OrderAllocation
			// with a matching allocationsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&OrderAllocationObj , allocationsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the Allocations using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&Order_Obj).Association("Allocations").Append( &OrderAllocationObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Allocations", allocationsId )
				return utils.RequestResult{false, msg, "unassignAllocations", OrderAllocationObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Order_ from the gorm
		//----------------------------------------------------------------------------
		return GetOrder_(order_Id)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more allocationsIds as a Allocations from a Order_
//----------------------------------------------------------------------------
func RemoveAllocationsFromOrder_( order_Id uint64, allocationsIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the Order_ with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetOrder_(order_Id)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Order_ so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		Order_Obj,_ := parentRequestResult.Data. (model.Order_)

		// slice the ids on comma with no spaces
		ids := strings.Split( allocationsIds, ",")

		for _, allocationsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var OrderAllocationObj model.OrderAllocation

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a OrderAllocation
			// with a matching allocationsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&OrderAllocationObj , allocationsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove OrderAllocationObj from the Allocations array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&Order_Obj).Association("Allocations").Delete( &OrderAllocationObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Allocations", allocationsId )
				return utils.RequestResult{false, msg, "removeAllocations", OrderAllocationObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Order_ from the gorm
		//----------------------------------------------------------------------------
		return GetOrder_(order_Id)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// adds one or more tradesIds as a Trades to a Order_
//----------------------------------------------------------------------------
func AddTradesToOrder_ ( order_Id uint64, tradesIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Order_ with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetOrder_(order_Id)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Order_ so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		Order_Obj,_ := parentRequestResult.Data. (model.Order_)

		// slice the ids on comma with no spaces
		ids := strings.Split( tradesIds, ",")

		for _, tradesId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var TradeObj model.Trade

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a Trade
			// with a matching tradesId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&TradeObj , tradesId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the Trades using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&Order_Obj).Association("Trades").Append( &TradeObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Trades", tradesId )
				return utils.RequestResult{false, msg, "unassignTrades", TradeObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Order_ from the gorm
		//----------------------------------------------------------------------------
		return GetOrder_(order_Id)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more tradesIds as a Trades from a Order_
//----------------------------------------------------------------------------
func RemoveTradesFromOrder_( order_Id uint64, tradesIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the Order_ with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetOrder_(order_Id)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Order_ so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		Order_Obj,_ := parentRequestResult.Data. (model.Order_)

		// slice the ids on comma with no spaces
		ids := strings.Split( tradesIds, ",")

		for _, tradesId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var TradeObj model.Trade

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a Trade
			// with a matching tradesId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&TradeObj , tradesId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove TradeObj from the Trades array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&Order_Obj).Association("Trades").Delete( &TradeObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Trades", tradesId )
				return utils.RequestResult{false, msg, "removeTrades", TradeObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Order_ from the gorm
		//----------------------------------------------------------------------------
		return GetOrder_(order_Id)

	} else {
		return parentRequestResult
	}
}

