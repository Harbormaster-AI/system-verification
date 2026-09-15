import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from iotOnDjango.delegates.SensorInstanceDelegate import SensorInstanceDelegate

 #======================================================================
# 
# Encapsulates data for View SensorInstance
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class SensorInstanceView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the SensorInstance index.")

def get(request, sensorInstanceId ):
	delegate = SensorInstanceDelegate()
	responseData = delegate.get( sensorInstanceId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def create(request):
	sensorInstance = json.loads(request.body)
	delegate = SensorInstanceDelegate()
	responseData = delegate.createFromJson( sensorInstance )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def save(request):
	sensorInstance = json.loads(request.body)
	delegate = SensorInstanceDelegate()
	responseData = delegate.save( sensorInstance )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def delete(request, sensorInstanceId ):
	delegate = SensorInstanceDelegate()
	responseData = delegate.delete( sensorInstanceId )
	return HttpResponse(responseData, content_type="application/json");

def getAll(request):
	delegate = SensorInstanceDelegate()
	responseData = delegate.getAll()
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");


def assignDevice( request, sensorInstanceId, DeviceId ):
	delegate = SensorInstanceDelegate()
	responseData = delegate.saveDevice( sensorInstanceId, DeviceId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignDevice( request, sensorInstanceId ):
	delegate = SensorInstanceDelegate()
	responseData = delegate.deleteDevice( sensorInstanceId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addTelemetryStreams( request, sensorInstanceId, TelemetryStreamsIds ):
	delegate = SensorInstanceDelegate()
	responseData = delegate.addTelemetryStreams( sensorInstanceId, TelemetryStreamsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeTelemetryStreams( request, sensorInstanceId, TelemetryStreamsIds ):
	delegate = SensorInstanceDelegate()
	responseData = delegate.removeTelemetryStreams( sensorInstanceId, TelemetryStreamsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

