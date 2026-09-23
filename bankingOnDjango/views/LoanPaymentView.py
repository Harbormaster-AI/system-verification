import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from bankingOnDjango.delegates.LoanPaymentDelegate import LoanPaymentDelegate

# ======================================================================
#
# Encapsulates data for View LoanPayment
#
# @author Harbormaster Dev Team
#
# ======================================================================


# ======================================================================
# Class LoanPaymentView function declarations
# ======================================================================
def index(request):
    return HttpResponse("Hello, world. You're at the LoanPayment index.")


def get(request):
    request_data = json.loads(request.body)
    loanPayment_id = request_data["id"]
    delegate = LoanPaymentDelegate()
    request_data = delegate.get(loanPayment_id)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def create(request):
    loanPayment = json.loads(request.body)
    delegate = LoanPaymentDelegate()
    request_data = delegate.createFromJson(loanPayment)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def update(request):
    loanPayment = json.loads(request.body)
    delegate = LoanPaymentDelegate()
    request_data = delegate.save(loanPayment)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def delete(request):
    request_data = json.loads(request.body)
    loanPayment_id = request_data["id"]
    delegate = LoanPaymentDelegate()
    request_data = delegate.delete(loanPayment_id)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def getAll(request):
    delegate = LoanPaymentDelegate()
    request_data = delegate.getAll()
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")

    # ---------------------------------------------------------
    # Single association
    # ---------------------------------------------------------


def assignLoanAccount(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = LoanPaymentDelegate()
    request_data = delegate.assignLoanAccount(parent_id, childId)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def unassignLoanAccount(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = LoanPaymentDelegate()
    request_data = delegate.unassignLoanAccount(parent_id, childId)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def assignTransaction(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = LoanPaymentDelegate()
    request_data = delegate.assignTransaction(parent_id, childId)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def unassignTransaction(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = LoanPaymentDelegate()
    request_data = delegate.unassignTransaction(parent_id, childId)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")

    # ---------------------------------------------------------
    # Multiple association
    # ---------------------------------------------------------
