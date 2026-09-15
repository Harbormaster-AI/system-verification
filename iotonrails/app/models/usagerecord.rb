
class UsageRecord < ApplicationRecord


  has_many :Tenant, class_name: 'Tenant'
  has_many :Device, class_name: 'IoTDevice'
  has_many :ConnectivityPlan, class_name: 'ConnectivityPlan'

end
