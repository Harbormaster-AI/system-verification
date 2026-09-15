import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import HomePageComponent from './components/HomePageComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import ListDeviceVendorComponent from './components/ListDeviceVendorComponent';
import CreateDeviceVendorComponent from './components/CreateDeviceVendorComponent';
import ViewDeviceVendorComponent from './components/ViewDeviceVendorComponent';
import ListHardwareModuleComponent from './components/ListHardwareModuleComponent';
import CreateHardwareModuleComponent from './components/CreateHardwareModuleComponent';
import ViewHardwareModuleComponent from './components/ViewHardwareModuleComponent';
import ListDeviceModelComponent from './components/ListDeviceModelComponent';
import CreateDeviceModelComponent from './components/CreateDeviceModelComponent';
import ViewDeviceModelComponent from './components/ViewDeviceModelComponent';
import ListFirmwareReleaseComponent from './components/ListFirmwareReleaseComponent';
import CreateFirmwareReleaseComponent from './components/CreateFirmwareReleaseComponent';
import ViewFirmwareReleaseComponent from './components/ViewFirmwareReleaseComponent';
import ListIoTDeviceComponent from './components/ListIoTDeviceComponent';
import CreateIoTDeviceComponent from './components/CreateIoTDeviceComponent';
import ViewIoTDeviceComponent from './components/ViewIoTDeviceComponent';
import ListSensorInstanceComponent from './components/ListSensorInstanceComponent';
import CreateSensorInstanceComponent from './components/CreateSensorInstanceComponent';
import ViewSensorInstanceComponent from './components/ViewSensorInstanceComponent';
import ListActuatorInstanceComponent from './components/ListActuatorInstanceComponent';
import CreateActuatorInstanceComponent from './components/CreateActuatorInstanceComponent';
import ViewActuatorInstanceComponent from './components/ViewActuatorInstanceComponent';
import ListTelemetrySchemaComponent from './components/ListTelemetrySchemaComponent';
import CreateTelemetrySchemaComponent from './components/CreateTelemetrySchemaComponent';
import ViewTelemetrySchemaComponent from './components/ViewTelemetrySchemaComponent';
import ListTelemetryStreamComponent from './components/ListTelemetryStreamComponent';
import CreateTelemetryStreamComponent from './components/CreateTelemetryStreamComponent';
import ViewTelemetryStreamComponent from './components/ViewTelemetryStreamComponent';
import ListCommandDefinitionComponent from './components/ListCommandDefinitionComponent';
import CreateCommandDefinitionComponent from './components/CreateCommandDefinitionComponent';
import ViewCommandDefinitionComponent from './components/ViewCommandDefinitionComponent';
import ListCommandInvocationComponent from './components/ListCommandInvocationComponent';
import CreateCommandInvocationComponent from './components/CreateCommandInvocationComponent';
import ViewCommandInvocationComponent from './components/ViewCommandInvocationComponent';
import ListAlertRuleComponent from './components/ListAlertRuleComponent';
import CreateAlertRuleComponent from './components/CreateAlertRuleComponent';
import ViewAlertRuleComponent from './components/ViewAlertRuleComponent';
import ListAlertComponent from './components/ListAlertComponent';
import CreateAlertComponent from './components/CreateAlertComponent';
import ViewAlertComponent from './components/ViewAlertComponent';
import ListTenantComponent from './components/ListTenantComponent';
import CreateTenantComponent from './components/CreateTenantComponent';
import ViewTenantComponent from './components/ViewTenantComponent';
import ListTenantUserComponent from './components/ListTenantUserComponent';
import CreateTenantUserComponent from './components/CreateTenantUserComponent';
import ViewTenantUserComponent from './components/ViewTenantUserComponent';
import ListSiteComponent from './components/ListSiteComponent';
import CreateSiteComponent from './components/CreateSiteComponent';
import ViewSiteComponent from './components/ViewSiteComponent';
import ListBuildingComponent from './components/ListBuildingComponent';
import CreateBuildingComponent from './components/CreateBuildingComponent';
import ViewBuildingComponent from './components/ViewBuildingComponent';
import ListFloorComponent from './components/ListFloorComponent';
import CreateFloorComponent from './components/CreateFloorComponent';
import ViewFloorComponent from './components/ViewFloorComponent';
import ListRoomComponent from './components/ListRoomComponent';
import CreateRoomComponent from './components/CreateRoomComponent';
import ViewRoomComponent from './components/ViewRoomComponent';
import ListGatewayComponent from './components/ListGatewayComponent';
import CreateGatewayComponent from './components/CreateGatewayComponent';
import ViewGatewayComponent from './components/ViewGatewayComponent';
import ListEdgeApplicationComponent from './components/ListEdgeApplicationComponent';
import CreateEdgeApplicationComponent from './components/CreateEdgeApplicationComponent';
import ViewEdgeApplicationComponent from './components/ViewEdgeApplicationComponent';
import ListNetworkProfileComponent from './components/ListNetworkProfileComponent';
import CreateNetworkProfileComponent from './components/CreateNetworkProfileComponent';
import ViewNetworkProfileComponent from './components/ViewNetworkProfileComponent';
import ListSimCardComponent from './components/ListSimCardComponent';
import CreateSimCardComponent from './components/CreateSimCardComponent';
import ViewSimCardComponent from './components/ViewSimCardComponent';
import ListConnectivityPlanComponent from './components/ListConnectivityPlanComponent';
import CreateConnectivityPlanComponent from './components/CreateConnectivityPlanComponent';
import ViewConnectivityPlanComponent from './components/ViewConnectivityPlanComponent';
import ListMessagingEndpointComponent from './components/ListMessagingEndpointComponent';
import CreateMessagingEndpointComponent from './components/CreateMessagingEndpointComponent';
import ViewMessagingEndpointComponent from './components/ViewMessagingEndpointComponent';
import ListAccessPolicyComponent from './components/ListAccessPolicyComponent';
import CreateAccessPolicyComponent from './components/CreateAccessPolicyComponent';
import ViewAccessPolicyComponent from './components/ViewAccessPolicyComponent';
import ListApiKeyComponent from './components/ListApiKeyComponent';
import CreateApiKeyComponent from './components/CreateApiKeyComponent';
import ViewApiKeyComponent from './components/ViewApiKeyComponent';
import ListDeviceCertificateComponent from './components/ListDeviceCertificateComponent';
import CreateDeviceCertificateComponent from './components/CreateDeviceCertificateComponent';
import ViewDeviceCertificateComponent from './components/ViewDeviceCertificateComponent';
import ListProvisioningRecordComponent from './components/ListProvisioningRecordComponent';
import CreateProvisioningRecordComponent from './components/CreateProvisioningRecordComponent';
import ViewProvisioningRecordComponent from './components/ViewProvisioningRecordComponent';
import ListDigitalTwinComponent from './components/ListDigitalTwinComponent';
import CreateDigitalTwinComponent from './components/CreateDigitalTwinComponent';
import ViewDigitalTwinComponent from './components/ViewDigitalTwinComponent';
import ListTwinTemplateComponent from './components/ListTwinTemplateComponent';
import CreateTwinTemplateComponent from './components/CreateTwinTemplateComponent';
import ViewTwinTemplateComponent from './components/ViewTwinTemplateComponent';
import ListTwinChangeEventComponent from './components/ListTwinChangeEventComponent';
import CreateTwinChangeEventComponent from './components/CreateTwinChangeEventComponent';
import ViewTwinChangeEventComponent from './components/ViewTwinChangeEventComponent';
import ListMaintenanceTicketComponent from './components/ListMaintenanceTicketComponent';
import CreateMaintenanceTicketComponent from './components/CreateMaintenanceTicketComponent';
import ViewMaintenanceTicketComponent from './components/ViewMaintenanceTicketComponent';
import ListDataRetentionPolicyComponent from './components/ListDataRetentionPolicyComponent';
import CreateDataRetentionPolicyComponent from './components/CreateDataRetentionPolicyComponent';
import ViewDataRetentionPolicyComponent from './components/ViewDataRetentionPolicyComponent';
import ListSoftwareUpdateCampaignComponent from './components/ListSoftwareUpdateCampaignComponent';
import CreateSoftwareUpdateCampaignComponent from './components/CreateSoftwareUpdateCampaignComponent';
import ViewSoftwareUpdateCampaignComponent from './components/ViewSoftwareUpdateCampaignComponent';
import ListSoftwareUpdateExecutionComponent from './components/ListSoftwareUpdateExecutionComponent';
import CreateSoftwareUpdateExecutionComponent from './components/CreateSoftwareUpdateExecutionComponent';
import ViewSoftwareUpdateExecutionComponent from './components/ViewSoftwareUpdateExecutionComponent';
import ListDeviceGroupComponent from './components/ListDeviceGroupComponent';
import CreateDeviceGroupComponent from './components/CreateDeviceGroupComponent';
import ViewDeviceGroupComponent from './components/ViewDeviceGroupComponent';
import ListUsageRecordComponent from './components/ListUsageRecordComponent';
import CreateUsageRecordComponent from './components/CreateUsageRecordComponent';
import ViewUsageRecordComponent from './components/ViewUsageRecordComponent';
function App() {
  return (
    <div>
        <Router>
                <HeaderComponent className="header"/>
                <div className="container">
                    <Switch>
                          <Route path = "/" exact component = {HomePageComponent}></Route>
                            <Route path = "/deviceVendors" component = {ListDeviceVendorComponent}></Route>
                            <Route path = "/add-deviceVendor/:id" component = {CreateDeviceVendorComponent}></Route>
                            <Route path = "/view-deviceVendor/:id" component = {ViewDeviceVendorComponent}></Route>
                          {/* <Route path = "/update-deviceVendor/:id" component = {UpdateDeviceVendorComponent}></Route> */}
                            <Route path = "/hardwareModules" component = {ListHardwareModuleComponent}></Route>
                            <Route path = "/add-hardwareModule/:id" component = {CreateHardwareModuleComponent}></Route>
                            <Route path = "/view-hardwareModule/:id" component = {ViewHardwareModuleComponent}></Route>
                          {/* <Route path = "/update-hardwareModule/:id" component = {UpdateHardwareModuleComponent}></Route> */}
                            <Route path = "/deviceModels" component = {ListDeviceModelComponent}></Route>
                            <Route path = "/add-deviceModel/:id" component = {CreateDeviceModelComponent}></Route>
                            <Route path = "/view-deviceModel/:id" component = {ViewDeviceModelComponent}></Route>
                          {/* <Route path = "/update-deviceModel/:id" component = {UpdateDeviceModelComponent}></Route> */}
                            <Route path = "/firmwareReleases" component = {ListFirmwareReleaseComponent}></Route>
                            <Route path = "/add-firmwareRelease/:id" component = {CreateFirmwareReleaseComponent}></Route>
                            <Route path = "/view-firmwareRelease/:id" component = {ViewFirmwareReleaseComponent}></Route>
                          {/* <Route path = "/update-firmwareRelease/:id" component = {UpdateFirmwareReleaseComponent}></Route> */}
                            <Route path = "/ioTDevices" component = {ListIoTDeviceComponent}></Route>
                            <Route path = "/add-ioTDevice/:id" component = {CreateIoTDeviceComponent}></Route>
                            <Route path = "/view-ioTDevice/:id" component = {ViewIoTDeviceComponent}></Route>
                          {/* <Route path = "/update-ioTDevice/:id" component = {UpdateIoTDeviceComponent}></Route> */}
                            <Route path = "/sensorInstances" component = {ListSensorInstanceComponent}></Route>
                            <Route path = "/add-sensorInstance/:id" component = {CreateSensorInstanceComponent}></Route>
                            <Route path = "/view-sensorInstance/:id" component = {ViewSensorInstanceComponent}></Route>
                          {/* <Route path = "/update-sensorInstance/:id" component = {UpdateSensorInstanceComponent}></Route> */}
                            <Route path = "/actuatorInstances" component = {ListActuatorInstanceComponent}></Route>
                            <Route path = "/add-actuatorInstance/:id" component = {CreateActuatorInstanceComponent}></Route>
                            <Route path = "/view-actuatorInstance/:id" component = {ViewActuatorInstanceComponent}></Route>
                          {/* <Route path = "/update-actuatorInstance/:id" component = {UpdateActuatorInstanceComponent}></Route> */}
                            <Route path = "/telemetrySchemas" component = {ListTelemetrySchemaComponent}></Route>
                            <Route path = "/add-telemetrySchema/:id" component = {CreateTelemetrySchemaComponent}></Route>
                            <Route path = "/view-telemetrySchema/:id" component = {ViewTelemetrySchemaComponent}></Route>
                          {/* <Route path = "/update-telemetrySchema/:id" component = {UpdateTelemetrySchemaComponent}></Route> */}
                            <Route path = "/telemetryStreams" component = {ListTelemetryStreamComponent}></Route>
                            <Route path = "/add-telemetryStream/:id" component = {CreateTelemetryStreamComponent}></Route>
                            <Route path = "/view-telemetryStream/:id" component = {ViewTelemetryStreamComponent}></Route>
                          {/* <Route path = "/update-telemetryStream/:id" component = {UpdateTelemetryStreamComponent}></Route> */}
                            <Route path = "/commandDefinitions" component = {ListCommandDefinitionComponent}></Route>
                            <Route path = "/add-commandDefinition/:id" component = {CreateCommandDefinitionComponent}></Route>
                            <Route path = "/view-commandDefinition/:id" component = {ViewCommandDefinitionComponent}></Route>
                          {/* <Route path = "/update-commandDefinition/:id" component = {UpdateCommandDefinitionComponent}></Route> */}
                            <Route path = "/commandInvocations" component = {ListCommandInvocationComponent}></Route>
                            <Route path = "/add-commandInvocation/:id" component = {CreateCommandInvocationComponent}></Route>
                            <Route path = "/view-commandInvocation/:id" component = {ViewCommandInvocationComponent}></Route>
                          {/* <Route path = "/update-commandInvocation/:id" component = {UpdateCommandInvocationComponent}></Route> */}
                            <Route path = "/alertRules" component = {ListAlertRuleComponent}></Route>
                            <Route path = "/add-alertRule/:id" component = {CreateAlertRuleComponent}></Route>
                            <Route path = "/view-alertRule/:id" component = {ViewAlertRuleComponent}></Route>
                          {/* <Route path = "/update-alertRule/:id" component = {UpdateAlertRuleComponent}></Route> */}
                            <Route path = "/alerts" component = {ListAlertComponent}></Route>
                            <Route path = "/add-alert/:id" component = {CreateAlertComponent}></Route>
                            <Route path = "/view-alert/:id" component = {ViewAlertComponent}></Route>
                          {/* <Route path = "/update-alert/:id" component = {UpdateAlertComponent}></Route> */}
                            <Route path = "/tenants" component = {ListTenantComponent}></Route>
                            <Route path = "/add-tenant/:id" component = {CreateTenantComponent}></Route>
                            <Route path = "/view-tenant/:id" component = {ViewTenantComponent}></Route>
                          {/* <Route path = "/update-tenant/:id" component = {UpdateTenantComponent}></Route> */}
                            <Route path = "/tenantUsers" component = {ListTenantUserComponent}></Route>
                            <Route path = "/add-tenantUser/:id" component = {CreateTenantUserComponent}></Route>
                            <Route path = "/view-tenantUser/:id" component = {ViewTenantUserComponent}></Route>
                          {/* <Route path = "/update-tenantUser/:id" component = {UpdateTenantUserComponent}></Route> */}
                            <Route path = "/sites" component = {ListSiteComponent}></Route>
                            <Route path = "/add-site/:id" component = {CreateSiteComponent}></Route>
                            <Route path = "/view-site/:id" component = {ViewSiteComponent}></Route>
                          {/* <Route path = "/update-site/:id" component = {UpdateSiteComponent}></Route> */}
                            <Route path = "/buildings" component = {ListBuildingComponent}></Route>
                            <Route path = "/add-building/:id" component = {CreateBuildingComponent}></Route>
                            <Route path = "/view-building/:id" component = {ViewBuildingComponent}></Route>
                          {/* <Route path = "/update-building/:id" component = {UpdateBuildingComponent}></Route> */}
                            <Route path = "/floors" component = {ListFloorComponent}></Route>
                            <Route path = "/add-floor/:id" component = {CreateFloorComponent}></Route>
                            <Route path = "/view-floor/:id" component = {ViewFloorComponent}></Route>
                          {/* <Route path = "/update-floor/:id" component = {UpdateFloorComponent}></Route> */}
                            <Route path = "/rooms" component = {ListRoomComponent}></Route>
                            <Route path = "/add-room/:id" component = {CreateRoomComponent}></Route>
                            <Route path = "/view-room/:id" component = {ViewRoomComponent}></Route>
                          {/* <Route path = "/update-room/:id" component = {UpdateRoomComponent}></Route> */}
                            <Route path = "/gateways" component = {ListGatewayComponent}></Route>
                            <Route path = "/add-gateway/:id" component = {CreateGatewayComponent}></Route>
                            <Route path = "/view-gateway/:id" component = {ViewGatewayComponent}></Route>
                          {/* <Route path = "/update-gateway/:id" component = {UpdateGatewayComponent}></Route> */}
                            <Route path = "/edgeApplications" component = {ListEdgeApplicationComponent}></Route>
                            <Route path = "/add-edgeApplication/:id" component = {CreateEdgeApplicationComponent}></Route>
                            <Route path = "/view-edgeApplication/:id" component = {ViewEdgeApplicationComponent}></Route>
                          {/* <Route path = "/update-edgeApplication/:id" component = {UpdateEdgeApplicationComponent}></Route> */}
                            <Route path = "/networkProfiles" component = {ListNetworkProfileComponent}></Route>
                            <Route path = "/add-networkProfile/:id" component = {CreateNetworkProfileComponent}></Route>
                            <Route path = "/view-networkProfile/:id" component = {ViewNetworkProfileComponent}></Route>
                          {/* <Route path = "/update-networkProfile/:id" component = {UpdateNetworkProfileComponent}></Route> */}
                            <Route path = "/simCards" component = {ListSimCardComponent}></Route>
                            <Route path = "/add-simCard/:id" component = {CreateSimCardComponent}></Route>
                            <Route path = "/view-simCard/:id" component = {ViewSimCardComponent}></Route>
                          {/* <Route path = "/update-simCard/:id" component = {UpdateSimCardComponent}></Route> */}
                            <Route path = "/connectivityPlans" component = {ListConnectivityPlanComponent}></Route>
                            <Route path = "/add-connectivityPlan/:id" component = {CreateConnectivityPlanComponent}></Route>
                            <Route path = "/view-connectivityPlan/:id" component = {ViewConnectivityPlanComponent}></Route>
                          {/* <Route path = "/update-connectivityPlan/:id" component = {UpdateConnectivityPlanComponent}></Route> */}
                            <Route path = "/messagingEndpoints" component = {ListMessagingEndpointComponent}></Route>
                            <Route path = "/add-messagingEndpoint/:id" component = {CreateMessagingEndpointComponent}></Route>
                            <Route path = "/view-messagingEndpoint/:id" component = {ViewMessagingEndpointComponent}></Route>
                          {/* <Route path = "/update-messagingEndpoint/:id" component = {UpdateMessagingEndpointComponent}></Route> */}
                            <Route path = "/accessPolicys" component = {ListAccessPolicyComponent}></Route>
                            <Route path = "/add-accessPolicy/:id" component = {CreateAccessPolicyComponent}></Route>
                            <Route path = "/view-accessPolicy/:id" component = {ViewAccessPolicyComponent}></Route>
                          {/* <Route path = "/update-accessPolicy/:id" component = {UpdateAccessPolicyComponent}></Route> */}
                            <Route path = "/apiKeys" component = {ListApiKeyComponent}></Route>
                            <Route path = "/add-apiKey/:id" component = {CreateApiKeyComponent}></Route>
                            <Route path = "/view-apiKey/:id" component = {ViewApiKeyComponent}></Route>
                          {/* <Route path = "/update-apiKey/:id" component = {UpdateApiKeyComponent}></Route> */}
                            <Route path = "/deviceCertificates" component = {ListDeviceCertificateComponent}></Route>
                            <Route path = "/add-deviceCertificate/:id" component = {CreateDeviceCertificateComponent}></Route>
                            <Route path = "/view-deviceCertificate/:id" component = {ViewDeviceCertificateComponent}></Route>
                          {/* <Route path = "/update-deviceCertificate/:id" component = {UpdateDeviceCertificateComponent}></Route> */}
                            <Route path = "/provisioningRecords" component = {ListProvisioningRecordComponent}></Route>
                            <Route path = "/add-provisioningRecord/:id" component = {CreateProvisioningRecordComponent}></Route>
                            <Route path = "/view-provisioningRecord/:id" component = {ViewProvisioningRecordComponent}></Route>
                          {/* <Route path = "/update-provisioningRecord/:id" component = {UpdateProvisioningRecordComponent}></Route> */}
                            <Route path = "/digitalTwins" component = {ListDigitalTwinComponent}></Route>
                            <Route path = "/add-digitalTwin/:id" component = {CreateDigitalTwinComponent}></Route>
                            <Route path = "/view-digitalTwin/:id" component = {ViewDigitalTwinComponent}></Route>
                          {/* <Route path = "/update-digitalTwin/:id" component = {UpdateDigitalTwinComponent}></Route> */}
                            <Route path = "/twinTemplates" component = {ListTwinTemplateComponent}></Route>
                            <Route path = "/add-twinTemplate/:id" component = {CreateTwinTemplateComponent}></Route>
                            <Route path = "/view-twinTemplate/:id" component = {ViewTwinTemplateComponent}></Route>
                          {/* <Route path = "/update-twinTemplate/:id" component = {UpdateTwinTemplateComponent}></Route> */}
                            <Route path = "/twinChangeEvents" component = {ListTwinChangeEventComponent}></Route>
                            <Route path = "/add-twinChangeEvent/:id" component = {CreateTwinChangeEventComponent}></Route>
                            <Route path = "/view-twinChangeEvent/:id" component = {ViewTwinChangeEventComponent}></Route>
                          {/* <Route path = "/update-twinChangeEvent/:id" component = {UpdateTwinChangeEventComponent}></Route> */}
                            <Route path = "/maintenanceTickets" component = {ListMaintenanceTicketComponent}></Route>
                            <Route path = "/add-maintenanceTicket/:id" component = {CreateMaintenanceTicketComponent}></Route>
                            <Route path = "/view-maintenanceTicket/:id" component = {ViewMaintenanceTicketComponent}></Route>
                          {/* <Route path = "/update-maintenanceTicket/:id" component = {UpdateMaintenanceTicketComponent}></Route> */}
                            <Route path = "/dataRetentionPolicys" component = {ListDataRetentionPolicyComponent}></Route>
                            <Route path = "/add-dataRetentionPolicy/:id" component = {CreateDataRetentionPolicyComponent}></Route>
                            <Route path = "/view-dataRetentionPolicy/:id" component = {ViewDataRetentionPolicyComponent}></Route>
                          {/* <Route path = "/update-dataRetentionPolicy/:id" component = {UpdateDataRetentionPolicyComponent}></Route> */}
                            <Route path = "/softwareUpdateCampaigns" component = {ListSoftwareUpdateCampaignComponent}></Route>
                            <Route path = "/add-softwareUpdateCampaign/:id" component = {CreateSoftwareUpdateCampaignComponent}></Route>
                            <Route path = "/view-softwareUpdateCampaign/:id" component = {ViewSoftwareUpdateCampaignComponent}></Route>
                          {/* <Route path = "/update-softwareUpdateCampaign/:id" component = {UpdateSoftwareUpdateCampaignComponent}></Route> */}
                            <Route path = "/softwareUpdateExecutions" component = {ListSoftwareUpdateExecutionComponent}></Route>
                            <Route path = "/add-softwareUpdateExecution/:id" component = {CreateSoftwareUpdateExecutionComponent}></Route>
                            <Route path = "/view-softwareUpdateExecution/:id" component = {ViewSoftwareUpdateExecutionComponent}></Route>
                          {/* <Route path = "/update-softwareUpdateExecution/:id" component = {UpdateSoftwareUpdateExecutionComponent}></Route> */}
                            <Route path = "/deviceGroups" component = {ListDeviceGroupComponent}></Route>
                            <Route path = "/add-deviceGroup/:id" component = {CreateDeviceGroupComponent}></Route>
                            <Route path = "/view-deviceGroup/:id" component = {ViewDeviceGroupComponent}></Route>
                          {/* <Route path = "/update-deviceGroup/:id" component = {UpdateDeviceGroupComponent}></Route> */}
                            <Route path = "/usageRecords" component = {ListUsageRecordComponent}></Route>
                            <Route path = "/add-usageRecord/:id" component = {CreateUsageRecordComponent}></Route>
                            <Route path = "/view-usageRecord/:id" component = {ViewUsageRecordComponent}></Route>
                          {/* <Route path = "/update-usageRecord/:id" component = {UpdateUsageRecordComponent}></Route> */}
                    </Switch>
                </div>
              <FooterComponent />
        </Router>
    </div>
    
  );
}

export default App;
