
class GeoRegion < ApplicationRecord
  enum RegionType: [:Country, :State, :Province, :City, :DMA, :PostalCode]


  has_many :Parent, class_name: 'GeoRegion'
  has_many :Children, class_name: 'GeoRegion'

end
