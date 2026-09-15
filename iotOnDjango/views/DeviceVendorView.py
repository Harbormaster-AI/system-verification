import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from iotOnDjango.delegates.DeviceVendorDelegate import DeviceVendorDelegate

 #======================================================================
# 
# Encapsulates data for View DeviceVendor
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class DeviceVendorView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the DeviceVendor index.")

def get(request, deviceVendorId ):
	delegate = DeviceVendorDelegate()
	responseData = delegate.get( deviceVendorId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def create(request):
	deviceVendor = json.loads(request.body)
	delegate = DeviceVendorDelegate()
	responseData = delegate.createFromJson( deviceVendor )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def save(request):
	deviceVendor = json.loads(request.body)
	delegate = DeviceVendorDelegate()
	responseData = delegate.save( deviceVendor )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def delete(request, deviceVendorId ):
	delegate = DeviceVendorDelegate()
	responseData = delegate.delete( deviceVendorId )
	return HttpResponse(responseData, content_type="application/json");

def getAll(request):
	delegate = DeviceVendorDelegate()
	responseData = delegate.getAll()
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");


def addDeviceModels( request, deviceVendorId, DeviceModelsIds ):
	delegate = DeviceVendorDelegate()
	responseData = delegate.addDeviceModels( deviceVendorId, DeviceModelsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeDeviceModels( request, deviceVendorId, DeviceModelsIds ):
	delegate = DeviceVendorDelegate()
	responseData = delegate.removeDeviceModels( deviceVendorId, DeviceModelsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addFirmwareReleases( request, deviceVendorId, FirmwareReleasesIds ):
	delegate = DeviceVendorDelegate()
	responseData = delegate.addFirmwareReleases( deviceVendorId, FirmwareReleasesIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeFirmwareReleases( request, deviceVendorId, FirmwareReleasesIds ):
	delegate = DeviceVendorDelegate()
	responseData = delegate.removeFirmwareReleases( deviceVendorId, FirmwareReleasesIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addHardwareModules( request, deviceVendorId, HardwareModulesIds ):
	delegate = DeviceVendorDelegate()
	responseData = delegate.addHardwareModules( deviceVendorId, HardwareModulesIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeHardwareModules( request, deviceVendorId, HardwareModulesIds ):
	delegate = DeviceVendorDelegate()
	responseData = delegate.removeHardwareModules( deviceVendorId, HardwareModulesIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

