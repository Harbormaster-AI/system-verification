import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from bankingOnDjango.delegates.RepaymentScheduleDelegate import RepaymentScheduleDelegate

 #======================================================================
# 
# Encapsulates data for View RepaymentSchedule
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class RepaymentScheduleView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the RepaymentSchedule index.")


def get(request):
    requestData = json.loads(request.body)
    repaymentScheduleId = requestData["id"]
    delegate = RepaymentScheduleDelegate()
    responseData = delegate.get(repaymentScheduleId)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")

def create(request):
	repaymentSchedule = json.loads(request.body)
	delegate = RepaymentScheduleDelegate()
	responseData = delegate.createFromJson( repaymentSchedule )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def update(request):
	repaymentSchedule = json.loads(request.body)
	delegate = RepaymentScheduleDelegate()
	responseData = delegate.save( repaymentSchedule )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def delete(request):
    requestData = json.loads(request.body)
    repaymentScheduleId = requestData["id"]
    delegate = RepaymentScheduleDelegate()
    responseData = delegate.delete(repaymentScheduleId)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")

def getAll(request):
    delegate = RepaymentScheduleDelegate()
    responseData = delegate.getAll()
    asJson = serializers.serialize("json", responseData)
    return HttpResponse(asJson, content_type="application/json");


    # ---------------------------------------------------------
    # Single association
    # ---------------------------------------------------------
def assignLoanAccount(request):
    requestData = json.loads(request.body)
    parentId = requestData["parentId"]
    childId = requestData["childId"]
    delegate = RepaymentScheduleDelegate()
    responseData = delegate.assignLoanAccount(parentId,childId)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")

def unassignLoanAccount(request):
    requestData = json.loads(request.body)
    parentId = requestData["parentId"]
    childId = requestData["childId"]
    delegate = RepaymentScheduleDelegate()
    responseData = delegate.unassignLoanAccount(parentId,childId)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")
def assignPayment(request):
    requestData = json.loads(request.body)
    parentId = requestData["parentId"]
    childId = requestData["childId"]
    delegate = RepaymentScheduleDelegate()
    responseData = delegate.assignPayment(parentId,childId)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")

def unassignPayment(request):
    requestData = json.loads(request.body)
    parentId = requestData["parentId"]
    childId = requestData["childId"]
    delegate = RepaymentScheduleDelegate()
    responseData = delegate.unassignPayment(parentId,childId)
    asJson = serializers.serialize("json",responseData)
    return HttpResponse(asJson,content_type="application/json")


    # ---------------------------------------------------------
    # Multiple association
    # ---------------------------------------------------------
