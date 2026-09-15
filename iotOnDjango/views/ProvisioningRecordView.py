import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from iotOnDjango.delegates.ProvisioningRecordDelegate import ProvisioningRecordDelegate

 #======================================================================
# 
# Encapsulates data for View ProvisioningRecord
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class ProvisioningRecordView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the ProvisioningRecord index.")

def get(request, provisioningRecordId ):
	delegate = ProvisioningRecordDelegate()
	responseData = delegate.get( provisioningRecordId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def create(request):
	provisioningRecord = json.loads(request.body)
	delegate = ProvisioningRecordDelegate()
	responseData = delegate.createFromJson( provisioningRecord )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def save(request):
	provisioningRecord = json.loads(request.body)
	delegate = ProvisioningRecordDelegate()
	responseData = delegate.save( provisioningRecord )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def delete(request, provisioningRecordId ):
	delegate = ProvisioningRecordDelegate()
	responseData = delegate.delete( provisioningRecordId )
	return HttpResponse(responseData, content_type="application/json");

def getAll(request):
	delegate = ProvisioningRecordDelegate()
	responseData = delegate.getAll()
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");


def assignDevice( request, provisioningRecordId, DeviceId ):
	delegate = ProvisioningRecordDelegate()
	responseData = delegate.saveDevice( provisioningRecordId, DeviceId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignDevice( request, provisioningRecordId ):
	delegate = ProvisioningRecordDelegate()
	responseData = delegate.deleteDevice( provisioningRecordId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def assignCertificate( request, provisioningRecordId, CertificateId ):
	delegate = ProvisioningRecordDelegate()
	responseData = delegate.saveCertificate( provisioningRecordId, CertificateId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignCertificate( request, provisioningRecordId ):
	delegate = ProvisioningRecordDelegate()
	responseData = delegate.deleteCertificate( provisioningRecordId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def assignTenant( request, provisioningRecordId, TenantId ):
	delegate = ProvisioningRecordDelegate()
	responseData = delegate.saveTenant( provisioningRecordId, TenantId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignTenant( request, provisioningRecordId ):
	delegate = ProvisioningRecordDelegate()
	responseData = delegate.deleteTenant( provisioningRecordId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

