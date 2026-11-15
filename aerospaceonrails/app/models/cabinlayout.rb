class CabinLayout < ApplicationRecord


  has_many :Variant, class_name: 'AircraftVariant'
  has_many :Aircraft, class_name: 'Aircraft'
  has_many :Options, class_name: 'AircraftOption'

end

