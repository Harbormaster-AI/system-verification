import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from iotOnDjango.delegates.SimCardDelegate import SimCardDelegate

 #======================================================================
# 
# Encapsulates data for View SimCard
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class SimCardView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the SimCard index.")

def get(request, simCardId ):
	delegate = SimCardDelegate()
	responseData = delegate.get( simCardId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def create(request):
	simCard = json.loads(request.body)
	delegate = SimCardDelegate()
	responseData = delegate.createFromJson( simCard )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def save(request):
	simCard = json.loads(request.body)
	delegate = SimCardDelegate()
	responseData = delegate.save( simCard )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def delete(request, simCardId ):
	delegate = SimCardDelegate()
	responseData = delegate.delete( simCardId )
	return HttpResponse(responseData, content_type="application/json");

def getAll(request):
	delegate = SimCardDelegate()
	responseData = delegate.getAll()
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");


def assignTenant( request, simCardId, TenantId ):
	delegate = SimCardDelegate()
	responseData = delegate.saveTenant( simCardId, TenantId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignTenant( request, simCardId ):
	delegate = SimCardDelegate()
	responseData = delegate.deleteTenant( simCardId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def assignConnectivityPlan( request, simCardId, ConnectivityPlanId ):
	delegate = SimCardDelegate()
	responseData = delegate.saveConnectivityPlan( simCardId, ConnectivityPlanId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignConnectivityPlan( request, simCardId ):
	delegate = SimCardDelegate()
	responseData = delegate.deleteConnectivityPlan( simCardId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addNetworkProfiles( request, simCardId, NetworkProfilesIds ):
	delegate = SimCardDelegate()
	responseData = delegate.addNetworkProfiles( simCardId, NetworkProfilesIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeNetworkProfiles( request, simCardId, NetworkProfilesIds ):
	delegate = SimCardDelegate()
	responseData = delegate.removeNetworkProfiles( simCardId, NetworkProfilesIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

