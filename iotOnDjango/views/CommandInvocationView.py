import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from iotOnDjango.delegates.CommandInvocationDelegate import CommandInvocationDelegate

 #======================================================================
# 
# Encapsulates data for View CommandInvocation
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class CommandInvocationView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the CommandInvocation index.")

def get(request, commandInvocationId ):
	delegate = CommandInvocationDelegate()
	responseData = delegate.get( commandInvocationId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def create(request):
	commandInvocation = json.loads(request.body)
	delegate = CommandInvocationDelegate()
	responseData = delegate.createFromJson( commandInvocation )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def save(request):
	commandInvocation = json.loads(request.body)
	delegate = CommandInvocationDelegate()
	responseData = delegate.save( commandInvocation )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def delete(request, commandInvocationId ):
	delegate = CommandInvocationDelegate()
	responseData = delegate.delete( commandInvocationId )
	return HttpResponse(responseData, content_type="application/json");

def getAll(request):
	delegate = CommandInvocationDelegate()
	responseData = delegate.getAll()
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");


def assignDevice( request, commandInvocationId, DeviceId ):
	delegate = CommandInvocationDelegate()
	responseData = delegate.saveDevice( commandInvocationId, DeviceId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignDevice( request, commandInvocationId ):
	delegate = CommandInvocationDelegate()
	responseData = delegate.deleteDevice( commandInvocationId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def assignCommandDefinition( request, commandInvocationId, CommandDefinitionId ):
	delegate = CommandInvocationDelegate()
	responseData = delegate.saveCommandDefinition( commandInvocationId, CommandDefinitionId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignCommandDefinition( request, commandInvocationId ):
	delegate = CommandInvocationDelegate()
	responseData = delegate.deleteCommandDefinition( commandInvocationId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def assignActuator( request, commandInvocationId, ActuatorId ):
	delegate = CommandInvocationDelegate()
	responseData = delegate.saveActuator( commandInvocationId, ActuatorId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignActuator( request, commandInvocationId ):
	delegate = CommandInvocationDelegate()
	responseData = delegate.deleteActuator( commandInvocationId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def assignUser( request, commandInvocationId, UserId ):
	delegate = CommandInvocationDelegate()
	responseData = delegate.saveUser( commandInvocationId, UserId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignUser( request, commandInvocationId ):
	delegate = CommandInvocationDelegate()
	responseData = delegate.deleteUser( commandInvocationId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

