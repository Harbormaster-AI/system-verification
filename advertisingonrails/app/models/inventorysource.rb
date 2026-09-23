
class InventorySource < ApplicationRecord
  enum Channel: [:Programmatic, :Direct, :Search, :Social, :Email, :Affiliate, :DOOH]
  enum PrimaryFormat: [:Banner, :Video, :Native, :Audio, :Interstitial, :RichMedia, :SearchText, :SocialPost, :CTVVideo]


  has_many :Publisher, class_name: 'Publisher'
  has_many :AdSlots, class_name: 'AdSlot'
  has_many :Deals, class_name: 'Deal'

end
