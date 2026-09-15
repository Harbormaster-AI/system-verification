import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from iotOnDjango.delegates.AccessPolicyDelegate import AccessPolicyDelegate

 #======================================================================
# 
# Encapsulates data for View AccessPolicy
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class AccessPolicyView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the AccessPolicy index.")

def get(request, accessPolicyId ):
	delegate = AccessPolicyDelegate()
	responseData = delegate.get( accessPolicyId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def create(request):
	accessPolicy = json.loads(request.body)
	delegate = AccessPolicyDelegate()
	responseData = delegate.createFromJson( accessPolicy )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def save(request):
	accessPolicy = json.loads(request.body)
	delegate = AccessPolicyDelegate()
	responseData = delegate.save( accessPolicy )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def delete(request, accessPolicyId ):
	delegate = AccessPolicyDelegate()
	responseData = delegate.delete( accessPolicyId )
	return HttpResponse(responseData, content_type="application/json");

def getAll(request):
	delegate = AccessPolicyDelegate()
	responseData = delegate.getAll()
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");


def assignTenant( request, accessPolicyId, TenantId ):
	delegate = AccessPolicyDelegate()
	responseData = delegate.saveTenant( accessPolicyId, TenantId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignTenant( request, accessPolicyId ):
	delegate = AccessPolicyDelegate()
	responseData = delegate.deleteTenant( accessPolicyId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addApiKeys( request, accessPolicyId, ApiKeysIds ):
	delegate = AccessPolicyDelegate()
	responseData = delegate.addApiKeys( accessPolicyId, ApiKeysIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeApiKeys( request, accessPolicyId, ApiKeysIds ):
	delegate = AccessPolicyDelegate()
	responseData = delegate.removeApiKeys( accessPolicyId, ApiKeysIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addUsers( request, accessPolicyId, UsersIds ):
	delegate = AccessPolicyDelegate()
	responseData = delegate.addUsers( accessPolicyId, UsersIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeUsers( request, accessPolicyId, UsersIds ):
	delegate = AccessPolicyDelegate()
	responseData = delegate.removeUsers( accessPolicyId, UsersIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

