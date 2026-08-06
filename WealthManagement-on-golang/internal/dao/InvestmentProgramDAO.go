package dao

import (
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing InvestmentProgramDAO..." ) )
}

//----------------------------------------------------------------------------
// CreateInvestmentProgram - creates a new db entry
//----------------------------------------------------------------------------
func CreateInvestmentProgram(obj model.InvestmentProgram)(utils.RequestResult){
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
	    createMsg = fmt.Sprintf( "Created a InvestmentProgram with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a InvestmentProgram", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreateInvestmentProgram", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetInvestmentProgram - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetInvestmentProgram(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.InvestmentProgram

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a InvestmentProgram with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a InvestmentProgram using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a InvestmentProgram using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetInvestmentProgram", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllInvestmentProgram - returns all
//----------------------------------------------------------------------------
func GetAllInvestmentProgram()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.InvestmentProgram

	//----------------------------------------------------------------------------
	// Request the ORM to find all InvestmentProgram
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all InvestmentProgram" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all InvestmentProgram", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllInvestmentProgram", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdateInvestmentProgram - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdateInvestmentProgram(obj model.InvestmentProgram)(requestResult utils.RequestResult){
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
	    updateMsg = fmt.Sprintf( "Updated a InvestmentProgram using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a InvestmentProgram using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdateInvestmentProgram", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeleteInvestmentProgram - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeleteInvestmentProgram(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the InvestmentProgram with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetInvestmentProgram(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.InvestmentProgram so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.InvestmentProgram)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a InvestmentProgram using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a InvestmentProgram using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeleteInvestmentProgram", requestResult.Data}

	}

	return requestResult
}



//----------------------------------------------------------------------------
// adds one or more modelPortfoliosIds as a ModelPortfolios to a InvestmentProgram
//----------------------------------------------------------------------------
func AddModelPortfoliosToInvestmentProgram ( investmentProgramId uint64, modelPortfoliosIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the InvestmentProgram with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetInvestmentProgram(investmentProgramId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.InvestmentProgram so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		InvestmentProgramObj,_ := parentRequestResult.Data. (model.InvestmentProgram)

		// slice the ids on comma with no spaces
		ids := strings.Split( modelPortfoliosIds, ",")

		for _, modelPortfoliosId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var ModelPortfolioObj model.ModelPortfolio

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a ModelPortfolio
			// with a matching modelPortfoliosId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&ModelPortfolioObj , modelPortfoliosId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the ModelPortfolios using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&InvestmentProgramObj).Association("ModelPortfolios").Append( &ModelPortfolioObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "ModelPortfolios", modelPortfoliosId )
				return utils.RequestResult{false, msg, "unassignModelPortfolios", ModelPortfolioObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified InvestmentProgram from the gorm
		//----------------------------------------------------------------------------
		return GetInvestmentProgram(investmentProgramId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more modelPortfoliosIds as a ModelPortfolios from a InvestmentProgram
//----------------------------------------------------------------------------
func RemoveModelPortfoliosFromInvestmentProgram( investmentProgramId uint64, modelPortfoliosIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the InvestmentProgram with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetInvestmentProgram(investmentProgramId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.InvestmentProgram so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		InvestmentProgramObj,_ := parentRequestResult.Data. (model.InvestmentProgram)

		// slice the ids on comma with no spaces
		ids := strings.Split( modelPortfoliosIds, ",")

		for _, modelPortfoliosId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var ModelPortfolioObj model.ModelPortfolio

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a ModelPortfolio
			// with a matching modelPortfoliosId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&ModelPortfolioObj , modelPortfoliosId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove ModelPortfolioObj from the ModelPortfolios array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&InvestmentProgramObj).Association("ModelPortfolios").Delete( &ModelPortfolioObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "ModelPortfolios", modelPortfoliosId )
				return utils.RequestResult{false, msg, "removeModelPortfolios", ModelPortfolioObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified InvestmentProgram from the gorm
		//----------------------------------------------------------------------------
		return GetInvestmentProgram(investmentProgramId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// adds one or more feeSchedulesIds as a FeeSchedules to a InvestmentProgram
//----------------------------------------------------------------------------
func AddFeeSchedulesToInvestmentProgram ( investmentProgramId uint64, feeSchedulesIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the InvestmentProgram with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetInvestmentProgram(investmentProgramId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.InvestmentProgram so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		InvestmentProgramObj,_ := parentRequestResult.Data. (model.InvestmentProgram)

		// slice the ids on comma with no spaces
		ids := strings.Split( feeSchedulesIds, ",")

		for _, feeSchedulesId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var FeeScheduleObj model.FeeSchedule

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a FeeSchedule
			// with a matching feeSchedulesId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&FeeScheduleObj , feeSchedulesId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the FeeSchedules using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&InvestmentProgramObj).Association("FeeSchedules").Append( &FeeScheduleObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "FeeSchedules", feeSchedulesId )
				return utils.RequestResult{false, msg, "unassignFeeSchedules", FeeScheduleObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified InvestmentProgram from the gorm
		//----------------------------------------------------------------------------
		return GetInvestmentProgram(investmentProgramId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more feeSchedulesIds as a FeeSchedules from a InvestmentProgram
//----------------------------------------------------------------------------
func RemoveFeeSchedulesFromInvestmentProgram( investmentProgramId uint64, feeSchedulesIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the InvestmentProgram with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetInvestmentProgram(investmentProgramId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.InvestmentProgram so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		InvestmentProgramObj,_ := parentRequestResult.Data. (model.InvestmentProgram)

		// slice the ids on comma with no spaces
		ids := strings.Split( feeSchedulesIds, ",")

		for _, feeSchedulesId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var FeeScheduleObj model.FeeSchedule

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a FeeSchedule
			// with a matching feeSchedulesId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&FeeScheduleObj , feeSchedulesId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove FeeScheduleObj from the FeeSchedules array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&InvestmentProgramObj).Association("FeeSchedules").Delete( &FeeScheduleObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "FeeSchedules", feeSchedulesId )
				return utils.RequestResult{false, msg, "removeFeeSchedules", FeeScheduleObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified InvestmentProgram from the gorm
		//----------------------------------------------------------------------------
		return GetInvestmentProgram(investmentProgramId)

	} else {
		return parentRequestResult
	}
}

