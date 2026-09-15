import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from iotOnDjango.delegates.DeviceModelDelegate import DeviceModelDelegate

 #======================================================================
# 
# Encapsulates data for View DeviceModel
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class DeviceModelView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the DeviceModel index.")

def get(request, deviceModelId ):
	delegate = DeviceModelDelegate()
	responseData = delegate.get( deviceModelId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def create(request):
	deviceModel = json.loads(request.body)
	delegate = DeviceModelDelegate()
	responseData = delegate.createFromJson( deviceModel )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def save(request):
	deviceModel = json.loads(request.body)
	delegate = DeviceModelDelegate()
	responseData = delegate.save( deviceModel )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def delete(request, deviceModelId ):
	delegate = DeviceModelDelegate()
	responseData = delegate.delete( deviceModelId )
	return HttpResponse(responseData, content_type="application/json");

def getAll(request):
	delegate = DeviceModelDelegate()
	responseData = delegate.getAll()
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");


def assignVendor( request, deviceModelId, VendorId ):
	delegate = DeviceModelDelegate()
	responseData = delegate.saveVendor( deviceModelId, VendorId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignVendor( request, deviceModelId ):
	delegate = DeviceModelDelegate()
	responseData = delegate.deleteVendor( deviceModelId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def assignTwinTemplate( request, deviceModelId, TwinTemplateId ):
	delegate = DeviceModelDelegate()
	responseData = delegate.saveTwinTemplate( deviceModelId, TwinTemplateId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignTwinTemplate( request, deviceModelId ):
	delegate = DeviceModelDelegate()
	responseData = delegate.deleteTwinTemplate( deviceModelId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addHardwareModules( request, deviceModelId, HardwareModulesIds ):
	delegate = DeviceModelDelegate()
	responseData = delegate.addHardwareModules( deviceModelId, HardwareModulesIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeHardwareModules( request, deviceModelId, HardwareModulesIds ):
	delegate = DeviceModelDelegate()
	responseData = delegate.removeHardwareModules( deviceModelId, HardwareModulesIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addFirmwareReleases( request, deviceModelId, FirmwareReleasesIds ):
	delegate = DeviceModelDelegate()
	responseData = delegate.addFirmwareReleases( deviceModelId, FirmwareReleasesIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeFirmwareReleases( request, deviceModelId, FirmwareReleasesIds ):
	delegate = DeviceModelDelegate()
	responseData = delegate.removeFirmwareReleases( deviceModelId, FirmwareReleasesIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addCommandDefinitions( request, deviceModelId, CommandDefinitionsIds ):
	delegate = DeviceModelDelegate()
	responseData = delegate.addCommandDefinitions( deviceModelId, CommandDefinitionsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeCommandDefinitions( request, deviceModelId, CommandDefinitionsIds ):
	delegate = DeviceModelDelegate()
	responseData = delegate.removeCommandDefinitions( deviceModelId, CommandDefinitionsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

