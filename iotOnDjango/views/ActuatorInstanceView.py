import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from iotOnDjango.delegates.ActuatorInstanceDelegate import ActuatorInstanceDelegate

 #======================================================================
# 
# Encapsulates data for View ActuatorInstance
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class ActuatorInstanceView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the ActuatorInstance index.")

def get(request, actuatorInstanceId ):
	delegate = ActuatorInstanceDelegate()
	responseData = delegate.get( actuatorInstanceId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def create(request):
	actuatorInstance = json.loads(request.body)
	delegate = ActuatorInstanceDelegate()
	responseData = delegate.createFromJson( actuatorInstance )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def save(request):
	actuatorInstance = json.loads(request.body)
	delegate = ActuatorInstanceDelegate()
	responseData = delegate.save( actuatorInstance )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def delete(request, actuatorInstanceId ):
	delegate = ActuatorInstanceDelegate()
	responseData = delegate.delete( actuatorInstanceId )
	return HttpResponse(responseData, content_type="application/json");

def getAll(request):
	delegate = ActuatorInstanceDelegate()
	responseData = delegate.getAll()
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");


def assignDevice( request, actuatorInstanceId, DeviceId ):
	delegate = ActuatorInstanceDelegate()
	responseData = delegate.saveDevice( actuatorInstanceId, DeviceId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignDevice( request, actuatorInstanceId ):
	delegate = ActuatorInstanceDelegate()
	responseData = delegate.deleteDevice( actuatorInstanceId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addSupportedCommands( request, actuatorInstanceId, SupportedCommandsIds ):
	delegate = ActuatorInstanceDelegate()
	responseData = delegate.addSupportedCommands( actuatorInstanceId, SupportedCommandsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeSupportedCommands( request, actuatorInstanceId, SupportedCommandsIds ):
	delegate = ActuatorInstanceDelegate()
	responseData = delegate.removeSupportedCommands( actuatorInstanceId, SupportedCommandsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

