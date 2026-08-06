package dao

import (
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing AgreementDAO..." ) )
}

//----------------------------------------------------------------------------
// CreateAgreement - creates a new db entry
//----------------------------------------------------------------------------
func CreateAgreement(obj model.Agreement)(utils.RequestResult){
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
	    createMsg = fmt.Sprintf( "Created a Agreement with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a Agreement", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreateAgreement", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetAgreement - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetAgreement(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.Agreement

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a Agreement with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a Agreement using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a Agreement using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetAgreement", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllAgreement - returns all
//----------------------------------------------------------------------------
func GetAllAgreement()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.Agreement

	//----------------------------------------------------------------------------
	// Request the ORM to find all Agreement
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all Agreement" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all Agreement", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllAgreement", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdateAgreement - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdateAgreement(obj model.Agreement)(requestResult utils.RequestResult){
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
	    updateMsg = fmt.Sprintf( "Updated a Agreement using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a Agreement using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdateAgreement", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeleteAgreement - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeleteAgreement(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the Agreement with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetAgreement(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Agreement so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.Agreement)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a Agreement using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a Agreement using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeleteAgreement", requestResult.Data}

	}

	return requestResult
}


//----------------------------------------------------------------------------
// assigns a Client on a Agreement
//----------------------------------------------------------------------------
func AssignClientToAgreement( agreementId uint64, clientId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the Agreement with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetAgreement(agreementId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Agreement so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		AgreementObj,_ := parentRequestResult.Data. (model.Agreement)

		//----------------------------------------------------------------------------
		// Pass the reference to the ORM to get
		//----------------------------------------------------------------------------
		var ClientObj model.Client

		//----------------------------------------------------------------------------
		// Retrieve the 1st occurrence from the ORM of a Client with a
		// matching clientId
		//----------------------------------------------------------------------------
		childRequestResult := utils.GetDB().First(&ClientObj, clientId).Error // find first using identifier

		if childRequestResult == nil {
			//----------------------------------------------------------------------------
			// assign the Client	to the Agreement
			//----------------------------------------------------------------------------
			AgreementObj.Client = &ClientObj

			//----------------------------------------------------------------------------
			// save the Agreement
			//----------------------------------------------------------------------------
			return UpdateAgreement(AgreementObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Client", clientId )
			return utils.RequestResult{false, msg, "assignClient", ClientObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Client on a Agreement
//----------------------------------------------------------------------------
func UnassignClientFromAgreement(agreementId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Agreement with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetAgreement(agreementId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Agreement so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		AgreementObj,_ := parentRequestResult.Data. (model.Agreement)

		//----------------------------------------------------------------------------
		// assign an empty Client to the Client
		//----------------------------------------------------------------------------
		AgreementObj.Client = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Client
		//----------------------------------------------------------------------------
		AgreementObj.ClientId = nil;

		//----------------------------------------------------------------------------
		// save the Agreement
		//----------------------------------------------------------------------------
		return UpdateAgreement(AgreementObj)

	} else {
		return parentRequestResult
	}

}

//----------------------------------------------------------------------------
// assigns a Account on a Agreement
//----------------------------------------------------------------------------
func AssignAccountToAgreement( agreementId uint64, accountId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the Agreement with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetAgreement(agreementId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Agreement so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		AgreementObj,_ := parentRequestResult.Data. (model.Agreement)

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
			// assign the Account	to the Agreement
			//----------------------------------------------------------------------------
			AgreementObj.Account = &AccountObj

			//----------------------------------------------------------------------------
			// save the Agreement
			//----------------------------------------------------------------------------
			return UpdateAgreement(AgreementObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Account", accountId )
			return utils.RequestResult{false, msg, "assignAccount", AccountObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Account on a Agreement
//----------------------------------------------------------------------------
func UnassignAccountFromAgreement(agreementId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Agreement with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetAgreement(agreementId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Agreement so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		AgreementObj,_ := parentRequestResult.Data. (model.Agreement)

		//----------------------------------------------------------------------------
		// assign an empty Account to the Account
		//----------------------------------------------------------------------------
		AgreementObj.Account = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Account
		//----------------------------------------------------------------------------
		AgreementObj.AccountId = nil;

		//----------------------------------------------------------------------------
		// save the Agreement
		//----------------------------------------------------------------------------
		return UpdateAgreement(AgreementObj)

	} else {
		return parentRequestResult
	}

}


//----------------------------------------------------------------------------
// adds one or more documentsIds as a Documents to a Agreement
//----------------------------------------------------------------------------
func AddDocumentsToAgreement ( agreementId uint64, documentsIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Agreement with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetAgreement(agreementId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Agreement so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		AgreementObj,_ := parentRequestResult.Data. (model.Agreement)

		// slice the ids on comma with no spaces
		ids := strings.Split( documentsIds, ",")

		for _, documentsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var DocumentObj model.Document

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a Document
			// with a matching documentsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&DocumentObj , documentsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the Documents using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&AgreementObj).Association("Documents").Append( &DocumentObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Documents", documentsId )
				return utils.RequestResult{false, msg, "unassignDocuments", DocumentObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Agreement from the gorm
		//----------------------------------------------------------------------------
		return GetAgreement(agreementId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more documentsIds as a Documents from a Agreement
//----------------------------------------------------------------------------
func RemoveDocumentsFromAgreement( agreementId uint64, documentsIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the Agreement with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetAgreement(agreementId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Agreement so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		AgreementObj,_ := parentRequestResult.Data. (model.Agreement)

		// slice the ids on comma with no spaces
		ids := strings.Split( documentsIds, ",")

		for _, documentsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var DocumentObj model.Document

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a Document
			// with a matching documentsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&DocumentObj , documentsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove DocumentObj from the Documents array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&AgreementObj).Association("Documents").Delete( &DocumentObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Documents", documentsId )
				return utils.RequestResult{false, msg, "removeDocuments", DocumentObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Agreement from the gorm
		//----------------------------------------------------------------------------
		return GetAgreement(agreementId)

	} else {
		return parentRequestResult
	}
}

