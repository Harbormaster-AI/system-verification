import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from iotOnDjango.delegates.TenantUserDelegate import TenantUserDelegate

 #======================================================================
# 
# Encapsulates data for View TenantUser
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class TenantUserView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the TenantUser index.")

def get(request, tenantUserId ):
	delegate = TenantUserDelegate()
	responseData = delegate.get( tenantUserId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def create(request):
	tenantUser = json.loads(request.body)
	delegate = TenantUserDelegate()
	responseData = delegate.createFromJson( tenantUser )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def save(request):
	tenantUser = json.loads(request.body)
	delegate = TenantUserDelegate()
	responseData = delegate.save( tenantUser )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def delete(request, tenantUserId ):
	delegate = TenantUserDelegate()
	responseData = delegate.delete( tenantUserId )
	return HttpResponse(responseData, content_type="application/json");

def getAll(request):
	delegate = TenantUserDelegate()
	responseData = delegate.getAll()
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");


def assignTenant( request, tenantUserId, TenantId ):
	delegate = TenantUserDelegate()
	responseData = delegate.saveTenant( tenantUserId, TenantId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignTenant( request, tenantUserId ):
	delegate = TenantUserDelegate()
	responseData = delegate.deleteTenant( tenantUserId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addCommandInvocations( request, tenantUserId, CommandInvocationsIds ):
	delegate = TenantUserDelegate()
	responseData = delegate.addCommandInvocations( tenantUserId, CommandInvocationsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeCommandInvocations( request, tenantUserId, CommandInvocationsIds ):
	delegate = TenantUserDelegate()
	responseData = delegate.removeCommandInvocations( tenantUserId, CommandInvocationsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

