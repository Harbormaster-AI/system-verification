import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from iotOnDjango.delegates.DeviceGroupDelegate import DeviceGroupDelegate

 #======================================================================
# 
# Encapsulates data for View DeviceGroup
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class DeviceGroupView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the DeviceGroup index.")

def get(request, deviceGroupId ):
	delegate = DeviceGroupDelegate()
	responseData = delegate.get( deviceGroupId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def create(request):
	deviceGroup = json.loads(request.body)
	delegate = DeviceGroupDelegate()
	responseData = delegate.createFromJson( deviceGroup )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def save(request):
	deviceGroup = json.loads(request.body)
	delegate = DeviceGroupDelegate()
	responseData = delegate.save( deviceGroup )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def delete(request, deviceGroupId ):
	delegate = DeviceGroupDelegate()
	responseData = delegate.delete( deviceGroupId )
	return HttpResponse(responseData, content_type="application/json");

def getAll(request):
	delegate = DeviceGroupDelegate()
	responseData = delegate.getAll()
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");


def assignTenant( request, deviceGroupId, TenantId ):
	delegate = DeviceGroupDelegate()
	responseData = delegate.saveTenant( deviceGroupId, TenantId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignTenant( request, deviceGroupId ):
	delegate = DeviceGroupDelegate()
	responseData = delegate.deleteTenant( deviceGroupId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addDevices( request, deviceGroupId, DevicesIds ):
	delegate = DeviceGroupDelegate()
	responseData = delegate.addDevices( deviceGroupId, DevicesIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeDevices( request, deviceGroupId, DevicesIds ):
	delegate = DeviceGroupDelegate()
	responseData = delegate.removeDevices( deviceGroupId, DevicesIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

