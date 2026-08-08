package dao

import (
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing AdvisoryTeamDAO..." ) )
}

//----------------------------------------------------------------------------
// CreateAdvisoryTeam - creates a new db entry
//----------------------------------------------------------------------------
func CreateAdvisoryTeam(obj model.AdvisoryTeam)(utils.RequestResult){
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
	    createMsg = fmt.Sprintf( "Created a AdvisoryTeam with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a AdvisoryTeam", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreateAdvisoryTeam", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetAdvisoryTeam - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetAdvisoryTeam(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.AdvisoryTeam

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a AdvisoryTeam with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a AdvisoryTeam using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a AdvisoryTeam using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetAdvisoryTeam", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllAdvisoryTeam - returns all
//----------------------------------------------------------------------------
func GetAllAdvisoryTeam()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.AdvisoryTeam

	//----------------------------------------------------------------------------
	// Request the ORM to find all AdvisoryTeam
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all AdvisoryTeam" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all AdvisoryTeam", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllAdvisoryTeam", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdateAdvisoryTeam - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdateAdvisoryTeam(obj model.AdvisoryTeam)(requestResult utils.RequestResult){
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
	    updateMsg = fmt.Sprintf( "Updated a AdvisoryTeam using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a AdvisoryTeam using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdateAdvisoryTeam", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeleteAdvisoryTeam - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeleteAdvisoryTeam(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the AdvisoryTeam with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetAdvisoryTeam(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.AdvisoryTeam so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.AdvisoryTeam)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a AdvisoryTeam using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a AdvisoryTeam using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeleteAdvisoryTeam", requestResult.Data}

	}

	return requestResult
}



//----------------------------------------------------------------------------
// adds one or more advisorsIds as a Advisors to a AdvisoryTeam
//----------------------------------------------------------------------------
func AddAdvisorsToAdvisoryTeam ( advisoryTeamId uint64, advisorsIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the AdvisoryTeam with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetAdvisoryTeam(advisoryTeamId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.AdvisoryTeam so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		AdvisoryTeamObj,_ := parentRequestResult.Data. (model.AdvisoryTeam)

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
				utils.GetDB().Model(&AdvisoryTeamObj).Association("Advisors").Append( &AdvisorObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Advisors", advisorsId )
				return utils.RequestResult{false, msg, "unassignAdvisors", AdvisorObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified AdvisoryTeam from the gorm
		//----------------------------------------------------------------------------
		return GetAdvisoryTeam(advisoryTeamId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more advisorsIds as a Advisors from a AdvisoryTeam
//----------------------------------------------------------------------------
func RemoveAdvisorsFromAdvisoryTeam( advisoryTeamId uint64, advisorsIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the AdvisoryTeam with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetAdvisoryTeam(advisoryTeamId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.AdvisoryTeam so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		AdvisoryTeamObj,_ := parentRequestResult.Data. (model.AdvisoryTeam)

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
				utils.GetDB().Model(&AdvisoryTeamObj).Association("Advisors").Delete( &AdvisorObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Advisors", advisorsId )
				return utils.RequestResult{false, msg, "removeAdvisors", AdvisorObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified AdvisoryTeam from the gorm
		//----------------------------------------------------------------------------
		return GetAdvisoryTeam(advisoryTeamId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// adds one or more householdsIds as a Households to a AdvisoryTeam
//----------------------------------------------------------------------------
func AddHouseholdsToAdvisoryTeam ( advisoryTeamId uint64, householdsIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the AdvisoryTeam with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetAdvisoryTeam(advisoryTeamId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.AdvisoryTeam so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		AdvisoryTeamObj,_ := parentRequestResult.Data. (model.AdvisoryTeam)

		// slice the ids on comma with no spaces
		ids := strings.Split( householdsIds, ",")

		for _, householdsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var HouseholdObj model.Household

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a Household
			// with a matching householdsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&HouseholdObj , householdsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the Households using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&AdvisoryTeamObj).Association("Households").Append( &HouseholdObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Households", householdsId )
				return utils.RequestResult{false, msg, "unassignHouseholds", HouseholdObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified AdvisoryTeam from the gorm
		//----------------------------------------------------------------------------
		return GetAdvisoryTeam(advisoryTeamId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more householdsIds as a Households from a AdvisoryTeam
//----------------------------------------------------------------------------
func RemoveHouseholdsFromAdvisoryTeam( advisoryTeamId uint64, householdsIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the AdvisoryTeam with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetAdvisoryTeam(advisoryTeamId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.AdvisoryTeam so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		AdvisoryTeamObj,_ := parentRequestResult.Data. (model.AdvisoryTeam)

		// slice the ids on comma with no spaces
		ids := strings.Split( householdsIds, ",")

		for _, householdsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var HouseholdObj model.Household

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a Household
			// with a matching householdsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&HouseholdObj , householdsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove HouseholdObj from the Households array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&AdvisoryTeamObj).Association("Households").Delete( &HouseholdObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Households", householdsId )
				return utils.RequestResult{false, msg, "removeHouseholds", HouseholdObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified AdvisoryTeam from the gorm
		//----------------------------------------------------------------------------
		return GetAdvisoryTeam(advisoryTeamId)

	} else {
		return parentRequestResult
	}
}

