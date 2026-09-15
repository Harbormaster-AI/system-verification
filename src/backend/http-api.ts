import axios, { AxiosInstance } from "axios";

import {
    BackendAPI,
    PaginationOptions
} from "./api.js";

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

export class HttpBackendAPI implements BackendAPI {

    private readonly http: AxiosInstance;

    constructor(
        baseURL: string = process.env.BACKEND_URL || "http://localhost:8080"
    ) {
        this.http = axios.create({
            baseURL,
            timeout: Number(process.env.BACKEND_TIMEOUT) || 30000,
            headers: {
                "Content-Type": "application/json"
            }
        });

        this.http.interceptors.request.use(config => {
            const token = process.env.BACKEND_TOKEN;

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
        });
    }

    deviceVendor = {
        find: async (id: string): Promise<DeviceVendor | null> => {
            const response = await this.http.post(`/DeviceVendor/post`,
                {
                    id
                }
            );
            return response.data;
        },

        findAll: async (paginationOptions?: PaginationOptions): Promise<DeviceVendor[]> => {
            const response = await this.http.post(`/DeviceVendor/`,
                {
                    pageSize: paginationOptions?.pageSize,
                    after: paginationOptions?.after
                }
            );

            return response.data;
        },

        add: async ( input: DeviceVendor): Promise<DeviceVendor> => {
            const response = await this.http.post(`/DeviceVendor/create`, input);
            return response.data;
        },

        update: async (args: DeviceVendor ): Promise<DeviceVendor> => {
            const response = await this.http.put(`/DeviceVendor/update/`, args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            const response = await this.http.post( `/DeviceVendor/delete/`,  { id } );
            return response.data;
        },

        getDeviceModels: async (parentId: string): Promise<DeviceModel[]> => {
            const response = await this.http.put(`/DeviceVendor/getDeviceModels/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToDeviceModels: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/DeviceVendor/addToDeviceModels/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        removeFromDeviceModels: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/DeviceVendor/removeFromDeviceModels/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        getFirmwareReleases: async (parentId: string): Promise<FirmwareRelease[]> => {
            const response = await this.http.put(`/DeviceVendor/getFirmwareReleases/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToFirmwareReleases: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/DeviceVendor/addToFirmwareReleases/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        removeFromFirmwareReleases: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/DeviceVendor/removeFromFirmwareReleases/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        getHardwareModules: async (parentId: string): Promise<HardwareModule[]> => {
            const response = await this.http.put(`/DeviceVendor/getHardwareModules/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToHardwareModules: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/DeviceVendor/addToHardwareModules/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        removeFromHardwareModules: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/DeviceVendor/removeFromHardwareModules/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },


};


    hardwareModule = {
        find: async (id: string): Promise<HardwareModule | null> => {
            const response = await this.http.post(`/HardwareModule/post`,
                {
                    id
                }
            );
            return response.data;
        },

        findAll: async (paginationOptions?: PaginationOptions): Promise<HardwareModule[]> => {
            const response = await this.http.post(`/HardwareModule/`,
                {
                    pageSize: paginationOptions?.pageSize,
                    after: paginationOptions?.after
                }
            );

            return response.data;
        },

        add: async ( input: HardwareModule): Promise<HardwareModule> => {
            const response = await this.http.post(`/HardwareModule/create`, input);
            return response.data;
        },

        update: async (args: HardwareModule ): Promise<HardwareModule> => {
            const response = await this.http.put(`/HardwareModule/update/`, args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            const response = await this.http.post( `/HardwareModule/delete/`,  { id } );
            return response.data;
        },

        getVendor: async (parentId: string): Promise<DeviceVendor | null> => {
            const response = await this.http.put(`/HardwareModule/getVendor`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignVendor: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/HardwareModule/assignVendor`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        unassignVendor: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/HardwareModule/unassignVendor`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },


};


    deviceModel = {
        find: async (id: string): Promise<DeviceModel | null> => {
            const response = await this.http.post(`/DeviceModel/post`,
                {
                    id
                }
            );
            return response.data;
        },

        findAll: async (paginationOptions?: PaginationOptions): Promise<DeviceModel[]> => {
            const response = await this.http.post(`/DeviceModel/`,
                {
                    pageSize: paginationOptions?.pageSize,
                    after: paginationOptions?.after
                }
            );

            return response.data;
        },

        add: async ( input: DeviceModel): Promise<DeviceModel> => {
            const response = await this.http.post(`/DeviceModel/create`, input);
            return response.data;
        },

        update: async (args: DeviceModel ): Promise<DeviceModel> => {
            const response = await this.http.put(`/DeviceModel/update/`, args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            const response = await this.http.post( `/DeviceModel/delete/`,  { id } );
            return response.data;
        },

        getVendor: async (parentId: string): Promise<DeviceVendor | null> => {
            const response = await this.http.put(`/DeviceModel/getVendor`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignVendor: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/DeviceModel/assignVendor`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        unassignVendor: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/DeviceModel/unassignVendor`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        getTwinTemplate: async (parentId: string): Promise<TwinTemplate | null> => {
            const response = await this.http.put(`/DeviceModel/getTwinTemplate`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignTwinTemplate: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/DeviceModel/assignTwinTemplate`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        unassignTwinTemplate: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/DeviceModel/unassignTwinTemplate`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        getHardwareModules: async (parentId: string): Promise<HardwareModule[]> => {
            const response = await this.http.put(`/DeviceModel/getHardwareModules/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToHardwareModules: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/DeviceModel/addToHardwareModules/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        removeFromHardwareModules: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/DeviceModel/removeFromHardwareModules/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        getFirmwareReleases: async (parentId: string): Promise<FirmwareRelease[]> => {
            const response = await this.http.put(`/DeviceModel/getFirmwareReleases/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToFirmwareReleases: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/DeviceModel/addToFirmwareReleases/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        removeFromFirmwareReleases: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/DeviceModel/removeFromFirmwareReleases/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        getCommandDefinitions: async (parentId: string): Promise<CommandDefinition[]> => {
            const response = await this.http.put(`/DeviceModel/getCommandDefinitions/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToCommandDefinitions: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/DeviceModel/addToCommandDefinitions/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        removeFromCommandDefinitions: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/DeviceModel/removeFromCommandDefinitions/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },


};


    firmwareRelease = {
        find: async (id: string): Promise<FirmwareRelease | null> => {
            const response = await this.http.post(`/FirmwareRelease/post`,
                {
                    id
                }
            );
            return response.data;
        },

        findAll: async (paginationOptions?: PaginationOptions): Promise<FirmwareRelease[]> => {
            const response = await this.http.post(`/FirmwareRelease/`,
                {
                    pageSize: paginationOptions?.pageSize,
                    after: paginationOptions?.after
                }
            );

            return response.data;
        },

        add: async ( input: FirmwareRelease): Promise<FirmwareRelease> => {
            const response = await this.http.post(`/FirmwareRelease/create`, input);
            return response.data;
        },

        update: async (args: FirmwareRelease ): Promise<FirmwareRelease> => {
            const response = await this.http.put(`/FirmwareRelease/update/`, args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            const response = await this.http.post( `/FirmwareRelease/delete/`,  { id } );
            return response.data;
        },

        getDeviceModel: async (parentId: string): Promise<DeviceModel | null> => {
            const response = await this.http.put(`/FirmwareRelease/getDeviceModel`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignDeviceModel: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/FirmwareRelease/assignDeviceModel`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        unassignDeviceModel: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/FirmwareRelease/unassignDeviceModel`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },


};


    ioTDevice = {
        find: async (id: string): Promise<IoTDevice | null> => {
            const response = await this.http.post(`/IoTDevice/post`,
                {
                    id
                }
            );
            return response.data;
        },

        findAll: async (paginationOptions?: PaginationOptions): Promise<IoTDevice[]> => {
            const response = await this.http.post(`/IoTDevice/`,
                {
                    pageSize: paginationOptions?.pageSize,
                    after: paginationOptions?.after
                }
            );

            return response.data;
        },

        add: async ( input: IoTDevice): Promise<IoTDevice> => {
            const response = await this.http.post(`/IoTDevice/create`, input);
            return response.data;
        },

        update: async (args: IoTDevice ): Promise<IoTDevice> => {
            const response = await this.http.put(`/IoTDevice/update/`, args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            const response = await this.http.post( `/IoTDevice/delete/`,  { id } );
            return response.data;
        },

        getDeviceModel: async (parentId: string): Promise<DeviceModel | null> => {
            const response = await this.http.put(`/IoTDevice/getDeviceModel`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignDeviceModel: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/IoTDevice/assignDeviceModel`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        unassignDeviceModel: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/IoTDevice/unassignDeviceModel`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        getTenant: async (parentId: string): Promise<Tenant | null> => {
            const response = await this.http.put(`/IoTDevice/getTenant`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignTenant: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/IoTDevice/assignTenant`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        unassignTenant: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/IoTDevice/unassignTenant`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        getSite: async (parentId: string): Promise<Site | null> => {
            const response = await this.http.put(`/IoTDevice/getSite`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignSite: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/IoTDevice/assignSite`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        unassignSite: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/IoTDevice/unassignSite`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        getRoom: async (parentId: string): Promise<Room | null> => {
            const response = await this.http.put(`/IoTDevice/getRoom`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignRoom: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/IoTDevice/assignRoom`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        unassignRoom: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/IoTDevice/unassignRoom`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        getGateway: async (parentId: string): Promise<Gateway | null> => {
            const response = await this.http.put(`/IoTDevice/getGateway`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignGateway: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/IoTDevice/assignGateway`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        unassignGateway: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/IoTDevice/unassignGateway`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        getDigitalTwin: async (parentId: string): Promise<DigitalTwin | null> => {
            const response = await this.http.put(`/IoTDevice/getDigitalTwin`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignDigitalTwin: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/IoTDevice/assignDigitalTwin`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        unassignDigitalTwin: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/IoTDevice/unassignDigitalTwin`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        getProvisioningRecord: async (parentId: string): Promise<ProvisioningRecord | null> => {
            const response = await this.http.put(`/IoTDevice/getProvisioningRecord`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignProvisioningRecord: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/IoTDevice/assignProvisioningRecord`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        unassignProvisioningRecord: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/IoTDevice/unassignProvisioningRecord`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        getSensors: async (parentId: string): Promise<SensorInstance[]> => {
            const response = await this.http.put(`/IoTDevice/getSensors/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToSensors: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/IoTDevice/addToSensors/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        removeFromSensors: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/IoTDevice/removeFromSensors/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        getActuators: async (parentId: string): Promise<ActuatorInstance[]> => {
            const response = await this.http.put(`/IoTDevice/getActuators/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToActuators: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/IoTDevice/addToActuators/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        removeFromActuators: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/IoTDevice/removeFromActuators/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        getCertificates: async (parentId: string): Promise<DeviceCertificate[]> => {
            const response = await this.http.put(`/IoTDevice/getCertificates/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToCertificates: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/IoTDevice/addToCertificates/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        removeFromCertificates: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/IoTDevice/removeFromCertificates/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        getTelemetryStreams: async (parentId: string): Promise<TelemetryStream[]> => {
            const response = await this.http.put(`/IoTDevice/getTelemetryStreams/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToTelemetryStreams: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/IoTDevice/addToTelemetryStreams/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        removeFromTelemetryStreams: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/IoTDevice/removeFromTelemetryStreams/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        getCommandInvocations: async (parentId: string): Promise<CommandInvocation[]> => {
            const response = await this.http.put(`/IoTDevice/getCommandInvocations/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToCommandInvocations: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/IoTDevice/addToCommandInvocations/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        removeFromCommandInvocations: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/IoTDevice/removeFromCommandInvocations/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        getAlerts: async (parentId: string): Promise<Alert[]> => {
            const response = await this.http.put(`/IoTDevice/getAlerts/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToAlerts: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/IoTDevice/addToAlerts/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        removeFromAlerts: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/IoTDevice/removeFromAlerts/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        getDeviceGroups: async (parentId: string): Promise<DeviceGroup[]> => {
            const response = await this.http.put(`/IoTDevice/getDeviceGroups/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToDeviceGroups: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/IoTDevice/addToDeviceGroups/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        removeFromDeviceGroups: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/IoTDevice/removeFromDeviceGroups/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        getNetworkProfiles: async (parentId: string): Promise<NetworkProfile[]> => {
            const response = await this.http.put(`/IoTDevice/getNetworkProfiles/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToNetworkProfiles: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/IoTDevice/addToNetworkProfiles/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        removeFromNetworkProfiles: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/IoTDevice/removeFromNetworkProfiles/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },


};


    sensorInstance = {
        find: async (id: string): Promise<SensorInstance | null> => {
            const response = await this.http.post(`/SensorInstance/post`,
                {
                    id
                }
            );
            return response.data;
        },

        findAll: async (paginationOptions?: PaginationOptions): Promise<SensorInstance[]> => {
            const response = await this.http.post(`/SensorInstance/`,
                {
                    pageSize: paginationOptions?.pageSize,
                    after: paginationOptions?.after
                }
            );

            return response.data;
        },

        add: async ( input: SensorInstance): Promise<SensorInstance> => {
            const response = await this.http.post(`/SensorInstance/create`, input);
            return response.data;
        },

        update: async (args: SensorInstance ): Promise<SensorInstance> => {
            const response = await this.http.put(`/SensorInstance/update/`, args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            const response = await this.http.post( `/SensorInstance/delete/`,  { id } );
            return response.data;
        },

        getDevice: async (parentId: string): Promise<IoTDevice | null> => {
            const response = await this.http.put(`/SensorInstance/getDevice`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignDevice: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/SensorInstance/assignDevice`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        unassignDevice: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/SensorInstance/unassignDevice`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        getTelemetryStreams: async (parentId: string): Promise<TelemetryStream[]> => {
            const response = await this.http.put(`/SensorInstance/getTelemetryStreams/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToTelemetryStreams: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/SensorInstance/addToTelemetryStreams/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        removeFromTelemetryStreams: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/SensorInstance/removeFromTelemetryStreams/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },


};


    actuatorInstance = {
        find: async (id: string): Promise<ActuatorInstance | null> => {
            const response = await this.http.post(`/ActuatorInstance/post`,
                {
                    id
                }
            );
            return response.data;
        },

        findAll: async (paginationOptions?: PaginationOptions): Promise<ActuatorInstance[]> => {
            const response = await this.http.post(`/ActuatorInstance/`,
                {
                    pageSize: paginationOptions?.pageSize,
                    after: paginationOptions?.after
                }
            );

            return response.data;
        },

        add: async ( input: ActuatorInstance): Promise<ActuatorInstance> => {
            const response = await this.http.post(`/ActuatorInstance/create`, input);
            return response.data;
        },

        update: async (args: ActuatorInstance ): Promise<ActuatorInstance> => {
            const response = await this.http.put(`/ActuatorInstance/update/`, args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            const response = await this.http.post( `/ActuatorInstance/delete/`,  { id } );
            return response.data;
        },

        getDevice: async (parentId: string): Promise<IoTDevice | null> => {
            const response = await this.http.put(`/ActuatorInstance/getDevice`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignDevice: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/ActuatorInstance/assignDevice`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        unassignDevice: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/ActuatorInstance/unassignDevice`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        getSupportedCommands: async (parentId: string): Promise<CommandDefinition[]> => {
            const response = await this.http.put(`/ActuatorInstance/getSupportedCommands/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToSupportedCommands: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/ActuatorInstance/addToSupportedCommands/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        removeFromSupportedCommands: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/ActuatorInstance/removeFromSupportedCommands/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },


};


    telemetrySchema = {
        find: async (id: string): Promise<TelemetrySchema | null> => {
            const response = await this.http.post(`/TelemetrySchema/post`,
                {
                    id
                }
            );
            return response.data;
        },

        findAll: async (paginationOptions?: PaginationOptions): Promise<TelemetrySchema[]> => {
            const response = await this.http.post(`/TelemetrySchema/`,
                {
                    pageSize: paginationOptions?.pageSize,
                    after: paginationOptions?.after
                }
            );

            return response.data;
        },

        add: async ( input: TelemetrySchema): Promise<TelemetrySchema> => {
            const response = await this.http.post(`/TelemetrySchema/create`, input);
            return response.data;
        },

        update: async (args: TelemetrySchema ): Promise<TelemetrySchema> => {
            const response = await this.http.put(`/TelemetrySchema/update/`, args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            const response = await this.http.post( `/TelemetrySchema/delete/`,  { id } );
            return response.data;
        },

        getStreams: async (parentId: string): Promise<TelemetryStream[]> => {
            const response = await this.http.put(`/TelemetrySchema/getStreams/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToStreams: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/TelemetrySchema/addToStreams/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        removeFromStreams: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/TelemetrySchema/removeFromStreams/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },


};


    telemetryStream = {
        find: async (id: string): Promise<TelemetryStream | null> => {
            const response = await this.http.post(`/TelemetryStream/post`,
                {
                    id
                }
            );
            return response.data;
        },

        findAll: async (paginationOptions?: PaginationOptions): Promise<TelemetryStream[]> => {
            const response = await this.http.post(`/TelemetryStream/`,
                {
                    pageSize: paginationOptions?.pageSize,
                    after: paginationOptions?.after
                }
            );

            return response.data;
        },

        add: async ( input: TelemetryStream): Promise<TelemetryStream> => {
            const response = await this.http.post(`/TelemetryStream/create`, input);
            return response.data;
        },

        update: async (args: TelemetryStream ): Promise<TelemetryStream> => {
            const response = await this.http.put(`/TelemetryStream/update/`, args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            const response = await this.http.post( `/TelemetryStream/delete/`,  { id } );
            return response.data;
        },

        getDevice: async (parentId: string): Promise<IoTDevice | null> => {
            const response = await this.http.put(`/TelemetryStream/getDevice`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignDevice: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/TelemetryStream/assignDevice`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        unassignDevice: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/TelemetryStream/unassignDevice`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        getSensor: async (parentId: string): Promise<SensorInstance | null> => {
            const response = await this.http.put(`/TelemetryStream/getSensor`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignSensor: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/TelemetryStream/assignSensor`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        unassignSensor: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/TelemetryStream/unassignSensor`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        getSchema: async (parentId: string): Promise<TelemetrySchema | null> => {
            const response = await this.http.put(`/TelemetryStream/getSchema`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignSchema: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/TelemetryStream/assignSchema`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        unassignSchema: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/TelemetryStream/unassignSchema`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        getMessagingEndpoint: async (parentId: string): Promise<MessagingEndpoint | null> => {
            const response = await this.http.put(`/TelemetryStream/getMessagingEndpoint`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignMessagingEndpoint: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/TelemetryStream/assignMessagingEndpoint`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        unassignMessagingEndpoint: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/TelemetryStream/unassignMessagingEndpoint`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        getRetentionPolicy: async (parentId: string): Promise<DataRetentionPolicy | null> => {
            const response = await this.http.put(`/TelemetryStream/getRetentionPolicy`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignRetentionPolicy: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/TelemetryStream/assignRetentionPolicy`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        unassignRetentionPolicy: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/TelemetryStream/unassignRetentionPolicy`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },


};


    commandDefinition = {
        find: async (id: string): Promise<CommandDefinition | null> => {
            const response = await this.http.post(`/CommandDefinition/post`,
                {
                    id
                }
            );
            return response.data;
        },

        findAll: async (paginationOptions?: PaginationOptions): Promise<CommandDefinition[]> => {
            const response = await this.http.post(`/CommandDefinition/`,
                {
                    pageSize: paginationOptions?.pageSize,
                    after: paginationOptions?.after
                }
            );

            return response.data;
        },

        add: async ( input: CommandDefinition): Promise<CommandDefinition> => {
            const response = await this.http.post(`/CommandDefinition/create`, input);
            return response.data;
        },

        update: async (args: CommandDefinition ): Promise<CommandDefinition> => {
            const response = await this.http.put(`/CommandDefinition/update/`, args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            const response = await this.http.post( `/CommandDefinition/delete/`,  { id } );
            return response.data;
        },

        getDeviceModel: async (parentId: string): Promise<DeviceModel | null> => {
            const response = await this.http.put(`/CommandDefinition/getDeviceModel`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignDeviceModel: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/CommandDefinition/assignDeviceModel`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        unassignDeviceModel: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/CommandDefinition/unassignDeviceModel`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        getActuators: async (parentId: string): Promise<ActuatorInstance[]> => {
            const response = await this.http.put(`/CommandDefinition/getActuators/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToActuators: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/CommandDefinition/addToActuators/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        removeFromActuators: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/CommandDefinition/removeFromActuators/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        getCommandInvocations: async (parentId: string): Promise<CommandInvocation[]> => {
            const response = await this.http.put(`/CommandDefinition/getCommandInvocations/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToCommandInvocations: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/CommandDefinition/addToCommandInvocations/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        removeFromCommandInvocations: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/CommandDefinition/removeFromCommandInvocations/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },


};


    commandInvocation = {
        find: async (id: string): Promise<CommandInvocation | null> => {
            const response = await this.http.post(`/CommandInvocation/post`,
                {
                    id
                }
            );
            return response.data;
        },

        findAll: async (paginationOptions?: PaginationOptions): Promise<CommandInvocation[]> => {
            const response = await this.http.post(`/CommandInvocation/`,
                {
                    pageSize: paginationOptions?.pageSize,
                    after: paginationOptions?.after
                }
            );

            return response.data;
        },

        add: async ( input: CommandInvocation): Promise<CommandInvocation> => {
            const response = await this.http.post(`/CommandInvocation/create`, input);
            return response.data;
        },

        update: async (args: CommandInvocation ): Promise<CommandInvocation> => {
            const response = await this.http.put(`/CommandInvocation/update/`, args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            const response = await this.http.post( `/CommandInvocation/delete/`,  { id } );
            return response.data;
        },

        getDevice: async (parentId: string): Promise<IoTDevice | null> => {
            const response = await this.http.put(`/CommandInvocation/getDevice`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignDevice: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/CommandInvocation/assignDevice`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        unassignDevice: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/CommandInvocation/unassignDevice`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        getCommandDefinition: async (parentId: string): Promise<CommandDefinition | null> => {
            const response = await this.http.put(`/CommandInvocation/getCommandDefinition`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignCommandDefinition: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/CommandInvocation/assignCommandDefinition`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        unassignCommandDefinition: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/CommandInvocation/unassignCommandDefinition`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        getActuator: async (parentId: string): Promise<ActuatorInstance | null> => {
            const response = await this.http.put(`/CommandInvocation/getActuator`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignActuator: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/CommandInvocation/assignActuator`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        unassignActuator: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/CommandInvocation/unassignActuator`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        getUser: async (parentId: string): Promise<TenantUser | null> => {
            const response = await this.http.put(`/CommandInvocation/getUser`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignUser: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/CommandInvocation/assignUser`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        unassignUser: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/CommandInvocation/unassignUser`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },


};


    alertRule = {
        find: async (id: string): Promise<AlertRule | null> => {
            const response = await this.http.post(`/AlertRule/post`,
                {
                    id
                }
            );
            return response.data;
        },

        findAll: async (paginationOptions?: PaginationOptions): Promise<AlertRule[]> => {
            const response = await this.http.post(`/AlertRule/`,
                {
                    pageSize: paginationOptions?.pageSize,
                    after: paginationOptions?.after
                }
            );

            return response.data;
        },

        add: async ( input: AlertRule): Promise<AlertRule> => {
            const response = await this.http.post(`/AlertRule/create`, input);
            return response.data;
        },

        update: async (args: AlertRule ): Promise<AlertRule> => {
            const response = await this.http.put(`/AlertRule/update/`, args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            const response = await this.http.post( `/AlertRule/delete/`,  { id } );
            return response.data;
        },

        getTenant: async (parentId: string): Promise<Tenant | null> => {
            const response = await this.http.put(`/AlertRule/getTenant`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignTenant: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/AlertRule/assignTenant`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        unassignTenant: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/AlertRule/unassignTenant`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        getStreams: async (parentId: string): Promise<TelemetryStream[]> => {
            const response = await this.http.put(`/AlertRule/getStreams/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToStreams: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/AlertRule/addToStreams/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        removeFromStreams: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/AlertRule/removeFromStreams/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        getAlerts: async (parentId: string): Promise<Alert[]> => {
            const response = await this.http.put(`/AlertRule/getAlerts/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToAlerts: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/AlertRule/addToAlerts/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        removeFromAlerts: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/AlertRule/removeFromAlerts/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },


};


    alert = {
        find: async (id: string): Promise<Alert | null> => {
            const response = await this.http.post(`/Alert/post`,
                {
                    id
                }
            );
            return response.data;
        },

        findAll: async (paginationOptions?: PaginationOptions): Promise<Alert[]> => {
            const response = await this.http.post(`/Alert/`,
                {
                    pageSize: paginationOptions?.pageSize,
                    after: paginationOptions?.after
                }
            );

            return response.data;
        },

        add: async ( input: Alert): Promise<Alert> => {
            const response = await this.http.post(`/Alert/create`, input);
            return response.data;
        },

        update: async (args: Alert ): Promise<Alert> => {
            const response = await this.http.put(`/Alert/update/`, args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            const response = await this.http.post( `/Alert/delete/`,  { id } );
            return response.data;
        },

        getDevice: async (parentId: string): Promise<IoTDevice | null> => {
            const response = await this.http.put(`/Alert/getDevice`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignDevice: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/Alert/assignDevice`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        unassignDevice: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/Alert/unassignDevice`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        getAlertRule: async (parentId: string): Promise<AlertRule | null> => {
            const response = await this.http.put(`/Alert/getAlertRule`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignAlertRule: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/Alert/assignAlertRule`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        unassignAlertRule: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/Alert/unassignAlertRule`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },


};


    tenant = {
        find: async (id: string): Promise<Tenant | null> => {
            const response = await this.http.post(`/Tenant/post`,
                {
                    id
                }
            );
            return response.data;
        },

        findAll: async (paginationOptions?: PaginationOptions): Promise<Tenant[]> => {
            const response = await this.http.post(`/Tenant/`,
                {
                    pageSize: paginationOptions?.pageSize,
                    after: paginationOptions?.after
                }
            );

            return response.data;
        },

        add: async ( input: Tenant): Promise<Tenant> => {
            const response = await this.http.post(`/Tenant/create`, input);
            return response.data;
        },

        update: async (args: Tenant ): Promise<Tenant> => {
            const response = await this.http.put(`/Tenant/update/`, args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            const response = await this.http.post( `/Tenant/delete/`,  { id } );
            return response.data;
        },

        getSites: async (parentId: string): Promise<Site[]> => {
            const response = await this.http.put(`/Tenant/getSites/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToSites: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/Tenant/addToSites/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        removeFromSites: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/Tenant/removeFromSites/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        getUsers: async (parentId: string): Promise<TenantUser[]> => {
            const response = await this.http.put(`/Tenant/getUsers/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToUsers: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/Tenant/addToUsers/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        removeFromUsers: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/Tenant/removeFromUsers/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        getDevices: async (parentId: string): Promise<IoTDevice[]> => {
            const response = await this.http.put(`/Tenant/getDevices/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToDevices: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/Tenant/addToDevices/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        removeFromDevices: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/Tenant/removeFromDevices/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        getDataRetentionPolicies: async (parentId: string): Promise<DataRetentionPolicy[]> => {
            const response = await this.http.put(`/Tenant/getDataRetentionPolicies/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToDataRetentionPolicies: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/Tenant/addToDataRetentionPolicies/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        removeFromDataRetentionPolicies: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/Tenant/removeFromDataRetentionPolicies/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        getConnectivityPlans: async (parentId: string): Promise<ConnectivityPlan[]> => {
            const response = await this.http.put(`/Tenant/getConnectivityPlans/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToConnectivityPlans: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/Tenant/addToConnectivityPlans/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        removeFromConnectivityPlans: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/Tenant/removeFromConnectivityPlans/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        getSimCards: async (parentId: string): Promise<SimCard[]> => {
            const response = await this.http.put(`/Tenant/getSimCards/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToSimCards: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/Tenant/addToSimCards/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        removeFromSimCards: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/Tenant/removeFromSimCards/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        getMessagingEndpoints: async (parentId: string): Promise<MessagingEndpoint[]> => {
            const response = await this.http.put(`/Tenant/getMessagingEndpoints/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToMessagingEndpoints: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/Tenant/addToMessagingEndpoints/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        removeFromMessagingEndpoints: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/Tenant/removeFromMessagingEndpoints/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        getAccessPolicies: async (parentId: string): Promise<AccessPolicy[]> => {
            const response = await this.http.put(`/Tenant/getAccessPolicies/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToAccessPolicies: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/Tenant/addToAccessPolicies/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        removeFromAccessPolicies: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/Tenant/removeFromAccessPolicies/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        getDeviceGroups: async (parentId: string): Promise<DeviceGroup[]> => {
            const response = await this.http.put(`/Tenant/getDeviceGroups/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToDeviceGroups: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/Tenant/addToDeviceGroups/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        removeFromDeviceGroups: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/Tenant/removeFromDeviceGroups/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        getAlertRules: async (parentId: string): Promise<AlertRule[]> => {
            const response = await this.http.put(`/Tenant/getAlertRules/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToAlertRules: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/Tenant/addToAlertRules/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        removeFromAlertRules: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/Tenant/removeFromAlertRules/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        getMaintenanceTickets: async (parentId: string): Promise<MaintenanceTicket[]> => {
            const response = await this.http.put(`/Tenant/getMaintenanceTickets/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToMaintenanceTickets: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/Tenant/addToMaintenanceTickets/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        removeFromMaintenanceTickets: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/Tenant/removeFromMaintenanceTickets/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        getUsageRecords: async (parentId: string): Promise<UsageRecord[]> => {
            const response = await this.http.put(`/Tenant/getUsageRecords/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToUsageRecords: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/Tenant/addToUsageRecords/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        removeFromUsageRecords: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/Tenant/removeFromUsageRecords/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },


};


    tenantUser = {
        find: async (id: string): Promise<TenantUser | null> => {
            const response = await this.http.post(`/TenantUser/post`,
                {
                    id
                }
            );
            return response.data;
        },

        findAll: async (paginationOptions?: PaginationOptions): Promise<TenantUser[]> => {
            const response = await this.http.post(`/TenantUser/`,
                {
                    pageSize: paginationOptions?.pageSize,
                    after: paginationOptions?.after
                }
            );

            return response.data;
        },

        add: async ( input: TenantUser): Promise<TenantUser> => {
            const response = await this.http.post(`/TenantUser/create`, input);
            return response.data;
        },

        update: async (args: TenantUser ): Promise<TenantUser> => {
            const response = await this.http.put(`/TenantUser/update/`, args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            const response = await this.http.post( `/TenantUser/delete/`,  { id } );
            return response.data;
        },

        getTenant: async (parentId: string): Promise<Tenant | null> => {
            const response = await this.http.put(`/TenantUser/getTenant`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignTenant: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/TenantUser/assignTenant`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        unassignTenant: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/TenantUser/unassignTenant`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        getCommandInvocations: async (parentId: string): Promise<CommandInvocation[]> => {
            const response = await this.http.put(`/TenantUser/getCommandInvocations/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToCommandInvocations: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/TenantUser/addToCommandInvocations/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        removeFromCommandInvocations: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/TenantUser/removeFromCommandInvocations/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },


};


    site = {
        find: async (id: string): Promise<Site | null> => {
            const response = await this.http.post(`/Site/post`,
                {
                    id
                }
            );
            return response.data;
        },

        findAll: async (paginationOptions?: PaginationOptions): Promise<Site[]> => {
            const response = await this.http.post(`/Site/`,
                {
                    pageSize: paginationOptions?.pageSize,
                    after: paginationOptions?.after
                }
            );

            return response.data;
        },

        add: async ( input: Site): Promise<Site> => {
            const response = await this.http.post(`/Site/create`, input);
            return response.data;
        },

        update: async (args: Site ): Promise<Site> => {
            const response = await this.http.put(`/Site/update/`, args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            const response = await this.http.post( `/Site/delete/`,  { id } );
            return response.data;
        },

        getTenant: async (parentId: string): Promise<Tenant | null> => {
            const response = await this.http.put(`/Site/getTenant`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignTenant: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/Site/assignTenant`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        unassignTenant: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/Site/unassignTenant`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        getBuildings: async (parentId: string): Promise<Building[]> => {
            const response = await this.http.put(`/Site/getBuildings/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToBuildings: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/Site/addToBuildings/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        removeFromBuildings: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/Site/removeFromBuildings/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        getDevices: async (parentId: string): Promise<IoTDevice[]> => {
            const response = await this.http.put(`/Site/getDevices/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToDevices: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/Site/addToDevices/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        removeFromDevices: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/Site/removeFromDevices/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        getGateways: async (parentId: string): Promise<Gateway[]> => {
            const response = await this.http.put(`/Site/getGateways/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToGateways: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/Site/addToGateways/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        removeFromGateways: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/Site/removeFromGateways/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },


};


    building = {
        find: async (id: string): Promise<Building | null> => {
            const response = await this.http.post(`/Building/post`,
                {
                    id
                }
            );
            return response.data;
        },

        findAll: async (paginationOptions?: PaginationOptions): Promise<Building[]> => {
            const response = await this.http.post(`/Building/`,
                {
                    pageSize: paginationOptions?.pageSize,
                    after: paginationOptions?.after
                }
            );

            return response.data;
        },

        add: async ( input: Building): Promise<Building> => {
            const response = await this.http.post(`/Building/create`, input);
            return response.data;
        },

        update: async (args: Building ): Promise<Building> => {
            const response = await this.http.put(`/Building/update/`, args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            const response = await this.http.post( `/Building/delete/`,  { id } );
            return response.data;
        },

        getSite: async (parentId: string): Promise<Site | null> => {
            const response = await this.http.put(`/Building/getSite`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignSite: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/Building/assignSite`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        unassignSite: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/Building/unassignSite`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        getFloors: async (parentId: string): Promise<Floor[]> => {
            const response = await this.http.put(`/Building/getFloors/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToFloors: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/Building/addToFloors/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        removeFromFloors: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/Building/removeFromFloors/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },


};


    floor = {
        find: async (id: string): Promise<Floor | null> => {
            const response = await this.http.post(`/Floor/post`,
                {
                    id
                }
            );
            return response.data;
        },

        findAll: async (paginationOptions?: PaginationOptions): Promise<Floor[]> => {
            const response = await this.http.post(`/Floor/`,
                {
                    pageSize: paginationOptions?.pageSize,
                    after: paginationOptions?.after
                }
            );

            return response.data;
        },

        add: async ( input: Floor): Promise<Floor> => {
            const response = await this.http.post(`/Floor/create`, input);
            return response.data;
        },

        update: async (args: Floor ): Promise<Floor> => {
            const response = await this.http.put(`/Floor/update/`, args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            const response = await this.http.post( `/Floor/delete/`,  { id } );
            return response.data;
        },

        getBuilding: async (parentId: string): Promise<Building | null> => {
            const response = await this.http.put(`/Floor/getBuilding`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignBuilding: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/Floor/assignBuilding`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        unassignBuilding: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/Floor/unassignBuilding`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        getRooms: async (parentId: string): Promise<Room[]> => {
            const response = await this.http.put(`/Floor/getRooms/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToRooms: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/Floor/addToRooms/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        removeFromRooms: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/Floor/removeFromRooms/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },


};


    room = {
        find: async (id: string): Promise<Room | null> => {
            const response = await this.http.post(`/Room/post`,
                {
                    id
                }
            );
            return response.data;
        },

        findAll: async (paginationOptions?: PaginationOptions): Promise<Room[]> => {
            const response = await this.http.post(`/Room/`,
                {
                    pageSize: paginationOptions?.pageSize,
                    after: paginationOptions?.after
                }
            );

            return response.data;
        },

        add: async ( input: Room): Promise<Room> => {
            const response = await this.http.post(`/Room/create`, input);
            return response.data;
        },

        update: async (args: Room ): Promise<Room> => {
            const response = await this.http.put(`/Room/update/`, args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            const response = await this.http.post( `/Room/delete/`,  { id } );
            return response.data;
        },

        getFloor: async (parentId: string): Promise<Floor | null> => {
            const response = await this.http.put(`/Room/getFloor`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignFloor: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/Room/assignFloor`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        unassignFloor: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/Room/unassignFloor`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        getDevices: async (parentId: string): Promise<IoTDevice[]> => {
            const response = await this.http.put(`/Room/getDevices/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToDevices: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/Room/addToDevices/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        removeFromDevices: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/Room/removeFromDevices/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        getGateways: async (parentId: string): Promise<Gateway[]> => {
            const response = await this.http.put(`/Room/getGateways/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToGateways: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/Room/addToGateways/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        removeFromGateways: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/Room/removeFromGateways/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },


};


    gateway = {
        find: async (id: string): Promise<Gateway | null> => {
            const response = await this.http.post(`/Gateway/post`,
                {
                    id
                }
            );
            return response.data;
        },

        findAll: async (paginationOptions?: PaginationOptions): Promise<Gateway[]> => {
            const response = await this.http.post(`/Gateway/`,
                {
                    pageSize: paginationOptions?.pageSize,
                    after: paginationOptions?.after
                }
            );

            return response.data;
        },

        add: async ( input: Gateway): Promise<Gateway> => {
            const response = await this.http.post(`/Gateway/create`, input);
            return response.data;
        },

        update: async (args: Gateway ): Promise<Gateway> => {
            const response = await this.http.put(`/Gateway/update/`, args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            const response = await this.http.post( `/Gateway/delete/`,  { id } );
            return response.data;
        },

        getSite: async (parentId: string): Promise<Site | null> => {
            const response = await this.http.put(`/Gateway/getSite`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignSite: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/Gateway/assignSite`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        unassignSite: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/Gateway/unassignSite`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        getRoom: async (parentId: string): Promise<Room | null> => {
            const response = await this.http.put(`/Gateway/getRoom`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignRoom: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/Gateway/assignRoom`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        unassignRoom: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/Gateway/unassignRoom`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        getDigitalTwin: async (parentId: string): Promise<DigitalTwin | null> => {
            const response = await this.http.put(`/Gateway/getDigitalTwin`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignDigitalTwin: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/Gateway/assignDigitalTwin`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        unassignDigitalTwin: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/Gateway/unassignDigitalTwin`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        getDevices: async (parentId: string): Promise<IoTDevice[]> => {
            const response = await this.http.put(`/Gateway/getDevices/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToDevices: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/Gateway/addToDevices/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        removeFromDevices: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/Gateway/removeFromDevices/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        getEdgeApplications: async (parentId: string): Promise<EdgeApplication[]> => {
            const response = await this.http.put(`/Gateway/getEdgeApplications/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToEdgeApplications: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/Gateway/addToEdgeApplications/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        removeFromEdgeApplications: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/Gateway/removeFromEdgeApplications/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        getCertificates: async (parentId: string): Promise<DeviceCertificate[]> => {
            const response = await this.http.put(`/Gateway/getCertificates/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToCertificates: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/Gateway/addToCertificates/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        removeFromCertificates: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/Gateway/removeFromCertificates/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        getNetworkProfiles: async (parentId: string): Promise<NetworkProfile[]> => {
            const response = await this.http.put(`/Gateway/getNetworkProfiles/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToNetworkProfiles: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/Gateway/addToNetworkProfiles/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        removeFromNetworkProfiles: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/Gateway/removeFromNetworkProfiles/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },


};


    edgeApplication = {
        find: async (id: string): Promise<EdgeApplication | null> => {
            const response = await this.http.post(`/EdgeApplication/post`,
                {
                    id
                }
            );
            return response.data;
        },

        findAll: async (paginationOptions?: PaginationOptions): Promise<EdgeApplication[]> => {
            const response = await this.http.post(`/EdgeApplication/`,
                {
                    pageSize: paginationOptions?.pageSize,
                    after: paginationOptions?.after
                }
            );

            return response.data;
        },

        add: async ( input: EdgeApplication): Promise<EdgeApplication> => {
            const response = await this.http.post(`/EdgeApplication/create`, input);
            return response.data;
        },

        update: async (args: EdgeApplication ): Promise<EdgeApplication> => {
            const response = await this.http.put(`/EdgeApplication/update/`, args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            const response = await this.http.post( `/EdgeApplication/delete/`,  { id } );
            return response.data;
        },

        getGateway: async (parentId: string): Promise<Gateway | null> => {
            const response = await this.http.put(`/EdgeApplication/getGateway`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignGateway: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/EdgeApplication/assignGateway`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        unassignGateway: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/EdgeApplication/unassignGateway`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },


};


    networkProfile = {
        find: async (id: string): Promise<NetworkProfile | null> => {
            const response = await this.http.post(`/NetworkProfile/post`,
                {
                    id
                }
            );
            return response.data;
        },

        findAll: async (paginationOptions?: PaginationOptions): Promise<NetworkProfile[]> => {
            const response = await this.http.post(`/NetworkProfile/`,
                {
                    pageSize: paginationOptions?.pageSize,
                    after: paginationOptions?.after
                }
            );

            return response.data;
        },

        add: async ( input: NetworkProfile): Promise<NetworkProfile> => {
            const response = await this.http.post(`/NetworkProfile/create`, input);
            return response.data;
        },

        update: async (args: NetworkProfile ): Promise<NetworkProfile> => {
            const response = await this.http.put(`/NetworkProfile/update/`, args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            const response = await this.http.post( `/NetworkProfile/delete/`,  { id } );
            return response.data;
        },

        getDevice: async (parentId: string): Promise<IoTDevice | null> => {
            const response = await this.http.put(`/NetworkProfile/getDevice`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignDevice: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/NetworkProfile/assignDevice`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        unassignDevice: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/NetworkProfile/unassignDevice`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        getGateway: async (parentId: string): Promise<Gateway | null> => {
            const response = await this.http.put(`/NetworkProfile/getGateway`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignGateway: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/NetworkProfile/assignGateway`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        unassignGateway: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/NetworkProfile/unassignGateway`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        getSimCard: async (parentId: string): Promise<SimCard | null> => {
            const response = await this.http.put(`/NetworkProfile/getSimCard`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignSimCard: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/NetworkProfile/assignSimCard`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        unassignSimCard: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/NetworkProfile/unassignSimCard`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },


};


    simCard = {
        find: async (id: string): Promise<SimCard | null> => {
            const response = await this.http.post(`/SimCard/post`,
                {
                    id
                }
            );
            return response.data;
        },

        findAll: async (paginationOptions?: PaginationOptions): Promise<SimCard[]> => {
            const response = await this.http.post(`/SimCard/`,
                {
                    pageSize: paginationOptions?.pageSize,
                    after: paginationOptions?.after
                }
            );

            return response.data;
        },

        add: async ( input: SimCard): Promise<SimCard> => {
            const response = await this.http.post(`/SimCard/create`, input);
            return response.data;
        },

        update: async (args: SimCard ): Promise<SimCard> => {
            const response = await this.http.put(`/SimCard/update/`, args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            const response = await this.http.post( `/SimCard/delete/`,  { id } );
            return response.data;
        },

        getTenant: async (parentId: string): Promise<Tenant | null> => {
            const response = await this.http.put(`/SimCard/getTenant`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignTenant: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/SimCard/assignTenant`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        unassignTenant: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/SimCard/unassignTenant`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        getConnectivityPlan: async (parentId: string): Promise<ConnectivityPlan | null> => {
            const response = await this.http.put(`/SimCard/getConnectivityPlan`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignConnectivityPlan: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/SimCard/assignConnectivityPlan`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        unassignConnectivityPlan: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/SimCard/unassignConnectivityPlan`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        getNetworkProfiles: async (parentId: string): Promise<NetworkProfile[]> => {
            const response = await this.http.put(`/SimCard/getNetworkProfiles/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToNetworkProfiles: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/SimCard/addToNetworkProfiles/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        removeFromNetworkProfiles: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/SimCard/removeFromNetworkProfiles/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },


};


    connectivityPlan = {
        find: async (id: string): Promise<ConnectivityPlan | null> => {
            const response = await this.http.post(`/ConnectivityPlan/post`,
                {
                    id
                }
            );
            return response.data;
        },

        findAll: async (paginationOptions?: PaginationOptions): Promise<ConnectivityPlan[]> => {
            const response = await this.http.post(`/ConnectivityPlan/`,
                {
                    pageSize: paginationOptions?.pageSize,
                    after: paginationOptions?.after
                }
            );

            return response.data;
        },

        add: async ( input: ConnectivityPlan): Promise<ConnectivityPlan> => {
            const response = await this.http.post(`/ConnectivityPlan/create`, input);
            return response.data;
        },

        update: async (args: ConnectivityPlan ): Promise<ConnectivityPlan> => {
            const response = await this.http.put(`/ConnectivityPlan/update/`, args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            const response = await this.http.post( `/ConnectivityPlan/delete/`,  { id } );
            return response.data;
        },

        getTenant: async (parentId: string): Promise<Tenant | null> => {
            const response = await this.http.put(`/ConnectivityPlan/getTenant`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignTenant: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/ConnectivityPlan/assignTenant`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        unassignTenant: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/ConnectivityPlan/unassignTenant`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        getSimCards: async (parentId: string): Promise<SimCard[]> => {
            const response = await this.http.put(`/ConnectivityPlan/getSimCards/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToSimCards: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/ConnectivityPlan/addToSimCards/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        removeFromSimCards: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/ConnectivityPlan/removeFromSimCards/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },


};


    messagingEndpoint = {
        find: async (id: string): Promise<MessagingEndpoint | null> => {
            const response = await this.http.post(`/MessagingEndpoint/post`,
                {
                    id
                }
            );
            return response.data;
        },

        findAll: async (paginationOptions?: PaginationOptions): Promise<MessagingEndpoint[]> => {
            const response = await this.http.post(`/MessagingEndpoint/`,
                {
                    pageSize: paginationOptions?.pageSize,
                    after: paginationOptions?.after
                }
            );

            return response.data;
        },

        add: async ( input: MessagingEndpoint): Promise<MessagingEndpoint> => {
            const response = await this.http.post(`/MessagingEndpoint/create`, input);
            return response.data;
        },

        update: async (args: MessagingEndpoint ): Promise<MessagingEndpoint> => {
            const response = await this.http.put(`/MessagingEndpoint/update/`, args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            const response = await this.http.post( `/MessagingEndpoint/delete/`,  { id } );
            return response.data;
        },

        getTenant: async (parentId: string): Promise<Tenant | null> => {
            const response = await this.http.put(`/MessagingEndpoint/getTenant`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignTenant: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/MessagingEndpoint/assignTenant`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        unassignTenant: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/MessagingEndpoint/unassignTenant`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        getStreams: async (parentId: string): Promise<TelemetryStream[]> => {
            const response = await this.http.put(`/MessagingEndpoint/getStreams/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToStreams: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/MessagingEndpoint/addToStreams/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        removeFromStreams: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/MessagingEndpoint/removeFromStreams/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },


};


    accessPolicy = {
        find: async (id: string): Promise<AccessPolicy | null> => {
            const response = await this.http.post(`/AccessPolicy/post`,
                {
                    id
                }
            );
            return response.data;
        },

        findAll: async (paginationOptions?: PaginationOptions): Promise<AccessPolicy[]> => {
            const response = await this.http.post(`/AccessPolicy/`,
                {
                    pageSize: paginationOptions?.pageSize,
                    after: paginationOptions?.after
                }
            );

            return response.data;
        },

        add: async ( input: AccessPolicy): Promise<AccessPolicy> => {
            const response = await this.http.post(`/AccessPolicy/create`, input);
            return response.data;
        },

        update: async (args: AccessPolicy ): Promise<AccessPolicy> => {
            const response = await this.http.put(`/AccessPolicy/update/`, args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            const response = await this.http.post( `/AccessPolicy/delete/`,  { id } );
            return response.data;
        },

        getTenant: async (parentId: string): Promise<Tenant | null> => {
            const response = await this.http.put(`/AccessPolicy/getTenant`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignTenant: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/AccessPolicy/assignTenant`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        unassignTenant: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/AccessPolicy/unassignTenant`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        getApiKeys: async (parentId: string): Promise<ApiKey[]> => {
            const response = await this.http.put(`/AccessPolicy/getApiKeys/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToApiKeys: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/AccessPolicy/addToApiKeys/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        removeFromApiKeys: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/AccessPolicy/removeFromApiKeys/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        getUsers: async (parentId: string): Promise<TenantUser[]> => {
            const response = await this.http.put(`/AccessPolicy/getUsers/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToUsers: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/AccessPolicy/addToUsers/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        removeFromUsers: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/AccessPolicy/removeFromUsers/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },


};


    apiKey = {
        find: async (id: string): Promise<ApiKey | null> => {
            const response = await this.http.post(`/ApiKey/post`,
                {
                    id
                }
            );
            return response.data;
        },

        findAll: async (paginationOptions?: PaginationOptions): Promise<ApiKey[]> => {
            const response = await this.http.post(`/ApiKey/`,
                {
                    pageSize: paginationOptions?.pageSize,
                    after: paginationOptions?.after
                }
            );

            return response.data;
        },

        add: async ( input: ApiKey): Promise<ApiKey> => {
            const response = await this.http.post(`/ApiKey/create`, input);
            return response.data;
        },

        update: async (args: ApiKey ): Promise<ApiKey> => {
            const response = await this.http.put(`/ApiKey/update/`, args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            const response = await this.http.post( `/ApiKey/delete/`,  { id } );
            return response.data;
        },

        getAccessPolicy: async (parentId: string): Promise<AccessPolicy | null> => {
            const response = await this.http.put(`/ApiKey/getAccessPolicy`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignAccessPolicy: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/ApiKey/assignAccessPolicy`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        unassignAccessPolicy: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/ApiKey/unassignAccessPolicy`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },


};


    deviceCertificate = {
        find: async (id: string): Promise<DeviceCertificate | null> => {
            const response = await this.http.post(`/DeviceCertificate/post`,
                {
                    id
                }
            );
            return response.data;
        },

        findAll: async (paginationOptions?: PaginationOptions): Promise<DeviceCertificate[]> => {
            const response = await this.http.post(`/DeviceCertificate/`,
                {
                    pageSize: paginationOptions?.pageSize,
                    after: paginationOptions?.after
                }
            );

            return response.data;
        },

        add: async ( input: DeviceCertificate): Promise<DeviceCertificate> => {
            const response = await this.http.post(`/DeviceCertificate/create`, input);
            return response.data;
        },

        update: async (args: DeviceCertificate ): Promise<DeviceCertificate> => {
            const response = await this.http.put(`/DeviceCertificate/update/`, args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            const response = await this.http.post( `/DeviceCertificate/delete/`,  { id } );
            return response.data;
        },

        getDevice: async (parentId: string): Promise<IoTDevice | null> => {
            const response = await this.http.put(`/DeviceCertificate/getDevice`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignDevice: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/DeviceCertificate/assignDevice`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        unassignDevice: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/DeviceCertificate/unassignDevice`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        getGateway: async (parentId: string): Promise<Gateway | null> => {
            const response = await this.http.put(`/DeviceCertificate/getGateway`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignGateway: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/DeviceCertificate/assignGateway`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        unassignGateway: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/DeviceCertificate/unassignGateway`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },


};


    provisioningRecord = {
        find: async (id: string): Promise<ProvisioningRecord | null> => {
            const response = await this.http.post(`/ProvisioningRecord/post`,
                {
                    id
                }
            );
            return response.data;
        },

        findAll: async (paginationOptions?: PaginationOptions): Promise<ProvisioningRecord[]> => {
            const response = await this.http.post(`/ProvisioningRecord/`,
                {
                    pageSize: paginationOptions?.pageSize,
                    after: paginationOptions?.after
                }
            );

            return response.data;
        },

        add: async ( input: ProvisioningRecord): Promise<ProvisioningRecord> => {
            const response = await this.http.post(`/ProvisioningRecord/create`, input);
            return response.data;
        },

        update: async (args: ProvisioningRecord ): Promise<ProvisioningRecord> => {
            const response = await this.http.put(`/ProvisioningRecord/update/`, args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            const response = await this.http.post( `/ProvisioningRecord/delete/`,  { id } );
            return response.data;
        },

        getDevice: async (parentId: string): Promise<IoTDevice | null> => {
            const response = await this.http.put(`/ProvisioningRecord/getDevice`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignDevice: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/ProvisioningRecord/assignDevice`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        unassignDevice: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/ProvisioningRecord/unassignDevice`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        getCertificate: async (parentId: string): Promise<DeviceCertificate | null> => {
            const response = await this.http.put(`/ProvisioningRecord/getCertificate`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignCertificate: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/ProvisioningRecord/assignCertificate`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        unassignCertificate: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/ProvisioningRecord/unassignCertificate`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        getTenant: async (parentId: string): Promise<Tenant | null> => {
            const response = await this.http.put(`/ProvisioningRecord/getTenant`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignTenant: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/ProvisioningRecord/assignTenant`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        unassignTenant: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/ProvisioningRecord/unassignTenant`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },


};


    digitalTwin = {
        find: async (id: string): Promise<DigitalTwin | null> => {
            const response = await this.http.post(`/DigitalTwin/post`,
                {
                    id
                }
            );
            return response.data;
        },

        findAll: async (paginationOptions?: PaginationOptions): Promise<DigitalTwin[]> => {
            const response = await this.http.post(`/DigitalTwin/`,
                {
                    pageSize: paginationOptions?.pageSize,
                    after: paginationOptions?.after
                }
            );

            return response.data;
        },

        add: async ( input: DigitalTwin): Promise<DigitalTwin> => {
            const response = await this.http.post(`/DigitalTwin/create`, input);
            return response.data;
        },

        update: async (args: DigitalTwin ): Promise<DigitalTwin> => {
            const response = await this.http.put(`/DigitalTwin/update/`, args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            const response = await this.http.post( `/DigitalTwin/delete/`,  { id } );
            return response.data;
        },

        getDevice: async (parentId: string): Promise<IoTDevice | null> => {
            const response = await this.http.put(`/DigitalTwin/getDevice`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignDevice: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/DigitalTwin/assignDevice`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        unassignDevice: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/DigitalTwin/unassignDevice`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        getGateway: async (parentId: string): Promise<Gateway | null> => {
            const response = await this.http.put(`/DigitalTwin/getGateway`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignGateway: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/DigitalTwin/assignGateway`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        unassignGateway: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/DigitalTwin/unassignGateway`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        getTemplate: async (parentId: string): Promise<TwinTemplate | null> => {
            const response = await this.http.put(`/DigitalTwin/getTemplate`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignTemplate: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/DigitalTwin/assignTemplate`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        unassignTemplate: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/DigitalTwin/unassignTemplate`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        getChangeEvents: async (parentId: string): Promise<TwinChangeEvent[]> => {
            const response = await this.http.put(`/DigitalTwin/getChangeEvents/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToChangeEvents: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/DigitalTwin/addToChangeEvents/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        removeFromChangeEvents: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/DigitalTwin/removeFromChangeEvents/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },


};


    twinTemplate = {
        find: async (id: string): Promise<TwinTemplate | null> => {
            const response = await this.http.post(`/TwinTemplate/post`,
                {
                    id
                }
            );
            return response.data;
        },

        findAll: async (paginationOptions?: PaginationOptions): Promise<TwinTemplate[]> => {
            const response = await this.http.post(`/TwinTemplate/`,
                {
                    pageSize: paginationOptions?.pageSize,
                    after: paginationOptions?.after
                }
            );

            return response.data;
        },

        add: async ( input: TwinTemplate): Promise<TwinTemplate> => {
            const response = await this.http.post(`/TwinTemplate/create`, input);
            return response.data;
        },

        update: async (args: TwinTemplate ): Promise<TwinTemplate> => {
            const response = await this.http.put(`/TwinTemplate/update/`, args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            const response = await this.http.post( `/TwinTemplate/delete/`,  { id } );
            return response.data;
        },

        getDeviceModels: async (parentId: string): Promise<DeviceModel[]> => {
            const response = await this.http.put(`/TwinTemplate/getDeviceModels/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToDeviceModels: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/TwinTemplate/addToDeviceModels/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        removeFromDeviceModels: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/TwinTemplate/removeFromDeviceModels/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },


};


    twinChangeEvent = {
        find: async (id: string): Promise<TwinChangeEvent | null> => {
            const response = await this.http.post(`/TwinChangeEvent/post`,
                {
                    id
                }
            );
            return response.data;
        },

        findAll: async (paginationOptions?: PaginationOptions): Promise<TwinChangeEvent[]> => {
            const response = await this.http.post(`/TwinChangeEvent/`,
                {
                    pageSize: paginationOptions?.pageSize,
                    after: paginationOptions?.after
                }
            );

            return response.data;
        },

        add: async ( input: TwinChangeEvent): Promise<TwinChangeEvent> => {
            const response = await this.http.post(`/TwinChangeEvent/create`, input);
            return response.data;
        },

        update: async (args: TwinChangeEvent ): Promise<TwinChangeEvent> => {
            const response = await this.http.put(`/TwinChangeEvent/update/`, args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            const response = await this.http.post( `/TwinChangeEvent/delete/`,  { id } );
            return response.data;
        },

        getTwin: async (parentId: string): Promise<DigitalTwin | null> => {
            const response = await this.http.put(`/TwinChangeEvent/getTwin`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignTwin: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/TwinChangeEvent/assignTwin`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        unassignTwin: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/TwinChangeEvent/unassignTwin`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },


};


    maintenanceTicket = {
        find: async (id: string): Promise<MaintenanceTicket | null> => {
            const response = await this.http.post(`/MaintenanceTicket/post`,
                {
                    id
                }
            );
            return response.data;
        },

        findAll: async (paginationOptions?: PaginationOptions): Promise<MaintenanceTicket[]> => {
            const response = await this.http.post(`/MaintenanceTicket/`,
                {
                    pageSize: paginationOptions?.pageSize,
                    after: paginationOptions?.after
                }
            );

            return response.data;
        },

        add: async ( input: MaintenanceTicket): Promise<MaintenanceTicket> => {
            const response = await this.http.post(`/MaintenanceTicket/create`, input);
            return response.data;
        },

        update: async (args: MaintenanceTicket ): Promise<MaintenanceTicket> => {
            const response = await this.http.put(`/MaintenanceTicket/update/`, args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            const response = await this.http.post( `/MaintenanceTicket/delete/`,  { id } );
            return response.data;
        },

        getDevice: async (parentId: string): Promise<IoTDevice | null> => {
            const response = await this.http.put(`/MaintenanceTicket/getDevice`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignDevice: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/MaintenanceTicket/assignDevice`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        unassignDevice: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/MaintenanceTicket/unassignDevice`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        getTenant: async (parentId: string): Promise<Tenant | null> => {
            const response = await this.http.put(`/MaintenanceTicket/getTenant`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignTenant: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/MaintenanceTicket/assignTenant`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        unassignTenant: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/MaintenanceTicket/unassignTenant`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },


};


    dataRetentionPolicy = {
        find: async (id: string): Promise<DataRetentionPolicy | null> => {
            const response = await this.http.post(`/DataRetentionPolicy/post`,
                {
                    id
                }
            );
            return response.data;
        },

        findAll: async (paginationOptions?: PaginationOptions): Promise<DataRetentionPolicy[]> => {
            const response = await this.http.post(`/DataRetentionPolicy/`,
                {
                    pageSize: paginationOptions?.pageSize,
                    after: paginationOptions?.after
                }
            );

            return response.data;
        },

        add: async ( input: DataRetentionPolicy): Promise<DataRetentionPolicy> => {
            const response = await this.http.post(`/DataRetentionPolicy/create`, input);
            return response.data;
        },

        update: async (args: DataRetentionPolicy ): Promise<DataRetentionPolicy> => {
            const response = await this.http.put(`/DataRetentionPolicy/update/`, args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            const response = await this.http.post( `/DataRetentionPolicy/delete/`,  { id } );
            return response.data;
        },

        getTenant: async (parentId: string): Promise<Tenant | null> => {
            const response = await this.http.put(`/DataRetentionPolicy/getTenant`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignTenant: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/DataRetentionPolicy/assignTenant`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        unassignTenant: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/DataRetentionPolicy/unassignTenant`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        getStreams: async (parentId: string): Promise<TelemetryStream[]> => {
            const response = await this.http.put(`/DataRetentionPolicy/getStreams/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToStreams: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/DataRetentionPolicy/addToStreams/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        removeFromStreams: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/DataRetentionPolicy/removeFromStreams/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },


};


    softwareUpdateCampaign = {
        find: async (id: string): Promise<SoftwareUpdateCampaign | null> => {
            const response = await this.http.post(`/SoftwareUpdateCampaign/post`,
                {
                    id
                }
            );
            return response.data;
        },

        findAll: async (paginationOptions?: PaginationOptions): Promise<SoftwareUpdateCampaign[]> => {
            const response = await this.http.post(`/SoftwareUpdateCampaign/`,
                {
                    pageSize: paginationOptions?.pageSize,
                    after: paginationOptions?.after
                }
            );

            return response.data;
        },

        add: async ( input: SoftwareUpdateCampaign): Promise<SoftwareUpdateCampaign> => {
            const response = await this.http.post(`/SoftwareUpdateCampaign/create`, input);
            return response.data;
        },

        update: async (args: SoftwareUpdateCampaign ): Promise<SoftwareUpdateCampaign> => {
            const response = await this.http.put(`/SoftwareUpdateCampaign/update/`, args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            const response = await this.http.post( `/SoftwareUpdateCampaign/delete/`,  { id } );
            return response.data;
        },

        getFirmwareRelease: async (parentId: string): Promise<FirmwareRelease | null> => {
            const response = await this.http.put(`/SoftwareUpdateCampaign/getFirmwareRelease`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignFirmwareRelease: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/SoftwareUpdateCampaign/assignFirmwareRelease`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        unassignFirmwareRelease: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/SoftwareUpdateCampaign/unassignFirmwareRelease`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        getDeviceGroup: async (parentId: string): Promise<DeviceGroup | null> => {
            const response = await this.http.put(`/SoftwareUpdateCampaign/getDeviceGroup`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignDeviceGroup: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/SoftwareUpdateCampaign/assignDeviceGroup`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        unassignDeviceGroup: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/SoftwareUpdateCampaign/unassignDeviceGroup`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        getExecutions: async (parentId: string): Promise<SoftwareUpdateExecution[]> => {
            const response = await this.http.put(`/SoftwareUpdateCampaign/getExecutions/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToExecutions: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/SoftwareUpdateCampaign/addToExecutions/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        removeFromExecutions: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/SoftwareUpdateCampaign/removeFromExecutions/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },


};


    softwareUpdateExecution = {
        find: async (id: string): Promise<SoftwareUpdateExecution | null> => {
            const response = await this.http.post(`/SoftwareUpdateExecution/post`,
                {
                    id
                }
            );
            return response.data;
        },

        findAll: async (paginationOptions?: PaginationOptions): Promise<SoftwareUpdateExecution[]> => {
            const response = await this.http.post(`/SoftwareUpdateExecution/`,
                {
                    pageSize: paginationOptions?.pageSize,
                    after: paginationOptions?.after
                }
            );

            return response.data;
        },

        add: async ( input: SoftwareUpdateExecution): Promise<SoftwareUpdateExecution> => {
            const response = await this.http.post(`/SoftwareUpdateExecution/create`, input);
            return response.data;
        },

        update: async (args: SoftwareUpdateExecution ): Promise<SoftwareUpdateExecution> => {
            const response = await this.http.put(`/SoftwareUpdateExecution/update/`, args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            const response = await this.http.post( `/SoftwareUpdateExecution/delete/`,  { id } );
            return response.data;
        },

        getCampaign: async (parentId: string): Promise<SoftwareUpdateCampaign | null> => {
            const response = await this.http.put(`/SoftwareUpdateExecution/getCampaign`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignCampaign: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/SoftwareUpdateExecution/assignCampaign`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        unassignCampaign: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/SoftwareUpdateExecution/unassignCampaign`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        getDevice: async (parentId: string): Promise<IoTDevice | null> => {
            const response = await this.http.put(`/SoftwareUpdateExecution/getDevice`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignDevice: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/SoftwareUpdateExecution/assignDevice`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        unassignDevice: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/SoftwareUpdateExecution/unassignDevice`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },


};


    deviceGroup = {
        find: async (id: string): Promise<DeviceGroup | null> => {
            const response = await this.http.post(`/DeviceGroup/post`,
                {
                    id
                }
            );
            return response.data;
        },

        findAll: async (paginationOptions?: PaginationOptions): Promise<DeviceGroup[]> => {
            const response = await this.http.post(`/DeviceGroup/`,
                {
                    pageSize: paginationOptions?.pageSize,
                    after: paginationOptions?.after
                }
            );

            return response.data;
        },

        add: async ( input: DeviceGroup): Promise<DeviceGroup> => {
            const response = await this.http.post(`/DeviceGroup/create`, input);
            return response.data;
        },

        update: async (args: DeviceGroup ): Promise<DeviceGroup> => {
            const response = await this.http.put(`/DeviceGroup/update/`, args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            const response = await this.http.post( `/DeviceGroup/delete/`,  { id } );
            return response.data;
        },

        getTenant: async (parentId: string): Promise<Tenant | null> => {
            const response = await this.http.put(`/DeviceGroup/getTenant`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignTenant: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/DeviceGroup/assignTenant`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        unassignTenant: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/DeviceGroup/unassignTenant`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        getDevices: async (parentId: string): Promise<IoTDevice[]> => {
            const response = await this.http.put(`/DeviceGroup/getDevices/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToDevices: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/DeviceGroup/addToDevices/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },

        removeFromDevices: async (parentId: string,childIds: string[]): Promise<Boolean> => {
            const response = await this.http.put(`/DeviceGroup/removeFromDevices/`,
                {
                    parentId,
                    childIds
                }
            );
            return true;
        },


};


    usageRecord = {
        find: async (id: string): Promise<UsageRecord | null> => {
            const response = await this.http.post(`/UsageRecord/post`,
                {
                    id
                }
            );
            return response.data;
        },

        findAll: async (paginationOptions?: PaginationOptions): Promise<UsageRecord[]> => {
            const response = await this.http.post(`/UsageRecord/`,
                {
                    pageSize: paginationOptions?.pageSize,
                    after: paginationOptions?.after
                }
            );

            return response.data;
        },

        add: async ( input: UsageRecord): Promise<UsageRecord> => {
            const response = await this.http.post(`/UsageRecord/create`, input);
            return response.data;
        },

        update: async (args: UsageRecord ): Promise<UsageRecord> => {
            const response = await this.http.put(`/UsageRecord/update/`, args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            const response = await this.http.post( `/UsageRecord/delete/`,  { id } );
            return response.data;
        },

        getTenant: async (parentId: string): Promise<Tenant | null> => {
            const response = await this.http.put(`/UsageRecord/getTenant`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignTenant: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/UsageRecord/assignTenant`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        unassignTenant: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/UsageRecord/unassignTenant`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        getDevice: async (parentId: string): Promise<IoTDevice | null> => {
            const response = await this.http.put(`/UsageRecord/getDevice`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignDevice: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/UsageRecord/assignDevice`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        unassignDevice: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/UsageRecord/unassignDevice`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        getConnectivityPlan: async (parentId: string): Promise<ConnectivityPlan | null> => {
            const response = await this.http.put(`/UsageRecord/getConnectivityPlan`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignConnectivityPlan: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/UsageRecord/assignConnectivityPlan`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },

        unassignConnectivityPlan: async (parentId: string,childId: string): Promise<Boolean> => {
            const response = await this.http.put(`/UsageRecord/unassignConnectivityPlan`,
                {
                    parentId,
                    childId
                }
            );
            return true;
        },


};

}