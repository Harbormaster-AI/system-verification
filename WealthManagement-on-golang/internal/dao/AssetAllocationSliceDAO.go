package dao

import (
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing AssetAllocationSliceDAO..." ) )
}

//----------------------------------------------------------------------------
// CreateAssetAllocationSlice - creates a new db entry
//----------------------------------------------------------------------------
func CreateAssetAllocationSlice(obj model.AssetAllocationSlice)(utils.RequestResult){
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
	    createMsg = fmt.Sprintf( "Created a AssetAllocationSlice with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a AssetAllocationSlice", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreateAssetAllocationSlice", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetAssetAllocationSlice - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetAssetAllocationSlice(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.AssetAllocationSlice

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a AssetAllocationSlice with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a AssetAllocationSlice using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a AssetAllocationSlice using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetAssetAllocationSlice", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllAssetAllocationSlice - returns all
//----------------------------------------------------------------------------
func GetAllAssetAllocationSlice()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.AssetAllocationSlice

	//----------------------------------------------------------------------------
	// Request the ORM to find all AssetAllocationSlice
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all AssetAllocationSlice" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all AssetAllocationSlice", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllAssetAllocationSlice", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdateAssetAllocationSlice - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdateAssetAllocationSlice(obj model.AssetAllocationSlice)(requestResult utils.RequestResult){
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
	    updateMsg = fmt.Sprintf( "Updated a AssetAllocationSlice using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a AssetAllocationSlice using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdateAssetAllocationSlice", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeleteAssetAllocationSlice - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeleteAssetAllocationSlice(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the AssetAllocationSlice with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetAssetAllocationSlice(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.AssetAllocationSlice so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.AssetAllocationSlice)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a AssetAllocationSlice using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a AssetAllocationSlice using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeleteAssetAllocationSlice", requestResult.Data}

	}

	return requestResult
}


//----------------------------------------------------------------------------
// assigns a ModelPortfolio on a AssetAllocationSlice
//----------------------------------------------------------------------------
func AssignModelPortfolioToAssetAllocationSlice( assetAllocationSliceId uint64, modelPortfolioId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the AssetAllocationSlice with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetAssetAllocationSlice(assetAllocationSliceId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.AssetAllocationSlice so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		AssetAllocationSliceObj,_ := parentRequestResult.Data. (model.AssetAllocationSlice)

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
			// assign the ModelPortfolio	to the AssetAllocationSlice
			//----------------------------------------------------------------------------
			AssetAllocationSliceObj.ModelPortfolio = &ModelPortfolioObj

			//----------------------------------------------------------------------------
			// save the AssetAllocationSlice
			//----------------------------------------------------------------------------
			return UpdateAssetAllocationSlice(AssetAllocationSliceObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "ModelPortfolio", modelPortfolioId )
			return utils.RequestResult{false, msg, "assignModelPortfolio", ModelPortfolioObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a ModelPortfolio on a AssetAllocationSlice
//----------------------------------------------------------------------------
func UnassignModelPortfolioFromAssetAllocationSlice(assetAllocationSliceId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the AssetAllocationSlice with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetAssetAllocationSlice(assetAllocationSliceId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.AssetAllocationSlice so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		AssetAllocationSliceObj,_ := parentRequestResult.Data. (model.AssetAllocationSlice)

		//----------------------------------------------------------------------------
		// assign an empty ModelPortfolio to the ModelPortfolio
		//----------------------------------------------------------------------------
		AssetAllocationSliceObj.ModelPortfolio = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the ModelPortfolio
		//----------------------------------------------------------------------------
		AssetAllocationSliceObj.ModelPortfolioId = nil;

		//----------------------------------------------------------------------------
		// save the AssetAllocationSlice
		//----------------------------------------------------------------------------
		return UpdateAssetAllocationSlice(AssetAllocationSliceObj)

	} else {
		return parentRequestResult
	}

}


