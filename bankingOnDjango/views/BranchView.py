import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from bankingOnDjango.delegates.BranchDelegate import BranchDelegate

 #======================================================================
# 
# Encapsulates data for View Branch
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class BranchView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the Branch index.")


def get(request):
    requestData = json.loads(request.body)
    branchId = requestData["id"]
    delegate = BranchDelegate()
    responseData = delegate.get(branchId)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")

def create(request):
	branch = json.loads(request.body)
	delegate = BranchDelegate()
	responseData = delegate.createFromJson( branch )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def update(request):
	branch = json.loads(request.body)
	delegate = BranchDelegate()
	responseData = delegate.save( branch )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def delete(request):
    requestData = json.loads(request.body)
    branchId = requestData["id"]
    delegate = BranchDelegate()
    responseData = delegate.delete(branchId)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")

def getAll(request):
    delegate = BranchDelegate()
    responseData = delegate.getAll()
    asJson = serializers.serialize("json", responseData)
    return HttpResponse(asJson, content_type="application/json");


    # ---------------------------------------------------------
    # Single association
    # ---------------------------------------------------------
def assignBank(request):
    requestData = json.loads(request.body)
    parentId = requestData["parentId"]
    childId = requestData["childId"]
    delegate = BranchDelegate()
    responseData = delegate.assignBank(parentId,childId)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")

def unassignBank(request):
    requestData = json.loads(request.body)
    parentId = requestData["parentId"]
    childId = requestData["childId"]
    delegate = BranchDelegate()
    responseData = delegate.unassignBank(parentId,childId)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")


    # ---------------------------------------------------------
    # Multiple association
    # ---------------------------------------------------------
def addAccounts(request):
    requestData = json.loads(request.body)
    parentId = requestData["parentId"]
    childIds = requestData["childIds"]
    delegate = BranchDelegate()
    responseData = delegate.addAccounts(parentId,childIds)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")

def removeAccounts(request):
    requestData = json.loads(request.body)
    parentId = requestData["parentId"]
    childIds = requestData["childIds"]
    delegate = BranchDelegate()
    responseData = delegate.removeAccounts(parentId,childIds)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")


def addLoanAccounts(request):
    requestData = json.loads(request.body)
    parentId = requestData["parentId"]
    childIds = requestData["childIds"]
    delegate = BranchDelegate()
    responseData = delegate.addLoanAccounts(parentId,childIds)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")

def removeLoanAccounts(request):
    requestData = json.loads(request.body)
    parentId = requestData["parentId"]
    childIds = requestData["childIds"]
    delegate = BranchDelegate()
    responseData = delegate.removeLoanAccounts(parentId,childIds)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")


def addAtms(request):
    requestData = json.loads(request.body)
    parentId = requestData["parentId"]
    childIds = requestData["childIds"]
    delegate = BranchDelegate()
    responseData = delegate.addAtms(parentId,childIds)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")

def removeAtms(request):
    requestData = json.loads(request.body)
    parentId = requestData["parentId"]
    childIds = requestData["childIds"]
    delegate = BranchDelegate()
    responseData = delegate.removeAtms(parentId,childIds)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")


