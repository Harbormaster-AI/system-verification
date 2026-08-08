package dao

import (
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing OrderAllocationDAO..." ) )
}

//----------------------------------------------------------------------------
// CreateOrderAllocation - creates a new db entry
//----------------------------------------------------------------------------
func CreateOrderAllocation(obj model.OrderAllocation)(utils.RequestResult){
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
	    createMsg = fmt.Sprintf( "Created a OrderAllocation with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a OrderAllocation", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreateOrderAllocation", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetOrderAllocation - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetOrderAllocation(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.OrderAllocation

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a OrderAllocation with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a OrderAllocation using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a OrderAllocation using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetOrderAllocation", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllOrderAllocation - returns all
//----------------------------------------------------------------------------
func GetAllOrderAllocation()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.OrderAllocation

	//----------------------------------------------------------------------------
	// Request the ORM to find all OrderAllocation
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all OrderAllocation" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all OrderAllocation", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllOrderAllocation", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdateOrderAllocation - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdateOrderAllocation(obj model.OrderAllocation)(requestResult utils.RequestResult){
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
	    updateMsg = fmt.Sprintf( "Updated a OrderAllocation using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a OrderAllocation using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdateOrderAllocation", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeleteOrderAllocation - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeleteOrderAllocation(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the OrderAllocation with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetOrderAllocation(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.OrderAllocation so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.OrderAllocation)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a OrderAllocation using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a OrderAllocation using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeleteOrderAllocation", requestResult.Data}

	}

	return requestResult
}


//----------------------------------------------------------------------------
// assigns a Order on a OrderAllocation
//----------------------------------------------------------------------------
func AssignOrderToOrderAllocation( orderAllocationId uint64, orderId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the OrderAllocation with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetOrderAllocation(orderAllocationId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.OrderAllocation so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		OrderAllocationObj,_ := parentRequestResult.Data. (model.OrderAllocation)

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
			// assign the Order	to the OrderAllocation
			//----------------------------------------------------------------------------
			OrderAllocationObj.Order = &Order_Obj

			//----------------------------------------------------------------------------
			// save the OrderAllocation
			//----------------------------------------------------------------------------
			return UpdateOrderAllocation(OrderAllocationObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Order", orderId )
			return utils.RequestResult{false, msg, "assignOrder", Order_Obj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Order on a OrderAllocation
//----------------------------------------------------------------------------
func UnassignOrderFromOrderAllocation(orderAllocationId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the OrderAllocation with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetOrderAllocation(orderAllocationId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.OrderAllocation so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		OrderAllocationObj,_ := parentRequestResult.Data. (model.OrderAllocation)

		//----------------------------------------------------------------------------
		// assign an empty Order_ to the Order
		//----------------------------------------------------------------------------
		OrderAllocationObj.Order = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Order
		//----------------------------------------------------------------------------
		OrderAllocationObj.OrderId = nil;

		//----------------------------------------------------------------------------
		// save the OrderAllocation
		//----------------------------------------------------------------------------
		return UpdateOrderAllocation(OrderAllocationObj)

	} else {
		return parentRequestResult
	}

}

//----------------------------------------------------------------------------
// assigns a Account on a OrderAllocation
//----------------------------------------------------------------------------
func AssignAccountToOrderAllocation( orderAllocationId uint64, accountId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the OrderAllocation with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetOrderAllocation(orderAllocationId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.OrderAllocation so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		OrderAllocationObj,_ := parentRequestResult.Data. (model.OrderAllocation)

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
			// assign the Account	to the OrderAllocation
			//----------------------------------------------------------------------------
			OrderAllocationObj.Account = &AccountObj

			//----------------------------------------------------------------------------
			// save the OrderAllocation
			//----------------------------------------------------------------------------
			return UpdateOrderAllocation(OrderAllocationObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Account", accountId )
			return utils.RequestResult{false, msg, "assignAccount", AccountObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Account on a OrderAllocation
//----------------------------------------------------------------------------
func UnassignAccountFromOrderAllocation(orderAllocationId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the OrderAllocation with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetOrderAllocation(orderAllocationId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.OrderAllocation so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		OrderAllocationObj,_ := parentRequestResult.Data. (model.OrderAllocation)

		//----------------------------------------------------------------------------
		// assign an empty Account to the Account
		//----------------------------------------------------------------------------
		OrderAllocationObj.Account = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Account
		//----------------------------------------------------------------------------
		OrderAllocationObj.AccountId = nil;

		//----------------------------------------------------------------------------
		// save the OrderAllocation
		//----------------------------------------------------------------------------
		return UpdateOrderAllocation(OrderAllocationObj)

	} else {
		return parentRequestResult
	}

}

//----------------------------------------------------------------------------
// assigns a Portfolio on a OrderAllocation
//----------------------------------------------------------------------------
func AssignPortfolioToOrderAllocation( orderAllocationId uint64, portfolioId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the OrderAllocation with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetOrderAllocation(orderAllocationId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.OrderAllocation so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		OrderAllocationObj,_ := parentRequestResult.Data. (model.OrderAllocation)

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
			// assign the Portfolio	to the OrderAllocation
			//----------------------------------------------------------------------------
			OrderAllocationObj.Portfolio = &PortfolioObj

			//----------------------------------------------------------------------------
			// save the OrderAllocation
			//----------------------------------------------------------------------------
			return UpdateOrderAllocation(OrderAllocationObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Portfolio", portfolioId )
			return utils.RequestResult{false, msg, "assignPortfolio", PortfolioObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Portfolio on a OrderAllocation
//----------------------------------------------------------------------------
func UnassignPortfolioFromOrderAllocation(orderAllocationId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the OrderAllocation with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetOrderAllocation(orderAllocationId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.OrderAllocation so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		OrderAllocationObj,_ := parentRequestResult.Data. (model.OrderAllocation)

		//----------------------------------------------------------------------------
		// assign an empty Portfolio to the Portfolio
		//----------------------------------------------------------------------------
		OrderAllocationObj.Portfolio = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Portfolio
		//----------------------------------------------------------------------------
		OrderAllocationObj.PortfolioId = nil;

		//----------------------------------------------------------------------------
		// save the OrderAllocation
		//----------------------------------------------------------------------------
		return UpdateOrderAllocation(OrderAllocationObj)

	} else {
		return parentRequestResult
	}

}


