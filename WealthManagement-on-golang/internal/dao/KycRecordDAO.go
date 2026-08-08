package dao

import (
    "WealthManagement-on-golang/internal/model"
    "WealthManagement-on-golang/internal/utils"
    "fmt"
    "strings"
)


func init() {
	fmt.Println( strings.ToTitle( "Initializing KycRecordDAO..." ) )
}

//----------------------------------------------------------------------------
// CreateKycRecord - creates a new db entry
//----------------------------------------------------------------------------
func CreateKycRecord(obj model.KycRecord)(utils.RequestResult){
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
	    createMsg = fmt.Sprintf( "Created a KycRecord with ID=%v", obj.ID )
	    success = true
	} else {
		createMsg = fmt.Sprintf( "Failed trying to create a KycRecord", result )
		success = false
	}

	requestResult = utils.RequestResult{success, createMsg, "CreateKycRecord", obj}
	return requestResult
}


//----------------------------------------------------------------------------
// GetKycRecord - returns the matching the provided identifier
//----------------------------------------------------------------------------
func GetKycRecord(id uint64)(utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var requestResult utils.RequestResult
	var getMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Pass the reference to the ORM to create
	//----------------------------------------------------------------------------
	var obj model.KycRecord

	//----------------------------------------------------------------------------
	// Retrieve the 1st occurrence from the ORM of a KycRecord with a matching ID
	//----------------------------------------------------------------------------
	result := utils.GetDB().First(&obj, id).Error // find first using identifier

	if result == nil {
	    getMsg = fmt.Sprintf( "Retrieved a KycRecord using ID=%v", id )
	    success = true
	} else {
		getMsg = fmt.Sprintf( "Failed trying to retrieve a KycRecord using ID=%v", id )
		success = false
	}

	requestResult = utils.RequestResult{success, getMsg, "GetKycRecord", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// GetAllKycRecord - returns all
//----------------------------------------------------------------------------
func GetAllKycRecord()(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var getAllMsg string
	var success bool
	var objs []model.KycRecord

	//----------------------------------------------------------------------------
	// Request the ORM to find all KycRecord
	//----------------------------------------------------------------------------
	result := utils.GetDB().Find(&objs).Error // find all

	if result == nil {
	    getAllMsg = fmt.Sprintf( "Retrieved all KycRecord" )
	    success = true
	} else {
		getAllMsg = fmt.Sprintf( "Failed trying to retrieve all KycRecord", result )
		success = false
	}

	requestResult = utils.RequestResult{success, getAllMsg, "GetAllKycRecord", objs}
	return requestResult
}

//----------------------------------------------------------------------------
// UpdateKycRecord - updates matching the provided identifier
//----------------------------------------------------------------------------
func UpdateKycRecord(obj model.KycRecord)(requestResult utils.RequestResult){
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
	    updateMsg = fmt.Sprintf( "Updated a KycRecord using ID=%v", obj.ID )
	    success = true
	} else {
		updateMsg = fmt.Sprintf( "Failed trying to update a KycRecord using ID=%v", obj.ID )
		success = false
	}

	requestResult = utils.RequestResult{success, updateMsg, "UpdateKycRecord", obj}

	return requestResult
}

//----------------------------------------------------------------------------
// DeleteKycRecord - deletes matching the provided identifier
//----------------------------------------------------------------------------
func DeleteKycRecord(id uint64)(requestResult utils.RequestResult){
	//----------------------------------------------------------------------------
	// variable initialization
	//----------------------------------------------------------------------------
	var deleteMsg string
	var success bool

	//----------------------------------------------------------------------------
	// Obtain the KycRecord with the matching identifier
	//----------------------------------------------------------------------------
	requestResult = GetKycRecord(id)

	if requestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.KycRecord so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		obj,_ := requestResult.Data. (model.KycRecord)

		//----------------------------------------------------------------------------
		// Make call to the ORM to delete
		//----------------------------------------------------------------------------
		result := utils.GetDB().Delete(&obj).Error // pass pointer of data to Delete

		if result == nil {
		    deleteMsg = fmt.Sprintf( "Deleted a KycRecord using ID=%v", id )
		    success = true
		} else {
			deleteMsg = fmt.Sprintf( "Failed trying to delete a KycRecord using ID=%v", id )
			success = false
		}

		requestResult = utils.RequestResult{success, deleteMsg, "DeleteKycRecord", requestResult.Data}

	}

	return requestResult
}


//----------------------------------------------------------------------------
// assigns a Client on a KycRecord
//----------------------------------------------------------------------------
func AssignClientToKycRecord( kycRecordId uint64, clientId uint64 )(utils.RequestResult){

	//----------------------------------------------------------------------------
	// Obtain the KycRecord with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetKycRecord(kycRecordId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.KycRecord so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		KycRecordObj,_ := parentRequestResult.Data. (model.KycRecord)

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
			// assign the Client	to the KycRecord
			//----------------------------------------------------------------------------
			KycRecordObj.Client = &ClientObj

			//----------------------------------------------------------------------------
			// save the KycRecord
			//----------------------------------------------------------------------------
			return UpdateKycRecord(KycRecordObj)
		} else {
			msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Client", clientId )
			return utils.RequestResult{false, msg, "assignClient", ClientObj}
		}
	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// unassigns a Client on a KycRecord
//----------------------------------------------------------------------------
func UnassignClientFromKycRecord(kycRecordId uint64)(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the KycRecord with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetKycRecord(kycRecordId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.KycRecord so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		KycRecordObj,_ := parentRequestResult.Data. (model.KycRecord)

		//----------------------------------------------------------------------------
		// assign an empty Client to the Client
		//----------------------------------------------------------------------------
		KycRecordObj.Client = nil;

		//----------------------------------------------------------------------------
		// assign  nil to the Client
		//----------------------------------------------------------------------------
		KycRecordObj.ClientId = nil;

		//----------------------------------------------------------------------------
		// save the KycRecord
		//----------------------------------------------------------------------------
		return UpdateKycRecord(KycRecordObj)

	} else {
		return parentRequestResult
	}

}


//----------------------------------------------------------------------------
// adds one or more documentsIds as a Documents to a KycRecord
//----------------------------------------------------------------------------
func AddDocumentsToKycRecord ( kycRecordId uint64, documentsIds string )(utils.RequestResult) {

	//----------------------------------------------------------------------------
	// Obtain the KycRecord with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetKycRecord(kycRecordId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.KycRecord so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		KycRecordObj,_ := parentRequestResult.Data. (model.KycRecord)

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
				utils.GetDB().Model(&KycRecordObj).Association("Documents").Append( &DocumentObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Documents", documentsId )
				return utils.RequestResult{false, msg, "unassignDocuments", DocumentObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified KycRecord from the gorm
		//----------------------------------------------------------------------------
		return GetKycRecord(kycRecordId)

	} else {
		return parentRequestResult
	}
}

//----------------------------------------------------------------------------
// removes one or more documentsIds as a Documents from a KycRecord
//----------------------------------------------------------------------------
func RemoveDocumentsFromKycRecord( kycRecordId uint64, documentsIds string )(utils.RequestResult) {
	//----------------------------------------------------------------------------
	// Obtain the KycRecord with the matching identifier
	//----------------------------------------------------------------------------
	parentRequestResult := GetKycRecord(kycRecordId)

	if parentRequestResult.Success == true {
		//----------------------------------------------------------------------------
		// Need to cast the interface to a model.KycRecord so the ORM can figure
		// out which table to deal with
		//----------------------------------------------------------------------------
		KycRecordObj,_ := parentRequestResult.Data. (model.KycRecord)

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
				utils.GetDB().Model(&KycRecordObj).Association("Documents").Delete( &DocumentObj )

			} else {
				msg := fmt.Sprintf( "Failed trying to read %s using ID=%v", "Documents", documentsId )
				return utils.RequestResult{false, msg, "removeDocuments", DocumentObj}
			}
		}

		//----------------------------------------------------------------------------
		// retrieve the modified KycRecord from the gorm
		//----------------------------------------------------------------------------
		return GetKycRecord(kycRecordId)

	} else {
		return parentRequestResult
	}
}

