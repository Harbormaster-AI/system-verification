import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from iotOnDjango.delegates.SoftwareUpdateCampaignDelegate import SoftwareUpdateCampaignDelegate

 #======================================================================
# 
# Encapsulates data for View SoftwareUpdateCampaign
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class SoftwareUpdateCampaignView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the SoftwareUpdateCampaign index.")

def get(request, softwareUpdateCampaignId ):
	delegate = SoftwareUpdateCampaignDelegate()
	responseData = delegate.get( softwareUpdateCampaignId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def create(request):
	softwareUpdateCampaign = json.loads(request.body)
	delegate = SoftwareUpdateCampaignDelegate()
	responseData = delegate.createFromJson( softwareUpdateCampaign )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def save(request):
	softwareUpdateCampaign = json.loads(request.body)
	delegate = SoftwareUpdateCampaignDelegate()
	responseData = delegate.save( softwareUpdateCampaign )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def delete(request, softwareUpdateCampaignId ):
	delegate = SoftwareUpdateCampaignDelegate()
	responseData = delegate.delete( softwareUpdateCampaignId )
	return HttpResponse(responseData, content_type="application/json");

def getAll(request):
	delegate = SoftwareUpdateCampaignDelegate()
	responseData = delegate.getAll()
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");


def assignFirmwareRelease( request, softwareUpdateCampaignId, FirmwareReleaseId ):
	delegate = SoftwareUpdateCampaignDelegate()
	responseData = delegate.saveFirmwareRelease( softwareUpdateCampaignId, FirmwareReleaseId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignFirmwareRelease( request, softwareUpdateCampaignId ):
	delegate = SoftwareUpdateCampaignDelegate()
	responseData = delegate.deleteFirmwareRelease( softwareUpdateCampaignId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def assignDeviceGroup( request, softwareUpdateCampaignId, DeviceGroupId ):
	delegate = SoftwareUpdateCampaignDelegate()
	responseData = delegate.saveDeviceGroup( softwareUpdateCampaignId, DeviceGroupId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignDeviceGroup( request, softwareUpdateCampaignId ):
	delegate = SoftwareUpdateCampaignDelegate()
	responseData = delegate.deleteDeviceGroup( softwareUpdateCampaignId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addExecutions( request, softwareUpdateCampaignId, ExecutionsIds ):
	delegate = SoftwareUpdateCampaignDelegate()
	responseData = delegate.addExecutions( softwareUpdateCampaignId, ExecutionsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeExecutions( request, softwareUpdateCampaignId, ExecutionsIds ):
	delegate = SoftwareUpdateCampaignDelegate()
	responseData = delegate.removeExecutions( softwareUpdateCampaignId, ExecutionsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

