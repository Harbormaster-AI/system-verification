package dao

import (
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing SecurityDAO..." ) )
}

//----------------------------------------------------------------------------
// CreateSecurity - creates a new db entry
//----------------------------------------------------------------------------
func CreateSecurity(obj model.Security)(utils.RequestResult){
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
	    createMsg = fmt.Sprintf( "Created a Security with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a Security", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreateSecurity", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetSecurity - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetSecurity(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.Security

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a Security with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a Security using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a Security using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetSecurity", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllSecurity - returns all
//----------------------------------------------------------------------------
func GetAllSecurity()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.Security

	//----------------------------------------------------------------------------
	// Request the ORM to find all Security
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all Security" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all Security", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllSecurity", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdateSecurity - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdateSecurity(obj model.Security)(requestResult utils.RequestResult){
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
	    updateMsg = fmt.Sprintf( "Updated a Security using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a Security using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdateSecurity", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeleteSecurity - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeleteSecurity(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the Security with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetSecurity(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Security so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.Security)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a Security using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a Security using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeleteSecurity", requestResult.Data}

	}

	return requestResult
}



//----------------------------------------------------------------------------
// adds one or more corporateActionsIds as a CorporateActions to a Security
//----------------------------------------------------------------------------
func AddCorporateActionsToSecurity ( securityId uint64, corporateActionsIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Security with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetSecurity(securityId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Security so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		SecurityObj,_ := parentRequestResult.Data. (model.Security)

		// slice the ids on comma with no spaces
		ids := strings.Split( corporateActionsIds, ",")

		for _, corporateActionsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var CorporateActionObj model.CorporateAction

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a CorporateAction
			// with a matching corporateActionsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&CorporateActionObj , corporateActionsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the CorporateActions using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&SecurityObj).Association("CorporateActions").Append( &CorporateActionObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "CorporateActions", corporateActionsId )
				return utils.RequestResult{false, msg, "unassignCorporateActions", CorporateActionObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Security from the gorm
		//----------------------------------------------------------------------------
		return GetSecurity(securityId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more corporateActionsIds as a CorporateActions from a Security
//----------------------------------------------------------------------------
func RemoveCorporateActionsFromSecurity( securityId uint64, corporateActionsIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the Security with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetSecurity(securityId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Security so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		SecurityObj,_ := parentRequestResult.Data. (model.Security)

		// slice the ids on comma with no spaces
		ids := strings.Split( corporateActionsIds, ",")

		for _, corporateActionsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var CorporateActionObj model.CorporateAction

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a CorporateAction
			// with a matching corporateActionsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&CorporateActionObj , corporateActionsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove CorporateActionObj from the CorporateActions array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&SecurityObj).Association("CorporateActions").Delete( &CorporateActionObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "CorporateActions", corporateActionsId )
				return utils.RequestResult{false, msg, "removeCorporateActions", CorporateActionObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Security from the gorm
		//----------------------------------------------------------------------------
		return GetSecurity(securityId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// adds one or more pricesIds as a Prices to a Security
//----------------------------------------------------------------------------
func AddPricesToSecurity ( securityId uint64, pricesIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Security with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetSecurity(securityId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Security so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		SecurityObj,_ := parentRequestResult.Data. (model.Security)

		// slice the ids on comma with no spaces
		ids := strings.Split( pricesIds, ",")

		for _, pricesId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var MarketPriceObj model.MarketPrice

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a MarketPrice
			// with a matching pricesId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&MarketPriceObj , pricesId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the Prices using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&SecurityObj).Association("Prices").Append( &MarketPriceObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Prices", pricesId )
				return utils.RequestResult{false, msg, "unassignPrices", MarketPriceObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Security from the gorm
		//----------------------------------------------------------------------------
		return GetSecurity(securityId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more pricesIds as a Prices from a Security
//----------------------------------------------------------------------------
func RemovePricesFromSecurity( securityId uint64, pricesIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the Security with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetSecurity(securityId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Security so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		SecurityObj,_ := parentRequestResult.Data. (model.Security)

		// slice the ids on comma with no spaces
		ids := strings.Split( pricesIds, ",")

		for _, pricesId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var MarketPriceObj model.MarketPrice

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a MarketPrice
			// with a matching pricesId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&MarketPriceObj , pricesId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove MarketPriceObj from the Prices array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&SecurityObj).Association("Prices").Delete( &MarketPriceObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Prices", pricesId )
				return utils.RequestResult{false, msg, "removePrices", MarketPriceObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Security from the gorm
		//----------------------------------------------------------------------------
		return GetSecurity(securityId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// adds one or more benchmarksIds as a Benchmarks to a Security
//----------------------------------------------------------------------------
func AddBenchmarksToSecurity ( securityId uint64, benchmarksIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Security with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetSecurity(securityId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Security so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		SecurityObj,_ := parentRequestResult.Data. (model.Security)

		// slice the ids on comma with no spaces
		ids := strings.Split( benchmarksIds, ",")

		for _, benchmarksId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var BenchmarkObj model.Benchmark

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a Benchmark
			// with a matching benchmarksId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&BenchmarkObj , benchmarksId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the Benchmarks using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&SecurityObj).Association("Benchmarks").Append( &BenchmarkObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Benchmarks", benchmarksId )
				return utils.RequestResult{false, msg, "unassignBenchmarks", BenchmarkObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Security from the gorm
		//----------------------------------------------------------------------------
		return GetSecurity(securityId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more benchmarksIds as a Benchmarks from a Security
//----------------------------------------------------------------------------
func RemoveBenchmarksFromSecurity( securityId uint64, benchmarksIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the Security with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetSecurity(securityId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Security so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		SecurityObj,_ := parentRequestResult.Data. (model.Security)

		// slice the ids on comma with no spaces
		ids := strings.Split( benchmarksIds, ",")

		for _, benchmarksId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var BenchmarkObj model.Benchmark

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a Benchmark
			// with a matching benchmarksId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&BenchmarkObj , benchmarksId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove BenchmarkObj from the Benchmarks array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&SecurityObj).Association("Benchmarks").Delete( &BenchmarkObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Benchmarks", benchmarksId )
				return utils.RequestResult{false, msg, "removeBenchmarks", BenchmarkObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Security from the gorm
		//----------------------------------------------------------------------------
		return GetSecurity(securityId)

	} else {
		return parentRequestResult
	}
}

