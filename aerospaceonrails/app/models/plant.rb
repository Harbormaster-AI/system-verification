class Plant < ApplicationRecord


  composed_of :address,
    class_name: "Address",
    mapping: [
      %w[address_street street], 
      %w[address_city city], 
      %w[address_state state], 
      %w[address_postal_code postal_code], 
      %w[address_country country]
    ]

  has_many :Manufacturer, class_name: 'AerospaceManufacturer'
  has_many :ProductionLines, class_name: 'ProductionLine'
  has_many :Warehouses, class_name: 'Warehouse'

end

