

// Define collection and schema for DigitalTwin
export interface DigitalTwin {
    twinId:
	type : string
    desiredStateVersion:
	type : number
    reportedStateVersion:
	type : number
    lastSyncAt:
	type : Date
    Device:
	type : Schema.Types.ObjectId
    Gateway:
	type : Schema.Types.ObjectId
    Template:
	type : Schema.Types.ObjectId
    ChangeEvents:
 	type : [{ type: Schema.Types.ObjectId, ref: 'TwinChangeEvent' }]
#
    collection: 'digitalTwins'
}
