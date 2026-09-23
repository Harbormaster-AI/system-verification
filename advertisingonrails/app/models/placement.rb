
class Placement < ApplicationRecord


  composed_of :dateRange,
    class_name: "DateRange",
    mapping: [
      ${$mapping}, 
      %w[dateRange_endDate endDate]
    ]

  has_many :LineItem, class_name: 'LineItem'
  has_many :AdSlot, class_name: 'AdSlot'
  has_many :Deal, class_name: 'Deal'

end
