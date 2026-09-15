

// Define collection and schema for TwinChangeEvent
export interface TwinChangeEvent {
    eventId:
	type : string
    occurredAt:
	type : Date
    Twin:
	type : Schema.Types.ObjectId
    ChangeType:
 	type : String
#
    collection: 'twinChangeEvents'
}
