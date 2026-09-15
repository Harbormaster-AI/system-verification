import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from iotOnDjango.delegates.TelemetryStreamDelegate import TelemetryStreamDelegate

 #======================================================================
# 
# Encapsulates data for View TelemetryStream
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class TelemetryStreamView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the TelemetryStream index.")

def get(request, telemetryStreamId ):
	delegate = TelemetryStreamDelegate()
	responseData = delegate.get( telemetryStreamId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def create(request):
	telemetryStream = json.loads(request.body)
	delegate = TelemetryStreamDelegate()
	responseData = delegate.createFromJson( telemetryStream )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def save(request):
	telemetryStream = json.loads(request.body)
	delegate = TelemetryStreamDelegate()
	responseData = delegate.save( telemetryStream )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def delete(request, telemetryStreamId ):
	delegate = TelemetryStreamDelegate()
	responseData = delegate.delete( telemetryStreamId )
	return HttpResponse(responseData, content_type="application/json");

def getAll(request):
	delegate = TelemetryStreamDelegate()
	responseData = delegate.getAll()
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");


def assignDevice( request, telemetryStreamId, DeviceId ):
	delegate = TelemetryStreamDelegate()
	responseData = delegate.saveDevice( telemetryStreamId, DeviceId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignDevice( request, telemetryStreamId ):
	delegate = TelemetryStreamDelegate()
	responseData = delegate.deleteDevice( telemetryStreamId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def assignSensor( request, telemetryStreamId, SensorId ):
	delegate = TelemetryStreamDelegate()
	responseData = delegate.saveSensor( telemetryStreamId, SensorId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignSensor( request, telemetryStreamId ):
	delegate = TelemetryStreamDelegate()
	responseData = delegate.deleteSensor( telemetryStreamId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def assignSchema( request, telemetryStreamId, SchemaId ):
	delegate = TelemetryStreamDelegate()
	responseData = delegate.saveSchema( telemetryStreamId, SchemaId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignSchema( request, telemetryStreamId ):
	delegate = TelemetryStreamDelegate()
	responseData = delegate.deleteSchema( telemetryStreamId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def assignMessagingEndpoint( request, telemetryStreamId, MessagingEndpointId ):
	delegate = TelemetryStreamDelegate()
	responseData = delegate.saveMessagingEndpoint( telemetryStreamId, MessagingEndpointId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignMessagingEndpoint( request, telemetryStreamId ):
	delegate = TelemetryStreamDelegate()
	responseData = delegate.deleteMessagingEndpoint( telemetryStreamId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def assignRetentionPolicy( request, telemetryStreamId, RetentionPolicyId ):
	delegate = TelemetryStreamDelegate()
	responseData = delegate.saveRetentionPolicy( telemetryStreamId, RetentionPolicyId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignRetentionPolicy( request, telemetryStreamId ):
	delegate = TelemetryStreamDelegate()
	responseData = delegate.deleteRetentionPolicy( telemetryStreamId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

