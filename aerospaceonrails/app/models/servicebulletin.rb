class ServiceBulletin < ApplicationRecord
  enum CATEGORY: [:Recommended, :Optional, :Alert, :Mandatory]


  has_many :WorkOrders, class_name: 'MaintenanceWorkOrder'
  has_many :Variants, class_name: 'AircraftVariant'

end

