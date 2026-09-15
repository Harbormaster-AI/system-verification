import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from iotOnDjango.delegates.UsageRecordDelegate import UsageRecordDelegate

 #======================================================================
# 
# Encapsulates data for View UsageRecord
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class UsageRecordView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the UsageRecord index.")

def get(request, usageRecordId ):
	delegate = UsageRecordDelegate()
	responseData = delegate.get( usageRecordId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def create(request):
	usageRecord = json.loads(request.body)
	delegate = UsageRecordDelegate()
	responseData = delegate.createFromJson( usageRecord )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def save(request):
	usageRecord = json.loads(request.body)
	delegate = UsageRecordDelegate()
	responseData = delegate.save( usageRecord )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def delete(request, usageRecordId ):
	delegate = UsageRecordDelegate()
	responseData = delegate.delete( usageRecordId )
	return HttpResponse(responseData, content_type="application/json");

def getAll(request):
	delegate = UsageRecordDelegate()
	responseData = delegate.getAll()
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");


def assignTenant( request, usageRecordId, TenantId ):
	delegate = UsageRecordDelegate()
	responseData = delegate.saveTenant( usageRecordId, TenantId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignTenant( request, usageRecordId ):
	delegate = UsageRecordDelegate()
	responseData = delegate.deleteTenant( usageRecordId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def assignDevice( request, usageRecordId, DeviceId ):
	delegate = UsageRecordDelegate()
	responseData = delegate.saveDevice( usageRecordId, DeviceId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignDevice( request, usageRecordId ):
	delegate = UsageRecordDelegate()
	responseData = delegate.deleteDevice( usageRecordId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def assignConnectivityPlan( request, usageRecordId, ConnectivityPlanId ):
	delegate = UsageRecordDelegate()
	responseData = delegate.saveConnectivityPlan( usageRecordId, ConnectivityPlanId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignConnectivityPlan( request, usageRecordId ):
	delegate = UsageRecordDelegate()
	responseData = delegate.deleteConnectivityPlan( usageRecordId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

