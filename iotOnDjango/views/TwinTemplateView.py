import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from iotOnDjango.delegates.TwinTemplateDelegate import TwinTemplateDelegate

 #======================================================================
# 
# Encapsulates data for View TwinTemplate
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class TwinTemplateView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the TwinTemplate index.")

def get(request, twinTemplateId ):
	delegate = TwinTemplateDelegate()
	responseData = delegate.get( twinTemplateId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def create(request):
	twinTemplate = json.loads(request.body)
	delegate = TwinTemplateDelegate()
	responseData = delegate.createFromJson( twinTemplate )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def save(request):
	twinTemplate = json.loads(request.body)
	delegate = TwinTemplateDelegate()
	responseData = delegate.save( twinTemplate )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def delete(request, twinTemplateId ):
	delegate = TwinTemplateDelegate()
	responseData = delegate.delete( twinTemplateId )
	return HttpResponse(responseData, content_type="application/json");

def getAll(request):
	delegate = TwinTemplateDelegate()
	responseData = delegate.getAll()
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");


def addDeviceModels( request, twinTemplateId, DeviceModelsIds ):
	delegate = TwinTemplateDelegate()
	responseData = delegate.addDeviceModels( twinTemplateId, DeviceModelsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeDeviceModels( request, twinTemplateId, DeviceModelsIds ):
	delegate = TwinTemplateDelegate()
	responseData = delegate.removeDeviceModels( twinTemplateId, DeviceModelsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

