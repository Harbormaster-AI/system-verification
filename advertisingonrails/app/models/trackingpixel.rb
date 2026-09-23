
class TrackingPixel < ApplicationRecord
  enum EventType: [:Lead, :Purchase, :Signup, :AddToCart, :ViewContent, :AppInstall]
  enum PixelType: [:Image, :JavaScript, :ServerSide]


  composed_of :uRL,
    class_name: "URL",
    mapping: [
      %w[uRL_href href]
    ]

  has_many :Campaign, class_name: 'Campaign'
  has_many :Advertiser, class_name: 'Advertiser'
  has_many :ConversionEvents, class_name: 'ConversionEvent'

end
