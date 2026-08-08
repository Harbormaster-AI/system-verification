package dao

import (
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing OfficeDAO..." ) )
}

//----------------------------------------------------------------------------
// CreateOffice - creates a new db entry
//----------------------------------------------------------------------------
func CreateOffice(obj model.Office)(utils.RequestResult){
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
	    createMsg = fmt.Sprintf( "Created a Office with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a Office", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreateOffice", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetOffice - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetOffice(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.Office

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a Office with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a Office using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a Office using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetOffice", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllOffice - returns all
//----------------------------------------------------------------------------
func GetAllOffice()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.Office

	//----------------------------------------------------------------------------
	// Request the ORM to find all Office
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all Office" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all Office", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllOffice", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdateOffice - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdateOffice(obj model.Office)(requestResult utils.RequestResult){
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
	    updateMsg = fmt.Sprintf( "Updated a Office using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a Office using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdateOffice", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeleteOffice - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeleteOffice(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the Office with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetOffice(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Office so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.Office)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a Office using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a Office using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeleteOffice", requestResult.Data}

	}

	return requestResult
}


//----------------------------------------------------------------------------
// assigns a Firm on a Office
//----------------------------------------------------------------------------
func AssignFirmToOffice( officeId uint64, firmId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the Office with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetOffice(officeId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Office so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		OfficeObj,_ := parentRequestResult.Data. (model.Office)

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
			// assign the Firm	to the Office
			//----------------------------------------------------------------------------
			OfficeObj.Firm = &WealthFirmObj

			//----------------------------------------------------------------------------
			// save the Office
			//----------------------------------------------------------------------------
			return UpdateOffice(OfficeObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Firm", firmId )
			return utils.RequestResult{false, msg, "assignFirm", WealthFirmObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Firm on a Office
//----------------------------------------------------------------------------
func UnassignFirmFromOffice(officeId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Office with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetOffice(officeId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Office so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		OfficeObj,_ := parentRequestResult.Data. (model.Office)

		//----------------------------------------------------------------------------
		// assign an empty WealthFirm to the Firm
		//----------------------------------------------------------------------------
		OfficeObj.Firm = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Firm
		//----------------------------------------------------------------------------
		OfficeObj.FirmId = nil;

		//----------------------------------------------------------------------------
		// save the Office
		//----------------------------------------------------------------------------
		return UpdateOffice(OfficeObj)

	} else {
		return parentRequestResult
	}

}


//----------------------------------------------------------------------------
// adds one or more advisorsIds as a Advisors to a Office
//----------------------------------------------------------------------------
func AddAdvisorsToOffice ( officeId uint64, advisorsIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Office with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetOffice(officeId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Office so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		OfficeObj,_ := parentRequestResult.Data. (model.Office)

		// slice the ids on comma with no spaces
		ids := strings.Split( advisorsIds, ",")

		for _, advisorsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var AdvisorObj model.Advisor

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a Advisor
			// with a matching advisorsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&AdvisorObj , advisorsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the Advisors using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&OfficeObj).Association("Advisors").Append( &AdvisorObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Advisors", advisorsId )
				return utils.RequestResult{false, msg, "unassignAdvisors", AdvisorObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Office from the gorm
		//----------------------------------------------------------------------------
		return GetOffice(officeId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more advisorsIds as a Advisors from a Office
//----------------------------------------------------------------------------
func RemoveAdvisorsFromOffice( officeId uint64, advisorsIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the Office with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetOffice(officeId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Office so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		OfficeObj,_ := parentRequestResult.Data. (model.Office)

		// slice the ids on comma with no spaces
		ids := strings.Split( advisorsIds, ",")

		for _, advisorsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var AdvisorObj model.Advisor

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a Advisor
			// with a matching advisorsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&AdvisorObj , advisorsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove AdvisorObj from the Advisors array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&OfficeObj).Association("Advisors").Delete( &AdvisorObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Advisors", advisorsId )
				return utils.RequestResult{false, msg, "removeAdvisors", AdvisorObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Office from the gorm
		//----------------------------------------------------------------------------
		return GetOffice(officeId)

	} else {
		return parentRequestResult
	}
}

