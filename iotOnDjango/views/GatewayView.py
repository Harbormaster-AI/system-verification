import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from iotOnDjango.delegates.GatewayDelegate import GatewayDelegate

 #======================================================================
# 
# Encapsulates data for View Gateway
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class GatewayView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the Gateway index.")

def get(request, gatewayId ):
	delegate = GatewayDelegate()
	responseData = delegate.get( gatewayId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def create(request):
	gateway = json.loads(request.body)
	delegate = GatewayDelegate()
	responseData = delegate.createFromJson( gateway )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def save(request):
	gateway = json.loads(request.body)
	delegate = GatewayDelegate()
	responseData = delegate.save( gateway )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def delete(request, gatewayId ):
	delegate = GatewayDelegate()
	responseData = delegate.delete( gatewayId )
	return HttpResponse(responseData, content_type="application/json");

def getAll(request):
	delegate = GatewayDelegate()
	responseData = delegate.getAll()
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");


def assignSite( request, gatewayId, SiteId ):
	delegate = GatewayDelegate()
	responseData = delegate.saveSite( gatewayId, SiteId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignSite( request, gatewayId ):
	delegate = GatewayDelegate()
	responseData = delegate.deleteSite( gatewayId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def assignRoom( request, gatewayId, RoomId ):
	delegate = GatewayDelegate()
	responseData = delegate.saveRoom( gatewayId, RoomId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignRoom( request, gatewayId ):
	delegate = GatewayDelegate()
	responseData = delegate.deleteRoom( gatewayId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def assignDigitalTwin( request, gatewayId, DigitalTwinId ):
	delegate = GatewayDelegate()
	responseData = delegate.saveDigitalTwin( gatewayId, DigitalTwinId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignDigitalTwin( request, gatewayId ):
	delegate = GatewayDelegate()
	responseData = delegate.deleteDigitalTwin( gatewayId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addDevices( request, gatewayId, DevicesIds ):
	delegate = GatewayDelegate()
	responseData = delegate.addDevices( gatewayId, DevicesIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeDevices( request, gatewayId, DevicesIds ):
	delegate = GatewayDelegate()
	responseData = delegate.removeDevices( gatewayId, DevicesIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addEdgeApplications( request, gatewayId, EdgeApplicationsIds ):
	delegate = GatewayDelegate()
	responseData = delegate.addEdgeApplications( gatewayId, EdgeApplicationsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeEdgeApplications( request, gatewayId, EdgeApplicationsIds ):
	delegate = GatewayDelegate()
	responseData = delegate.removeEdgeApplications( gatewayId, EdgeApplicationsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addCertificates( request, gatewayId, CertificatesIds ):
	delegate = GatewayDelegate()
	responseData = delegate.addCertificates( gatewayId, CertificatesIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeCertificates( request, gatewayId, CertificatesIds ):
	delegate = GatewayDelegate()
	responseData = delegate.removeCertificates( gatewayId, CertificatesIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addNetworkProfiles( request, gatewayId, NetworkProfilesIds ):
	delegate = GatewayDelegate()
	responseData = delegate.addNetworkProfiles( gatewayId, NetworkProfilesIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeNetworkProfiles( request, gatewayId, NetworkProfilesIds ):
	delegate = GatewayDelegate()
	responseData = delegate.removeNetworkProfiles( gatewayId, NetworkProfilesIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

