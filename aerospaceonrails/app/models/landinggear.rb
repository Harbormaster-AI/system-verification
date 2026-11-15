class LandingGear < ApplicationRecord
  enum GEAR_TYPE: [:Tricycle, :Tandem, :Taildragger, :Skid, :Floats, :Retractable]


  has_many :Supplier, class_name: 'Supplier'
  has_many :Variants, class_name: 'AircraftVariant'

end

