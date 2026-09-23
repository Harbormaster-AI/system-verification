
class AdSlot < ApplicationRecord
  enum Format: [:Banner, :Video, :Native, :Audio, :Interstitial, :RichMedia, :SearchText, :SocialPost, :CTVVideo]


  composed_of :money,
    class_name: "Money",
    mapping: [
      ${$mapping}, 
      %w[money_currency currency]
    ]

  has_many :InventorySource, class_name: 'InventorySource'
  has_many :Placements, class_name: 'Placement'
  has_many :Rates, class_name: 'Rate'

end
