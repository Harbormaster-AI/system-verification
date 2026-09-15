import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from iotOnDjango.delegates.ApiKeyDelegate import ApiKeyDelegate

 #======================================================================
# 
# Encapsulates data for View ApiKey
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class ApiKeyView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the ApiKey index.")

def get(request, apiKeyId ):
	delegate = ApiKeyDelegate()
	responseData = delegate.get( apiKeyId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def create(request):
	apiKey = json.loads(request.body)
	delegate = ApiKeyDelegate()
	responseData = delegate.createFromJson( apiKey )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def save(request):
	apiKey = json.loads(request.body)
	delegate = ApiKeyDelegate()
	responseData = delegate.save( apiKey )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def delete(request, apiKeyId ):
	delegate = ApiKeyDelegate()
	responseData = delegate.delete( apiKeyId )
	return HttpResponse(responseData, content_type="application/json");

def getAll(request):
	delegate = ApiKeyDelegate()
	responseData = delegate.getAll()
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");


def assignAccessPolicy( request, apiKeyId, AccessPolicyId ):
	delegate = ApiKeyDelegate()
	responseData = delegate.saveAccessPolicy( apiKeyId, AccessPolicyId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignAccessPolicy( request, apiKeyId ):
	delegate = ApiKeyDelegate()
	responseData = delegate.deleteAccessPolicy( apiKeyId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

