

// Define collection and schema for TelemetryStream
export interface TelemetryStream {
    streamName:
	type : string
    retentionDays:
	type : number
    Device:
	type : Schema.Types.ObjectId
    Sensor:
	type : Schema.Types.ObjectId
    Schema:
	type : Schema.Types.ObjectId
    MessagingEndpoint:
	type : Schema.Types.ObjectId
    RetentionPolicy:
	type : Schema.Types.ObjectId
    Qos:
 	type : String
#
    collection: 'telemetryStreams'
}
