class AircraftPackage < ApplicationRecord
  enum PACKAGE_TYPE: [:PerformancePack, :CabinPack, :ConnectivityPack, :CompliancePack]


  has_many :Options, class_name: 'AircraftOption'
  has_many :Variants, class_name: 'AircraftVariant'

end

