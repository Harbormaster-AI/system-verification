
class MaintenanceTicket < ApplicationRecord
  enum Priority: [:Low, :Medium, :High, :Urgent]
  enum Status: [:Open, :InProgress, :WaitingOnParts, :Closed]


  has_many :Device, class_name: 'IoTDevice'
  has_many :Tenant, class_name: 'Tenant'

end
