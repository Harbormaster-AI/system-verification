import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from iotOnDjango.delegates.HardwareModuleDelegate import HardwareModuleDelegate

 #======================================================================
# 
# Encapsulates data for View HardwareModule
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class HardwareModuleView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the HardwareModule index.")

def get(request, hardwareModuleId ):
	delegate = HardwareModuleDelegate()
	responseData = delegate.get( hardwareModuleId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def create(request):
	hardwareModule = json.loads(request.body)
	delegate = HardwareModuleDelegate()
	responseData = delegate.createFromJson( hardwareModule )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def save(request):
	hardwareModule = json.loads(request.body)
	delegate = HardwareModuleDelegate()
	responseData = delegate.save( hardwareModule )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def delete(request, hardwareModuleId ):
	delegate = HardwareModuleDelegate()
	responseData = delegate.delete( hardwareModuleId )
	return HttpResponse(responseData, content_type="application/json");

def getAll(request):
	delegate = HardwareModuleDelegate()
	responseData = delegate.getAll()
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");


def assignVendor( request, hardwareModuleId, VendorId ):
	delegate = HardwareModuleDelegate()
	responseData = delegate.saveVendor( hardwareModuleId, VendorId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignVendor( request, hardwareModuleId ):
	delegate = HardwareModuleDelegate()
	responseData = delegate.deleteVendor( hardwareModuleId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

