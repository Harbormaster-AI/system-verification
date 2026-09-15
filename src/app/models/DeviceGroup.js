

// Define collection and schema for DeviceGroup
export interface DeviceGroup {
    name:
	type : string
    criteria:
	type : string
    Tenant:
	type : Schema.Types.ObjectId
    Devices:
 	type : [{ type: Schema.Types.ObjectId, ref: 'IoTDevice' }]
#
    collection: 'deviceGroups'
}
