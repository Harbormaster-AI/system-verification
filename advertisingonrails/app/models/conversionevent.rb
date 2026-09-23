
class ConversionEvent < ApplicationRecord
  enum EventType: [:Lead, :Purchase, :Signup, :AddToCart, :ViewContent, :AppInstall]
  enum AttributionModel: [:LastClick, :FirstTouch, :Linear, :TimeDecay, :PositionBased, :DataDriven]


  composed_of :money,
    class_name: "Money",
    mapping: [
      ${$mapping}, 
      %w[money_currency currency]
    ]

  has_many :Campaign, class_name: 'Campaign'
  has_many :LineItem, class_name: 'LineItem'
  has_many :TrackingPixel, class_name: 'TrackingPixel'

end
