class SoftwareLoad < ApplicationRecord
  enum LOAD_TYPE: [:FlightDeckSoftware, :MaintenanceTools, :CabinIFE, :ConnectivityModem]


  has_many :ConnectedAircraft, class_name: 'ConnectedAircraft'
  has_many :AvionicsSuite, class_name: 'AvionicsSuite'

end

