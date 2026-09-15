import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from iotOnDjango.delegates.MessagingEndpointDelegate import MessagingEndpointDelegate

 #======================================================================
# 
# Encapsulates data for View MessagingEndpoint
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class MessagingEndpointView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the MessagingEndpoint index.")

def get(request, messagingEndpointId ):
	delegate = MessagingEndpointDelegate()
	responseData = delegate.get( messagingEndpointId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def create(request):
	messagingEndpoint = json.loads(request.body)
	delegate = MessagingEndpointDelegate()
	responseData = delegate.createFromJson( messagingEndpoint )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def save(request):
	messagingEndpoint = json.loads(request.body)
	delegate = MessagingEndpointDelegate()
	responseData = delegate.save( messagingEndpoint )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def delete(request, messagingEndpointId ):
	delegate = MessagingEndpointDelegate()
	responseData = delegate.delete( messagingEndpointId )
	return HttpResponse(responseData, content_type="application/json");

def getAll(request):
	delegate = MessagingEndpointDelegate()
	responseData = delegate.getAll()
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");


def assignTenant( request, messagingEndpointId, TenantId ):
	delegate = MessagingEndpointDelegate()
	responseData = delegate.saveTenant( messagingEndpointId, TenantId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignTenant( request, messagingEndpointId ):
	delegate = MessagingEndpointDelegate()
	responseData = delegate.deleteTenant( messagingEndpointId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addStreams( request, messagingEndpointId, StreamsIds ):
	delegate = MessagingEndpointDelegate()
	responseData = delegate.addStreams( messagingEndpointId, StreamsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeStreams( request, messagingEndpointId, StreamsIds ):
	delegate = MessagingEndpointDelegate()
	responseData = delegate.removeStreams( messagingEndpointId, StreamsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

