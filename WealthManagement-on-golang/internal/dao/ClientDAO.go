package dao

import (
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing ClientDAO..." ) )
}

//----------------------------------------------------------------------------
// CreateClient - creates a new db entry
//----------------------------------------------------------------------------
func CreateClient(obj model.Client)(utils.RequestResult){
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
	    createMsg = fmt.Sprintf( "Created a Client with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a Client", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreateClient", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetClient - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetClient(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.Client

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a Client with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a Client using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a Client using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetClient", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllClient - returns all
//----------------------------------------------------------------------------
func GetAllClient()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.Client

	//----------------------------------------------------------------------------
	// Request the ORM to find all Client
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all Client" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all Client", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllClient", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdateClient - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdateClient(obj model.Client)(requestResult utils.RequestResult){
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
	    updateMsg = fmt.Sprintf( "Updated a Client using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a Client using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdateClient", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeleteClient - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeleteClient(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the Client with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetClient(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Client so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.Client)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a Client using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a Client using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeleteClient", requestResult.Data}

	}

	return requestResult
}


//----------------------------------------------------------------------------
// assigns a Household on a Client
//----------------------------------------------------------------------------
func AssignHouseholdToClient( clientId uint64, householdId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the Client with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetClient(clientId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Client so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		ClientObj,_ := parentRequestResult.Data. (model.Client)

		//----------------------------------------------------------------------------
		// Pass the reference to the ORM to get
		//----------------------------------------------------------------------------
		var HouseholdObj model.Household

		//----------------------------------------------------------------------------
		// Retrieve the 1st occurrence from the ORM of a Household with a
		// matching householdId
		//----------------------------------------------------------------------------
		childRequestResult := utils.GetDB().First(&HouseholdObj, householdId).Error // find first using identifier

		if childRequestResult == nil {
			//----------------------------------------------------------------------------
			// assign the Household	to the Client
			//----------------------------------------------------------------------------
			ClientObj.Household = &HouseholdObj

			//----------------------------------------------------------------------------
			// save the Client
			//----------------------------------------------------------------------------
			return UpdateClient(ClientObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Household", householdId )
			return utils.RequestResult{false, msg, "assignHousehold", HouseholdObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Household on a Client
//----------------------------------------------------------------------------
func UnassignHouseholdFromClient(clientId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Client with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetClient(clientId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Client so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		ClientObj,_ := parentRequestResult.Data. (model.Client)

		//----------------------------------------------------------------------------
		// assign an empty Household to the Household
		//----------------------------------------------------------------------------
		ClientObj.Household = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Household
		//----------------------------------------------------------------------------
		ClientObj.HouseholdId = nil;

		//----------------------------------------------------------------------------
		// save the Client
		//----------------------------------------------------------------------------
		return UpdateClient(ClientObj)

	} else {
		return parentRequestResult
	}

}

//----------------------------------------------------------------------------
// assigns a KycRecord on a Client
//----------------------------------------------------------------------------
func AssignKycRecordToClient( clientId uint64, kycRecordId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the Client with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetClient(clientId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Client so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		ClientObj,_ := parentRequestResult.Data. (model.Client)

		//----------------------------------------------------------------------------
		// Pass the reference to the ORM to get
		//----------------------------------------------------------------------------
		var KycRecordObj model.KycRecord

		//----------------------------------------------------------------------------
		// Retrieve the 1st occurrence from the ORM of a KycRecord with a
		// matching kycRecordId
		//----------------------------------------------------------------------------
		childRequestResult := utils.GetDB().First(&KycRecordObj, kycRecordId).Error // find first using identifier

		if childRequestResult == nil {
			//----------------------------------------------------------------------------
			// assign the KycRecord	to the Client
			//----------------------------------------------------------------------------
			ClientObj.KycRecord = &KycRecordObj

			//----------------------------------------------------------------------------
			// save the Client
			//----------------------------------------------------------------------------
			return UpdateClient(ClientObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "KycRecord", kycRecordId )
			return utils.RequestResult{false, msg, "assignKycRecord", KycRecordObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a KycRecord on a Client
//----------------------------------------------------------------------------
func UnassignKycRecordFromClient(clientId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Client with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetClient(clientId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Client so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		ClientObj,_ := parentRequestResult.Data. (model.Client)

		//----------------------------------------------------------------------------
		// assign an empty KycRecord to the KycRecord
		//----------------------------------------------------------------------------
		ClientObj.KycRecord = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the KycRecord
		//----------------------------------------------------------------------------
		ClientObj.KycRecordId = nil;

		//----------------------------------------------------------------------------
		// save the Client
		//----------------------------------------------------------------------------
		return UpdateClient(ClientObj)

	} else {
		return parentRequestResult
	}

}


//----------------------------------------------------------------------------
// adds one or more accountsIds as a Accounts to a Client
//----------------------------------------------------------------------------
func AddAccountsToClient ( clientId uint64, accountsIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Client with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetClient(clientId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Client so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		ClientObj,_ := parentRequestResult.Data. (model.Client)

		// slice the ids on comma with no spaces
		ids := strings.Split( accountsIds, ",")

		for _, accountsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var AccountObj model.Account

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a Account
			// with a matching accountsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&AccountObj , accountsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the Accounts using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&ClientObj).Association("Accounts").Append( &AccountObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Accounts", accountsId )
				return utils.RequestResult{false, msg, "unassignAccounts", AccountObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Client from the gorm
		//----------------------------------------------------------------------------
		return GetClient(clientId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more accountsIds as a Accounts from a Client
//----------------------------------------------------------------------------
func RemoveAccountsFromClient( clientId uint64, accountsIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the Client with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetClient(clientId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Client so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		ClientObj,_ := parentRequestResult.Data. (model.Client)

		// slice the ids on comma with no spaces
		ids := strings.Split( accountsIds, ",")

		for _, accountsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var AccountObj model.Account

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a Account
			// with a matching accountsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&AccountObj , accountsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove AccountObj from the Accounts array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&ClientObj).Association("Accounts").Delete( &AccountObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Accounts", accountsId )
				return utils.RequestResult{false, msg, "removeAccounts", AccountObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Client from the gorm
		//----------------------------------------------------------------------------
		return GetClient(clientId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// adds one or more documentsIds as a Documents to a Client
//----------------------------------------------------------------------------
func AddDocumentsToClient ( clientId uint64, documentsIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Client with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetClient(clientId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Client so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		ClientObj,_ := parentRequestResult.Data. (model.Client)

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
				utils.GetDB().Model(&ClientObj).Association("Documents").Append( &DocumentObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Documents", documentsId )
				return utils.RequestResult{false, msg, "unassignDocuments", DocumentObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Client from the gorm
		//----------------------------------------------------------------------------
		return GetClient(clientId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more documentsIds as a Documents from a Client
//----------------------------------------------------------------------------
func RemoveDocumentsFromClient( clientId uint64, documentsIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the Client with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetClient(clientId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Client so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		ClientObj,_ := parentRequestResult.Data. (model.Client)

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
				utils.GetDB().Model(&ClientObj).Association("Documents").Delete( &DocumentObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Documents", documentsId )
				return utils.RequestResult{false, msg, "removeDocuments", DocumentObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Client from the gorm
		//----------------------------------------------------------------------------
		return GetClient(clientId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// adds one or more beneficiariesIds as a Beneficiaries to a Client
//----------------------------------------------------------------------------
func AddBeneficiariesToClient ( clientId uint64, beneficiariesIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Client with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetClient(clientId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Client so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		ClientObj,_ := parentRequestResult.Data. (model.Client)

		// slice the ids on comma with no spaces
		ids := strings.Split( beneficiariesIds, ",")

		for _, beneficiariesId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var BeneficiaryObj model.Beneficiary

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a Beneficiary
			// with a matching beneficiariesId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&BeneficiaryObj , beneficiariesId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the Beneficiaries using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&ClientObj).Association("Beneficiaries").Append( &BeneficiaryObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Beneficiaries", beneficiariesId )
				return utils.RequestResult{false, msg, "unassignBeneficiaries", BeneficiaryObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Client from the gorm
		//----------------------------------------------------------------------------
		return GetClient(clientId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more beneficiariesIds as a Beneficiaries from a Client
//----------------------------------------------------------------------------
func RemoveBeneficiariesFromClient( clientId uint64, beneficiariesIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the Client with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetClient(clientId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Client so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		ClientObj,_ := parentRequestResult.Data. (model.Client)

		// slice the ids on comma with no spaces
		ids := strings.Split( beneficiariesIds, ",")

		for _, beneficiariesId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var BeneficiaryObj model.Beneficiary

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a Beneficiary
			// with a matching beneficiariesId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&BeneficiaryObj , beneficiariesId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove BeneficiaryObj from the Beneficiaries array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&ClientObj).Association("Beneficiaries").Delete( &BeneficiaryObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Beneficiaries", beneficiariesId )
				return utils.RequestResult{false, msg, "removeBeneficiaries", BeneficiaryObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Client from the gorm
		//----------------------------------------------------------------------------
		return GetClient(clientId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// adds one or more agreementsIds as a Agreements to a Client
//----------------------------------------------------------------------------
func AddAgreementsToClient ( clientId uint64, agreementsIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Client with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetClient(clientId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Client so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		ClientObj,_ := parentRequestResult.Data. (model.Client)

		// slice the ids on comma with no spaces
		ids := strings.Split( agreementsIds, ",")

		for _, agreementsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var AgreementObj model.Agreement

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a Agreement
			// with a matching agreementsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&AgreementObj , agreementsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// append to the Agreements using the gorm mechanism
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&ClientObj).Association("Agreements").Append( &AgreementObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Agreements", agreementsId )
				return utils.RequestResult{false, msg, "unassignAgreements", AgreementObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Client from the gorm
		//----------------------------------------------------------------------------
		return GetClient(clientId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more agreementsIds as a Agreements from a Client
//----------------------------------------------------------------------------
func RemoveAgreementsFromClient( clientId uint64, agreementsIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the Client with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetClient(clientId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Client so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		ClientObj,_ := parentRequestResult.Data. (model.Client)

		// slice the ids on comma with no spaces
		ids := strings.Split( agreementsIds, ",")

		for _, agreementsId:= range ids {
			//----------------------------------------------------------------------------
			// Pass the reference to the ORM to get
			//----------------------------------------------------------------------------
			var AgreementObj model.Agreement

			//----------------------------------------------------------------------------
			// Retrieve the 1st occurrence from the ORM of a Agreement
			// with a matching agreementsId
			//----------------------------------------------------------------------------
			childRequestResult := utils.GetDB().First(&AgreementObj , agreementsId).Error // find first using identifier

			if childRequestResult == nil {
				//----------------------------------------------------------------------------
				// remove AgreementObj from the Agreements array, but wont delete it from db
				//----------------------------------------------------------------------------
				utils.GetDB().Model(&ClientObj).Association("Agreements").Delete( &AgreementObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Agreements", agreementsId )
				return utils.RequestResult{false, msg, "removeAgreements", AgreementObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified Client from the gorm
		//----------------------------------------------------------------------------
		return GetClient(clientId)

	} else {
		return parentRequestResult
	}
}

