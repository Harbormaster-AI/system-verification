class EngineType < ApplicationRecord
  enum CATEGORY: [:Turbofan, :Turboprop, :Turbojet, :Piston, :Electric, :Rocket]


  has_many :Supplier, class_name: 'Supplier'
  has_many :CompatibleModels, class_name: 'AircraftModel'

end

