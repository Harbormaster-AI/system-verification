from django.urls import path
from iotOnDjango.views import TenantView

urlpatterns = [
    path('', TenantView.index, name='index'),
	path('create', TenantView.get, name='create'),
	path('get/<int:tenantId>/', TenantView.get, name='get'),
	path('save', TenantView.save, name='save'),
	path('getAll', TenantView.getAll, name='getAll'),
	path('delete/<int:tenantId>/', TenantView.delete, name='delete'),

	path('addSites/<int:tenantId>/<SitesIds>/', TenantView.addSites, name='addSites'),
	path('removeSites/<int:tenantId>/<SitesIds>/', TenantView.removeSites, name='removeSites'),

	path('addUsers/<int:tenantId>/<UsersIds>/', TenantView.addUsers, name='addUsers'),
	path('removeUsers/<int:tenantId>/<UsersIds>/', TenantView.removeUsers, name='removeUsers'),

	path('addDevices/<int:tenantId>/<DevicesIds>/', TenantView.addDevices, name='addDevices'),
	path('removeDevices/<int:tenantId>/<DevicesIds>/', TenantView.removeDevices, name='removeDevices'),

	path('addDataRetentionPolicies/<int:tenantId>/<DataRetentionPoliciesIds>/', TenantView.addDataRetentionPolicies, name='addDataRetentionPolicies'),
	path('removeDataRetentionPolicies/<int:tenantId>/<DataRetentionPoliciesIds>/', TenantView.removeDataRetentionPolicies, name='removeDataRetentionPolicies'),

	path('addConnectivityPlans/<int:tenantId>/<ConnectivityPlansIds>/', TenantView.addConnectivityPlans, name='addConnectivityPlans'),
	path('removeConnectivityPlans/<int:tenantId>/<ConnectivityPlansIds>/', TenantView.removeConnectivityPlans, name='removeConnectivityPlans'),

	path('addSimCards/<int:tenantId>/<SimCardsIds>/', TenantView.addSimCards, name='addSimCards'),
	path('removeSimCards/<int:tenantId>/<SimCardsIds>/', TenantView.removeSimCards, name='removeSimCards'),

	path('addMessagingEndpoints/<int:tenantId>/<MessagingEndpointsIds>/', TenantView.addMessagingEndpoints, name='addMessagingEndpoints'),
	path('removeMessagingEndpoints/<int:tenantId>/<MessagingEndpointsIds>/', TenantView.removeMessagingEndpoints, name='removeMessagingEndpoints'),

	path('addAccessPolicies/<int:tenantId>/<AccessPoliciesIds>/', TenantView.addAccessPolicies, name='addAccessPolicies'),
	path('removeAccessPolicies/<int:tenantId>/<AccessPoliciesIds>/', TenantView.removeAccessPolicies, name='removeAccessPolicies'),

	path('addDeviceGroups/<int:tenantId>/<DeviceGroupsIds>/', TenantView.addDeviceGroups, name='addDeviceGroups'),
	path('removeDeviceGroups/<int:tenantId>/<DeviceGroupsIds>/', TenantView.removeDeviceGroups, name='removeDeviceGroups'),

	path('addAlertRules/<int:tenantId>/<AlertRulesIds>/', TenantView.addAlertRules, name='addAlertRules'),
	path('removeAlertRules/<int:tenantId>/<AlertRulesIds>/', TenantView.removeAlertRules, name='removeAlertRules'),

	path('addMaintenanceTickets/<int:tenantId>/<MaintenanceTicketsIds>/', TenantView.addMaintenanceTickets, name='addMaintenanceTickets'),
	path('removeMaintenanceTickets/<int:tenantId>/<MaintenanceTicketsIds>/', TenantView.removeMaintenanceTickets, name='removeMaintenanceTickets'),

	path('addUsageRecords/<int:tenantId>/<UsageRecordsIds>/', TenantView.addUsageRecords, name='addUsageRecords'),
	path('removeUsageRecords/<int:tenantId>/<UsageRecordsIds>/', TenantView.removeUsageRecords, name='removeUsageRecords'),

]
