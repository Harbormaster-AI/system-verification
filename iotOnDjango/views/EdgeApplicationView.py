import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from iotOnDjango.delegates.EdgeApplicationDelegate import EdgeApplicationDelegate

 #======================================================================
# 
# Encapsulates data for View EdgeApplication
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class EdgeApplicationView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the EdgeApplication index.")

def get(request, edgeApplicationId ):
	delegate = EdgeApplicationDelegate()
	responseData = delegate.get( edgeApplicationId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def create(request):
	edgeApplication = json.loads(request.body)
	delegate = EdgeApplicationDelegate()
	responseData = delegate.createFromJson( edgeApplication )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def save(request):
	edgeApplication = json.loads(request.body)
	delegate = EdgeApplicationDelegate()
	responseData = delegate.save( edgeApplication )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def delete(request, edgeApplicationId ):
	delegate = EdgeApplicationDelegate()
	responseData = delegate.delete( edgeApplicationId )
	return HttpResponse(responseData, content_type="application/json");

def getAll(request):
	delegate = EdgeApplicationDelegate()
	responseData = delegate.getAll()
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");


def assignGateway( request, edgeApplicationId, GatewayId ):
	delegate = EdgeApplicationDelegate()
	responseData = delegate.saveGateway( edgeApplicationId, GatewayId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignGateway( request, edgeApplicationId ):
	delegate = EdgeApplicationDelegate()
	responseData = delegate.deleteGateway( edgeApplicationId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

