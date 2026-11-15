class AirworthinessDirective < ApplicationRecord


  has_many :WorkOrders, class_name: 'MaintenanceWorkOrder'

end

