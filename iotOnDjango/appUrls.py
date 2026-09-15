"""mainsite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
urlpatterns = [
    path('DeviceVendor/', include('iotOnDjango.urls.DeviceVendorUrls')),
    path('HardwareModule/', include('iotOnDjango.urls.HardwareModuleUrls')),
    path('DeviceModel/', include('iotOnDjango.urls.DeviceModelUrls')),
    path('FirmwareRelease/', include('iotOnDjango.urls.FirmwareReleaseUrls')),
    path('IoTDevice/', include('iotOnDjango.urls.IoTDeviceUrls')),
    path('SensorInstance/', include('iotOnDjango.urls.SensorInstanceUrls')),
    path('ActuatorInstance/', include('iotOnDjango.urls.ActuatorInstanceUrls')),
    path('TelemetrySchema/', include('iotOnDjango.urls.TelemetrySchemaUrls')),
    path('TelemetryStream/', include('iotOnDjango.urls.TelemetryStreamUrls')),
    path('CommandDefinition/', include('iotOnDjango.urls.CommandDefinitionUrls')),
    path('CommandInvocation/', include('iotOnDjango.urls.CommandInvocationUrls')),
    path('AlertRule/', include('iotOnDjango.urls.AlertRuleUrls')),
    path('Alert/', include('iotOnDjango.urls.AlertUrls')),
    path('Tenant/', include('iotOnDjango.urls.TenantUrls')),
    path('TenantUser/', include('iotOnDjango.urls.TenantUserUrls')),
    path('Site/', include('iotOnDjango.urls.SiteUrls')),
    path('Building/', include('iotOnDjango.urls.BuildingUrls')),
    path('Floor/', include('iotOnDjango.urls.FloorUrls')),
    path('Room/', include('iotOnDjango.urls.RoomUrls')),
    path('Gateway/', include('iotOnDjango.urls.GatewayUrls')),
    path('EdgeApplication/', include('iotOnDjango.urls.EdgeApplicationUrls')),
    path('NetworkProfile/', include('iotOnDjango.urls.NetworkProfileUrls')),
    path('SimCard/', include('iotOnDjango.urls.SimCardUrls')),
    path('ConnectivityPlan/', include('iotOnDjango.urls.ConnectivityPlanUrls')),
    path('MessagingEndpoint/', include('iotOnDjango.urls.MessagingEndpointUrls')),
    path('AccessPolicy/', include('iotOnDjango.urls.AccessPolicyUrls')),
    path('ApiKey/', include('iotOnDjango.urls.ApiKeyUrls')),
    path('DeviceCertificate/', include('iotOnDjango.urls.DeviceCertificateUrls')),
    path('ProvisioningRecord/', include('iotOnDjango.urls.ProvisioningRecordUrls')),
    path('DigitalTwin/', include('iotOnDjango.urls.DigitalTwinUrls')),
    path('TwinTemplate/', include('iotOnDjango.urls.TwinTemplateUrls')),
    path('TwinChangeEvent/', include('iotOnDjango.urls.TwinChangeEventUrls')),
    path('MaintenanceTicket/', include('iotOnDjango.urls.MaintenanceTicketUrls')),
    path('DataRetentionPolicy/', include('iotOnDjango.urls.DataRetentionPolicyUrls')),
    path('SoftwareUpdateCampaign/', include('iotOnDjango.urls.SoftwareUpdateCampaignUrls')),
    path('SoftwareUpdateExecution/', include('iotOnDjango.urls.SoftwareUpdateExecutionUrls')),
    path('DeviceGroup/', include('iotOnDjango.urls.DeviceGroupUrls')),
    path('UsageRecord/', include('iotOnDjango.urls.UsageRecordUrls')),
    path('admin/', admin.site.urls),
    path('', admin.site.urls),
]