

// Define collection and schema for MessagingEndpoint
export interface MessagingEndpoint {
    host:
	type : string
    port:
	type : number
    secure:
	type : boolean
    Tenant:
	type : Schema.Types.ObjectId
    Streams:
 	type : [{ type: Schema.Types.ObjectId, ref: 'TelemetryStream' }]
    Protocol:
 	type : String
#
    collection: 'messagingEndpoints'
}
