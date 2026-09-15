

// Define collection and schema for DeviceVendor
export interface DeviceVendor {
    name:
	type : string
    legalName:
	type : string
    headquartersCountry:
	type : string
    website:
	type : string
    DeviceModels:
 	type : [{ type: Schema.Types.ObjectId, ref: 'DeviceModel' }]
    FirmwareReleases:
 	type : [{ type: Schema.Types.ObjectId, ref: 'FirmwareRelease' }]
    HardwareModules:
 	type : [{ type: Schema.Types.ObjectId, ref: 'HardwareModule' }]
#
    collection: 'deviceVendors'
}
