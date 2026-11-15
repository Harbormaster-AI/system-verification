class APU < ApplicationRecord


  has_many :Supplier, class_name: 'Supplier'
  has_many :Variants, class_name: 'AircraftVariant'

end

