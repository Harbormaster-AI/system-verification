export enum ConnectivityType {
    WiFi = "WiFi",
    Ethernet = "Ethernet",
    LTE = "LTE",
    FiveG = "FiveG",
    NBIoT = "NBIoT",
    LoRaWAN = "LoRaWAN",
    Zigbee = "Zigbee",
    BLE = "BLE",
    Satellite = "Satellite",
}
export enum DeviceStatus {
    Provisioning = "Provisioning",
    Active = "Active",
    Suspended = "Suspended",
    Offline = "Offline",
    Decommissioned = "Decommissioned",
}
export enum TelemetryEncoding {
    JSON = "JSON",
    CBOR = "CBOR",
    Protobuf = "Protobuf",
    Avro = "Avro",
    Binary = "Binary",
}
export enum MessageQoS {
    AtMostOnce = "AtMostOnce",
    AtLeastOnce = "AtLeastOnce",
    ExactlyOnce = "ExactlyOnce",
}
export enum CertificateType {
    X509 = "X509",
    X509_CA = "X509_CA",
    X509_SelfSigned = "X509_SelfSigned",
}
export enum ProvisioningMethod {
    Manual = "Manual",
    JITP = "JITP",
    JITR = "JITR",
    Bulk = "Bulk",
    ZeroTouch = "ZeroTouch",
}
export enum ProvisioningStatus {
    Pending = "Pending",
    Enrolled = "Enrolled",
    Failed = "Failed",
    Revoked = "Revoked",
}
export enum SensorType {
    Temperature = "Temperature",
    Humidity = "Humidity",
    Pressure = "Pressure",
    Accelerometer = "Accelerometer",
    Gyroscope = "Gyroscope",
    GPS = "GPS",
    Light = "Light",
    CO2 = "CO2",
    VOC = "VOC",
    Current = "Current",
    Voltage = "Voltage",
}
export enum ActuatorType {
    Relay = "Relay",
    Motor = "Motor",
    Valve = "Valve",
    LED = "LED",
    Buzzer = "Buzzer",
    Display = "Display",
}
export enum AlertSeverity {
    Info = "Info",
    Warning = "Warning",
    Critical = "Critical",
}
export enum AlertStatus {
    Open = "Open",
    Acknowledged = "Acknowledged",
    Resolved = "Resolved",
    Suppressed = "Suppressed",
}
export enum UserRole {
    Admin = "Admin",
    Operator = "Operator",
    Viewer = "Viewer",
    Integrator = "Integrator",
}
export enum TenantType {
    Enterprise = "Enterprise",
    SMB = "SMB",
    ISV = "ISV",
    SystemIntegrator = "SystemIntegrator",
    Government = "Government",
}
export enum MessagingProtocol {
    MQTT = "MQTT",
    AMQP = "AMQP",
    HTTP = "HTTP",
    CoAP = "CoAP",
    WebSocket = "WebSocket",
}
export enum SimStatus {
    Active = "Active",
    Suspended = "Suspended",
    Retired = "Retired",
}
export enum CommandStatus {
    Queued = "Queued",
    Sent = "Sent",
    Succeeded = "Succeeded",
    Failed = "Failed",
    TimedOut = "TimedOut",
    Cancelled = "Cancelled",
}
export enum UpdateCampaignStatus {
    Planned = "Planned",
    InProgress = "InProgress",
    Paused = "Paused",
    Completed = "Completed",
    Cancelled = "Cancelled",
}
export enum UpdateStatus {
    Downloading = "Downloading",
    Installing = "Installing",
    Rebooting = "Rebooting",
    Success = "Success",
    Failure = "Failure",
    Deferred = "Deferred",
}
export enum TwinChangeType {
    DesiredUpdated = "DesiredUpdated",
    ReportedUpdated = "ReportedUpdated",
    TagUpdated = "TagUpdated",
}
export enum MaintenancePriority {
    Low = "Low",
    Medium = "Medium",
    High = "High",
    Urgent = "Urgent",
}
export enum MaintenanceStatus {
    Open = "Open",
    InProgress = "InProgress",
    WaitingOnParts = "WaitingOnParts",
    Closed = "Closed",
}
export enum DeploymentStatus {
    Pending = "Pending",
    Deploying = "Deploying",
    Running = "Running",
    Failed = "Failed",
    Stopped = "Stopped",
}
export enum PowerSource {
    Battery = "Battery",
    Mains = "Mains",
    PoE = "PoE",
    EnergyHarvesting = "EnergyHarvesting",
    Solar = "Solar",
}
export enum ModuleType {
    RFModule = "RFModule",
    MCU = "MCU",
    SensorChipset = "SensorChipset",
    PowerManagement = "PowerManagement",
    Storage = "Storage",
    Other = "Other",
}

export interface DeviceVendor {
    id: string;
    name: string
    legalName: string
    headquartersCountry: string
    website: string
}

export interface HardwareModule {
    id: string;
    moduleCode: string
    datasheetUri: string
    ModuleType:  ModuleType
}

export interface DeviceModel {
    id: string;
    name: string
    modelNumber: string
    hardwareRevision: string
    SupportedConnectivity:  ConnectivityType
    DefaultTelemetryEncoding:  TelemetryEncoding
}

export interface FirmwareRelease {
    id: string;
    version: string
    releaseDate: string
    releaseNotes: string
    checksum: string
}

export interface IoTDevice {
    id: string;
    deviceId: string
    serialNumber: string
    lastSeen: string
    firmwareVersion: string
    Status:  DeviceStatus
    PowerSource:  PowerSource
}

export interface SensorInstance {
    id: string;
    name: string
    unit: string
    samplingIntervalMs: number
    SensorType:  SensorType
}

export interface ActuatorInstance {
    id: string;
    name: string
    commandTopic: string
    ActuatorType:  ActuatorType
}

export interface TelemetrySchema {
    id: string;
    schemaId: string
    schemaUri: string
    Encoding:  TelemetryEncoding
}

export interface TelemetryStream {
    id: string;
    streamName: string
    retentionDays: number
    Qos:  MessageQoS
}

export interface CommandDefinition {
    id: string;
    name: string
    requestSchemaUri: string
    responseSchemaUri: string
    timeoutSeconds: number
}

export interface CommandInvocation {
    id: string;
    invocationId: string
    requestedAt: string
    completedAt: string
    Status:  CommandStatus
}

export interface AlertRule {
    id: string;
    name: string
    expression: string
    Severity:  AlertSeverity
}

export interface Alert {
    id: string;
    raisedAt: string
    clearedAt: string
    message: string
    Status:  AlertStatus
}

export interface Tenant {
    id: string;
    name: string
    TenantType:  TenantType
}

export interface TenantUser {
    id: string;
    firstName: string
    lastName: string
    email: string
    Role:  UserRole
}

export interface Site {
    id: string;
    name: string
    address: string
    timezone: string
    latitude: string
    longitude: string
}

export interface Building {
    id: string;
    name: string
}

export interface Floor {
    id: string;
    name: string
    level: number
}

export interface Room {
    id: string;
    name: string
}

export interface Gateway {
    id: string;
    softwareVersion: string
    Status:  DeviceStatus
}

export interface EdgeApplication {
    id: string;
    name: string
    version: string
    image: string
    Status:  DeploymentStatus
}

export interface NetworkProfile {
    id: string;
    profileName: string
    ssid: string
    apn: string
    ConnectivityType:  ConnectivityType
}

export interface SimCard {
    id: string;
    iccid: string
    imsi: string
    carrier: string
    Status:  SimStatus
}

export interface ConnectivityPlan {
    id: string;
    name: string
    dataCapMB: number
    billingCycleDays: number
}

export interface MessagingEndpoint {
    id: string;
    host: string
    port: number
    secure: boolean
    Protocol:  MessagingProtocol
}

export interface AccessPolicy {
    id: string;
    name: string
    scope: string
    expiresAt: string
}

export interface ApiKey {
    id: string;
    keyId: string
    hashedSecret: string
    createdAt: string
    lastUsedAt: string
}

export interface DeviceCertificate {
    id: string;
    serialNumber: string
    notBefore: string
    notAfter: string
    fingerprint: string
    CertificateType:  CertificateType
}

export interface ProvisioningRecord {
    id: string;
    enrolledAt: string
    provisioningService: string
    Method:  ProvisioningMethod
    Status:  ProvisioningStatus
}

export interface DigitalTwin {
    id: string;
    twinId: string
    desiredStateVersion: number
    reportedStateVersion: number
    lastSyncAt: string
}

export interface TwinTemplate {
    id: string;
    name: string
    schemaUri: string
    version: string
}

export interface TwinChangeEvent {
    id: string;
    eventId: string
    occurredAt: string
    ChangeType:  TwinChangeType
}

export interface MaintenanceTicket {
    id: string;
    ticketNumber: string
    openedAt: string
    closedAt: string
    Priority:  MaintenancePriority
    Status:  MaintenanceStatus
}

export interface DataRetentionPolicy {
    id: string;
    name: string
    retentionDays: number
}

export interface SoftwareUpdateCampaign {
    id: string;
    campaignCode: string
    scheduledStart: string
    scheduledEnd: string
    Status:  UpdateCampaignStatus
}

export interface SoftwareUpdateExecution {
    id: string;
    startedAt: string
    completedAt: string
    Status:  UpdateStatus
}

export interface DeviceGroup {
    id: string;
    name: string
    criteria: string
}

export interface UsageRecord {
    id: string;
    periodStart: string
    periodEnd: string
    messagesSent: number
    dataVolumeMB: number
}

