

// Define collection and schema for Site
export interface Site {
    name:
	type : string
    address:
	type : Address
    timezone:
	type : string
    latitude:
	type : String
    longitude:
	type : String
    Tenant:
	type : Schema.Types.ObjectId
    Buildings:
 	type : [{ type: Schema.Types.ObjectId, ref: 'Building' }]
    Devices:
 	type : [{ type: Schema.Types.ObjectId, ref: 'IoTDevice' }]
    Gateways:
 	type : [{ type: Schema.Types.ObjectId, ref: 'Gateway' }]
#
    collection: 'sites'
}
