

// Define collection and schema for UsageRecord
export interface UsageRecord {
    periodStart:
	type : Date
    periodEnd:
	type : Date
    messagesSent:
	type : number
    dataVolumeMB:
	type : number
    Tenant:
	type : Schema.Types.ObjectId
    Device:
	type : Schema.Types.ObjectId
    ConnectivityPlan:
	type : Schema.Types.ObjectId
#
    collection: 'usageRecords'
}
