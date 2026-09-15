import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from iotOnDjango.delegates.SoftwareUpdateExecutionDelegate import SoftwareUpdateExecutionDelegate

 #======================================================================
# 
# Encapsulates data for View SoftwareUpdateExecution
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class SoftwareUpdateExecutionView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the SoftwareUpdateExecution index.")

def get(request, softwareUpdateExecutionId ):
	delegate = SoftwareUpdateExecutionDelegate()
	responseData = delegate.get( softwareUpdateExecutionId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def create(request):
	softwareUpdateExecution = json.loads(request.body)
	delegate = SoftwareUpdateExecutionDelegate()
	responseData = delegate.createFromJson( softwareUpdateExecution )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def save(request):
	softwareUpdateExecution = json.loads(request.body)
	delegate = SoftwareUpdateExecutionDelegate()
	responseData = delegate.save( softwareUpdateExecution )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def delete(request, softwareUpdateExecutionId ):
	delegate = SoftwareUpdateExecutionDelegate()
	responseData = delegate.delete( softwareUpdateExecutionId )
	return HttpResponse(responseData, content_type="application/json");

def getAll(request):
	delegate = SoftwareUpdateExecutionDelegate()
	responseData = delegate.getAll()
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");


def assignCampaign( request, softwareUpdateExecutionId, CampaignId ):
	delegate = SoftwareUpdateExecutionDelegate()
	responseData = delegate.saveCampaign( softwareUpdateExecutionId, CampaignId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignCampaign( request, softwareUpdateExecutionId ):
	delegate = SoftwareUpdateExecutionDelegate()
	responseData = delegate.deleteCampaign( softwareUpdateExecutionId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def assignDevice( request, softwareUpdateExecutionId, DeviceId ):
	delegate = SoftwareUpdateExecutionDelegate()
	responseData = delegate.saveDevice( softwareUpdateExecutionId, DeviceId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignDevice( request, softwareUpdateExecutionId ):
	delegate = SoftwareUpdateExecutionDelegate()
	responseData = delegate.deleteDevice( softwareUpdateExecutionId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

