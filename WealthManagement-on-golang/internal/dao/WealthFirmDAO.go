package dao

import (
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing WealthFirmDAO..." ) )
}

//----------------------------------------------------------------------------
// CreateWealthFirm - creates a new db entry
//----------------------------------------------------------------------------
func CreateWealthFirm(obj model.WealthFirm)(utils.RequestResult){
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
	    createMsg = fmt.Sprintf( "Created a WealthFirm with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a WealthFirm", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreateWealthFirm", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetWealthFirm - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetWealthFirm(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.WealthFirm

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a WealthFirm with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a WealthFirm using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a WealthFirm using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetWealthFirm", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllWealthFirm - returns all
//----------------------------------------------------------------------------
func GetAllWealthFirm()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.WealthFirm

	//----------------------------------------------------------------------------
	// Request the ORM to find all WealthFirm
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all WealthFirm" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all WealthFirm", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllWealthFirm", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdateWealthFirm - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdateWealthFirm(obj model.WealthFirm)(requestResult utils.RequestResult){
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
	    updateMsg = fmt.Sprintf( "Updated a WealthFirm using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a WealthFirm using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdateWealthFirm", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeleteWealthFirm - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeleteWealthFirm(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the WealthFirm with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetWealthFirm(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.WealthFirm so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.WealthFirm)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a WealthFirm using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a WealthFirm using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeleteWealthFirm", requestResult.Data}

	}

	return requestResult
}



//----------------------------------------------------------------------------
// adds one or more advisorsIds as a Advisors to a WealthFirm
//----------------------------------------------------------------------------
func AddAdvisorsToWealthFirm ( wealthFirmId uint64, advisorsIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the WealthFirm with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetWealthFirm(wealthFirmId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.WealthFirm so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		WealthFirmObj,_ := parentRequestResult.Data. (model.WealthFirm)

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
				utils.GetDB().Model(&WealthFirmObj).Association("Advisors").Append( &AdvisorObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Advisors", advisorsId )
				return utils.RequestResult{false, msg, "unassignAdvisors", AdvisorObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified WealthFirm from the gorm
		//----------------------------------------------------------------------------
		return GetWealthFirm(wealthFirmId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more advisorsIds as a Advisors from a WealthFirm
//----------------------------------------------------------------------------
func RemoveAdvisorsFromWealthFirm( wealthFirmId uint64, advisorsIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the WealthFirm with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetWealthFirm(wealthFirmId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.WealthFirm so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		WealthFirmObj,_ := parentRequestResult.Data. (model.WealthFirm)

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
				utils.GetDB().Model(&WealthFirmObj).Association("Advisors").Delete( &AdvisorObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Advisors", advisorsId )
				return utils.RequestResult{false, msg, "removeAdvisors", AdvisorObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified WealthFirm from the gorm
		//----------------------------------------------------------------------------
		return GetWealthFirm(wealthFirmId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// adds one or more officesIds as a Offices to a WealthFirm
//----------------------------------------------------------------------------
func AddOfficesToWealthFirm ( wealthFirmId uint64, officesIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the WealthFirm with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetWealthFirm(wealthFirmId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.WealthFirm so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		WealthFirmObj,_ := parentRequestResult.Data. (model.WealthFirm)

		// slice the ids on comma with no spaces
		ids := strings.Split( officesIds, ",")

		for _, officesId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var OfficeObj model.Office

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a Office
			// with a matching officesId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&OfficeObj , officesId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the Offices using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&WealthFirmObj).Association("Offices").Append( &OfficeObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Offices", officesId )
				return utils.RequestResult{false, msg, "unassignOffices", OfficeObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified WealthFirm from the gorm
		//----------------------------------------------------------------------------
		return GetWealthFirm(wealthFirmId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more officesIds as a Offices from a WealthFirm
//----------------------------------------------------------------------------
func RemoveOfficesFromWealthFirm( wealthFirmId uint64, officesIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the WealthFirm with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetWealthFirm(wealthFirmId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.WealthFirm so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		WealthFirmObj,_ := parentRequestResult.Data. (model.WealthFirm)

		// slice the ids on comma with no spaces
		ids := strings.Split( officesIds, ",")

		for _, officesId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var OfficeObj model.Office

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a Office
			// with a matching officesId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&OfficeObj , officesId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove OfficeObj from the Offices array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&WealthFirmObj).Association("Offices").Delete( &OfficeObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Offices", officesId )
				return utils.RequestResult{false, msg, "removeOffices", OfficeObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified WealthFirm from the gorm
		//----------------------------------------------------------------------------
		return GetWealthFirm(wealthFirmId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// adds one or more custodiansIds as a Custodians to a WealthFirm
//----------------------------------------------------------------------------
func AddCustodiansToWealthFirm ( wealthFirmId uint64, custodiansIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the WealthFirm with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetWealthFirm(wealthFirmId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.WealthFirm so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		WealthFirmObj,_ := parentRequestResult.Data. (model.WealthFirm)

		// slice the ids on comma with no spaces
		ids := strings.Split( custodiansIds, ",")

		for _, custodiansId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var CustodianObj model.Custodian

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a Custodian
			// with a matching custodiansId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&CustodianObj , custodiansId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the Custodians using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&WealthFirmObj).Association("Custodians").Append( &CustodianObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Custodians", custodiansId )
				return utils.RequestResult{false, msg, "unassignCustodians", CustodianObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified WealthFirm from the gorm
		//----------------------------------------------------------------------------
		return GetWealthFirm(wealthFirmId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more custodiansIds as a Custodians from a WealthFirm
//----------------------------------------------------------------------------
func RemoveCustodiansFromWealthFirm( wealthFirmId uint64, custodiansIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the WealthFirm with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetWealthFirm(wealthFirmId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.WealthFirm so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		WealthFirmObj,_ := parentRequestResult.Data. (model.WealthFirm)

		// slice the ids on comma with no spaces
		ids := strings.Split( custodiansIds, ",")

		for _, custodiansId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var CustodianObj model.Custodian

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a Custodian
			// with a matching custodiansId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&CustodianObj , custodiansId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove CustodianObj from the Custodians array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&WealthFirmObj).Association("Custodians").Delete( &CustodianObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Custodians", custodiansId )
				return utils.RequestResult{false, msg, "removeCustodians", CustodianObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified WealthFirm from the gorm
		//----------------------------------------------------------------------------
		return GetWealthFirm(wealthFirmId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// adds one or more investmentProgramsIds as a InvestmentPrograms to a WealthFirm
//----------------------------------------------------------------------------
func AddInvestmentProgramsToWealthFirm ( wealthFirmId uint64, investmentProgramsIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the WealthFirm with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetWealthFirm(wealthFirmId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.WealthFirm so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		WealthFirmObj,_ := parentRequestResult.Data. (model.WealthFirm)

		// slice the ids on comma with no spaces
		ids := strings.Split( investmentProgramsIds, ",")

		for _, investmentProgramsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var InvestmentProgramObj model.InvestmentProgram

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a InvestmentProgram
			// with a matching investmentProgramsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&InvestmentProgramObj , investmentProgramsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the InvestmentPrograms using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&WealthFirmObj).Association("InvestmentPrograms").Append( &InvestmentProgramObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "InvestmentPrograms", investmentProgramsId )
				return utils.RequestResult{false, msg, "unassignInvestmentPrograms", InvestmentProgramObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified WealthFirm from the gorm
		//----------------------------------------------------------------------------
		return GetWealthFirm(wealthFirmId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more investmentProgramsIds as a InvestmentPrograms from a WealthFirm
//----------------------------------------------------------------------------
func RemoveInvestmentProgramsFromWealthFirm( wealthFirmId uint64, investmentProgramsIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the WealthFirm with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetWealthFirm(wealthFirmId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.WealthFirm so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		WealthFirmObj,_ := parentRequestResult.Data. (model.WealthFirm)

		// slice the ids on comma with no spaces
		ids := strings.Split( investmentProgramsIds, ",")

		for _, investmentProgramsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var InvestmentProgramObj model.InvestmentProgram

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a InvestmentProgram
			// with a matching investmentProgramsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&InvestmentProgramObj , investmentProgramsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove InvestmentProgramObj from the InvestmentPrograms array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&WealthFirmObj).Association("InvestmentPrograms").Delete( &InvestmentProgramObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "InvestmentPrograms", investmentProgramsId )
				return utils.RequestResult{false, msg, "removeInvestmentPrograms", InvestmentProgramObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified WealthFirm from the gorm
		//----------------------------------------------------------------------------
		return GetWealthFirm(wealthFirmId)

	} else {
		return parentRequestResult
	}
}

