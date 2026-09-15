import { HttpClient } from '@angular/common/http';
import * as enumTypes from '../models/EnumTypes';

import {DeviceVendorService} from '../services/DeviceVendor.service';
import {HardwareModuleService} from '../services/HardwareModule.service';
import {DeviceModelService} from '../services/DeviceModel.service';
import {FirmwareReleaseService} from '../services/FirmwareRelease.service';
import {IoTDeviceService} from '../services/IoTDevice.service';
import {SensorInstanceService} from '../services/SensorInstance.service';
import {ActuatorInstanceService} from '../services/ActuatorInstance.service';
import {TelemetrySchemaService} from '../services/TelemetrySchema.service';
import {TelemetryStreamService} from '../services/TelemetryStream.service';
import {CommandDefinitionService} from '../services/CommandDefinition.service';
import {CommandInvocationService} from '../services/CommandInvocation.service';
import {AlertRuleService} from '../services/AlertRule.service';
import {AlertService} from '../services/Alert.service';
import {TenantService} from '../services/Tenant.service';
import {TenantUserService} from '../services/TenantUser.service';
import {SiteService} from '../services/Site.service';
import {BuildingService} from '../services/Building.service';
import {FloorService} from '../services/Floor.service';
import {RoomService} from '../services/Room.service';
import {GatewayService} from '../services/Gateway.service';
import {EdgeApplicationService} from '../services/EdgeApplication.service';
import {NetworkProfileService} from '../services/NetworkProfile.service';
import {SimCardService} from '../services/SimCard.service';
import {ConnectivityPlanService} from '../services/ConnectivityPlan.service';
import {MessagingEndpointService} from '../services/MessagingEndpoint.service';
import {AccessPolicyService} from '../services/AccessPolicy.service';
import {ApiKeyService} from '../services/ApiKey.service';
import {DeviceCertificateService} from '../services/DeviceCertificate.service';
import {ProvisioningRecordService} from '../services/ProvisioningRecord.service';
import {DigitalTwinService} from '../services/DigitalTwin.service';
import {TwinTemplateService} from '../services/TwinTemplate.service';
import {TwinChangeEventService} from '../services/TwinChangeEvent.service';
import {MaintenanceTicketService} from '../services/MaintenanceTicket.service';
import {DataRetentionPolicyService} from '../services/DataRetentionPolicy.service';
import {SoftwareUpdateCampaignService} from '../services/SoftwareUpdateCampaign.service';
import {SoftwareUpdateExecutionService} from '../services/SoftwareUpdateExecution.service';
import {DeviceGroupService} from '../services/DeviceGroup.service';
import {UsageRecordService} from '../services/UsageRecord.service';

import { Directive } from '@angular/core';

/**
 Base class of all Components.
 For convenience, contains all enums and entity lists
 **/

@Directive()
export class BaseComponent {

    constructor (private http: HttpClient) {}

// enum instances
    ConnectivityTypes = Object.keys(enumTypes.ConnectivityType);
    DeviceStatuss = Object.keys(enumTypes.DeviceStatus);
    TelemetryEncodings = Object.keys(enumTypes.TelemetryEncoding);
    MessageQoSs = Object.keys(enumTypes.MessageQoS);
    CertificateTypes = Object.keys(enumTypes.CertificateType);
    ProvisioningMethods = Object.keys(enumTypes.ProvisioningMethod);
    ProvisioningStatuss = Object.keys(enumTypes.ProvisioningStatus);
    SensorTypes = Object.keys(enumTypes.SensorType);
    ActuatorTypes = Object.keys(enumTypes.ActuatorType);
    AlertSeveritys = Object.keys(enumTypes.AlertSeverity);
    AlertStatuss = Object.keys(enumTypes.AlertStatus);
    UserRoles = Object.keys(enumTypes.UserRole);
    TenantTypes = Object.keys(enumTypes.TenantType);
    MessagingProtocols = Object.keys(enumTypes.MessagingProtocol);
    SimStatuss = Object.keys(enumTypes.SimStatus);
    CommandStatuss = Object.keys(enumTypes.CommandStatus);
    UpdateCampaignStatuss = Object.keys(enumTypes.UpdateCampaignStatus);
    UpdateStatuss = Object.keys(enumTypes.UpdateStatus);
    TwinChangeTypes = Object.keys(enumTypes.TwinChangeType);
    MaintenancePrioritys = Object.keys(enumTypes.MaintenancePriority);
    MaintenanceStatuss = Object.keys(enumTypes.MaintenanceStatus);
    DeploymentStatuss = Object.keys(enumTypes.DeploymentStatus);
    PowerSources = Object.keys(enumTypes.PowerSource);
    ModuleTypes = Object.keys(enumTypes.ModuleType);

// all collection instances
    deviceVendors : any;
    hardwareModules : any;
    deviceModels : any;
    firmwareReleases : any;
    ioTDevices : any;
    sensorInstances : any;
    actuatorInstances : any;
    telemetrySchemas : any;
    telemetryStreams : any;
    commandDefinitions : any;
    commandInvocations : any;
    alertRules : any;
    alerts : any;
    tenants : any;
    tenantUsers : any;
    sites : any;
    buildings : any;
    floors : any;
    rooms : any;
    gateways : any;
    edgeApplications : any;
    networkProfiles : any;
    simCards : any;
    connectivityPlans : any;
    messagingEndpoints : any;
    accessPolicys : any;
    apiKeys : any;
    deviceCertificates : any;
    provisioningRecords : any;
    digitalTwins : any;
    twinTemplates : any;
    twinChangeEvents : any;
    maintenanceTickets : any;
    dataRetentionPolicys : any;
    softwareUpdateCampaigns : any;
    softwareUpdateExecutions : any;
    deviceGroups : any;
    usageRecords : any;
  
// initialization  
    ngOnInit() {
    }

    initDeviceVendorList() {
        if ( this.deviceVendors == null ) {
            new DeviceVendorService(this.http).getDeviceVendors().subscribe(res => {
                this.deviceVendors = res;
            });
        }
    }
    
    initHardwareModuleList() {
        if ( this.hardwareModules == null ) {
            new HardwareModuleService(this.http).getHardwareModules().subscribe(res => {
                this.hardwareModules = res;
            });
        }
    }
    
    initDeviceModelList() {
        if ( this.deviceModels == null ) {
            new DeviceModelService(this.http).getDeviceModels().subscribe(res => {
                this.deviceModels = res;
            });
        }
    }
    
    initFirmwareReleaseList() {
        if ( this.firmwareReleases == null ) {
            new FirmwareReleaseService(this.http).getFirmwareReleases().subscribe(res => {
                this.firmwareReleases = res;
            });
        }
    }
    
    initIoTDeviceList() {
        if ( this.ioTDevices == null ) {
            new IoTDeviceService(this.http).getIoTDevices().subscribe(res => {
                this.ioTDevices = res;
            });
        }
    }
    
    initSensorInstanceList() {
        if ( this.sensorInstances == null ) {
            new SensorInstanceService(this.http).getSensorInstances().subscribe(res => {
                this.sensorInstances = res;
            });
        }
    }
    
    initActuatorInstanceList() {
        if ( this.actuatorInstances == null ) {
            new ActuatorInstanceService(this.http).getActuatorInstances().subscribe(res => {
                this.actuatorInstances = res;
            });
        }
    }
    
    initTelemetrySchemaList() {
        if ( this.telemetrySchemas == null ) {
            new TelemetrySchemaService(this.http).getTelemetrySchemas().subscribe(res => {
                this.telemetrySchemas = res;
            });
        }
    }
    
    initTelemetryStreamList() {
        if ( this.telemetryStreams == null ) {
            new TelemetryStreamService(this.http).getTelemetryStreams().subscribe(res => {
                this.telemetryStreams = res;
            });
        }
    }
    
    initCommandDefinitionList() {
        if ( this.commandDefinitions == null ) {
            new CommandDefinitionService(this.http).getCommandDefinitions().subscribe(res => {
                this.commandDefinitions = res;
            });
        }
    }
    
    initCommandInvocationList() {
        if ( this.commandInvocations == null ) {
            new CommandInvocationService(this.http).getCommandInvocations().subscribe(res => {
                this.commandInvocations = res;
            });
        }
    }
    
    initAlertRuleList() {
        if ( this.alertRules == null ) {
            new AlertRuleService(this.http).getAlertRules().subscribe(res => {
                this.alertRules = res;
            });
        }
    }
    
    initAlertList() {
        if ( this.alerts == null ) {
            new AlertService(this.http).getAlerts().subscribe(res => {
                this.alerts = res;
            });
        }
    }
    
    initTenantList() {
        if ( this.tenants == null ) {
            new TenantService(this.http).getTenants().subscribe(res => {
                this.tenants = res;
            });
        }
    }
    
    initTenantUserList() {
        if ( this.tenantUsers == null ) {
            new TenantUserService(this.http).getTenantUsers().subscribe(res => {
                this.tenantUsers = res;
            });
        }
    }
    
    initSiteList() {
        if ( this.sites == null ) {
            new SiteService(this.http).getSites().subscribe(res => {
                this.sites = res;
            });
        }
    }
    
    initBuildingList() {
        if ( this.buildings == null ) {
            new BuildingService(this.http).getBuildings().subscribe(res => {
                this.buildings = res;
            });
        }
    }
    
    initFloorList() {
        if ( this.floors == null ) {
            new FloorService(this.http).getFloors().subscribe(res => {
                this.floors = res;
            });
        }
    }
    
    initRoomList() {
        if ( this.rooms == null ) {
            new RoomService(this.http).getRooms().subscribe(res => {
                this.rooms = res;
            });
        }
    }
    
    initGatewayList() {
        if ( this.gateways == null ) {
            new GatewayService(this.http).getGateways().subscribe(res => {
                this.gateways = res;
            });
        }
    }
    
    initEdgeApplicationList() {
        if ( this.edgeApplications == null ) {
            new EdgeApplicationService(this.http).getEdgeApplications().subscribe(res => {
                this.edgeApplications = res;
            });
        }
    }
    
    initNetworkProfileList() {
        if ( this.networkProfiles == null ) {
            new NetworkProfileService(this.http).getNetworkProfiles().subscribe(res => {
                this.networkProfiles = res;
            });
        }
    }
    
    initSimCardList() {
        if ( this.simCards == null ) {
            new SimCardService(this.http).getSimCards().subscribe(res => {
                this.simCards = res;
            });
        }
    }
    
    initConnectivityPlanList() {
        if ( this.connectivityPlans == null ) {
            new ConnectivityPlanService(this.http).getConnectivityPlans().subscribe(res => {
                this.connectivityPlans = res;
            });
        }
    }
    
    initMessagingEndpointList() {
        if ( this.messagingEndpoints == null ) {
            new MessagingEndpointService(this.http).getMessagingEndpoints().subscribe(res => {
                this.messagingEndpoints = res;
            });
        }
    }
    
    initAccessPolicyList() {
        if ( this.accessPolicys == null ) {
            new AccessPolicyService(this.http).getAccessPolicys().subscribe(res => {
                this.accessPolicys = res;
            });
        }
    }
    
    initApiKeyList() {
        if ( this.apiKeys == null ) {
            new ApiKeyService(this.http).getApiKeys().subscribe(res => {
                this.apiKeys = res;
            });
        }
    }
    
    initDeviceCertificateList() {
        if ( this.deviceCertificates == null ) {
            new DeviceCertificateService(this.http).getDeviceCertificates().subscribe(res => {
                this.deviceCertificates = res;
            });
        }
    }
    
    initProvisioningRecordList() {
        if ( this.provisioningRecords == null ) {
            new ProvisioningRecordService(this.http).getProvisioningRecords().subscribe(res => {
                this.provisioningRecords = res;
            });
        }
    }
    
    initDigitalTwinList() {
        if ( this.digitalTwins == null ) {
            new DigitalTwinService(this.http).getDigitalTwins().subscribe(res => {
                this.digitalTwins = res;
            });
        }
    }
    
    initTwinTemplateList() {
        if ( this.twinTemplates == null ) {
            new TwinTemplateService(this.http).getTwinTemplates().subscribe(res => {
                this.twinTemplates = res;
            });
        }
    }
    
    initTwinChangeEventList() {
        if ( this.twinChangeEvents == null ) {
            new TwinChangeEventService(this.http).getTwinChangeEvents().subscribe(res => {
                this.twinChangeEvents = res;
            });
        }
    }
    
    initMaintenanceTicketList() {
        if ( this.maintenanceTickets == null ) {
            new MaintenanceTicketService(this.http).getMaintenanceTickets().subscribe(res => {
                this.maintenanceTickets = res;
            });
        }
    }
    
    initDataRetentionPolicyList() {
        if ( this.dataRetentionPolicys == null ) {
            new DataRetentionPolicyService(this.http).getDataRetentionPolicys().subscribe(res => {
                this.dataRetentionPolicys = res;
            });
        }
    }
    
    initSoftwareUpdateCampaignList() {
        if ( this.softwareUpdateCampaigns == null ) {
            new SoftwareUpdateCampaignService(this.http).getSoftwareUpdateCampaigns().subscribe(res => {
                this.softwareUpdateCampaigns = res;
            });
        }
    }
    
    initSoftwareUpdateExecutionList() {
        if ( this.softwareUpdateExecutions == null ) {
            new SoftwareUpdateExecutionService(this.http).getSoftwareUpdateExecutions().subscribe(res => {
                this.softwareUpdateExecutions = res;
            });
        }
    }
    
    initDeviceGroupList() {
        if ( this.deviceGroups == null ) {
            new DeviceGroupService(this.http).getDeviceGroups().subscribe(res => {
                this.deviceGroups = res;
            });
        }
    }
    
    initUsageRecordList() {
        if ( this.usageRecords == null ) {
            new UsageRecordService(this.http).getUsageRecords().subscribe(res => {
                this.usageRecords = res;
            });
        }
    }
    
    
// comparison function for select controls  
    compareFn(user1: any, user2: any) {
        return user1 == user2
    }    
}
