package dao

import (
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing HouseholdDAO..." ) )
}

//----------------------------------------------------------------------------
// CreateHousehold - creates a new db entry
//----------------------------------------------------------------------------
func CreateHousehold(obj model.Household)(utils.RequestResult){
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
	    createMsg = fmt.Sprintf( "Created a Household with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a Household", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreateHousehold", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetHousehold - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetHousehold(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.Household

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a Household with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a Household using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a Household using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetHousehold", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllHousehold - returns all
//----------------------------------------------------------------------------
func GetAllHousehold()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.Household

	//----------------------------------------------------------------------------
	// Request the ORM to find all Household
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all Household" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all Household", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllHousehold", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdateHousehold - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdateHousehold(obj model.Household)(requestResult utils.RequestResult){
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
	    updateMsg = fmt.Sprintf( "Updated a Household using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a Household using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdateHousehold", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeleteHousehold - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeleteHousehold(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the Household with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetHousehold(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Household so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.Household)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a Household using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a Household using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeleteHousehold", requestResult.Data}

	}

	return requestResult
}


//----------------------------------------------------------------------------
// assigns a PrimaryAdvisor on a Household
//----------------------------------------------------------------------------
func AssignPrimaryAdvisorToHousehold( householdId uint64, primaryAdvisorId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the Household with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetHousehold(householdId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Household so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		HouseholdObj,_ := parentRequestResult.Data. (model.Household)

		//----------------------------------------------------------------------------
		// Pass the reference to the ORM to get
		//----------------------------------------------------------------------------
		var AdvisorObj model.Advisor

		//----------------------------------------------------------------------------
		// Retrieve the 1st occurrence from the ORM of a Advisor with a
		// matching primaryAdvisorId
		//----------------------------------------------------------------------------
		childRequestResult := utils.GetDB().First(&AdvisorObj, primaryAdvisorId).Error // find first using identifier

		if childRequestResult == nil {
			//----------------------------------------------------------------------------
			// assign the PrimaryAdvisor	to the Household
			//----------------------------------------------------------------------------
			HouseholdObj.PrimaryAdvisor = &AdvisorObj

			//----------------------------------------------------------------------------
			// save the Household
			//----------------------------------------------------------------------------
			return UpdateHousehold(HouseholdObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "PrimaryAdvisor", primaryAdvisorId )
			return utils.RequestResult{false, msg, "assignPrimaryAdvisor", AdvisorObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a PrimaryAdvisor on a Household
//----------------------------------------------------------------------------
func UnassignPrimaryAdvisorFromHousehold(householdId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Household with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetHousehold(householdId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Household so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		HouseholdObj,_ := parentRequestResult.Data. (model.Household)

		//----------------------------------------------------------------------------
		// assign an empty Advisor to the PrimaryAdvisor
		//----------------------------------------------------------------------------
		HouseholdObj.PrimaryAdvisor = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the PrimaryAdvisor
		//----------------------------------------------------------------------------
		HouseholdObj.PrimaryAdvisorId = nil;

		//----------------------------------------------------------------------------
		// save the Household
		//----------------------------------------------------------------------------
		return UpdateHousehold(HouseholdObj)

	} else {
		return parentRequestResult
	}

}


//----------------------------------------------------------------------------
// adds one or more clientsIds as a Clients to a Household
//----------------------------------------------------------------------------
func AddClientsToHousehold ( householdId uint64, clientsIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Household with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetHousehold(householdId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Household so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		HouseholdObj,_ := parentRequestResult.Data. (model.Household)

		// slice the ids on comma with no spaces
		ids := strings.Split( clientsIds, ",")

		for _, clientsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var ClientObj model.Client

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a Client
			// with a matching clientsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&ClientObj , clientsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the Clients using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&HouseholdObj).Association("Clients").Append( &ClientObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Clients", clientsId )
				return utils.RequestResult{false, msg, "unassignClients", ClientObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Household from the gorm
		//----------------------------------------------------------------------------
		return GetHousehold(householdId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more clientsIds as a Clients from a Household
//----------------------------------------------------------------------------
func RemoveClientsFromHousehold( householdId uint64, clientsIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the Household with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetHousehold(householdId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Household so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		HouseholdObj,_ := parentRequestResult.Data. (model.Household)

		// slice the ids on comma with no spaces
		ids := strings.Split( clientsIds, ",")

		for _, clientsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var ClientObj model.Client

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a Client
			// with a matching clientsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&ClientObj , clientsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove ClientObj from the Clients array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&HouseholdObj).Association("Clients").Delete( &ClientObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Clients", clientsId )
				return utils.RequestResult{false, msg, "removeClients", ClientObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Household from the gorm
		//----------------------------------------------------------------------------
		return GetHousehold(householdId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// adds one or more portfoliosIds as a Portfolios to a Household
//----------------------------------------------------------------------------
func AddPortfoliosToHousehold ( householdId uint64, portfoliosIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Household with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetHousehold(householdId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Household so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		HouseholdObj,_ := parentRequestResult.Data. (model.Household)

		// slice the ids on comma with no spaces
		ids := strings.Split( portfoliosIds, ",")

		for _, portfoliosId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var PortfolioObj model.Portfolio

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a Portfolio
			// with a matching portfoliosId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&PortfolioObj , portfoliosId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the Portfolios using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&HouseholdObj).Association("Portfolios").Append( &PortfolioObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Portfolios", portfoliosId )
				return utils.RequestResult{false, msg, "unassignPortfolios", PortfolioObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Household from the gorm
		//----------------------------------------------------------------------------
		return GetHousehold(householdId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more portfoliosIds as a Portfolios from a Household
//----------------------------------------------------------------------------
func RemovePortfoliosFromHousehold( householdId uint64, portfoliosIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the Household with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetHousehold(householdId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Household so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		HouseholdObj,_ := parentRequestResult.Data. (model.Household)

		// slice the ids on comma with no spaces
		ids := strings.Split( portfoliosIds, ",")

		for _, portfoliosId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var PortfolioObj model.Portfolio

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a Portfolio
			// with a matching portfoliosId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&PortfolioObj , portfoliosId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove PortfolioObj from the Portfolios array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&HouseholdObj).Association("Portfolios").Delete( &PortfolioObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Portfolios", portfoliosId )
				return utils.RequestResult{false, msg, "removePortfolios", PortfolioObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Household from the gorm
		//----------------------------------------------------------------------------
		return GetHousehold(householdId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// adds one or more goalsIds as a Goals to a Household
//----------------------------------------------------------------------------
func AddGoalsToHousehold ( householdId uint64, goalsIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Household with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetHousehold(householdId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Household so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		HouseholdObj,_ := parentRequestResult.Data. (model.Household)

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
				utils.GetDB().Model(&HouseholdObj).Association("Goals").Append( &WealthGoalObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Goals", goalsId )
				return utils.RequestResult{false, msg, "unassignGoals", WealthGoalObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Household from the gorm
		//----------------------------------------------------------------------------
		return GetHousehold(householdId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more goalsIds as a Goals from a Household
//----------------------------------------------------------------------------
func RemoveGoalsFromHousehold( householdId uint64, goalsIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the Household with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetHousehold(householdId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Household so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		HouseholdObj,_ := parentRequestResult.Data. (model.Household)

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
				utils.GetDB().Model(&HouseholdObj).Association("Goals").Delete( &WealthGoalObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Goals", goalsId )
				return utils.RequestResult{false, msg, "removeGoals", WealthGoalObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Household from the gorm
		//----------------------------------------------------------------------------
		return GetHousehold(householdId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// adds one or more riskAssessmentsIds as a RiskAssessments to a Household
//----------------------------------------------------------------------------
func AddRiskAssessmentsToHousehold ( householdId uint64, riskAssessmentsIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Household with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetHousehold(householdId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Household so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		HouseholdObj,_ := parentRequestResult.Data. (model.Household)

		// slice the ids on comma with no spaces
		ids := strings.Split( riskAssessmentsIds, ",")

		for _, riskAssessmentsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var RiskAssessmentObj model.RiskAssessment

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a RiskAssessment
			// with a matching riskAssessmentsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&RiskAssessmentObj , riskAssessmentsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the RiskAssessments using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&HouseholdObj).Association("RiskAssessments").Append( &RiskAssessmentObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "RiskAssessments", riskAssessmentsId )
				return utils.RequestResult{false, msg, "unassignRiskAssessments", RiskAssessmentObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Household from the gorm
		//----------------------------------------------------------------------------
		return GetHousehold(householdId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more riskAssessmentsIds as a RiskAssessments from a Household
//----------------------------------------------------------------------------
func RemoveRiskAssessmentsFromHousehold( householdId uint64, riskAssessmentsIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the Household with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetHousehold(householdId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Household so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		HouseholdObj,_ := parentRequestResult.Data. (model.Household)

		// slice the ids on comma with no spaces
		ids := strings.Split( riskAssessmentsIds, ",")

		for _, riskAssessmentsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var RiskAssessmentObj model.RiskAssessment

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a RiskAssessment
			// with a matching riskAssessmentsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&RiskAssessmentObj , riskAssessmentsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove RiskAssessmentObj from the RiskAssessments array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&HouseholdObj).Association("RiskAssessments").Delete( &RiskAssessmentObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "RiskAssessments", riskAssessmentsId )
				return utils.RequestResult{false, msg, "removeRiskAssessments", RiskAssessmentObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Household from the gorm
		//----------------------------------------------------------------------------
		return GetHousehold(householdId)

	} else {
		return parentRequestResult
	}
}

