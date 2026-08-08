package dao

import (
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing PortfolioDAO..." ) )
}

//----------------------------------------------------------------------------
// CreatePortfolio - creates a new db entry
//----------------------------------------------------------------------------
func CreatePortfolio(obj model.Portfolio)(utils.RequestResult){
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
	    createMsg = fmt.Sprintf( "Created a Portfolio with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a Portfolio", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreatePortfolio", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetPortfolio - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetPortfolio(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.Portfolio

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a Portfolio with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a Portfolio using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a Portfolio using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetPortfolio", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllPortfolio - returns all
//----------------------------------------------------------------------------
func GetAllPortfolio()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.Portfolio

	//----------------------------------------------------------------------------
	// Request the ORM to find all Portfolio
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all Portfolio" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all Portfolio", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllPortfolio", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdatePortfolio - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdatePortfolio(obj model.Portfolio)(requestResult utils.RequestResult){
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
	    updateMsg = fmt.Sprintf( "Updated a Portfolio using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a Portfolio using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdatePortfolio", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeletePortfolio - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeletePortfolio(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the Portfolio with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetPortfolio(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Portfolio so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.Portfolio)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a Portfolio using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a Portfolio using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeletePortfolio", requestResult.Data}

	}

	return requestResult
}


//----------------------------------------------------------------------------
// assigns a Account on a Portfolio
//----------------------------------------------------------------------------
func AssignAccountToPortfolio( portfolioId uint64, accountId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the Portfolio with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetPortfolio(portfolioId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Portfolio so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		PortfolioObj,_ := parentRequestResult.Data. (model.Portfolio)

		//----------------------------------------------------------------------------
		// Pass the reference to the ORM to get
		//----------------------------------------------------------------------------
		var AccountObj model.Account

		//----------------------------------------------------------------------------
		// Retrieve the 1st occurrence from the ORM of a Account with a
		// matching accountId
		//----------------------------------------------------------------------------
		childRequestResult := utils.GetDB().First(&AccountObj, accountId).Error // find first using identifier

		if childRequestResult == nil {
			//----------------------------------------------------------------------------
			// assign the Account	to the Portfolio
			//----------------------------------------------------------------------------
			PortfolioObj.Account = &AccountObj

			//----------------------------------------------------------------------------
			// save the Portfolio
			//----------------------------------------------------------------------------
			return UpdatePortfolio(PortfolioObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Account", accountId )
			return utils.RequestResult{false, msg, "assignAccount", AccountObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Account on a Portfolio
//----------------------------------------------------------------------------
func UnassignAccountFromPortfolio(portfolioId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Portfolio with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetPortfolio(portfolioId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Portfolio so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		PortfolioObj,_ := parentRequestResult.Data. (model.Portfolio)

		//----------------------------------------------------------------------------
		// assign an empty Account to the Account
		//----------------------------------------------------------------------------
		PortfolioObj.Account = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Account
		//----------------------------------------------------------------------------
		PortfolioObj.AccountId = nil;

		//----------------------------------------------------------------------------
		// save the Portfolio
		//----------------------------------------------------------------------------
		return UpdatePortfolio(PortfolioObj)

	} else {
		return parentRequestResult
	}

}

//----------------------------------------------------------------------------
// assigns a ModelPortfolio on a Portfolio
//----------------------------------------------------------------------------
func AssignModelPortfolioToPortfolio( portfolioId uint64, modelPortfolioId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the Portfolio with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetPortfolio(portfolioId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Portfolio so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		PortfolioObj,_ := parentRequestResult.Data. (model.Portfolio)

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
			// assign the ModelPortfolio	to the Portfolio
			//----------------------------------------------------------------------------
			PortfolioObj.ModelPortfolio = &ModelPortfolioObj

			//----------------------------------------------------------------------------
			// save the Portfolio
			//----------------------------------------------------------------------------
			return UpdatePortfolio(PortfolioObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "ModelPortfolio", modelPortfolioId )
			return utils.RequestResult{false, msg, "assignModelPortfolio", ModelPortfolioObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a ModelPortfolio on a Portfolio
//----------------------------------------------------------------------------
func UnassignModelPortfolioFromPortfolio(portfolioId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Portfolio with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetPortfolio(portfolioId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Portfolio so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		PortfolioObj,_ := parentRequestResult.Data. (model.Portfolio)

		//----------------------------------------------------------------------------
		// assign an empty ModelPortfolio to the ModelPortfolio
		//----------------------------------------------------------------------------
		PortfolioObj.ModelPortfolio = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the ModelPortfolio
		//----------------------------------------------------------------------------
		PortfolioObj.ModelPortfolioId = nil;

		//----------------------------------------------------------------------------
		// save the Portfolio
		//----------------------------------------------------------------------------
		return UpdatePortfolio(PortfolioObj)

	} else {
		return parentRequestResult
	}

}

//----------------------------------------------------------------------------
// assigns a Benchmark on a Portfolio
//----------------------------------------------------------------------------
func AssignBenchmarkToPortfolio( portfolioId uint64, benchmarkId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the Portfolio with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetPortfolio(portfolioId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Portfolio so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		PortfolioObj,_ := parentRequestResult.Data. (model.Portfolio)

		//----------------------------------------------------------------------------
		// Pass the reference to the ORM to get
		//----------------------------------------------------------------------------
		var BenchmarkObj model.Benchmark

		//----------------------------------------------------------------------------
		// Retrieve the 1st occurrence from the ORM of a Benchmark with a
		// matching benchmarkId
		//----------------------------------------------------------------------------
		childRequestResult := utils.GetDB().First(&BenchmarkObj, benchmarkId).Error // find first using identifier

		if childRequestResult == nil {
			//----------------------------------------------------------------------------
			// assign the Benchmark	to the Portfolio
			//----------------------------------------------------------------------------
			PortfolioObj.Benchmark = &BenchmarkObj

			//----------------------------------------------------------------------------
			// save the Portfolio
			//----------------------------------------------------------------------------
			return UpdatePortfolio(PortfolioObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Benchmark", benchmarkId )
			return utils.RequestResult{false, msg, "assignBenchmark", BenchmarkObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Benchmark on a Portfolio
//----------------------------------------------------------------------------
func UnassignBenchmarkFromPortfolio(portfolioId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Portfolio with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetPortfolio(portfolioId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Portfolio so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		PortfolioObj,_ := parentRequestResult.Data. (model.Portfolio)

		//----------------------------------------------------------------------------
		// assign an empty Benchmark to the Benchmark
		//----------------------------------------------------------------------------
		PortfolioObj.Benchmark = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Benchmark
		//----------------------------------------------------------------------------
		PortfolioObj.BenchmarkId = nil;

		//----------------------------------------------------------------------------
		// save the Portfolio
		//----------------------------------------------------------------------------
		return UpdatePortfolio(PortfolioObj)

	} else {
		return parentRequestResult
	}

}

//----------------------------------------------------------------------------
// assigns a InvestmentPolicy on a Portfolio
//----------------------------------------------------------------------------
func AssignInvestmentPolicyToPortfolio( portfolioId uint64, investmentPolicyId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the Portfolio with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetPortfolio(portfolioId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Portfolio so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		PortfolioObj,_ := parentRequestResult.Data. (model.Portfolio)

		//----------------------------------------------------------------------------
		// Pass the reference to the ORM to get
		//----------------------------------------------------------------------------
		var InvestmentPolicyObj model.InvestmentPolicy

		//----------------------------------------------------------------------------
		// Retrieve the 1st occurrence from the ORM of a InvestmentPolicy with a
		// matching investmentPolicyId
		//----------------------------------------------------------------------------
		childRequestResult := utils.GetDB().First(&InvestmentPolicyObj, investmentPolicyId).Error // find first using identifier

		if childRequestResult == nil {
			//----------------------------------------------------------------------------
			// assign the InvestmentPolicy	to the Portfolio
			//----------------------------------------------------------------------------
			PortfolioObj.InvestmentPolicy = &InvestmentPolicyObj

			//----------------------------------------------------------------------------
			// save the Portfolio
			//----------------------------------------------------------------------------
			return UpdatePortfolio(PortfolioObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "InvestmentPolicy", investmentPolicyId )
			return utils.RequestResult{false, msg, "assignInvestmentPolicy", InvestmentPolicyObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a InvestmentPolicy on a Portfolio
//----------------------------------------------------------------------------
func UnassignInvestmentPolicyFromPortfolio(portfolioId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Portfolio with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetPortfolio(portfolioId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Portfolio so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		PortfolioObj,_ := parentRequestResult.Data. (model.Portfolio)

		//----------------------------------------------------------------------------
		// assign an empty InvestmentPolicy to the InvestmentPolicy
		//----------------------------------------------------------------------------
		PortfolioObj.InvestmentPolicy = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the InvestmentPolicy
		//----------------------------------------------------------------------------
		PortfolioObj.InvestmentPolicyId = nil;

		//----------------------------------------------------------------------------
		// save the Portfolio
		//----------------------------------------------------------------------------
		return UpdatePortfolio(PortfolioObj)

	} else {
		return parentRequestResult
	}

}


//----------------------------------------------------------------------------
// adds one or more positionsIds as a Positions to a Portfolio
//----------------------------------------------------------------------------
func AddPositionsToPortfolio ( portfolioId uint64, positionsIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Portfolio with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetPortfolio(portfolioId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Portfolio so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		PortfolioObj,_ := parentRequestResult.Data. (model.Portfolio)

		// slice the ids on comma with no spaces
		ids := strings.Split( positionsIds, ",")

		for _, positionsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var PositionObj model.Position

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a Position
			// with a matching positionsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&PositionObj , positionsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the Positions using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&PortfolioObj).Association("Positions").Append( &PositionObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Positions", positionsId )
				return utils.RequestResult{false, msg, "unassignPositions", PositionObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Portfolio from the gorm
		//----------------------------------------------------------------------------
		return GetPortfolio(portfolioId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more positionsIds as a Positions from a Portfolio
//----------------------------------------------------------------------------
func RemovePositionsFromPortfolio( portfolioId uint64, positionsIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the Portfolio with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetPortfolio(portfolioId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Portfolio so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		PortfolioObj,_ := parentRequestResult.Data. (model.Portfolio)

		// slice the ids on comma with no spaces
		ids := strings.Split( positionsIds, ",")

		for _, positionsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var PositionObj model.Position

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a Position
			// with a matching positionsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&PositionObj , positionsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove PositionObj from the Positions array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&PortfolioObj).Association("Positions").Delete( &PositionObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Positions", positionsId )
				return utils.RequestResult{false, msg, "removePositions", PositionObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Portfolio from the gorm
		//----------------------------------------------------------------------------
		return GetPortfolio(portfolioId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// adds one or more performanceReportsIds as a PerformanceReports to a Portfolio
//----------------------------------------------------------------------------
func AddPerformanceReportsToPortfolio ( portfolioId uint64, performanceReportsIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Portfolio with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetPortfolio(portfolioId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Portfolio so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		PortfolioObj,_ := parentRequestResult.Data. (model.Portfolio)

		// slice the ids on comma with no spaces
		ids := strings.Split( performanceReportsIds, ",")

		for _, performanceReportsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var PerformanceReportObj model.PerformanceReport

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a PerformanceReport
			// with a matching performanceReportsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&PerformanceReportObj , performanceReportsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the PerformanceReports using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&PortfolioObj).Association("PerformanceReports").Append( &PerformanceReportObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "PerformanceReports", performanceReportsId )
				return utils.RequestResult{false, msg, "unassignPerformanceReports", PerformanceReportObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Portfolio from the gorm
		//----------------------------------------------------------------------------
		return GetPortfolio(portfolioId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more performanceReportsIds as a PerformanceReports from a Portfolio
//----------------------------------------------------------------------------
func RemovePerformanceReportsFromPortfolio( portfolioId uint64, performanceReportsIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the Portfolio with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetPortfolio(portfolioId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Portfolio so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		PortfolioObj,_ := parentRequestResult.Data. (model.Portfolio)

		// slice the ids on comma with no spaces
		ids := strings.Split( performanceReportsIds, ",")

		for _, performanceReportsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var PerformanceReportObj model.PerformanceReport

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a PerformanceReport
			// with a matching performanceReportsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&PerformanceReportObj , performanceReportsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove PerformanceReportObj from the PerformanceReports array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&PortfolioObj).Association("PerformanceReports").Delete( &PerformanceReportObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "PerformanceReports", performanceReportsId )
				return utils.RequestResult{false, msg, "removePerformanceReports", PerformanceReportObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Portfolio from the gorm
		//----------------------------------------------------------------------------
		return GetPortfolio(portfolioId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// adds one or more rebalancePlansIds as a RebalancePlans to a Portfolio
//----------------------------------------------------------------------------
func AddRebalancePlansToPortfolio ( portfolioId uint64, rebalancePlansIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Portfolio with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetPortfolio(portfolioId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Portfolio so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		PortfolioObj,_ := parentRequestResult.Data. (model.Portfolio)

		// slice the ids on comma with no spaces
		ids := strings.Split( rebalancePlansIds, ",")

		for _, rebalancePlansId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var RebalancePlanObj model.RebalancePlan

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a RebalancePlan
			// with a matching rebalancePlansId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&RebalancePlanObj , rebalancePlansId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the RebalancePlans using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&PortfolioObj).Association("RebalancePlans").Append( &RebalancePlanObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "RebalancePlans", rebalancePlansId )
				return utils.RequestResult{false, msg, "unassignRebalancePlans", RebalancePlanObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Portfolio from the gorm
		//----------------------------------------------------------------------------
		return GetPortfolio(portfolioId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more rebalancePlansIds as a RebalancePlans from a Portfolio
//----------------------------------------------------------------------------
func RemoveRebalancePlansFromPortfolio( portfolioId uint64, rebalancePlansIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the Portfolio with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetPortfolio(portfolioId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Portfolio so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		PortfolioObj,_ := parentRequestResult.Data. (model.Portfolio)

		// slice the ids on comma with no spaces
		ids := strings.Split( rebalancePlansIds, ",")

		for _, rebalancePlansId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var RebalancePlanObj model.RebalancePlan

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a RebalancePlan
			// with a matching rebalancePlansId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&RebalancePlanObj , rebalancePlansId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove RebalancePlanObj from the RebalancePlans array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&PortfolioObj).Association("RebalancePlans").Delete( &RebalancePlanObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "RebalancePlans", rebalancePlansId )
				return utils.RequestResult{false, msg, "removeRebalancePlans", RebalancePlanObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Portfolio from the gorm
		//----------------------------------------------------------------------------
		return GetPortfolio(portfolioId)

	} else {
		return parentRequestResult
	}
}

