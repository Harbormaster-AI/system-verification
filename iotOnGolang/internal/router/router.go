package router

import (

    DeviceVendorController "iotOnGolang/internal/controller"
    HardwareModuleController "iotOnGolang/internal/controller"
    DeviceModelController "iotOnGolang/internal/controller"
    FirmwareReleaseController "iotOnGolang/internal/controller"
    IoTDeviceController "iotOnGolang/internal/controller"
    SensorInstanceController "iotOnGolang/internal/controller"
    ActuatorInstanceController "iotOnGolang/internal/controller"
    TelemetrySchemaController "iotOnGolang/internal/controller"
    TelemetryStreamController "iotOnGolang/internal/controller"
    CommandDefinitionController "iotOnGolang/internal/controller"
    CommandInvocationController "iotOnGolang/internal/controller"
    AlertRuleController "iotOnGolang/internal/controller"
    AlertController "iotOnGolang/internal/controller"
    TenantController "iotOnGolang/internal/controller"
    TenantUserController "iotOnGolang/internal/controller"
    SiteController "iotOnGolang/internal/controller"
    BuildingController "iotOnGolang/internal/controller"
    FloorController "iotOnGolang/internal/controller"
    RoomController "iotOnGolang/internal/controller"
    GatewayController "iotOnGolang/internal/controller"
    EdgeApplicationController "iotOnGolang/internal/controller"
    NetworkProfileController "iotOnGolang/internal/controller"
    SimCardController "iotOnGolang/internal/controller"
    ConnectivityPlanController "iotOnGolang/internal/controller"
    MessagingEndpointController "iotOnGolang/internal/controller"
    AccessPolicyController "iotOnGolang/internal/controller"
    ApiKeyController "iotOnGolang/internal/controller"
    DeviceCertificateController "iotOnGolang/internal/controller"
    ProvisioningRecordController "iotOnGolang/internal/controller"
    DigitalTwinController "iotOnGolang/internal/controller"
    TwinTemplateController "iotOnGolang/internal/controller"
    TwinChangeEventController "iotOnGolang/internal/controller"
    MaintenanceTicketController "iotOnGolang/internal/controller"
    DataRetentionPolicyController "iotOnGolang/internal/controller"
    SoftwareUpdateCampaignController "iotOnGolang/internal/controller"
    SoftwareUpdateExecutionController "iotOnGolang/internal/controller"
    DeviceGroupController "iotOnGolang/internal/controller"
    UsageRecordController "iotOnGolang/internal/controller"
    jsonResponseFormatter "iotOnGolang/internal/response"
    "github.com/gorilla/mux"

    PulseIndicatorController__ "iotOnGolang/internal/controller"

)

// Router is exported and used in main.go
func Router() *mux.Router {

    router := mux.NewRouter()

    //----------------------------------------------------------------------------
    // default controllers for health and availability checking
    //----------------------------------------------------------------------------

    router.HandleFunc("/", jsonResponseFormatter.FormatToJSON(PulseIndicatorController__.Default__)).Methods("GET", "OPTIONS")
    router.HandleFunc("/health", jsonResponseFormatter.FormatToJSON(PulseIndicatorController__.Health__)).Methods("GET", "OPTIONS")


    //----------------------------------------------------------------------------
    // DeviceVendor Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/DeviceVendor/{id}", jsonResponseFormatter.FormatToJSON(DeviceVendorController.GetDeviceVendor)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/DeviceVendor", jsonResponseFormatter.FormatToJSON(DeviceVendorController.GetAllDeviceVendor)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewDeviceVendor", jsonResponseFormatter.FormatToJSON(DeviceVendorController.CreateDeviceVendor)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/DeviceVendor/{id}", jsonResponseFormatter.FormatToJSON(DeviceVendorController.UpdateDeviceVendor)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeleteDeviceVendor/{id}", jsonResponseFormatter.FormatToJSON(DeviceVendorController.DeleteDeviceVendor)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AddDeviceModelsToDeviceVendor/{parentId}/deviceModelsId", jsonResponseFormatter.FormatToJSON(DeviceVendorController.AddDeviceModelsToDeviceVendor)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveDeviceModelsFromDeviceVendor/{parentId}/deviceModelsIds", jsonResponseFormatter.FormatToJSON(DeviceVendorController.RemoveDeviceModelsFromDeviceVendor)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AddFirmwareReleasesToDeviceVendor/{parentId}/firmwareReleasesId", jsonResponseFormatter.FormatToJSON(DeviceVendorController.AddFirmwareReleasesToDeviceVendor)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveFirmwareReleasesFromDeviceVendor/{parentId}/firmwareReleasesIds", jsonResponseFormatter.FormatToJSON(DeviceVendorController.RemoveFirmwareReleasesFromDeviceVendor)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AddHardwareModulesToDeviceVendor/{parentId}/hardwareModulesId", jsonResponseFormatter.FormatToJSON(DeviceVendorController.AddHardwareModulesToDeviceVendor)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveHardwareModulesFromDeviceVendor/{parentId}/hardwareModulesIds", jsonResponseFormatter.FormatToJSON(DeviceVendorController.RemoveHardwareModulesFromDeviceVendor)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // HardwareModule Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/HardwareModule/{id}", jsonResponseFormatter.FormatToJSON(HardwareModuleController.GetHardwareModule)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/HardwareModule", jsonResponseFormatter.FormatToJSON(HardwareModuleController.GetAllHardwareModule)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewHardwareModule", jsonResponseFormatter.FormatToJSON(HardwareModuleController.CreateHardwareModule)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/HardwareModule/{id}", jsonResponseFormatter.FormatToJSON(HardwareModuleController.UpdateHardwareModule)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeleteHardwareModule/{id}", jsonResponseFormatter.FormatToJSON(HardwareModuleController.DeleteHardwareModule)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AssignVendorToHardwareModule/{parentId}/vendorId", jsonResponseFormatter.FormatToJSON(HardwareModuleController.AssignVendorToHardwareModule)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignVendorFromHardwareModule/{parentId}", jsonResponseFormatter.FormatToJSON(HardwareModuleController.UnassignVendorFromHardwareModule)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // DeviceModel Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/DeviceModel/{id}", jsonResponseFormatter.FormatToJSON(DeviceModelController.GetDeviceModel)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/DeviceModel", jsonResponseFormatter.FormatToJSON(DeviceModelController.GetAllDeviceModel)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewDeviceModel", jsonResponseFormatter.FormatToJSON(DeviceModelController.CreateDeviceModel)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/DeviceModel/{id}", jsonResponseFormatter.FormatToJSON(DeviceModelController.UpdateDeviceModel)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeleteDeviceModel/{id}", jsonResponseFormatter.FormatToJSON(DeviceModelController.DeleteDeviceModel)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AssignVendorToDeviceModel/{parentId}/vendorId", jsonResponseFormatter.FormatToJSON(DeviceModelController.AssignVendorToDeviceModel)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignVendorFromDeviceModel/{parentId}", jsonResponseFormatter.FormatToJSON(DeviceModelController.UnassignVendorFromDeviceModel)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AssignTwinTemplateToDeviceModel/{parentId}/twinTemplateId", jsonResponseFormatter.FormatToJSON(DeviceModelController.AssignTwinTemplateToDeviceModel)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignTwinTemplateFromDeviceModel/{parentId}", jsonResponseFormatter.FormatToJSON(DeviceModelController.UnassignTwinTemplateFromDeviceModel)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AddHardwareModulesToDeviceModel/{parentId}/hardwareModulesId", jsonResponseFormatter.FormatToJSON(DeviceModelController.AddHardwareModulesToDeviceModel)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveHardwareModulesFromDeviceModel/{parentId}/hardwareModulesIds", jsonResponseFormatter.FormatToJSON(DeviceModelController.RemoveHardwareModulesFromDeviceModel)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AddFirmwareReleasesToDeviceModel/{parentId}/firmwareReleasesId", jsonResponseFormatter.FormatToJSON(DeviceModelController.AddFirmwareReleasesToDeviceModel)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveFirmwareReleasesFromDeviceModel/{parentId}/firmwareReleasesIds", jsonResponseFormatter.FormatToJSON(DeviceModelController.RemoveFirmwareReleasesFromDeviceModel)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AddCommandDefinitionsToDeviceModel/{parentId}/commandDefinitionsId", jsonResponseFormatter.FormatToJSON(DeviceModelController.AddCommandDefinitionsToDeviceModel)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveCommandDefinitionsFromDeviceModel/{parentId}/commandDefinitionsIds", jsonResponseFormatter.FormatToJSON(DeviceModelController.RemoveCommandDefinitionsFromDeviceModel)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // FirmwareRelease Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/FirmwareRelease/{id}", jsonResponseFormatter.FormatToJSON(FirmwareReleaseController.GetFirmwareRelease)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/FirmwareRelease", jsonResponseFormatter.FormatToJSON(FirmwareReleaseController.GetAllFirmwareRelease)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewFirmwareRelease", jsonResponseFormatter.FormatToJSON(FirmwareReleaseController.CreateFirmwareRelease)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/FirmwareRelease/{id}", jsonResponseFormatter.FormatToJSON(FirmwareReleaseController.UpdateFirmwareRelease)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeleteFirmwareRelease/{id}", jsonResponseFormatter.FormatToJSON(FirmwareReleaseController.DeleteFirmwareRelease)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AssignDeviceModelToFirmwareRelease/{parentId}/deviceModelId", jsonResponseFormatter.FormatToJSON(FirmwareReleaseController.AssignDeviceModelToFirmwareRelease)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignDeviceModelFromFirmwareRelease/{parentId}", jsonResponseFormatter.FormatToJSON(FirmwareReleaseController.UnassignDeviceModelFromFirmwareRelease)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // IoTDevice Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/IoTDevice/{id}", jsonResponseFormatter.FormatToJSON(IoTDeviceController.GetIoTDevice)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/IoTDevice", jsonResponseFormatter.FormatToJSON(IoTDeviceController.GetAllIoTDevice)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewIoTDevice", jsonResponseFormatter.FormatToJSON(IoTDeviceController.CreateIoTDevice)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/IoTDevice/{id}", jsonResponseFormatter.FormatToJSON(IoTDeviceController.UpdateIoTDevice)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeleteIoTDevice/{id}", jsonResponseFormatter.FormatToJSON(IoTDeviceController.DeleteIoTDevice)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AssignDeviceModelToIoTDevice/{parentId}/deviceModelId", jsonResponseFormatter.FormatToJSON(IoTDeviceController.AssignDeviceModelToIoTDevice)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignDeviceModelFromIoTDevice/{parentId}", jsonResponseFormatter.FormatToJSON(IoTDeviceController.UnassignDeviceModelFromIoTDevice)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AssignTenantToIoTDevice/{parentId}/tenantId", jsonResponseFormatter.FormatToJSON(IoTDeviceController.AssignTenantToIoTDevice)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignTenantFromIoTDevice/{parentId}", jsonResponseFormatter.FormatToJSON(IoTDeviceController.UnassignTenantFromIoTDevice)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AssignSiteToIoTDevice/{parentId}/siteId", jsonResponseFormatter.FormatToJSON(IoTDeviceController.AssignSiteToIoTDevice)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignSiteFromIoTDevice/{parentId}", jsonResponseFormatter.FormatToJSON(IoTDeviceController.UnassignSiteFromIoTDevice)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AssignRoomToIoTDevice/{parentId}/roomId", jsonResponseFormatter.FormatToJSON(IoTDeviceController.AssignRoomToIoTDevice)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignRoomFromIoTDevice/{parentId}", jsonResponseFormatter.FormatToJSON(IoTDeviceController.UnassignRoomFromIoTDevice)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AssignGatewayToIoTDevice/{parentId}/gatewayId", jsonResponseFormatter.FormatToJSON(IoTDeviceController.AssignGatewayToIoTDevice)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignGatewayFromIoTDevice/{parentId}", jsonResponseFormatter.FormatToJSON(IoTDeviceController.UnassignGatewayFromIoTDevice)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AssignDigitalTwinToIoTDevice/{parentId}/digitalTwinId", jsonResponseFormatter.FormatToJSON(IoTDeviceController.AssignDigitalTwinToIoTDevice)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignDigitalTwinFromIoTDevice/{parentId}", jsonResponseFormatter.FormatToJSON(IoTDeviceController.UnassignDigitalTwinFromIoTDevice)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AssignProvisioningRecordToIoTDevice/{parentId}/provisioningRecordId", jsonResponseFormatter.FormatToJSON(IoTDeviceController.AssignProvisioningRecordToIoTDevice)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignProvisioningRecordFromIoTDevice/{parentId}", jsonResponseFormatter.FormatToJSON(IoTDeviceController.UnassignProvisioningRecordFromIoTDevice)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AddSensorsToIoTDevice/{parentId}/sensorsId", jsonResponseFormatter.FormatToJSON(IoTDeviceController.AddSensorsToIoTDevice)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveSensorsFromIoTDevice/{parentId}/sensorsIds", jsonResponseFormatter.FormatToJSON(IoTDeviceController.RemoveSensorsFromIoTDevice)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AddActuatorsToIoTDevice/{parentId}/actuatorsId", jsonResponseFormatter.FormatToJSON(IoTDeviceController.AddActuatorsToIoTDevice)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveActuatorsFromIoTDevice/{parentId}/actuatorsIds", jsonResponseFormatter.FormatToJSON(IoTDeviceController.RemoveActuatorsFromIoTDevice)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AddCertificatesToIoTDevice/{parentId}/certificatesId", jsonResponseFormatter.FormatToJSON(IoTDeviceController.AddCertificatesToIoTDevice)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveCertificatesFromIoTDevice/{parentId}/certificatesIds", jsonResponseFormatter.FormatToJSON(IoTDeviceController.RemoveCertificatesFromIoTDevice)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AddTelemetryStreamsToIoTDevice/{parentId}/telemetryStreamsId", jsonResponseFormatter.FormatToJSON(IoTDeviceController.AddTelemetryStreamsToIoTDevice)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveTelemetryStreamsFromIoTDevice/{parentId}/telemetryStreamsIds", jsonResponseFormatter.FormatToJSON(IoTDeviceController.RemoveTelemetryStreamsFromIoTDevice)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AddCommandInvocationsToIoTDevice/{parentId}/commandInvocationsId", jsonResponseFormatter.FormatToJSON(IoTDeviceController.AddCommandInvocationsToIoTDevice)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveCommandInvocationsFromIoTDevice/{parentId}/commandInvocationsIds", jsonResponseFormatter.FormatToJSON(IoTDeviceController.RemoveCommandInvocationsFromIoTDevice)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AddAlertsToIoTDevice/{parentId}/alertsId", jsonResponseFormatter.FormatToJSON(IoTDeviceController.AddAlertsToIoTDevice)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveAlertsFromIoTDevice/{parentId}/alertsIds", jsonResponseFormatter.FormatToJSON(IoTDeviceController.RemoveAlertsFromIoTDevice)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AddDeviceGroupsToIoTDevice/{parentId}/deviceGroupsId", jsonResponseFormatter.FormatToJSON(IoTDeviceController.AddDeviceGroupsToIoTDevice)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveDeviceGroupsFromIoTDevice/{parentId}/deviceGroupsIds", jsonResponseFormatter.FormatToJSON(IoTDeviceController.RemoveDeviceGroupsFromIoTDevice)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AddNetworkProfilesToIoTDevice/{parentId}/networkProfilesId", jsonResponseFormatter.FormatToJSON(IoTDeviceController.AddNetworkProfilesToIoTDevice)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveNetworkProfilesFromIoTDevice/{parentId}/networkProfilesIds", jsonResponseFormatter.FormatToJSON(IoTDeviceController.RemoveNetworkProfilesFromIoTDevice)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // SensorInstance Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/SensorInstance/{id}", jsonResponseFormatter.FormatToJSON(SensorInstanceController.GetSensorInstance)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/SensorInstance", jsonResponseFormatter.FormatToJSON(SensorInstanceController.GetAllSensorInstance)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewSensorInstance", jsonResponseFormatter.FormatToJSON(SensorInstanceController.CreateSensorInstance)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/SensorInstance/{id}", jsonResponseFormatter.FormatToJSON(SensorInstanceController.UpdateSensorInstance)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeleteSensorInstance/{id}", jsonResponseFormatter.FormatToJSON(SensorInstanceController.DeleteSensorInstance)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AssignDeviceToSensorInstance/{parentId}/deviceId", jsonResponseFormatter.FormatToJSON(SensorInstanceController.AssignDeviceToSensorInstance)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignDeviceFromSensorInstance/{parentId}", jsonResponseFormatter.FormatToJSON(SensorInstanceController.UnassignDeviceFromSensorInstance)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AddTelemetryStreamsToSensorInstance/{parentId}/telemetryStreamsId", jsonResponseFormatter.FormatToJSON(SensorInstanceController.AddTelemetryStreamsToSensorInstance)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveTelemetryStreamsFromSensorInstance/{parentId}/telemetryStreamsIds", jsonResponseFormatter.FormatToJSON(SensorInstanceController.RemoveTelemetryStreamsFromSensorInstance)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // ActuatorInstance Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/ActuatorInstance/{id}", jsonResponseFormatter.FormatToJSON(ActuatorInstanceController.GetActuatorInstance)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/ActuatorInstance", jsonResponseFormatter.FormatToJSON(ActuatorInstanceController.GetAllActuatorInstance)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewActuatorInstance", jsonResponseFormatter.FormatToJSON(ActuatorInstanceController.CreateActuatorInstance)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/ActuatorInstance/{id}", jsonResponseFormatter.FormatToJSON(ActuatorInstanceController.UpdateActuatorInstance)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeleteActuatorInstance/{id}", jsonResponseFormatter.FormatToJSON(ActuatorInstanceController.DeleteActuatorInstance)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AssignDeviceToActuatorInstance/{parentId}/deviceId", jsonResponseFormatter.FormatToJSON(ActuatorInstanceController.AssignDeviceToActuatorInstance)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignDeviceFromActuatorInstance/{parentId}", jsonResponseFormatter.FormatToJSON(ActuatorInstanceController.UnassignDeviceFromActuatorInstance)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AddSupportedCommandsToActuatorInstance/{parentId}/supportedCommandsId", jsonResponseFormatter.FormatToJSON(ActuatorInstanceController.AddSupportedCommandsToActuatorInstance)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveSupportedCommandsFromActuatorInstance/{parentId}/supportedCommandsIds", jsonResponseFormatter.FormatToJSON(ActuatorInstanceController.RemoveSupportedCommandsFromActuatorInstance)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // TelemetrySchema Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/TelemetrySchema/{id}", jsonResponseFormatter.FormatToJSON(TelemetrySchemaController.GetTelemetrySchema)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/TelemetrySchema", jsonResponseFormatter.FormatToJSON(TelemetrySchemaController.GetAllTelemetrySchema)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewTelemetrySchema", jsonResponseFormatter.FormatToJSON(TelemetrySchemaController.CreateTelemetrySchema)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/TelemetrySchema/{id}", jsonResponseFormatter.FormatToJSON(TelemetrySchemaController.UpdateTelemetrySchema)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeleteTelemetrySchema/{id}", jsonResponseFormatter.FormatToJSON(TelemetrySchemaController.DeleteTelemetrySchema)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AddStreamsToTelemetrySchema/{parentId}/streamsId", jsonResponseFormatter.FormatToJSON(TelemetrySchemaController.AddStreamsToTelemetrySchema)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveStreamsFromTelemetrySchema/{parentId}/streamsIds", jsonResponseFormatter.FormatToJSON(TelemetrySchemaController.RemoveStreamsFromTelemetrySchema)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // TelemetryStream Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/TelemetryStream/{id}", jsonResponseFormatter.FormatToJSON(TelemetryStreamController.GetTelemetryStream)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/TelemetryStream", jsonResponseFormatter.FormatToJSON(TelemetryStreamController.GetAllTelemetryStream)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewTelemetryStream", jsonResponseFormatter.FormatToJSON(TelemetryStreamController.CreateTelemetryStream)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/TelemetryStream/{id}", jsonResponseFormatter.FormatToJSON(TelemetryStreamController.UpdateTelemetryStream)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeleteTelemetryStream/{id}", jsonResponseFormatter.FormatToJSON(TelemetryStreamController.DeleteTelemetryStream)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AssignDeviceToTelemetryStream/{parentId}/deviceId", jsonResponseFormatter.FormatToJSON(TelemetryStreamController.AssignDeviceToTelemetryStream)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignDeviceFromTelemetryStream/{parentId}", jsonResponseFormatter.FormatToJSON(TelemetryStreamController.UnassignDeviceFromTelemetryStream)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AssignSensorToTelemetryStream/{parentId}/sensorId", jsonResponseFormatter.FormatToJSON(TelemetryStreamController.AssignSensorToTelemetryStream)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignSensorFromTelemetryStream/{parentId}", jsonResponseFormatter.FormatToJSON(TelemetryStreamController.UnassignSensorFromTelemetryStream)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AssignSchemaToTelemetryStream/{parentId}/schemaId", jsonResponseFormatter.FormatToJSON(TelemetryStreamController.AssignSchemaToTelemetryStream)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignSchemaFromTelemetryStream/{parentId}", jsonResponseFormatter.FormatToJSON(TelemetryStreamController.UnassignSchemaFromTelemetryStream)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AssignMessagingEndpointToTelemetryStream/{parentId}/messagingEndpointId", jsonResponseFormatter.FormatToJSON(TelemetryStreamController.AssignMessagingEndpointToTelemetryStream)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignMessagingEndpointFromTelemetryStream/{parentId}", jsonResponseFormatter.FormatToJSON(TelemetryStreamController.UnassignMessagingEndpointFromTelemetryStream)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AssignRetentionPolicyToTelemetryStream/{parentId}/retentionPolicyId", jsonResponseFormatter.FormatToJSON(TelemetryStreamController.AssignRetentionPolicyToTelemetryStream)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignRetentionPolicyFromTelemetryStream/{parentId}", jsonResponseFormatter.FormatToJSON(TelemetryStreamController.UnassignRetentionPolicyFromTelemetryStream)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // CommandDefinition Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/CommandDefinition/{id}", jsonResponseFormatter.FormatToJSON(CommandDefinitionController.GetCommandDefinition)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/CommandDefinition", jsonResponseFormatter.FormatToJSON(CommandDefinitionController.GetAllCommandDefinition)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewCommandDefinition", jsonResponseFormatter.FormatToJSON(CommandDefinitionController.CreateCommandDefinition)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/CommandDefinition/{id}", jsonResponseFormatter.FormatToJSON(CommandDefinitionController.UpdateCommandDefinition)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeleteCommandDefinition/{id}", jsonResponseFormatter.FormatToJSON(CommandDefinitionController.DeleteCommandDefinition)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AssignDeviceModelToCommandDefinition/{parentId}/deviceModelId", jsonResponseFormatter.FormatToJSON(CommandDefinitionController.AssignDeviceModelToCommandDefinition)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignDeviceModelFromCommandDefinition/{parentId}", jsonResponseFormatter.FormatToJSON(CommandDefinitionController.UnassignDeviceModelFromCommandDefinition)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AddActuatorsToCommandDefinition/{parentId}/actuatorsId", jsonResponseFormatter.FormatToJSON(CommandDefinitionController.AddActuatorsToCommandDefinition)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveActuatorsFromCommandDefinition/{parentId}/actuatorsIds", jsonResponseFormatter.FormatToJSON(CommandDefinitionController.RemoveActuatorsFromCommandDefinition)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AddCommandInvocationsToCommandDefinition/{parentId}/commandInvocationsId", jsonResponseFormatter.FormatToJSON(CommandDefinitionController.AddCommandInvocationsToCommandDefinition)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveCommandInvocationsFromCommandDefinition/{parentId}/commandInvocationsIds", jsonResponseFormatter.FormatToJSON(CommandDefinitionController.RemoveCommandInvocationsFromCommandDefinition)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // CommandInvocation Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/CommandInvocation/{id}", jsonResponseFormatter.FormatToJSON(CommandInvocationController.GetCommandInvocation)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/CommandInvocation", jsonResponseFormatter.FormatToJSON(CommandInvocationController.GetAllCommandInvocation)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewCommandInvocation", jsonResponseFormatter.FormatToJSON(CommandInvocationController.CreateCommandInvocation)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/CommandInvocation/{id}", jsonResponseFormatter.FormatToJSON(CommandInvocationController.UpdateCommandInvocation)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeleteCommandInvocation/{id}", jsonResponseFormatter.FormatToJSON(CommandInvocationController.DeleteCommandInvocation)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AssignDeviceToCommandInvocation/{parentId}/deviceId", jsonResponseFormatter.FormatToJSON(CommandInvocationController.AssignDeviceToCommandInvocation)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignDeviceFromCommandInvocation/{parentId}", jsonResponseFormatter.FormatToJSON(CommandInvocationController.UnassignDeviceFromCommandInvocation)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AssignCommandDefinitionToCommandInvocation/{parentId}/commandDefinitionId", jsonResponseFormatter.FormatToJSON(CommandInvocationController.AssignCommandDefinitionToCommandInvocation)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignCommandDefinitionFromCommandInvocation/{parentId}", jsonResponseFormatter.FormatToJSON(CommandInvocationController.UnassignCommandDefinitionFromCommandInvocation)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AssignActuatorToCommandInvocation/{parentId}/actuatorId", jsonResponseFormatter.FormatToJSON(CommandInvocationController.AssignActuatorToCommandInvocation)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignActuatorFromCommandInvocation/{parentId}", jsonResponseFormatter.FormatToJSON(CommandInvocationController.UnassignActuatorFromCommandInvocation)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AssignUserToCommandInvocation/{parentId}/userId", jsonResponseFormatter.FormatToJSON(CommandInvocationController.AssignUserToCommandInvocation)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignUserFromCommandInvocation/{parentId}", jsonResponseFormatter.FormatToJSON(CommandInvocationController.UnassignUserFromCommandInvocation)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // AlertRule Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AlertRule/{id}", jsonResponseFormatter.FormatToJSON(AlertRuleController.GetAlertRule)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/AlertRule", jsonResponseFormatter.FormatToJSON(AlertRuleController.GetAllAlertRule)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewAlertRule", jsonResponseFormatter.FormatToJSON(AlertRuleController.CreateAlertRule)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/AlertRule/{id}", jsonResponseFormatter.FormatToJSON(AlertRuleController.UpdateAlertRule)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeleteAlertRule/{id}", jsonResponseFormatter.FormatToJSON(AlertRuleController.DeleteAlertRule)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AssignTenantToAlertRule/{parentId}/tenantId", jsonResponseFormatter.FormatToJSON(AlertRuleController.AssignTenantToAlertRule)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignTenantFromAlertRule/{parentId}", jsonResponseFormatter.FormatToJSON(AlertRuleController.UnassignTenantFromAlertRule)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AddStreamsToAlertRule/{parentId}/streamsId", jsonResponseFormatter.FormatToJSON(AlertRuleController.AddStreamsToAlertRule)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveStreamsFromAlertRule/{parentId}/streamsIds", jsonResponseFormatter.FormatToJSON(AlertRuleController.RemoveStreamsFromAlertRule)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AddAlertsToAlertRule/{parentId}/alertsId", jsonResponseFormatter.FormatToJSON(AlertRuleController.AddAlertsToAlertRule)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveAlertsFromAlertRule/{parentId}/alertsIds", jsonResponseFormatter.FormatToJSON(AlertRuleController.RemoveAlertsFromAlertRule)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Alert Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/Alert/{id}", jsonResponseFormatter.FormatToJSON(AlertController.GetAlert)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/Alert", jsonResponseFormatter.FormatToJSON(AlertController.GetAllAlert)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewAlert", jsonResponseFormatter.FormatToJSON(AlertController.CreateAlert)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/Alert/{id}", jsonResponseFormatter.FormatToJSON(AlertController.UpdateAlert)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeleteAlert/{id}", jsonResponseFormatter.FormatToJSON(AlertController.DeleteAlert)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AssignDeviceToAlert/{parentId}/deviceId", jsonResponseFormatter.FormatToJSON(AlertController.AssignDeviceToAlert)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignDeviceFromAlert/{parentId}", jsonResponseFormatter.FormatToJSON(AlertController.UnassignDeviceFromAlert)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AssignAlertRuleToAlert/{parentId}/alertRuleId", jsonResponseFormatter.FormatToJSON(AlertController.AssignAlertRuleToAlert)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignAlertRuleFromAlert/{parentId}", jsonResponseFormatter.FormatToJSON(AlertController.UnassignAlertRuleFromAlert)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Tenant Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/Tenant/{id}", jsonResponseFormatter.FormatToJSON(TenantController.GetTenant)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/Tenant", jsonResponseFormatter.FormatToJSON(TenantController.GetAllTenant)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewTenant", jsonResponseFormatter.FormatToJSON(TenantController.CreateTenant)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/Tenant/{id}", jsonResponseFormatter.FormatToJSON(TenantController.UpdateTenant)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeleteTenant/{id}", jsonResponseFormatter.FormatToJSON(TenantController.DeleteTenant)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AddSitesToTenant/{parentId}/sitesId", jsonResponseFormatter.FormatToJSON(TenantController.AddSitesToTenant)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveSitesFromTenant/{parentId}/sitesIds", jsonResponseFormatter.FormatToJSON(TenantController.RemoveSitesFromTenant)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AddUsersToTenant/{parentId}/usersId", jsonResponseFormatter.FormatToJSON(TenantController.AddUsersToTenant)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveUsersFromTenant/{parentId}/usersIds", jsonResponseFormatter.FormatToJSON(TenantController.RemoveUsersFromTenant)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AddDevicesToTenant/{parentId}/devicesId", jsonResponseFormatter.FormatToJSON(TenantController.AddDevicesToTenant)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveDevicesFromTenant/{parentId}/devicesIds", jsonResponseFormatter.FormatToJSON(TenantController.RemoveDevicesFromTenant)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AddDataRetentionPoliciesToTenant/{parentId}/dataRetentionPoliciesId", jsonResponseFormatter.FormatToJSON(TenantController.AddDataRetentionPoliciesToTenant)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveDataRetentionPoliciesFromTenant/{parentId}/dataRetentionPoliciesIds", jsonResponseFormatter.FormatToJSON(TenantController.RemoveDataRetentionPoliciesFromTenant)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AddConnectivityPlansToTenant/{parentId}/connectivityPlansId", jsonResponseFormatter.FormatToJSON(TenantController.AddConnectivityPlansToTenant)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveConnectivityPlansFromTenant/{parentId}/connectivityPlansIds", jsonResponseFormatter.FormatToJSON(TenantController.RemoveConnectivityPlansFromTenant)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AddSimCardsToTenant/{parentId}/simCardsId", jsonResponseFormatter.FormatToJSON(TenantController.AddSimCardsToTenant)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveSimCardsFromTenant/{parentId}/simCardsIds", jsonResponseFormatter.FormatToJSON(TenantController.RemoveSimCardsFromTenant)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AddMessagingEndpointsToTenant/{parentId}/messagingEndpointsId", jsonResponseFormatter.FormatToJSON(TenantController.AddMessagingEndpointsToTenant)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveMessagingEndpointsFromTenant/{parentId}/messagingEndpointsIds", jsonResponseFormatter.FormatToJSON(TenantController.RemoveMessagingEndpointsFromTenant)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AddAccessPoliciesToTenant/{parentId}/accessPoliciesId", jsonResponseFormatter.FormatToJSON(TenantController.AddAccessPoliciesToTenant)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveAccessPoliciesFromTenant/{parentId}/accessPoliciesIds", jsonResponseFormatter.FormatToJSON(TenantController.RemoveAccessPoliciesFromTenant)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AddDeviceGroupsToTenant/{parentId}/deviceGroupsId", jsonResponseFormatter.FormatToJSON(TenantController.AddDeviceGroupsToTenant)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveDeviceGroupsFromTenant/{parentId}/deviceGroupsIds", jsonResponseFormatter.FormatToJSON(TenantController.RemoveDeviceGroupsFromTenant)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AddAlertRulesToTenant/{parentId}/alertRulesId", jsonResponseFormatter.FormatToJSON(TenantController.AddAlertRulesToTenant)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveAlertRulesFromTenant/{parentId}/alertRulesIds", jsonResponseFormatter.FormatToJSON(TenantController.RemoveAlertRulesFromTenant)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AddMaintenanceTicketsToTenant/{parentId}/maintenanceTicketsId", jsonResponseFormatter.FormatToJSON(TenantController.AddMaintenanceTicketsToTenant)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveMaintenanceTicketsFromTenant/{parentId}/maintenanceTicketsIds", jsonResponseFormatter.FormatToJSON(TenantController.RemoveMaintenanceTicketsFromTenant)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AddUsageRecordsToTenant/{parentId}/usageRecordsId", jsonResponseFormatter.FormatToJSON(TenantController.AddUsageRecordsToTenant)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveUsageRecordsFromTenant/{parentId}/usageRecordsIds", jsonResponseFormatter.FormatToJSON(TenantController.RemoveUsageRecordsFromTenant)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // TenantUser Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/TenantUser/{id}", jsonResponseFormatter.FormatToJSON(TenantUserController.GetTenantUser)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/TenantUser", jsonResponseFormatter.FormatToJSON(TenantUserController.GetAllTenantUser)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewTenantUser", jsonResponseFormatter.FormatToJSON(TenantUserController.CreateTenantUser)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/TenantUser/{id}", jsonResponseFormatter.FormatToJSON(TenantUserController.UpdateTenantUser)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeleteTenantUser/{id}", jsonResponseFormatter.FormatToJSON(TenantUserController.DeleteTenantUser)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AssignTenantToTenantUser/{parentId}/tenantId", jsonResponseFormatter.FormatToJSON(TenantUserController.AssignTenantToTenantUser)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignTenantFromTenantUser/{parentId}", jsonResponseFormatter.FormatToJSON(TenantUserController.UnassignTenantFromTenantUser)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AddCommandInvocationsToTenantUser/{parentId}/commandInvocationsId", jsonResponseFormatter.FormatToJSON(TenantUserController.AddCommandInvocationsToTenantUser)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveCommandInvocationsFromTenantUser/{parentId}/commandInvocationsIds", jsonResponseFormatter.FormatToJSON(TenantUserController.RemoveCommandInvocationsFromTenantUser)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Site Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/Site/{id}", jsonResponseFormatter.FormatToJSON(SiteController.GetSite)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/Site", jsonResponseFormatter.FormatToJSON(SiteController.GetAllSite)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewSite", jsonResponseFormatter.FormatToJSON(SiteController.CreateSite)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/Site/{id}", jsonResponseFormatter.FormatToJSON(SiteController.UpdateSite)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeleteSite/{id}", jsonResponseFormatter.FormatToJSON(SiteController.DeleteSite)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AssignTenantToSite/{parentId}/tenantId", jsonResponseFormatter.FormatToJSON(SiteController.AssignTenantToSite)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignTenantFromSite/{parentId}", jsonResponseFormatter.FormatToJSON(SiteController.UnassignTenantFromSite)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AddBuildingsToSite/{parentId}/buildingsId", jsonResponseFormatter.FormatToJSON(SiteController.AddBuildingsToSite)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveBuildingsFromSite/{parentId}/buildingsIds", jsonResponseFormatter.FormatToJSON(SiteController.RemoveBuildingsFromSite)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AddDevicesToSite/{parentId}/devicesId", jsonResponseFormatter.FormatToJSON(SiteController.AddDevicesToSite)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveDevicesFromSite/{parentId}/devicesIds", jsonResponseFormatter.FormatToJSON(SiteController.RemoveDevicesFromSite)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AddGatewaysToSite/{parentId}/gatewaysId", jsonResponseFormatter.FormatToJSON(SiteController.AddGatewaysToSite)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveGatewaysFromSite/{parentId}/gatewaysIds", jsonResponseFormatter.FormatToJSON(SiteController.RemoveGatewaysFromSite)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Building Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/Building/{id}", jsonResponseFormatter.FormatToJSON(BuildingController.GetBuilding)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/Building", jsonResponseFormatter.FormatToJSON(BuildingController.GetAllBuilding)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewBuilding", jsonResponseFormatter.FormatToJSON(BuildingController.CreateBuilding)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/Building/{id}", jsonResponseFormatter.FormatToJSON(BuildingController.UpdateBuilding)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeleteBuilding/{id}", jsonResponseFormatter.FormatToJSON(BuildingController.DeleteBuilding)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AssignSiteToBuilding/{parentId}/siteId", jsonResponseFormatter.FormatToJSON(BuildingController.AssignSiteToBuilding)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignSiteFromBuilding/{parentId}", jsonResponseFormatter.FormatToJSON(BuildingController.UnassignSiteFromBuilding)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AddFloorsToBuilding/{parentId}/floorsId", jsonResponseFormatter.FormatToJSON(BuildingController.AddFloorsToBuilding)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveFloorsFromBuilding/{parentId}/floorsIds", jsonResponseFormatter.FormatToJSON(BuildingController.RemoveFloorsFromBuilding)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Floor Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/Floor/{id}", jsonResponseFormatter.FormatToJSON(FloorController.GetFloor)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/Floor", jsonResponseFormatter.FormatToJSON(FloorController.GetAllFloor)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewFloor", jsonResponseFormatter.FormatToJSON(FloorController.CreateFloor)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/Floor/{id}", jsonResponseFormatter.FormatToJSON(FloorController.UpdateFloor)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeleteFloor/{id}", jsonResponseFormatter.FormatToJSON(FloorController.DeleteFloor)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AssignBuildingToFloor/{parentId}/buildingId", jsonResponseFormatter.FormatToJSON(FloorController.AssignBuildingToFloor)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignBuildingFromFloor/{parentId}", jsonResponseFormatter.FormatToJSON(FloorController.UnassignBuildingFromFloor)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AddRoomsToFloor/{parentId}/roomsId", jsonResponseFormatter.FormatToJSON(FloorController.AddRoomsToFloor)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveRoomsFromFloor/{parentId}/roomsIds", jsonResponseFormatter.FormatToJSON(FloorController.RemoveRoomsFromFloor)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Room Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/Room/{id}", jsonResponseFormatter.FormatToJSON(RoomController.GetRoom)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/Room", jsonResponseFormatter.FormatToJSON(RoomController.GetAllRoom)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewRoom", jsonResponseFormatter.FormatToJSON(RoomController.CreateRoom)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/Room/{id}", jsonResponseFormatter.FormatToJSON(RoomController.UpdateRoom)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeleteRoom/{id}", jsonResponseFormatter.FormatToJSON(RoomController.DeleteRoom)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AssignFloorToRoom/{parentId}/floorId", jsonResponseFormatter.FormatToJSON(RoomController.AssignFloorToRoom)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignFloorFromRoom/{parentId}", jsonResponseFormatter.FormatToJSON(RoomController.UnassignFloorFromRoom)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AddDevicesToRoom/{parentId}/devicesId", jsonResponseFormatter.FormatToJSON(RoomController.AddDevicesToRoom)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveDevicesFromRoom/{parentId}/devicesIds", jsonResponseFormatter.FormatToJSON(RoomController.RemoveDevicesFromRoom)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AddGatewaysToRoom/{parentId}/gatewaysId", jsonResponseFormatter.FormatToJSON(RoomController.AddGatewaysToRoom)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveGatewaysFromRoom/{parentId}/gatewaysIds", jsonResponseFormatter.FormatToJSON(RoomController.RemoveGatewaysFromRoom)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Gateway Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/Gateway/{id}", jsonResponseFormatter.FormatToJSON(GatewayController.GetGateway)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/Gateway", jsonResponseFormatter.FormatToJSON(GatewayController.GetAllGateway)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewGateway", jsonResponseFormatter.FormatToJSON(GatewayController.CreateGateway)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/Gateway/{id}", jsonResponseFormatter.FormatToJSON(GatewayController.UpdateGateway)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeleteGateway/{id}", jsonResponseFormatter.FormatToJSON(GatewayController.DeleteGateway)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AssignSiteToGateway/{parentId}/siteId", jsonResponseFormatter.FormatToJSON(GatewayController.AssignSiteToGateway)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignSiteFromGateway/{parentId}", jsonResponseFormatter.FormatToJSON(GatewayController.UnassignSiteFromGateway)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AssignRoomToGateway/{parentId}/roomId", jsonResponseFormatter.FormatToJSON(GatewayController.AssignRoomToGateway)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignRoomFromGateway/{parentId}", jsonResponseFormatter.FormatToJSON(GatewayController.UnassignRoomFromGateway)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AssignDigitalTwinToGateway/{parentId}/digitalTwinId", jsonResponseFormatter.FormatToJSON(GatewayController.AssignDigitalTwinToGateway)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignDigitalTwinFromGateway/{parentId}", jsonResponseFormatter.FormatToJSON(GatewayController.UnassignDigitalTwinFromGateway)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AddDevicesToGateway/{parentId}/devicesId", jsonResponseFormatter.FormatToJSON(GatewayController.AddDevicesToGateway)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveDevicesFromGateway/{parentId}/devicesIds", jsonResponseFormatter.FormatToJSON(GatewayController.RemoveDevicesFromGateway)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AddEdgeApplicationsToGateway/{parentId}/edgeApplicationsId", jsonResponseFormatter.FormatToJSON(GatewayController.AddEdgeApplicationsToGateway)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveEdgeApplicationsFromGateway/{parentId}/edgeApplicationsIds", jsonResponseFormatter.FormatToJSON(GatewayController.RemoveEdgeApplicationsFromGateway)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AddCertificatesToGateway/{parentId}/certificatesId", jsonResponseFormatter.FormatToJSON(GatewayController.AddCertificatesToGateway)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveCertificatesFromGateway/{parentId}/certificatesIds", jsonResponseFormatter.FormatToJSON(GatewayController.RemoveCertificatesFromGateway)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AddNetworkProfilesToGateway/{parentId}/networkProfilesId", jsonResponseFormatter.FormatToJSON(GatewayController.AddNetworkProfilesToGateway)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveNetworkProfilesFromGateway/{parentId}/networkProfilesIds", jsonResponseFormatter.FormatToJSON(GatewayController.RemoveNetworkProfilesFromGateway)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // EdgeApplication Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/EdgeApplication/{id}", jsonResponseFormatter.FormatToJSON(EdgeApplicationController.GetEdgeApplication)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/EdgeApplication", jsonResponseFormatter.FormatToJSON(EdgeApplicationController.GetAllEdgeApplication)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewEdgeApplication", jsonResponseFormatter.FormatToJSON(EdgeApplicationController.CreateEdgeApplication)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/EdgeApplication/{id}", jsonResponseFormatter.FormatToJSON(EdgeApplicationController.UpdateEdgeApplication)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeleteEdgeApplication/{id}", jsonResponseFormatter.FormatToJSON(EdgeApplicationController.DeleteEdgeApplication)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AssignGatewayToEdgeApplication/{parentId}/gatewayId", jsonResponseFormatter.FormatToJSON(EdgeApplicationController.AssignGatewayToEdgeApplication)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignGatewayFromEdgeApplication/{parentId}", jsonResponseFormatter.FormatToJSON(EdgeApplicationController.UnassignGatewayFromEdgeApplication)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // NetworkProfile Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/NetworkProfile/{id}", jsonResponseFormatter.FormatToJSON(NetworkProfileController.GetNetworkProfile)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NetworkProfile", jsonResponseFormatter.FormatToJSON(NetworkProfileController.GetAllNetworkProfile)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewNetworkProfile", jsonResponseFormatter.FormatToJSON(NetworkProfileController.CreateNetworkProfile)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/NetworkProfile/{id}", jsonResponseFormatter.FormatToJSON(NetworkProfileController.UpdateNetworkProfile)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeleteNetworkProfile/{id}", jsonResponseFormatter.FormatToJSON(NetworkProfileController.DeleteNetworkProfile)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AssignDeviceToNetworkProfile/{parentId}/deviceId", jsonResponseFormatter.FormatToJSON(NetworkProfileController.AssignDeviceToNetworkProfile)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignDeviceFromNetworkProfile/{parentId}", jsonResponseFormatter.FormatToJSON(NetworkProfileController.UnassignDeviceFromNetworkProfile)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AssignGatewayToNetworkProfile/{parentId}/gatewayId", jsonResponseFormatter.FormatToJSON(NetworkProfileController.AssignGatewayToNetworkProfile)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignGatewayFromNetworkProfile/{parentId}", jsonResponseFormatter.FormatToJSON(NetworkProfileController.UnassignGatewayFromNetworkProfile)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AssignSimCardToNetworkProfile/{parentId}/simCardId", jsonResponseFormatter.FormatToJSON(NetworkProfileController.AssignSimCardToNetworkProfile)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignSimCardFromNetworkProfile/{parentId}", jsonResponseFormatter.FormatToJSON(NetworkProfileController.UnassignSimCardFromNetworkProfile)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // SimCard Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/SimCard/{id}", jsonResponseFormatter.FormatToJSON(SimCardController.GetSimCard)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/SimCard", jsonResponseFormatter.FormatToJSON(SimCardController.GetAllSimCard)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewSimCard", jsonResponseFormatter.FormatToJSON(SimCardController.CreateSimCard)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/SimCard/{id}", jsonResponseFormatter.FormatToJSON(SimCardController.UpdateSimCard)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeleteSimCard/{id}", jsonResponseFormatter.FormatToJSON(SimCardController.DeleteSimCard)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AssignTenantToSimCard/{parentId}/tenantId", jsonResponseFormatter.FormatToJSON(SimCardController.AssignTenantToSimCard)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignTenantFromSimCard/{parentId}", jsonResponseFormatter.FormatToJSON(SimCardController.UnassignTenantFromSimCard)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AssignConnectivityPlanToSimCard/{parentId}/connectivityPlanId", jsonResponseFormatter.FormatToJSON(SimCardController.AssignConnectivityPlanToSimCard)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignConnectivityPlanFromSimCard/{parentId}", jsonResponseFormatter.FormatToJSON(SimCardController.UnassignConnectivityPlanFromSimCard)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AddNetworkProfilesToSimCard/{parentId}/networkProfilesId", jsonResponseFormatter.FormatToJSON(SimCardController.AddNetworkProfilesToSimCard)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveNetworkProfilesFromSimCard/{parentId}/networkProfilesIds", jsonResponseFormatter.FormatToJSON(SimCardController.RemoveNetworkProfilesFromSimCard)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // ConnectivityPlan Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/ConnectivityPlan/{id}", jsonResponseFormatter.FormatToJSON(ConnectivityPlanController.GetConnectivityPlan)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/ConnectivityPlan", jsonResponseFormatter.FormatToJSON(ConnectivityPlanController.GetAllConnectivityPlan)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewConnectivityPlan", jsonResponseFormatter.FormatToJSON(ConnectivityPlanController.CreateConnectivityPlan)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/ConnectivityPlan/{id}", jsonResponseFormatter.FormatToJSON(ConnectivityPlanController.UpdateConnectivityPlan)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeleteConnectivityPlan/{id}", jsonResponseFormatter.FormatToJSON(ConnectivityPlanController.DeleteConnectivityPlan)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AssignTenantToConnectivityPlan/{parentId}/tenantId", jsonResponseFormatter.FormatToJSON(ConnectivityPlanController.AssignTenantToConnectivityPlan)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignTenantFromConnectivityPlan/{parentId}", jsonResponseFormatter.FormatToJSON(ConnectivityPlanController.UnassignTenantFromConnectivityPlan)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AddSimCardsToConnectivityPlan/{parentId}/simCardsId", jsonResponseFormatter.FormatToJSON(ConnectivityPlanController.AddSimCardsToConnectivityPlan)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveSimCardsFromConnectivityPlan/{parentId}/simCardsIds", jsonResponseFormatter.FormatToJSON(ConnectivityPlanController.RemoveSimCardsFromConnectivityPlan)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // MessagingEndpoint Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/MessagingEndpoint/{id}", jsonResponseFormatter.FormatToJSON(MessagingEndpointController.GetMessagingEndpoint)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/MessagingEndpoint", jsonResponseFormatter.FormatToJSON(MessagingEndpointController.GetAllMessagingEndpoint)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewMessagingEndpoint", jsonResponseFormatter.FormatToJSON(MessagingEndpointController.CreateMessagingEndpoint)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/MessagingEndpoint/{id}", jsonResponseFormatter.FormatToJSON(MessagingEndpointController.UpdateMessagingEndpoint)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeleteMessagingEndpoint/{id}", jsonResponseFormatter.FormatToJSON(MessagingEndpointController.DeleteMessagingEndpoint)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AssignTenantToMessagingEndpoint/{parentId}/tenantId", jsonResponseFormatter.FormatToJSON(MessagingEndpointController.AssignTenantToMessagingEndpoint)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignTenantFromMessagingEndpoint/{parentId}", jsonResponseFormatter.FormatToJSON(MessagingEndpointController.UnassignTenantFromMessagingEndpoint)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AddStreamsToMessagingEndpoint/{parentId}/streamsId", jsonResponseFormatter.FormatToJSON(MessagingEndpointController.AddStreamsToMessagingEndpoint)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveStreamsFromMessagingEndpoint/{parentId}/streamsIds", jsonResponseFormatter.FormatToJSON(MessagingEndpointController.RemoveStreamsFromMessagingEndpoint)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // AccessPolicy Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AccessPolicy/{id}", jsonResponseFormatter.FormatToJSON(AccessPolicyController.GetAccessPolicy)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/AccessPolicy", jsonResponseFormatter.FormatToJSON(AccessPolicyController.GetAllAccessPolicy)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewAccessPolicy", jsonResponseFormatter.FormatToJSON(AccessPolicyController.CreateAccessPolicy)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/AccessPolicy/{id}", jsonResponseFormatter.FormatToJSON(AccessPolicyController.UpdateAccessPolicy)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeleteAccessPolicy/{id}", jsonResponseFormatter.FormatToJSON(AccessPolicyController.DeleteAccessPolicy)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AssignTenantToAccessPolicy/{parentId}/tenantId", jsonResponseFormatter.FormatToJSON(AccessPolicyController.AssignTenantToAccessPolicy)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignTenantFromAccessPolicy/{parentId}", jsonResponseFormatter.FormatToJSON(AccessPolicyController.UnassignTenantFromAccessPolicy)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AddApiKeysToAccessPolicy/{parentId}/apiKeysId", jsonResponseFormatter.FormatToJSON(AccessPolicyController.AddApiKeysToAccessPolicy)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveApiKeysFromAccessPolicy/{parentId}/apiKeysIds", jsonResponseFormatter.FormatToJSON(AccessPolicyController.RemoveApiKeysFromAccessPolicy)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AddUsersToAccessPolicy/{parentId}/usersId", jsonResponseFormatter.FormatToJSON(AccessPolicyController.AddUsersToAccessPolicy)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveUsersFromAccessPolicy/{parentId}/usersIds", jsonResponseFormatter.FormatToJSON(AccessPolicyController.RemoveUsersFromAccessPolicy)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // ApiKey Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/ApiKey/{id}", jsonResponseFormatter.FormatToJSON(ApiKeyController.GetApiKey)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/ApiKey", jsonResponseFormatter.FormatToJSON(ApiKeyController.GetAllApiKey)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewApiKey", jsonResponseFormatter.FormatToJSON(ApiKeyController.CreateApiKey)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/ApiKey/{id}", jsonResponseFormatter.FormatToJSON(ApiKeyController.UpdateApiKey)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeleteApiKey/{id}", jsonResponseFormatter.FormatToJSON(ApiKeyController.DeleteApiKey)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AssignAccessPolicyToApiKey/{parentId}/accessPolicyId", jsonResponseFormatter.FormatToJSON(ApiKeyController.AssignAccessPolicyToApiKey)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignAccessPolicyFromApiKey/{parentId}", jsonResponseFormatter.FormatToJSON(ApiKeyController.UnassignAccessPolicyFromApiKey)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // DeviceCertificate Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/DeviceCertificate/{id}", jsonResponseFormatter.FormatToJSON(DeviceCertificateController.GetDeviceCertificate)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/DeviceCertificate", jsonResponseFormatter.FormatToJSON(DeviceCertificateController.GetAllDeviceCertificate)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewDeviceCertificate", jsonResponseFormatter.FormatToJSON(DeviceCertificateController.CreateDeviceCertificate)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/DeviceCertificate/{id}", jsonResponseFormatter.FormatToJSON(DeviceCertificateController.UpdateDeviceCertificate)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeleteDeviceCertificate/{id}", jsonResponseFormatter.FormatToJSON(DeviceCertificateController.DeleteDeviceCertificate)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AssignDeviceToDeviceCertificate/{parentId}/deviceId", jsonResponseFormatter.FormatToJSON(DeviceCertificateController.AssignDeviceToDeviceCertificate)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignDeviceFromDeviceCertificate/{parentId}", jsonResponseFormatter.FormatToJSON(DeviceCertificateController.UnassignDeviceFromDeviceCertificate)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AssignGatewayToDeviceCertificate/{parentId}/gatewayId", jsonResponseFormatter.FormatToJSON(DeviceCertificateController.AssignGatewayToDeviceCertificate)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignGatewayFromDeviceCertificate/{parentId}", jsonResponseFormatter.FormatToJSON(DeviceCertificateController.UnassignGatewayFromDeviceCertificate)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // ProvisioningRecord Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/ProvisioningRecord/{id}", jsonResponseFormatter.FormatToJSON(ProvisioningRecordController.GetProvisioningRecord)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/ProvisioningRecord", jsonResponseFormatter.FormatToJSON(ProvisioningRecordController.GetAllProvisioningRecord)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewProvisioningRecord", jsonResponseFormatter.FormatToJSON(ProvisioningRecordController.CreateProvisioningRecord)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/ProvisioningRecord/{id}", jsonResponseFormatter.FormatToJSON(ProvisioningRecordController.UpdateProvisioningRecord)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeleteProvisioningRecord/{id}", jsonResponseFormatter.FormatToJSON(ProvisioningRecordController.DeleteProvisioningRecord)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AssignDeviceToProvisioningRecord/{parentId}/deviceId", jsonResponseFormatter.FormatToJSON(ProvisioningRecordController.AssignDeviceToProvisioningRecord)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignDeviceFromProvisioningRecord/{parentId}", jsonResponseFormatter.FormatToJSON(ProvisioningRecordController.UnassignDeviceFromProvisioningRecord)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AssignCertificateToProvisioningRecord/{parentId}/certificateId", jsonResponseFormatter.FormatToJSON(ProvisioningRecordController.AssignCertificateToProvisioningRecord)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignCertificateFromProvisioningRecord/{parentId}", jsonResponseFormatter.FormatToJSON(ProvisioningRecordController.UnassignCertificateFromProvisioningRecord)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AssignTenantToProvisioningRecord/{parentId}/tenantId", jsonResponseFormatter.FormatToJSON(ProvisioningRecordController.AssignTenantToProvisioningRecord)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignTenantFromProvisioningRecord/{parentId}", jsonResponseFormatter.FormatToJSON(ProvisioningRecordController.UnassignTenantFromProvisioningRecord)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // DigitalTwin Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/DigitalTwin/{id}", jsonResponseFormatter.FormatToJSON(DigitalTwinController.GetDigitalTwin)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/DigitalTwin", jsonResponseFormatter.FormatToJSON(DigitalTwinController.GetAllDigitalTwin)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewDigitalTwin", jsonResponseFormatter.FormatToJSON(DigitalTwinController.CreateDigitalTwin)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/DigitalTwin/{id}", jsonResponseFormatter.FormatToJSON(DigitalTwinController.UpdateDigitalTwin)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeleteDigitalTwin/{id}", jsonResponseFormatter.FormatToJSON(DigitalTwinController.DeleteDigitalTwin)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AssignDeviceToDigitalTwin/{parentId}/deviceId", jsonResponseFormatter.FormatToJSON(DigitalTwinController.AssignDeviceToDigitalTwin)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignDeviceFromDigitalTwin/{parentId}", jsonResponseFormatter.FormatToJSON(DigitalTwinController.UnassignDeviceFromDigitalTwin)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AssignGatewayToDigitalTwin/{parentId}/gatewayId", jsonResponseFormatter.FormatToJSON(DigitalTwinController.AssignGatewayToDigitalTwin)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignGatewayFromDigitalTwin/{parentId}", jsonResponseFormatter.FormatToJSON(DigitalTwinController.UnassignGatewayFromDigitalTwin)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AssignTemplateToDigitalTwin/{parentId}/templateId", jsonResponseFormatter.FormatToJSON(DigitalTwinController.AssignTemplateToDigitalTwin)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignTemplateFromDigitalTwin/{parentId}", jsonResponseFormatter.FormatToJSON(DigitalTwinController.UnassignTemplateFromDigitalTwin)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AddChangeEventsToDigitalTwin/{parentId}/changeEventsId", jsonResponseFormatter.FormatToJSON(DigitalTwinController.AddChangeEventsToDigitalTwin)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveChangeEventsFromDigitalTwin/{parentId}/changeEventsIds", jsonResponseFormatter.FormatToJSON(DigitalTwinController.RemoveChangeEventsFromDigitalTwin)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // TwinTemplate Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/TwinTemplate/{id}", jsonResponseFormatter.FormatToJSON(TwinTemplateController.GetTwinTemplate)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/TwinTemplate", jsonResponseFormatter.FormatToJSON(TwinTemplateController.GetAllTwinTemplate)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewTwinTemplate", jsonResponseFormatter.FormatToJSON(TwinTemplateController.CreateTwinTemplate)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/TwinTemplate/{id}", jsonResponseFormatter.FormatToJSON(TwinTemplateController.UpdateTwinTemplate)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeleteTwinTemplate/{id}", jsonResponseFormatter.FormatToJSON(TwinTemplateController.DeleteTwinTemplate)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AddDeviceModelsToTwinTemplate/{parentId}/deviceModelsId", jsonResponseFormatter.FormatToJSON(TwinTemplateController.AddDeviceModelsToTwinTemplate)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveDeviceModelsFromTwinTemplate/{parentId}/deviceModelsIds", jsonResponseFormatter.FormatToJSON(TwinTemplateController.RemoveDeviceModelsFromTwinTemplate)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // TwinChangeEvent Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/TwinChangeEvent/{id}", jsonResponseFormatter.FormatToJSON(TwinChangeEventController.GetTwinChangeEvent)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/TwinChangeEvent", jsonResponseFormatter.FormatToJSON(TwinChangeEventController.GetAllTwinChangeEvent)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewTwinChangeEvent", jsonResponseFormatter.FormatToJSON(TwinChangeEventController.CreateTwinChangeEvent)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/TwinChangeEvent/{id}", jsonResponseFormatter.FormatToJSON(TwinChangeEventController.UpdateTwinChangeEvent)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeleteTwinChangeEvent/{id}", jsonResponseFormatter.FormatToJSON(TwinChangeEventController.DeleteTwinChangeEvent)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AssignTwinToTwinChangeEvent/{parentId}/twinId", jsonResponseFormatter.FormatToJSON(TwinChangeEventController.AssignTwinToTwinChangeEvent)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignTwinFromTwinChangeEvent/{parentId}", jsonResponseFormatter.FormatToJSON(TwinChangeEventController.UnassignTwinFromTwinChangeEvent)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // MaintenanceTicket Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/MaintenanceTicket/{id}", jsonResponseFormatter.FormatToJSON(MaintenanceTicketController.GetMaintenanceTicket)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/MaintenanceTicket", jsonResponseFormatter.FormatToJSON(MaintenanceTicketController.GetAllMaintenanceTicket)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewMaintenanceTicket", jsonResponseFormatter.FormatToJSON(MaintenanceTicketController.CreateMaintenanceTicket)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/MaintenanceTicket/{id}", jsonResponseFormatter.FormatToJSON(MaintenanceTicketController.UpdateMaintenanceTicket)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeleteMaintenanceTicket/{id}", jsonResponseFormatter.FormatToJSON(MaintenanceTicketController.DeleteMaintenanceTicket)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AssignDeviceToMaintenanceTicket/{parentId}/deviceId", jsonResponseFormatter.FormatToJSON(MaintenanceTicketController.AssignDeviceToMaintenanceTicket)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignDeviceFromMaintenanceTicket/{parentId}", jsonResponseFormatter.FormatToJSON(MaintenanceTicketController.UnassignDeviceFromMaintenanceTicket)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AssignTenantToMaintenanceTicket/{parentId}/tenantId", jsonResponseFormatter.FormatToJSON(MaintenanceTicketController.AssignTenantToMaintenanceTicket)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignTenantFromMaintenanceTicket/{parentId}", jsonResponseFormatter.FormatToJSON(MaintenanceTicketController.UnassignTenantFromMaintenanceTicket)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // DataRetentionPolicy Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/DataRetentionPolicy/{id}", jsonResponseFormatter.FormatToJSON(DataRetentionPolicyController.GetDataRetentionPolicy)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/DataRetentionPolicy", jsonResponseFormatter.FormatToJSON(DataRetentionPolicyController.GetAllDataRetentionPolicy)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewDataRetentionPolicy", jsonResponseFormatter.FormatToJSON(DataRetentionPolicyController.CreateDataRetentionPolicy)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/DataRetentionPolicy/{id}", jsonResponseFormatter.FormatToJSON(DataRetentionPolicyController.UpdateDataRetentionPolicy)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeleteDataRetentionPolicy/{id}", jsonResponseFormatter.FormatToJSON(DataRetentionPolicyController.DeleteDataRetentionPolicy)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AssignTenantToDataRetentionPolicy/{parentId}/tenantId", jsonResponseFormatter.FormatToJSON(DataRetentionPolicyController.AssignTenantToDataRetentionPolicy)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignTenantFromDataRetentionPolicy/{parentId}", jsonResponseFormatter.FormatToJSON(DataRetentionPolicyController.UnassignTenantFromDataRetentionPolicy)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AddStreamsToDataRetentionPolicy/{parentId}/streamsId", jsonResponseFormatter.FormatToJSON(DataRetentionPolicyController.AddStreamsToDataRetentionPolicy)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveStreamsFromDataRetentionPolicy/{parentId}/streamsIds", jsonResponseFormatter.FormatToJSON(DataRetentionPolicyController.RemoveStreamsFromDataRetentionPolicy)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // SoftwareUpdateCampaign Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/SoftwareUpdateCampaign/{id}", jsonResponseFormatter.FormatToJSON(SoftwareUpdateCampaignController.GetSoftwareUpdateCampaign)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/SoftwareUpdateCampaign", jsonResponseFormatter.FormatToJSON(SoftwareUpdateCampaignController.GetAllSoftwareUpdateCampaign)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewSoftwareUpdateCampaign", jsonResponseFormatter.FormatToJSON(SoftwareUpdateCampaignController.CreateSoftwareUpdateCampaign)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/SoftwareUpdateCampaign/{id}", jsonResponseFormatter.FormatToJSON(SoftwareUpdateCampaignController.UpdateSoftwareUpdateCampaign)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeleteSoftwareUpdateCampaign/{id}", jsonResponseFormatter.FormatToJSON(SoftwareUpdateCampaignController.DeleteSoftwareUpdateCampaign)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AssignFirmwareReleaseToSoftwareUpdateCampaign/{parentId}/firmwareReleaseId", jsonResponseFormatter.FormatToJSON(SoftwareUpdateCampaignController.AssignFirmwareReleaseToSoftwareUpdateCampaign)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignFirmwareReleaseFromSoftwareUpdateCampaign/{parentId}", jsonResponseFormatter.FormatToJSON(SoftwareUpdateCampaignController.UnassignFirmwareReleaseFromSoftwareUpdateCampaign)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AssignDeviceGroupToSoftwareUpdateCampaign/{parentId}/deviceGroupId", jsonResponseFormatter.FormatToJSON(SoftwareUpdateCampaignController.AssignDeviceGroupToSoftwareUpdateCampaign)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignDeviceGroupFromSoftwareUpdateCampaign/{parentId}", jsonResponseFormatter.FormatToJSON(SoftwareUpdateCampaignController.UnassignDeviceGroupFromSoftwareUpdateCampaign)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AddExecutionsToSoftwareUpdateCampaign/{parentId}/executionsId", jsonResponseFormatter.FormatToJSON(SoftwareUpdateCampaignController.AddExecutionsToSoftwareUpdateCampaign)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveExecutionsFromSoftwareUpdateCampaign/{parentId}/executionsIds", jsonResponseFormatter.FormatToJSON(SoftwareUpdateCampaignController.RemoveExecutionsFromSoftwareUpdateCampaign)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // SoftwareUpdateExecution Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/SoftwareUpdateExecution/{id}", jsonResponseFormatter.FormatToJSON(SoftwareUpdateExecutionController.GetSoftwareUpdateExecution)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/SoftwareUpdateExecution", jsonResponseFormatter.FormatToJSON(SoftwareUpdateExecutionController.GetAllSoftwareUpdateExecution)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewSoftwareUpdateExecution", jsonResponseFormatter.FormatToJSON(SoftwareUpdateExecutionController.CreateSoftwareUpdateExecution)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/SoftwareUpdateExecution/{id}", jsonResponseFormatter.FormatToJSON(SoftwareUpdateExecutionController.UpdateSoftwareUpdateExecution)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeleteSoftwareUpdateExecution/{id}", jsonResponseFormatter.FormatToJSON(SoftwareUpdateExecutionController.DeleteSoftwareUpdateExecution)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AssignCampaignToSoftwareUpdateExecution/{parentId}/campaignId", jsonResponseFormatter.FormatToJSON(SoftwareUpdateExecutionController.AssignCampaignToSoftwareUpdateExecution)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignCampaignFromSoftwareUpdateExecution/{parentId}", jsonResponseFormatter.FormatToJSON(SoftwareUpdateExecutionController.UnassignCampaignFromSoftwareUpdateExecution)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AssignDeviceToSoftwareUpdateExecution/{parentId}/deviceId", jsonResponseFormatter.FormatToJSON(SoftwareUpdateExecutionController.AssignDeviceToSoftwareUpdateExecution)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignDeviceFromSoftwareUpdateExecution/{parentId}", jsonResponseFormatter.FormatToJSON(SoftwareUpdateExecutionController.UnassignDeviceFromSoftwareUpdateExecution)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // DeviceGroup Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/DeviceGroup/{id}", jsonResponseFormatter.FormatToJSON(DeviceGroupController.GetDeviceGroup)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/DeviceGroup", jsonResponseFormatter.FormatToJSON(DeviceGroupController.GetAllDeviceGroup)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewDeviceGroup", jsonResponseFormatter.FormatToJSON(DeviceGroupController.CreateDeviceGroup)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/DeviceGroup/{id}", jsonResponseFormatter.FormatToJSON(DeviceGroupController.UpdateDeviceGroup)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeleteDeviceGroup/{id}", jsonResponseFormatter.FormatToJSON(DeviceGroupController.DeleteDeviceGroup)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AssignTenantToDeviceGroup/{parentId}/tenantId", jsonResponseFormatter.FormatToJSON(DeviceGroupController.AssignTenantToDeviceGroup)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignTenantFromDeviceGroup/{parentId}", jsonResponseFormatter.FormatToJSON(DeviceGroupController.UnassignTenantFromDeviceGroup)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AddDevicesToDeviceGroup/{parentId}/devicesId", jsonResponseFormatter.FormatToJSON(DeviceGroupController.AddDevicesToDeviceGroup)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/RemoveDevicesFromDeviceGroup/{parentId}/devicesIds", jsonResponseFormatter.FormatToJSON(DeviceGroupController.RemoveDevicesFromDeviceGroup)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // UsageRecord Routes to JSON response formatter first
    // then to the correct Controller function
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    // Standard Lifecycle Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/UsageRecord/{id}", jsonResponseFormatter.FormatToJSON(UsageRecordController.GetUsageRecord)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/UsageRecord", jsonResponseFormatter.FormatToJSON(UsageRecordController.GetAllUsageRecord)).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/NewUsageRecord", jsonResponseFormatter.FormatToJSON(UsageRecordController.CreateUsageRecord)).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/UsageRecord/{id}", jsonResponseFormatter.FormatToJSON(UsageRecordController.UpdateUsageRecord)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/DeleteUsageRecord/{id}", jsonResponseFormatter.FormatToJSON(UsageRecordController.DeleteUsageRecord)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Single Association Routers
    //----------------------------------------------------------------------------
    router.HandleFunc("/api/AssignTenantToUsageRecord/{parentId}/tenantId", jsonResponseFormatter.FormatToJSON(UsageRecordController.AssignTenantToUsageRecord)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignTenantFromUsageRecord/{parentId}", jsonResponseFormatter.FormatToJSON(UsageRecordController.UnassignTenantFromUsageRecord)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AssignDeviceToUsageRecord/{parentId}/deviceId", jsonResponseFormatter.FormatToJSON(UsageRecordController.AssignDeviceToUsageRecord)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignDeviceFromUsageRecord/{parentId}", jsonResponseFormatter.FormatToJSON(UsageRecordController.UnassignDeviceFromUsageRecord)).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/AssignConnectivityPlanToUsageRecord/{parentId}/connectivityPlanId", jsonResponseFormatter.FormatToJSON(UsageRecordController.AssignConnectivityPlanToUsageRecord)).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/UnassignConnectivityPlanFromUsageRecord/{parentId}", jsonResponseFormatter.FormatToJSON(UsageRecordController.UnassignConnectivityPlanFromUsageRecord)).Methods("DELETE", "OPTIONS")

    //----------------------------------------------------------------------------
    // Multiple Association Routers
    //----------------------------------------------------------------------------

    return router
}
