
class Report < ApplicationRecord
  enum ReportType: [:Performance, :Delivery, :Inventory, :Billing]


  composed_of :uRL,
    class_name: "URL",
    mapping: [
      %w[uRL_href href]
    ]

  has_many :AdAccount, class_name: 'AdAccount'
  has_many :Campaign, class_name: 'Campaign'
  has_many :LineItem, class_name: 'LineItem'

end
