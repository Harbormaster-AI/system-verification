from django.contrib import admin

# Register your models here.
from .models.DeviceVendor import DeviceVendor
from .models.HardwareModule import HardwareModule
from .models.DeviceModel import DeviceModel
from .models.FirmwareRelease import FirmwareRelease
from .models.IoTDevice import IoTDevice
from .models.SensorInstance import SensorInstance
from .models.ActuatorInstance import ActuatorInstance
from .models.TelemetrySchema import TelemetrySchema
from .models.TelemetryStream import TelemetryStream
from .models.CommandDefinition import CommandDefinition
from .models.CommandInvocation import CommandInvocation
from .models.AlertRule import AlertRule
from .models.Alert import Alert
from .models.Tenant import Tenant
from .models.TenantUser import TenantUser
from .models.Site import Site
from .models.Building import Building
from .models.Floor import Floor
from .models.Room import Room
from .models.Gateway import Gateway
from .models.EdgeApplication import EdgeApplication
from .models.NetworkProfile import NetworkProfile
from .models.SimCard import SimCard
from .models.ConnectivityPlan import ConnectivityPlan
from .models.MessagingEndpoint import MessagingEndpoint
from .models.AccessPolicy import AccessPolicy
from .models.ApiKey import ApiKey
from .models.DeviceCertificate import DeviceCertificate
from .models.ProvisioningRecord import ProvisioningRecord
from .models.DigitalTwin import DigitalTwin
from .models.TwinTemplate import TwinTemplate
from .models.TwinChangeEvent import TwinChangeEvent
from .models.MaintenanceTicket import MaintenanceTicket
from .models.DataRetentionPolicy import DataRetentionPolicy
from .models.SoftwareUpdateCampaign import SoftwareUpdateCampaign
from .models.SoftwareUpdateExecution import SoftwareUpdateExecution
from .models.DeviceGroup import DeviceGroup
from .models.UsageRecord import UsageRecord

# Need to add this for each model that requires managing

admin.site.register(DeviceVendor)
admin.site.register(HardwareModule)
admin.site.register(DeviceModel)
admin.site.register(FirmwareRelease)
admin.site.register(IoTDevice)
admin.site.register(SensorInstance)
admin.site.register(ActuatorInstance)
admin.site.register(TelemetrySchema)
admin.site.register(TelemetryStream)
admin.site.register(CommandDefinition)
admin.site.register(CommandInvocation)
admin.site.register(AlertRule)
admin.site.register(Alert)
admin.site.register(Tenant)
admin.site.register(TenantUser)
admin.site.register(Site)
admin.site.register(Building)
admin.site.register(Floor)
admin.site.register(Room)
admin.site.register(Gateway)
admin.site.register(EdgeApplication)
admin.site.register(NetworkProfile)
admin.site.register(SimCard)
admin.site.register(ConnectivityPlan)
admin.site.register(MessagingEndpoint)
admin.site.register(AccessPolicy)
admin.site.register(ApiKey)
admin.site.register(DeviceCertificate)
admin.site.register(ProvisioningRecord)
admin.site.register(DigitalTwin)
admin.site.register(TwinTemplate)
admin.site.register(TwinChangeEvent)
admin.site.register(MaintenanceTicket)
admin.site.register(DataRetentionPolicy)
admin.site.register(SoftwareUpdateCampaign)
admin.site.register(SoftwareUpdateExecution)
admin.site.register(DeviceGroup)
admin.site.register(UsageRecord)
