
class Deal < ApplicationRecord
  enum DealType: [:OpenAuction, :PrivateAuction, :PreferredDeal, :ProgrammaticGuaranteed]


  composed_of :money,
    class_name: "Money",
    mapping: [
      ${$mapping}, 
      %w[money_currency currency]
    ]

  has_many :Publisher, class_name: 'Publisher'
  has_many :InventorySources, class_name: 'InventorySource'
  has_many :Placements, class_name: 'Placement'

end
