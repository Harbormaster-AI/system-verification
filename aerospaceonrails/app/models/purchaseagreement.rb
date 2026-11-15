class PurchaseAgreement < ApplicationRecord


  has_many :AircraftOrder, class_name: 'AircraftOrder'

end

