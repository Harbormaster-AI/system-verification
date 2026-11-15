class InventoryItem < ApplicationRecord


  has_many :Component, class_name: 'Component_'
  has_many :Warehouse, class_name: 'Warehouse'

end

