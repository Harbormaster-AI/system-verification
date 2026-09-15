import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from iotOnDjango.delegates.CommandDefinitionDelegate import CommandDefinitionDelegate

 #======================================================================
# 
# Encapsulates data for View CommandDefinition
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class CommandDefinitionView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the CommandDefinition index.")

def get(request, commandDefinitionId ):
	delegate = CommandDefinitionDelegate()
	responseData = delegate.get( commandDefinitionId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def create(request):
	commandDefinition = json.loads(request.body)
	delegate = CommandDefinitionDelegate()
	responseData = delegate.createFromJson( commandDefinition )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def save(request):
	commandDefinition = json.loads(request.body)
	delegate = CommandDefinitionDelegate()
	responseData = delegate.save( commandDefinition )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def delete(request, commandDefinitionId ):
	delegate = CommandDefinitionDelegate()
	responseData = delegate.delete( commandDefinitionId )
	return HttpResponse(responseData, content_type="application/json");

def getAll(request):
	delegate = CommandDefinitionDelegate()
	responseData = delegate.getAll()
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");


def assignDeviceModel( request, commandDefinitionId, DeviceModelId ):
	delegate = CommandDefinitionDelegate()
	responseData = delegate.saveDeviceModel( commandDefinitionId, DeviceModelId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignDeviceModel( request, commandDefinitionId ):
	delegate = CommandDefinitionDelegate()
	responseData = delegate.deleteDeviceModel( commandDefinitionId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addActuators( request, commandDefinitionId, ActuatorsIds ):
	delegate = CommandDefinitionDelegate()
	responseData = delegate.addActuators( commandDefinitionId, ActuatorsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeActuators( request, commandDefinitionId, ActuatorsIds ):
	delegate = CommandDefinitionDelegate()
	responseData = delegate.removeActuators( commandDefinitionId, ActuatorsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addCommandInvocations( request, commandDefinitionId, CommandInvocationsIds ):
	delegate = CommandDefinitionDelegate()
	responseData = delegate.addCommandInvocations( commandDefinitionId, CommandInvocationsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeCommandInvocations( request, commandDefinitionId, CommandInvocationsIds ):
	delegate = CommandDefinitionDelegate()
	responseData = delegate.removeCommandInvocations( commandDefinitionId, CommandInvocationsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

