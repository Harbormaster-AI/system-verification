import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from iotOnDjango.delegates.AlertDelegate import AlertDelegate

 #======================================================================
# 
# Encapsulates data for View Alert
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class AlertView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the Alert index.")

def get(request, alertId ):
	delegate = AlertDelegate()
	responseData = delegate.get( alertId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def create(request):
	alert = json.loads(request.body)
	delegate = AlertDelegate()
	responseData = delegate.createFromJson( alert )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def save(request):
	alert = json.loads(request.body)
	delegate = AlertDelegate()
	responseData = delegate.save( alert )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def delete(request, alertId ):
	delegate = AlertDelegate()
	responseData = delegate.delete( alertId )
	return HttpResponse(responseData, content_type="application/json");

def getAll(request):
	delegate = AlertDelegate()
	responseData = delegate.getAll()
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");


def assignDevice( request, alertId, DeviceId ):
	delegate = AlertDelegate()
	responseData = delegate.saveDevice( alertId, DeviceId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignDevice( request, alertId ):
	delegate = AlertDelegate()
	responseData = delegate.deleteDevice( alertId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def assignAlertRule( request, alertId, AlertRuleId ):
	delegate = AlertDelegate()
	responseData = delegate.saveAlertRule( alertId, AlertRuleId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignAlertRule( request, alertId ):
	delegate = AlertDelegate()
	responseData = delegate.deleteAlertRule( alertId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

