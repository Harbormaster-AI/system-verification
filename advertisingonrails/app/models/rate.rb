
class Rate < ApplicationRecord
  enum AdFormat: [:Banner, :Video, :Native, :Audio, :Interstitial, :RichMedia, :SearchText, :SocialPost, :CTVVideo]
  enum PricingModel: [:CPM, :CPC, :CPA, :CPL, :CPV, :FlatFee]


  composed_of :money,
    class_name: "Money",
    mapping: [
      ${$mapping}, 
      %w[money_currency currency]
    ]

  has_many :RateCard, class_name: 'RateCard'
  has_many :AdSlot, class_name: 'AdSlot'

end
