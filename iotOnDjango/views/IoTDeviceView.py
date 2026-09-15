import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from iotOnDjango.delegates.IoTDeviceDelegate import IoTDeviceDelegate

 #======================================================================
# 
# Encapsulates data for View IoTDevice
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class IoTDeviceView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the IoTDevice index.")

def get(request, ioTDeviceId ):
	delegate = IoTDeviceDelegate()
	responseData = delegate.get( ioTDeviceId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def create(request):
	ioTDevice = json.loads(request.body)
	delegate = IoTDeviceDelegate()
	responseData = delegate.createFromJson( ioTDevice )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def save(request):
	ioTDevice = json.loads(request.body)
	delegate = IoTDeviceDelegate()
	responseData = delegate.save( ioTDevice )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def delete(request, ioTDeviceId ):
	delegate = IoTDeviceDelegate()
	responseData = delegate.delete( ioTDeviceId )
	return HttpResponse(responseData, content_type="application/json");

def getAll(request):
	delegate = IoTDeviceDelegate()
	responseData = delegate.getAll()
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");


def assignDeviceModel( request, ioTDeviceId, DeviceModelId ):
	delegate = IoTDeviceDelegate()
	responseData = delegate.saveDeviceModel( ioTDeviceId, DeviceModelId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignDeviceModel( request, ioTDeviceId ):
	delegate = IoTDeviceDelegate()
	responseData = delegate.deleteDeviceModel( ioTDeviceId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def assignTenant( request, ioTDeviceId, TenantId ):
	delegate = IoTDeviceDelegate()
	responseData = delegate.saveTenant( ioTDeviceId, TenantId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignTenant( request, ioTDeviceId ):
	delegate = IoTDeviceDelegate()
	responseData = delegate.deleteTenant( ioTDeviceId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def assignSite( request, ioTDeviceId, SiteId ):
	delegate = IoTDeviceDelegate()
	responseData = delegate.saveSite( ioTDeviceId, SiteId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignSite( request, ioTDeviceId ):
	delegate = IoTDeviceDelegate()
	responseData = delegate.deleteSite( ioTDeviceId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def assignRoom( request, ioTDeviceId, RoomId ):
	delegate = IoTDeviceDelegate()
	responseData = delegate.saveRoom( ioTDeviceId, RoomId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignRoom( request, ioTDeviceId ):
	delegate = IoTDeviceDelegate()
	responseData = delegate.deleteRoom( ioTDeviceId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def assignGateway( request, ioTDeviceId, GatewayId ):
	delegate = IoTDeviceDelegate()
	responseData = delegate.saveGateway( ioTDeviceId, GatewayId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignGateway( request, ioTDeviceId ):
	delegate = IoTDeviceDelegate()
	responseData = delegate.deleteGateway( ioTDeviceId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def assignDigitalTwin( request, ioTDeviceId, DigitalTwinId ):
	delegate = IoTDeviceDelegate()
	responseData = delegate.saveDigitalTwin( ioTDeviceId, DigitalTwinId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignDigitalTwin( request, ioTDeviceId ):
	delegate = IoTDeviceDelegate()
	responseData = delegate.deleteDigitalTwin( ioTDeviceId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def assignProvisioningRecord( request, ioTDeviceId, ProvisioningRecordId ):
	delegate = IoTDeviceDelegate()
	responseData = delegate.saveProvisioningRecord( ioTDeviceId, ProvisioningRecordId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignProvisioningRecord( request, ioTDeviceId ):
	delegate = IoTDeviceDelegate()
	responseData = delegate.deleteProvisioningRecord( ioTDeviceId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addSensors( request, ioTDeviceId, SensorsIds ):
	delegate = IoTDeviceDelegate()
	responseData = delegate.addSensors( ioTDeviceId, SensorsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeSensors( request, ioTDeviceId, SensorsIds ):
	delegate = IoTDeviceDelegate()
	responseData = delegate.removeSensors( ioTDeviceId, SensorsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addActuators( request, ioTDeviceId, ActuatorsIds ):
	delegate = IoTDeviceDelegate()
	responseData = delegate.addActuators( ioTDeviceId, ActuatorsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeActuators( request, ioTDeviceId, ActuatorsIds ):
	delegate = IoTDeviceDelegate()
	responseData = delegate.removeActuators( ioTDeviceId, ActuatorsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addCertificates( request, ioTDeviceId, CertificatesIds ):
	delegate = IoTDeviceDelegate()
	responseData = delegate.addCertificates( ioTDeviceId, CertificatesIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeCertificates( request, ioTDeviceId, CertificatesIds ):
	delegate = IoTDeviceDelegate()
	responseData = delegate.removeCertificates( ioTDeviceId, CertificatesIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addTelemetryStreams( request, ioTDeviceId, TelemetryStreamsIds ):
	delegate = IoTDeviceDelegate()
	responseData = delegate.addTelemetryStreams( ioTDeviceId, TelemetryStreamsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeTelemetryStreams( request, ioTDeviceId, TelemetryStreamsIds ):
	delegate = IoTDeviceDelegate()
	responseData = delegate.removeTelemetryStreams( ioTDeviceId, TelemetryStreamsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addCommandInvocations( request, ioTDeviceId, CommandInvocationsIds ):
	delegate = IoTDeviceDelegate()
	responseData = delegate.addCommandInvocations( ioTDeviceId, CommandInvocationsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeCommandInvocations( request, ioTDeviceId, CommandInvocationsIds ):
	delegate = IoTDeviceDelegate()
	responseData = delegate.removeCommandInvocations( ioTDeviceId, CommandInvocationsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addAlerts( request, ioTDeviceId, AlertsIds ):
	delegate = IoTDeviceDelegate()
	responseData = delegate.addAlerts( ioTDeviceId, AlertsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeAlerts( request, ioTDeviceId, AlertsIds ):
	delegate = IoTDeviceDelegate()
	responseData = delegate.removeAlerts( ioTDeviceId, AlertsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addDeviceGroups( request, ioTDeviceId, DeviceGroupsIds ):
	delegate = IoTDeviceDelegate()
	responseData = delegate.addDeviceGroups( ioTDeviceId, DeviceGroupsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeDeviceGroups( request, ioTDeviceId, DeviceGroupsIds ):
	delegate = IoTDeviceDelegate()
	responseData = delegate.removeDeviceGroups( ioTDeviceId, DeviceGroupsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addNetworkProfiles( request, ioTDeviceId, NetworkProfilesIds ):
	delegate = IoTDeviceDelegate()
	responseData = delegate.addNetworkProfiles( ioTDeviceId, NetworkProfilesIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeNetworkProfiles( request, ioTDeviceId, NetworkProfilesIds ):
	delegate = IoTDeviceDelegate()
	responseData = delegate.removeNetworkProfiles( ioTDeviceId, NetworkProfilesIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

