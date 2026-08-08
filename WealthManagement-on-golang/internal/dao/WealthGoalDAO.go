package dao

import (
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing WealthGoalDAO..." ) )
}

//----------------------------------------------------------------------------
// CreateWealthGoal - creates a new db entry
//----------------------------------------------------------------------------
func CreateWealthGoal(obj model.WealthGoal)(utils.RequestResult){
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
	    createMsg = fmt.Sprintf( "Created a WealthGoal with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a WealthGoal", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreateWealthGoal", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetWealthGoal - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetWealthGoal(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.WealthGoal

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a WealthGoal with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a WealthGoal using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a WealthGoal using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetWealthGoal", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllWealthGoal - returns all
//----------------------------------------------------------------------------
func GetAllWealthGoal()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.WealthGoal

	//----------------------------------------------------------------------------
	// Request the ORM to find all WealthGoal
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all WealthGoal" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all WealthGoal", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllWealthGoal", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdateWealthGoal - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdateWealthGoal(obj model.WealthGoal)(requestResult utils.RequestResult){
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
	    updateMsg = fmt.Sprintf( "Updated a WealthGoal using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a WealthGoal using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdateWealthGoal", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeleteWealthGoal - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeleteWealthGoal(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the WealthGoal with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetWealthGoal(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.WealthGoal so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.WealthGoal)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a WealthGoal using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a WealthGoal using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeleteWealthGoal", requestResult.Data}

	}

	return requestResult
}


//----------------------------------------------------------------------------
// assigns a Household on a WealthGoal
//----------------------------------------------------------------------------
func AssignHouseholdToWealthGoal( wealthGoalId uint64, householdId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the WealthGoal with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetWealthGoal(wealthGoalId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.WealthGoal so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		WealthGoalObj,_ := parentRequestResult.Data. (model.WealthGoal)

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
			// assign the Household	to the WealthGoal
			//----------------------------------------------------------------------------
			WealthGoalObj.Household = &HouseholdObj

			//----------------------------------------------------------------------------
			// save the WealthGoal
			//----------------------------------------------------------------------------
			return UpdateWealthGoal(WealthGoalObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Household", householdId )
			return utils.RequestResult{false, msg, "assignHousehold", HouseholdObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Household on a WealthGoal
//----------------------------------------------------------------------------
func UnassignHouseholdFromWealthGoal(wealthGoalId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the WealthGoal with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetWealthGoal(wealthGoalId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.WealthGoal so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		WealthGoalObj,_ := parentRequestResult.Data. (model.WealthGoal)

		//----------------------------------------------------------------------------
		// assign an empty Household to the Household
		//----------------------------------------------------------------------------
		WealthGoalObj.Household = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Household
		//----------------------------------------------------------------------------
		WealthGoalObj.HouseholdId = nil;

		//----------------------------------------------------------------------------
		// save the WealthGoal
		//----------------------------------------------------------------------------
		return UpdateWealthGoal(WealthGoalObj)

	} else {
		return parentRequestResult
	}

}

//----------------------------------------------------------------------------
// assigns a Portfolio on a WealthGoal
//----------------------------------------------------------------------------
func AssignPortfolioToWealthGoal( wealthGoalId uint64, portfolioId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the WealthGoal with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetWealthGoal(wealthGoalId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.WealthGoal so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		WealthGoalObj,_ := parentRequestResult.Data. (model.WealthGoal)

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
			// assign the Portfolio	to the WealthGoal
			//----------------------------------------------------------------------------
			WealthGoalObj.Portfolio = &PortfolioObj

			//----------------------------------------------------------------------------
			// save the WealthGoal
			//----------------------------------------------------------------------------
			return UpdateWealthGoal(WealthGoalObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Portfolio", portfolioId )
			return utils.RequestResult{false, msg, "assignPortfolio", PortfolioObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Portfolio on a WealthGoal
//----------------------------------------------------------------------------
func UnassignPortfolioFromWealthGoal(wealthGoalId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the WealthGoal with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetWealthGoal(wealthGoalId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.WealthGoal so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		WealthGoalObj,_ := parentRequestResult.Data. (model.WealthGoal)

		//----------------------------------------------------------------------------
		// assign an empty Portfolio to the Portfolio
		//----------------------------------------------------------------------------
		WealthGoalObj.Portfolio = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Portfolio
		//----------------------------------------------------------------------------
		WealthGoalObj.PortfolioId = nil;

		//----------------------------------------------------------------------------
		// save the WealthGoal
		//----------------------------------------------------------------------------
		return UpdateWealthGoal(WealthGoalObj)

	} else {
		return parentRequestResult
	}

}

//----------------------------------------------------------------------------
// assigns a InvestmentPolicy on a WealthGoal
//----------------------------------------------------------------------------
func AssignInvestmentPolicyToWealthGoal( wealthGoalId uint64, investmentPolicyId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the WealthGoal with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetWealthGoal(wealthGoalId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.WealthGoal so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		WealthGoalObj,_ := parentRequestResult.Data. (model.WealthGoal)

		//----------------------------------------------------------------------------
		// Pass the reference to the ORM to get
		//----------------------------------------------------------------------------
		var InvestmentPolicyObj model.InvestmentPolicy

		//----------------------------------------------------------------------------
		// Retrieve the 1st occurrence from the ORM of a InvestmentPolicy with a
		// matching investmentPolicyId
		//----------------------------------------------------------------------------
		childRequestResult := utils.GetDB().First(&InvestmentPolicyObj, investmentPolicyId).Error // find first using identifier

		if childRequestResult == nil {
			//----------------------------------------------------------------------------
			// assign the InvestmentPolicy	to the WealthGoal
			//----------------------------------------------------------------------------
			WealthGoalObj.InvestmentPolicy = &InvestmentPolicyObj

			//----------------------------------------------------------------------------
			// save the WealthGoal
			//----------------------------------------------------------------------------
			return UpdateWealthGoal(WealthGoalObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "InvestmentPolicy", investmentPolicyId )
			return utils.RequestResult{false, msg, "assignInvestmentPolicy", InvestmentPolicyObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a InvestmentPolicy on a WealthGoal
//----------------------------------------------------------------------------
func UnassignInvestmentPolicyFromWealthGoal(wealthGoalId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the WealthGoal with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetWealthGoal(wealthGoalId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.WealthGoal so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		WealthGoalObj,_ := parentRequestResult.Data. (model.WealthGoal)

		//----------------------------------------------------------------------------
		// assign an empty InvestmentPolicy to the InvestmentPolicy
		//----------------------------------------------------------------------------
		WealthGoalObj.InvestmentPolicy = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the InvestmentPolicy
		//----------------------------------------------------------------------------
		WealthGoalObj.InvestmentPolicyId = nil;

		//----------------------------------------------------------------------------
		// save the WealthGoal
		//----------------------------------------------------------------------------
		return UpdateWealthGoal(WealthGoalObj)

	} else {
		return parentRequestResult
	}

}


