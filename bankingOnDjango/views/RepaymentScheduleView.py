import json

from django.core import serializers
from django.http import HttpResponse

from bankingOnDjango.delegates.RepaymentScheduleDelegate import (
    RepaymentScheduleDelegate,
)

# ======================================================================
#
# Encapsulates data for View RepaymentSchedule
#
# @author Harbormaster Dev Team
#
# ======================================================================


# ======================================================================
# Class RepaymentScheduleView function declarations
# ======================================================================
def index(request):
    return HttpResponse("Hello, world. You're at the RepaymentSchedule index.")


def get(request):
    request_data = json.loads(request.body)
    repayment_schedule_id = request_data["id"]
    delegate = RepaymentScheduleDelegate()
    request_data = delegate.get(repayment_schedule_id)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def create(request):
    repayment_schedule = json.loads(request.body)
    delegate = RepaymentScheduleDelegate()
    request_data = delegate.createFromJson(repayment_schedule)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def update(request):
    repayment_schedule = json.loads(request.body)
    delegate = RepaymentScheduleDelegate()
    request_data = delegate.save(repayment_schedule)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def delete(request):
    request_data = json.loads(request.body)
    repayment_schedule_id = request_data["id"]
    delegate = RepaymentScheduleDelegate()
    request_data = delegate.delete(repayment_schedule_id)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def getAll(request):
    delegate = RepaymentScheduleDelegate()
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
    delegate = RepaymentScheduleDelegate()
    request_data = delegate.assignLoanAccount(parent_id, child_id)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def unassignLoanAccount(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = RepaymentScheduleDelegate()
    request_data = delegate.unassignLoanAccount(parent_id, child_id)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def assignPayment(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = RepaymentScheduleDelegate()
    request_data = delegate.assignPayment(parent_id, child_id)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")


def unassignPayment(request):
    request_data = json.loads(request.body)
    parent_id = request_data["parent_id"]
    child_id = request_data["childId"]
    delegate = RepaymentScheduleDelegate()
    request_data = delegate.unassignPayment(parent_id, child_id)
    as_json = serializers.serialize("json", request_data)
    return HttpResponse(as_json, content_type="application/json")

    # ---------------------------------------------------------
    # Multiple association
    # ---------------------------------------------------------
