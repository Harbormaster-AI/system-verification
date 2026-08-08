package dao

import (
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing PerformanceReportDAO..." ) )
}

//----------------------------------------------------------------------------
// CreatePerformanceReport - creates a new db entry
//----------------------------------------------------------------------------
func CreatePerformanceReport(obj model.PerformanceReport)(utils.RequestResult){
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
	    createMsg = fmt.Sprintf( "Created a PerformanceReport with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a PerformanceReport", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreatePerformanceReport", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetPerformanceReport - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetPerformanceReport(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.PerformanceReport

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a PerformanceReport with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a PerformanceReport using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a PerformanceReport using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetPerformanceReport", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllPerformanceReport - returns all
//----------------------------------------------------------------------------
func GetAllPerformanceReport()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.PerformanceReport

	//----------------------------------------------------------------------------
	// Request the ORM to find all PerformanceReport
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all PerformanceReport" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all PerformanceReport", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllPerformanceReport", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdatePerformanceReport - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdatePerformanceReport(obj model.PerformanceReport)(requestResult utils.RequestResult){
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
	    updateMsg = fmt.Sprintf( "Updated a PerformanceReport using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a PerformanceReport using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdatePerformanceReport", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeletePerformanceReport - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeletePerformanceReport(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the PerformanceReport with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetPerformanceReport(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.PerformanceReport so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.PerformanceReport)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a PerformanceReport using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a PerformanceReport using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeletePerformanceReport", requestResult.Data}

	}

	return requestResult
}


//----------------------------------------------------------------------------
// assigns a Portfolio on a PerformanceReport
//----------------------------------------------------------------------------
func AssignPortfolioToPerformanceReport( performanceReportId uint64, portfolioId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the PerformanceReport with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetPerformanceReport(performanceReportId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.PerformanceReport so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		PerformanceReportObj,_ := parentRequestResult.Data. (model.PerformanceReport)

		//----------------------------------------------------------------------------
		// Pass the reference to the ORM to get
		//----------------------------------------------------------------------------
		var PortfolioObj model.Portfolio

		//----------------------------------------------------------------------------
		// Retrieve the 1st occurrence from the ORM of a Portfolio with a
		// matching portfolioId
		//----------------------------------------------------------------------------
		childRequestResult := utils.GetDB().First(&PortfolioObj, portfolioId).Error // find first using identifier

		if childRequestResult == nil {
			//----------------------------------------------------------------------------
			// assign the Portfolio	to the PerformanceReport
			//----------------------------------------------------------------------------
			PerformanceReportObj.Portfolio = &PortfolioObj

			//----------------------------------------------------------------------------
			// save the PerformanceReport
			//----------------------------------------------------------------------------
			return UpdatePerformanceReport(PerformanceReportObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Portfolio", portfolioId )
			return utils.RequestResult{false, msg, "assignPortfolio", PortfolioObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Portfolio on a PerformanceReport
//----------------------------------------------------------------------------
func UnassignPortfolioFromPerformanceReport(performanceReportId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the PerformanceReport with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetPerformanceReport(performanceReportId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.PerformanceReport so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		PerformanceReportObj,_ := parentRequestResult.Data. (model.PerformanceReport)

		//----------------------------------------------------------------------------
		// assign an empty Portfolio to the Portfolio
		//----------------------------------------------------------------------------
		PerformanceReportObj.Portfolio = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Portfolio
		//----------------------------------------------------------------------------
		PerformanceReportObj.PortfolioId = nil;

		//----------------------------------------------------------------------------
		// save the PerformanceReport
		//----------------------------------------------------------------------------
		return UpdatePerformanceReport(PerformanceReportObj)

	} else {
		return parentRequestResult
	}

}

//----------------------------------------------------------------------------
// assigns a Benchmark on a PerformanceReport
//----------------------------------------------------------------------------
func AssignBenchmarkToPerformanceReport( performanceReportId uint64, benchmarkId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the PerformanceReport with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetPerformanceReport(performanceReportId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.PerformanceReport so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		PerformanceReportObj,_ := parentRequestResult.Data. (model.PerformanceReport)

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
			// assign the Benchmark	to the PerformanceReport
			//----------------------------------------------------------------------------
			PerformanceReportObj.Benchmark = &BenchmarkObj

			//----------------------------------------------------------------------------
			// save the PerformanceReport
			//----------------------------------------------------------------------------
			return UpdatePerformanceReport(PerformanceReportObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Benchmark", benchmarkId )
			return utils.RequestResult{false, msg, "assignBenchmark", BenchmarkObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Benchmark on a PerformanceReport
//----------------------------------------------------------------------------
func UnassignBenchmarkFromPerformanceReport(performanceReportId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the PerformanceReport with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetPerformanceReport(performanceReportId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.PerformanceReport so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		PerformanceReportObj,_ := parentRequestResult.Data. (model.PerformanceReport)

		//----------------------------------------------------------------------------
		// assign an empty Benchmark to the Benchmark
		//----------------------------------------------------------------------------
		PerformanceReportObj.Benchmark = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Benchmark
		//----------------------------------------------------------------------------
		PerformanceReportObj.BenchmarkId = nil;

		//----------------------------------------------------------------------------
		// save the PerformanceReport
		//----------------------------------------------------------------------------
		return UpdatePerformanceReport(PerformanceReportObj)

	} else {
		return parentRequestResult
	}

}


