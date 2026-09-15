
class Tenant < ApplicationRecord
  enum TenantType: [:Enterprise, :SMB, :ISV, :SystemIntegrator, :Government]


  has_many :Sites, class_name: 'Site'
  has_many :Users, class_name: 'TenantUser'
  has_many :Devices, class_name: 'IoTDevice'
  has_many :DataRetentionPolicies, class_name: 'DataRetentionPolicy'
  has_many :ConnectivityPlans, class_name: 'ConnectivityPlan'
  has_many :SimCards, class_name: 'SimCard'
  has_many :MessagingEndpoints, class_name: 'MessagingEndpoint'
  has_many :AccessPolicies, class_name: 'AccessPolicy'
  has_many :DeviceGroups, class_name: 'DeviceGroup'
  has_many :AlertRules, class_name: 'AlertRule'
  has_many :MaintenanceTickets, class_name: 'MaintenanceTicket'
  has_many :UsageRecords, class_name: 'UsageRecord'

end
