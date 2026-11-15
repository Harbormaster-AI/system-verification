class MaintenanceAppointment < ApplicationRecord
  enum STATUS: [:Scheduled, :InProgress, :Completed, :Cancelled, :Deferred]


  has_many :Aircraft, class_name: 'Aircraft'
  has_many :MroFacility, class_name: 'MROFacility'
  has_many :WorkOrder, class_name: 'MaintenanceWorkOrder'

end

