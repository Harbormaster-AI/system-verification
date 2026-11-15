class Component_ < ApplicationRecord
  enum COMPONENT_CATEGORY: [:Structure, :System, :Avionics, :Interior, :LandingGear, :Powerplant, :Consumable]
  enum SERIALIZATION_METHOD: [:Serialized, :LotTracked, :None]


  has_many :Supplier, class_name: 'Supplier'

end

