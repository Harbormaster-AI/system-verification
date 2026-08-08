package dao

import (
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing ComplianceAlertDAO..." ) )
}

//----------------------------------------------------------------------------
// CreateComplianceAlert - creates a new db entry
//----------------------------------------------------------------------------
func CreateComplianceAlert(obj model.ComplianceAlert)(utils.RequestResult){
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
	    createMsg = fmt.Sprintf( "Created a ComplianceAlert with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a ComplianceAlert", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreateComplianceAlert", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetComplianceAlert - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetComplianceAlert(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.ComplianceAlert

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a ComplianceAlert with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a ComplianceAlert using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a ComplianceAlert using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetComplianceAlert", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllComplianceAlert - returns all
//----------------------------------------------------------------------------
func GetAllComplianceAlert()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.ComplianceAlert

	//----------------------------------------------------------------------------
	// Request the ORM to find all ComplianceAlert
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all ComplianceAlert" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all ComplianceAlert", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllComplianceAlert", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdateComplianceAlert - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdateComplianceAlert(obj model.ComplianceAlert)(requestResult utils.RequestResult){
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
	    updateMsg = fmt.Sprintf( "Updated a ComplianceAlert using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a ComplianceAlert using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdateComplianceAlert", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeleteComplianceAlert - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeleteComplianceAlert(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the ComplianceAlert with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetComplianceAlert(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.ComplianceAlert so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.ComplianceAlert)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a ComplianceAlert using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a ComplianceAlert using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeleteComplianceAlert", requestResult.Data}

	}

	return requestResult
}


//----------------------------------------------------------------------------
// assigns a Rule on a ComplianceAlert
//----------------------------------------------------------------------------
func AssignRuleToComplianceAlert( complianceAlertId uint64, ruleId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the ComplianceAlert with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetComplianceAlert(complianceAlertId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.ComplianceAlert so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		ComplianceAlertObj,_ := parentRequestResult.Data. (model.ComplianceAlert)

		//----------------------------------------------------------------------------
		// Pass the reference to the ORM to get
		//----------------------------------------------------------------------------
		var ComplianceRuleObj model.ComplianceRule

		//----------------------------------------------------------------------------
		// Retrieve the 1st occurrence from the ORM of a ComplianceRule with a
		// matching ruleId
		//----------------------------------------------------------------------------
		childRequestResult := utils.GetDB().First(&ComplianceRuleObj, ruleId).Error // find first using identifier

		if childRequestResult == nil {
			//----------------------------------------------------------------------------
			// assign the Rule	to the ComplianceAlert
			//----------------------------------------------------------------------------
			ComplianceAlertObj.Rule = &ComplianceRuleObj

			//----------------------------------------------------------------------------
			// save the ComplianceAlert
			//----------------------------------------------------------------------------
			return UpdateComplianceAlert(ComplianceAlertObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Rule", ruleId )
			return utils.RequestResult{false, msg, "assignRule", ComplianceRuleObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Rule on a ComplianceAlert
//----------------------------------------------------------------------------
func UnassignRuleFromComplianceAlert(complianceAlertId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the ComplianceAlert with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetComplianceAlert(complianceAlertId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.ComplianceAlert so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		ComplianceAlertObj,_ := parentRequestResult.Data. (model.ComplianceAlert)

		//----------------------------------------------------------------------------
		// assign an empty ComplianceRule to the Rule
		//----------------------------------------------------------------------------
		ComplianceAlertObj.Rule = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Rule
		//----------------------------------------------------------------------------
		ComplianceAlertObj.RuleId = nil;

		//----------------------------------------------------------------------------
		// save the ComplianceAlert
		//----------------------------------------------------------------------------
		return UpdateComplianceAlert(ComplianceAlertObj)

	} else {
		return parentRequestResult
	}

}

//----------------------------------------------------------------------------
// assigns a Account on a ComplianceAlert
//----------------------------------------------------------------------------
func AssignAccountToComplianceAlert( complianceAlertId uint64, accountId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the ComplianceAlert with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetComplianceAlert(complianceAlertId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.ComplianceAlert so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		ComplianceAlertObj,_ := parentRequestResult.Data. (model.ComplianceAlert)

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
			// assign the Account	to the ComplianceAlert
			//----------------------------------------------------------------------------
			ComplianceAlertObj.Account = &AccountObj

			//----------------------------------------------------------------------------
			// save the ComplianceAlert
			//----------------------------------------------------------------------------
			return UpdateComplianceAlert(ComplianceAlertObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Account", accountId )
			return utils.RequestResult{false, msg, "assignAccount", AccountObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Account on a ComplianceAlert
//----------------------------------------------------------------------------
func UnassignAccountFromComplianceAlert(complianceAlertId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the ComplianceAlert with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetComplianceAlert(complianceAlertId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.ComplianceAlert so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		ComplianceAlertObj,_ := parentRequestResult.Data. (model.ComplianceAlert)

		//----------------------------------------------------------------------------
		// assign an empty Account to the Account
		//----------------------------------------------------------------------------
		ComplianceAlertObj.Account = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Account
		//----------------------------------------------------------------------------
		ComplianceAlertObj.AccountId = nil;

		//----------------------------------------------------------------------------
		// save the ComplianceAlert
		//----------------------------------------------------------------------------
		return UpdateComplianceAlert(ComplianceAlertObj)

	} else {
		return parentRequestResult
	}

}

//----------------------------------------------------------------------------
// assigns a Order on a ComplianceAlert
//----------------------------------------------------------------------------
func AssignOrderToComplianceAlert( complianceAlertId uint64, orderId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the ComplianceAlert with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetComplianceAlert(complianceAlertId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.ComplianceAlert so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		ComplianceAlertObj,_ := parentRequestResult.Data. (model.ComplianceAlert)

		//----------------------------------------------------------------------------
		// Pass the reference to the ORM to get
		//----------------------------------------------------------------------------
		var Order_Obj model.Order_

		//----------------------------------------------------------------------------
		// Retrieve the 1st occurrence from the ORM of a Order_ with a
		// matching orderId
		//----------------------------------------------------------------------------
		childRequestResult := utils.GetDB().First(&Order_Obj, orderId).Error // find first using identifier

		if childRequestResult == nil {
			//----------------------------------------------------------------------------
			// assign the Order	to the ComplianceAlert
			//----------------------------------------------------------------------------
			ComplianceAlertObj.Order = &Order_Obj

			//----------------------------------------------------------------------------
			// save the ComplianceAlert
			//----------------------------------------------------------------------------
			return UpdateComplianceAlert(ComplianceAlertObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Order", orderId )
			return utils.RequestResult{false, msg, "assignOrder", Order_Obj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Order on a ComplianceAlert
//----------------------------------------------------------------------------
func UnassignOrderFromComplianceAlert(complianceAlertId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the ComplianceAlert with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetComplianceAlert(complianceAlertId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.ComplianceAlert so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		ComplianceAlertObj,_ := parentRequestResult.Data. (model.ComplianceAlert)

		//----------------------------------------------------------------------------
		// assign an empty Order_ to the Order
		//----------------------------------------------------------------------------
		ComplianceAlertObj.Order = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Order
		//----------------------------------------------------------------------------
		ComplianceAlertObj.OrderId = nil;

		//----------------------------------------------------------------------------
		// save the ComplianceAlert
		//----------------------------------------------------------------------------
		return UpdateComplianceAlert(ComplianceAlertObj)

	} else {
		return parentRequestResult
	}

}

//----------------------------------------------------------------------------
// assigns a Advisor on a ComplianceAlert
//----------------------------------------------------------------------------
func AssignAdvisorToComplianceAlert( complianceAlertId uint64, advisorId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the ComplianceAlert with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetComplianceAlert(complianceAlertId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.ComplianceAlert so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		ComplianceAlertObj,_ := parentRequestResult.Data. (model.ComplianceAlert)

		//----------------------------------------------------------------------------
		// Pass the reference to the ORM to get
		//----------------------------------------------------------------------------
		var AdvisorObj model.Advisor

		//----------------------------------------------------------------------------
		// Retrieve the 1st occurrence from the ORM of a Advisor with a
		// matching advisorId
		//----------------------------------------------------------------------------
		childRequestResult := utils.GetDB().First(&AdvisorObj, advisorId).Error // find first using identifier

		if childRequestResult == nil {
			//----------------------------------------------------------------------------
			// assign the Advisor	to the ComplianceAlert
			//----------------------------------------------------------------------------
			ComplianceAlertObj.Advisor = &AdvisorObj

			//----------------------------------------------------------------------------
			// save the ComplianceAlert
			//----------------------------------------------------------------------------
			return UpdateComplianceAlert(ComplianceAlertObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Advisor", advisorId )
			return utils.RequestResult{false, msg, "assignAdvisor", AdvisorObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Advisor on a ComplianceAlert
//----------------------------------------------------------------------------
func UnassignAdvisorFromComplianceAlert(complianceAlertId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the ComplianceAlert with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetComplianceAlert(complianceAlertId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.ComplianceAlert so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		ComplianceAlertObj,_ := parentRequestResult.Data. (model.ComplianceAlert)

		//----------------------------------------------------------------------------
		// assign an empty Advisor to the Advisor
		//----------------------------------------------------------------------------
		ComplianceAlertObj.Advisor = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Advisor
		//----------------------------------------------------------------------------
		ComplianceAlertObj.AdvisorId = nil;

		//----------------------------------------------------------------------------
		// save the ComplianceAlert
		//----------------------------------------------------------------------------
		return UpdateComplianceAlert(ComplianceAlertObj)

	} else {
		return parentRequestResult
	}

}


