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
    request_data = json.loads(request.body)
    repaymentSchedule_id = request_data["id"]
    delegate = RepaymentScheduleDelegate()
    request_data = delegate.get(repaymentSchedule_id)
    as_json = serializers.serialize("json",request_data)
    return HttpResponse(as_json,content_type="application/json")

def create(request):
	repaymentSchedule = json.loads(request.body)
	delegate = RepaymentScheduleDelegate()
	request_data = delegate.createFromJson( repaymentSchedule )
	as_json = serializers.serialize("json", request_data)
	return HttpResponse(as_json, content_type="application/json");

def update(request):
	repaymentSchedule = json.loads(request.body)
	delegate = RepaymentScheduleDelegate()
	request_data = delegate.save( repaymentSchedule )
	as_json = serializers.serialize("json", request_data)
	return HttpResponse(as_json, content_type="application/json");

def delete(request):
    request_data = json.loads(request.body)
    repaymentSchedule_id = request_data["id"]
    delegate = RepaymentScheduleDelegate()
    request_data = delegate.delete(repaymentSchedule_id)
    as_json = serializers.serialize("json",request_data)
    return HttpResponse(as_json,content_type="application/json")

def getAll(request):
    delegate = RepaymentScheduleDelegate()
    request_data = delegate.getAll()
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json");


    # ---------------------------------------------------------
    # Single association
    # ---------------------------------------------------------
def assignLoanAccount(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = RepaymentScheduleDelegate()
    request_data = delegate.assignLoanAccount(parent_id,childId)
    as_json = serializers.serialize("json",request_data)
    return HttpResponse(as_json,content_type="application/json")

def unassignLoanAccount(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = RepaymentScheduleDelegate()
    request_data = delegate.unassignLoanAccount(parent_id,childId)
    as_json = serializers.serialize("json",request_data)
    return HttpResponse(as_json,content_type="application/json")
def assignPayment(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = RepaymentScheduleDelegate()
    request_data = delegate.assignPayment(parent_id,childId)
    as_json = serializers.serialize("json",request_data)
    return HttpResponse(as_json,content_type="application/json")

def unassignPayment(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = RepaymentScheduleDelegate()
    request_data = delegate.unassignPayment(parent_id,childId)
    as_json = serializers.serialize("json",request_data)
    return HttpResponse(as_json,content_type="application/json")


    # ---------------------------------------------------------
    # Multiple association
    # ---------------------------------------------------------
