class MROFacility < ApplicationRecord


  composed_of :address,
    class_name: "Address",
    mapping: [
      %w[address_street street], 
      %w[address_city city], 
      %w[address_state state], 
      %w[address_postal_code postal_code], 
      %w[address_country country]
    ]

  has_many :Appointments, class_name: 'MaintenanceAppointment'
  has_many :WorkOrders, class_name: 'MaintenanceWorkOrder'

end

