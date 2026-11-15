class AircraftOrder < ApplicationRecord
  enum STATUS: [:Draft, :Committed, :InProduction, :Delivered, :Cancelled]


  composed_of :money,
    class_name: "Money",
    mapping: [
      %w[money_amount amount], 
      %w[money_currency currency]
    ]

  has_many :Operator_, class_name: 'Operator_'
  has_many :Variant, class_name: 'AircraftVariant'
  has_many :Quote, class_name: 'Quote'
  has_many :PurchaseAgreement, class_name: 'PurchaseAgreement'

end

