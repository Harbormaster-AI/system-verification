package dao

import (
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing MarketPriceDAO..." ) )
}

//----------------------------------------------------------------------------
// CreateMarketPrice - creates a new db entry
//----------------------------------------------------------------------------
func CreateMarketPrice(obj model.MarketPrice)(utils.RequestResult){
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
	    createMsg = fmt.Sprintf( "Created a MarketPrice with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a MarketPrice", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreateMarketPrice", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetMarketPrice - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetMarketPrice(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.MarketPrice

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a MarketPrice with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a MarketPrice using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a MarketPrice using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetMarketPrice", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllMarketPrice - returns all
//----------------------------------------------------------------------------
func GetAllMarketPrice()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.MarketPrice

	//----------------------------------------------------------------------------
	// Request the ORM to find all MarketPrice
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all MarketPrice" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all MarketPrice", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllMarketPrice", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdateMarketPrice - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdateMarketPrice(obj model.MarketPrice)(requestResult utils.RequestResult){
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
	    updateMsg = fmt.Sprintf( "Updated a MarketPrice using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a MarketPrice using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdateMarketPrice", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeleteMarketPrice - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeleteMarketPrice(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the MarketPrice with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetMarketPrice(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.MarketPrice so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.MarketPrice)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a MarketPrice using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a MarketPrice using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeleteMarketPrice", requestResult.Data}

	}

	return requestResult
}


//----------------------------------------------------------------------------
// assigns a Security on a MarketPrice
//----------------------------------------------------------------------------
func AssignSecurityToMarketPrice( marketPriceId uint64, securityId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the MarketPrice with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetMarketPrice(marketPriceId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.MarketPrice so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		MarketPriceObj,_ := parentRequestResult.Data. (model.MarketPrice)

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
			// assign the Security	to the MarketPrice
			//----------------------------------------------------------------------------
			MarketPriceObj.Security = &SecurityObj

			//----------------------------------------------------------------------------
			// save the MarketPrice
			//----------------------------------------------------------------------------
			return UpdateMarketPrice(MarketPriceObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Security", securityId )
			return utils.RequestResult{false, msg, "assignSecurity", SecurityObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Security on a MarketPrice
//----------------------------------------------------------------------------
func UnassignSecurityFromMarketPrice(marketPriceId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the MarketPrice with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetMarketPrice(marketPriceId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.MarketPrice so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		MarketPriceObj,_ := parentRequestResult.Data. (model.MarketPrice)

		//----------------------------------------------------------------------------
		// assign an empty Security to the Security
		//----------------------------------------------------------------------------
		MarketPriceObj.Security = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Security
		//----------------------------------------------------------------------------
		MarketPriceObj.SecurityId = nil;

		//----------------------------------------------------------------------------
		// save the MarketPrice
		//----------------------------------------------------------------------------
		return UpdateMarketPrice(MarketPriceObj)

	} else {
		return parentRequestResult
	}

}


