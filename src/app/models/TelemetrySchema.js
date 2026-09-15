

// Define collection and schema for TelemetrySchema
export interface TelemetrySchema {
    schemaId:
	type : string
    schemaUri:
	type : Uri
    Streams:
 	type : [{ type: Schema.Types.ObjectId, ref: 'TelemetryStream' }]
    Encoding:
 	type : String
#
    collection: 'telemetrySchemas'
}
