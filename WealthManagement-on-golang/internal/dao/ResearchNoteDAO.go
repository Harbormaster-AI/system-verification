package dao

import (
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing ResearchNoteDAO..." ) )
}

//----------------------------------------------------------------------------
// CreateResearchNote - creates a new db entry
//----------------------------------------------------------------------------
func CreateResearchNote(obj model.ResearchNote)(utils.RequestResult){
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
	    createMsg = fmt.Sprintf( "Created a ResearchNote with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a ResearchNote", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreateResearchNote", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetResearchNote - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetResearchNote(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.ResearchNote

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a ResearchNote with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a ResearchNote using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a ResearchNote using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetResearchNote", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllResearchNote - returns all
//----------------------------------------------------------------------------
func GetAllResearchNote()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.ResearchNote

	//----------------------------------------------------------------------------
	// Request the ORM to find all ResearchNote
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all ResearchNote" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all ResearchNote", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllResearchNote", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdateResearchNote - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdateResearchNote(obj model.ResearchNote)(requestResult utils.RequestResult){
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
	    updateMsg = fmt.Sprintf( "Updated a ResearchNote using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a ResearchNote using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdateResearchNote", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeleteResearchNote - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeleteResearchNote(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the ResearchNote with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetResearchNote(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.ResearchNote so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.ResearchNote)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a ResearchNote using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a ResearchNote using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeleteResearchNote", requestResult.Data}

	}

	return requestResult
}


//----------------------------------------------------------------------------
// assigns a Security on a ResearchNote
//----------------------------------------------------------------------------
func AssignSecurityToResearchNote( researchNoteId uint64, securityId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the ResearchNote with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetResearchNote(researchNoteId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.ResearchNote so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		ResearchNoteObj,_ := parentRequestResult.Data. (model.ResearchNote)

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
			// assign the Security	to the ResearchNote
			//----------------------------------------------------------------------------
			ResearchNoteObj.Security = &SecurityObj

			//----------------------------------------------------------------------------
			// save the ResearchNote
			//----------------------------------------------------------------------------
			return UpdateResearchNote(ResearchNoteObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Security", securityId )
			return utils.RequestResult{false, msg, "assignSecurity", SecurityObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Security on a ResearchNote
//----------------------------------------------------------------------------
func UnassignSecurityFromResearchNote(researchNoteId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the ResearchNote with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetResearchNote(researchNoteId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.ResearchNote so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		ResearchNoteObj,_ := parentRequestResult.Data. (model.ResearchNote)

		//----------------------------------------------------------------------------
		// assign an empty Security to the Security
		//----------------------------------------------------------------------------
		ResearchNoteObj.Security = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Security
		//----------------------------------------------------------------------------
		ResearchNoteObj.SecurityId = nil;

		//----------------------------------------------------------------------------
		// save the ResearchNote
		//----------------------------------------------------------------------------
		return UpdateResearchNote(ResearchNoteObj)

	} else {
		return parentRequestResult
	}

}

//----------------------------------------------------------------------------
// assigns a Advisor on a ResearchNote
//----------------------------------------------------------------------------
func AssignAdvisorToResearchNote( researchNoteId uint64, advisorId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the ResearchNote with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetResearchNote(researchNoteId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.ResearchNote so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		ResearchNoteObj,_ := parentRequestResult.Data. (model.ResearchNote)

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
			// assign the Advisor	to the ResearchNote
			//----------------------------------------------------------------------------
			ResearchNoteObj.Advisor = &AdvisorObj

			//----------------------------------------------------------------------------
			// save the ResearchNote
			//----------------------------------------------------------------------------
			return UpdateResearchNote(ResearchNoteObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Advisor", advisorId )
			return utils.RequestResult{false, msg, "assignAdvisor", AdvisorObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Advisor on a ResearchNote
//----------------------------------------------------------------------------
func UnassignAdvisorFromResearchNote(researchNoteId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the ResearchNote with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetResearchNote(researchNoteId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.ResearchNote so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		ResearchNoteObj,_ := parentRequestResult.Data. (model.ResearchNote)

		//----------------------------------------------------------------------------
		// assign an empty Advisor to the Advisor
		//----------------------------------------------------------------------------
		ResearchNoteObj.Advisor = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Advisor
		//----------------------------------------------------------------------------
		ResearchNoteObj.AdvisorId = nil;

		//----------------------------------------------------------------------------
		// save the ResearchNote
		//----------------------------------------------------------------------------
		return UpdateResearchNote(ResearchNoteObj)

	} else {
		return parentRequestResult
	}

}


