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
} from "./types.js";

export interface PaginationOptions {
    pageSize?: number;
    after?: string;
}

export interface BackendAPI {
    // -----------------------------------------
    // DeviceVendor interface
    // -----------------------------------------
    deviceVendor: {

        // -----------------------------------------
        // traditional
        // -----------------------------------------

        find(id: string): Promise<DeviceVendor | null>;
        findAll(options?: PaginationOptions): Promise<DeviceVendor[]>;
        add(input: DeviceVendor): Promise<DeviceVendor>;
        update(input: DeviceVendor): Promise<DeviceVendor>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------


        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        getDeviceModels(parentId: string): Promise<DeviceModel[]>;
        addToDeviceModels(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromDeviceModels(parentId: string,childIds: string[]): Promise<Boolean>;

        getFirmwareReleases(parentId: string): Promise<FirmwareRelease[]>;
        addToFirmwareReleases(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromFirmwareReleases(parentId: string,childIds: string[]): Promise<Boolean>;

        getHardwareModules(parentId: string): Promise<HardwareModule[]>;
        addToHardwareModules(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromHardwareModules(parentId: string,childIds: string[]): Promise<Boolean>;

    };
    // -----------------------------------------
    // HardwareModule interface
    // -----------------------------------------
    hardwareModule: {

        // -----------------------------------------
        // traditional
        // -----------------------------------------

        find(id: string): Promise<HardwareModule | null>;
        findAll(options?: PaginationOptions): Promise<HardwareModule[]>;
        add(input: HardwareModule): Promise<HardwareModule>;
        update(input: HardwareModule): Promise<HardwareModule>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getVendor(parentId: string): Promise<DeviceVendor | null>;
        assignVendor(parentId: string,childId: string): Promise<Boolean>;
        unassignVendor(parentId: string,childId: string): Promise<Boolean>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
    };
    // -----------------------------------------
    // DeviceModel interface
    // -----------------------------------------
    deviceModel: {

        // -----------------------------------------
        // traditional
        // -----------------------------------------

        find(id: string): Promise<DeviceModel | null>;
        findAll(options?: PaginationOptions): Promise<DeviceModel[]>;
        add(input: DeviceModel): Promise<DeviceModel>;
        update(input: DeviceModel): Promise<DeviceModel>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getVendor(parentId: string): Promise<DeviceVendor | null>;
        assignVendor(parentId: string,childId: string): Promise<Boolean>;
        unassignVendor(parentId: string,childId: string): Promise<Boolean>;
        getTwinTemplate(parentId: string): Promise<TwinTemplate | null>;
        assignTwinTemplate(parentId: string,childId: string): Promise<Boolean>;
        unassignTwinTemplate(parentId: string,childId: string): Promise<Boolean>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        getHardwareModules(parentId: string): Promise<HardwareModule[]>;
        addToHardwareModules(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromHardwareModules(parentId: string,childIds: string[]): Promise<Boolean>;

        getFirmwareReleases(parentId: string): Promise<FirmwareRelease[]>;
        addToFirmwareReleases(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromFirmwareReleases(parentId: string,childIds: string[]): Promise<Boolean>;

        getCommandDefinitions(parentId: string): Promise<CommandDefinition[]>;
        addToCommandDefinitions(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromCommandDefinitions(parentId: string,childIds: string[]): Promise<Boolean>;

    };
    // -----------------------------------------
    // FirmwareRelease interface
    // -----------------------------------------
    firmwareRelease: {

        // -----------------------------------------
        // traditional
        // -----------------------------------------

        find(id: string): Promise<FirmwareRelease | null>;
        findAll(options?: PaginationOptions): Promise<FirmwareRelease[]>;
        add(input: FirmwareRelease): Promise<FirmwareRelease>;
        update(input: FirmwareRelease): Promise<FirmwareRelease>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getDeviceModel(parentId: string): Promise<DeviceModel | null>;
        assignDeviceModel(parentId: string,childId: string): Promise<Boolean>;
        unassignDeviceModel(parentId: string,childId: string): Promise<Boolean>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
    };
    // -----------------------------------------
    // IoTDevice interface
    // -----------------------------------------
    ioTDevice: {

        // -----------------------------------------
        // traditional
        // -----------------------------------------

        find(id: string): Promise<IoTDevice | null>;
        findAll(options?: PaginationOptions): Promise<IoTDevice[]>;
        add(input: IoTDevice): Promise<IoTDevice>;
        update(input: IoTDevice): Promise<IoTDevice>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getDeviceModel(parentId: string): Promise<DeviceModel | null>;
        assignDeviceModel(parentId: string,childId: string): Promise<Boolean>;
        unassignDeviceModel(parentId: string,childId: string): Promise<Boolean>;
        getTenant(parentId: string): Promise<Tenant | null>;
        assignTenant(parentId: string,childId: string): Promise<Boolean>;
        unassignTenant(parentId: string,childId: string): Promise<Boolean>;
        getSite(parentId: string): Promise<Site | null>;
        assignSite(parentId: string,childId: string): Promise<Boolean>;
        unassignSite(parentId: string,childId: string): Promise<Boolean>;
        getRoom(parentId: string): Promise<Room | null>;
        assignRoom(parentId: string,childId: string): Promise<Boolean>;
        unassignRoom(parentId: string,childId: string): Promise<Boolean>;
        getGateway(parentId: string): Promise<Gateway | null>;
        assignGateway(parentId: string,childId: string): Promise<Boolean>;
        unassignGateway(parentId: string,childId: string): Promise<Boolean>;
        getDigitalTwin(parentId: string): Promise<DigitalTwin | null>;
        assignDigitalTwin(parentId: string,childId: string): Promise<Boolean>;
        unassignDigitalTwin(parentId: string,childId: string): Promise<Boolean>;
        getProvisioningRecord(parentId: string): Promise<ProvisioningRecord | null>;
        assignProvisioningRecord(parentId: string,childId: string): Promise<Boolean>;
        unassignProvisioningRecord(parentId: string,childId: string): Promise<Boolean>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        getSensors(parentId: string): Promise<SensorInstance[]>;
        addToSensors(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromSensors(parentId: string,childIds: string[]): Promise<Boolean>;

        getActuators(parentId: string): Promise<ActuatorInstance[]>;
        addToActuators(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromActuators(parentId: string,childIds: string[]): Promise<Boolean>;

        getCertificates(parentId: string): Promise<DeviceCertificate[]>;
        addToCertificates(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromCertificates(parentId: string,childIds: string[]): Promise<Boolean>;

        getTelemetryStreams(parentId: string): Promise<TelemetryStream[]>;
        addToTelemetryStreams(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromTelemetryStreams(parentId: string,childIds: string[]): Promise<Boolean>;

        getCommandInvocations(parentId: string): Promise<CommandInvocation[]>;
        addToCommandInvocations(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromCommandInvocations(parentId: string,childIds: string[]): Promise<Boolean>;

        getAlerts(parentId: string): Promise<Alert[]>;
        addToAlerts(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromAlerts(parentId: string,childIds: string[]): Promise<Boolean>;

        getDeviceGroups(parentId: string): Promise<DeviceGroup[]>;
        addToDeviceGroups(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromDeviceGroups(parentId: string,childIds: string[]): Promise<Boolean>;

        getNetworkProfiles(parentId: string): Promise<NetworkProfile[]>;
        addToNetworkProfiles(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromNetworkProfiles(parentId: string,childIds: string[]): Promise<Boolean>;

    };
    // -----------------------------------------
    // SensorInstance interface
    // -----------------------------------------
    sensorInstance: {

        // -----------------------------------------
        // traditional
        // -----------------------------------------

        find(id: string): Promise<SensorInstance | null>;
        findAll(options?: PaginationOptions): Promise<SensorInstance[]>;
        add(input: SensorInstance): Promise<SensorInstance>;
        update(input: SensorInstance): Promise<SensorInstance>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getDevice(parentId: string): Promise<IoTDevice | null>;
        assignDevice(parentId: string,childId: string): Promise<Boolean>;
        unassignDevice(parentId: string,childId: string): Promise<Boolean>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        getTelemetryStreams(parentId: string): Promise<TelemetryStream[]>;
        addToTelemetryStreams(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromTelemetryStreams(parentId: string,childIds: string[]): Promise<Boolean>;

    };
    // -----------------------------------------
    // ActuatorInstance interface
    // -----------------------------------------
    actuatorInstance: {

        // -----------------------------------------
        // traditional
        // -----------------------------------------

        find(id: string): Promise<ActuatorInstance | null>;
        findAll(options?: PaginationOptions): Promise<ActuatorInstance[]>;
        add(input: ActuatorInstance): Promise<ActuatorInstance>;
        update(input: ActuatorInstance): Promise<ActuatorInstance>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getDevice(parentId: string): Promise<IoTDevice | null>;
        assignDevice(parentId: string,childId: string): Promise<Boolean>;
        unassignDevice(parentId: string,childId: string): Promise<Boolean>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        getSupportedCommands(parentId: string): Promise<CommandDefinition[]>;
        addToSupportedCommands(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromSupportedCommands(parentId: string,childIds: string[]): Promise<Boolean>;

    };
    // -----------------------------------------
    // TelemetrySchema interface
    // -----------------------------------------
    telemetrySchema: {

        // -----------------------------------------
        // traditional
        // -----------------------------------------

        find(id: string): Promise<TelemetrySchema | null>;
        findAll(options?: PaginationOptions): Promise<TelemetrySchema[]>;
        add(input: TelemetrySchema): Promise<TelemetrySchema>;
        update(input: TelemetrySchema): Promise<TelemetrySchema>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------


        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        getStreams(parentId: string): Promise<TelemetryStream[]>;
        addToStreams(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromStreams(parentId: string,childIds: string[]): Promise<Boolean>;

    };
    // -----------------------------------------
    // TelemetryStream interface
    // -----------------------------------------
    telemetryStream: {

        // -----------------------------------------
        // traditional
        // -----------------------------------------

        find(id: string): Promise<TelemetryStream | null>;
        findAll(options?: PaginationOptions): Promise<TelemetryStream[]>;
        add(input: TelemetryStream): Promise<TelemetryStream>;
        update(input: TelemetryStream): Promise<TelemetryStream>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getDevice(parentId: string): Promise<IoTDevice | null>;
        assignDevice(parentId: string,childId: string): Promise<Boolean>;
        unassignDevice(parentId: string,childId: string): Promise<Boolean>;
        getSensor(parentId: string): Promise<SensorInstance | null>;
        assignSensor(parentId: string,childId: string): Promise<Boolean>;
        unassignSensor(parentId: string,childId: string): Promise<Boolean>;
        getSchema(parentId: string): Promise<TelemetrySchema | null>;
        assignSchema(parentId: string,childId: string): Promise<Boolean>;
        unassignSchema(parentId: string,childId: string): Promise<Boolean>;
        getMessagingEndpoint(parentId: string): Promise<MessagingEndpoint | null>;
        assignMessagingEndpoint(parentId: string,childId: string): Promise<Boolean>;
        unassignMessagingEndpoint(parentId: string,childId: string): Promise<Boolean>;
        getRetentionPolicy(parentId: string): Promise<DataRetentionPolicy | null>;
        assignRetentionPolicy(parentId: string,childId: string): Promise<Boolean>;
        unassignRetentionPolicy(parentId: string,childId: string): Promise<Boolean>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
    };
    // -----------------------------------------
    // CommandDefinition interface
    // -----------------------------------------
    commandDefinition: {

        // -----------------------------------------
        // traditional
        // -----------------------------------------

        find(id: string): Promise<CommandDefinition | null>;
        findAll(options?: PaginationOptions): Promise<CommandDefinition[]>;
        add(input: CommandDefinition): Promise<CommandDefinition>;
        update(input: CommandDefinition): Promise<CommandDefinition>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getDeviceModel(parentId: string): Promise<DeviceModel | null>;
        assignDeviceModel(parentId: string,childId: string): Promise<Boolean>;
        unassignDeviceModel(parentId: string,childId: string): Promise<Boolean>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        getActuators(parentId: string): Promise<ActuatorInstance[]>;
        addToActuators(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromActuators(parentId: string,childIds: string[]): Promise<Boolean>;

        getCommandInvocations(parentId: string): Promise<CommandInvocation[]>;
        addToCommandInvocations(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromCommandInvocations(parentId: string,childIds: string[]): Promise<Boolean>;

    };
    // -----------------------------------------
    // CommandInvocation interface
    // -----------------------------------------
    commandInvocation: {

        // -----------------------------------------
        // traditional
        // -----------------------------------------

        find(id: string): Promise<CommandInvocation | null>;
        findAll(options?: PaginationOptions): Promise<CommandInvocation[]>;
        add(input: CommandInvocation): Promise<CommandInvocation>;
        update(input: CommandInvocation): Promise<CommandInvocation>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getDevice(parentId: string): Promise<IoTDevice | null>;
        assignDevice(parentId: string,childId: string): Promise<Boolean>;
        unassignDevice(parentId: string,childId: string): Promise<Boolean>;
        getCommandDefinition(parentId: string): Promise<CommandDefinition | null>;
        assignCommandDefinition(parentId: string,childId: string): Promise<Boolean>;
        unassignCommandDefinition(parentId: string,childId: string): Promise<Boolean>;
        getActuator(parentId: string): Promise<ActuatorInstance | null>;
        assignActuator(parentId: string,childId: string): Promise<Boolean>;
        unassignActuator(parentId: string,childId: string): Promise<Boolean>;
        getUser(parentId: string): Promise<TenantUser | null>;
        assignUser(parentId: string,childId: string): Promise<Boolean>;
        unassignUser(parentId: string,childId: string): Promise<Boolean>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
    };
    // -----------------------------------------
    // AlertRule interface
    // -----------------------------------------
    alertRule: {

        // -----------------------------------------
        // traditional
        // -----------------------------------------

        find(id: string): Promise<AlertRule | null>;
        findAll(options?: PaginationOptions): Promise<AlertRule[]>;
        add(input: AlertRule): Promise<AlertRule>;
        update(input: AlertRule): Promise<AlertRule>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getTenant(parentId: string): Promise<Tenant | null>;
        assignTenant(parentId: string,childId: string): Promise<Boolean>;
        unassignTenant(parentId: string,childId: string): Promise<Boolean>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        getStreams(parentId: string): Promise<TelemetryStream[]>;
        addToStreams(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromStreams(parentId: string,childIds: string[]): Promise<Boolean>;

        getAlerts(parentId: string): Promise<Alert[]>;
        addToAlerts(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromAlerts(parentId: string,childIds: string[]): Promise<Boolean>;

    };
    // -----------------------------------------
    // Alert interface
    // -----------------------------------------
    alert: {

        // -----------------------------------------
        // traditional
        // -----------------------------------------

        find(id: string): Promise<Alert | null>;
        findAll(options?: PaginationOptions): Promise<Alert[]>;
        add(input: Alert): Promise<Alert>;
        update(input: Alert): Promise<Alert>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getDevice(parentId: string): Promise<IoTDevice | null>;
        assignDevice(parentId: string,childId: string): Promise<Boolean>;
        unassignDevice(parentId: string,childId: string): Promise<Boolean>;
        getAlertRule(parentId: string): Promise<AlertRule | null>;
        assignAlertRule(parentId: string,childId: string): Promise<Boolean>;
        unassignAlertRule(parentId: string,childId: string): Promise<Boolean>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
    };
    // -----------------------------------------
    // Tenant interface
    // -----------------------------------------
    tenant: {

        // -----------------------------------------
        // traditional
        // -----------------------------------------

        find(id: string): Promise<Tenant | null>;
        findAll(options?: PaginationOptions): Promise<Tenant[]>;
        add(input: Tenant): Promise<Tenant>;
        update(input: Tenant): Promise<Tenant>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------


        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        getSites(parentId: string): Promise<Site[]>;
        addToSites(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromSites(parentId: string,childIds: string[]): Promise<Boolean>;

        getUsers(parentId: string): Promise<TenantUser[]>;
        addToUsers(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromUsers(parentId: string,childIds: string[]): Promise<Boolean>;

        getDevices(parentId: string): Promise<IoTDevice[]>;
        addToDevices(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromDevices(parentId: string,childIds: string[]): Promise<Boolean>;

        getDataRetentionPolicies(parentId: string): Promise<DataRetentionPolicy[]>;
        addToDataRetentionPolicies(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromDataRetentionPolicies(parentId: string,childIds: string[]): Promise<Boolean>;

        getConnectivityPlans(parentId: string): Promise<ConnectivityPlan[]>;
        addToConnectivityPlans(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromConnectivityPlans(parentId: string,childIds: string[]): Promise<Boolean>;

        getSimCards(parentId: string): Promise<SimCard[]>;
        addToSimCards(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromSimCards(parentId: string,childIds: string[]): Promise<Boolean>;

        getMessagingEndpoints(parentId: string): Promise<MessagingEndpoint[]>;
        addToMessagingEndpoints(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromMessagingEndpoints(parentId: string,childIds: string[]): Promise<Boolean>;

        getAccessPolicies(parentId: string): Promise<AccessPolicy[]>;
        addToAccessPolicies(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromAccessPolicies(parentId: string,childIds: string[]): Promise<Boolean>;

        getDeviceGroups(parentId: string): Promise<DeviceGroup[]>;
        addToDeviceGroups(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromDeviceGroups(parentId: string,childIds: string[]): Promise<Boolean>;

        getAlertRules(parentId: string): Promise<AlertRule[]>;
        addToAlertRules(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromAlertRules(parentId: string,childIds: string[]): Promise<Boolean>;

        getMaintenanceTickets(parentId: string): Promise<MaintenanceTicket[]>;
        addToMaintenanceTickets(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromMaintenanceTickets(parentId: string,childIds: string[]): Promise<Boolean>;

        getUsageRecords(parentId: string): Promise<UsageRecord[]>;
        addToUsageRecords(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromUsageRecords(parentId: string,childIds: string[]): Promise<Boolean>;

    };
    // -----------------------------------------
    // TenantUser interface
    // -----------------------------------------
    tenantUser: {

        // -----------------------------------------
        // traditional
        // -----------------------------------------

        find(id: string): Promise<TenantUser | null>;
        findAll(options?: PaginationOptions): Promise<TenantUser[]>;
        add(input: TenantUser): Promise<TenantUser>;
        update(input: TenantUser): Promise<TenantUser>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getTenant(parentId: string): Promise<Tenant | null>;
        assignTenant(parentId: string,childId: string): Promise<Boolean>;
        unassignTenant(parentId: string,childId: string): Promise<Boolean>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        getCommandInvocations(parentId: string): Promise<CommandInvocation[]>;
        addToCommandInvocations(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromCommandInvocations(parentId: string,childIds: string[]): Promise<Boolean>;

    };
    // -----------------------------------------
    // Site interface
    // -----------------------------------------
    site: {

        // -----------------------------------------
        // traditional
        // -----------------------------------------

        find(id: string): Promise<Site | null>;
        findAll(options?: PaginationOptions): Promise<Site[]>;
        add(input: Site): Promise<Site>;
        update(input: Site): Promise<Site>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getTenant(parentId: string): Promise<Tenant | null>;
        assignTenant(parentId: string,childId: string): Promise<Boolean>;
        unassignTenant(parentId: string,childId: string): Promise<Boolean>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        getBuildings(parentId: string): Promise<Building[]>;
        addToBuildings(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromBuildings(parentId: string,childIds: string[]): Promise<Boolean>;

        getDevices(parentId: string): Promise<IoTDevice[]>;
        addToDevices(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromDevices(parentId: string,childIds: string[]): Promise<Boolean>;

        getGateways(parentId: string): Promise<Gateway[]>;
        addToGateways(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromGateways(parentId: string,childIds: string[]): Promise<Boolean>;

    };
    // -----------------------------------------
    // Building interface
    // -----------------------------------------
    building: {

        // -----------------------------------------
        // traditional
        // -----------------------------------------

        find(id: string): Promise<Building | null>;
        findAll(options?: PaginationOptions): Promise<Building[]>;
        add(input: Building): Promise<Building>;
        update(input: Building): Promise<Building>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getSite(parentId: string): Promise<Site | null>;
        assignSite(parentId: string,childId: string): Promise<Boolean>;
        unassignSite(parentId: string,childId: string): Promise<Boolean>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        getFloors(parentId: string): Promise<Floor[]>;
        addToFloors(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromFloors(parentId: string,childIds: string[]): Promise<Boolean>;

    };
    // -----------------------------------------
    // Floor interface
    // -----------------------------------------
    floor: {

        // -----------------------------------------
        // traditional
        // -----------------------------------------

        find(id: string): Promise<Floor | null>;
        findAll(options?: PaginationOptions): Promise<Floor[]>;
        add(input: Floor): Promise<Floor>;
        update(input: Floor): Promise<Floor>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getBuilding(parentId: string): Promise<Building | null>;
        assignBuilding(parentId: string,childId: string): Promise<Boolean>;
        unassignBuilding(parentId: string,childId: string): Promise<Boolean>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        getRooms(parentId: string): Promise<Room[]>;
        addToRooms(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromRooms(parentId: string,childIds: string[]): Promise<Boolean>;

    };
    // -----------------------------------------
    // Room interface
    // -----------------------------------------
    room: {

        // -----------------------------------------
        // traditional
        // -----------------------------------------

        find(id: string): Promise<Room | null>;
        findAll(options?: PaginationOptions): Promise<Room[]>;
        add(input: Room): Promise<Room>;
        update(input: Room): Promise<Room>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getFloor(parentId: string): Promise<Floor | null>;
        assignFloor(parentId: string,childId: string): Promise<Boolean>;
        unassignFloor(parentId: string,childId: string): Promise<Boolean>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        getDevices(parentId: string): Promise<IoTDevice[]>;
        addToDevices(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromDevices(parentId: string,childIds: string[]): Promise<Boolean>;

        getGateways(parentId: string): Promise<Gateway[]>;
        addToGateways(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromGateways(parentId: string,childIds: string[]): Promise<Boolean>;

    };
    // -----------------------------------------
    // Gateway interface
    // -----------------------------------------
    gateway: {

        // -----------------------------------------
        // traditional
        // -----------------------------------------

        find(id: string): Promise<Gateway | null>;
        findAll(options?: PaginationOptions): Promise<Gateway[]>;
        add(input: Gateway): Promise<Gateway>;
        update(input: Gateway): Promise<Gateway>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getSite(parentId: string): Promise<Site | null>;
        assignSite(parentId: string,childId: string): Promise<Boolean>;
        unassignSite(parentId: string,childId: string): Promise<Boolean>;
        getRoom(parentId: string): Promise<Room | null>;
        assignRoom(parentId: string,childId: string): Promise<Boolean>;
        unassignRoom(parentId: string,childId: string): Promise<Boolean>;
        getDigitalTwin(parentId: string): Promise<DigitalTwin | null>;
        assignDigitalTwin(parentId: string,childId: string): Promise<Boolean>;
        unassignDigitalTwin(parentId: string,childId: string): Promise<Boolean>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        getDevices(parentId: string): Promise<IoTDevice[]>;
        addToDevices(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromDevices(parentId: string,childIds: string[]): Promise<Boolean>;

        getEdgeApplications(parentId: string): Promise<EdgeApplication[]>;
        addToEdgeApplications(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromEdgeApplications(parentId: string,childIds: string[]): Promise<Boolean>;

        getCertificates(parentId: string): Promise<DeviceCertificate[]>;
        addToCertificates(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromCertificates(parentId: string,childIds: string[]): Promise<Boolean>;

        getNetworkProfiles(parentId: string): Promise<NetworkProfile[]>;
        addToNetworkProfiles(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromNetworkProfiles(parentId: string,childIds: string[]): Promise<Boolean>;

    };
    // -----------------------------------------
    // EdgeApplication interface
    // -----------------------------------------
    edgeApplication: {

        // -----------------------------------------
        // traditional
        // -----------------------------------------

        find(id: string): Promise<EdgeApplication | null>;
        findAll(options?: PaginationOptions): Promise<EdgeApplication[]>;
        add(input: EdgeApplication): Promise<EdgeApplication>;
        update(input: EdgeApplication): Promise<EdgeApplication>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getGateway(parentId: string): Promise<Gateway | null>;
        assignGateway(parentId: string,childId: string): Promise<Boolean>;
        unassignGateway(parentId: string,childId: string): Promise<Boolean>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
    };
    // -----------------------------------------
    // NetworkProfile interface
    // -----------------------------------------
    networkProfile: {

        // -----------------------------------------
        // traditional
        // -----------------------------------------

        find(id: string): Promise<NetworkProfile | null>;
        findAll(options?: PaginationOptions): Promise<NetworkProfile[]>;
        add(input: NetworkProfile): Promise<NetworkProfile>;
        update(input: NetworkProfile): Promise<NetworkProfile>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getDevice(parentId: string): Promise<IoTDevice | null>;
        assignDevice(parentId: string,childId: string): Promise<Boolean>;
        unassignDevice(parentId: string,childId: string): Promise<Boolean>;
        getGateway(parentId: string): Promise<Gateway | null>;
        assignGateway(parentId: string,childId: string): Promise<Boolean>;
        unassignGateway(parentId: string,childId: string): Promise<Boolean>;
        getSimCard(parentId: string): Promise<SimCard | null>;
        assignSimCard(parentId: string,childId: string): Promise<Boolean>;
        unassignSimCard(parentId: string,childId: string): Promise<Boolean>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
    };
    // -----------------------------------------
    // SimCard interface
    // -----------------------------------------
    simCard: {

        // -----------------------------------------
        // traditional
        // -----------------------------------------

        find(id: string): Promise<SimCard | null>;
        findAll(options?: PaginationOptions): Promise<SimCard[]>;
        add(input: SimCard): Promise<SimCard>;
        update(input: SimCard): Promise<SimCard>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getTenant(parentId: string): Promise<Tenant | null>;
        assignTenant(parentId: string,childId: string): Promise<Boolean>;
        unassignTenant(parentId: string,childId: string): Promise<Boolean>;
        getConnectivityPlan(parentId: string): Promise<ConnectivityPlan | null>;
        assignConnectivityPlan(parentId: string,childId: string): Promise<Boolean>;
        unassignConnectivityPlan(parentId: string,childId: string): Promise<Boolean>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        getNetworkProfiles(parentId: string): Promise<NetworkProfile[]>;
        addToNetworkProfiles(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromNetworkProfiles(parentId: string,childIds: string[]): Promise<Boolean>;

    };
    // -----------------------------------------
    // ConnectivityPlan interface
    // -----------------------------------------
    connectivityPlan: {

        // -----------------------------------------
        // traditional
        // -----------------------------------------

        find(id: string): Promise<ConnectivityPlan | null>;
        findAll(options?: PaginationOptions): Promise<ConnectivityPlan[]>;
        add(input: ConnectivityPlan): Promise<ConnectivityPlan>;
        update(input: ConnectivityPlan): Promise<ConnectivityPlan>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getTenant(parentId: string): Promise<Tenant | null>;
        assignTenant(parentId: string,childId: string): Promise<Boolean>;
        unassignTenant(parentId: string,childId: string): Promise<Boolean>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        getSimCards(parentId: string): Promise<SimCard[]>;
        addToSimCards(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromSimCards(parentId: string,childIds: string[]): Promise<Boolean>;

    };
    // -----------------------------------------
    // MessagingEndpoint interface
    // -----------------------------------------
    messagingEndpoint: {

        // -----------------------------------------
        // traditional
        // -----------------------------------------

        find(id: string): Promise<MessagingEndpoint | null>;
        findAll(options?: PaginationOptions): Promise<MessagingEndpoint[]>;
        add(input: MessagingEndpoint): Promise<MessagingEndpoint>;
        update(input: MessagingEndpoint): Promise<MessagingEndpoint>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getTenant(parentId: string): Promise<Tenant | null>;
        assignTenant(parentId: string,childId: string): Promise<Boolean>;
        unassignTenant(parentId: string,childId: string): Promise<Boolean>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        getStreams(parentId: string): Promise<TelemetryStream[]>;
        addToStreams(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromStreams(parentId: string,childIds: string[]): Promise<Boolean>;

    };
    // -----------------------------------------
    // AccessPolicy interface
    // -----------------------------------------
    accessPolicy: {

        // -----------------------------------------
        // traditional
        // -----------------------------------------

        find(id: string): Promise<AccessPolicy | null>;
        findAll(options?: PaginationOptions): Promise<AccessPolicy[]>;
        add(input: AccessPolicy): Promise<AccessPolicy>;
        update(input: AccessPolicy): Promise<AccessPolicy>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getTenant(parentId: string): Promise<Tenant | null>;
        assignTenant(parentId: string,childId: string): Promise<Boolean>;
        unassignTenant(parentId: string,childId: string): Promise<Boolean>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        getApiKeys(parentId: string): Promise<ApiKey[]>;
        addToApiKeys(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromApiKeys(parentId: string,childIds: string[]): Promise<Boolean>;

        getUsers(parentId: string): Promise<TenantUser[]>;
        addToUsers(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromUsers(parentId: string,childIds: string[]): Promise<Boolean>;

    };
    // -----------------------------------------
    // ApiKey interface
    // -----------------------------------------
    apiKey: {

        // -----------------------------------------
        // traditional
        // -----------------------------------------

        find(id: string): Promise<ApiKey | null>;
        findAll(options?: PaginationOptions): Promise<ApiKey[]>;
        add(input: ApiKey): Promise<ApiKey>;
        update(input: ApiKey): Promise<ApiKey>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getAccessPolicy(parentId: string): Promise<AccessPolicy | null>;
        assignAccessPolicy(parentId: string,childId: string): Promise<Boolean>;
        unassignAccessPolicy(parentId: string,childId: string): Promise<Boolean>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
    };
    // -----------------------------------------
    // DeviceCertificate interface
    // -----------------------------------------
    deviceCertificate: {

        // -----------------------------------------
        // traditional
        // -----------------------------------------

        find(id: string): Promise<DeviceCertificate | null>;
        findAll(options?: PaginationOptions): Promise<DeviceCertificate[]>;
        add(input: DeviceCertificate): Promise<DeviceCertificate>;
        update(input: DeviceCertificate): Promise<DeviceCertificate>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getDevice(parentId: string): Promise<IoTDevice | null>;
        assignDevice(parentId: string,childId: string): Promise<Boolean>;
        unassignDevice(parentId: string,childId: string): Promise<Boolean>;
        getGateway(parentId: string): Promise<Gateway | null>;
        assignGateway(parentId: string,childId: string): Promise<Boolean>;
        unassignGateway(parentId: string,childId: string): Promise<Boolean>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
    };
    // -----------------------------------------
    // ProvisioningRecord interface
    // -----------------------------------------
    provisioningRecord: {

        // -----------------------------------------
        // traditional
        // -----------------------------------------

        find(id: string): Promise<ProvisioningRecord | null>;
        findAll(options?: PaginationOptions): Promise<ProvisioningRecord[]>;
        add(input: ProvisioningRecord): Promise<ProvisioningRecord>;
        update(input: ProvisioningRecord): Promise<ProvisioningRecord>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getDevice(parentId: string): Promise<IoTDevice | null>;
        assignDevice(parentId: string,childId: string): Promise<Boolean>;
        unassignDevice(parentId: string,childId: string): Promise<Boolean>;
        getCertificate(parentId: string): Promise<DeviceCertificate | null>;
        assignCertificate(parentId: string,childId: string): Promise<Boolean>;
        unassignCertificate(parentId: string,childId: string): Promise<Boolean>;
        getTenant(parentId: string): Promise<Tenant | null>;
        assignTenant(parentId: string,childId: string): Promise<Boolean>;
        unassignTenant(parentId: string,childId: string): Promise<Boolean>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
    };
    // -----------------------------------------
    // DigitalTwin interface
    // -----------------------------------------
    digitalTwin: {

        // -----------------------------------------
        // traditional
        // -----------------------------------------

        find(id: string): Promise<DigitalTwin | null>;
        findAll(options?: PaginationOptions): Promise<DigitalTwin[]>;
        add(input: DigitalTwin): Promise<DigitalTwin>;
        update(input: DigitalTwin): Promise<DigitalTwin>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getDevice(parentId: string): Promise<IoTDevice | null>;
        assignDevice(parentId: string,childId: string): Promise<Boolean>;
        unassignDevice(parentId: string,childId: string): Promise<Boolean>;
        getGateway(parentId: string): Promise<Gateway | null>;
        assignGateway(parentId: string,childId: string): Promise<Boolean>;
        unassignGateway(parentId: string,childId: string): Promise<Boolean>;
        getTemplate(parentId: string): Promise<TwinTemplate | null>;
        assignTemplate(parentId: string,childId: string): Promise<Boolean>;
        unassignTemplate(parentId: string,childId: string): Promise<Boolean>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        getChangeEvents(parentId: string): Promise<TwinChangeEvent[]>;
        addToChangeEvents(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromChangeEvents(parentId: string,childIds: string[]): Promise<Boolean>;

    };
    // -----------------------------------------
    // TwinTemplate interface
    // -----------------------------------------
    twinTemplate: {

        // -----------------------------------------
        // traditional
        // -----------------------------------------

        find(id: string): Promise<TwinTemplate | null>;
        findAll(options?: PaginationOptions): Promise<TwinTemplate[]>;
        add(input: TwinTemplate): Promise<TwinTemplate>;
        update(input: TwinTemplate): Promise<TwinTemplate>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------


        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        getDeviceModels(parentId: string): Promise<DeviceModel[]>;
        addToDeviceModels(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromDeviceModels(parentId: string,childIds: string[]): Promise<Boolean>;

    };
    // -----------------------------------------
    // TwinChangeEvent interface
    // -----------------------------------------
    twinChangeEvent: {

        // -----------------------------------------
        // traditional
        // -----------------------------------------

        find(id: string): Promise<TwinChangeEvent | null>;
        findAll(options?: PaginationOptions): Promise<TwinChangeEvent[]>;
        add(input: TwinChangeEvent): Promise<TwinChangeEvent>;
        update(input: TwinChangeEvent): Promise<TwinChangeEvent>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getTwin(parentId: string): Promise<DigitalTwin | null>;
        assignTwin(parentId: string,childId: string): Promise<Boolean>;
        unassignTwin(parentId: string,childId: string): Promise<Boolean>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
    };
    // -----------------------------------------
    // MaintenanceTicket interface
    // -----------------------------------------
    maintenanceTicket: {

        // -----------------------------------------
        // traditional
        // -----------------------------------------

        find(id: string): Promise<MaintenanceTicket | null>;
        findAll(options?: PaginationOptions): Promise<MaintenanceTicket[]>;
        add(input: MaintenanceTicket): Promise<MaintenanceTicket>;
        update(input: MaintenanceTicket): Promise<MaintenanceTicket>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getDevice(parentId: string): Promise<IoTDevice | null>;
        assignDevice(parentId: string,childId: string): Promise<Boolean>;
        unassignDevice(parentId: string,childId: string): Promise<Boolean>;
        getTenant(parentId: string): Promise<Tenant | null>;
        assignTenant(parentId: string,childId: string): Promise<Boolean>;
        unassignTenant(parentId: string,childId: string): Promise<Boolean>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
    };
    // -----------------------------------------
    // DataRetentionPolicy interface
    // -----------------------------------------
    dataRetentionPolicy: {

        // -----------------------------------------
        // traditional
        // -----------------------------------------

        find(id: string): Promise<DataRetentionPolicy | null>;
        findAll(options?: PaginationOptions): Promise<DataRetentionPolicy[]>;
        add(input: DataRetentionPolicy): Promise<DataRetentionPolicy>;
        update(input: DataRetentionPolicy): Promise<DataRetentionPolicy>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getTenant(parentId: string): Promise<Tenant | null>;
        assignTenant(parentId: string,childId: string): Promise<Boolean>;
        unassignTenant(parentId: string,childId: string): Promise<Boolean>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        getStreams(parentId: string): Promise<TelemetryStream[]>;
        addToStreams(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromStreams(parentId: string,childIds: string[]): Promise<Boolean>;

    };
    // -----------------------------------------
    // SoftwareUpdateCampaign interface
    // -----------------------------------------
    softwareUpdateCampaign: {

        // -----------------------------------------
        // traditional
        // -----------------------------------------

        find(id: string): Promise<SoftwareUpdateCampaign | null>;
        findAll(options?: PaginationOptions): Promise<SoftwareUpdateCampaign[]>;
        add(input: SoftwareUpdateCampaign): Promise<SoftwareUpdateCampaign>;
        update(input: SoftwareUpdateCampaign): Promise<SoftwareUpdateCampaign>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getFirmwareRelease(parentId: string): Promise<FirmwareRelease | null>;
        assignFirmwareRelease(parentId: string,childId: string): Promise<Boolean>;
        unassignFirmwareRelease(parentId: string,childId: string): Promise<Boolean>;
        getDeviceGroup(parentId: string): Promise<DeviceGroup | null>;
        assignDeviceGroup(parentId: string,childId: string): Promise<Boolean>;
        unassignDeviceGroup(parentId: string,childId: string): Promise<Boolean>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        getExecutions(parentId: string): Promise<SoftwareUpdateExecution[]>;
        addToExecutions(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromExecutions(parentId: string,childIds: string[]): Promise<Boolean>;

    };
    // -----------------------------------------
    // SoftwareUpdateExecution interface
    // -----------------------------------------
    softwareUpdateExecution: {

        // -----------------------------------------
        // traditional
        // -----------------------------------------

        find(id: string): Promise<SoftwareUpdateExecution | null>;
        findAll(options?: PaginationOptions): Promise<SoftwareUpdateExecution[]>;
        add(input: SoftwareUpdateExecution): Promise<SoftwareUpdateExecution>;
        update(input: SoftwareUpdateExecution): Promise<SoftwareUpdateExecution>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getCampaign(parentId: string): Promise<SoftwareUpdateCampaign | null>;
        assignCampaign(parentId: string,childId: string): Promise<Boolean>;
        unassignCampaign(parentId: string,childId: string): Promise<Boolean>;
        getDevice(parentId: string): Promise<IoTDevice | null>;
        assignDevice(parentId: string,childId: string): Promise<Boolean>;
        unassignDevice(parentId: string,childId: string): Promise<Boolean>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
    };
    // -----------------------------------------
    // DeviceGroup interface
    // -----------------------------------------
    deviceGroup: {

        // -----------------------------------------
        // traditional
        // -----------------------------------------

        find(id: string): Promise<DeviceGroup | null>;
        findAll(options?: PaginationOptions): Promise<DeviceGroup[]>;
        add(input: DeviceGroup): Promise<DeviceGroup>;
        update(input: DeviceGroup): Promise<DeviceGroup>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getTenant(parentId: string): Promise<Tenant | null>;
        assignTenant(parentId: string,childId: string): Promise<Boolean>;
        unassignTenant(parentId: string,childId: string): Promise<Boolean>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
        getDevices(parentId: string): Promise<IoTDevice[]>;
        addToDevices(parentId: string,childIds: string[]): Promise<Boolean>;
        removeFromDevices(parentId: string,childIds: string[]): Promise<Boolean>;

    };
    // -----------------------------------------
    // UsageRecord interface
    // -----------------------------------------
    usageRecord: {

        // -----------------------------------------
        // traditional
        // -----------------------------------------

        find(id: string): Promise<UsageRecord | null>;
        findAll(options?: PaginationOptions): Promise<UsageRecord[]>;
        add(input: UsageRecord): Promise<UsageRecord>;
        update(input: UsageRecord): Promise<UsageRecord>;
        remove(id: string): Promise<boolean>;

        // -----------------------------------------
        // single association(s)
        // -----------------------------------------

        getTenant(parentId: string): Promise<Tenant | null>;
        assignTenant(parentId: string,childId: string): Promise<Boolean>;
        unassignTenant(parentId: string,childId: string): Promise<Boolean>;
        getDevice(parentId: string): Promise<IoTDevice | null>;
        assignDevice(parentId: string,childId: string): Promise<Boolean>;
        unassignDevice(parentId: string,childId: string): Promise<Boolean>;
        getConnectivityPlan(parentId: string): Promise<ConnectivityPlan | null>;
        assignConnectivityPlan(parentId: string,childId: string): Promise<Boolean>;
        unassignConnectivityPlan(parentId: string,childId: string): Promise<Boolean>;

        // -----------------------------------------
        // multiple association(s)
        // -----------------------------------------
    };
}