import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from iotOnDjango.delegates.SiteDelegate import SiteDelegate

 #======================================================================
# 
# Encapsulates data for View Site
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class SiteView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the Site index.")

def get(request, siteId ):
	delegate = SiteDelegate()
	responseData = delegate.get( siteId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def create(request):
	site = json.loads(request.body)
	delegate = SiteDelegate()
	responseData = delegate.createFromJson( site )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def save(request):
	site = json.loads(request.body)
	delegate = SiteDelegate()
	responseData = delegate.save( site )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def delete(request, siteId ):
	delegate = SiteDelegate()
	responseData = delegate.delete( siteId )
	return HttpResponse(responseData, content_type="application/json");

def getAll(request):
	delegate = SiteDelegate()
	responseData = delegate.getAll()
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");


def assignTenant( request, siteId, TenantId ):
	delegate = SiteDelegate()
	responseData = delegate.saveTenant( siteId, TenantId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignTenant( request, siteId ):
	delegate = SiteDelegate()
	responseData = delegate.deleteTenant( siteId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addBuildings( request, siteId, BuildingsIds ):
	delegate = SiteDelegate()
	responseData = delegate.addBuildings( siteId, BuildingsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeBuildings( request, siteId, BuildingsIds ):
	delegate = SiteDelegate()
	responseData = delegate.removeBuildings( siteId, BuildingsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addDevices( request, siteId, DevicesIds ):
	delegate = SiteDelegate()
	responseData = delegate.addDevices( siteId, DevicesIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeDevices( request, siteId, DevicesIds ):
	delegate = SiteDelegate()
	responseData = delegate.removeDevices( siteId, DevicesIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addGateways( request, siteId, GatewaysIds ):
	delegate = SiteDelegate()
	responseData = delegate.addGateways( siteId, GatewaysIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeGateways( request, siteId, GatewaysIds ):
	delegate = SiteDelegate()
	responseData = delegate.removeGateways( siteId, GatewaysIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

