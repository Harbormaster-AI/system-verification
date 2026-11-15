class AircraftOption < ApplicationRecord
  enum OPTION_CATEGORY: [:Cabin, :Connectivity, :Safety, :Performance, :Paint, :FlightDeck]


  has_many :Variants, class_name: 'AircraftVariant'
  has_many :Packages, class_name: 'AircraftPackage'

end

