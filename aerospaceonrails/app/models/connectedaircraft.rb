class ConnectedAircraft < ApplicationRecord
  enum CONNECTIVITY_STATUS: [:Offline, :Online, :Degraded]


  has_many :Aircraft, class_name: 'Aircraft'
  has_many :FlightHealthEvents, class_name: 'FlightHealthEvent'
  has_many :SoftwareLoads, class_name: 'SoftwareLoad'

end

