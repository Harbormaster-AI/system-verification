class Aircraft < ApplicationRecord


  composed_of :m_s_n,
    class_name: "MSN",
    mapping: [
      %w[m_s_n_value value]
    ]

  has_many :Variant, class_name: 'AircraftVariant'
  has_many :Operator_, class_name: 'Operator_'
  has_many :Registration, class_name: 'Registration'
  has_many :Warranty, class_name: 'Warranty'
  has_many :MaintenanceRecords, class_name: 'MaintenanceWorkOrder'
  has_many :ConnectedAircraft, class_name: 'ConnectedAircraft'
  has_many :CabinLayout, class_name: 'CabinLayout'

end

