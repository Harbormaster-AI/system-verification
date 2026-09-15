

// Define collection and schema for Alert
export interface Alert {
    raisedAt:
	type : Date
    clearedAt:
	type : Date
    message:
	type : string
    Device:
	type : Schema.Types.ObjectId
    AlertRule:
	type : Schema.Types.ObjectId
    Status:
 	type : String
#
    collection: 'alerts'
}
