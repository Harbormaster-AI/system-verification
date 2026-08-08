package dao

import (
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing InvestmentPolicyDAO..." ) )
}

//----------------------------------------------------------------------------
// CreateInvestmentPolicy - creates a new db entry
//----------------------------------------------------------------------------
func CreateInvestmentPolicy(obj model.InvestmentPolicy)(utils.RequestResult){
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
	    createMsg = fmt.Sprintf( "Created a InvestmentPolicy with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a InvestmentPolicy", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreateInvestmentPolicy", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetInvestmentPolicy - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetInvestmentPolicy(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.InvestmentPolicy

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a InvestmentPolicy with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a InvestmentPolicy using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a InvestmentPolicy using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetInvestmentPolicy", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllInvestmentPolicy - returns all
//----------------------------------------------------------------------------
func GetAllInvestmentPolicy()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.InvestmentPolicy

	//----------------------------------------------------------------------------
	// Request the ORM to find all InvestmentPolicy
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all InvestmentPolicy" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all InvestmentPolicy", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllInvestmentPolicy", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdateInvestmentPolicy - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdateInvestmentPolicy(obj model.InvestmentPolicy)(requestResult utils.RequestResult){
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
	    updateMsg = fmt.Sprintf( "Updated a InvestmentPolicy using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a InvestmentPolicy using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdateInvestmentPolicy", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeleteInvestmentPolicy - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeleteInvestmentPolicy(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the InvestmentPolicy with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetInvestmentPolicy(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.InvestmentPolicy so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.InvestmentPolicy)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a InvestmentPolicy using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a InvestmentPolicy using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeleteInvestmentPolicy", requestResult.Data}

	}

	return requestResult
}


//----------------------------------------------------------------------------
// assigns a Portfolio on a InvestmentPolicy
//----------------------------------------------------------------------------
func AssignPortfolioToInvestmentPolicy( investmentPolicyId uint64, portfolioId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the InvestmentPolicy with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetInvestmentPolicy(investmentPolicyId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.InvestmentPolicy so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		InvestmentPolicyObj,_ := parentRequestResult.Data. (model.InvestmentPolicy)

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
			// assign the Portfolio	to the InvestmentPolicy
			//----------------------------------------------------------------------------
			InvestmentPolicyObj.Portfolio = &PortfolioObj

			//----------------------------------------------------------------------------
			// save the InvestmentPolicy
			//----------------------------------------------------------------------------
			return UpdateInvestmentPolicy(InvestmentPolicyObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Portfolio", portfolioId )
			return utils.RequestResult{false, msg, "assignPortfolio", PortfolioObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Portfolio on a InvestmentPolicy
//----------------------------------------------------------------------------
func UnassignPortfolioFromInvestmentPolicy(investmentPolicyId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the InvestmentPolicy with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetInvestmentPolicy(investmentPolicyId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.InvestmentPolicy so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		InvestmentPolicyObj,_ := parentRequestResult.Data. (model.InvestmentPolicy)

		//----------------------------------------------------------------------------
		// assign an empty Portfolio to the Portfolio
		//----------------------------------------------------------------------------
		InvestmentPolicyObj.Portfolio = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Portfolio
		//----------------------------------------------------------------------------
		InvestmentPolicyObj.PortfolioId = nil;

		//----------------------------------------------------------------------------
		// save the InvestmentPolicy
		//----------------------------------------------------------------------------
		return UpdateInvestmentPolicy(InvestmentPolicyObj)

	} else {
		return parentRequestResult
	}

}

//----------------------------------------------------------------------------
// assigns a RiskAssessment on a InvestmentPolicy
//----------------------------------------------------------------------------
func AssignRiskAssessmentToInvestmentPolicy( investmentPolicyId uint64, riskAssessmentId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the InvestmentPolicy with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetInvestmentPolicy(investmentPolicyId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.InvestmentPolicy so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		InvestmentPolicyObj,_ := parentRequestResult.Data. (model.InvestmentPolicy)

		//----------------------------------------------------------------------------
		// Pass the reference to the ORM to get
		//----------------------------------------------------------------------------
		var RiskAssessmentObj model.RiskAssessment

		//----------------------------------------------------------------------------
		// Retrieve the 1st occurrence from the ORM of a RiskAssessment with a
		// matching riskAssessmentId
		//----------------------------------------------------------------------------
		childRequestResult := utils.GetDB().First(&RiskAssessmentObj, riskAssessmentId).Error // find first using identifier

		if childRequestResult == nil {
			//----------------------------------------------------------------------------
			// assign the RiskAssessment	to the InvestmentPolicy
			//----------------------------------------------------------------------------
			InvestmentPolicyObj.RiskAssessment = &RiskAssessmentObj

			//----------------------------------------------------------------------------
			// save the InvestmentPolicy
			//----------------------------------------------------------------------------
			return UpdateInvestmentPolicy(InvestmentPolicyObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "RiskAssessment", riskAssessmentId )
			return utils.RequestResult{false, msg, "assignRiskAssessment", RiskAssessmentObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a RiskAssessment on a InvestmentPolicy
//----------------------------------------------------------------------------
func UnassignRiskAssessmentFromInvestmentPolicy(investmentPolicyId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the InvestmentPolicy with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetInvestmentPolicy(investmentPolicyId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.InvestmentPolicy so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		InvestmentPolicyObj,_ := parentRequestResult.Data. (model.InvestmentPolicy)

		//----------------------------------------------------------------------------
		// assign an empty RiskAssessment to the RiskAssessment
		//----------------------------------------------------------------------------
		InvestmentPolicyObj.RiskAssessment = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the RiskAssessment
		//----------------------------------------------------------------------------
		InvestmentPolicyObj.RiskAssessmentId = nil;

		//----------------------------------------------------------------------------
		// save the InvestmentPolicy
		//----------------------------------------------------------------------------
		return UpdateInvestmentPolicy(InvestmentPolicyObj)

	} else {
		return parentRequestResult
	}

}


//----------------------------------------------------------------------------
// adds one or more goalsIds as a Goals to a InvestmentPolicy
//----------------------------------------------------------------------------
func AddGoalsToInvestmentPolicy ( investmentPolicyId uint64, goalsIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the InvestmentPolicy with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetInvestmentPolicy(investmentPolicyId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.InvestmentPolicy so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		InvestmentPolicyObj,_ := parentRequestResult.Data. (model.InvestmentPolicy)

		// slice the ids on comma with no spaces
		ids := strings.Split( goalsIds, ",")

		for _, goalsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var WealthGoalObj model.WealthGoal

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a WealthGoal
			// with a matching goalsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&WealthGoalObj , goalsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the Goals using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&InvestmentPolicyObj).Association("Goals").Append( &WealthGoalObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Goals", goalsId )
				return utils.RequestResult{false, msg, "unassignGoals", WealthGoalObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified InvestmentPolicy from the gorm
		//----------------------------------------------------------------------------
		return GetInvestmentPolicy(investmentPolicyId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more goalsIds as a Goals from a InvestmentPolicy
//----------------------------------------------------------------------------
func RemoveGoalsFromInvestmentPolicy( investmentPolicyId uint64, goalsIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the InvestmentPolicy with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetInvestmentPolicy(investmentPolicyId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.InvestmentPolicy so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		InvestmentPolicyObj,_ := parentRequestResult.Data. (model.InvestmentPolicy)

		// slice the ids on comma with no spaces
		ids := strings.Split( goalsIds, ",")

		for _, goalsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var WealthGoalObj model.WealthGoal

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a WealthGoal
			// with a matching goalsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&WealthGoalObj , goalsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove WealthGoalObj from the Goals array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&InvestmentPolicyObj).Association("Goals").Delete( &WealthGoalObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Goals", goalsId )
				return utils.RequestResult{false, msg, "removeGoals", WealthGoalObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified InvestmentPolicy from the gorm
		//----------------------------------------------------------------------------
		return GetInvestmentPolicy(investmentPolicyId)

	} else {
		return parentRequestResult
	}
}

