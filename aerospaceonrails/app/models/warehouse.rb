class Warehouse < ApplicationRecord


  has_many :InventoryItems, class_name: 'InventoryItem'

end

