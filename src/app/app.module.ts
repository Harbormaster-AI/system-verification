import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatMomentDateModule} from "@angular/material-moment-adapter";
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav'

import {IndexDeviceVendorComponent} from './components/DeviceVendor/index/index.component';
import {CreateDeviceVendorComponent} from './components/DeviceVendor/create/create.component';
import {EditDeviceVendorComponent} from './components/DeviceVendor/edit/edit.component';
import {IndexHardwareModuleComponent} from './components/HardwareModule/index/index.component';
import {CreateHardwareModuleComponent} from './components/HardwareModule/create/create.component';
import {EditHardwareModuleComponent} from './components/HardwareModule/edit/edit.component';
import {IndexDeviceModelComponent} from './components/DeviceModel/index/index.component';
import {CreateDeviceModelComponent} from './components/DeviceModel/create/create.component';
import {EditDeviceModelComponent} from './components/DeviceModel/edit/edit.component';
import {IndexFirmwareReleaseComponent} from './components/FirmwareRelease/index/index.component';
import {CreateFirmwareReleaseComponent} from './components/FirmwareRelease/create/create.component';
import {EditFirmwareReleaseComponent} from './components/FirmwareRelease/edit/edit.component';
import {IndexIoTDeviceComponent} from './components/IoTDevice/index/index.component';
import {CreateIoTDeviceComponent} from './components/IoTDevice/create/create.component';
import {EditIoTDeviceComponent} from './components/IoTDevice/edit/edit.component';
import {IndexSensorInstanceComponent} from './components/SensorInstance/index/index.component';
import {CreateSensorInstanceComponent} from './components/SensorInstance/create/create.component';
import {EditSensorInstanceComponent} from './components/SensorInstance/edit/edit.component';
import {IndexActuatorInstanceComponent} from './components/ActuatorInstance/index/index.component';
import {CreateActuatorInstanceComponent} from './components/ActuatorInstance/create/create.component';
import {EditActuatorInstanceComponent} from './components/ActuatorInstance/edit/edit.component';
import {IndexTelemetrySchemaComponent} from './components/TelemetrySchema/index/index.component';
import {CreateTelemetrySchemaComponent} from './components/TelemetrySchema/create/create.component';
import {EditTelemetrySchemaComponent} from './components/TelemetrySchema/edit/edit.component';
import {IndexTelemetryStreamComponent} from './components/TelemetryStream/index/index.component';
import {CreateTelemetryStreamComponent} from './components/TelemetryStream/create/create.component';
import {EditTelemetryStreamComponent} from './components/TelemetryStream/edit/edit.component';
import {IndexCommandDefinitionComponent} from './components/CommandDefinition/index/index.component';
import {CreateCommandDefinitionComponent} from './components/CommandDefinition/create/create.component';
import {EditCommandDefinitionComponent} from './components/CommandDefinition/edit/edit.component';
import {IndexCommandInvocationComponent} from './components/CommandInvocation/index/index.component';
import {CreateCommandInvocationComponent} from './components/CommandInvocation/create/create.component';
import {EditCommandInvocationComponent} from './components/CommandInvocation/edit/edit.component';
import {IndexAlertRuleComponent} from './components/AlertRule/index/index.component';
import {CreateAlertRuleComponent} from './components/AlertRule/create/create.component';
import {EditAlertRuleComponent} from './components/AlertRule/edit/edit.component';
import {IndexAlertComponent} from './components/Alert/index/index.component';
import {CreateAlertComponent} from './components/Alert/create/create.component';
import {EditAlertComponent} from './components/Alert/edit/edit.component';
import {IndexTenantComponent} from './components/Tenant/index/index.component';
import {CreateTenantComponent} from './components/Tenant/create/create.component';
import {EditTenantComponent} from './components/Tenant/edit/edit.component';
import {IndexTenantUserComponent} from './components/TenantUser/index/index.component';
import {CreateTenantUserComponent} from './components/TenantUser/create/create.component';
import {EditTenantUserComponent} from './components/TenantUser/edit/edit.component';
import {IndexSiteComponent} from './components/Site/index/index.component';
import {CreateSiteComponent} from './components/Site/create/create.component';
import {EditSiteComponent} from './components/Site/edit/edit.component';
import {IndexBuildingComponent} from './components/Building/index/index.component';
import {CreateBuildingComponent} from './components/Building/create/create.component';
import {EditBuildingComponent} from './components/Building/edit/edit.component';
import {IndexFloorComponent} from './components/Floor/index/index.component';
import {CreateFloorComponent} from './components/Floor/create/create.component';
import {EditFloorComponent} from './components/Floor/edit/edit.component';
import {IndexRoomComponent} from './components/Room/index/index.component';
import {CreateRoomComponent} from './components/Room/create/create.component';
import {EditRoomComponent} from './components/Room/edit/edit.component';
import {IndexGatewayComponent} from './components/Gateway/index/index.component';
import {CreateGatewayComponent} from './components/Gateway/create/create.component';
import {EditGatewayComponent} from './components/Gateway/edit/edit.component';
import {IndexEdgeApplicationComponent} from './components/EdgeApplication/index/index.component';
import {CreateEdgeApplicationComponent} from './components/EdgeApplication/create/create.component';
import {EditEdgeApplicationComponent} from './components/EdgeApplication/edit/edit.component';
import {IndexNetworkProfileComponent} from './components/NetworkProfile/index/index.component';
import {CreateNetworkProfileComponent} from './components/NetworkProfile/create/create.component';
import {EditNetworkProfileComponent} from './components/NetworkProfile/edit/edit.component';
import {IndexSimCardComponent} from './components/SimCard/index/index.component';
import {CreateSimCardComponent} from './components/SimCard/create/create.component';
import {EditSimCardComponent} from './components/SimCard/edit/edit.component';
import {IndexConnectivityPlanComponent} from './components/ConnectivityPlan/index/index.component';
import {CreateConnectivityPlanComponent} from './components/ConnectivityPlan/create/create.component';
import {EditConnectivityPlanComponent} from './components/ConnectivityPlan/edit/edit.component';
import {IndexMessagingEndpointComponent} from './components/MessagingEndpoint/index/index.component';
import {CreateMessagingEndpointComponent} from './components/MessagingEndpoint/create/create.component';
import {EditMessagingEndpointComponent} from './components/MessagingEndpoint/edit/edit.component';
import {IndexAccessPolicyComponent} from './components/AccessPolicy/index/index.component';
import {CreateAccessPolicyComponent} from './components/AccessPolicy/create/create.component';
import {EditAccessPolicyComponent} from './components/AccessPolicy/edit/edit.component';
import {IndexApiKeyComponent} from './components/ApiKey/index/index.component';
import {CreateApiKeyComponent} from './components/ApiKey/create/create.component';
import {EditApiKeyComponent} from './components/ApiKey/edit/edit.component';
import {IndexDeviceCertificateComponent} from './components/DeviceCertificate/index/index.component';
import {CreateDeviceCertificateComponent} from './components/DeviceCertificate/create/create.component';
import {EditDeviceCertificateComponent} from './components/DeviceCertificate/edit/edit.component';
import {IndexProvisioningRecordComponent} from './components/ProvisioningRecord/index/index.component';
import {CreateProvisioningRecordComponent} from './components/ProvisioningRecord/create/create.component';
import {EditProvisioningRecordComponent} from './components/ProvisioningRecord/edit/edit.component';
import {IndexDigitalTwinComponent} from './components/DigitalTwin/index/index.component';
import {CreateDigitalTwinComponent} from './components/DigitalTwin/create/create.component';
import {EditDigitalTwinComponent} from './components/DigitalTwin/edit/edit.component';
import {IndexTwinTemplateComponent} from './components/TwinTemplate/index/index.component';
import {CreateTwinTemplateComponent} from './components/TwinTemplate/create/create.component';
import {EditTwinTemplateComponent} from './components/TwinTemplate/edit/edit.component';
import {IndexTwinChangeEventComponent} from './components/TwinChangeEvent/index/index.component';
import {CreateTwinChangeEventComponent} from './components/TwinChangeEvent/create/create.component';
import {EditTwinChangeEventComponent} from './components/TwinChangeEvent/edit/edit.component';
import {IndexMaintenanceTicketComponent} from './components/MaintenanceTicket/index/index.component';
import {CreateMaintenanceTicketComponent} from './components/MaintenanceTicket/create/create.component';
import {EditMaintenanceTicketComponent} from './components/MaintenanceTicket/edit/edit.component';
import {IndexDataRetentionPolicyComponent} from './components/DataRetentionPolicy/index/index.component';
import {CreateDataRetentionPolicyComponent} from './components/DataRetentionPolicy/create/create.component';
import {EditDataRetentionPolicyComponent} from './components/DataRetentionPolicy/edit/edit.component';
import {IndexSoftwareUpdateCampaignComponent} from './components/SoftwareUpdateCampaign/index/index.component';
import {CreateSoftwareUpdateCampaignComponent} from './components/SoftwareUpdateCampaign/create/create.component';
import {EditSoftwareUpdateCampaignComponent} from './components/SoftwareUpdateCampaign/edit/edit.component';
import {IndexSoftwareUpdateExecutionComponent} from './components/SoftwareUpdateExecution/index/index.component';
import {CreateSoftwareUpdateExecutionComponent} from './components/SoftwareUpdateExecution/create/create.component';
import {EditSoftwareUpdateExecutionComponent} from './components/SoftwareUpdateExecution/edit/edit.component';
import {IndexDeviceGroupComponent} from './components/DeviceGroup/index/index.component';
import {CreateDeviceGroupComponent} from './components/DeviceGroup/create/create.component';
import {EditDeviceGroupComponent} from './components/DeviceGroup/edit/edit.component';
import {IndexUsageRecordComponent} from './components/UsageRecord/index/index.component';
import {CreateUsageRecordComponent} from './components/UsageRecord/create/create.component';
import {EditUsageRecordComponent} from './components/UsageRecord/edit/edit.component';

import * as appRoutes from './routerConfig';

import {DeviceVendorService} from './services/DeviceVendor.service';
import {HardwareModuleService} from './services/HardwareModule.service';
import {DeviceModelService} from './services/DeviceModel.service';
import {FirmwareReleaseService} from './services/FirmwareRelease.service';
import {IoTDeviceService} from './services/IoTDevice.service';
import {SensorInstanceService} from './services/SensorInstance.service';
import {ActuatorInstanceService} from './services/ActuatorInstance.service';
import {TelemetrySchemaService} from './services/TelemetrySchema.service';
import {TelemetryStreamService} from './services/TelemetryStream.service';
import {CommandDefinitionService} from './services/CommandDefinition.service';
import {CommandInvocationService} from './services/CommandInvocation.service';
import {AlertRuleService} from './services/AlertRule.service';
import {AlertService} from './services/Alert.service';
import {TenantService} from './services/Tenant.service';
import {TenantUserService} from './services/TenantUser.service';
import {SiteService} from './services/Site.service';
import {BuildingService} from './services/Building.service';
import {FloorService} from './services/Floor.service';
import {RoomService} from './services/Room.service';
import {GatewayService} from './services/Gateway.service';
import {EdgeApplicationService} from './services/EdgeApplication.service';
import {NetworkProfileService} from './services/NetworkProfile.service';
import {SimCardService} from './services/SimCard.service';
import {ConnectivityPlanService} from './services/ConnectivityPlan.service';
import {MessagingEndpointService} from './services/MessagingEndpoint.service';
import {AccessPolicyService} from './services/AccessPolicy.service';
import {ApiKeyService} from './services/ApiKey.service';
import {DeviceCertificateService} from './services/DeviceCertificate.service';
import {ProvisioningRecordService} from './services/ProvisioningRecord.service';
import {DigitalTwinService} from './services/DigitalTwin.service';
import {TwinTemplateService} from './services/TwinTemplate.service';
import {TwinChangeEventService} from './services/TwinChangeEvent.service';
import {MaintenanceTicketService} from './services/MaintenanceTicket.service';
import {DataRetentionPolicyService} from './services/DataRetentionPolicy.service';
import {SoftwareUpdateCampaignService} from './services/SoftwareUpdateCampaign.service';
import {SoftwareUpdateExecutionService} from './services/SoftwareUpdateExecution.service';
import {DeviceGroupService} from './services/DeviceGroup.service';
import {UsageRecordService} from './services/UsageRecord.service';

@NgModule({
  declarations: [
    IndexDeviceVendorComponent,
    CreateDeviceVendorComponent,
    EditDeviceVendorComponent,
    IndexHardwareModuleComponent,
    CreateHardwareModuleComponent,
    EditHardwareModuleComponent,
    IndexDeviceModelComponent,
    CreateDeviceModelComponent,
    EditDeviceModelComponent,
    IndexFirmwareReleaseComponent,
    CreateFirmwareReleaseComponent,
    EditFirmwareReleaseComponent,
    IndexIoTDeviceComponent,
    CreateIoTDeviceComponent,
    EditIoTDeviceComponent,
    IndexSensorInstanceComponent,
    CreateSensorInstanceComponent,
    EditSensorInstanceComponent,
    IndexActuatorInstanceComponent,
    CreateActuatorInstanceComponent,
    EditActuatorInstanceComponent,
    IndexTelemetrySchemaComponent,
    CreateTelemetrySchemaComponent,
    EditTelemetrySchemaComponent,
    IndexTelemetryStreamComponent,
    CreateTelemetryStreamComponent,
    EditTelemetryStreamComponent,
    IndexCommandDefinitionComponent,
    CreateCommandDefinitionComponent,
    EditCommandDefinitionComponent,
    IndexCommandInvocationComponent,
    CreateCommandInvocationComponent,
    EditCommandInvocationComponent,
    IndexAlertRuleComponent,
    CreateAlertRuleComponent,
    EditAlertRuleComponent,
    IndexAlertComponent,
    CreateAlertComponent,
    EditAlertComponent,
    IndexTenantComponent,
    CreateTenantComponent,
    EditTenantComponent,
    IndexTenantUserComponent,
    CreateTenantUserComponent,
    EditTenantUserComponent,
    IndexSiteComponent,
    CreateSiteComponent,
    EditSiteComponent,
    IndexBuildingComponent,
    CreateBuildingComponent,
    EditBuildingComponent,
    IndexFloorComponent,
    CreateFloorComponent,
    EditFloorComponent,
    IndexRoomComponent,
    CreateRoomComponent,
    EditRoomComponent,
    IndexGatewayComponent,
    CreateGatewayComponent,
    EditGatewayComponent,
    IndexEdgeApplicationComponent,
    CreateEdgeApplicationComponent,
    EditEdgeApplicationComponent,
    IndexNetworkProfileComponent,
    CreateNetworkProfileComponent,
    EditNetworkProfileComponent,
    IndexSimCardComponent,
    CreateSimCardComponent,
    EditSimCardComponent,
    IndexConnectivityPlanComponent,
    CreateConnectivityPlanComponent,
    EditConnectivityPlanComponent,
    IndexMessagingEndpointComponent,
    CreateMessagingEndpointComponent,
    EditMessagingEndpointComponent,
    IndexAccessPolicyComponent,
    CreateAccessPolicyComponent,
    EditAccessPolicyComponent,
    IndexApiKeyComponent,
    CreateApiKeyComponent,
    EditApiKeyComponent,
    IndexDeviceCertificateComponent,
    CreateDeviceCertificateComponent,
    EditDeviceCertificateComponent,
    IndexProvisioningRecordComponent,
    CreateProvisioningRecordComponent,
    EditProvisioningRecordComponent,
    IndexDigitalTwinComponent,
    CreateDigitalTwinComponent,
    EditDigitalTwinComponent,
    IndexTwinTemplateComponent,
    CreateTwinTemplateComponent,
    EditTwinTemplateComponent,
    IndexTwinChangeEventComponent,
    CreateTwinChangeEventComponent,
    EditTwinChangeEventComponent,
    IndexMaintenanceTicketComponent,
    CreateMaintenanceTicketComponent,
    EditMaintenanceTicketComponent,
    IndexDataRetentionPolicyComponent,
    CreateDataRetentionPolicyComponent,
    EditDataRetentionPolicyComponent,
    IndexSoftwareUpdateCampaignComponent,
    CreateSoftwareUpdateCampaignComponent,
    EditSoftwareUpdateCampaignComponent,
    IndexSoftwareUpdateExecutionComponent,
    CreateSoftwareUpdateExecutionComponent,
    EditSoftwareUpdateExecutionComponent,
    IndexDeviceGroupComponent,
    CreateDeviceGroupComponent,
    EditDeviceGroupComponent,
    IndexUsageRecordComponent,
    CreateUsageRecordComponent,
    EditUsageRecordComponent,
    AppComponent
  ],
  imports: [

    BrowserModule, 
    NgbModule,
    MatMenuModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
	MatMomentDateModule,
    BrowserAnimationsModule,
	HttpClientModule, 
    ReactiveFormsModule,
    FormsModule,
    MatSidenavModule,    
    RouterModule.forRoot(appRoutes.DeviceVendorRoutes), 
    RouterModule.forRoot(appRoutes.HardwareModuleRoutes), 
    RouterModule.forRoot(appRoutes.DeviceModelRoutes), 
    RouterModule.forRoot(appRoutes.FirmwareReleaseRoutes), 
    RouterModule.forRoot(appRoutes.IoTDeviceRoutes), 
    RouterModule.forRoot(appRoutes.SensorInstanceRoutes), 
    RouterModule.forRoot(appRoutes.ActuatorInstanceRoutes), 
    RouterModule.forRoot(appRoutes.TelemetrySchemaRoutes), 
    RouterModule.forRoot(appRoutes.TelemetryStreamRoutes), 
    RouterModule.forRoot(appRoutes.CommandDefinitionRoutes), 
    RouterModule.forRoot(appRoutes.CommandInvocationRoutes), 
    RouterModule.forRoot(appRoutes.AlertRuleRoutes), 
    RouterModule.forRoot(appRoutes.AlertRoutes), 
    RouterModule.forRoot(appRoutes.TenantRoutes), 
    RouterModule.forRoot(appRoutes.TenantUserRoutes), 
    RouterModule.forRoot(appRoutes.SiteRoutes), 
    RouterModule.forRoot(appRoutes.BuildingRoutes), 
    RouterModule.forRoot(appRoutes.FloorRoutes), 
    RouterModule.forRoot(appRoutes.RoomRoutes), 
    RouterModule.forRoot(appRoutes.GatewayRoutes), 
    RouterModule.forRoot(appRoutes.EdgeApplicationRoutes), 
    RouterModule.forRoot(appRoutes.NetworkProfileRoutes), 
    RouterModule.forRoot(appRoutes.SimCardRoutes), 
    RouterModule.forRoot(appRoutes.ConnectivityPlanRoutes), 
    RouterModule.forRoot(appRoutes.MessagingEndpointRoutes), 
    RouterModule.forRoot(appRoutes.AccessPolicyRoutes), 
    RouterModule.forRoot(appRoutes.ApiKeyRoutes), 
    RouterModule.forRoot(appRoutes.DeviceCertificateRoutes), 
    RouterModule.forRoot(appRoutes.ProvisioningRecordRoutes), 
    RouterModule.forRoot(appRoutes.DigitalTwinRoutes), 
    RouterModule.forRoot(appRoutes.TwinTemplateRoutes), 
    RouterModule.forRoot(appRoutes.TwinChangeEventRoutes), 
    RouterModule.forRoot(appRoutes.MaintenanceTicketRoutes), 
    RouterModule.forRoot(appRoutes.DataRetentionPolicyRoutes), 
    RouterModule.forRoot(appRoutes.SoftwareUpdateCampaignRoutes), 
    RouterModule.forRoot(appRoutes.SoftwareUpdateExecutionRoutes), 
    RouterModule.forRoot(appRoutes.DeviceGroupRoutes), 
    RouterModule.forRoot(appRoutes.UsageRecordRoutes), 
  ],
  providers: [DeviceVendorService,HardwareModuleService,DeviceModelService,FirmwareReleaseService,IoTDeviceService,SensorInstanceService,ActuatorInstanceService,TelemetrySchemaService,TelemetryStreamService,CommandDefinitionService,CommandInvocationService,AlertRuleService,AlertService,TenantService,TenantUserService,SiteService,BuildingService,FloorService,RoomService,GatewayService,EdgeApplicationService,NetworkProfileService,SimCardService,ConnectivityPlanService,MessagingEndpointService,AccessPolicyService,ApiKeyService,DeviceCertificateService,ProvisioningRecordService,DigitalTwinService,TwinTemplateService,TwinChangeEventService,MaintenanceTicketService,DataRetentionPolicyService,SoftwareUpdateCampaignService,SoftwareUpdateExecutionService,DeviceGroupService,UsageRecordService],
  bootstrap: [AppComponent]
})
export class AppModule { }
