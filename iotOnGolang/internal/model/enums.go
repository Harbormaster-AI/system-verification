package model


//==============================================================
// ConnectivityType Declaration
//==============================================================
type ConnectivityType int
const (
    ConnectivityTypeWiFi ConnectivityType = iota
	ConnectivityTypeEthernet
	ConnectivityTypeLTE
	ConnectivityTypeFiveG
	ConnectivityTypeNBIoT
	ConnectivityTypeLoRaWAN
	ConnectivityTypeZigbee
	ConnectivityTypeBLE
	ConnectivityTypeSatellite
)


//==============================================================
// DeviceStatus Declaration
//==============================================================
type DeviceStatus int
const (
    DeviceStatusProvisioning DeviceStatus = iota
	DeviceStatusActive
	DeviceStatusSuspended
	DeviceStatusOffline
	DeviceStatusDecommissioned
)


//==============================================================
// TelemetryEncoding Declaration
//==============================================================
type TelemetryEncoding int
const (
    TelemetryEncodingJSON TelemetryEncoding = iota
	TelemetryEncodingCBOR
	TelemetryEncodingProtobuf
	TelemetryEncodingAvro
	TelemetryEncodingBinary
)


//==============================================================
// MessageQoS Declaration
//==============================================================
type MessageQoS int
const (
    MessageQoSAtMostOnce MessageQoS = iota
	MessageQoSAtLeastOnce
	MessageQoSExactlyOnce
)


//==============================================================
// CertificateType Declaration
//==============================================================
type CertificateType int
const (
    CertificateTypeX509 CertificateType = iota
	CertificateTypeX509_CA
	CertificateTypeX509_SelfSigned
)


//==============================================================
// ProvisioningMethod Declaration
//==============================================================
type ProvisioningMethod int
const (
    ProvisioningMethodManual ProvisioningMethod = iota
	ProvisioningMethodJITP
	ProvisioningMethodJITR
	ProvisioningMethodBulk
	ProvisioningMethodZeroTouch
)


//==============================================================
// ProvisioningStatus Declaration
//==============================================================
type ProvisioningStatus int
const (
    ProvisioningStatusPending ProvisioningStatus = iota
	ProvisioningStatusEnrolled
	ProvisioningStatusFailed
	ProvisioningStatusRevoked
)


//==============================================================
// SensorType Declaration
//==============================================================
type SensorType int
const (
    SensorTypeTemperature SensorType = iota
	SensorTypeHumidity
	SensorTypePressure
	SensorTypeAccelerometer
	SensorTypeGyroscope
	SensorTypeGPS
	SensorTypeLight
	SensorTypeCO2
	SensorTypeVOC
	SensorTypeCurrent
	SensorTypeVoltage
)


//==============================================================
// ActuatorType Declaration
//==============================================================
type ActuatorType int
const (
    ActuatorTypeRelay ActuatorType = iota
	ActuatorTypeMotor
	ActuatorTypeValve
	ActuatorTypeLED
	ActuatorTypeBuzzer
	ActuatorTypeDisplay
)


//==============================================================
// AlertSeverity Declaration
//==============================================================
type AlertSeverity int
const (
    AlertSeverityInfo AlertSeverity = iota
	AlertSeverityWarning
	AlertSeverityCritical
)


//==============================================================
// AlertStatus Declaration
//==============================================================
type AlertStatus int
const (
    AlertStatusOpen AlertStatus = iota
	AlertStatusAcknowledged
	AlertStatusResolved
	AlertStatusSuppressed
)


//==============================================================
// UserRole Declaration
//==============================================================
type UserRole int
const (
    UserRoleAdmin UserRole = iota
	UserRoleOperator
	UserRoleViewer
	UserRoleIntegrator
)


//==============================================================
// TenantType Declaration
//==============================================================
type TenantType int
const (
    TenantTypeEnterprise TenantType = iota
	TenantTypeSMB
	TenantTypeISV
	TenantTypeSystemIntegrator
	TenantTypeGovernment
)


//==============================================================
// MessagingProtocol Declaration
//==============================================================
type MessagingProtocol int
const (
    MessagingProtocolMQTT MessagingProtocol = iota
	MessagingProtocolAMQP
	MessagingProtocolHTTP
	MessagingProtocolCoAP
	MessagingProtocolWebSocket
)


//==============================================================
// SimStatus Declaration
//==============================================================
type SimStatus int
const (
    SimStatusActive SimStatus = iota
	SimStatusSuspended
	SimStatusRetired
)


//==============================================================
// CommandStatus Declaration
//==============================================================
type CommandStatus int
const (
    CommandStatusQueued CommandStatus = iota
	CommandStatusSent
	CommandStatusSucceeded
	CommandStatusFailed
	CommandStatusTimedOut
	CommandStatusCancelled
)


//==============================================================
// UpdateCampaignStatus Declaration
//==============================================================
type UpdateCampaignStatus int
const (
    UpdateCampaignStatusPlanned UpdateCampaignStatus = iota
	UpdateCampaignStatusInProgress
	UpdateCampaignStatusPaused
	UpdateCampaignStatusCompleted
	UpdateCampaignStatusCancelled
)


//==============================================================
// UpdateStatus Declaration
//==============================================================
type UpdateStatus int
const (
    UpdateStatusDownloading UpdateStatus = iota
	UpdateStatusInstalling
	UpdateStatusRebooting
	UpdateStatusSuccess
	UpdateStatusFailure
	UpdateStatusDeferred
)


//==============================================================
// TwinChangeType Declaration
//==============================================================
type TwinChangeType int
const (
    TwinChangeTypeDesiredUpdated TwinChangeType = iota
	TwinChangeTypeReportedUpdated
	TwinChangeTypeTagUpdated
)


//==============================================================
// MaintenancePriority Declaration
//==============================================================
type MaintenancePriority int
const (
    MaintenancePriorityLow MaintenancePriority = iota
	MaintenancePriorityMedium
	MaintenancePriorityHigh
	MaintenancePriorityUrgent
)


//==============================================================
// MaintenanceStatus Declaration
//==============================================================
type MaintenanceStatus int
const (
    MaintenanceStatusOpen MaintenanceStatus = iota
	MaintenanceStatusInProgress
	MaintenanceStatusWaitingOnParts
	MaintenanceStatusClosed
)


//==============================================================
// DeploymentStatus Declaration
//==============================================================
type DeploymentStatus int
const (
    DeploymentStatusPending DeploymentStatus = iota
	DeploymentStatusDeploying
	DeploymentStatusRunning
	DeploymentStatusFailed
	DeploymentStatusStopped
)


//==============================================================
// PowerSource Declaration
//==============================================================
type PowerSource int
const (
    PowerSourceBattery PowerSource = iota
	PowerSourceMains
	PowerSourcePoE
	PowerSourceEnergyHarvesting
	PowerSourceSolar
)


//==============================================================
// ModuleType Declaration
//==============================================================
type ModuleType int
const (
    ModuleTypeRFModule ModuleType = iota
	ModuleTypeMCU
	ModuleTypeSensorChipset
	ModuleTypePowerManagement
	ModuleTypeStorage
	ModuleTypeOther
)

