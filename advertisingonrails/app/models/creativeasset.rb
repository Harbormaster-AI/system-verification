
class CreativeAsset < ApplicationRecord
  enum CreativeType: [:Image, :Video, :HTML5, :Audio]
  enum AdFormat: [:Banner, :Video, :Native, :Audio, :Interstitial, :RichMedia, :SearchText, :SocialPost, :CTVVideo]


  composed_of :uRL,
    class_name: "URL",
    mapping: [
      %w[uRL_href href]
    ]

  composed_of :uRL,
    class_name: "URL",
    mapping: [
      %w[uRL_href href]
    ]

  has_many :Files, class_name: 'CreativeFile'
  has_many :Approvals, class_name: 'CreativeApproval'
  has_many :Variations, class_name: 'CreativeVariation'
  has_many :LineItems, class_name: 'LineItem'

end
