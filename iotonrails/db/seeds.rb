# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


5.times do |i|
  DeviceVendor.create( name:"test string for name", legalName:"test string for legalName", headquartersCountry:"test string for headquartersCountry", website:"test string for website" )
  HardwareModule.create( moduleCode:"test string for moduleCode", datasheetUri:"test value", ModuleType:0 )
  DeviceModel.create( name:"test string for name", modelNumber:"test string for modelNumber", hardwareRevision:"test string for hardwareRevision", SupportedConnectivity:0, DefaultTelemetryEncoding:0 )
  FirmwareRelease.create( version:"test value", releaseDate:1.week.ago, releaseNotes:"test string for releaseNotes", checksum:"test value" )
  IoTDevice.create( deviceId:"test value", serialNumber:"test string for serialNumber", lastSeen:1.week.ago, firmwareVersion:"test value", Status:0, PowerSource:0 )
  SensorInstance.create( name:"test string for name", unit:"test string for unit", samplingIntervalMs:100, SensorType:0 )
  ActuatorInstance.create( name:"test string for name", commandTopic:"test value", ActuatorType:0 )
  TelemetrySchema.create( schemaId:"test string for schemaId", schemaUri:"test value", Encoding:0 )
  TelemetryStream.create( streamName:"test string for streamName", retentionDays:100, Qos:0 )
  CommandDefinition.create( name:"test string for name", requestSchemaUri:"test value", responseSchemaUri:"test value", timeoutSeconds:100 )
  CommandInvocation.create( invocationId:"test string for invocationId", requestedAt:1.week.ago, completedAt:1.week.ago, Status:0 )
  AlertRule.create( name:"test string for name", expression:"test string for expression", Severity:0 )
  Alert.create( raisedAt:1.week.ago, clearedAt:1.week.ago, message:"test string for message", Status:0 )
  Tenant.create( name:"test string for name", TenantType:0 )
  TenantUser.create( firstName:"test string for firstName", lastName:"test string for lastName", email:"test string for email", Role:0 )
  Site.create( name:"test string for name", address:"test value", timezone:"test string for timezone", latitude:"test value", longitude:"test value" )
  Building.create( name:"test string for name" )
  Floor.create( name:"test string for name", level:100 )
  Room.create( name:"test string for name" )
  Gateway.create( softwareVersion:"test string for softwareVersion", Status:0 )
  EdgeApplication.create( name:"test string for name", version:"test string for version", image:"test string for image", Status:0 )
  NetworkProfile.create( profileName:"test string for profileName", ssid:"test string for ssid", apn:"test string for apn", ConnectivityType:0 )
  SimCard.create( iccid:"test string for iccid", imsi:"test string for imsi", carrier:"test string for carrier", Status:0 )
  ConnectivityPlan.create( name:"test string for name", dataCapMB:100, billingCycleDays:100 )
  MessagingEndpoint.create( host:"test string for host", port:100, secure:true, Protocol:0 )
  AccessPolicy.create( name:"test string for name", scope:"test string for scope", expiresAt:1.week.ago )
  ApiKey.create( keyId:"test string for keyId", hashedSecret:"test string for hashedSecret", createdAt:1.week.ago, lastUsedAt:1.week.ago )
  DeviceCertificate.create( serialNumber:"test string for serialNumber", notBefore:1.week.ago, notAfter:1.week.ago, fingerprint:"test string for fingerprint", CertificateType:0 )
  ProvisioningRecord.create( enrolledAt:1.week.ago, provisioningService:"test string for provisioningService", Method:0, Status:0 )
  DigitalTwin.create( twinId:"test string for twinId", desiredStateVersion:100, reportedStateVersion:100, lastSyncAt:1.week.ago )
  TwinTemplate.create( name:"test string for name", schemaUri:"test value", version:"test string for version" )
  TwinChangeEvent.create( eventId:"test string for eventId", occurredAt:1.week.ago, ChangeType:0 )
  MaintenanceTicket.create( ticketNumber:"test string for ticketNumber", openedAt:1.week.ago, closedAt:1.week.ago, Priority:0, Status:0 )
  DataRetentionPolicy.create( name:"test string for name", retentionDays:100 )
  SoftwareUpdateCampaign.create( campaignCode:"test string for campaignCode", scheduledStart:1.week.ago, scheduledEnd:1.week.ago, Status:0 )
  SoftwareUpdateExecution.create( startedAt:1.week.ago, completedAt:1.week.ago, Status:0 )
  DeviceGroup.create( name:"test string for name", criteria:"test string for criteria" )
  UsageRecord.create( periodStart:1.week.ago, periodEnd:1.week.ago, messagesSent:100, dataVolumeMB:100 )
end
