import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from iotOnDjango.delegates.FloorDelegate import FloorDelegate

 #======================================================================
# 
# Encapsulates data for View Floor
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class FloorView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the Floor index.")

def get(request, floorId ):
	delegate = FloorDelegate()
	responseData = delegate.get( floorId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def create(request):
	floor = json.loads(request.body)
	delegate = FloorDelegate()
	responseData = delegate.createFromJson( floor )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def save(request):
	floor = json.loads(request.body)
	delegate = FloorDelegate()
	responseData = delegate.save( floor )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def delete(request, floorId ):
	delegate = FloorDelegate()
	responseData = delegate.delete( floorId )
	return HttpResponse(responseData, content_type="application/json");

def getAll(request):
	delegate = FloorDelegate()
	responseData = delegate.getAll()
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");


def assignBuilding( request, floorId, BuildingId ):
	delegate = FloorDelegate()
	responseData = delegate.saveBuilding( floorId, BuildingId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");
	
def unassignBuilding( request, floorId ):
	delegate = FloorDelegate()
	responseData = delegate.deleteBuilding( floorId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addRooms( request, floorId, RoomsIds ):
	delegate = FloorDelegate()
	responseData = delegate.addRooms( floorId, RoomsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeRooms( request, floorId, RoomsIds ):
	delegate = FloorDelegate()
	responseData = delegate.removeRooms( floorId, RoomsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

