
class SimCard < ApplicationRecord
  enum Status: [:Active, :Suspended, :Retired]


  has_many :NetworkProfiles, class_name: 'NetworkProfile'
  has_many :Tenant, class_name: 'Tenant'
  has_many :ConnectivityPlan, class_name: 'ConnectivityPlan'

end
