import json

from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse

from iotOnDjango.delegates.TenantDelegate import TenantDelegate

 #======================================================================
# 
# Encapsulates data for View Tenant
#
# @author Harbormaster Dev Team
#
#======================================================================

#======================================================================
# Class TenantView function declarations
#======================================================================
def index(request):
	return HttpResponse("Hello, world. You're at the Tenant index.")

def get(request, tenantId ):
	delegate = TenantDelegate()
	responseData = delegate.get( tenantId )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def create(request):
	tenant = json.loads(request.body)
	delegate = TenantDelegate()
	responseData = delegate.createFromJson( tenant )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def save(request):
	tenant = json.loads(request.body)
	delegate = TenantDelegate()
	responseData = delegate.save( tenant )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def delete(request, tenantId ):
	delegate = TenantDelegate()
	responseData = delegate.delete( tenantId )
	return HttpResponse(responseData, content_type="application/json");

def getAll(request):
	delegate = TenantDelegate()
	responseData = delegate.getAll()
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");


def addSites( request, tenantId, SitesIds ):
	delegate = TenantDelegate()
	responseData = delegate.addSites( tenantId, SitesIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeSites( request, tenantId, SitesIds ):
	delegate = TenantDelegate()
	responseData = delegate.removeSites( tenantId, SitesIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addUsers( request, tenantId, UsersIds ):
	delegate = TenantDelegate()
	responseData = delegate.addUsers( tenantId, UsersIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeUsers( request, tenantId, UsersIds ):
	delegate = TenantDelegate()
	responseData = delegate.removeUsers( tenantId, UsersIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addDevices( request, tenantId, DevicesIds ):
	delegate = TenantDelegate()
	responseData = delegate.addDevices( tenantId, DevicesIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeDevices( request, tenantId, DevicesIds ):
	delegate = TenantDelegate()
	responseData = delegate.removeDevices( tenantId, DevicesIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addDataRetentionPolicies( request, tenantId, DataRetentionPoliciesIds ):
	delegate = TenantDelegate()
	responseData = delegate.addDataRetentionPolicies( tenantId, DataRetentionPoliciesIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeDataRetentionPolicies( request, tenantId, DataRetentionPoliciesIds ):
	delegate = TenantDelegate()
	responseData = delegate.removeDataRetentionPolicies( tenantId, DataRetentionPoliciesIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addConnectivityPlans( request, tenantId, ConnectivityPlansIds ):
	delegate = TenantDelegate()
	responseData = delegate.addConnectivityPlans( tenantId, ConnectivityPlansIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeConnectivityPlans( request, tenantId, ConnectivityPlansIds ):
	delegate = TenantDelegate()
	responseData = delegate.removeConnectivityPlans( tenantId, ConnectivityPlansIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addSimCards( request, tenantId, SimCardsIds ):
	delegate = TenantDelegate()
	responseData = delegate.addSimCards( tenantId, SimCardsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeSimCards( request, tenantId, SimCardsIds ):
	delegate = TenantDelegate()
	responseData = delegate.removeSimCards( tenantId, SimCardsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addMessagingEndpoints( request, tenantId, MessagingEndpointsIds ):
	delegate = TenantDelegate()
	responseData = delegate.addMessagingEndpoints( tenantId, MessagingEndpointsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeMessagingEndpoints( request, tenantId, MessagingEndpointsIds ):
	delegate = TenantDelegate()
	responseData = delegate.removeMessagingEndpoints( tenantId, MessagingEndpointsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addAccessPolicies( request, tenantId, AccessPoliciesIds ):
	delegate = TenantDelegate()
	responseData = delegate.addAccessPolicies( tenantId, AccessPoliciesIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeAccessPolicies( request, tenantId, AccessPoliciesIds ):
	delegate = TenantDelegate()
	responseData = delegate.removeAccessPolicies( tenantId, AccessPoliciesIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addDeviceGroups( request, tenantId, DeviceGroupsIds ):
	delegate = TenantDelegate()
	responseData = delegate.addDeviceGroups( tenantId, DeviceGroupsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeDeviceGroups( request, tenantId, DeviceGroupsIds ):
	delegate = TenantDelegate()
	responseData = delegate.removeDeviceGroups( tenantId, DeviceGroupsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addAlertRules( request, tenantId, AlertRulesIds ):
	delegate = TenantDelegate()
	responseData = delegate.addAlertRules( tenantId, AlertRulesIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeAlertRules( request, tenantId, AlertRulesIds ):
	delegate = TenantDelegate()
	responseData = delegate.removeAlertRules( tenantId, AlertRulesIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addMaintenanceTickets( request, tenantId, MaintenanceTicketsIds ):
	delegate = TenantDelegate()
	responseData = delegate.addMaintenanceTickets( tenantId, MaintenanceTicketsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeMaintenanceTickets( request, tenantId, MaintenanceTicketsIds ):
	delegate = TenantDelegate()
	responseData = delegate.removeMaintenanceTickets( tenantId, MaintenanceTicketsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def addUsageRecords( request, tenantId, UsageRecordsIds ):
	delegate = TenantDelegate()
	responseData = delegate.addUsageRecords( tenantId, UsageRecordsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

def removeUsageRecords( request, tenantId, UsageRecordsIds ):
	delegate = TenantDelegate()
	responseData = delegate.removeUsageRecords( tenantId, UsageRecordsIds )
	asJson = serializers.serialize("json", responseData)
	return HttpResponse(asJson, content_type="application/json");

