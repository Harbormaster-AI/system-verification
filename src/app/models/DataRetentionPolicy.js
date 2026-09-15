

// Define collection and schema for DataRetentionPolicy
export interface DataRetentionPolicy {
    name:
	type : string
    retentionDays:
	type : number
    Tenant:
	type : Schema.Types.ObjectId
    Streams:
 	type : [{ type: Schema.Types.ObjectId, ref: 'TelemetryStream' }]
#
    collection: 'dataRetentionPolicys'
}
