class AircraftFamily < ApplicationRecord


  has_many :Program, class_name: 'AircraftProgram'
  has_many :AircraftModels, class_name: 'AircraftModel'

end

