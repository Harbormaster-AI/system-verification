import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from iotOnDjango.delegates.DataRetentionPolicyDelegate import DataRetentionPolicyDelegate

 #======================================================================
# 
# Encapsulates data for View DataRetentionPolicy
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class DataRetentionPolicyView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the DataRetentionPolicy index.")

def get(request, dataRetentionPolicyId ):
	delegate = DataRetentionPolicyDelegate()
	responseData = delegate.get( dataRetentionPolicyId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def create(request):
	dataRetentionPolicy = json.loads(request.body)
	delegate = DataRetentionPolicyDelegate()
	responseData = delegate.createFromJson( dataRetentionPolicy )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def save(request):
	dataRetentionPolicy = json.loads(request.body)
	delegate = DataRetentionPolicyDelegate()
	responseData = delegate.save( dataRetentionPolicy )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def delete(request, dataRetentionPolicyId ):
	delegate = DataRetentionPolicyDelegate()
	responseData = delegate.delete( dataRetentionPolicyId )
	return HttpResponse(responseData, content_type="application/json");

def getAll(request):
	delegate = DataRetentionPolicyDelegate()
	responseData = delegate.getAll()
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");


def assignTenant( request, dataRetentionPolicyId, TenantId ):
	delegate = DataRetentionPolicyDelegate()
	responseData = delegate.saveTenant( dataRetentionPolicyId, TenantId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignTenant( request, dataRetentionPolicyId ):
	delegate = DataRetentionPolicyDelegate()
	responseData = delegate.deleteTenant( dataRetentionPolicyId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addStreams( request, dataRetentionPolicyId, StreamsIds ):
	delegate = DataRetentionPolicyDelegate()
	responseData = delegate.addStreams( dataRetentionPolicyId, StreamsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeStreams( request, dataRetentionPolicyId, StreamsIds ):
	delegate = DataRetentionPolicyDelegate()
	responseData = delegate.removeStreams( dataRetentionPolicyId, StreamsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

