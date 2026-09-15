import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from iotOnDjango.delegates.DigitalTwinDelegate import DigitalTwinDelegate

 #======================================================================
# 
# Encapsulates data for View DigitalTwin
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class DigitalTwinView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the DigitalTwin index.")

def get(request, digitalTwinId ):
	delegate = DigitalTwinDelegate()
	responseData = delegate.get( digitalTwinId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def create(request):
	digitalTwin = json.loads(request.body)
	delegate = DigitalTwinDelegate()
	responseData = delegate.createFromJson( digitalTwin )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def save(request):
	digitalTwin = json.loads(request.body)
	delegate = DigitalTwinDelegate()
	responseData = delegate.save( digitalTwin )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def delete(request, digitalTwinId ):
	delegate = DigitalTwinDelegate()
	responseData = delegate.delete( digitalTwinId )
	return HttpResponse(responseData, content_type="application/json");

def getAll(request):
	delegate = DigitalTwinDelegate()
	responseData = delegate.getAll()
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");


def assignDevice( request, digitalTwinId, DeviceId ):
	delegate = DigitalTwinDelegate()
	responseData = delegate.saveDevice( digitalTwinId, DeviceId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignDevice( request, digitalTwinId ):
	delegate = DigitalTwinDelegate()
	responseData = delegate.deleteDevice( digitalTwinId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def assignGateway( request, digitalTwinId, GatewayId ):
	delegate = DigitalTwinDelegate()
	responseData = delegate.saveGateway( digitalTwinId, GatewayId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignGateway( request, digitalTwinId ):
	delegate = DigitalTwinDelegate()
	responseData = delegate.deleteGateway( digitalTwinId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def assignTemplate( request, digitalTwinId, TemplateId ):
	delegate = DigitalTwinDelegate()
	responseData = delegate.saveTemplate( digitalTwinId, TemplateId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignTemplate( request, digitalTwinId ):
	delegate = DigitalTwinDelegate()
	responseData = delegate.deleteTemplate( digitalTwinId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addChangeEvents( request, digitalTwinId, ChangeEventsIds ):
	delegate = DigitalTwinDelegate()
	responseData = delegate.addChangeEvents( digitalTwinId, ChangeEventsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeChangeEvents( request, digitalTwinId, ChangeEventsIds ):
	delegate = DigitalTwinDelegate()
	responseData = delegate.removeChangeEvents( digitalTwinId, ChangeEventsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

