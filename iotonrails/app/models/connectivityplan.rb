
class ConnectivityPlan < ApplicationRecord


  has_many :SimCards, class_name: 'SimCard'
  has_many :Tenant, class_name: 'Tenant'

end
