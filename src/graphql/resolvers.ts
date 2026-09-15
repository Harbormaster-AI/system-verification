import {
    BackendAPI,
    PaginationOptions
} from "../backend/api.js";

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

interface ResolverContext {
backend: BackendAPI;
}

interface ParentIdentifier {
    parentId: string;
}

interface ParentChildIdentifiers {
    parentId: string;
    childId: string;
}

interface ParentChildrenIdentifiers {
    parentId: string;
    childIds: string[];
}

type ResolverParent = unknown;

export const resolvers = {

Query: {

    health: () => "OK",

    //////////////////////////
    // DeviceVendor
    //////////////////////////
    deviceVendor: async (
        _ : ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.deviceVendor.find( id );
    },

    deviceVendors: async (
        _ : ResolverParent,
        { pageSize = 25, after }: PaginationOptions,
        { backend }: ResolverContext ) =>
    {
        return await backend.deviceVendor.findAll({ pageSize, after });
    },
    //////////////////////////
    // HardwareModule
    //////////////////////////
    hardwareModule: async (
        _ : ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.hardwareModule.find( id );
    },

    hardwareModules: async (
        _ : ResolverParent,
        { pageSize = 25, after }: PaginationOptions,
        { backend }: ResolverContext ) =>
    {
        return await backend.hardwareModule.findAll({ pageSize, after });
    },
    //////////////////////////
    // DeviceModel
    //////////////////////////
    deviceModel: async (
        _ : ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.deviceModel.find( id );
    },

    deviceModels: async (
        _ : ResolverParent,
        { pageSize = 25, after }: PaginationOptions,
        { backend }: ResolverContext ) =>
    {
        return await backend.deviceModel.findAll({ pageSize, after });
    },
    //////////////////////////
    // FirmwareRelease
    //////////////////////////
    firmwareRelease: async (
        _ : ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.firmwareRelease.find( id );
    },

    firmwareReleases: async (
        _ : ResolverParent,
        { pageSize = 25, after }: PaginationOptions,
        { backend }: ResolverContext ) =>
    {
        return await backend.firmwareRelease.findAll({ pageSize, after });
    },
    //////////////////////////
    // IoTDevice
    //////////////////////////
    ioTDevice: async (
        _ : ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.ioTDevice.find( id );
    },

    ioTDevices: async (
        _ : ResolverParent,
        { pageSize = 25, after }: PaginationOptions,
        { backend }: ResolverContext ) =>
    {
        return await backend.ioTDevice.findAll({ pageSize, after });
    },
    //////////////////////////
    // SensorInstance
    //////////////////////////
    sensorInstance: async (
        _ : ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.sensorInstance.find( id );
    },

    sensorInstances: async (
        _ : ResolverParent,
        { pageSize = 25, after }: PaginationOptions,
        { backend }: ResolverContext ) =>
    {
        return await backend.sensorInstance.findAll({ pageSize, after });
    },
    //////////////////////////
    // ActuatorInstance
    //////////////////////////
    actuatorInstance: async (
        _ : ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.actuatorInstance.find( id );
    },

    actuatorInstances: async (
        _ : ResolverParent,
        { pageSize = 25, after }: PaginationOptions,
        { backend }: ResolverContext ) =>
    {
        return await backend.actuatorInstance.findAll({ pageSize, after });
    },
    //////////////////////////
    // TelemetrySchema
    //////////////////////////
    telemetrySchema: async (
        _ : ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.telemetrySchema.find( id );
    },

    telemetrySchemas: async (
        _ : ResolverParent,
        { pageSize = 25, after }: PaginationOptions,
        { backend }: ResolverContext ) =>
    {
        return await backend.telemetrySchema.findAll({ pageSize, after });
    },
    //////////////////////////
    // TelemetryStream
    //////////////////////////
    telemetryStream: async (
        _ : ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.telemetryStream.find( id );
    },

    telemetryStreams: async (
        _ : ResolverParent,
        { pageSize = 25, after }: PaginationOptions,
        { backend }: ResolverContext ) =>
    {
        return await backend.telemetryStream.findAll({ pageSize, after });
    },
    //////////////////////////
    // CommandDefinition
    //////////////////////////
    commandDefinition: async (
        _ : ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.commandDefinition.find( id );
    },

    commandDefinitions: async (
        _ : ResolverParent,
        { pageSize = 25, after }: PaginationOptions,
        { backend }: ResolverContext ) =>
    {
        return await backend.commandDefinition.findAll({ pageSize, after });
    },
    //////////////////////////
    // CommandInvocation
    //////////////////////////
    commandInvocation: async (
        _ : ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.commandInvocation.find( id );
    },

    commandInvocations: async (
        _ : ResolverParent,
        { pageSize = 25, after }: PaginationOptions,
        { backend }: ResolverContext ) =>
    {
        return await backend.commandInvocation.findAll({ pageSize, after });
    },
    //////////////////////////
    // AlertRule
    //////////////////////////
    alertRule: async (
        _ : ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.alertRule.find( id );
    },

    alertRules: async (
        _ : ResolverParent,
        { pageSize = 25, after }: PaginationOptions,
        { backend }: ResolverContext ) =>
    {
        return await backend.alertRule.findAll({ pageSize, after });
    },
    //////////////////////////
    // Alert
    //////////////////////////
    alert: async (
        _ : ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.alert.find( id );
    },

    alerts: async (
        _ : ResolverParent,
        { pageSize = 25, after }: PaginationOptions,
        { backend }: ResolverContext ) =>
    {
        return await backend.alert.findAll({ pageSize, after });
    },
    //////////////////////////
    // Tenant
    //////////////////////////
    tenant: async (
        _ : ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.tenant.find( id );
    },

    tenants: async (
        _ : ResolverParent,
        { pageSize = 25, after }: PaginationOptions,
        { backend }: ResolverContext ) =>
    {
        return await backend.tenant.findAll({ pageSize, after });
    },
    //////////////////////////
    // TenantUser
    //////////////////////////
    tenantUser: async (
        _ : ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.tenantUser.find( id );
    },

    tenantUsers: async (
        _ : ResolverParent,
        { pageSize = 25, after }: PaginationOptions,
        { backend }: ResolverContext ) =>
    {
        return await backend.tenantUser.findAll({ pageSize, after });
    },
    //////////////////////////
    // Site
    //////////////////////////
    site: async (
        _ : ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.site.find( id );
    },

    sites: async (
        _ : ResolverParent,
        { pageSize = 25, after }: PaginationOptions,
        { backend }: ResolverContext ) =>
    {
        return await backend.site.findAll({ pageSize, after });
    },
    //////////////////////////
    // Building
    //////////////////////////
    building: async (
        _ : ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.building.find( id );
    },

    buildings: async (
        _ : ResolverParent,
        { pageSize = 25, after }: PaginationOptions,
        { backend }: ResolverContext ) =>
    {
        return await backend.building.findAll({ pageSize, after });
    },
    //////////////////////////
    // Floor
    //////////////////////////
    floor: async (
        _ : ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.floor.find( id );
    },

    floors: async (
        _ : ResolverParent,
        { pageSize = 25, after }: PaginationOptions,
        { backend }: ResolverContext ) =>
    {
        return await backend.floor.findAll({ pageSize, after });
    },
    //////////////////////////
    // Room
    //////////////////////////
    room: async (
        _ : ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.room.find( id );
    },

    rooms: async (
        _ : ResolverParent,
        { pageSize = 25, after }: PaginationOptions,
        { backend }: ResolverContext ) =>
    {
        return await backend.room.findAll({ pageSize, after });
    },
    //////////////////////////
    // Gateway
    //////////////////////////
    gateway: async (
        _ : ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.gateway.find( id );
    },

    gateways: async (
        _ : ResolverParent,
        { pageSize = 25, after }: PaginationOptions,
        { backend }: ResolverContext ) =>
    {
        return await backend.gateway.findAll({ pageSize, after });
    },
    //////////////////////////
    // EdgeApplication
    //////////////////////////
    edgeApplication: async (
        _ : ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.edgeApplication.find( id );
    },

    edgeApplications: async (
        _ : ResolverParent,
        { pageSize = 25, after }: PaginationOptions,
        { backend }: ResolverContext ) =>
    {
        return await backend.edgeApplication.findAll({ pageSize, after });
    },
    //////////////////////////
    // NetworkProfile
    //////////////////////////
    networkProfile: async (
        _ : ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.networkProfile.find( id );
    },

    networkProfiles: async (
        _ : ResolverParent,
        { pageSize = 25, after }: PaginationOptions,
        { backend }: ResolverContext ) =>
    {
        return await backend.networkProfile.findAll({ pageSize, after });
    },
    //////////////////////////
    // SimCard
    //////////////////////////
    simCard: async (
        _ : ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.simCard.find( id );
    },

    simCards: async (
        _ : ResolverParent,
        { pageSize = 25, after }: PaginationOptions,
        { backend }: ResolverContext ) =>
    {
        return await backend.simCard.findAll({ pageSize, after });
    },
    //////////////////////////
    // ConnectivityPlan
    //////////////////////////
    connectivityPlan: async (
        _ : ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.connectivityPlan.find( id );
    },

    connectivityPlans: async (
        _ : ResolverParent,
        { pageSize = 25, after }: PaginationOptions,
        { backend }: ResolverContext ) =>
    {
        return await backend.connectivityPlan.findAll({ pageSize, after });
    },
    //////////////////////////
    // MessagingEndpoint
    //////////////////////////
    messagingEndpoint: async (
        _ : ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.messagingEndpoint.find( id );
    },

    messagingEndpoints: async (
        _ : ResolverParent,
        { pageSize = 25, after }: PaginationOptions,
        { backend }: ResolverContext ) =>
    {
        return await backend.messagingEndpoint.findAll({ pageSize, after });
    },
    //////////////////////////
    // AccessPolicy
    //////////////////////////
    accessPolicy: async (
        _ : ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.accessPolicy.find( id );
    },

    accessPolicys: async (
        _ : ResolverParent,
        { pageSize = 25, after }: PaginationOptions,
        { backend }: ResolverContext ) =>
    {
        return await backend.accessPolicy.findAll({ pageSize, after });
    },
    //////////////////////////
    // ApiKey
    //////////////////////////
    apiKey: async (
        _ : ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.apiKey.find( id );
    },

    apiKeys: async (
        _ : ResolverParent,
        { pageSize = 25, after }: PaginationOptions,
        { backend }: ResolverContext ) =>
    {
        return await backend.apiKey.findAll({ pageSize, after });
    },
    //////////////////////////
    // DeviceCertificate
    //////////////////////////
    deviceCertificate: async (
        _ : ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.deviceCertificate.find( id );
    },

    deviceCertificates: async (
        _ : ResolverParent,
        { pageSize = 25, after }: PaginationOptions,
        { backend }: ResolverContext ) =>
    {
        return await backend.deviceCertificate.findAll({ pageSize, after });
    },
    //////////////////////////
    // ProvisioningRecord
    //////////////////////////
    provisioningRecord: async (
        _ : ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.provisioningRecord.find( id );
    },

    provisioningRecords: async (
        _ : ResolverParent,
        { pageSize = 25, after }: PaginationOptions,
        { backend }: ResolverContext ) =>
    {
        return await backend.provisioningRecord.findAll({ pageSize, after });
    },
    //////////////////////////
    // DigitalTwin
    //////////////////////////
    digitalTwin: async (
        _ : ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.digitalTwin.find( id );
    },

    digitalTwins: async (
        _ : ResolverParent,
        { pageSize = 25, after }: PaginationOptions,
        { backend }: ResolverContext ) =>
    {
        return await backend.digitalTwin.findAll({ pageSize, after });
    },
    //////////////////////////
    // TwinTemplate
    //////////////////////////
    twinTemplate: async (
        _ : ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.twinTemplate.find( id );
    },

    twinTemplates: async (
        _ : ResolverParent,
        { pageSize = 25, after }: PaginationOptions,
        { backend }: ResolverContext ) =>
    {
        return await backend.twinTemplate.findAll({ pageSize, after });
    },
    //////////////////////////
    // TwinChangeEvent
    //////////////////////////
    twinChangeEvent: async (
        _ : ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.twinChangeEvent.find( id );
    },

    twinChangeEvents: async (
        _ : ResolverParent,
        { pageSize = 25, after }: PaginationOptions,
        { backend }: ResolverContext ) =>
    {
        return await backend.twinChangeEvent.findAll({ pageSize, after });
    },
    //////////////////////////
    // MaintenanceTicket
    //////////////////////////
    maintenanceTicket: async (
        _ : ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.maintenanceTicket.find( id );
    },

    maintenanceTickets: async (
        _ : ResolverParent,
        { pageSize = 25, after }: PaginationOptions,
        { backend }: ResolverContext ) =>
    {
        return await backend.maintenanceTicket.findAll({ pageSize, after });
    },
    //////////////////////////
    // DataRetentionPolicy
    //////////////////////////
    dataRetentionPolicy: async (
        _ : ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.dataRetentionPolicy.find( id );
    },

    dataRetentionPolicys: async (
        _ : ResolverParent,
        { pageSize = 25, after }: PaginationOptions,
        { backend }: ResolverContext ) =>
    {
        return await backend.dataRetentionPolicy.findAll({ pageSize, after });
    },
    //////////////////////////
    // SoftwareUpdateCampaign
    //////////////////////////
    softwareUpdateCampaign: async (
        _ : ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.softwareUpdateCampaign.find( id );
    },

    softwareUpdateCampaigns: async (
        _ : ResolverParent,
        { pageSize = 25, after }: PaginationOptions,
        { backend }: ResolverContext ) =>
    {
        return await backend.softwareUpdateCampaign.findAll({ pageSize, after });
    },
    //////////////////////////
    // SoftwareUpdateExecution
    //////////////////////////
    softwareUpdateExecution: async (
        _ : ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.softwareUpdateExecution.find( id );
    },

    softwareUpdateExecutions: async (
        _ : ResolverParent,
        { pageSize = 25, after }: PaginationOptions,
        { backend }: ResolverContext ) =>
    {
        return await backend.softwareUpdateExecution.findAll({ pageSize, after });
    },
    //////////////////////////
    // DeviceGroup
    //////////////////////////
    deviceGroup: async (
        _ : ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.deviceGroup.find( id );
    },

    deviceGroups: async (
        _ : ResolverParent,
        { pageSize = 25, after }: PaginationOptions,
        { backend }: ResolverContext ) =>
    {
        return await backend.deviceGroup.findAll({ pageSize, after });
    },
    //////////////////////////
    // UsageRecord
    //////////////////////////
    usageRecord: async (
        _ : ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.usageRecord.find( id );
    },

    usageRecords: async (
        _ : ResolverParent,
        { pageSize = 25, after }: PaginationOptions,
        { backend }: ResolverContext ) =>
    {
        return await backend.usageRecord.findAll({ pageSize, after });
    },
},

Mutation: {

//////////////////////////
// DeviceVendor
//////////////////////////
    addDeviceVendor: async (
        _: ResolverParent,
        args : DeviceVendor,
        { backend }: ResolverContext ) =>
    {
        return await backend.deviceVendor.add( args );
    },

    updateDeviceVendor: async (
        _: ResolverParent,
        args : DeviceVendor,
        { backend }: ResolverContext ) =>
    {
        return await backend.deviceVendor.update( args );
    },

    removeDeviceVendor: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.deviceVendor.remove( id );
    },
//////////////////////////
// HardwareModule
//////////////////////////
    addHardwareModule: async (
        _: ResolverParent,
        args : HardwareModule,
        { backend }: ResolverContext ) =>
    {
        return await backend.hardwareModule.add( args );
    },

    updateHardwareModule: async (
        _: ResolverParent,
        args : HardwareModule,
        { backend }: ResolverContext ) =>
    {
        return await backend.hardwareModule.update( args );
    },

    removeHardwareModule: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.hardwareModule.remove( id );
    },
//////////////////////////
// DeviceModel
//////////////////////////
    addDeviceModel: async (
        _: ResolverParent,
        args : DeviceModel,
        { backend }: ResolverContext ) =>
    {
        return await backend.deviceModel.add( args );
    },

    updateDeviceModel: async (
        _: ResolverParent,
        args : DeviceModel,
        { backend }: ResolverContext ) =>
    {
        return await backend.deviceModel.update( args );
    },

    removeDeviceModel: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.deviceModel.remove( id );
    },
//////////////////////////
// FirmwareRelease
//////////////////////////
    addFirmwareRelease: async (
        _: ResolverParent,
        args : FirmwareRelease,
        { backend }: ResolverContext ) =>
    {
        return await backend.firmwareRelease.add( args );
    },

    updateFirmwareRelease: async (
        _: ResolverParent,
        args : FirmwareRelease,
        { backend }: ResolverContext ) =>
    {
        return await backend.firmwareRelease.update( args );
    },

    removeFirmwareRelease: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.firmwareRelease.remove( id );
    },
//////////////////////////
// IoTDevice
//////////////////////////
    addIoTDevice: async (
        _: ResolverParent,
        args : IoTDevice,
        { backend }: ResolverContext ) =>
    {
        return await backend.ioTDevice.add( args );
    },

    updateIoTDevice: async (
        _: ResolverParent,
        args : IoTDevice,
        { backend }: ResolverContext ) =>
    {
        return await backend.ioTDevice.update( args );
    },

    removeIoTDevice: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.ioTDevice.remove( id );
    },
//////////////////////////
// SensorInstance
//////////////////////////
    addSensorInstance: async (
        _: ResolverParent,
        args : SensorInstance,
        { backend }: ResolverContext ) =>
    {
        return await backend.sensorInstance.add( args );
    },

    updateSensorInstance: async (
        _: ResolverParent,
        args : SensorInstance,
        { backend }: ResolverContext ) =>
    {
        return await backend.sensorInstance.update( args );
    },

    removeSensorInstance: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.sensorInstance.remove( id );
    },
//////////////////////////
// ActuatorInstance
//////////////////////////
    addActuatorInstance: async (
        _: ResolverParent,
        args : ActuatorInstance,
        { backend }: ResolverContext ) =>
    {
        return await backend.actuatorInstance.add( args );
    },

    updateActuatorInstance: async (
        _: ResolverParent,
        args : ActuatorInstance,
        { backend }: ResolverContext ) =>
    {
        return await backend.actuatorInstance.update( args );
    },

    removeActuatorInstance: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.actuatorInstance.remove( id );
    },
//////////////////////////
// TelemetrySchema
//////////////////////////
    addTelemetrySchema: async (
        _: ResolverParent,
        args : TelemetrySchema,
        { backend }: ResolverContext ) =>
    {
        return await backend.telemetrySchema.add( args );
    },

    updateTelemetrySchema: async (
        _: ResolverParent,
        args : TelemetrySchema,
        { backend }: ResolverContext ) =>
    {
        return await backend.telemetrySchema.update( args );
    },

    removeTelemetrySchema: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.telemetrySchema.remove( id );
    },
//////////////////////////
// TelemetryStream
//////////////////////////
    addTelemetryStream: async (
        _: ResolverParent,
        args : TelemetryStream,
        { backend }: ResolverContext ) =>
    {
        return await backend.telemetryStream.add( args );
    },

    updateTelemetryStream: async (
        _: ResolverParent,
        args : TelemetryStream,
        { backend }: ResolverContext ) =>
    {
        return await backend.telemetryStream.update( args );
    },

    removeTelemetryStream: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.telemetryStream.remove( id );
    },
//////////////////////////
// CommandDefinition
//////////////////////////
    addCommandDefinition: async (
        _: ResolverParent,
        args : CommandDefinition,
        { backend }: ResolverContext ) =>
    {
        return await backend.commandDefinition.add( args );
    },

    updateCommandDefinition: async (
        _: ResolverParent,
        args : CommandDefinition,
        { backend }: ResolverContext ) =>
    {
        return await backend.commandDefinition.update( args );
    },

    removeCommandDefinition: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.commandDefinition.remove( id );
    },
//////////////////////////
// CommandInvocation
//////////////////////////
    addCommandInvocation: async (
        _: ResolverParent,
        args : CommandInvocation,
        { backend }: ResolverContext ) =>
    {
        return await backend.commandInvocation.add( args );
    },

    updateCommandInvocation: async (
        _: ResolverParent,
        args : CommandInvocation,
        { backend }: ResolverContext ) =>
    {
        return await backend.commandInvocation.update( args );
    },

    removeCommandInvocation: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.commandInvocation.remove( id );
    },
//////////////////////////
// AlertRule
//////////////////////////
    addAlertRule: async (
        _: ResolverParent,
        args : AlertRule,
        { backend }: ResolverContext ) =>
    {
        return await backend.alertRule.add( args );
    },

    updateAlertRule: async (
        _: ResolverParent,
        args : AlertRule,
        { backend }: ResolverContext ) =>
    {
        return await backend.alertRule.update( args );
    },

    removeAlertRule: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.alertRule.remove( id );
    },
//////////////////////////
// Alert
//////////////////////////
    addAlert: async (
        _: ResolverParent,
        args : Alert,
        { backend }: ResolverContext ) =>
    {
        return await backend.alert.add( args );
    },

    updateAlert: async (
        _: ResolverParent,
        args : Alert,
        { backend }: ResolverContext ) =>
    {
        return await backend.alert.update( args );
    },

    removeAlert: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.alert.remove( id );
    },
//////////////////////////
// Tenant
//////////////////////////
    addTenant: async (
        _: ResolverParent,
        args : Tenant,
        { backend }: ResolverContext ) =>
    {
        return await backend.tenant.add( args );
    },

    updateTenant: async (
        _: ResolverParent,
        args : Tenant,
        { backend }: ResolverContext ) =>
    {
        return await backend.tenant.update( args );
    },

    removeTenant: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.tenant.remove( id );
    },
//////////////////////////
// TenantUser
//////////////////////////
    addTenantUser: async (
        _: ResolverParent,
        args : TenantUser,
        { backend }: ResolverContext ) =>
    {
        return await backend.tenantUser.add( args );
    },

    updateTenantUser: async (
        _: ResolverParent,
        args : TenantUser,
        { backend }: ResolverContext ) =>
    {
        return await backend.tenantUser.update( args );
    },

    removeTenantUser: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.tenantUser.remove( id );
    },
//////////////////////////
// Site
//////////////////////////
    addSite: async (
        _: ResolverParent,
        args : Site,
        { backend }: ResolverContext ) =>
    {
        return await backend.site.add( args );
    },

    updateSite: async (
        _: ResolverParent,
        args : Site,
        { backend }: ResolverContext ) =>
    {
        return await backend.site.update( args );
    },

    removeSite: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.site.remove( id );
    },
//////////////////////////
// Building
//////////////////////////
    addBuilding: async (
        _: ResolverParent,
        args : Building,
        { backend }: ResolverContext ) =>
    {
        return await backend.building.add( args );
    },

    updateBuilding: async (
        _: ResolverParent,
        args : Building,
        { backend }: ResolverContext ) =>
    {
        return await backend.building.update( args );
    },

    removeBuilding: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.building.remove( id );
    },
//////////////////////////
// Floor
//////////////////////////
    addFloor: async (
        _: ResolverParent,
        args : Floor,
        { backend }: ResolverContext ) =>
    {
        return await backend.floor.add( args );
    },

    updateFloor: async (
        _: ResolverParent,
        args : Floor,
        { backend }: ResolverContext ) =>
    {
        return await backend.floor.update( args );
    },

    removeFloor: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.floor.remove( id );
    },
//////////////////////////
// Room
//////////////////////////
    addRoom: async (
        _: ResolverParent,
        args : Room,
        { backend }: ResolverContext ) =>
    {
        return await backend.room.add( args );
    },

    updateRoom: async (
        _: ResolverParent,
        args : Room,
        { backend }: ResolverContext ) =>
    {
        return await backend.room.update( args );
    },

    removeRoom: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.room.remove( id );
    },
//////////////////////////
// Gateway
//////////////////////////
    addGateway: async (
        _: ResolverParent,
        args : Gateway,
        { backend }: ResolverContext ) =>
    {
        return await backend.gateway.add( args );
    },

    updateGateway: async (
        _: ResolverParent,
        args : Gateway,
        { backend }: ResolverContext ) =>
    {
        return await backend.gateway.update( args );
    },

    removeGateway: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.gateway.remove( id );
    },
//////////////////////////
// EdgeApplication
//////////////////////////
    addEdgeApplication: async (
        _: ResolverParent,
        args : EdgeApplication,
        { backend }: ResolverContext ) =>
    {
        return await backend.edgeApplication.add( args );
    },

    updateEdgeApplication: async (
        _: ResolverParent,
        args : EdgeApplication,
        { backend }: ResolverContext ) =>
    {
        return await backend.edgeApplication.update( args );
    },

    removeEdgeApplication: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.edgeApplication.remove( id );
    },
//////////////////////////
// NetworkProfile
//////////////////////////
    addNetworkProfile: async (
        _: ResolverParent,
        args : NetworkProfile,
        { backend }: ResolverContext ) =>
    {
        return await backend.networkProfile.add( args );
    },

    updateNetworkProfile: async (
        _: ResolverParent,
        args : NetworkProfile,
        { backend }: ResolverContext ) =>
    {
        return await backend.networkProfile.update( args );
    },

    removeNetworkProfile: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.networkProfile.remove( id );
    },
//////////////////////////
// SimCard
//////////////////////////
    addSimCard: async (
        _: ResolverParent,
        args : SimCard,
        { backend }: ResolverContext ) =>
    {
        return await backend.simCard.add( args );
    },

    updateSimCard: async (
        _: ResolverParent,
        args : SimCard,
        { backend }: ResolverContext ) =>
    {
        return await backend.simCard.update( args );
    },

    removeSimCard: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.simCard.remove( id );
    },
//////////////////////////
// ConnectivityPlan
//////////////////////////
    addConnectivityPlan: async (
        _: ResolverParent,
        args : ConnectivityPlan,
        { backend }: ResolverContext ) =>
    {
        return await backend.connectivityPlan.add( args );
    },

    updateConnectivityPlan: async (
        _: ResolverParent,
        args : ConnectivityPlan,
        { backend }: ResolverContext ) =>
    {
        return await backend.connectivityPlan.update( args );
    },

    removeConnectivityPlan: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.connectivityPlan.remove( id );
    },
//////////////////////////
// MessagingEndpoint
//////////////////////////
    addMessagingEndpoint: async (
        _: ResolverParent,
        args : MessagingEndpoint,
        { backend }: ResolverContext ) =>
    {
        return await backend.messagingEndpoint.add( args );
    },

    updateMessagingEndpoint: async (
        _: ResolverParent,
        args : MessagingEndpoint,
        { backend }: ResolverContext ) =>
    {
        return await backend.messagingEndpoint.update( args );
    },

    removeMessagingEndpoint: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.messagingEndpoint.remove( id );
    },
//////////////////////////
// AccessPolicy
//////////////////////////
    addAccessPolicy: async (
        _: ResolverParent,
        args : AccessPolicy,
        { backend }: ResolverContext ) =>
    {
        return await backend.accessPolicy.add( args );
    },

    updateAccessPolicy: async (
        _: ResolverParent,
        args : AccessPolicy,
        { backend }: ResolverContext ) =>
    {
        return await backend.accessPolicy.update( args );
    },

    removeAccessPolicy: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.accessPolicy.remove( id );
    },
//////////////////////////
// ApiKey
//////////////////////////
    addApiKey: async (
        _: ResolverParent,
        args : ApiKey,
        { backend }: ResolverContext ) =>
    {
        return await backend.apiKey.add( args );
    },

    updateApiKey: async (
        _: ResolverParent,
        args : ApiKey,
        { backend }: ResolverContext ) =>
    {
        return await backend.apiKey.update( args );
    },

    removeApiKey: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.apiKey.remove( id );
    },
//////////////////////////
// DeviceCertificate
//////////////////////////
    addDeviceCertificate: async (
        _: ResolverParent,
        args : DeviceCertificate,
        { backend }: ResolverContext ) =>
    {
        return await backend.deviceCertificate.add( args );
    },

    updateDeviceCertificate: async (
        _: ResolverParent,
        args : DeviceCertificate,
        { backend }: ResolverContext ) =>
    {
        return await backend.deviceCertificate.update( args );
    },

    removeDeviceCertificate: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.deviceCertificate.remove( id );
    },
//////////////////////////
// ProvisioningRecord
//////////////////////////
    addProvisioningRecord: async (
        _: ResolverParent,
        args : ProvisioningRecord,
        { backend }: ResolverContext ) =>
    {
        return await backend.provisioningRecord.add( args );
    },

    updateProvisioningRecord: async (
        _: ResolverParent,
        args : ProvisioningRecord,
        { backend }: ResolverContext ) =>
    {
        return await backend.provisioningRecord.update( args );
    },

    removeProvisioningRecord: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.provisioningRecord.remove( id );
    },
//////////////////////////
// DigitalTwin
//////////////////////////
    addDigitalTwin: async (
        _: ResolverParent,
        args : DigitalTwin,
        { backend }: ResolverContext ) =>
    {
        return await backend.digitalTwin.add( args );
    },

    updateDigitalTwin: async (
        _: ResolverParent,
        args : DigitalTwin,
        { backend }: ResolverContext ) =>
    {
        return await backend.digitalTwin.update( args );
    },

    removeDigitalTwin: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.digitalTwin.remove( id );
    },
//////////////////////////
// TwinTemplate
//////////////////////////
    addTwinTemplate: async (
        _: ResolverParent,
        args : TwinTemplate,
        { backend }: ResolverContext ) =>
    {
        return await backend.twinTemplate.add( args );
    },

    updateTwinTemplate: async (
        _: ResolverParent,
        args : TwinTemplate,
        { backend }: ResolverContext ) =>
    {
        return await backend.twinTemplate.update( args );
    },

    removeTwinTemplate: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.twinTemplate.remove( id );
    },
//////////////////////////
// TwinChangeEvent
//////////////////////////
    addTwinChangeEvent: async (
        _: ResolverParent,
        args : TwinChangeEvent,
        { backend }: ResolverContext ) =>
    {
        return await backend.twinChangeEvent.add( args );
    },

    updateTwinChangeEvent: async (
        _: ResolverParent,
        args : TwinChangeEvent,
        { backend }: ResolverContext ) =>
    {
        return await backend.twinChangeEvent.update( args );
    },

    removeTwinChangeEvent: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.twinChangeEvent.remove( id );
    },
//////////////////////////
// MaintenanceTicket
//////////////////////////
    addMaintenanceTicket: async (
        _: ResolverParent,
        args : MaintenanceTicket,
        { backend }: ResolverContext ) =>
    {
        return await backend.maintenanceTicket.add( args );
    },

    updateMaintenanceTicket: async (
        _: ResolverParent,
        args : MaintenanceTicket,
        { backend }: ResolverContext ) =>
    {
        return await backend.maintenanceTicket.update( args );
    },

    removeMaintenanceTicket: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.maintenanceTicket.remove( id );
    },
//////////////////////////
// DataRetentionPolicy
//////////////////////////
    addDataRetentionPolicy: async (
        _: ResolverParent,
        args : DataRetentionPolicy,
        { backend }: ResolverContext ) =>
    {
        return await backend.dataRetentionPolicy.add( args );
    },

    updateDataRetentionPolicy: async (
        _: ResolverParent,
        args : DataRetentionPolicy,
        { backend }: ResolverContext ) =>
    {
        return await backend.dataRetentionPolicy.update( args );
    },

    removeDataRetentionPolicy: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.dataRetentionPolicy.remove( id );
    },
//////////////////////////
// SoftwareUpdateCampaign
//////////////////////////
    addSoftwareUpdateCampaign: async (
        _: ResolverParent,
        args : SoftwareUpdateCampaign,
        { backend }: ResolverContext ) =>
    {
        return await backend.softwareUpdateCampaign.add( args );
    },

    updateSoftwareUpdateCampaign: async (
        _: ResolverParent,
        args : SoftwareUpdateCampaign,
        { backend }: ResolverContext ) =>
    {
        return await backend.softwareUpdateCampaign.update( args );
    },

    removeSoftwareUpdateCampaign: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.softwareUpdateCampaign.remove( id );
    },
//////////////////////////
// SoftwareUpdateExecution
//////////////////////////
    addSoftwareUpdateExecution: async (
        _: ResolverParent,
        args : SoftwareUpdateExecution,
        { backend }: ResolverContext ) =>
    {
        return await backend.softwareUpdateExecution.add( args );
    },

    updateSoftwareUpdateExecution: async (
        _: ResolverParent,
        args : SoftwareUpdateExecution,
        { backend }: ResolverContext ) =>
    {
        return await backend.softwareUpdateExecution.update( args );
    },

    removeSoftwareUpdateExecution: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.softwareUpdateExecution.remove( id );
    },
//////////////////////////
// DeviceGroup
//////////////////////////
    addDeviceGroup: async (
        _: ResolverParent,
        args : DeviceGroup,
        { backend }: ResolverContext ) =>
    {
        return await backend.deviceGroup.add( args );
    },

    updateDeviceGroup: async (
        _: ResolverParent,
        args : DeviceGroup,
        { backend }: ResolverContext ) =>
    {
        return await backend.deviceGroup.update( args );
    },

    removeDeviceGroup: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.deviceGroup.remove( id );
    },
//////////////////////////
// UsageRecord
//////////////////////////
    addUsageRecord: async (
        _: ResolverParent,
        args : UsageRecord,
        { backend }: ResolverContext ) =>
    {
        return await backend.usageRecord.add( args );
    },

    updateUsageRecord: async (
        _: ResolverParent,
        args : UsageRecord,
        { backend }: ResolverContext ) =>
    {
        return await backend.usageRecord.update( args );
    },

    removeUsageRecord: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext ) =>
    {
        return await backend.usageRecord.remove( id );
    },
},
DeviceVendor: {
    deviceModels: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.deviceVendor.getDeviceModels(parentId);
    },

    addToDeviceModels: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.deviceVendor.addToDeviceModels(parentId,childIds);
    },

    removeFromDeviceModels: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.deviceVendor.removeFromDeviceModels(parentId,childIds);
    },
    firmwareReleases: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.deviceVendor.getFirmwareReleases(parentId);
    },

    addToFirmwareReleases: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.deviceVendor.addToFirmwareReleases(parentId,childIds);
    },

    removeFromFirmwareReleases: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.deviceVendor.removeFromFirmwareReleases(parentId,childIds);
    },
    hardwareModules: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.deviceVendor.getHardwareModules(parentId);
    },

    addToHardwareModules: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.deviceVendor.addToHardwareModules(parentId,childIds);
    },

    removeFromHardwareModules: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.deviceVendor.removeFromHardwareModules(parentId,childIds);
    },
},
HardwareModule: {
    vendor: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.hardwareModule.getVendor(id);
    },

    assignVendor: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.hardwareModule.assignVendor(parentId,childId);
    },

    unassignVendor: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.hardwareModule.unassignVendor(parentId,childId);
    },
},
DeviceModel: {
    vendor: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.deviceModel.getVendor(id);
    },

    assignVendor: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.deviceModel.assignVendor(parentId,childId);
    },

    unassignVendor: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.deviceModel.unassignVendor(parentId,childId);
    },
    twinTemplate: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.deviceModel.getTwinTemplate(id);
    },

    assignTwinTemplate: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.deviceModel.assignTwinTemplate(parentId,childId);
    },

    unassignTwinTemplate: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.deviceModel.unassignTwinTemplate(parentId,childId);
    },
    hardwareModules: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.deviceModel.getHardwareModules(parentId);
    },

    addToHardwareModules: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.deviceModel.addToHardwareModules(parentId,childIds);
    },

    removeFromHardwareModules: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.deviceModel.removeFromHardwareModules(parentId,childIds);
    },
    firmwareReleases: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.deviceModel.getFirmwareReleases(parentId);
    },

    addToFirmwareReleases: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.deviceModel.addToFirmwareReleases(parentId,childIds);
    },

    removeFromFirmwareReleases: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.deviceModel.removeFromFirmwareReleases(parentId,childIds);
    },
    commandDefinitions: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.deviceModel.getCommandDefinitions(parentId);
    },

    addToCommandDefinitions: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.deviceModel.addToCommandDefinitions(parentId,childIds);
    },

    removeFromCommandDefinitions: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.deviceModel.removeFromCommandDefinitions(parentId,childIds);
    },
},
FirmwareRelease: {
    deviceModel: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.firmwareRelease.getDeviceModel(id);
    },

    assignDeviceModel: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.firmwareRelease.assignDeviceModel(parentId,childId);
    },

    unassignDeviceModel: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.firmwareRelease.unassignDeviceModel(parentId,childId);
    },
},
IoTDevice: {
    deviceModel: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.ioTDevice.getDeviceModel(id);
    },

    assignDeviceModel: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.ioTDevice.assignDeviceModel(parentId,childId);
    },

    unassignDeviceModel: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.ioTDevice.unassignDeviceModel(parentId,childId);
    },
    tenant: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.ioTDevice.getTenant(id);
    },

    assignTenant: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.ioTDevice.assignTenant(parentId,childId);
    },

    unassignTenant: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.ioTDevice.unassignTenant(parentId,childId);
    },
    site: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.ioTDevice.getSite(id);
    },

    assignSite: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.ioTDevice.assignSite(parentId,childId);
    },

    unassignSite: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.ioTDevice.unassignSite(parentId,childId);
    },
    room: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.ioTDevice.getRoom(id);
    },

    assignRoom: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.ioTDevice.assignRoom(parentId,childId);
    },

    unassignRoom: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.ioTDevice.unassignRoom(parentId,childId);
    },
    gateway: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.ioTDevice.getGateway(id);
    },

    assignGateway: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.ioTDevice.assignGateway(parentId,childId);
    },

    unassignGateway: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.ioTDevice.unassignGateway(parentId,childId);
    },
    digitalTwin: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.ioTDevice.getDigitalTwin(id);
    },

    assignDigitalTwin: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.ioTDevice.assignDigitalTwin(parentId,childId);
    },

    unassignDigitalTwin: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.ioTDevice.unassignDigitalTwin(parentId,childId);
    },
    provisioningRecord: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.ioTDevice.getProvisioningRecord(id);
    },

    assignProvisioningRecord: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.ioTDevice.assignProvisioningRecord(parentId,childId);
    },

    unassignProvisioningRecord: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.ioTDevice.unassignProvisioningRecord(parentId,childId);
    },
    sensors: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.ioTDevice.getSensors(parentId);
    },

    addToSensors: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.ioTDevice.addToSensors(parentId,childIds);
    },

    removeFromSensors: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.ioTDevice.removeFromSensors(parentId,childIds);
    },
    actuators: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.ioTDevice.getActuators(parentId);
    },

    addToActuators: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.ioTDevice.addToActuators(parentId,childIds);
    },

    removeFromActuators: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.ioTDevice.removeFromActuators(parentId,childIds);
    },
    certificates: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.ioTDevice.getCertificates(parentId);
    },

    addToCertificates: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.ioTDevice.addToCertificates(parentId,childIds);
    },

    removeFromCertificates: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.ioTDevice.removeFromCertificates(parentId,childIds);
    },
    telemetryStreams: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.ioTDevice.getTelemetryStreams(parentId);
    },

    addToTelemetryStreams: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.ioTDevice.addToTelemetryStreams(parentId,childIds);
    },

    removeFromTelemetryStreams: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.ioTDevice.removeFromTelemetryStreams(parentId,childIds);
    },
    commandInvocations: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.ioTDevice.getCommandInvocations(parentId);
    },

    addToCommandInvocations: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.ioTDevice.addToCommandInvocations(parentId,childIds);
    },

    removeFromCommandInvocations: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.ioTDevice.removeFromCommandInvocations(parentId,childIds);
    },
    alerts: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.ioTDevice.getAlerts(parentId);
    },

    addToAlerts: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.ioTDevice.addToAlerts(parentId,childIds);
    },

    removeFromAlerts: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.ioTDevice.removeFromAlerts(parentId,childIds);
    },
    deviceGroups: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.ioTDevice.getDeviceGroups(parentId);
    },

    addToDeviceGroups: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.ioTDevice.addToDeviceGroups(parentId,childIds);
    },

    removeFromDeviceGroups: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.ioTDevice.removeFromDeviceGroups(parentId,childIds);
    },
    networkProfiles: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.ioTDevice.getNetworkProfiles(parentId);
    },

    addToNetworkProfiles: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.ioTDevice.addToNetworkProfiles(parentId,childIds);
    },

    removeFromNetworkProfiles: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.ioTDevice.removeFromNetworkProfiles(parentId,childIds);
    },
},
SensorInstance: {
    device: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.sensorInstance.getDevice(id);
    },

    assignDevice: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.sensorInstance.assignDevice(parentId,childId);
    },

    unassignDevice: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.sensorInstance.unassignDevice(parentId,childId);
    },
    telemetryStreams: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.sensorInstance.getTelemetryStreams(parentId);
    },

    addToTelemetryStreams: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.sensorInstance.addToTelemetryStreams(parentId,childIds);
    },

    removeFromTelemetryStreams: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.sensorInstance.removeFromTelemetryStreams(parentId,childIds);
    },
},
ActuatorInstance: {
    device: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.actuatorInstance.getDevice(id);
    },

    assignDevice: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.actuatorInstance.assignDevice(parentId,childId);
    },

    unassignDevice: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.actuatorInstance.unassignDevice(parentId,childId);
    },
    supportedCommands: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.actuatorInstance.getSupportedCommands(parentId);
    },

    addToSupportedCommands: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.actuatorInstance.addToSupportedCommands(parentId,childIds);
    },

    removeFromSupportedCommands: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.actuatorInstance.removeFromSupportedCommands(parentId,childIds);
    },
},
TelemetrySchema: {
    streams: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.telemetrySchema.getStreams(parentId);
    },

    addToStreams: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.telemetrySchema.addToStreams(parentId,childIds);
    },

    removeFromStreams: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.telemetrySchema.removeFromStreams(parentId,childIds);
    },
},
TelemetryStream: {
    device: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.telemetryStream.getDevice(id);
    },

    assignDevice: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.telemetryStream.assignDevice(parentId,childId);
    },

    unassignDevice: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.telemetryStream.unassignDevice(parentId,childId);
    },
    sensor: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.telemetryStream.getSensor(id);
    },

    assignSensor: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.telemetryStream.assignSensor(parentId,childId);
    },

    unassignSensor: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.telemetryStream.unassignSensor(parentId,childId);
    },
    schema: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.telemetryStream.getSchema(id);
    },

    assignSchema: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.telemetryStream.assignSchema(parentId,childId);
    },

    unassignSchema: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.telemetryStream.unassignSchema(parentId,childId);
    },
    messagingEndpoint: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.telemetryStream.getMessagingEndpoint(id);
    },

    assignMessagingEndpoint: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.telemetryStream.assignMessagingEndpoint(parentId,childId);
    },

    unassignMessagingEndpoint: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.telemetryStream.unassignMessagingEndpoint(parentId,childId);
    },
    retentionPolicy: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.telemetryStream.getRetentionPolicy(id);
    },

    assignRetentionPolicy: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.telemetryStream.assignRetentionPolicy(parentId,childId);
    },

    unassignRetentionPolicy: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.telemetryStream.unassignRetentionPolicy(parentId,childId);
    },
},
CommandDefinition: {
    deviceModel: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.commandDefinition.getDeviceModel(id);
    },

    assignDeviceModel: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.commandDefinition.assignDeviceModel(parentId,childId);
    },

    unassignDeviceModel: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.commandDefinition.unassignDeviceModel(parentId,childId);
    },
    actuators: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.commandDefinition.getActuators(parentId);
    },

    addToActuators: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.commandDefinition.addToActuators(parentId,childIds);
    },

    removeFromActuators: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.commandDefinition.removeFromActuators(parentId,childIds);
    },
    commandInvocations: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.commandDefinition.getCommandInvocations(parentId);
    },

    addToCommandInvocations: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.commandDefinition.addToCommandInvocations(parentId,childIds);
    },

    removeFromCommandInvocations: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.commandDefinition.removeFromCommandInvocations(parentId,childIds);
    },
},
CommandInvocation: {
    device: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.commandInvocation.getDevice(id);
    },

    assignDevice: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.commandInvocation.assignDevice(parentId,childId);
    },

    unassignDevice: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.commandInvocation.unassignDevice(parentId,childId);
    },
    commandDefinition: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.commandInvocation.getCommandDefinition(id);
    },

    assignCommandDefinition: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.commandInvocation.assignCommandDefinition(parentId,childId);
    },

    unassignCommandDefinition: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.commandInvocation.unassignCommandDefinition(parentId,childId);
    },
    actuator: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.commandInvocation.getActuator(id);
    },

    assignActuator: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.commandInvocation.assignActuator(parentId,childId);
    },

    unassignActuator: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.commandInvocation.unassignActuator(parentId,childId);
    },
    user: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.commandInvocation.getUser(id);
    },

    assignUser: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.commandInvocation.assignUser(parentId,childId);
    },

    unassignUser: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.commandInvocation.unassignUser(parentId,childId);
    },
},
AlertRule: {
    tenant: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.alertRule.getTenant(id);
    },

    assignTenant: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.alertRule.assignTenant(parentId,childId);
    },

    unassignTenant: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.alertRule.unassignTenant(parentId,childId);
    },
    streams: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.alertRule.getStreams(parentId);
    },

    addToStreams: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.alertRule.addToStreams(parentId,childIds);
    },

    removeFromStreams: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.alertRule.removeFromStreams(parentId,childIds);
    },
    alerts: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.alertRule.getAlerts(parentId);
    },

    addToAlerts: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.alertRule.addToAlerts(parentId,childIds);
    },

    removeFromAlerts: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.alertRule.removeFromAlerts(parentId,childIds);
    },
},
Alert: {
    device: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.alert.getDevice(id);
    },

    assignDevice: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.alert.assignDevice(parentId,childId);
    },

    unassignDevice: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.alert.unassignDevice(parentId,childId);
    },
    alertRule: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.alert.getAlertRule(id);
    },

    assignAlertRule: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.alert.assignAlertRule(parentId,childId);
    },

    unassignAlertRule: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.alert.unassignAlertRule(parentId,childId);
    },
},
Tenant: {
    sites: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.tenant.getSites(parentId);
    },

    addToSites: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.tenant.addToSites(parentId,childIds);
    },

    removeFromSites: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.tenant.removeFromSites(parentId,childIds);
    },
    users: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.tenant.getUsers(parentId);
    },

    addToUsers: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.tenant.addToUsers(parentId,childIds);
    },

    removeFromUsers: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.tenant.removeFromUsers(parentId,childIds);
    },
    devices: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.tenant.getDevices(parentId);
    },

    addToDevices: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.tenant.addToDevices(parentId,childIds);
    },

    removeFromDevices: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.tenant.removeFromDevices(parentId,childIds);
    },
    dataRetentionPolicies: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.tenant.getDataRetentionPolicies(parentId);
    },

    addToDataRetentionPolicies: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.tenant.addToDataRetentionPolicies(parentId,childIds);
    },

    removeFromDataRetentionPolicies: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.tenant.removeFromDataRetentionPolicies(parentId,childIds);
    },
    connectivityPlans: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.tenant.getConnectivityPlans(parentId);
    },

    addToConnectivityPlans: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.tenant.addToConnectivityPlans(parentId,childIds);
    },

    removeFromConnectivityPlans: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.tenant.removeFromConnectivityPlans(parentId,childIds);
    },
    simCards: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.tenant.getSimCards(parentId);
    },

    addToSimCards: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.tenant.addToSimCards(parentId,childIds);
    },

    removeFromSimCards: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.tenant.removeFromSimCards(parentId,childIds);
    },
    messagingEndpoints: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.tenant.getMessagingEndpoints(parentId);
    },

    addToMessagingEndpoints: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.tenant.addToMessagingEndpoints(parentId,childIds);
    },

    removeFromMessagingEndpoints: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.tenant.removeFromMessagingEndpoints(parentId,childIds);
    },
    accessPolicies: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.tenant.getAccessPolicies(parentId);
    },

    addToAccessPolicies: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.tenant.addToAccessPolicies(parentId,childIds);
    },

    removeFromAccessPolicies: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.tenant.removeFromAccessPolicies(parentId,childIds);
    },
    deviceGroups: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.tenant.getDeviceGroups(parentId);
    },

    addToDeviceGroups: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.tenant.addToDeviceGroups(parentId,childIds);
    },

    removeFromDeviceGroups: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.tenant.removeFromDeviceGroups(parentId,childIds);
    },
    alertRules: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.tenant.getAlertRules(parentId);
    },

    addToAlertRules: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.tenant.addToAlertRules(parentId,childIds);
    },

    removeFromAlertRules: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.tenant.removeFromAlertRules(parentId,childIds);
    },
    maintenanceTickets: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.tenant.getMaintenanceTickets(parentId);
    },

    addToMaintenanceTickets: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.tenant.addToMaintenanceTickets(parentId,childIds);
    },

    removeFromMaintenanceTickets: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.tenant.removeFromMaintenanceTickets(parentId,childIds);
    },
    usageRecords: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.tenant.getUsageRecords(parentId);
    },

    addToUsageRecords: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.tenant.addToUsageRecords(parentId,childIds);
    },

    removeFromUsageRecords: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.tenant.removeFromUsageRecords(parentId,childIds);
    },
},
TenantUser: {
    tenant: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.tenantUser.getTenant(id);
    },

    assignTenant: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.tenantUser.assignTenant(parentId,childId);
    },

    unassignTenant: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.tenantUser.unassignTenant(parentId,childId);
    },
    commandInvocations: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.tenantUser.getCommandInvocations(parentId);
    },

    addToCommandInvocations: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.tenantUser.addToCommandInvocations(parentId,childIds);
    },

    removeFromCommandInvocations: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.tenantUser.removeFromCommandInvocations(parentId,childIds);
    },
},
Site: {
    tenant: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.site.getTenant(id);
    },

    assignTenant: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.site.assignTenant(parentId,childId);
    },

    unassignTenant: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.site.unassignTenant(parentId,childId);
    },
    buildings: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.site.getBuildings(parentId);
    },

    addToBuildings: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.site.addToBuildings(parentId,childIds);
    },

    removeFromBuildings: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.site.removeFromBuildings(parentId,childIds);
    },
    devices: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.site.getDevices(parentId);
    },

    addToDevices: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.site.addToDevices(parentId,childIds);
    },

    removeFromDevices: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.site.removeFromDevices(parentId,childIds);
    },
    gateways: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.site.getGateways(parentId);
    },

    addToGateways: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.site.addToGateways(parentId,childIds);
    },

    removeFromGateways: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.site.removeFromGateways(parentId,childIds);
    },
},
Building: {
    site: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.building.getSite(id);
    },

    assignSite: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.building.assignSite(parentId,childId);
    },

    unassignSite: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.building.unassignSite(parentId,childId);
    },
    floors: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.building.getFloors(parentId);
    },

    addToFloors: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.building.addToFloors(parentId,childIds);
    },

    removeFromFloors: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.building.removeFromFloors(parentId,childIds);
    },
},
Floor: {
    building: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.floor.getBuilding(id);
    },

    assignBuilding: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.floor.assignBuilding(parentId,childId);
    },

    unassignBuilding: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.floor.unassignBuilding(parentId,childId);
    },
    rooms: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.floor.getRooms(parentId);
    },

    addToRooms: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.floor.addToRooms(parentId,childIds);
    },

    removeFromRooms: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.floor.removeFromRooms(parentId,childIds);
    },
},
Room: {
    floor: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.room.getFloor(id);
    },

    assignFloor: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.room.assignFloor(parentId,childId);
    },

    unassignFloor: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.room.unassignFloor(parentId,childId);
    },
    devices: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.room.getDevices(parentId);
    },

    addToDevices: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.room.addToDevices(parentId,childIds);
    },

    removeFromDevices: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.room.removeFromDevices(parentId,childIds);
    },
    gateways: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.room.getGateways(parentId);
    },

    addToGateways: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.room.addToGateways(parentId,childIds);
    },

    removeFromGateways: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.room.removeFromGateways(parentId,childIds);
    },
},
Gateway: {
    site: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.gateway.getSite(id);
    },

    assignSite: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.gateway.assignSite(parentId,childId);
    },

    unassignSite: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.gateway.unassignSite(parentId,childId);
    },
    room: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.gateway.getRoom(id);
    },

    assignRoom: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.gateway.assignRoom(parentId,childId);
    },

    unassignRoom: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.gateway.unassignRoom(parentId,childId);
    },
    digitalTwin: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.gateway.getDigitalTwin(id);
    },

    assignDigitalTwin: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.gateway.assignDigitalTwin(parentId,childId);
    },

    unassignDigitalTwin: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.gateway.unassignDigitalTwin(parentId,childId);
    },
    devices: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.gateway.getDevices(parentId);
    },

    addToDevices: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.gateway.addToDevices(parentId,childIds);
    },

    removeFromDevices: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.gateway.removeFromDevices(parentId,childIds);
    },
    edgeApplications: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.gateway.getEdgeApplications(parentId);
    },

    addToEdgeApplications: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.gateway.addToEdgeApplications(parentId,childIds);
    },

    removeFromEdgeApplications: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.gateway.removeFromEdgeApplications(parentId,childIds);
    },
    certificates: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.gateway.getCertificates(parentId);
    },

    addToCertificates: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.gateway.addToCertificates(parentId,childIds);
    },

    removeFromCertificates: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.gateway.removeFromCertificates(parentId,childIds);
    },
    networkProfiles: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.gateway.getNetworkProfiles(parentId);
    },

    addToNetworkProfiles: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.gateway.addToNetworkProfiles(parentId,childIds);
    },

    removeFromNetworkProfiles: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.gateway.removeFromNetworkProfiles(parentId,childIds);
    },
},
EdgeApplication: {
    gateway: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.edgeApplication.getGateway(id);
    },

    assignGateway: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.edgeApplication.assignGateway(parentId,childId);
    },

    unassignGateway: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.edgeApplication.unassignGateway(parentId,childId);
    },
},
NetworkProfile: {
    device: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.networkProfile.getDevice(id);
    },

    assignDevice: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.networkProfile.assignDevice(parentId,childId);
    },

    unassignDevice: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.networkProfile.unassignDevice(parentId,childId);
    },
    gateway: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.networkProfile.getGateway(id);
    },

    assignGateway: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.networkProfile.assignGateway(parentId,childId);
    },

    unassignGateway: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.networkProfile.unassignGateway(parentId,childId);
    },
    simCard: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.networkProfile.getSimCard(id);
    },

    assignSimCard: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.networkProfile.assignSimCard(parentId,childId);
    },

    unassignSimCard: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.networkProfile.unassignSimCard(parentId,childId);
    },
},
SimCard: {
    tenant: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.simCard.getTenant(id);
    },

    assignTenant: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.simCard.assignTenant(parentId,childId);
    },

    unassignTenant: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.simCard.unassignTenant(parentId,childId);
    },
    connectivityPlan: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.simCard.getConnectivityPlan(id);
    },

    assignConnectivityPlan: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.simCard.assignConnectivityPlan(parentId,childId);
    },

    unassignConnectivityPlan: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.simCard.unassignConnectivityPlan(parentId,childId);
    },
    networkProfiles: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.simCard.getNetworkProfiles(parentId);
    },

    addToNetworkProfiles: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.simCard.addToNetworkProfiles(parentId,childIds);
    },

    removeFromNetworkProfiles: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.simCard.removeFromNetworkProfiles(parentId,childIds);
    },
},
ConnectivityPlan: {
    tenant: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.connectivityPlan.getTenant(id);
    },

    assignTenant: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.connectivityPlan.assignTenant(parentId,childId);
    },

    unassignTenant: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.connectivityPlan.unassignTenant(parentId,childId);
    },
    simCards: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.connectivityPlan.getSimCards(parentId);
    },

    addToSimCards: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.connectivityPlan.addToSimCards(parentId,childIds);
    },

    removeFromSimCards: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.connectivityPlan.removeFromSimCards(parentId,childIds);
    },
},
MessagingEndpoint: {
    tenant: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.messagingEndpoint.getTenant(id);
    },

    assignTenant: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.messagingEndpoint.assignTenant(parentId,childId);
    },

    unassignTenant: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.messagingEndpoint.unassignTenant(parentId,childId);
    },
    streams: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.messagingEndpoint.getStreams(parentId);
    },

    addToStreams: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.messagingEndpoint.addToStreams(parentId,childIds);
    },

    removeFromStreams: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.messagingEndpoint.removeFromStreams(parentId,childIds);
    },
},
AccessPolicy: {
    tenant: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.accessPolicy.getTenant(id);
    },

    assignTenant: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.accessPolicy.assignTenant(parentId,childId);
    },

    unassignTenant: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.accessPolicy.unassignTenant(parentId,childId);
    },
    apiKeys: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.accessPolicy.getApiKeys(parentId);
    },

    addToApiKeys: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.accessPolicy.addToApiKeys(parentId,childIds);
    },

    removeFromApiKeys: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.accessPolicy.removeFromApiKeys(parentId,childIds);
    },
    users: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.accessPolicy.getUsers(parentId);
    },

    addToUsers: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.accessPolicy.addToUsers(parentId,childIds);
    },

    removeFromUsers: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.accessPolicy.removeFromUsers(parentId,childIds);
    },
},
ApiKey: {
    accessPolicy: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.apiKey.getAccessPolicy(id);
    },

    assignAccessPolicy: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.apiKey.assignAccessPolicy(parentId,childId);
    },

    unassignAccessPolicy: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.apiKey.unassignAccessPolicy(parentId,childId);
    },
},
DeviceCertificate: {
    device: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.deviceCertificate.getDevice(id);
    },

    assignDevice: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.deviceCertificate.assignDevice(parentId,childId);
    },

    unassignDevice: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.deviceCertificate.unassignDevice(parentId,childId);
    },
    gateway: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.deviceCertificate.getGateway(id);
    },

    assignGateway: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.deviceCertificate.assignGateway(parentId,childId);
    },

    unassignGateway: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.deviceCertificate.unassignGateway(parentId,childId);
    },
},
ProvisioningRecord: {
    device: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.provisioningRecord.getDevice(id);
    },

    assignDevice: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.provisioningRecord.assignDevice(parentId,childId);
    },

    unassignDevice: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.provisioningRecord.unassignDevice(parentId,childId);
    },
    certificate: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.provisioningRecord.getCertificate(id);
    },

    assignCertificate: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.provisioningRecord.assignCertificate(parentId,childId);
    },

    unassignCertificate: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.provisioningRecord.unassignCertificate(parentId,childId);
    },
    tenant: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.provisioningRecord.getTenant(id);
    },

    assignTenant: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.provisioningRecord.assignTenant(parentId,childId);
    },

    unassignTenant: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.provisioningRecord.unassignTenant(parentId,childId);
    },
},
DigitalTwin: {
    device: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.digitalTwin.getDevice(id);
    },

    assignDevice: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.digitalTwin.assignDevice(parentId,childId);
    },

    unassignDevice: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.digitalTwin.unassignDevice(parentId,childId);
    },
    gateway: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.digitalTwin.getGateway(id);
    },

    assignGateway: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.digitalTwin.assignGateway(parentId,childId);
    },

    unassignGateway: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.digitalTwin.unassignGateway(parentId,childId);
    },
    template: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.digitalTwin.getTemplate(id);
    },

    assignTemplate: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.digitalTwin.assignTemplate(parentId,childId);
    },

    unassignTemplate: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.digitalTwin.unassignTemplate(parentId,childId);
    },
    changeEvents: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.digitalTwin.getChangeEvents(parentId);
    },

    addToChangeEvents: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.digitalTwin.addToChangeEvents(parentId,childIds);
    },

    removeFromChangeEvents: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.digitalTwin.removeFromChangeEvents(parentId,childIds);
    },
},
TwinTemplate: {
    deviceModels: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.twinTemplate.getDeviceModels(parentId);
    },

    addToDeviceModels: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.twinTemplate.addToDeviceModels(parentId,childIds);
    },

    removeFromDeviceModels: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.twinTemplate.removeFromDeviceModels(parentId,childIds);
    },
},
TwinChangeEvent: {
    twin: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.twinChangeEvent.getTwin(id);
    },

    assignTwin: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.twinChangeEvent.assignTwin(parentId,childId);
    },

    unassignTwin: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.twinChangeEvent.unassignTwin(parentId,childId);
    },
},
MaintenanceTicket: {
    device: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.maintenanceTicket.getDevice(id);
    },

    assignDevice: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.maintenanceTicket.assignDevice(parentId,childId);
    },

    unassignDevice: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.maintenanceTicket.unassignDevice(parentId,childId);
    },
    tenant: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.maintenanceTicket.getTenant(id);
    },

    assignTenant: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.maintenanceTicket.assignTenant(parentId,childId);
    },

    unassignTenant: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.maintenanceTicket.unassignTenant(parentId,childId);
    },
},
DataRetentionPolicy: {
    tenant: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.dataRetentionPolicy.getTenant(id);
    },

    assignTenant: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.dataRetentionPolicy.assignTenant(parentId,childId);
    },

    unassignTenant: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.dataRetentionPolicy.unassignTenant(parentId,childId);
    },
    streams: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.dataRetentionPolicy.getStreams(parentId);
    },

    addToStreams: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.dataRetentionPolicy.addToStreams(parentId,childIds);
    },

    removeFromStreams: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.dataRetentionPolicy.removeFromStreams(parentId,childIds);
    },
},
SoftwareUpdateCampaign: {
    firmwareRelease: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.softwareUpdateCampaign.getFirmwareRelease(id);
    },

    assignFirmwareRelease: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.softwareUpdateCampaign.assignFirmwareRelease(parentId,childId);
    },

    unassignFirmwareRelease: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.softwareUpdateCampaign.unassignFirmwareRelease(parentId,childId);
    },
    deviceGroup: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.softwareUpdateCampaign.getDeviceGroup(id);
    },

    assignDeviceGroup: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.softwareUpdateCampaign.assignDeviceGroup(parentId,childId);
    },

    unassignDeviceGroup: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.softwareUpdateCampaign.unassignDeviceGroup(parentId,childId);
    },
    executions: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.softwareUpdateCampaign.getExecutions(parentId);
    },

    addToExecutions: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.softwareUpdateCampaign.addToExecutions(parentId,childIds);
    },

    removeFromExecutions: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.softwareUpdateCampaign.removeFromExecutions(parentId,childIds);
    },
},
SoftwareUpdateExecution: {
    campaign: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.softwareUpdateExecution.getCampaign(id);
    },

    assignCampaign: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.softwareUpdateExecution.assignCampaign(parentId,childId);
    },

    unassignCampaign: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.softwareUpdateExecution.unassignCampaign(parentId,childId);
    },
    device: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.softwareUpdateExecution.getDevice(id);
    },

    assignDevice: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.softwareUpdateExecution.assignDevice(parentId,childId);
    },

    unassignDevice: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.softwareUpdateExecution.unassignDevice(parentId,childId);
    },
},
DeviceGroup: {
    tenant: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.deviceGroup.getTenant(id);
    },

    assignTenant: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.deviceGroup.assignTenant(parentId,childId);
    },

    unassignTenant: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.deviceGroup.unassignTenant(parentId,childId);
    },
    devices: async (
        _: ResolverParent,
        { parentId }: ParentIdentifier,
        { backend }: ResolverContext ) =>
    {
        return await backend.deviceGroup.getDevices(parentId);
    },

    addToDevices: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.deviceGroup.addToDevices(parentId,childIds);
    },

    removeFromDevices: async (
        _: ResolverParent,
        { parentId, childIds }: ParentChildrenIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.deviceGroup.removeFromDevices(parentId,childIds);
    },
},
UsageRecord: {
    tenant: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.usageRecord.getTenant(id);
    },

    assignTenant: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.usageRecord.assignTenant(parentId,childId);
    },

    unassignTenant: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.usageRecord.unassignTenant(parentId,childId);
    },
    device: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.usageRecord.getDevice(id);
    },

    assignDevice: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.usageRecord.assignDevice(parentId,childId);
    },

    unassignDevice: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.usageRecord.unassignDevice(parentId,childId);
    },
    connectivityPlan: async (
        _: ResolverParent,
        { id }: { id: string },
        { backend }: ResolverContext) =>
    {
        return await backend.usageRecord.getConnectivityPlan(id);
    },

    assignConnectivityPlan: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext ) =>
    {
        return await backend.usageRecord.assignConnectivityPlan(parentId,childId);
    },

    unassignConnectivityPlan: async (
        _: ResolverParent,
        { parentId, childId }: ParentChildIdentifiers,
        { backend }: ResolverContext) =>
    {
        return await backend.usageRecord.unassignConnectivityPlan(parentId,childId);
    },
},
};