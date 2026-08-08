package dao

import (
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing DocumentDAO..." ) )
}

//----------------------------------------------------------------------------
// CreateDocument - creates a new db entry
//----------------------------------------------------------------------------
func CreateDocument(obj model.Document)(utils.RequestResult){
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
	    createMsg = fmt.Sprintf( "Created a Document with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a Document", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreateDocument", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetDocument - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetDocument(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.Document

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a Document with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a Document using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a Document using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetDocument", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllDocument - returns all
//----------------------------------------------------------------------------
func GetAllDocument()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.Document

	//----------------------------------------------------------------------------
	// Request the ORM to find all Document
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all Document" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all Document", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllDocument", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdateDocument - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdateDocument(obj model.Document)(requestResult utils.RequestResult){
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
	    updateMsg = fmt.Sprintf( "Updated a Document using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a Document using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdateDocument", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeleteDocument - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeleteDocument(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the Document with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetDocument(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Document so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.Document)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a Document using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a Document using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeleteDocument", requestResult.Data}

	}

	return requestResult
}


//----------------------------------------------------------------------------
// assigns a Client on a Document
//----------------------------------------------------------------------------
func AssignClientToDocument( documentId uint64, clientId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the Document with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetDocument(documentId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Document so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		DocumentObj,_ := parentRequestResult.Data. (model.Document)

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
			// assign the Client	to the Document
			//----------------------------------------------------------------------------
			DocumentObj.Client = &ClientObj

			//----------------------------------------------------------------------------
			// save the Document
			//----------------------------------------------------------------------------
			return UpdateDocument(DocumentObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Client", clientId )
			return utils.RequestResult{false, msg, "assignClient", ClientObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Client on a Document
//----------------------------------------------------------------------------
func UnassignClientFromDocument(documentId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Document with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetDocument(documentId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Document so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		DocumentObj,_ := parentRequestResult.Data. (model.Document)

		//----------------------------------------------------------------------------
		// assign an empty Client to the Client
		//----------------------------------------------------------------------------
		DocumentObj.Client = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Client
		//----------------------------------------------------------------------------
		DocumentObj.ClientId = nil;

		//----------------------------------------------------------------------------
		// save the Document
		//----------------------------------------------------------------------------
		return UpdateDocument(DocumentObj)

	} else {
		return parentRequestResult
	}

}

//----------------------------------------------------------------------------
// assigns a KycRecord on a Document
//----------------------------------------------------------------------------
func AssignKycRecordToDocument( documentId uint64, kycRecordId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the Document with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetDocument(documentId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Document so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		DocumentObj,_ := parentRequestResult.Data. (model.Document)

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
			// assign the KycRecord	to the Document
			//----------------------------------------------------------------------------
			DocumentObj.KycRecord = &KycRecordObj

			//----------------------------------------------------------------------------
			// save the Document
			//----------------------------------------------------------------------------
			return UpdateDocument(DocumentObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "KycRecord", kycRecordId )
			return utils.RequestResult{false, msg, "assignKycRecord", KycRecordObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a KycRecord on a Document
//----------------------------------------------------------------------------
func UnassignKycRecordFromDocument(documentId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Document with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetDocument(documentId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Document so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		DocumentObj,_ := parentRequestResult.Data. (model.Document)

		//----------------------------------------------------------------------------
		// assign an empty KycRecord to the KycRecord
		//----------------------------------------------------------------------------
		DocumentObj.KycRecord = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the KycRecord
		//----------------------------------------------------------------------------
		DocumentObj.KycRecordId = nil;

		//----------------------------------------------------------------------------
		// save the Document
		//----------------------------------------------------------------------------
		return UpdateDocument(DocumentObj)

	} else {
		return parentRequestResult
	}

}

//----------------------------------------------------------------------------
// assigns a Agreement on a Document
//----------------------------------------------------------------------------
func AssignAgreementToDocument( documentId uint64, agreementId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the Document with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetDocument(documentId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Document so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		DocumentObj,_ := parentRequestResult.Data. (model.Document)

		//----------------------------------------------------------------------------
		// Pass the reference to the ORM to get
		//----------------------------------------------------------------------------
		var AgreementObj model.Agreement

		//----------------------------------------------------------------------------
		// Retrieve the 1st occurrence from the ORM of a Agreement with a
		// matching agreementId
		//----------------------------------------------------------------------------
		childRequestResult := utils.GetDB().First(&AgreementObj, agreementId).Error // find first using identifier

		if childRequestResult == nil {
			//----------------------------------------------------------------------------
			// assign the Agreement	to the Document
			//----------------------------------------------------------------------------
			DocumentObj.Agreement = &AgreementObj

			//----------------------------------------------------------------------------
			// save the Document
			//----------------------------------------------------------------------------
			return UpdateDocument(DocumentObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Agreement", agreementId )
			return utils.RequestResult{false, msg, "assignAgreement", AgreementObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Agreement on a Document
//----------------------------------------------------------------------------
func UnassignAgreementFromDocument(documentId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the Document with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetDocument(documentId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.Document so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		DocumentObj,_ := parentRequestResult.Data. (model.Document)

		//----------------------------------------------------------------------------
		// assign an empty Agreement to the Agreement
		//----------------------------------------------------------------------------
		DocumentObj.Agreement = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Agreement
		//----------------------------------------------------------------------------
		DocumentObj.AgreementId = nil;

		//----------------------------------------------------------------------------
		// save the Document
		//----------------------------------------------------------------------------
		return UpdateDocument(DocumentObj)

	} else {
		return parentRequestResult
	}

}


