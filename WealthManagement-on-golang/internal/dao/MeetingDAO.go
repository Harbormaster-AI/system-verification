package dao

import (
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing MeetingDAO..." ) )
}

//----------------------------------------------------------------------------
// CreateMeeting - creates a new db entry
//----------------------------------------------------------------------------
func CreateMeeting(obj model.Meeting)(utils.RequestResult){
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
	    createMsg = fmt.Sprintf( "Created a Meeting with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a Meeting", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreateMeeting", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetMeeting - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetMeeting(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.Meeting

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a Meeting with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a Meeting using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a Meeting using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetMeeting", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllMeeting - returns all
//----------------------------------------------------------------------------
func GetAllMeeting()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.Meeting

	//----------------------------------------------------------------------------
	// Request the ORM to find all Meeting
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all Meeting" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all Meeting", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllMeeting", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdateMeeting - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdateMeeting(obj model.Meeting)(requestResult utils.RequestResult){
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
	    updateMsg = fmt.Sprintf( "Updated a Meeting using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a Meeting using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdateMeeting", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeleteMeeting - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeleteMeeting(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the Meeting with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetMeeting(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Meeting so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.Meeting)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a Meeting using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a Meeting using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeleteMeeting", requestResult.Data}

	}

	return requestResult
}


//----------------------------------------------------------------------------
// assigns a Household on a Meeting
//----------------------------------------------------------------------------
func AssignHouseholdToMeeting( meetingId uint64, householdId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the Meeting with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetMeeting(meetingId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Meeting so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		MeetingObj,_ := parentRequestResult.Data. (model.Meeting)

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
			// assign the Household	to the Meeting
			//----------------------------------------------------------------------------
			MeetingObj.Household = &HouseholdObj

			//----------------------------------------------------------------------------
			// save the Meeting
			//----------------------------------------------------------------------------
			return UpdateMeeting(MeetingObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Household", householdId )
			return utils.RequestResult{false, msg, "assignHousehold", HouseholdObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Household on a Meeting
//----------------------------------------------------------------------------
func UnassignHouseholdFromMeeting(meetingId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Meeting with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetMeeting(meetingId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Meeting so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		MeetingObj,_ := parentRequestResult.Data. (model.Meeting)

		//----------------------------------------------------------------------------
		// assign an empty Household to the Household
		//----------------------------------------------------------------------------
		MeetingObj.Household = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Household
		//----------------------------------------------------------------------------
		MeetingObj.HouseholdId = nil;

		//----------------------------------------------------------------------------
		// save the Meeting
		//----------------------------------------------------------------------------
		return UpdateMeeting(MeetingObj)

	} else {
		return parentRequestResult
	}

}

//----------------------------------------------------------------------------
// assigns a Advisor on a Meeting
//----------------------------------------------------------------------------
func AssignAdvisorToMeeting( meetingId uint64, advisorId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the Meeting with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetMeeting(meetingId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Meeting so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		MeetingObj,_ := parentRequestResult.Data. (model.Meeting)

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
			// assign the Advisor	to the Meeting
			//----------------------------------------------------------------------------
			MeetingObj.Advisor = &AdvisorObj

			//----------------------------------------------------------------------------
			// save the Meeting
			//----------------------------------------------------------------------------
			return UpdateMeeting(MeetingObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Advisor", advisorId )
			return utils.RequestResult{false, msg, "assignAdvisor", AdvisorObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Advisor on a Meeting
//----------------------------------------------------------------------------
func UnassignAdvisorFromMeeting(meetingId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Meeting with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetMeeting(meetingId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Meeting so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		MeetingObj,_ := parentRequestResult.Data. (model.Meeting)

		//----------------------------------------------------------------------------
		// assign an empty Advisor to the Advisor
		//----------------------------------------------------------------------------
		MeetingObj.Advisor = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Advisor
		//----------------------------------------------------------------------------
		MeetingObj.AdvisorId = nil;

		//----------------------------------------------------------------------------
		// save the Meeting
		//----------------------------------------------------------------------------
		return UpdateMeeting(MeetingObj)

	} else {
		return parentRequestResult
	}

}


//----------------------------------------------------------------------------
// adds one or more documentsIds as a Documents to a Meeting
//----------------------------------------------------------------------------
func AddDocumentsToMeeting ( meetingId uint64, documentsIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Meeting with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetMeeting(meetingId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Meeting so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		MeetingObj,_ := parentRequestResult.Data. (model.Meeting)

		// slice the ids on comma with no spaces
		ids := strings.Split( documentsIds, ",")

		for _, documentsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var DocumentObj model.Document

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a Document
			// with a matching documentsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&DocumentObj , documentsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the Documents using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&MeetingObj).Association("Documents").Append( &DocumentObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Documents", documentsId )
				return utils.RequestResult{false, msg, "unassignDocuments", DocumentObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Meeting from the gorm
		//----------------------------------------------------------------------------
		return GetMeeting(meetingId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more documentsIds as a Documents from a Meeting
//----------------------------------------------------------------------------
func RemoveDocumentsFromMeeting( meetingId uint64, documentsIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the Meeting with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetMeeting(meetingId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Meeting so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		MeetingObj,_ := parentRequestResult.Data. (model.Meeting)

		// slice the ids on comma with no spaces
		ids := strings.Split( documentsIds, ",")

		for _, documentsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var DocumentObj model.Document

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a Document
			// with a matching documentsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&DocumentObj , documentsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove DocumentObj from the Documents array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&MeetingObj).Association("Documents").Delete( &DocumentObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Documents", documentsId )
				return utils.RequestResult{false, msg, "removeDocuments", DocumentObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Meeting from the gorm
		//----------------------------------------------------------------------------
		return GetMeeting(meetingId)

	} else {
		return parentRequestResult
	}
}

