

// Define collection and schema for IoTDevice
export interface IoTDevice {
    deviceId:
	type : DeviceId
    serialNumber:
	type : string
    lastSeen:
	type : Date
    firmwareVersion:
	type : FirmwareVersion
    DeviceModel:
	type : Schema.Types.ObjectId
    Tenant:
	type : Schema.Types.ObjectId
    Site:
	type : Schema.Types.ObjectId
    Room:
	type : Schema.Types.ObjectId
    Gateway:
	type : Schema.Types.ObjectId
    Sensors:
 	type : [{ type: Schema.Types.ObjectId, ref: 'SensorInstance' }]
    Actuators:
 	type : [{ type: Schema.Types.ObjectId, ref: 'ActuatorInstance' }]
    Certificates:
 	type : [{ type: Schema.Types.ObjectId, ref: 'DeviceCertificate' }]
    DigitalTwin:
	type : Schema.Types.ObjectId
    TelemetryStreams:
 	type : [{ type: Schema.Types.ObjectId, ref: 'TelemetryStream' }]
    CommandInvocations:
 	type : [{ type: Schema.Types.ObjectId, ref: 'CommandInvocation' }]
    Alerts:
 	type : [{ type: Schema.Types.ObjectId, ref: 'Alert' }]
    ProvisioningRecord:
	type : Schema.Types.ObjectId
    DeviceGroups:
 	type : [{ type: Schema.Types.ObjectId, ref: 'DeviceGroup' }]
    NetworkProfiles:
 	type : [{ type: Schema.Types.ObjectId, ref: 'NetworkProfile' }]
    Status:
 	type : String
    PowerSource:
 	type : String
#
    collection: 'ioTDevices'
}
