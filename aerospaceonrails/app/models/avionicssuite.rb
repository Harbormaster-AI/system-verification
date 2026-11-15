class AvionicsSuite < ApplicationRecord


  has_many :Supplier, class_name: 'Supplier'
  has_many :Variants, class_name: 'AircraftVariant'
  has_many :SoftwareLoads, class_name: 'SoftwareLoad'

end

