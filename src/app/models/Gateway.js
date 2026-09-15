

// Define collection and schema for Gateway
export interface Gateway {
    softwareVersion:
	type : string
    Site:
	type : Schema.Types.ObjectId
    Room:
	type : Schema.Types.ObjectId
    Devices:
 	type : [{ type: Schema.Types.ObjectId, ref: 'IoTDevice' }]
    EdgeApplications:
 	type : [{ type: Schema.Types.ObjectId, ref: 'EdgeApplication' }]
    Certificates:
 	type : [{ type: Schema.Types.ObjectId, ref: 'DeviceCertificate' }]
    DigitalTwin:
	type : Schema.Types.ObjectId
    NetworkProfiles:
 	type : [{ type: Schema.Types.ObjectId, ref: 'NetworkProfile' }]
    Status:
 	type : String
#
    collection: 'gateways'
}
