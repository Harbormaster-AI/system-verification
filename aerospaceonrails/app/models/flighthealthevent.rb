class FlightHealthEvent < ApplicationRecord
  enum SEVERITY: [:Info, :Warning, :Critical]


  has_many :ConnectedAircraft, class_name: 'ConnectedAircraft'

end

