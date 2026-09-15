// routerConfig.ts

import { Routes } from '@angular/router';
import { CreateDeviceVendorComponent } from './components/DeviceVendor/create/create.component';
import { EditDeviceVendorComponent } from './components/DeviceVendor/edit/edit.component';
import { IndexDeviceVendorComponent } from './components/DeviceVendor/index/index.component';
import { CreateHardwareModuleComponent } from './components/HardwareModule/create/create.component';
import { EditHardwareModuleComponent } from './components/HardwareModule/edit/edit.component';
import { IndexHardwareModuleComponent } from './components/HardwareModule/index/index.component';
import { CreateDeviceModelComponent } from './components/DeviceModel/create/create.component';
import { EditDeviceModelComponent } from './components/DeviceModel/edit/edit.component';
import { IndexDeviceModelComponent } from './components/DeviceModel/index/index.component';
import { CreateFirmwareReleaseComponent } from './components/FirmwareRelease/create/create.component';
import { EditFirmwareReleaseComponent } from './components/FirmwareRelease/edit/edit.component';
import { IndexFirmwareReleaseComponent } from './components/FirmwareRelease/index/index.component';
import { CreateIoTDeviceComponent } from './components/IoTDevice/create/create.component';
import { EditIoTDeviceComponent } from './components/IoTDevice/edit/edit.component';
import { IndexIoTDeviceComponent } from './components/IoTDevice/index/index.component';
import { CreateSensorInstanceComponent } from './components/SensorInstance/create/create.component';
import { EditSensorInstanceComponent } from './components/SensorInstance/edit/edit.component';
import { IndexSensorInstanceComponent } from './components/SensorInstance/index/index.component';
import { CreateActuatorInstanceComponent } from './components/ActuatorInstance/create/create.component';
import { EditActuatorInstanceComponent } from './components/ActuatorInstance/edit/edit.component';
import { IndexActuatorInstanceComponent } from './components/ActuatorInstance/index/index.component';
import { CreateTelemetrySchemaComponent } from './components/TelemetrySchema/create/create.component';
import { EditTelemetrySchemaComponent } from './components/TelemetrySchema/edit/edit.component';
import { IndexTelemetrySchemaComponent } from './components/TelemetrySchema/index/index.component';
import { CreateTelemetryStreamComponent } from './components/TelemetryStream/create/create.component';
import { EditTelemetryStreamComponent } from './components/TelemetryStream/edit/edit.component';
import { IndexTelemetryStreamComponent } from './components/TelemetryStream/index/index.component';
import { CreateCommandDefinitionComponent } from './components/CommandDefinition/create/create.component';
import { EditCommandDefinitionComponent } from './components/CommandDefinition/edit/edit.component';
import { IndexCommandDefinitionComponent } from './components/CommandDefinition/index/index.component';
import { CreateCommandInvocationComponent } from './components/CommandInvocation/create/create.component';
import { EditCommandInvocationComponent } from './components/CommandInvocation/edit/edit.component';
import { IndexCommandInvocationComponent } from './components/CommandInvocation/index/index.component';
import { CreateAlertRuleComponent } from './components/AlertRule/create/create.component';
import { EditAlertRuleComponent } from './components/AlertRule/edit/edit.component';
import { IndexAlertRuleComponent } from './components/AlertRule/index/index.component';
import { CreateAlertComponent } from './components/Alert/create/create.component';
import { EditAlertComponent } from './components/Alert/edit/edit.component';
import { IndexAlertComponent } from './components/Alert/index/index.component';
import { CreateTenantComponent } from './components/Tenant/create/create.component';
import { EditTenantComponent } from './components/Tenant/edit/edit.component';
import { IndexTenantComponent } from './components/Tenant/index/index.component';
import { CreateTenantUserComponent } from './components/TenantUser/create/create.component';
import { EditTenantUserComponent } from './components/TenantUser/edit/edit.component';
import { IndexTenantUserComponent } from './components/TenantUser/index/index.component';
import { CreateSiteComponent } from './components/Site/create/create.component';
import { EditSiteComponent } from './components/Site/edit/edit.component';
import { IndexSiteComponent } from './components/Site/index/index.component';
import { CreateBuildingComponent } from './components/Building/create/create.component';
import { EditBuildingComponent } from './components/Building/edit/edit.component';
import { IndexBuildingComponent } from './components/Building/index/index.component';
import { CreateFloorComponent } from './components/Floor/create/create.component';
import { EditFloorComponent } from './components/Floor/edit/edit.component';
import { IndexFloorComponent } from './components/Floor/index/index.component';
import { CreateRoomComponent } from './components/Room/create/create.component';
import { EditRoomComponent } from './components/Room/edit/edit.component';
import { IndexRoomComponent } from './components/Room/index/index.component';
import { CreateGatewayComponent } from './components/Gateway/create/create.component';
import { EditGatewayComponent } from './components/Gateway/edit/edit.component';
import { IndexGatewayComponent } from './components/Gateway/index/index.component';
import { CreateEdgeApplicationComponent } from './components/EdgeApplication/create/create.component';
import { EditEdgeApplicationComponent } from './components/EdgeApplication/edit/edit.component';
import { IndexEdgeApplicationComponent } from './components/EdgeApplication/index/index.component';
import { CreateNetworkProfileComponent } from './components/NetworkProfile/create/create.component';
import { EditNetworkProfileComponent } from './components/NetworkProfile/edit/edit.component';
import { IndexNetworkProfileComponent } from './components/NetworkProfile/index/index.component';
import { CreateSimCardComponent } from './components/SimCard/create/create.component';
import { EditSimCardComponent } from './components/SimCard/edit/edit.component';
import { IndexSimCardComponent } from './components/SimCard/index/index.component';
import { CreateConnectivityPlanComponent } from './components/ConnectivityPlan/create/create.component';
import { EditConnectivityPlanComponent } from './components/ConnectivityPlan/edit/edit.component';
import { IndexConnectivityPlanComponent } from './components/ConnectivityPlan/index/index.component';
import { CreateMessagingEndpointComponent } from './components/MessagingEndpoint/create/create.component';
import { EditMessagingEndpointComponent } from './components/MessagingEndpoint/edit/edit.component';
import { IndexMessagingEndpointComponent } from './components/MessagingEndpoint/index/index.component';
import { CreateAccessPolicyComponent } from './components/AccessPolicy/create/create.component';
import { EditAccessPolicyComponent } from './components/AccessPolicy/edit/edit.component';
import { IndexAccessPolicyComponent } from './components/AccessPolicy/index/index.component';
import { CreateApiKeyComponent } from './components/ApiKey/create/create.component';
import { EditApiKeyComponent } from './components/ApiKey/edit/edit.component';
import { IndexApiKeyComponent } from './components/ApiKey/index/index.component';
import { CreateDeviceCertificateComponent } from './components/DeviceCertificate/create/create.component';
import { EditDeviceCertificateComponent } from './components/DeviceCertificate/edit/edit.component';
import { IndexDeviceCertificateComponent } from './components/DeviceCertificate/index/index.component';
import { CreateProvisioningRecordComponent } from './components/ProvisioningRecord/create/create.component';
import { EditProvisioningRecordComponent } from './components/ProvisioningRecord/edit/edit.component';
import { IndexProvisioningRecordComponent } from './components/ProvisioningRecord/index/index.component';
import { CreateDigitalTwinComponent } from './components/DigitalTwin/create/create.component';
import { EditDigitalTwinComponent } from './components/DigitalTwin/edit/edit.component';
import { IndexDigitalTwinComponent } from './components/DigitalTwin/index/index.component';
import { CreateTwinTemplateComponent } from './components/TwinTemplate/create/create.component';
import { EditTwinTemplateComponent } from './components/TwinTemplate/edit/edit.component';
import { IndexTwinTemplateComponent } from './components/TwinTemplate/index/index.component';
import { CreateTwinChangeEventComponent } from './components/TwinChangeEvent/create/create.component';
import { EditTwinChangeEventComponent } from './components/TwinChangeEvent/edit/edit.component';
import { IndexTwinChangeEventComponent } from './components/TwinChangeEvent/index/index.component';
import { CreateMaintenanceTicketComponent } from './components/MaintenanceTicket/create/create.component';
import { EditMaintenanceTicketComponent } from './components/MaintenanceTicket/edit/edit.component';
import { IndexMaintenanceTicketComponent } from './components/MaintenanceTicket/index/index.component';
import { CreateDataRetentionPolicyComponent } from './components/DataRetentionPolicy/create/create.component';
import { EditDataRetentionPolicyComponent } from './components/DataRetentionPolicy/edit/edit.component';
import { IndexDataRetentionPolicyComponent } from './components/DataRetentionPolicy/index/index.component';
import { CreateSoftwareUpdateCampaignComponent } from './components/SoftwareUpdateCampaign/create/create.component';
import { EditSoftwareUpdateCampaignComponent } from './components/SoftwareUpdateCampaign/edit/edit.component';
import { IndexSoftwareUpdateCampaignComponent } from './components/SoftwareUpdateCampaign/index/index.component';
import { CreateSoftwareUpdateExecutionComponent } from './components/SoftwareUpdateExecution/create/create.component';
import { EditSoftwareUpdateExecutionComponent } from './components/SoftwareUpdateExecution/edit/edit.component';
import { IndexSoftwareUpdateExecutionComponent } from './components/SoftwareUpdateExecution/index/index.component';
import { CreateDeviceGroupComponent } from './components/DeviceGroup/create/create.component';
import { EditDeviceGroupComponent } from './components/DeviceGroup/edit/edit.component';
import { IndexDeviceGroupComponent } from './components/DeviceGroup/index/index.component';
import { CreateUsageRecordComponent } from './components/UsageRecord/create/create.component';
import { EditUsageRecordComponent } from './components/UsageRecord/edit/edit.component';
import { IndexUsageRecordComponent } from './components/UsageRecord/index/index.component';

export const DeviceVendorRoutes: Routes = [
  { path: 'createDeviceVendor',
    component: CreateDeviceVendorComponent
  },
  {
    path: 'editDeviceVendor/:id',
    component: EditDeviceVendorComponent
  },
  { path: 'indexDeviceVendor',
    component: IndexDeviceVendorComponent
  }
];
export const HardwareModuleRoutes: Routes = [
  { path: 'createHardwareModule',
    component: CreateHardwareModuleComponent
  },
  {
    path: 'editHardwareModule/:id',
    component: EditHardwareModuleComponent
  },
  { path: 'indexHardwareModule',
    component: IndexHardwareModuleComponent
  }
];
export const DeviceModelRoutes: Routes = [
  { path: 'createDeviceModel',
    component: CreateDeviceModelComponent
  },
  {
    path: 'editDeviceModel/:id',
    component: EditDeviceModelComponent
  },
  { path: 'indexDeviceModel',
    component: IndexDeviceModelComponent
  }
];
export const FirmwareReleaseRoutes: Routes = [
  { path: 'createFirmwareRelease',
    component: CreateFirmwareReleaseComponent
  },
  {
    path: 'editFirmwareRelease/:id',
    component: EditFirmwareReleaseComponent
  },
  { path: 'indexFirmwareRelease',
    component: IndexFirmwareReleaseComponent
  }
];
export const IoTDeviceRoutes: Routes = [
  { path: 'createIoTDevice',
    component: CreateIoTDeviceComponent
  },
  {
    path: 'editIoTDevice/:id',
    component: EditIoTDeviceComponent
  },
  { path: 'indexIoTDevice',
    component: IndexIoTDeviceComponent
  }
];
export const SensorInstanceRoutes: Routes = [
  { path: 'createSensorInstance',
    component: CreateSensorInstanceComponent
  },
  {
    path: 'editSensorInstance/:id',
    component: EditSensorInstanceComponent
  },
  { path: 'indexSensorInstance',
    component: IndexSensorInstanceComponent
  }
];
export const ActuatorInstanceRoutes: Routes = [
  { path: 'createActuatorInstance',
    component: CreateActuatorInstanceComponent
  },
  {
    path: 'editActuatorInstance/:id',
    component: EditActuatorInstanceComponent
  },
  { path: 'indexActuatorInstance',
    component: IndexActuatorInstanceComponent
  }
];
export const TelemetrySchemaRoutes: Routes = [
  { path: 'createTelemetrySchema',
    component: CreateTelemetrySchemaComponent
  },
  {
    path: 'editTelemetrySchema/:id',
    component: EditTelemetrySchemaComponent
  },
  { path: 'indexTelemetrySchema',
    component: IndexTelemetrySchemaComponent
  }
];
export const TelemetryStreamRoutes: Routes = [
  { path: 'createTelemetryStream',
    component: CreateTelemetryStreamComponent
  },
  {
    path: 'editTelemetryStream/:id',
    component: EditTelemetryStreamComponent
  },
  { path: 'indexTelemetryStream',
    component: IndexTelemetryStreamComponent
  }
];
export const CommandDefinitionRoutes: Routes = [
  { path: 'createCommandDefinition',
    component: CreateCommandDefinitionComponent
  },
  {
    path: 'editCommandDefinition/:id',
    component: EditCommandDefinitionComponent
  },
  { path: 'indexCommandDefinition',
    component: IndexCommandDefinitionComponent
  }
];
export const CommandInvocationRoutes: Routes = [
  { path: 'createCommandInvocation',
    component: CreateCommandInvocationComponent
  },
  {
    path: 'editCommandInvocation/:id',
    component: EditCommandInvocationComponent
  },
  { path: 'indexCommandInvocation',
    component: IndexCommandInvocationComponent
  }
];
export const AlertRuleRoutes: Routes = [
  { path: 'createAlertRule',
    component: CreateAlertRuleComponent
  },
  {
    path: 'editAlertRule/:id',
    component: EditAlertRuleComponent
  },
  { path: 'indexAlertRule',
    component: IndexAlertRuleComponent
  }
];
export const AlertRoutes: Routes = [
  { path: 'createAlert',
    component: CreateAlertComponent
  },
  {
    path: 'editAlert/:id',
    component: EditAlertComponent
  },
  { path: 'indexAlert',
    component: IndexAlertComponent
  }
];
export const TenantRoutes: Routes = [
  { path: 'createTenant',
    component: CreateTenantComponent
  },
  {
    path: 'editTenant/:id',
    component: EditTenantComponent
  },
  { path: 'indexTenant',
    component: IndexTenantComponent
  }
];
export const TenantUserRoutes: Routes = [
  { path: 'createTenantUser',
    component: CreateTenantUserComponent
  },
  {
    path: 'editTenantUser/:id',
    component: EditTenantUserComponent
  },
  { path: 'indexTenantUser',
    component: IndexTenantUserComponent
  }
];
export const SiteRoutes: Routes = [
  { path: 'createSite',
    component: CreateSiteComponent
  },
  {
    path: 'editSite/:id',
    component: EditSiteComponent
  },
  { path: 'indexSite',
    component: IndexSiteComponent
  }
];
export const BuildingRoutes: Routes = [
  { path: 'createBuilding',
    component: CreateBuildingComponent
  },
  {
    path: 'editBuilding/:id',
    component: EditBuildingComponent
  },
  { path: 'indexBuilding',
    component: IndexBuildingComponent
  }
];
export const FloorRoutes: Routes = [
  { path: 'createFloor',
    component: CreateFloorComponent
  },
  {
    path: 'editFloor/:id',
    component: EditFloorComponent
  },
  { path: 'indexFloor',
    component: IndexFloorComponent
  }
];
export const RoomRoutes: Routes = [
  { path: 'createRoom',
    component: CreateRoomComponent
  },
  {
    path: 'editRoom/:id',
    component: EditRoomComponent
  },
  { path: 'indexRoom',
    component: IndexRoomComponent
  }
];
export const GatewayRoutes: Routes = [
  { path: 'createGateway',
    component: CreateGatewayComponent
  },
  {
    path: 'editGateway/:id',
    component: EditGatewayComponent
  },
  { path: 'indexGateway',
    component: IndexGatewayComponent
  }
];
export const EdgeApplicationRoutes: Routes = [
  { path: 'createEdgeApplication',
    component: CreateEdgeApplicationComponent
  },
  {
    path: 'editEdgeApplication/:id',
    component: EditEdgeApplicationComponent
  },
  { path: 'indexEdgeApplication',
    component: IndexEdgeApplicationComponent
  }
];
export const NetworkProfileRoutes: Routes = [
  { path: 'createNetworkProfile',
    component: CreateNetworkProfileComponent
  },
  {
    path: 'editNetworkProfile/:id',
    component: EditNetworkProfileComponent
  },
  { path: 'indexNetworkProfile',
    component: IndexNetworkProfileComponent
  }
];
export const SimCardRoutes: Routes = [
  { path: 'createSimCard',
    component: CreateSimCardComponent
  },
  {
    path: 'editSimCard/:id',
    component: EditSimCardComponent
  },
  { path: 'indexSimCard',
    component: IndexSimCardComponent
  }
];
export const ConnectivityPlanRoutes: Routes = [
  { path: 'createConnectivityPlan',
    component: CreateConnectivityPlanComponent
  },
  {
    path: 'editConnectivityPlan/:id',
    component: EditConnectivityPlanComponent
  },
  { path: 'indexConnectivityPlan',
    component: IndexConnectivityPlanComponent
  }
];
export const MessagingEndpointRoutes: Routes = [
  { path: 'createMessagingEndpoint',
    component: CreateMessagingEndpointComponent
  },
  {
    path: 'editMessagingEndpoint/:id',
    component: EditMessagingEndpointComponent
  },
  { path: 'indexMessagingEndpoint',
    component: IndexMessagingEndpointComponent
  }
];
export const AccessPolicyRoutes: Routes = [
  { path: 'createAccessPolicy',
    component: CreateAccessPolicyComponent
  },
  {
    path: 'editAccessPolicy/:id',
    component: EditAccessPolicyComponent
  },
  { path: 'indexAccessPolicy',
    component: IndexAccessPolicyComponent
  }
];
export const ApiKeyRoutes: Routes = [
  { path: 'createApiKey',
    component: CreateApiKeyComponent
  },
  {
    path: 'editApiKey/:id',
    component: EditApiKeyComponent
  },
  { path: 'indexApiKey',
    component: IndexApiKeyComponent
  }
];
export const DeviceCertificateRoutes: Routes = [
  { path: 'createDeviceCertificate',
    component: CreateDeviceCertificateComponent
  },
  {
    path: 'editDeviceCertificate/:id',
    component: EditDeviceCertificateComponent
  },
  { path: 'indexDeviceCertificate',
    component: IndexDeviceCertificateComponent
  }
];
export const ProvisioningRecordRoutes: Routes = [
  { path: 'createProvisioningRecord',
    component: CreateProvisioningRecordComponent
  },
  {
    path: 'editProvisioningRecord/:id',
    component: EditProvisioningRecordComponent
  },
  { path: 'indexProvisioningRecord',
    component: IndexProvisioningRecordComponent
  }
];
export const DigitalTwinRoutes: Routes = [
  { path: 'createDigitalTwin',
    component: CreateDigitalTwinComponent
  },
  {
    path: 'editDigitalTwin/:id',
    component: EditDigitalTwinComponent
  },
  { path: 'indexDigitalTwin',
    component: IndexDigitalTwinComponent
  }
];
export const TwinTemplateRoutes: Routes = [
  { path: 'createTwinTemplate',
    component: CreateTwinTemplateComponent
  },
  {
    path: 'editTwinTemplate/:id',
    component: EditTwinTemplateComponent
  },
  { path: 'indexTwinTemplate',
    component: IndexTwinTemplateComponent
  }
];
export const TwinChangeEventRoutes: Routes = [
  { path: 'createTwinChangeEvent',
    component: CreateTwinChangeEventComponent
  },
  {
    path: 'editTwinChangeEvent/:id',
    component: EditTwinChangeEventComponent
  },
  { path: 'indexTwinChangeEvent',
    component: IndexTwinChangeEventComponent
  }
];
export const MaintenanceTicketRoutes: Routes = [
  { path: 'createMaintenanceTicket',
    component: CreateMaintenanceTicketComponent
  },
  {
    path: 'editMaintenanceTicket/:id',
    component: EditMaintenanceTicketComponent
  },
  { path: 'indexMaintenanceTicket',
    component: IndexMaintenanceTicketComponent
  }
];
export const DataRetentionPolicyRoutes: Routes = [
  { path: 'createDataRetentionPolicy',
    component: CreateDataRetentionPolicyComponent
  },
  {
    path: 'editDataRetentionPolicy/:id',
    component: EditDataRetentionPolicyComponent
  },
  { path: 'indexDataRetentionPolicy',
    component: IndexDataRetentionPolicyComponent
  }
];
export const SoftwareUpdateCampaignRoutes: Routes = [
  { path: 'createSoftwareUpdateCampaign',
    component: CreateSoftwareUpdateCampaignComponent
  },
  {
    path: 'editSoftwareUpdateCampaign/:id',
    component: EditSoftwareUpdateCampaignComponent
  },
  { path: 'indexSoftwareUpdateCampaign',
    component: IndexSoftwareUpdateCampaignComponent
  }
];
export const SoftwareUpdateExecutionRoutes: Routes = [
  { path: 'createSoftwareUpdateExecution',
    component: CreateSoftwareUpdateExecutionComponent
  },
  {
    path: 'editSoftwareUpdateExecution/:id',
    component: EditSoftwareUpdateExecutionComponent
  },
  { path: 'indexSoftwareUpdateExecution',
    component: IndexSoftwareUpdateExecutionComponent
  }
];
export const DeviceGroupRoutes: Routes = [
  { path: 'createDeviceGroup',
    component: CreateDeviceGroupComponent
  },
  {
    path: 'editDeviceGroup/:id',
    component: EditDeviceGroupComponent
  },
  { path: 'indexDeviceGroup',
    component: IndexDeviceGroupComponent
  }
];
export const UsageRecordRoutes: Routes = [
  { path: 'createUsageRecord',
    component: CreateUsageRecordComponent
  },
  {
    path: 'editUsageRecord/:id',
    component: EditUsageRecordComponent
  },
  { path: 'indexUsageRecord',
    component: IndexUsageRecordComponent
  }
];
