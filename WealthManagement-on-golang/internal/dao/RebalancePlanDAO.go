package dao

import (
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing RebalancePlanDAO..." ) )
}

//----------------------------------------------------------------------------
// CreateRebalancePlan - creates a new db entry
//----------------------------------------------------------------------------
func CreateRebalancePlan(obj model.RebalancePlan)(utils.RequestResult){
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
	    createMsg = fmt.Sprintf( "Created a RebalancePlan with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a RebalancePlan", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreateRebalancePlan", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetRebalancePlan - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetRebalancePlan(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.RebalancePlan

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a RebalancePlan with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a RebalancePlan using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a RebalancePlan using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetRebalancePlan", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllRebalancePlan - returns all
//----------------------------------------------------------------------------
func GetAllRebalancePlan()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.RebalancePlan

	//----------------------------------------------------------------------------
	// Request the ORM to find all RebalancePlan
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all RebalancePlan" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all RebalancePlan", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllRebalancePlan", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdateRebalancePlan - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdateRebalancePlan(obj model.RebalancePlan)(requestResult utils.RequestResult){
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
	    updateMsg = fmt.Sprintf( "Updated a RebalancePlan using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a RebalancePlan using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdateRebalancePlan", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeleteRebalancePlan - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeleteRebalancePlan(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the RebalancePlan with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetRebalancePlan(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.RebalancePlan so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.RebalancePlan)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a RebalancePlan using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a RebalancePlan using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeleteRebalancePlan", requestResult.Data}

	}

	return requestResult
}


//----------------------------------------------------------------------------
// assigns a Portfolio on a RebalancePlan
//----------------------------------------------------------------------------
func AssignPortfolioToRebalancePlan( rebalancePlanId uint64, portfolioId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the RebalancePlan with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetRebalancePlan(rebalancePlanId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.RebalancePlan so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		RebalancePlanObj,_ := parentRequestResult.Data. (model.RebalancePlan)

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
			// assign the Portfolio	to the RebalancePlan
			//----------------------------------------------------------------------------
			RebalancePlanObj.Portfolio = &PortfolioObj

			//----------------------------------------------------------------------------
			// save the RebalancePlan
			//----------------------------------------------------------------------------
			return UpdateRebalancePlan(RebalancePlanObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Portfolio", portfolioId )
			return utils.RequestResult{false, msg, "assignPortfolio", PortfolioObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Portfolio on a RebalancePlan
//----------------------------------------------------------------------------
func UnassignPortfolioFromRebalancePlan(rebalancePlanId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the RebalancePlan with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetRebalancePlan(rebalancePlanId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.RebalancePlan so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		RebalancePlanObj,_ := parentRequestResult.Data. (model.RebalancePlan)

		//----------------------------------------------------------------------------
		// assign an empty Portfolio to the Portfolio
		//----------------------------------------------------------------------------
		RebalancePlanObj.Portfolio = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Portfolio
		//----------------------------------------------------------------------------
		RebalancePlanObj.PortfolioId = nil;

		//----------------------------------------------------------------------------
		// save the RebalancePlan
		//----------------------------------------------------------------------------
		return UpdateRebalancePlan(RebalancePlanObj)

	} else {
		return parentRequestResult
	}

}

//----------------------------------------------------------------------------
// assigns a Advisor on a RebalancePlan
//----------------------------------------------------------------------------
func AssignAdvisorToRebalancePlan( rebalancePlanId uint64, advisorId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the RebalancePlan with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetRebalancePlan(rebalancePlanId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.RebalancePlan so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		RebalancePlanObj,_ := parentRequestResult.Data. (model.RebalancePlan)

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
			// assign the Advisor	to the RebalancePlan
			//----------------------------------------------------------------------------
			RebalancePlanObj.Advisor = &AdvisorObj

			//----------------------------------------------------------------------------
			// save the RebalancePlan
			//----------------------------------------------------------------------------
			return UpdateRebalancePlan(RebalancePlanObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Advisor", advisorId )
			return utils.RequestResult{false, msg, "assignAdvisor", AdvisorObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Advisor on a RebalancePlan
//----------------------------------------------------------------------------
func UnassignAdvisorFromRebalancePlan(rebalancePlanId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the RebalancePlan with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetRebalancePlan(rebalancePlanId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.RebalancePlan so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		RebalancePlanObj,_ := parentRequestResult.Data. (model.RebalancePlan)

		//----------------------------------------------------------------------------
		// assign an empty Advisor to the Advisor
		//----------------------------------------------------------------------------
		RebalancePlanObj.Advisor = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Advisor
		//----------------------------------------------------------------------------
		RebalancePlanObj.AdvisorId = nil;

		//----------------------------------------------------------------------------
		// save the RebalancePlan
		//----------------------------------------------------------------------------
		return UpdateRebalancePlan(RebalancePlanObj)

	} else {
		return parentRequestResult
	}

}


//----------------------------------------------------------------------------
// adds one or more proposedOrdersIds as a ProposedOrders to a RebalancePlan
//----------------------------------------------------------------------------
func AddProposedOrdersToRebalancePlan ( rebalancePlanId uint64, proposedOrdersIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the RebalancePlan with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetRebalancePlan(rebalancePlanId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.RebalancePlan so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		RebalancePlanObj,_ := parentRequestResult.Data. (model.RebalancePlan)

		// slice the ids on comma with no spaces
		ids := strings.Split( proposedOrdersIds, ",")

		for _, proposedOrdersId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var Order_Obj model.Order_

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a Order_
			// with a matching proposedOrdersId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&Order_Obj , proposedOrdersId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the ProposedOrders using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&RebalancePlanObj).Association("ProposedOrders").Append( &Order_Obj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "ProposedOrders", proposedOrdersId )
				return utils.RequestResult{false, msg, "unassignProposedOrders", Order_Obj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified RebalancePlan from the gorm
		//----------------------------------------------------------------------------
		return GetRebalancePlan(rebalancePlanId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more proposedOrdersIds as a ProposedOrders from a RebalancePlan
//----------------------------------------------------------------------------
func RemoveProposedOrdersFromRebalancePlan( rebalancePlanId uint64, proposedOrdersIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the RebalancePlan with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetRebalancePlan(rebalancePlanId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.RebalancePlan so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		RebalancePlanObj,_ := parentRequestResult.Data. (model.RebalancePlan)

		// slice the ids on comma with no spaces
		ids := strings.Split( proposedOrdersIds, ",")

		for _, proposedOrdersId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var Order_Obj model.Order_

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a Order_
			// with a matching proposedOrdersId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&Order_Obj , proposedOrdersId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove Order_Obj from the ProposedOrders array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&RebalancePlanObj).Association("ProposedOrders").Delete( &Order_Obj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "ProposedOrders", proposedOrdersId )
				return utils.RequestResult{false, msg, "removeProposedOrders", Order_Obj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified RebalancePlan from the gorm
		//----------------------------------------------------------------------------
		return GetRebalancePlan(rebalancePlanId)

	} else {
		return parentRequestResult
	}
}

