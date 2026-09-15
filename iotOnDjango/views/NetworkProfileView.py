import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from iotOnDjango.delegates.NetworkProfileDelegate import NetworkProfileDelegate

 #======================================================================
# 
# Encapsulates data for View NetworkProfile
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class NetworkProfileView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the NetworkProfile index.")

def get(request, networkProfileId ):
	delegate = NetworkProfileDelegate()
	responseData = delegate.get( networkProfileId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def create(request):
	networkProfile = json.loads(request.body)
	delegate = NetworkProfileDelegate()
	responseData = delegate.createFromJson( networkProfile )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def save(request):
	networkProfile = json.loads(request.body)
	delegate = NetworkProfileDelegate()
	responseData = delegate.save( networkProfile )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def delete(request, networkProfileId ):
	delegate = NetworkProfileDelegate()
	responseData = delegate.delete( networkProfileId )
	return HttpResponse(responseData, content_type="application/json");

def getAll(request):
	delegate = NetworkProfileDelegate()
	responseData = delegate.getAll()
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");


def assignDevice( request, networkProfileId, DeviceId ):
	delegate = NetworkProfileDelegate()
	responseData = delegate.saveDevice( networkProfileId, DeviceId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignDevice( request, networkProfileId ):
	delegate = NetworkProfileDelegate()
	responseData = delegate.deleteDevice( networkProfileId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def assignGateway( request, networkProfileId, GatewayId ):
	delegate = NetworkProfileDelegate()
	responseData = delegate.saveGateway( networkProfileId, GatewayId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignGateway( request, networkProfileId ):
	delegate = NetworkProfileDelegate()
	responseData = delegate.deleteGateway( networkProfileId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def assignSimCard( request, networkProfileId, SimCardId ):
	delegate = NetworkProfileDelegate()
	responseData = delegate.saveSimCard( networkProfileId, SimCardId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignSimCard( request, networkProfileId ):
	delegate = NetworkProfileDelegate()
	responseData = delegate.deleteSimCard( networkProfileId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

