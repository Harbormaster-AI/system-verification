package dao

import (
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing BenchmarkDAO..." ) )
}

//----------------------------------------------------------------------------
// CreateBenchmark - creates a new db entry
//----------------------------------------------------------------------------
func CreateBenchmark(obj model.Benchmark)(utils.RequestResult){
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
	    createMsg = fmt.Sprintf( "Created a Benchmark with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a Benchmark", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreateBenchmark", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetBenchmark - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetBenchmark(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.Benchmark

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a Benchmark with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a Benchmark using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a Benchmark using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetBenchmark", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllBenchmark - returns all
//----------------------------------------------------------------------------
func GetAllBenchmark()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.Benchmark

	//----------------------------------------------------------------------------
	// Request the ORM to find all Benchmark
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all Benchmark" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all Benchmark", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllBenchmark", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdateBenchmark - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdateBenchmark(obj model.Benchmark)(requestResult utils.RequestResult){
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
	    updateMsg = fmt.Sprintf( "Updated a Benchmark using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a Benchmark using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdateBenchmark", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeleteBenchmark - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeleteBenchmark(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the Benchmark with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetBenchmark(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Benchmark so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.Benchmark)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a Benchmark using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a Benchmark using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeleteBenchmark", requestResult.Data}

	}

	return requestResult
}



//----------------------------------------------------------------------------
// adds one or more performanceReportsIds as a PerformanceReports to a Benchmark
//----------------------------------------------------------------------------
func AddPerformanceReportsToBenchmark ( benchmarkId uint64, performanceReportsIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Benchmark with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetBenchmark(benchmarkId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Benchmark so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		BenchmarkObj,_ := parentRequestResult.Data. (model.Benchmark)

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
				utils.GetDB().Model(&BenchmarkObj).Association("PerformanceReports").Append( &PerformanceReportObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "PerformanceReports", performanceReportsId )
				return utils.RequestResult{false, msg, "unassignPerformanceReports", PerformanceReportObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Benchmark from the gorm
		//----------------------------------------------------------------------------
		return GetBenchmark(benchmarkId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more performanceReportsIds as a PerformanceReports from a Benchmark
//----------------------------------------------------------------------------
func RemovePerformanceReportsFromBenchmark( benchmarkId uint64, performanceReportsIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the Benchmark with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetBenchmark(benchmarkId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Benchmark so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		BenchmarkObj,_ := parentRequestResult.Data. (model.Benchmark)

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
				utils.GetDB().Model(&BenchmarkObj).Association("PerformanceReports").Delete( &PerformanceReportObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "PerformanceReports", performanceReportsId )
				return utils.RequestResult{false, msg, "removePerformanceReports", PerformanceReportObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Benchmark from the gorm
		//----------------------------------------------------------------------------
		return GetBenchmark(benchmarkId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// adds one or more constituentsIds as a Constituents to a Benchmark
//----------------------------------------------------------------------------
func AddConstituentsToBenchmark ( benchmarkId uint64, constituentsIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Benchmark with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetBenchmark(benchmarkId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Benchmark so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		BenchmarkObj,_ := parentRequestResult.Data. (model.Benchmark)

		// slice the ids on comma with no spaces
		ids := strings.Split( constituentsIds, ",")

		for _, constituentsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var SecurityObj model.Security

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a Security
			// with a matching constituentsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&SecurityObj , constituentsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the Constituents using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&BenchmarkObj).Association("Constituents").Append( &SecurityObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Constituents", constituentsId )
				return utils.RequestResult{false, msg, "unassignConstituents", SecurityObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Benchmark from the gorm
		//----------------------------------------------------------------------------
		return GetBenchmark(benchmarkId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more constituentsIds as a Constituents from a Benchmark
//----------------------------------------------------------------------------
func RemoveConstituentsFromBenchmark( benchmarkId uint64, constituentsIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the Benchmark with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetBenchmark(benchmarkId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Benchmark so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		BenchmarkObj,_ := parentRequestResult.Data. (model.Benchmark)

		// slice the ids on comma with no spaces
		ids := strings.Split( constituentsIds, ",")

		for _, constituentsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var SecurityObj model.Security

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a Security
			// with a matching constituentsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&SecurityObj , constituentsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove SecurityObj from the Constituents array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&BenchmarkObj).Association("Constituents").Delete( &SecurityObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Constituents", constituentsId )
				return utils.RequestResult{false, msg, "removeConstituents", SecurityObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Benchmark from the gorm
		//----------------------------------------------------------------------------
		return GetBenchmark(benchmarkId)

	} else {
		return parentRequestResult
	}
}

