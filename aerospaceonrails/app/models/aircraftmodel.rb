class AircraftModel < ApplicationRecord
  enum AIRCRAFT_TYPE: [:NarrowBody, :WideBody, :RegionalJet, :Turboprop, :BusinessJet, :Helicopter, :eVTOL, :CargoPlane]


  has_many :Family, class_name: 'AircraftFamily'
  has_many :Variants, class_name: 'AircraftVariant'
  has_many :EngineTypes, class_name: 'EngineType'

end

