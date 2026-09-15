import {
    DeviceVendor,
    HardwareModule,
    DeviceModel,
    FirmwareRelease,
    IoTDevice,
    SensorInstance,
    ActuatorInstance,
    TelemetrySchema,
    TelemetryStream,
    CommandDefinition,
    CommandInvocation,
    AlertRule,
    Alert,
    Tenant,
    TenantUser,
    Site,
    Building,
    Floor,
    Room,
    Gateway,
    EdgeApplication,
    NetworkProfile,
    SimCard,
    ConnectivityPlan,
    MessagingEndpoint,
    AccessPolicy,
    ApiKey,
    DeviceCertificate,
    ProvisioningRecord,
    DigitalTwin,
    TwinTemplate,
    TwinChangeEvent,
    MaintenanceTicket,
    DataRetentionPolicy,
    SoftwareUpdateCampaign,
    SoftwareUpdateExecution,
    DeviceGroup,
    UsageRecord,
} from "../backend/types.js";


export const typeDefs = `
type Query {

    health: String!

# -----------------------------------------
# DeviceVendor
# -----------------------------------------
    deviceVendor(id: ID!): DeviceVendor
    deviceVendors: DeviceVendorQueryResult

# -----------------------------------------
# HardwareModule
# -----------------------------------------
    hardwareModule(id: ID!): HardwareModule
    hardwareModules: HardwareModuleQueryResult

# -----------------------------------------
# DeviceModel
# -----------------------------------------
    deviceModel(id: ID!): DeviceModel
    deviceModels: DeviceModelQueryResult

# -----------------------------------------
# FirmwareRelease
# -----------------------------------------
    firmwareRelease(id: ID!): FirmwareRelease
    firmwareReleases: FirmwareReleaseQueryResult

# -----------------------------------------
# IoTDevice
# -----------------------------------------
    ioTDevice(id: ID!): IoTDevice
    ioTDevices: IoTDeviceQueryResult

# -----------------------------------------
# SensorInstance
# -----------------------------------------
    sensorInstance(id: ID!): SensorInstance
    sensorInstances: SensorInstanceQueryResult

# -----------------------------------------
# ActuatorInstance
# -----------------------------------------
    actuatorInstance(id: ID!): ActuatorInstance
    actuatorInstances: ActuatorInstanceQueryResult

# -----------------------------------------
# TelemetrySchema
# -----------------------------------------
    telemetrySchema(id: ID!): TelemetrySchema
    telemetrySchemas: TelemetrySchemaQueryResult

# -----------------------------------------
# TelemetryStream
# -----------------------------------------
    telemetryStream(id: ID!): TelemetryStream
    telemetryStreams: TelemetryStreamQueryResult

# -----------------------------------------
# CommandDefinition
# -----------------------------------------
    commandDefinition(id: ID!): CommandDefinition
    commandDefinitions: CommandDefinitionQueryResult

# -----------------------------------------
# CommandInvocation
# -----------------------------------------
    commandInvocation(id: ID!): CommandInvocation
    commandInvocations: CommandInvocationQueryResult

# -----------------------------------------
# AlertRule
# -----------------------------------------
    alertRule(id: ID!): AlertRule
    alertRules: AlertRuleQueryResult

# -----------------------------------------
# Alert
# -----------------------------------------
    alert(id: ID!): Alert
    alerts: AlertQueryResult

# -----------------------------------------
# Tenant
# -----------------------------------------
    tenant(id: ID!): Tenant
    tenants: TenantQueryResult

# -----------------------------------------
# TenantUser
# -----------------------------------------
    tenantUser(id: ID!): TenantUser
    tenantUsers: TenantUserQueryResult

# -----------------------------------------
# Site
# -----------------------------------------
    site(id: ID!): Site
    sites: SiteQueryResult

# -----------------------------------------
# Building
# -----------------------------------------
    building(id: ID!): Building
    buildings: BuildingQueryResult

# -----------------------------------------
# Floor
# -----------------------------------------
    floor(id: ID!): Floor
    floors: FloorQueryResult

# -----------------------------------------
# Room
# -----------------------------------------
    room(id: ID!): Room
    rooms: RoomQueryResult

# -----------------------------------------
# Gateway
# -----------------------------------------
    gateway(id: ID!): Gateway
    gateways: GatewayQueryResult

# -----------------------------------------
# EdgeApplication
# -----------------------------------------
    edgeApplication(id: ID!): EdgeApplication
    edgeApplications: EdgeApplicationQueryResult

# -----------------------------------------
# NetworkProfile
# -----------------------------------------
    networkProfile(id: ID!): NetworkProfile
    networkProfiles: NetworkProfileQueryResult

# -----------------------------------------
# SimCard
# -----------------------------------------
    simCard(id: ID!): SimCard
    simCards: SimCardQueryResult

# -----------------------------------------
# ConnectivityPlan
# -----------------------------------------
    connectivityPlan(id: ID!): ConnectivityPlan
    connectivityPlans: ConnectivityPlanQueryResult

# -----------------------------------------
# MessagingEndpoint
# -----------------------------------------
    messagingEndpoint(id: ID!): MessagingEndpoint
    messagingEndpoints: MessagingEndpointQueryResult

# -----------------------------------------
# AccessPolicy
# -----------------------------------------
    accessPolicy(id: ID!): AccessPolicy
    accessPolicys: AccessPolicyQueryResult

# -----------------------------------------
# ApiKey
# -----------------------------------------
    apiKey(id: ID!): ApiKey
    apiKeys: ApiKeyQueryResult

# -----------------------------------------
# DeviceCertificate
# -----------------------------------------
    deviceCertificate(id: ID!): DeviceCertificate
    deviceCertificates: DeviceCertificateQueryResult

# -----------------------------------------
# ProvisioningRecord
# -----------------------------------------
    provisioningRecord(id: ID!): ProvisioningRecord
    provisioningRecords: ProvisioningRecordQueryResult

# -----------------------------------------
# DigitalTwin
# -----------------------------------------
    digitalTwin(id: ID!): DigitalTwin
    digitalTwins: DigitalTwinQueryResult

# -----------------------------------------
# TwinTemplate
# -----------------------------------------
    twinTemplate(id: ID!): TwinTemplate
    twinTemplates: TwinTemplateQueryResult

# -----------------------------------------
# TwinChangeEvent
# -----------------------------------------
    twinChangeEvent(id: ID!): TwinChangeEvent
    twinChangeEvents: TwinChangeEventQueryResult

# -----------------------------------------
# MaintenanceTicket
# -----------------------------------------
    maintenanceTicket(id: ID!): MaintenanceTicket
    maintenanceTickets: MaintenanceTicketQueryResult

# -----------------------------------------
# DataRetentionPolicy
# -----------------------------------------
    dataRetentionPolicy(id: ID!): DataRetentionPolicy
    dataRetentionPolicys: DataRetentionPolicyQueryResult

# -----------------------------------------
# SoftwareUpdateCampaign
# -----------------------------------------
    softwareUpdateCampaign(id: ID!): SoftwareUpdateCampaign
    softwareUpdateCampaigns: SoftwareUpdateCampaignQueryResult

# -----------------------------------------
# SoftwareUpdateExecution
# -----------------------------------------
    softwareUpdateExecution(id: ID!): SoftwareUpdateExecution
    softwareUpdateExecutions: SoftwareUpdateExecutionQueryResult

# -----------------------------------------
# DeviceGroup
# -----------------------------------------
    deviceGroup(id: ID!): DeviceGroup
    deviceGroups: DeviceGroupQueryResult

# -----------------------------------------
# UsageRecord
# -----------------------------------------
    usageRecord(id: ID!): UsageRecord
    usageRecords: UsageRecordQueryResult

}

# -----------------------------------------
# Write Related Functions
# -----------------------------------------
type Mutation {
addDeviceVendor(
        name: String
        legalName: String
        headquartersCountry: String
        website: String
): DeviceVendor

updateDeviceVendor(
id: ID!
        name: String
        legalName: String
        headquartersCountry: String
        website: String
): DeviceVendor
removeDeviceVendor(id: ID!): Boolean
addHardwareModule(
        moduleCode: String
        datasheetUri: String
        ModuleType:  ModuleType
): HardwareModule

updateHardwareModule(
id: ID!
        moduleCode: String
        datasheetUri: String
        ModuleType:  ModuleType
): HardwareModule
removeHardwareModule(id: ID!): Boolean
addDeviceModel(
        name: String
        modelNumber: String
        hardwareRevision: String
        SupportedConnectivity:  ConnectivityType
        DefaultTelemetryEncoding:  TelemetryEncoding
): DeviceModel

updateDeviceModel(
id: ID!
        name: String
        modelNumber: String
        hardwareRevision: String
        SupportedConnectivity:  ConnectivityType
        DefaultTelemetryEncoding:  TelemetryEncoding
): DeviceModel
removeDeviceModel(id: ID!): Boolean
addFirmwareRelease(
        version: String
        releaseDate: String
        releaseNotes: String
        checksum: String
): FirmwareRelease

updateFirmwareRelease(
id: ID!
        version: String
        releaseDate: String
        releaseNotes: String
        checksum: String
): FirmwareRelease
removeFirmwareRelease(id: ID!): Boolean
addIoTDevice(
        deviceId: String
        serialNumber: String
        lastSeen: String
        firmwareVersion: String
        Status:  DeviceStatus
        PowerSource:  PowerSource
): IoTDevice

updateIoTDevice(
id: ID!
        deviceId: String
        serialNumber: String
        lastSeen: String
        firmwareVersion: String
        Status:  DeviceStatus
        PowerSource:  PowerSource
): IoTDevice
removeIoTDevice(id: ID!): Boolean
addSensorInstance(
        name: String
        unit: String
        samplingIntervalMs: Int
        SensorType:  SensorType
): SensorInstance

updateSensorInstance(
id: ID!
        name: String
        unit: String
        samplingIntervalMs: Int
        SensorType:  SensorType
): SensorInstance
removeSensorInstance(id: ID!): Boolean
addActuatorInstance(
        name: String
        commandTopic: String
        ActuatorType:  ActuatorType
): ActuatorInstance

updateActuatorInstance(
id: ID!
        name: String
        commandTopic: String
        ActuatorType:  ActuatorType
): ActuatorInstance
removeActuatorInstance(id: ID!): Boolean
addTelemetrySchema(
        schemaId: String
        schemaUri: String
        Encoding:  TelemetryEncoding
): TelemetrySchema

updateTelemetrySchema(
id: ID!
        schemaId: String
        schemaUri: String
        Encoding:  TelemetryEncoding
): TelemetrySchema
removeTelemetrySchema(id: ID!): Boolean
addTelemetryStream(
        streamName: String
        retentionDays: Int
        Qos:  MessageQoS
): TelemetryStream

updateTelemetryStream(
id: ID!
        streamName: String
        retentionDays: Int
        Qos:  MessageQoS
): TelemetryStream
removeTelemetryStream(id: ID!): Boolean
addCommandDefinition(
        name: String
        requestSchemaUri: String
        responseSchemaUri: String
        timeoutSeconds: Int
): CommandDefinition

updateCommandDefinition(
id: ID!
        name: String
        requestSchemaUri: String
        responseSchemaUri: String
        timeoutSeconds: Int
): CommandDefinition
removeCommandDefinition(id: ID!): Boolean
addCommandInvocation(
        invocationId: String
        requestedAt: String
        completedAt: String
        Status:  CommandStatus
): CommandInvocation

updateCommandInvocation(
id: ID!
        invocationId: String
        requestedAt: String
        completedAt: String
        Status:  CommandStatus
): CommandInvocation
removeCommandInvocation(id: ID!): Boolean
addAlertRule(
        name: String
        expression: String
        Severity:  AlertSeverity
): AlertRule

updateAlertRule(
id: ID!
        name: String
        expression: String
        Severity:  AlertSeverity
): AlertRule
removeAlertRule(id: ID!): Boolean
addAlert(
        raisedAt: String
        clearedAt: String
        message: String
        Status:  AlertStatus
): Alert

updateAlert(
id: ID!
        raisedAt: String
        clearedAt: String
        message: String
        Status:  AlertStatus
): Alert
removeAlert(id: ID!): Boolean
addTenant(
        name: String
        TenantType:  TenantType
): Tenant

updateTenant(
id: ID!
        name: String
        TenantType:  TenantType
): Tenant
removeTenant(id: ID!): Boolean
addTenantUser(
        firstName: String
        lastName: String
        email: String
        Role:  UserRole
): TenantUser

updateTenantUser(
id: ID!
        firstName: String
        lastName: String
        email: String
        Role:  UserRole
): TenantUser
removeTenantUser(id: ID!): Boolean
addSite(
        name: String
        address: String
        timezone: String
        latitude: String
        longitude: String
): Site

updateSite(
id: ID!
        name: String
        address: String
        timezone: String
        latitude: String
        longitude: String
): Site
removeSite(id: ID!): Boolean
addBuilding(
        name: String
): Building

updateBuilding(
id: ID!
        name: String
): Building
removeBuilding(id: ID!): Boolean
addFloor(
        name: String
        level: Int
): Floor

updateFloor(
id: ID!
        name: String
        level: Int
): Floor
removeFloor(id: ID!): Boolean
addRoom(
        name: String
): Room

updateRoom(
id: ID!
        name: String
): Room
removeRoom(id: ID!): Boolean
addGateway(
        softwareVersion: String
        Status:  DeviceStatus
): Gateway

updateGateway(
id: ID!
        softwareVersion: String
        Status:  DeviceStatus
): Gateway
removeGateway(id: ID!): Boolean
addEdgeApplication(
        name: String
        version: String
        image: String
        Status:  DeploymentStatus
): EdgeApplication

updateEdgeApplication(
id: ID!
        name: String
        version: String
        image: String
        Status:  DeploymentStatus
): EdgeApplication
removeEdgeApplication(id: ID!): Boolean
addNetworkProfile(
        profileName: String
        ssid: String
        apn: String
        ConnectivityType:  ConnectivityType
): NetworkProfile

updateNetworkProfile(
id: ID!
        profileName: String
        ssid: String
        apn: String
        ConnectivityType:  ConnectivityType
): NetworkProfile
removeNetworkProfile(id: ID!): Boolean
addSimCard(
        iccid: String
        imsi: String
        carrier: String
        Status:  SimStatus
): SimCard

updateSimCard(
id: ID!
        iccid: String
        imsi: String
        carrier: String
        Status:  SimStatus
): SimCard
removeSimCard(id: ID!): Boolean
addConnectivityPlan(
        name: String
        dataCapMB: Int
        billingCycleDays: Int
): ConnectivityPlan

updateConnectivityPlan(
id: ID!
        name: String
        dataCapMB: Int
        billingCycleDays: Int
): ConnectivityPlan
removeConnectivityPlan(id: ID!): Boolean
addMessagingEndpoint(
        host: String
        port: Int
        secure: Boolean
        Protocol:  MessagingProtocol
): MessagingEndpoint

updateMessagingEndpoint(
id: ID!
        host: String
        port: Int
        secure: Boolean
        Protocol:  MessagingProtocol
): MessagingEndpoint
removeMessagingEndpoint(id: ID!): Boolean
addAccessPolicy(
        name: String
        scope: String
        expiresAt: String
): AccessPolicy

updateAccessPolicy(
id: ID!
        name: String
        scope: String
        expiresAt: String
): AccessPolicy
removeAccessPolicy(id: ID!): Boolean
addApiKey(
        keyId: String
        hashedSecret: String
        createdAt: String
        lastUsedAt: String
): ApiKey

updateApiKey(
id: ID!
        keyId: String
        hashedSecret: String
        createdAt: String
        lastUsedAt: String
): ApiKey
removeApiKey(id: ID!): Boolean
addDeviceCertificate(
        serialNumber: String
        notBefore: String
        notAfter: String
        fingerprint: String
        CertificateType:  CertificateType
): DeviceCertificate

updateDeviceCertificate(
id: ID!
        serialNumber: String
        notBefore: String
        notAfter: String
        fingerprint: String
        CertificateType:  CertificateType
): DeviceCertificate
removeDeviceCertificate(id: ID!): Boolean
addProvisioningRecord(
        enrolledAt: String
        provisioningService: String
        Method:  ProvisioningMethod
        Status:  ProvisioningStatus
): ProvisioningRecord

updateProvisioningRecord(
id: ID!
        enrolledAt: String
        provisioningService: String
        Method:  ProvisioningMethod
        Status:  ProvisioningStatus
): ProvisioningRecord
removeProvisioningRecord(id: ID!): Boolean
addDigitalTwin(
        twinId: String
        desiredStateVersion: Int
        reportedStateVersion: Int
        lastSyncAt: String
): DigitalTwin

updateDigitalTwin(
id: ID!
        twinId: String
        desiredStateVersion: Int
        reportedStateVersion: Int
        lastSyncAt: String
): DigitalTwin
removeDigitalTwin(id: ID!): Boolean
addTwinTemplate(
        name: String
        schemaUri: String
        version: String
): TwinTemplate

updateTwinTemplate(
id: ID!
        name: String
        schemaUri: String
        version: String
): TwinTemplate
removeTwinTemplate(id: ID!): Boolean
addTwinChangeEvent(
        eventId: String
        occurredAt: String
        ChangeType:  TwinChangeType
): TwinChangeEvent

updateTwinChangeEvent(
id: ID!
        eventId: String
        occurredAt: String
        ChangeType:  TwinChangeType
): TwinChangeEvent
removeTwinChangeEvent(id: ID!): Boolean
addMaintenanceTicket(
        ticketNumber: String
        openedAt: String
        closedAt: String
        Priority:  MaintenancePriority
        Status:  MaintenanceStatus
): MaintenanceTicket

updateMaintenanceTicket(
id: ID!
        ticketNumber: String
        openedAt: String
        closedAt: String
        Priority:  MaintenancePriority
        Status:  MaintenanceStatus
): MaintenanceTicket
removeMaintenanceTicket(id: ID!): Boolean
addDataRetentionPolicy(
        name: String
        retentionDays: Int
): DataRetentionPolicy

updateDataRetentionPolicy(
id: ID!
        name: String
        retentionDays: Int
): DataRetentionPolicy
removeDataRetentionPolicy(id: ID!): Boolean
addSoftwareUpdateCampaign(
        campaignCode: String
        scheduledStart: String
        scheduledEnd: String
        Status:  UpdateCampaignStatus
): SoftwareUpdateCampaign

updateSoftwareUpdateCampaign(
id: ID!
        campaignCode: String
        scheduledStart: String
        scheduledEnd: String
        Status:  UpdateCampaignStatus
): SoftwareUpdateCampaign
removeSoftwareUpdateCampaign(id: ID!): Boolean
addSoftwareUpdateExecution(
        startedAt: String
        completedAt: String
        Status:  UpdateStatus
): SoftwareUpdateExecution

updateSoftwareUpdateExecution(
id: ID!
        startedAt: String
        completedAt: String
        Status:  UpdateStatus
): SoftwareUpdateExecution
removeSoftwareUpdateExecution(id: ID!): Boolean
addDeviceGroup(
        name: String
        criteria: String
): DeviceGroup

updateDeviceGroup(
id: ID!
        name: String
        criteria: String
): DeviceGroup
removeDeviceGroup(id: ID!): Boolean
addUsageRecord(
        periodStart: String
        periodEnd: String
        messagesSent: Int
        dataVolumeMB: Int
): UsageRecord

updateUsageRecord(
id: ID!
        periodStart: String
        periodEnd: String
        messagesSent: Int
        dataVolumeMB: Int
): UsageRecord
removeUsageRecord(id: ID!): Boolean
}

# -----------------------------------------
# DeviceVendor
# -----------------------------------------
type DeviceVendor {
id: ID!
        name: String
        legalName: String
        headquartersCountry: String
        website: String
        deviceModels:  [DeviceModel]
        firmwareReleases:  [FirmwareRelease]
        hardwareModules:  [HardwareModule]
    getDeviceModels( parentId: ID! ): [DeviceModel]!
    addToDeviceModels( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromDeviceModels( parentId: ID!, childIds: [ID]! ): Boolean!
    getFirmwareReleases( parentId: ID! ): [FirmwareRelease]!
    addToFirmwareReleases( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromFirmwareReleases( parentId: ID!, childIds: [ID]! ): Boolean!
    getHardwareModules( parentId: ID! ): [HardwareModule]!
    addToHardwareModules( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromHardwareModules( parentId: ID!, childIds: [ID]! ): Boolean!

}

type DeviceVendorQueryResult {
cursor: String
hasMore: Boolean!
    deviceVendorPage: [DeviceVendor]
}

# -----------------------------------------
# HardwareModule
# -----------------------------------------
type HardwareModule {
id: ID!
        moduleCode: String
        datasheetUri: String
        vendor: DeviceVendor
        moduleType:  ModuleType
    addVendor(
            name: String
            legalName: String
            headquartersCountry: String
            website: String
    ): HardwareModule
    getVendor( parentId: ID! ): HardwareModule
    assignVendor( parentId: ID!, childId: ID! ): Boolean!
    unassignVendor( parentId: ID!, childId: ID! ): Boolean!
}

type HardwareModuleQueryResult {
cursor: String
hasMore: Boolean!
    hardwareModulePage: [HardwareModule]
}

# -----------------------------------------
# DeviceModel
# -----------------------------------------
type DeviceModel {
id: ID!
        name: String
        modelNumber: String
        hardwareRevision: String
        vendor: DeviceVendor
        hardwareModules:  [HardwareModule]
        twinTemplate: TwinTemplate
        firmwareReleases:  [FirmwareRelease]
        commandDefinitions:  [CommandDefinition]
        supportedConnectivity:  ConnectivityType
        defaultTelemetryEncoding:  TelemetryEncoding
    addVendor(
            name: String
            legalName: String
            headquartersCountry: String
            website: String
    ): DeviceModel
    getVendor( parentId: ID! ): DeviceModel
    assignVendor( parentId: ID!, childId: ID! ): Boolean!
    unassignVendor( parentId: ID!, childId: ID! ): Boolean!    addTwinTemplate(
            name: String
            schemaUri: String
            version: String
    ): DeviceModel
    getTwinTemplate( parentId: ID! ): DeviceModel
    assignTwinTemplate( parentId: ID!, childId: ID! ): Boolean!
    unassignTwinTemplate( parentId: ID!, childId: ID! ): Boolean!    getHardwareModules( parentId: ID! ): [HardwareModule]!
    addToHardwareModules( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromHardwareModules( parentId: ID!, childIds: [ID]! ): Boolean!
    getFirmwareReleases( parentId: ID! ): [FirmwareRelease]!
    addToFirmwareReleases( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromFirmwareReleases( parentId: ID!, childIds: [ID]! ): Boolean!
    getCommandDefinitions( parentId: ID! ): [CommandDefinition]!
    addToCommandDefinitions( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromCommandDefinitions( parentId: ID!, childIds: [ID]! ): Boolean!

}

type DeviceModelQueryResult {
cursor: String
hasMore: Boolean!
    deviceModelPage: [DeviceModel]
}

# -----------------------------------------
# FirmwareRelease
# -----------------------------------------
type FirmwareRelease {
id: ID!
        version: String
        releaseDate: String
        releaseNotes: String
        checksum: String
        deviceModel: DeviceModel
    addDeviceModel(
            name: String
            modelNumber: String
            hardwareRevision: String
            SupportedConnectivity:  ConnectivityType
            DefaultTelemetryEncoding:  TelemetryEncoding
    ): FirmwareRelease
    getDeviceModel( parentId: ID! ): FirmwareRelease
    assignDeviceModel( parentId: ID!, childId: ID! ): Boolean!
    unassignDeviceModel( parentId: ID!, childId: ID! ): Boolean!
}

type FirmwareReleaseQueryResult {
cursor: String
hasMore: Boolean!
    firmwareReleasePage: [FirmwareRelease]
}

# -----------------------------------------
# IoTDevice
# -----------------------------------------
type IoTDevice {
id: ID!
        deviceId: String
        serialNumber: String
        lastSeen: String
        firmwareVersion: String
        deviceModel: DeviceModel
        tenant: Tenant
        site: Site
        room: Room
        gateway: Gateway
        sensors:  [SensorInstance]
        actuators:  [ActuatorInstance]
        certificates:  [DeviceCertificate]
        digitalTwin: DigitalTwin
        telemetryStreams:  [TelemetryStream]
        commandInvocations:  [CommandInvocation]
        alerts:  [Alert]
        provisioningRecord: ProvisioningRecord
        deviceGroups:  [DeviceGroup]
        networkProfiles:  [NetworkProfile]
        status:  DeviceStatus
        powerSource:  PowerSource
    addDeviceModel(
            name: String
            modelNumber: String
            hardwareRevision: String
            SupportedConnectivity:  ConnectivityType
            DefaultTelemetryEncoding:  TelemetryEncoding
    ): IoTDevice
    getDeviceModel( parentId: ID! ): IoTDevice
    assignDeviceModel( parentId: ID!, childId: ID! ): Boolean!
    unassignDeviceModel( parentId: ID!, childId: ID! ): Boolean!    addTenant(
            name: String
            TenantType:  TenantType
    ): IoTDevice
    getTenant( parentId: ID! ): IoTDevice
    assignTenant( parentId: ID!, childId: ID! ): Boolean!
    unassignTenant( parentId: ID!, childId: ID! ): Boolean!    addSite(
            name: String
            address: String
            timezone: String
            latitude: String
            longitude: String
    ): IoTDevice
    getSite( parentId: ID! ): IoTDevice
    assignSite( parentId: ID!, childId: ID! ): Boolean!
    unassignSite( parentId: ID!, childId: ID! ): Boolean!    addRoom(
            name: String
    ): IoTDevice
    getRoom( parentId: ID! ): IoTDevice
    assignRoom( parentId: ID!, childId: ID! ): Boolean!
    unassignRoom( parentId: ID!, childId: ID! ): Boolean!    addGateway(
            softwareVersion: String
            Status:  DeviceStatus
    ): IoTDevice
    getGateway( parentId: ID! ): IoTDevice
    assignGateway( parentId: ID!, childId: ID! ): Boolean!
    unassignGateway( parentId: ID!, childId: ID! ): Boolean!    addDigitalTwin(
            twinId: String
            desiredStateVersion: Int
            reportedStateVersion: Int
            lastSyncAt: String
    ): IoTDevice
    getDigitalTwin( parentId: ID! ): IoTDevice
    assignDigitalTwin( parentId: ID!, childId: ID! ): Boolean!
    unassignDigitalTwin( parentId: ID!, childId: ID! ): Boolean!    addProvisioningRecord(
            enrolledAt: String
            provisioningService: String
            Method:  ProvisioningMethod
            Status:  ProvisioningStatus
    ): IoTDevice
    getProvisioningRecord( parentId: ID! ): IoTDevice
    assignProvisioningRecord( parentId: ID!, childId: ID! ): Boolean!
    unassignProvisioningRecord( parentId: ID!, childId: ID! ): Boolean!    getSensors( parentId: ID! ): [SensorInstance]!
    addToSensors( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromSensors( parentId: ID!, childIds: [ID]! ): Boolean!
    getActuators( parentId: ID! ): [ActuatorInstance]!
    addToActuators( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromActuators( parentId: ID!, childIds: [ID]! ): Boolean!
    getCertificates( parentId: ID! ): [DeviceCertificate]!
    addToCertificates( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromCertificates( parentId: ID!, childIds: [ID]! ): Boolean!
    getTelemetryStreams( parentId: ID! ): [TelemetryStream]!
    addToTelemetryStreams( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromTelemetryStreams( parentId: ID!, childIds: [ID]! ): Boolean!
    getCommandInvocations( parentId: ID! ): [CommandInvocation]!
    addToCommandInvocations( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromCommandInvocations( parentId: ID!, childIds: [ID]! ): Boolean!
    getAlerts( parentId: ID! ): [Alert]!
    addToAlerts( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromAlerts( parentId: ID!, childIds: [ID]! ): Boolean!
    getDeviceGroups( parentId: ID! ): [DeviceGroup]!
    addToDeviceGroups( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromDeviceGroups( parentId: ID!, childIds: [ID]! ): Boolean!
    getNetworkProfiles( parentId: ID! ): [NetworkProfile]!
    addToNetworkProfiles( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromNetworkProfiles( parentId: ID!, childIds: [ID]! ): Boolean!

}

type IoTDeviceQueryResult {
cursor: String
hasMore: Boolean!
    ioTDevicePage: [IoTDevice]
}

# -----------------------------------------
# SensorInstance
# -----------------------------------------
type SensorInstance {
id: ID!
        name: String
        unit: String
        samplingIntervalMs: Int
        device: IoTDevice
        telemetryStreams:  [TelemetryStream]
        sensorType:  SensorType
    addDevice(
            deviceId: String
            serialNumber: String
            lastSeen: String
            firmwareVersion: String
            Status:  DeviceStatus
            PowerSource:  PowerSource
    ): SensorInstance
    getDevice( parentId: ID! ): SensorInstance
    assignDevice( parentId: ID!, childId: ID! ): Boolean!
    unassignDevice( parentId: ID!, childId: ID! ): Boolean!    getTelemetryStreams( parentId: ID! ): [TelemetryStream]!
    addToTelemetryStreams( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromTelemetryStreams( parentId: ID!, childIds: [ID]! ): Boolean!

}

type SensorInstanceQueryResult {
cursor: String
hasMore: Boolean!
    sensorInstancePage: [SensorInstance]
}

# -----------------------------------------
# ActuatorInstance
# -----------------------------------------
type ActuatorInstance {
id: ID!
        name: String
        commandTopic: String
        device: IoTDevice
        supportedCommands:  [CommandDefinition]
        actuatorType:  ActuatorType
    addDevice(
            deviceId: String
            serialNumber: String
            lastSeen: String
            firmwareVersion: String
            Status:  DeviceStatus
            PowerSource:  PowerSource
    ): ActuatorInstance
    getDevice( parentId: ID! ): ActuatorInstance
    assignDevice( parentId: ID!, childId: ID! ): Boolean!
    unassignDevice( parentId: ID!, childId: ID! ): Boolean!    getSupportedCommands( parentId: ID! ): [CommandDefinition]!
    addToSupportedCommands( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromSupportedCommands( parentId: ID!, childIds: [ID]! ): Boolean!

}

type ActuatorInstanceQueryResult {
cursor: String
hasMore: Boolean!
    actuatorInstancePage: [ActuatorInstance]
}

# -----------------------------------------
# TelemetrySchema
# -----------------------------------------
type TelemetrySchema {
id: ID!
        schemaId: String
        schemaUri: String
        streams:  [TelemetryStream]
        encoding:  TelemetryEncoding
    getStreams( parentId: ID! ): [TelemetryStream]!
    addToStreams( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromStreams( parentId: ID!, childIds: [ID]! ): Boolean!

}

type TelemetrySchemaQueryResult {
cursor: String
hasMore: Boolean!
    telemetrySchemaPage: [TelemetrySchema]
}

# -----------------------------------------
# TelemetryStream
# -----------------------------------------
type TelemetryStream {
id: ID!
        streamName: String
        retentionDays: Int
        device: IoTDevice
        sensor: SensorInstance
        schema: TelemetrySchema
        messagingEndpoint: MessagingEndpoint
        retentionPolicy: DataRetentionPolicy
        qos:  MessageQoS
    addDevice(
            deviceId: String
            serialNumber: String
            lastSeen: String
            firmwareVersion: String
            Status:  DeviceStatus
            PowerSource:  PowerSource
    ): TelemetryStream
    getDevice( parentId: ID! ): TelemetryStream
    assignDevice( parentId: ID!, childId: ID! ): Boolean!
    unassignDevice( parentId: ID!, childId: ID! ): Boolean!    addSensor(
            name: String
            unit: String
            samplingIntervalMs: Int
            SensorType:  SensorType
    ): TelemetryStream
    getSensor( parentId: ID! ): TelemetryStream
    assignSensor( parentId: ID!, childId: ID! ): Boolean!
    unassignSensor( parentId: ID!, childId: ID! ): Boolean!    addSchema(
            schemaId: String
            schemaUri: String
            Encoding:  TelemetryEncoding
    ): TelemetryStream
    getSchema( parentId: ID! ): TelemetryStream
    assignSchema( parentId: ID!, childId: ID! ): Boolean!
    unassignSchema( parentId: ID!, childId: ID! ): Boolean!    addMessagingEndpoint(
            host: String
            port: Int
            secure: Boolean
            Protocol:  MessagingProtocol
    ): TelemetryStream
    getMessagingEndpoint( parentId: ID! ): TelemetryStream
    assignMessagingEndpoint( parentId: ID!, childId: ID! ): Boolean!
    unassignMessagingEndpoint( parentId: ID!, childId: ID! ): Boolean!    addRetentionPolicy(
            name: String
            retentionDays: Int
    ): TelemetryStream
    getRetentionPolicy( parentId: ID! ): TelemetryStream
    assignRetentionPolicy( parentId: ID!, childId: ID! ): Boolean!
    unassignRetentionPolicy( parentId: ID!, childId: ID! ): Boolean!
}

type TelemetryStreamQueryResult {
cursor: String
hasMore: Boolean!
    telemetryStreamPage: [TelemetryStream]
}

# -----------------------------------------
# CommandDefinition
# -----------------------------------------
type CommandDefinition {
id: ID!
        name: String
        requestSchemaUri: String
        responseSchemaUri: String
        timeoutSeconds: Int
        deviceModel: DeviceModel
        actuators:  [ActuatorInstance]
        commandInvocations:  [CommandInvocation]
    addDeviceModel(
            name: String
            modelNumber: String
            hardwareRevision: String
            SupportedConnectivity:  ConnectivityType
            DefaultTelemetryEncoding:  TelemetryEncoding
    ): CommandDefinition
    getDeviceModel( parentId: ID! ): CommandDefinition
    assignDeviceModel( parentId: ID!, childId: ID! ): Boolean!
    unassignDeviceModel( parentId: ID!, childId: ID! ): Boolean!    getActuators( parentId: ID! ): [ActuatorInstance]!
    addToActuators( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromActuators( parentId: ID!, childIds: [ID]! ): Boolean!
    getCommandInvocations( parentId: ID! ): [CommandInvocation]!
    addToCommandInvocations( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromCommandInvocations( parentId: ID!, childIds: [ID]! ): Boolean!

}

type CommandDefinitionQueryResult {
cursor: String
hasMore: Boolean!
    commandDefinitionPage: [CommandDefinition]
}

# -----------------------------------------
# CommandInvocation
# -----------------------------------------
type CommandInvocation {
id: ID!
        invocationId: String
        requestedAt: String
        completedAt: String
        device: IoTDevice
        commandDefinition: CommandDefinition
        actuator: ActuatorInstance
        user: TenantUser
        status:  CommandStatus
    addDevice(
            deviceId: String
            serialNumber: String
            lastSeen: String
            firmwareVersion: String
            Status:  DeviceStatus
            PowerSource:  PowerSource
    ): CommandInvocation
    getDevice( parentId: ID! ): CommandInvocation
    assignDevice( parentId: ID!, childId: ID! ): Boolean!
    unassignDevice( parentId: ID!, childId: ID! ): Boolean!    addCommandDefinition(
            name: String
            requestSchemaUri: String
            responseSchemaUri: String
            timeoutSeconds: Int
    ): CommandInvocation
    getCommandDefinition( parentId: ID! ): CommandInvocation
    assignCommandDefinition( parentId: ID!, childId: ID! ): Boolean!
    unassignCommandDefinition( parentId: ID!, childId: ID! ): Boolean!    addActuator(
            name: String
            commandTopic: String
            ActuatorType:  ActuatorType
    ): CommandInvocation
    getActuator( parentId: ID! ): CommandInvocation
    assignActuator( parentId: ID!, childId: ID! ): Boolean!
    unassignActuator( parentId: ID!, childId: ID! ): Boolean!    addUser(
            firstName: String
            lastName: String
            email: String
            Role:  UserRole
    ): CommandInvocation
    getUser( parentId: ID! ): CommandInvocation
    assignUser( parentId: ID!, childId: ID! ): Boolean!
    unassignUser( parentId: ID!, childId: ID! ): Boolean!
}

type CommandInvocationQueryResult {
cursor: String
hasMore: Boolean!
    commandInvocationPage: [CommandInvocation]
}

# -----------------------------------------
# AlertRule
# -----------------------------------------
type AlertRule {
id: ID!
        name: String
        expression: String
        tenant: Tenant
        streams:  [TelemetryStream]
        alerts:  [Alert]
        severity:  AlertSeverity
    addTenant(
            name: String
            TenantType:  TenantType
    ): AlertRule
    getTenant( parentId: ID! ): AlertRule
    assignTenant( parentId: ID!, childId: ID! ): Boolean!
    unassignTenant( parentId: ID!, childId: ID! ): Boolean!    getStreams( parentId: ID! ): [TelemetryStream]!
    addToStreams( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromStreams( parentId: ID!, childIds: [ID]! ): Boolean!
    getAlerts( parentId: ID! ): [Alert]!
    addToAlerts( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromAlerts( parentId: ID!, childIds: [ID]! ): Boolean!

}

type AlertRuleQueryResult {
cursor: String
hasMore: Boolean!
    alertRulePage: [AlertRule]
}

# -----------------------------------------
# Alert
# -----------------------------------------
type Alert {
id: ID!
        raisedAt: String
        clearedAt: String
        message: String
        device: IoTDevice
        alertRule: AlertRule
        status:  AlertStatus
    addDevice(
            deviceId: String
            serialNumber: String
            lastSeen: String
            firmwareVersion: String
            Status:  DeviceStatus
            PowerSource:  PowerSource
    ): Alert
    getDevice( parentId: ID! ): Alert
    assignDevice( parentId: ID!, childId: ID! ): Boolean!
    unassignDevice( parentId: ID!, childId: ID! ): Boolean!    addAlertRule(
            name: String
            expression: String
            Severity:  AlertSeverity
    ): Alert
    getAlertRule( parentId: ID! ): Alert
    assignAlertRule( parentId: ID!, childId: ID! ): Boolean!
    unassignAlertRule( parentId: ID!, childId: ID! ): Boolean!
}

type AlertQueryResult {
cursor: String
hasMore: Boolean!
    alertPage: [Alert]
}

# -----------------------------------------
# Tenant
# -----------------------------------------
type Tenant {
id: ID!
        name: String
        sites:  [Site]
        users:  [TenantUser]
        devices:  [IoTDevice]
        dataRetentionPolicies:  [DataRetentionPolicy]
        connectivityPlans:  [ConnectivityPlan]
        simCards:  [SimCard]
        messagingEndpoints:  [MessagingEndpoint]
        accessPolicies:  [AccessPolicy]
        deviceGroups:  [DeviceGroup]
        alertRules:  [AlertRule]
        maintenanceTickets:  [MaintenanceTicket]
        usageRecords:  [UsageRecord]
        tenantType:  TenantType
    getSites( parentId: ID! ): [Site]!
    addToSites( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromSites( parentId: ID!, childIds: [ID]! ): Boolean!
    getUsers( parentId: ID! ): [TenantUser]!
    addToUsers( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromUsers( parentId: ID!, childIds: [ID]! ): Boolean!
    getDevices( parentId: ID! ): [IoTDevice]!
    addToDevices( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromDevices( parentId: ID!, childIds: [ID]! ): Boolean!
    getDataRetentionPolicies( parentId: ID! ): [DataRetentionPolicy]!
    addToDataRetentionPolicies( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromDataRetentionPolicies( parentId: ID!, childIds: [ID]! ): Boolean!
    getConnectivityPlans( parentId: ID! ): [ConnectivityPlan]!
    addToConnectivityPlans( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromConnectivityPlans( parentId: ID!, childIds: [ID]! ): Boolean!
    getSimCards( parentId: ID! ): [SimCard]!
    addToSimCards( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromSimCards( parentId: ID!, childIds: [ID]! ): Boolean!
    getMessagingEndpoints( parentId: ID! ): [MessagingEndpoint]!
    addToMessagingEndpoints( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromMessagingEndpoints( parentId: ID!, childIds: [ID]! ): Boolean!
    getAccessPolicies( parentId: ID! ): [AccessPolicy]!
    addToAccessPolicies( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromAccessPolicies( parentId: ID!, childIds: [ID]! ): Boolean!
    getDeviceGroups( parentId: ID! ): [DeviceGroup]!
    addToDeviceGroups( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromDeviceGroups( parentId: ID!, childIds: [ID]! ): Boolean!
    getAlertRules( parentId: ID! ): [AlertRule]!
    addToAlertRules( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromAlertRules( parentId: ID!, childIds: [ID]! ): Boolean!
    getMaintenanceTickets( parentId: ID! ): [MaintenanceTicket]!
    addToMaintenanceTickets( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromMaintenanceTickets( parentId: ID!, childIds: [ID]! ): Boolean!
    getUsageRecords( parentId: ID! ): [UsageRecord]!
    addToUsageRecords( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromUsageRecords( parentId: ID!, childIds: [ID]! ): Boolean!

}

type TenantQueryResult {
cursor: String
hasMore: Boolean!
    tenantPage: [Tenant]
}

# -----------------------------------------
# TenantUser
# -----------------------------------------
type TenantUser {
id: ID!
        firstName: String
        lastName: String
        email: String
        tenant: Tenant
        commandInvocations:  [CommandInvocation]
        role:  UserRole
    addTenant(
            name: String
            TenantType:  TenantType
    ): TenantUser
    getTenant( parentId: ID! ): TenantUser
    assignTenant( parentId: ID!, childId: ID! ): Boolean!
    unassignTenant( parentId: ID!, childId: ID! ): Boolean!    getCommandInvocations( parentId: ID! ): [CommandInvocation]!
    addToCommandInvocations( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromCommandInvocations( parentId: ID!, childIds: [ID]! ): Boolean!

}

type TenantUserQueryResult {
cursor: String
hasMore: Boolean!
    tenantUserPage: [TenantUser]
}

# -----------------------------------------
# Site
# -----------------------------------------
type Site {
id: ID!
        name: String
        address: String
        timezone: String
        latitude: String
        longitude: String
        tenant: Tenant
        buildings:  [Building]
        devices:  [IoTDevice]
        gateways:  [Gateway]
    addTenant(
            name: String
            TenantType:  TenantType
    ): Site
    getTenant( parentId: ID! ): Site
    assignTenant( parentId: ID!, childId: ID! ): Boolean!
    unassignTenant( parentId: ID!, childId: ID! ): Boolean!    getBuildings( parentId: ID! ): [Building]!
    addToBuildings( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromBuildings( parentId: ID!, childIds: [ID]! ): Boolean!
    getDevices( parentId: ID! ): [IoTDevice]!
    addToDevices( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromDevices( parentId: ID!, childIds: [ID]! ): Boolean!
    getGateways( parentId: ID! ): [Gateway]!
    addToGateways( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromGateways( parentId: ID!, childIds: [ID]! ): Boolean!

}

type SiteQueryResult {
cursor: String
hasMore: Boolean!
    sitePage: [Site]
}

# -----------------------------------------
# Building
# -----------------------------------------
type Building {
id: ID!
        name: String
        site: Site
        floors:  [Floor]
    addSite(
            name: String
            address: String
            timezone: String
            latitude: String
            longitude: String
    ): Building
    getSite( parentId: ID! ): Building
    assignSite( parentId: ID!, childId: ID! ): Boolean!
    unassignSite( parentId: ID!, childId: ID! ): Boolean!    getFloors( parentId: ID! ): [Floor]!
    addToFloors( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromFloors( parentId: ID!, childIds: [ID]! ): Boolean!

}

type BuildingQueryResult {
cursor: String
hasMore: Boolean!
    buildingPage: [Building]
}

# -----------------------------------------
# Floor
# -----------------------------------------
type Floor {
id: ID!
        name: String
        level: Int
        building: Building
        rooms:  [Room]
    addBuilding(
            name: String
    ): Floor
    getBuilding( parentId: ID! ): Floor
    assignBuilding( parentId: ID!, childId: ID! ): Boolean!
    unassignBuilding( parentId: ID!, childId: ID! ): Boolean!    getRooms( parentId: ID! ): [Room]!
    addToRooms( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromRooms( parentId: ID!, childIds: [ID]! ): Boolean!

}

type FloorQueryResult {
cursor: String
hasMore: Boolean!
    floorPage: [Floor]
}

# -----------------------------------------
# Room
# -----------------------------------------
type Room {
id: ID!
        name: String
        floor: Floor
        devices:  [IoTDevice]
        gateways:  [Gateway]
    addFloor(
            name: String
            level: Int
    ): Room
    getFloor( parentId: ID! ): Room
    assignFloor( parentId: ID!, childId: ID! ): Boolean!
    unassignFloor( parentId: ID!, childId: ID! ): Boolean!    getDevices( parentId: ID! ): [IoTDevice]!
    addToDevices( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromDevices( parentId: ID!, childIds: [ID]! ): Boolean!
    getGateways( parentId: ID! ): [Gateway]!
    addToGateways( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromGateways( parentId: ID!, childIds: [ID]! ): Boolean!

}

type RoomQueryResult {
cursor: String
hasMore: Boolean!
    roomPage: [Room]
}

# -----------------------------------------
# Gateway
# -----------------------------------------
type Gateway {
id: ID!
        softwareVersion: String
        site: Site
        room: Room
        devices:  [IoTDevice]
        edgeApplications:  [EdgeApplication]
        certificates:  [DeviceCertificate]
        digitalTwin: DigitalTwin
        networkProfiles:  [NetworkProfile]
        status:  DeviceStatus
    addSite(
            name: String
            address: String
            timezone: String
            latitude: String
            longitude: String
    ): Gateway
    getSite( parentId: ID! ): Gateway
    assignSite( parentId: ID!, childId: ID! ): Boolean!
    unassignSite( parentId: ID!, childId: ID! ): Boolean!    addRoom(
            name: String
    ): Gateway
    getRoom( parentId: ID! ): Gateway
    assignRoom( parentId: ID!, childId: ID! ): Boolean!
    unassignRoom( parentId: ID!, childId: ID! ): Boolean!    addDigitalTwin(
            twinId: String
            desiredStateVersion: Int
            reportedStateVersion: Int
            lastSyncAt: String
    ): Gateway
    getDigitalTwin( parentId: ID! ): Gateway
    assignDigitalTwin( parentId: ID!, childId: ID! ): Boolean!
    unassignDigitalTwin( parentId: ID!, childId: ID! ): Boolean!    getDevices( parentId: ID! ): [IoTDevice]!
    addToDevices( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromDevices( parentId: ID!, childIds: [ID]! ): Boolean!
    getEdgeApplications( parentId: ID! ): [EdgeApplication]!
    addToEdgeApplications( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromEdgeApplications( parentId: ID!, childIds: [ID]! ): Boolean!
    getCertificates( parentId: ID! ): [DeviceCertificate]!
    addToCertificates( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromCertificates( parentId: ID!, childIds: [ID]! ): Boolean!
    getNetworkProfiles( parentId: ID! ): [NetworkProfile]!
    addToNetworkProfiles( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromNetworkProfiles( parentId: ID!, childIds: [ID]! ): Boolean!

}

type GatewayQueryResult {
cursor: String
hasMore: Boolean!
    gatewayPage: [Gateway]
}

# -----------------------------------------
# EdgeApplication
# -----------------------------------------
type EdgeApplication {
id: ID!
        name: String
        version: String
        image: String
        gateway: Gateway
        status:  DeploymentStatus
    addGateway(
            softwareVersion: String
            Status:  DeviceStatus
    ): EdgeApplication
    getGateway( parentId: ID! ): EdgeApplication
    assignGateway( parentId: ID!, childId: ID! ): Boolean!
    unassignGateway( parentId: ID!, childId: ID! ): Boolean!
}

type EdgeApplicationQueryResult {
cursor: String
hasMore: Boolean!
    edgeApplicationPage: [EdgeApplication]
}

# -----------------------------------------
# NetworkProfile
# -----------------------------------------
type NetworkProfile {
id: ID!
        profileName: String
        ssid: String
        apn: String
        device: IoTDevice
        gateway: Gateway
        simCard: SimCard
        connectivityType:  ConnectivityType
    addDevice(
            deviceId: String
            serialNumber: String
            lastSeen: String
            firmwareVersion: String
            Status:  DeviceStatus
            PowerSource:  PowerSource
    ): NetworkProfile
    getDevice( parentId: ID! ): NetworkProfile
    assignDevice( parentId: ID!, childId: ID! ): Boolean!
    unassignDevice( parentId: ID!, childId: ID! ): Boolean!    addGateway(
            softwareVersion: String
            Status:  DeviceStatus
    ): NetworkProfile
    getGateway( parentId: ID! ): NetworkProfile
    assignGateway( parentId: ID!, childId: ID! ): Boolean!
    unassignGateway( parentId: ID!, childId: ID! ): Boolean!    addSimCard(
            iccid: String
            imsi: String
            carrier: String
            Status:  SimStatus
    ): NetworkProfile
    getSimCard( parentId: ID! ): NetworkProfile
    assignSimCard( parentId: ID!, childId: ID! ): Boolean!
    unassignSimCard( parentId: ID!, childId: ID! ): Boolean!
}

type NetworkProfileQueryResult {
cursor: String
hasMore: Boolean!
    networkProfilePage: [NetworkProfile]
}

# -----------------------------------------
# SimCard
# -----------------------------------------
type SimCard {
id: ID!
        iccid: String
        imsi: String
        carrier: String
        networkProfiles:  [NetworkProfile]
        tenant: Tenant
        connectivityPlan: ConnectivityPlan
        status:  SimStatus
    addTenant(
            name: String
            TenantType:  TenantType
    ): SimCard
    getTenant( parentId: ID! ): SimCard
    assignTenant( parentId: ID!, childId: ID! ): Boolean!
    unassignTenant( parentId: ID!, childId: ID! ): Boolean!    addConnectivityPlan(
            name: String
            dataCapMB: Int
            billingCycleDays: Int
    ): SimCard
    getConnectivityPlan( parentId: ID! ): SimCard
    assignConnectivityPlan( parentId: ID!, childId: ID! ): Boolean!
    unassignConnectivityPlan( parentId: ID!, childId: ID! ): Boolean!    getNetworkProfiles( parentId: ID! ): [NetworkProfile]!
    addToNetworkProfiles( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromNetworkProfiles( parentId: ID!, childIds: [ID]! ): Boolean!

}

type SimCardQueryResult {
cursor: String
hasMore: Boolean!
    simCardPage: [SimCard]
}

# -----------------------------------------
# ConnectivityPlan
# -----------------------------------------
type ConnectivityPlan {
id: ID!
        name: String
        dataCapMB: Int
        billingCycleDays: Int
        simCards:  [SimCard]
        tenant: Tenant
    addTenant(
            name: String
            TenantType:  TenantType
    ): ConnectivityPlan
    getTenant( parentId: ID! ): ConnectivityPlan
    assignTenant( parentId: ID!, childId: ID! ): Boolean!
    unassignTenant( parentId: ID!, childId: ID! ): Boolean!    getSimCards( parentId: ID! ): [SimCard]!
    addToSimCards( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromSimCards( parentId: ID!, childIds: [ID]! ): Boolean!

}

type ConnectivityPlanQueryResult {
cursor: String
hasMore: Boolean!
    connectivityPlanPage: [ConnectivityPlan]
}

# -----------------------------------------
# MessagingEndpoint
# -----------------------------------------
type MessagingEndpoint {
id: ID!
        host: String
        port: Int
        secure: Boolean
        tenant: Tenant
        streams:  [TelemetryStream]
        protocol:  MessagingProtocol
    addTenant(
            name: String
            TenantType:  TenantType
    ): MessagingEndpoint
    getTenant( parentId: ID! ): MessagingEndpoint
    assignTenant( parentId: ID!, childId: ID! ): Boolean!
    unassignTenant( parentId: ID!, childId: ID! ): Boolean!    getStreams( parentId: ID! ): [TelemetryStream]!
    addToStreams( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromStreams( parentId: ID!, childIds: [ID]! ): Boolean!

}

type MessagingEndpointQueryResult {
cursor: String
hasMore: Boolean!
    messagingEndpointPage: [MessagingEndpoint]
}

# -----------------------------------------
# AccessPolicy
# -----------------------------------------
type AccessPolicy {
id: ID!
        name: String
        scope: String
        expiresAt: String
        tenant: Tenant
        apiKeys:  [ApiKey]
        users:  [TenantUser]
    addTenant(
            name: String
            TenantType:  TenantType
    ): AccessPolicy
    getTenant( parentId: ID! ): AccessPolicy
    assignTenant( parentId: ID!, childId: ID! ): Boolean!
    unassignTenant( parentId: ID!, childId: ID! ): Boolean!    getApiKeys( parentId: ID! ): [ApiKey]!
    addToApiKeys( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromApiKeys( parentId: ID!, childIds: [ID]! ): Boolean!
    getUsers( parentId: ID! ): [TenantUser]!
    addToUsers( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromUsers( parentId: ID!, childIds: [ID]! ): Boolean!

}

type AccessPolicyQueryResult {
cursor: String
hasMore: Boolean!
    accessPolicyPage: [AccessPolicy]
}

# -----------------------------------------
# ApiKey
# -----------------------------------------
type ApiKey {
id: ID!
        keyId: String
        hashedSecret: String
        createdAt: String
        lastUsedAt: String
        accessPolicy: AccessPolicy
    addAccessPolicy(
            name: String
            scope: String
            expiresAt: String
    ): ApiKey
    getAccessPolicy( parentId: ID! ): ApiKey
    assignAccessPolicy( parentId: ID!, childId: ID! ): Boolean!
    unassignAccessPolicy( parentId: ID!, childId: ID! ): Boolean!
}

type ApiKeyQueryResult {
cursor: String
hasMore: Boolean!
    apiKeyPage: [ApiKey]
}

# -----------------------------------------
# DeviceCertificate
# -----------------------------------------
type DeviceCertificate {
id: ID!
        serialNumber: String
        notBefore: String
        notAfter: String
        fingerprint: String
        device: IoTDevice
        gateway: Gateway
        certificateType:  CertificateType
    addDevice(
            deviceId: String
            serialNumber: String
            lastSeen: String
            firmwareVersion: String
            Status:  DeviceStatus
            PowerSource:  PowerSource
    ): DeviceCertificate
    getDevice( parentId: ID! ): DeviceCertificate
    assignDevice( parentId: ID!, childId: ID! ): Boolean!
    unassignDevice( parentId: ID!, childId: ID! ): Boolean!    addGateway(
            softwareVersion: String
            Status:  DeviceStatus
    ): DeviceCertificate
    getGateway( parentId: ID! ): DeviceCertificate
    assignGateway( parentId: ID!, childId: ID! ): Boolean!
    unassignGateway( parentId: ID!, childId: ID! ): Boolean!
}

type DeviceCertificateQueryResult {
cursor: String
hasMore: Boolean!
    deviceCertificatePage: [DeviceCertificate]
}

# -----------------------------------------
# ProvisioningRecord
# -----------------------------------------
type ProvisioningRecord {
id: ID!
        enrolledAt: String
        provisioningService: String
        device: IoTDevice
        certificate: DeviceCertificate
        tenant: Tenant
        method:  ProvisioningMethod
        status:  ProvisioningStatus
    addDevice(
            deviceId: String
            serialNumber: String
            lastSeen: String
            firmwareVersion: String
            Status:  DeviceStatus
            PowerSource:  PowerSource
    ): ProvisioningRecord
    getDevice( parentId: ID! ): ProvisioningRecord
    assignDevice( parentId: ID!, childId: ID! ): Boolean!
    unassignDevice( parentId: ID!, childId: ID! ): Boolean!    addCertificate(
            serialNumber: String
            notBefore: String
            notAfter: String
            fingerprint: String
            CertificateType:  CertificateType
    ): ProvisioningRecord
    getCertificate( parentId: ID! ): ProvisioningRecord
    assignCertificate( parentId: ID!, childId: ID! ): Boolean!
    unassignCertificate( parentId: ID!, childId: ID! ): Boolean!    addTenant(
            name: String
            TenantType:  TenantType
    ): ProvisioningRecord
    getTenant( parentId: ID! ): ProvisioningRecord
    assignTenant( parentId: ID!, childId: ID! ): Boolean!
    unassignTenant( parentId: ID!, childId: ID! ): Boolean!
}

type ProvisioningRecordQueryResult {
cursor: String
hasMore: Boolean!
    provisioningRecordPage: [ProvisioningRecord]
}

# -----------------------------------------
# DigitalTwin
# -----------------------------------------
type DigitalTwin {
id: ID!
        twinId: String
        desiredStateVersion: Int
        reportedStateVersion: Int
        lastSyncAt: String
        device: IoTDevice
        gateway: Gateway
        template: TwinTemplate
        changeEvents:  [TwinChangeEvent]
    addDevice(
            deviceId: String
            serialNumber: String
            lastSeen: String
            firmwareVersion: String
            Status:  DeviceStatus
            PowerSource:  PowerSource
    ): DigitalTwin
    getDevice( parentId: ID! ): DigitalTwin
    assignDevice( parentId: ID!, childId: ID! ): Boolean!
    unassignDevice( parentId: ID!, childId: ID! ): Boolean!    addGateway(
            softwareVersion: String
            Status:  DeviceStatus
    ): DigitalTwin
    getGateway( parentId: ID! ): DigitalTwin
    assignGateway( parentId: ID!, childId: ID! ): Boolean!
    unassignGateway( parentId: ID!, childId: ID! ): Boolean!    addTemplate(
            name: String
            schemaUri: String
            version: String
    ): DigitalTwin
    getTemplate( parentId: ID! ): DigitalTwin
    assignTemplate( parentId: ID!, childId: ID! ): Boolean!
    unassignTemplate( parentId: ID!, childId: ID! ): Boolean!    getChangeEvents( parentId: ID! ): [TwinChangeEvent]!
    addToChangeEvents( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromChangeEvents( parentId: ID!, childIds: [ID]! ): Boolean!

}

type DigitalTwinQueryResult {
cursor: String
hasMore: Boolean!
    digitalTwinPage: [DigitalTwin]
}

# -----------------------------------------
# TwinTemplate
# -----------------------------------------
type TwinTemplate {
id: ID!
        name: String
        schemaUri: String
        version: String
        deviceModels:  [DeviceModel]
    getDeviceModels( parentId: ID! ): [DeviceModel]!
    addToDeviceModels( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromDeviceModels( parentId: ID!, childIds: [ID]! ): Boolean!

}

type TwinTemplateQueryResult {
cursor: String
hasMore: Boolean!
    twinTemplatePage: [TwinTemplate]
}

# -----------------------------------------
# TwinChangeEvent
# -----------------------------------------
type TwinChangeEvent {
id: ID!
        eventId: String
        occurredAt: String
        twin: DigitalTwin
        changeType:  TwinChangeType
    addTwin(
            twinId: String
            desiredStateVersion: Int
            reportedStateVersion: Int
            lastSyncAt: String
    ): TwinChangeEvent
    getTwin( parentId: ID! ): TwinChangeEvent
    assignTwin( parentId: ID!, childId: ID! ): Boolean!
    unassignTwin( parentId: ID!, childId: ID! ): Boolean!
}

type TwinChangeEventQueryResult {
cursor: String
hasMore: Boolean!
    twinChangeEventPage: [TwinChangeEvent]
}

# -----------------------------------------
# MaintenanceTicket
# -----------------------------------------
type MaintenanceTicket {
id: ID!
        ticketNumber: String
        openedAt: String
        closedAt: String
        device: IoTDevice
        tenant: Tenant
        priority:  MaintenancePriority
        status:  MaintenanceStatus
    addDevice(
            deviceId: String
            serialNumber: String
            lastSeen: String
            firmwareVersion: String
            Status:  DeviceStatus
            PowerSource:  PowerSource
    ): MaintenanceTicket
    getDevice( parentId: ID! ): MaintenanceTicket
    assignDevice( parentId: ID!, childId: ID! ): Boolean!
    unassignDevice( parentId: ID!, childId: ID! ): Boolean!    addTenant(
            name: String
            TenantType:  TenantType
    ): MaintenanceTicket
    getTenant( parentId: ID! ): MaintenanceTicket
    assignTenant( parentId: ID!, childId: ID! ): Boolean!
    unassignTenant( parentId: ID!, childId: ID! ): Boolean!
}

type MaintenanceTicketQueryResult {
cursor: String
hasMore: Boolean!
    maintenanceTicketPage: [MaintenanceTicket]
}

# -----------------------------------------
# DataRetentionPolicy
# -----------------------------------------
type DataRetentionPolicy {
id: ID!
        name: String
        retentionDays: Int
        tenant: Tenant
        streams:  [TelemetryStream]
    addTenant(
            name: String
            TenantType:  TenantType
    ): DataRetentionPolicy
    getTenant( parentId: ID! ): DataRetentionPolicy
    assignTenant( parentId: ID!, childId: ID! ): Boolean!
    unassignTenant( parentId: ID!, childId: ID! ): Boolean!    getStreams( parentId: ID! ): [TelemetryStream]!
    addToStreams( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromStreams( parentId: ID!, childIds: [ID]! ): Boolean!

}

type DataRetentionPolicyQueryResult {
cursor: String
hasMore: Boolean!
    dataRetentionPolicyPage: [DataRetentionPolicy]
}

# -----------------------------------------
# SoftwareUpdateCampaign
# -----------------------------------------
type SoftwareUpdateCampaign {
id: ID!
        campaignCode: String
        scheduledStart: String
        scheduledEnd: String
        firmwareRelease: FirmwareRelease
        deviceGroup: DeviceGroup
        executions:  [SoftwareUpdateExecution]
        status:  UpdateCampaignStatus
    addFirmwareRelease(
            version: String
            releaseDate: String
            releaseNotes: String
            checksum: String
    ): SoftwareUpdateCampaign
    getFirmwareRelease( parentId: ID! ): SoftwareUpdateCampaign
    assignFirmwareRelease( parentId: ID!, childId: ID! ): Boolean!
    unassignFirmwareRelease( parentId: ID!, childId: ID! ): Boolean!    addDeviceGroup(
            name: String
            criteria: String
    ): SoftwareUpdateCampaign
    getDeviceGroup( parentId: ID! ): SoftwareUpdateCampaign
    assignDeviceGroup( parentId: ID!, childId: ID! ): Boolean!
    unassignDeviceGroup( parentId: ID!, childId: ID! ): Boolean!    getExecutions( parentId: ID! ): [SoftwareUpdateExecution]!
    addToExecutions( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromExecutions( parentId: ID!, childIds: [ID]! ): Boolean!

}

type SoftwareUpdateCampaignQueryResult {
cursor: String
hasMore: Boolean!
    softwareUpdateCampaignPage: [SoftwareUpdateCampaign]
}

# -----------------------------------------
# SoftwareUpdateExecution
# -----------------------------------------
type SoftwareUpdateExecution {
id: ID!
        startedAt: String
        completedAt: String
        campaign: SoftwareUpdateCampaign
        device: IoTDevice
        status:  UpdateStatus
    addCampaign(
            campaignCode: String
            scheduledStart: String
            scheduledEnd: String
            Status:  UpdateCampaignStatus
    ): SoftwareUpdateExecution
    getCampaign( parentId: ID! ): SoftwareUpdateExecution
    assignCampaign( parentId: ID!, childId: ID! ): Boolean!
    unassignCampaign( parentId: ID!, childId: ID! ): Boolean!    addDevice(
            deviceId: String
            serialNumber: String
            lastSeen: String
            firmwareVersion: String
            Status:  DeviceStatus
            PowerSource:  PowerSource
    ): SoftwareUpdateExecution
    getDevice( parentId: ID! ): SoftwareUpdateExecution
    assignDevice( parentId: ID!, childId: ID! ): Boolean!
    unassignDevice( parentId: ID!, childId: ID! ): Boolean!
}

type SoftwareUpdateExecutionQueryResult {
cursor: String
hasMore: Boolean!
    softwareUpdateExecutionPage: [SoftwareUpdateExecution]
}

# -----------------------------------------
# DeviceGroup
# -----------------------------------------
type DeviceGroup {
id: ID!
        name: String
        criteria: String
        tenant: Tenant
        devices:  [IoTDevice]
    addTenant(
            name: String
            TenantType:  TenantType
    ): DeviceGroup
    getTenant( parentId: ID! ): DeviceGroup
    assignTenant( parentId: ID!, childId: ID! ): Boolean!
    unassignTenant( parentId: ID!, childId: ID! ): Boolean!    getDevices( parentId: ID! ): [IoTDevice]!
    addToDevices( parentId: ID!, childIds: [ID]! ): Boolean!
    removeFromDevices( parentId: ID!, childIds: [ID]! ): Boolean!

}

type DeviceGroupQueryResult {
cursor: String
hasMore: Boolean!
    deviceGroupPage: [DeviceGroup]
}

# -----------------------------------------
# UsageRecord
# -----------------------------------------
type UsageRecord {
id: ID!
        periodStart: String
        periodEnd: String
        messagesSent: Int
        dataVolumeMB: Int
        tenant: Tenant
        device: IoTDevice
        connectivityPlan: ConnectivityPlan
    addTenant(
            name: String
            TenantType:  TenantType
    ): UsageRecord
    getTenant( parentId: ID! ): UsageRecord
    assignTenant( parentId: ID!, childId: ID! ): Boolean!
    unassignTenant( parentId: ID!, childId: ID! ): Boolean!    addDevice(
            deviceId: String
            serialNumber: String
            lastSeen: String
            firmwareVersion: String
            Status:  DeviceStatus
            PowerSource:  PowerSource
    ): UsageRecord
    getDevice( parentId: ID! ): UsageRecord
    assignDevice( parentId: ID!, childId: ID! ): Boolean!
    unassignDevice( parentId: ID!, childId: ID! ): Boolean!    addConnectivityPlan(
            name: String
            dataCapMB: Int
            billingCycleDays: Int
    ): UsageRecord
    getConnectivityPlan( parentId: ID! ): UsageRecord
    assignConnectivityPlan( parentId: ID!, childId: ID! ): Boolean!
    unassignConnectivityPlan( parentId: ID!, childId: ID! ): Boolean!
}

type UsageRecordQueryResult {
cursor: String
hasMore: Boolean!
    usageRecordPage: [UsageRecord]
}


# -----------------------------------------
# ConnectivityType
# -----------------------------------------
enum ConnectivityType {
                WiFi
            Ethernet
            LTE
            FiveG
            NBIoT
            LoRaWAN
            Zigbee
            BLE
            Satellite
    }
# -----------------------------------------
# DeviceStatus
# -----------------------------------------
enum DeviceStatus {
                Provisioning
            Active
            Suspended
            Offline
            Decommissioned
    }
# -----------------------------------------
# TelemetryEncoding
# -----------------------------------------
enum TelemetryEncoding {
                JSON
            CBOR
            Protobuf
            Avro
            Binary
    }
# -----------------------------------------
# MessageQoS
# -----------------------------------------
enum MessageQoS {
                AtMostOnce
            AtLeastOnce
            ExactlyOnce
    }
# -----------------------------------------
# CertificateType
# -----------------------------------------
enum CertificateType {
                X509
            X509_CA
            X509_SelfSigned
    }
# -----------------------------------------
# ProvisioningMethod
# -----------------------------------------
enum ProvisioningMethod {
                Manual
            JITP
            JITR
            Bulk
            ZeroTouch
    }
# -----------------------------------------
# ProvisioningStatus
# -----------------------------------------
enum ProvisioningStatus {
                Pending
            Enrolled
            Failed
            Revoked
    }
# -----------------------------------------
# SensorType
# -----------------------------------------
enum SensorType {
                Temperature
            Humidity
            Pressure
            Accelerometer
            Gyroscope
            GPS
            Light
            CO2
            VOC
            Current
            Voltage
    }
# -----------------------------------------
# ActuatorType
# -----------------------------------------
enum ActuatorType {
                Relay
            Motor
            Valve
            LED
            Buzzer
            Display
    }
# -----------------------------------------
# AlertSeverity
# -----------------------------------------
enum AlertSeverity {
                Info
            Warning
            Critical
    }
# -----------------------------------------
# AlertStatus
# -----------------------------------------
enum AlertStatus {
                Open
            Acknowledged
            Resolved
            Suppressed
    }
# -----------------------------------------
# UserRole
# -----------------------------------------
enum UserRole {
                Admin
            Operator
            Viewer
            Integrator
    }
# -----------------------------------------
# TenantType
# -----------------------------------------
enum TenantType {
                Enterprise
            SMB
            ISV
            SystemIntegrator
            Government
    }
# -----------------------------------------
# MessagingProtocol
# -----------------------------------------
enum MessagingProtocol {
                MQTT
            AMQP
            HTTP
            CoAP
            WebSocket
    }
# -----------------------------------------
# SimStatus
# -----------------------------------------
enum SimStatus {
                Active
            Suspended
            Retired
    }
# -----------------------------------------
# CommandStatus
# -----------------------------------------
enum CommandStatus {
                Queued
            Sent
            Succeeded
            Failed
            TimedOut
            Cancelled
    }
# -----------------------------------------
# UpdateCampaignStatus
# -----------------------------------------
enum UpdateCampaignStatus {
                Planned
            InProgress
            Paused
            Completed
            Cancelled
    }
# -----------------------------------------
# UpdateStatus
# -----------------------------------------
enum UpdateStatus {
                Downloading
            Installing
            Rebooting
            Success
            Failure
            Deferred
    }
# -----------------------------------------
# TwinChangeType
# -----------------------------------------
enum TwinChangeType {
                DesiredUpdated
            ReportedUpdated
            TagUpdated
    }
# -----------------------------------------
# MaintenancePriority
# -----------------------------------------
enum MaintenancePriority {
                Low
            Medium
            High
            Urgent
    }
# -----------------------------------------
# MaintenanceStatus
# -----------------------------------------
enum MaintenanceStatus {
                Open
            InProgress
            WaitingOnParts
            Closed
    }
# -----------------------------------------
# DeploymentStatus
# -----------------------------------------
enum DeploymentStatus {
                Pending
            Deploying
            Running
            Failed
            Stopped
    }
# -----------------------------------------
# PowerSource
# -----------------------------------------
enum PowerSource {
                Battery
            Mains
            PoE
            EnergyHarvesting
            Solar
    }
# -----------------------------------------
# ModuleType
# -----------------------------------------
enum ModuleType {
                RFModule
            MCU
            SensorChipset
            PowerManagement
            Storage
            Other
    }

# -----------------------------------------
# DeviceId
# -----------------------------------------
type DeviceId {
                value: String
    }
# -----------------------------------------
# FirmwareVersion
# -----------------------------------------
type FirmwareVersion {
                value: String
    }
# -----------------------------------------
# Address
# -----------------------------------------
type Address {
                street: String
            city: String
            state: String
            postalCode: String
            country: String
    }
# -----------------------------------------
# Uri
# -----------------------------------------
type Uri {
                value: String
    }
# -----------------------------------------
# TopicName
# -----------------------------------------
type TopicName {
                value: String
    }
# -----------------------------------------
# Checksum
# -----------------------------------------
type Checksum {
                algorithm: String
            value: String
    }
`;

