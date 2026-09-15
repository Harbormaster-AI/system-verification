
// enum type ConnectivityType
export let ConnectivityType = {
	WiFi:"WiFi",
	Ethernet:"Ethernet",
	LTE:"LTE",
	FiveG:"FiveG",
	NBIoT:"NBIoT",
	LoRaWAN:"LoRaWAN",
	Zigbee:"Zigbee",
	BLE:"BLE",
	Satellite:"Satellite",
}

// enum type DeviceStatus
export let DeviceStatus = {
	Provisioning:"Provisioning",
	Active:"Active",
	Suspended:"Suspended",
	Offline:"Offline",
	Decommissioned:"Decommissioned",
}

// enum type TelemetryEncoding
export let TelemetryEncoding = {
	JSON:"JSON",
	CBOR:"CBOR",
	Protobuf:"Protobuf",
	Avro:"Avro",
	Binary:"Binary",
}

// enum type MessageQoS
export let MessageQoS = {
	AtMostOnce:"AtMostOnce",
	AtLeastOnce:"AtLeastOnce",
	ExactlyOnce:"ExactlyOnce",
}

// enum type CertificateType
export let CertificateType = {
	X509:"X509",
	X509_CA:"X509_CA",
	X509_SelfSigned:"X509_SelfSigned",
}

// enum type ProvisioningMethod
export let ProvisioningMethod = {
	Manual:"Manual",
	JITP:"JITP",
	JITR:"JITR",
	Bulk:"Bulk",
	ZeroTouch:"ZeroTouch",
}

// enum type ProvisioningStatus
export let ProvisioningStatus = {
	Pending:"Pending",
	Enrolled:"Enrolled",
	Failed:"Failed",
	Revoked:"Revoked",
}

// enum type SensorType
export let SensorType = {
	Temperature:"Temperature",
	Humidity:"Humidity",
	Pressure:"Pressure",
	Accelerometer:"Accelerometer",
	Gyroscope:"Gyroscope",
	GPS:"GPS",
	Light:"Light",
	CO2:"CO2",
	VOC:"VOC",
	Current:"Current",
	Voltage:"Voltage",
}

// enum type ActuatorType
export let ActuatorType = {
	Relay:"Relay",
	Motor:"Motor",
	Valve:"Valve",
	LED:"LED",
	Buzzer:"Buzzer",
	Display:"Display",
}

// enum type AlertSeverity
export let AlertSeverity = {
	Info:"Info",
	Warning:"Warning",
	Critical:"Critical",
}

// enum type AlertStatus
export let AlertStatus = {
	Open:"Open",
	Acknowledged:"Acknowledged",
	Resolved:"Resolved",
	Suppressed:"Suppressed",
}

// enum type UserRole
export let UserRole = {
	Admin:"Admin",
	Operator:"Operator",
	Viewer:"Viewer",
	Integrator:"Integrator",
}

// enum type TenantType
export let TenantType = {
	Enterprise:"Enterprise",
	SMB:"SMB",
	ISV:"ISV",
	SystemIntegrator:"SystemIntegrator",
	Government:"Government",
}

// enum type MessagingProtocol
export let MessagingProtocol = {
	MQTT:"MQTT",
	AMQP:"AMQP",
	HTTP:"HTTP",
	CoAP:"CoAP",
	WebSocket:"WebSocket",
}

// enum type SimStatus
export let SimStatus = {
	Active:"Active",
	Suspended:"Suspended",
	Retired:"Retired",
}

// enum type CommandStatus
export let CommandStatus = {
	Queued:"Queued",
	Sent:"Sent",
	Succeeded:"Succeeded",
	Failed:"Failed",
	TimedOut:"TimedOut",
	Cancelled:"Cancelled",
}

// enum type UpdateCampaignStatus
export let UpdateCampaignStatus = {
	Planned:"Planned",
	InProgress:"InProgress",
	Paused:"Paused",
	Completed:"Completed",
	Cancelled:"Cancelled",
}

// enum type UpdateStatus
export let UpdateStatus = {
	Downloading:"Downloading",
	Installing:"Installing",
	Rebooting:"Rebooting",
	Success:"Success",
	Failure:"Failure",
	Deferred:"Deferred",
}

// enum type TwinChangeType
export let TwinChangeType = {
	DesiredUpdated:"DesiredUpdated",
	ReportedUpdated:"ReportedUpdated",
	TagUpdated:"TagUpdated",
}

// enum type MaintenancePriority
export let MaintenancePriority = {
	Low:"Low",
	Medium:"Medium",
	High:"High",
	Urgent:"Urgent",
}

// enum type MaintenanceStatus
export let MaintenanceStatus = {
	Open:"Open",
	InProgress:"InProgress",
	WaitingOnParts:"WaitingOnParts",
	Closed:"Closed",
}

// enum type DeploymentStatus
export let DeploymentStatus = {
	Pending:"Pending",
	Deploying:"Deploying",
	Running:"Running",
	Failed:"Failed",
	Stopped:"Stopped",
}

// enum type PowerSource
export let PowerSource = {
	Battery:"Battery",
	Mains:"Mains",
	PoE:"PoE",
	EnergyHarvesting:"EnergyHarvesting",
	Solar:"Solar",
}

// enum type ModuleType
export let ModuleType = {
	RFModule:"RFModule",
	MCU:"MCU",
	SensorChipset:"SensorChipset",
	PowerManagement:"PowerManagement",
	Storage:"Storage",
	Other:"Other",
}
