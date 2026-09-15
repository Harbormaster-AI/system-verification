import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from iotOnDjango.delegates.DeviceCertificateDelegate import DeviceCertificateDelegate

 #======================================================================
# 
# Encapsulates data for View DeviceCertificate
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class DeviceCertificateView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the DeviceCertificate index.")

def get(request, deviceCertificateId ):
	delegate = DeviceCertificateDelegate()
	responseData = delegate.get( deviceCertificateId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def create(request):
	deviceCertificate = json.loads(request.body)
	delegate = DeviceCertificateDelegate()
	responseData = delegate.createFromJson( deviceCertificate )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def save(request):
	deviceCertificate = json.loads(request.body)
	delegate = DeviceCertificateDelegate()
	responseData = delegate.save( deviceCertificate )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def delete(request, deviceCertificateId ):
	delegate = DeviceCertificateDelegate()
	responseData = delegate.delete( deviceCertificateId )
	return HttpResponse(responseData, content_type="application/json");

def getAll(request):
	delegate = DeviceCertificateDelegate()
	responseData = delegate.getAll()
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");


def assignDevice( request, deviceCertificateId, DeviceId ):
	delegate = DeviceCertificateDelegate()
	responseData = delegate.saveDevice( deviceCertificateId, DeviceId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignDevice( request, deviceCertificateId ):
	delegate = DeviceCertificateDelegate()
	responseData = delegate.deleteDevice( deviceCertificateId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def assignGateway( request, deviceCertificateId, GatewayId ):
	delegate = DeviceCertificateDelegate()
	responseData = delegate.saveGateway( deviceCertificateId, GatewayId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignGateway( request, deviceCertificateId ):
	delegate = DeviceCertificateDelegate()
	responseData = delegate.deleteGateway( deviceCertificateId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

