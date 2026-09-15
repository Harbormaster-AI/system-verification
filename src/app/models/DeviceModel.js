

// Define collection and schema for DeviceModel
export interface DeviceModel {
    name:
	type : string
    modelNumber:
	type : string
    hardwareRevision:
	type : string
    Vendor:
	type : Schema.Types.ObjectId
    HardwareModules:
 	type : [{ type: Schema.Types.ObjectId, ref: 'HardwareModule' }]
    TwinTemplate:
	type : Schema.Types.ObjectId
    FirmwareReleases:
 	type : [{ type: Schema.Types.ObjectId, ref: 'FirmwareRelease' }]
    CommandDefinitions:
 	type : [{ type: Schema.Types.ObjectId, ref: 'CommandDefinition' }]
    SupportedConnectivity:
 	type : String
    DefaultTelemetryEncoding:
 	type : String
#
    collection: 'deviceModels'
}
