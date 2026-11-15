class Operator_ < ApplicationRecord
  enum OPERATOR_TYPE: [:Airline, :Cargo, :Government, :Private, :Lessor]


  has_many :AircraftOrders, class_name: 'AircraftOrder'
  has_many :OperatedAircraft, class_name: 'Aircraft'
  has_many :SalesRegion, class_name: 'SalesRegion'

end

