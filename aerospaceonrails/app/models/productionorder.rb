class ProductionOrder < ApplicationRecord
  enum STATUS: [:Planned, :Released, :InAssembly, :FlightTest, :Completed]


  has_many :Variant, class_name: 'AircraftVariant'
  has_many :Plant, class_name: 'Plant'
  has_many :AircraftOrder, class_name: 'AircraftOrder'

end

