
class Publisher < ApplicationRecord
  enum PublisherType: [:Site, :App, :Network, :CTVApp]


  has_many :InventorySources, class_name: 'InventorySource'
  has_many :Deals, class_name: 'Deal'
  has_many :CreativeApprovals, class_name: 'CreativeApproval'
  has_many :InsertionOrders, class_name: 'InsertionOrder'
  has_many :RateCards, class_name: 'RateCard'

end
