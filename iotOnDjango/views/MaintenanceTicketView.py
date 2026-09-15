import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from iotOnDjango.delegates.MaintenanceTicketDelegate import MaintenanceTicketDelegate

 #======================================================================
# 
# Encapsulates data for View MaintenanceTicket
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class MaintenanceTicketView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the MaintenanceTicket index.")

def get(request, maintenanceTicketId ):
	delegate = MaintenanceTicketDelegate()
	responseData = delegate.get( maintenanceTicketId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def create(request):
	maintenanceTicket = json.loads(request.body)
	delegate = MaintenanceTicketDelegate()
	responseData = delegate.createFromJson( maintenanceTicket )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def save(request):
	maintenanceTicket = json.loads(request.body)
	delegate = MaintenanceTicketDelegate()
	responseData = delegate.save( maintenanceTicket )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def delete(request, maintenanceTicketId ):
	delegate = MaintenanceTicketDelegate()
	responseData = delegate.delete( maintenanceTicketId )
	return HttpResponse(responseData, content_type="application/json");

def getAll(request):
	delegate = MaintenanceTicketDelegate()
	responseData = delegate.getAll()
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");


def assignDevice( request, maintenanceTicketId, DeviceId ):
	delegate = MaintenanceTicketDelegate()
	responseData = delegate.saveDevice( maintenanceTicketId, DeviceId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignDevice( request, maintenanceTicketId ):
	delegate = MaintenanceTicketDelegate()
	responseData = delegate.deleteDevice( maintenanceTicketId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def assignTenant( request, maintenanceTicketId, TenantId ):
	delegate = MaintenanceTicketDelegate()
	responseData = delegate.saveTenant( maintenanceTicketId, TenantId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignTenant( request, maintenanceTicketId ):
	delegate = MaintenanceTicketDelegate()
	responseData = delegate.deleteTenant( maintenanceTicketId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

