

// Define collection and schema for ProvisioningRecord
export interface ProvisioningRecord {
    enrolledAt:
	type : Date
    provisioningService:
	type : string
    Device:
	type : Schema.Types.ObjectId
    Certificate:
	type : Schema.Types.ObjectId
    Tenant:
	type : Schema.Types.ObjectId
    Method:
 	type : String
    Status:
 	type : String
#
    collection: 'provisioningRecords'
}
