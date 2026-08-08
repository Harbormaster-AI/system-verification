package dao

import (
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing ProposalDAO..." ) )
}

//----------------------------------------------------------------------------
// CreateProposal - creates a new db entry
//----------------------------------------------------------------------------
func CreateProposal(obj model.Proposal)(utils.RequestResult){
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
	    createMsg = fmt.Sprintf( "Created a Proposal with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a Proposal", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreateProposal", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetProposal - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetProposal(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.Proposal

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a Proposal with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a Proposal using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a Proposal using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetProposal", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllProposal - returns all
//----------------------------------------------------------------------------
func GetAllProposal()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.Proposal

	//----------------------------------------------------------------------------
	// Request the ORM to find all Proposal
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all Proposal" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all Proposal", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllProposal", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdateProposal - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdateProposal(obj model.Proposal)(requestResult utils.RequestResult){
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
	    updateMsg = fmt.Sprintf( "Updated a Proposal using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a Proposal using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdateProposal", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeleteProposal - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeleteProposal(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the Proposal with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetProposal(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Proposal so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.Proposal)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a Proposal using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a Proposal using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeleteProposal", requestResult.Data}

	}

	return requestResult
}


//----------------------------------------------------------------------------
// assigns a Household on a Proposal
//----------------------------------------------------------------------------
func AssignHouseholdToProposal( proposalId uint64, householdId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the Proposal with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetProposal(proposalId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Proposal so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		ProposalObj,_ := parentRequestResult.Data. (model.Proposal)

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
			// assign the Household	to the Proposal
			//----------------------------------------------------------------------------
			ProposalObj.Household = &HouseholdObj

			//----------------------------------------------------------------------------
			// save the Proposal
			//----------------------------------------------------------------------------
			return UpdateProposal(ProposalObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Household", householdId )
			return utils.RequestResult{false, msg, "assignHousehold", HouseholdObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Household on a Proposal
//----------------------------------------------------------------------------
func UnassignHouseholdFromProposal(proposalId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Proposal with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetProposal(proposalId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Proposal so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		ProposalObj,_ := parentRequestResult.Data. (model.Proposal)

		//----------------------------------------------------------------------------
		// assign an empty Household to the Household
		//----------------------------------------------------------------------------
		ProposalObj.Household = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Household
		//----------------------------------------------------------------------------
		ProposalObj.HouseholdId = nil;

		//----------------------------------------------------------------------------
		// save the Proposal
		//----------------------------------------------------------------------------
		return UpdateProposal(ProposalObj)

	} else {
		return parentRequestResult
	}

}

//----------------------------------------------------------------------------
// assigns a Advisor on a Proposal
//----------------------------------------------------------------------------
func AssignAdvisorToProposal( proposalId uint64, advisorId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the Proposal with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetProposal(proposalId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Proposal so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		ProposalObj,_ := parentRequestResult.Data. (model.Proposal)

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
			// assign the Advisor	to the Proposal
			//----------------------------------------------------------------------------
			ProposalObj.Advisor = &AdvisorObj

			//----------------------------------------------------------------------------
			// save the Proposal
			//----------------------------------------------------------------------------
			return UpdateProposal(ProposalObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Advisor", advisorId )
			return utils.RequestResult{false, msg, "assignAdvisor", AdvisorObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Advisor on a Proposal
//----------------------------------------------------------------------------
func UnassignAdvisorFromProposal(proposalId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Proposal with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetProposal(proposalId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Proposal so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		ProposalObj,_ := parentRequestResult.Data. (model.Proposal)

		//----------------------------------------------------------------------------
		// assign an empty Advisor to the Advisor
		//----------------------------------------------------------------------------
		ProposalObj.Advisor = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Advisor
		//----------------------------------------------------------------------------
		ProposalObj.AdvisorId = nil;

		//----------------------------------------------------------------------------
		// save the Proposal
		//----------------------------------------------------------------------------
		return UpdateProposal(ProposalObj)

	} else {
		return parentRequestResult
	}

}

//----------------------------------------------------------------------------
// assigns a ModelPortfolio on a Proposal
//----------------------------------------------------------------------------
func AssignModelPortfolioToProposal( proposalId uint64, modelPortfolioId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the Proposal with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetProposal(proposalId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Proposal so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		ProposalObj,_ := parentRequestResult.Data. (model.Proposal)

		//----------------------------------------------------------------------------
		// Pass the reference to the ORM to get
		//----------------------------------------------------------------------------
		var ModelPortfolioObj model.ModelPortfolio

		//----------------------------------------------------------------------------
		// Retrieve the 1st occurrence from the ORM of a ModelPortfolio with a
		// matching modelPortfolioId
		//----------------------------------------------------------------------------
		childRequestResult := utils.GetDB().First(&ModelPortfolioObj, modelPortfolioId).Error // find first using identifier

		if childRequestResult == nil {
			//----------------------------------------------------------------------------
			// assign the ModelPortfolio	to the Proposal
			//----------------------------------------------------------------------------
			ProposalObj.ModelPortfolio = &ModelPortfolioObj

			//----------------------------------------------------------------------------
			// save the Proposal
			//----------------------------------------------------------------------------
			return UpdateProposal(ProposalObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "ModelPortfolio", modelPortfolioId )
			return utils.RequestResult{false, msg, "assignModelPortfolio", ModelPortfolioObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a ModelPortfolio on a Proposal
//----------------------------------------------------------------------------
func UnassignModelPortfolioFromProposal(proposalId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Proposal with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetProposal(proposalId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Proposal so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		ProposalObj,_ := parentRequestResult.Data. (model.Proposal)

		//----------------------------------------------------------------------------
		// assign an empty ModelPortfolio to the ModelPortfolio
		//----------------------------------------------------------------------------
		ProposalObj.ModelPortfolio = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the ModelPortfolio
		//----------------------------------------------------------------------------
		ProposalObj.ModelPortfolioId = nil;

		//----------------------------------------------------------------------------
		// save the Proposal
		//----------------------------------------------------------------------------
		return UpdateProposal(ProposalObj)

	} else {
		return parentRequestResult
	}

}

//----------------------------------------------------------------------------
// assigns a Account on a Proposal
//----------------------------------------------------------------------------
func AssignAccountToProposal( proposalId uint64, accountId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the Proposal with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetProposal(proposalId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Proposal so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		ProposalObj,_ := parentRequestResult.Data. (model.Proposal)

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
			// assign the Account	to the Proposal
			//----------------------------------------------------------------------------
			ProposalObj.Account = &AccountObj

			//----------------------------------------------------------------------------
			// save the Proposal
			//----------------------------------------------------------------------------
			return UpdateProposal(ProposalObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Account", accountId )
			return utils.RequestResult{false, msg, "assignAccount", AccountObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Account on a Proposal
//----------------------------------------------------------------------------
func UnassignAccountFromProposal(proposalId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Proposal with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetProposal(proposalId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Proposal so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		ProposalObj,_ := parentRequestResult.Data. (model.Proposal)

		//----------------------------------------------------------------------------
		// assign an empty Account to the Account
		//----------------------------------------------------------------------------
		ProposalObj.Account = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Account
		//----------------------------------------------------------------------------
		ProposalObj.AccountId = nil;

		//----------------------------------------------------------------------------
		// save the Proposal
		//----------------------------------------------------------------------------
		return UpdateProposal(ProposalObj)

	} else {
		return parentRequestResult
	}

}


