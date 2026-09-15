

// Define collection and schema for SensorInstance
export interface SensorInstance {
    name:
	type : string
    unit:
	type : string
    samplingIntervalMs:
	type : number
    Device:
	type : Schema.Types.ObjectId
    TelemetryStreams:
 	type : [{ type: Schema.Types.ObjectId, ref: 'TelemetryStream' }]
    SensorType:
 	type : String
#
    collection: 'sensorInstances'
}
