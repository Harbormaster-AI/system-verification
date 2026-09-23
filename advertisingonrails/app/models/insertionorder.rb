
class InsertionOrder < ApplicationRecord
  enum Status: [:Draft, :Sent, :Executed, :OnHold, :Closed, :Cancelled]


  composed_of :money,
    class_name: "Money",
    mapping: [
      ${$mapping}, 
      %w[money_currency currency]
    ]

  composed_of :dateRange,
    class_name: "DateRange",
    mapping: [
      ${$mapping}, 
      %w[dateRange_endDate endDate]
    ]

  has_many :Advertiser, class_name: 'Advertiser'
  has_many :Agency, class_name: 'Agency'
  has_many :Publisher, class_name: 'Publisher'
  has_many :Campaigns, class_name: 'Campaign'

end
