class BuildSchedule < ApplicationRecord
  enum STATUS: [:Draft, :Published, :Revised, :Closed]


  has_many :ProductionOrders, class_name: 'ProductionOrder'

end

