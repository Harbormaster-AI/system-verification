

// Define collection and schema for Room
export interface Room {
    name:
	type : string
    Floor:
	type : Schema.Types.ObjectId
    Devices:
 	type : [{ type: Schema.Types.ObjectId, ref: 'IoTDevice' }]
    Gateways:
 	type : [{ type: Schema.Types.ObjectId, ref: 'Gateway' }]
#
    collection: 'rooms'
}
