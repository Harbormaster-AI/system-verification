import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from iotOnDjango.delegates.TelemetrySchemaDelegate import TelemetrySchemaDelegate

 #======================================================================
# 
# Encapsulates data for View TelemetrySchema
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class TelemetrySchemaView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the TelemetrySchema index.")

def get(request, telemetrySchemaId ):
	delegate = TelemetrySchemaDelegate()
	responseData = delegate.get( telemetrySchemaId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def create(request):
	telemetrySchema = json.loads(request.body)
	delegate = TelemetrySchemaDelegate()
	responseData = delegate.createFromJson( telemetrySchema )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def save(request):
	telemetrySchema = json.loads(request.body)
	delegate = TelemetrySchemaDelegate()
	responseData = delegate.save( telemetrySchema )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def delete(request, telemetrySchemaId ):
	delegate = TelemetrySchemaDelegate()
	responseData = delegate.delete( telemetrySchemaId )
	return HttpResponse(responseData, content_type="application/json");

def getAll(request):
	delegate = TelemetrySchemaDelegate()
	responseData = delegate.getAll()
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");


def addStreams( request, telemetrySchemaId, StreamsIds ):
	delegate = TelemetrySchemaDelegate()
	responseData = delegate.addStreams( telemetrySchemaId, StreamsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeStreams( request, telemetrySchemaId, StreamsIds ):
	delegate = TelemetrySchemaDelegate()
	responseData = delegate.removeStreams( telemetrySchemaId, StreamsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

