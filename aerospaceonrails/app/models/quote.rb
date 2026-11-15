class Quote < ApplicationRecord


  composed_of :money,
    class_name: "Money",
    mapping: [
      %w[money_amount amount], 
      %w[money_currency currency]
    ]

  has_many :AircraftOrder, class_name: 'AircraftOrder'

end

