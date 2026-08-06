package dao

import (
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing RiskAssessmentDAO..." ) )
}

//----------------------------------------------------------------------------
// CreateRiskAssessment - creates a new db entry
//----------------------------------------------------------------------------
func CreateRiskAssessment(obj model.RiskAssessment)(utils.RequestResult){
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
	    createMsg = fmt.Sprintf( "Created a RiskAssessment with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a RiskAssessment", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreateRiskAssessment", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetRiskAssessment - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetRiskAssessment(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.RiskAssessment

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a RiskAssessment with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a RiskAssessment using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a RiskAssessment using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetRiskAssessment", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllRiskAssessment - returns all
//----------------------------------------------------------------------------
func GetAllRiskAssessment()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.RiskAssessment

	//----------------------------------------------------------------------------
	// Request the ORM to find all RiskAssessment
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all RiskAssessment" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all RiskAssessment", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllRiskAssessment", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdateRiskAssessment - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdateRiskAssessment(obj model.RiskAssessment)(requestResult utils.RequestResult){
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
	    updateMsg = fmt.Sprintf( "Updated a RiskAssessment using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a RiskAssessment using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdateRiskAssessment", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeleteRiskAssessment - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeleteRiskAssessment(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the RiskAssessment with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetRiskAssessment(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.RiskAssessment so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.RiskAssessment)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a RiskAssessment using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a RiskAssessment using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeleteRiskAssessment", requestResult.Data}

	}

	return requestResult
}


//----------------------------------------------------------------------------
// assigns a Household on a RiskAssessment
//----------------------------------------------------------------------------
func AssignHouseholdToRiskAssessment( riskAssessmentId uint64, householdId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the RiskAssessment with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetRiskAssessment(riskAssessmentId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.RiskAssessment so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		RiskAssessmentObj,_ := parentRequestResult.Data. (model.RiskAssessment)

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
			// assign the Household	to the RiskAssessment
			//----------------------------------------------------------------------------
			RiskAssessmentObj.Household = &HouseholdObj

			//----------------------------------------------------------------------------
			// save the RiskAssessment
			//----------------------------------------------------------------------------
			return UpdateRiskAssessment(RiskAssessmentObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Household", householdId )
			return utils.RequestResult{false, msg, "assignHousehold", HouseholdObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Household on a RiskAssessment
//----------------------------------------------------------------------------
func UnassignHouseholdFromRiskAssessment(riskAssessmentId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the RiskAssessment with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetRiskAssessment(riskAssessmentId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.RiskAssessment so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		RiskAssessmentObj,_ := parentRequestResult.Data. (model.RiskAssessment)

		//----------------------------------------------------------------------------
		// assign an empty Household to the Household
		//----------------------------------------------------------------------------
		RiskAssessmentObj.Household = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Household
		//----------------------------------------------------------------------------
		RiskAssessmentObj.HouseholdId = nil;

		//----------------------------------------------------------------------------
		// save the RiskAssessment
		//----------------------------------------------------------------------------
		return UpdateRiskAssessment(RiskAssessmentObj)

	} else {
		return parentRequestResult
	}

}

//----------------------------------------------------------------------------
// assigns a Advisor on a RiskAssessment
//----------------------------------------------------------------------------
func AssignAdvisorToRiskAssessment( riskAssessmentId uint64, advisorId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the RiskAssessment with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetRiskAssessment(riskAssessmentId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.RiskAssessment so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		RiskAssessmentObj,_ := parentRequestResult.Data. (model.RiskAssessment)

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
			// assign the Advisor	to the RiskAssessment
			//----------------------------------------------------------------------------
			RiskAssessmentObj.Advisor = &AdvisorObj

			//----------------------------------------------------------------------------
			// save the RiskAssessment
			//----------------------------------------------------------------------------
			return UpdateRiskAssessment(RiskAssessmentObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Advisor", advisorId )
			return utils.RequestResult{false, msg, "assignAdvisor", AdvisorObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Advisor on a RiskAssessment
//----------------------------------------------------------------------------
func UnassignAdvisorFromRiskAssessment(riskAssessmentId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the RiskAssessment with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetRiskAssessment(riskAssessmentId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.RiskAssessment so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		RiskAssessmentObj,_ := parentRequestResult.Data. (model.RiskAssessment)

		//----------------------------------------------------------------------------
		// assign an empty Advisor to the Advisor
		//----------------------------------------------------------------------------
		RiskAssessmentObj.Advisor = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Advisor
		//----------------------------------------------------------------------------
		RiskAssessmentObj.AdvisorId = nil;

		//----------------------------------------------------------------------------
		// save the RiskAssessment
		//----------------------------------------------------------------------------
		return UpdateRiskAssessment(RiskAssessmentObj)

	} else {
		return parentRequestResult
	}

}


