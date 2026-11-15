class AircraftVariant < ApplicationRecord


  has_many :Model_, class_name: 'AircraftModel'
  has_many :EngineType, class_name: 'EngineType'
  has_many :AvionicsSuite, class_name: 'AvionicsSuite'
  has_many :Apu, class_name: 'APU'
  has_many :LandingGear, class_name: 'LandingGear'
  has_many :CabinLayouts, class_name: 'CabinLayout'
  has_many :Options, class_name: 'AircraftOption'
  has_many :Packages, class_name: 'AircraftPackage'

end

