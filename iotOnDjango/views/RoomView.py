import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from iotOnDjango.delegates.RoomDelegate import RoomDelegate

 #======================================================================
# 
# Encapsulates data for View Room
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class RoomView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the Room index.")

def get(request, roomId ):
	delegate = RoomDelegate()
	responseData = delegate.get( roomId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def create(request):
	room = json.loads(request.body)
	delegate = RoomDelegate()
	responseData = delegate.createFromJson( room )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def save(request):
	room = json.loads(request.body)
	delegate = RoomDelegate()
	responseData = delegate.save( room )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def delete(request, roomId ):
	delegate = RoomDelegate()
	responseData = delegate.delete( roomId )
	return HttpResponse(responseData, content_type="application/json");

def getAll(request):
	delegate = RoomDelegate()
	responseData = delegate.getAll()
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");


def assignFloor( request, roomId, FloorId ):
	delegate = RoomDelegate()
	responseData = delegate.saveFloor( roomId, FloorId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignFloor( request, roomId ):
	delegate = RoomDelegate()
	responseData = delegate.deleteFloor( roomId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addDevices( request, roomId, DevicesIds ):
	delegate = RoomDelegate()
	responseData = delegate.addDevices( roomId, DevicesIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeDevices( request, roomId, DevicesIds ):
	delegate = RoomDelegate()
	responseData = delegate.removeDevices( roomId, DevicesIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addGateways( request, roomId, GatewaysIds ):
	delegate = RoomDelegate()
	responseData = delegate.addGateways( roomId, GatewaysIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeGateways( request, roomId, GatewaysIds ):
	delegate = RoomDelegate()
	responseData = delegate.removeGateways( roomId, GatewaysIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

