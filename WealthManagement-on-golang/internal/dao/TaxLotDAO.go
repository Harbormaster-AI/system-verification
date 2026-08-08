package dao

import (
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing TaxLotDAO..." ) )
}

//----------------------------------------------------------------------------
// CreateTaxLot - creates a new db entry
//----------------------------------------------------------------------------
func CreateTaxLot(obj model.TaxLot)(utils.RequestResult){
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
	    createMsg = fmt.Sprintf( "Created a TaxLot with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a TaxLot", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreateTaxLot", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetTaxLot - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetTaxLot(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.TaxLot

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a TaxLot with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a TaxLot using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a TaxLot using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetTaxLot", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllTaxLot - returns all
//----------------------------------------------------------------------------
func GetAllTaxLot()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.TaxLot

	//----------------------------------------------------------------------------
	// Request the ORM to find all TaxLot
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all TaxLot" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all TaxLot", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllTaxLot", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdateTaxLot - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdateTaxLot(obj model.TaxLot)(requestResult utils.RequestResult){
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
	    updateMsg = fmt.Sprintf( "Updated a TaxLot using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a TaxLot using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdateTaxLot", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeleteTaxLot - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeleteTaxLot(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the TaxLot with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetTaxLot(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.TaxLot so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.TaxLot)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a TaxLot using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a TaxLot using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeleteTaxLot", requestResult.Data}

	}

	return requestResult
}


//----------------------------------------------------------------------------
// assigns a Position on a TaxLot
//----------------------------------------------------------------------------
func AssignPositionToTaxLot( taxLotId uint64, positionId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the TaxLot with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetTaxLot(taxLotId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.TaxLot so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		TaxLotObj,_ := parentRequestResult.Data. (model.TaxLot)

		//----------------------------------------------------------------------------
		// Pass the reference to the ORM to get
		//----------------------------------------------------------------------------
		var PositionObj model.Position

		//----------------------------------------------------------------------------
		// Retrieve the 1st occurrence from the ORM of a Position with a
		// matching positionId
		//----------------------------------------------------------------------------
		childRequestResult := utils.GetDB().First(&PositionObj, positionId).Error // find first using identifier

		if childRequestResult == nil {
			//----------------------------------------------------------------------------
			// assign the Position	to the TaxLot
			//----------------------------------------------------------------------------
			TaxLotObj.Position = &PositionObj

			//----------------------------------------------------------------------------
			// save the TaxLot
			//----------------------------------------------------------------------------
			return UpdateTaxLot(TaxLotObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Position", positionId )
			return utils.RequestResult{false, msg, "assignPosition", PositionObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Position on a TaxLot
//----------------------------------------------------------------------------
func UnassignPositionFromTaxLot(taxLotId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the TaxLot with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetTaxLot(taxLotId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.TaxLot so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		TaxLotObj,_ := parentRequestResult.Data. (model.TaxLot)

		//----------------------------------------------------------------------------
		// assign an empty Position to the Position
		//----------------------------------------------------------------------------
		TaxLotObj.Position = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Position
		//----------------------------------------------------------------------------
		TaxLotObj.PositionId = nil;

		//----------------------------------------------------------------------------
		// save the TaxLot
		//----------------------------------------------------------------------------
		return UpdateTaxLot(TaxLotObj)

	} else {
		return parentRequestResult
	}

}


