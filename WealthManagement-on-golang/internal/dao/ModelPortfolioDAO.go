package dao

import (
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing ModelPortfolioDAO..." ) )
}

//----------------------------------------------------------------------------
// CreateModelPortfolio - creates a new db entry
//----------------------------------------------------------------------------
func CreateModelPortfolio(obj model.ModelPortfolio)(utils.RequestResult){
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
	    createMsg = fmt.Sprintf( "Created a ModelPortfolio with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a ModelPortfolio", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreateModelPortfolio", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetModelPortfolio - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetModelPortfolio(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.ModelPortfolio

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a ModelPortfolio with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a ModelPortfolio using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a ModelPortfolio using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetModelPortfolio", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllModelPortfolio - returns all
//----------------------------------------------------------------------------
func GetAllModelPortfolio()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.ModelPortfolio

	//----------------------------------------------------------------------------
	// Request the ORM to find all ModelPortfolio
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all ModelPortfolio" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all ModelPortfolio", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllModelPortfolio", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdateModelPortfolio - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdateModelPortfolio(obj model.ModelPortfolio)(requestResult utils.RequestResult){
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
	    updateMsg = fmt.Sprintf( "Updated a ModelPortfolio using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a ModelPortfolio using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdateModelPortfolio", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeleteModelPortfolio - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeleteModelPortfolio(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the ModelPortfolio with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetModelPortfolio(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.ModelPortfolio so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.ModelPortfolio)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a ModelPortfolio using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a ModelPortfolio using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeleteModelPortfolio", requestResult.Data}

	}

	return requestResult
}



//----------------------------------------------------------------------------
// adds one or more allocationsIds as a Allocations to a ModelPortfolio
//----------------------------------------------------------------------------
func AddAllocationsToModelPortfolio ( modelPortfolioId uint64, allocationsIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the ModelPortfolio with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetModelPortfolio(modelPortfolioId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.ModelPortfolio so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		ModelPortfolioObj,_ := parentRequestResult.Data. (model.ModelPortfolio)

		// slice the ids on comma with no spaces
		ids := strings.Split( allocationsIds, ",")

		for _, allocationsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var AssetAllocationSliceObj model.AssetAllocationSlice

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a AssetAllocationSlice
			// with a matching allocationsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&AssetAllocationSliceObj , allocationsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the Allocations using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&ModelPortfolioObj).Association("Allocations").Append( &AssetAllocationSliceObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Allocations", allocationsId )
				return utils.RequestResult{false, msg, "unassignAllocations", AssetAllocationSliceObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified ModelPortfolio from the gorm
		//----------------------------------------------------------------------------
		return GetModelPortfolio(modelPortfolioId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more allocationsIds as a Allocations from a ModelPortfolio
//----------------------------------------------------------------------------
func RemoveAllocationsFromModelPortfolio( modelPortfolioId uint64, allocationsIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the ModelPortfolio with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetModelPortfolio(modelPortfolioId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.ModelPortfolio so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		ModelPortfolioObj,_ := parentRequestResult.Data. (model.ModelPortfolio)

		// slice the ids on comma with no spaces
		ids := strings.Split( allocationsIds, ",")

		for _, allocationsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var AssetAllocationSliceObj model.AssetAllocationSlice

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a AssetAllocationSlice
			// with a matching allocationsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&AssetAllocationSliceObj , allocationsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove AssetAllocationSliceObj from the Allocations array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&ModelPortfolioObj).Association("Allocations").Delete( &AssetAllocationSliceObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Allocations", allocationsId )
				return utils.RequestResult{false, msg, "removeAllocations", AssetAllocationSliceObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified ModelPortfolio from the gorm
		//----------------------------------------------------------------------------
		return GetModelPortfolio(modelPortfolioId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// adds one or more portfoliosIds as a Portfolios to a ModelPortfolio
//----------------------------------------------------------------------------
func AddPortfoliosToModelPortfolio ( modelPortfolioId uint64, portfoliosIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the ModelPortfolio with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetModelPortfolio(modelPortfolioId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.ModelPortfolio so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		ModelPortfolioObj,_ := parentRequestResult.Data. (model.ModelPortfolio)

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
				utils.GetDB().Model(&ModelPortfolioObj).Association("Portfolios").Append( &PortfolioObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Portfolios", portfoliosId )
				return utils.RequestResult{false, msg, "unassignPortfolios", PortfolioObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified ModelPortfolio from the gorm
		//----------------------------------------------------------------------------
		return GetModelPortfolio(modelPortfolioId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more portfoliosIds as a Portfolios from a ModelPortfolio
//----------------------------------------------------------------------------
func RemovePortfoliosFromModelPortfolio( modelPortfolioId uint64, portfoliosIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the ModelPortfolio with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetModelPortfolio(modelPortfolioId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.ModelPortfolio so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		ModelPortfolioObj,_ := parentRequestResult.Data. (model.ModelPortfolio)

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
				utils.GetDB().Model(&ModelPortfolioObj).Association("Portfolios").Delete( &PortfolioObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Portfolios", portfoliosId )
				return utils.RequestResult{false, msg, "removePortfolios", PortfolioObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified ModelPortfolio from the gorm
		//----------------------------------------------------------------------------
		return GetModelPortfolio(modelPortfolioId)

	} else {
		return parentRequestResult
	}
}

