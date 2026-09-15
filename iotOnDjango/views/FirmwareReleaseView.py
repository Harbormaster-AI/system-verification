import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from iotOnDjango.delegates.FirmwareReleaseDelegate import FirmwareReleaseDelegate

 #======================================================================
# 
# Encapsulates data for View FirmwareRelease
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class FirmwareReleaseView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the FirmwareRelease index.")

def get(request, firmwareReleaseId ):
	delegate = FirmwareReleaseDelegate()
	responseData = delegate.get( firmwareReleaseId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def create(request):
	firmwareRelease = json.loads(request.body)
	delegate = FirmwareReleaseDelegate()
	responseData = delegate.createFromJson( firmwareRelease )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def save(request):
	firmwareRelease = json.loads(request.body)
	delegate = FirmwareReleaseDelegate()
	responseData = delegate.save( firmwareRelease )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def delete(request, firmwareReleaseId ):
	delegate = FirmwareReleaseDelegate()
	responseData = delegate.delete( firmwareReleaseId )
	return HttpResponse(responseData, content_type="application/json");

def getAll(request):
	delegate = FirmwareReleaseDelegate()
	responseData = delegate.getAll()
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");


def assignDeviceModel( request, firmwareReleaseId, DeviceModelId ):
	delegate = FirmwareReleaseDelegate()
	responseData = delegate.saveDeviceModel( firmwareReleaseId, DeviceModelId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignDeviceModel( request, firmwareReleaseId ):
	delegate = FirmwareReleaseDelegate()
	responseData = delegate.deleteDeviceModel( firmwareReleaseId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

