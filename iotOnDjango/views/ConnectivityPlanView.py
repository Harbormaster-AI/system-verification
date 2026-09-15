import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from iotOnDjango.delegates.ConnectivityPlanDelegate import ConnectivityPlanDelegate

 #======================================================================
# 
# Encapsulates data for View ConnectivityPlan
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class ConnectivityPlanView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the ConnectivityPlan index.")

def get(request, connectivityPlanId ):
	delegate = ConnectivityPlanDelegate()
	responseData = delegate.get( connectivityPlanId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def create(request):
	connectivityPlan = json.loads(request.body)
	delegate = ConnectivityPlanDelegate()
	responseData = delegate.createFromJson( connectivityPlan )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def save(request):
	connectivityPlan = json.loads(request.body)
	delegate = ConnectivityPlanDelegate()
	responseData = delegate.save( connectivityPlan )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def delete(request, connectivityPlanId ):
	delegate = ConnectivityPlanDelegate()
	responseData = delegate.delete( connectivityPlanId )
	return HttpResponse(responseData, content_type="application/json");

def getAll(request):
	delegate = ConnectivityPlanDelegate()
	responseData = delegate.getAll()
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");


def assignTenant( request, connectivityPlanId, TenantId ):
	delegate = ConnectivityPlanDelegate()
	responseData = delegate.saveTenant( connectivityPlanId, TenantId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignTenant( request, connectivityPlanId ):
	delegate = ConnectivityPlanDelegate()
	responseData = delegate.deleteTenant( connectivityPlanId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addSimCards( request, connectivityPlanId, SimCardsIds ):
	delegate = ConnectivityPlanDelegate()
	responseData = delegate.addSimCards( connectivityPlanId, SimCardsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeSimCards( request, connectivityPlanId, SimCardsIds ):
	delegate = ConnectivityPlanDelegate()
	responseData = delegate.removeSimCards( connectivityPlanId, SimCardsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

