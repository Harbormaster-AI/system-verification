import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from iotOnDjango.delegates.AlertRuleDelegate import AlertRuleDelegate

 #======================================================================
# 
# Encapsulates data for View AlertRule
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class AlertRuleView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the AlertRule index.")

def get(request, alertRuleId ):
	delegate = AlertRuleDelegate()
	responseData = delegate.get( alertRuleId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def create(request):
	alertRule = json.loads(request.body)
	delegate = AlertRuleDelegate()
	responseData = delegate.createFromJson( alertRule )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def save(request):
	alertRule = json.loads(request.body)
	delegate = AlertRuleDelegate()
	responseData = delegate.save( alertRule )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def delete(request, alertRuleId ):
	delegate = AlertRuleDelegate()
	responseData = delegate.delete( alertRuleId )
	return HttpResponse(responseData, content_type="application/json");

def getAll(request):
	delegate = AlertRuleDelegate()
	responseData = delegate.getAll()
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");


def assignTenant( request, alertRuleId, TenantId ):
	delegate = AlertRuleDelegate()
	responseData = delegate.saveTenant( alertRuleId, TenantId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignTenant( request, alertRuleId ):
	delegate = AlertRuleDelegate()
	responseData = delegate.deleteTenant( alertRuleId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addStreams( request, alertRuleId, StreamsIds ):
	delegate = AlertRuleDelegate()
	responseData = delegate.addStreams( alertRuleId, StreamsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeStreams( request, alertRuleId, StreamsIds ):
	delegate = AlertRuleDelegate()
	responseData = delegate.removeStreams( alertRuleId, StreamsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addAlerts( request, alertRuleId, AlertsIds ):
	delegate = AlertRuleDelegate()
	responseData = delegate.addAlerts( alertRuleId, AlertsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeAlerts( request, alertRuleId, AlertsIds ):
	delegate = AlertRuleDelegate()
	responseData = delegate.removeAlerts( alertRuleId, AlertsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

