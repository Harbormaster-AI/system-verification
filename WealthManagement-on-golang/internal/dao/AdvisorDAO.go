package dao

import (
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing AdvisorDAO..." ) )
}

//----------------------------------------------------------------------------
// CreateAdvisor - creates a new db entry
//----------------------------------------------------------------------------
func CreateAdvisor(obj model.Advisor)(utils.RequestResult){
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
	    createMsg = fmt.Sprintf( "Created a Advisor with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a Advisor", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreateAdvisor", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetAdvisor - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetAdvisor(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.Advisor

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a Advisor with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a Advisor using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a Advisor using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetAdvisor", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllAdvisor - returns all
//----------------------------------------------------------------------------
func GetAllAdvisor()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.Advisor

	//----------------------------------------------------------------------------
	// Request the ORM to find all Advisor
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all Advisor" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all Advisor", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllAdvisor", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdateAdvisor - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdateAdvisor(obj model.Advisor)(requestResult utils.RequestResult){
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
	    updateMsg = fmt.Sprintf( "Updated a Advisor using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a Advisor using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdateAdvisor", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeleteAdvisor - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeleteAdvisor(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the Advisor with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetAdvisor(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Advisor so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.Advisor)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a Advisor using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a Advisor using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeleteAdvisor", requestResult.Data}

	}

	return requestResult
}


//----------------------------------------------------------------------------
// assigns a Firm on a Advisor
//----------------------------------------------------------------------------
func AssignFirmToAdvisor( advisorId uint64, firmId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the Advisor with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetAdvisor(advisorId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Advisor so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		AdvisorObj,_ := parentRequestResult.Data. (model.Advisor)

		//----------------------------------------------------------------------------
		// Pass the reference to the ORM to get
		//----------------------------------------------------------------------------
		var WealthFirmObj model.WealthFirm

		//----------------------------------------------------------------------------
		// Retrieve the 1st occurrence from the ORM of a WealthFirm with a
		// matching firmId
		//----------------------------------------------------------------------------
		childRequestResult := utils.GetDB().First(&WealthFirmObj, firmId).Error // find first using identifier

		if childRequestResult == nil {
			//----------------------------------------------------------------------------
			// assign the Firm	to the Advisor
			//----------------------------------------------------------------------------
			AdvisorObj.Firm = &WealthFirmObj

			//----------------------------------------------------------------------------
			// save the Advisor
			//----------------------------------------------------------------------------
			return UpdateAdvisor(AdvisorObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Firm", firmId )
			return utils.RequestResult{false, msg, "assignFirm", WealthFirmObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Firm on a Advisor
//----------------------------------------------------------------------------
func UnassignFirmFromAdvisor(advisorId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Advisor with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetAdvisor(advisorId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Advisor so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		AdvisorObj,_ := parentRequestResult.Data. (model.Advisor)

		//----------------------------------------------------------------------------
		// assign an empty WealthFirm to the Firm
		//----------------------------------------------------------------------------
		AdvisorObj.Firm = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Firm
		//----------------------------------------------------------------------------
		AdvisorObj.FirmId = nil;

		//----------------------------------------------------------------------------
		// save the Advisor
		//----------------------------------------------------------------------------
		return UpdateAdvisor(AdvisorObj)

	} else {
		return parentRequestResult
	}

}

//----------------------------------------------------------------------------
// assigns a Office on a Advisor
//----------------------------------------------------------------------------
func AssignOfficeToAdvisor( advisorId uint64, officeId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the Advisor with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetAdvisor(advisorId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Advisor so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		AdvisorObj,_ := parentRequestResult.Data. (model.Advisor)

		//----------------------------------------------------------------------------
		// Pass the reference to the ORM to get
		//----------------------------------------------------------------------------
		var OfficeObj model.Office

		//----------------------------------------------------------------------------
		// Retrieve the 1st occurrence from the ORM of a Office with a
		// matching officeId
		//----------------------------------------------------------------------------
		childRequestResult := utils.GetDB().First(&OfficeObj, officeId).Error // find first using identifier

		if childRequestResult == nil {
			//----------------------------------------------------------------------------
			// assign the Office	to the Advisor
			//----------------------------------------------------------------------------
			AdvisorObj.Office = &OfficeObj

			//----------------------------------------------------------------------------
			// save the Advisor
			//----------------------------------------------------------------------------
			return UpdateAdvisor(AdvisorObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Office", officeId )
			return utils.RequestResult{false, msg, "assignOffice", OfficeObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Office on a Advisor
//----------------------------------------------------------------------------
func UnassignOfficeFromAdvisor(advisorId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Advisor with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetAdvisor(advisorId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Advisor so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		AdvisorObj,_ := parentRequestResult.Data. (model.Advisor)

		//----------------------------------------------------------------------------
		// assign an empty Office to the Office
		//----------------------------------------------------------------------------
		AdvisorObj.Office = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Office
		//----------------------------------------------------------------------------
		AdvisorObj.OfficeId = nil;

		//----------------------------------------------------------------------------
		// save the Advisor
		//----------------------------------------------------------------------------
		return UpdateAdvisor(AdvisorObj)

	} else {
		return parentRequestResult
	}

}

//----------------------------------------------------------------------------
// assigns a AdvisoryTeam on a Advisor
//----------------------------------------------------------------------------
func AssignAdvisoryTeamToAdvisor( advisorId uint64, advisoryTeamId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the Advisor with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetAdvisor(advisorId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Advisor so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		AdvisorObj,_ := parentRequestResult.Data. (model.Advisor)

		//----------------------------------------------------------------------------
		// Pass the reference to the ORM to get
		//----------------------------------------------------------------------------
		var AdvisoryTeamObj model.AdvisoryTeam

		//----------------------------------------------------------------------------
		// Retrieve the 1st occurrence from the ORM of a AdvisoryTeam with a
		// matching advisoryTeamId
		//----------------------------------------------------------------------------
		childRequestResult := utils.GetDB().First(&AdvisoryTeamObj, advisoryTeamId).Error // find first using identifier

		if childRequestResult == nil {
			//----------------------------------------------------------------------------
			// assign the AdvisoryTeam	to the Advisor
			//----------------------------------------------------------------------------
			AdvisorObj.AdvisoryTeam = &AdvisoryTeamObj

			//----------------------------------------------------------------------------
			// save the Advisor
			//----------------------------------------------------------------------------
			return UpdateAdvisor(AdvisorObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "AdvisoryTeam", advisoryTeamId )
			return utils.RequestResult{false, msg, "assignAdvisoryTeam", AdvisoryTeamObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a AdvisoryTeam on a Advisor
//----------------------------------------------------------------------------
func UnassignAdvisoryTeamFromAdvisor(advisorId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Advisor with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetAdvisor(advisorId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Advisor so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		AdvisorObj,_ := parentRequestResult.Data. (model.Advisor)

		//----------------------------------------------------------------------------
		// assign an empty AdvisoryTeam to the AdvisoryTeam
		//----------------------------------------------------------------------------
		AdvisorObj.AdvisoryTeam = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the AdvisoryTeam
		//----------------------------------------------------------------------------
		AdvisorObj.AdvisoryTeamId = nil;

		//----------------------------------------------------------------------------
		// save the Advisor
		//----------------------------------------------------------------------------
		return UpdateAdvisor(AdvisorObj)

	} else {
		return parentRequestResult
	}

}


//----------------------------------------------------------------------------
// adds one or more clientsIds as a Clients to a Advisor
//----------------------------------------------------------------------------
func AddClientsToAdvisor ( advisorId uint64, clientsIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Advisor with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetAdvisor(advisorId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Advisor so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		AdvisorObj,_ := parentRequestResult.Data. (model.Advisor)

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
				utils.GetDB().Model(&AdvisorObj).Association("Clients").Append( &ClientObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Clients", clientsId )
				return utils.RequestResult{false, msg, "unassignClients", ClientObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Advisor from the gorm
		//----------------------------------------------------------------------------
		return GetAdvisor(advisorId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more clientsIds as a Clients from a Advisor
//----------------------------------------------------------------------------
func RemoveClientsFromAdvisor( advisorId uint64, clientsIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the Advisor with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetAdvisor(advisorId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Advisor so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		AdvisorObj,_ := parentRequestResult.Data. (model.Advisor)

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
				utils.GetDB().Model(&AdvisorObj).Association("Clients").Delete( &ClientObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Clients", clientsId )
				return utils.RequestResult{false, msg, "removeClients", ClientObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Advisor from the gorm
		//----------------------------------------------------------------------------
		return GetAdvisor(advisorId)

	} else {
		return parentRequestResult
	}
}

