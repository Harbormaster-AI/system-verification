

// Define collection and schema for SoftwareUpdateExecution
export interface SoftwareUpdateExecution {
    startedAt:
	type : Date
    completedAt:
	type : Date
    Campaign:
	type : Schema.Types.ObjectId
    Device:
	type : Schema.Types.ObjectId
    Status:
 	type : String
#
    collection: 'softwareUpdateExecutions'
}
