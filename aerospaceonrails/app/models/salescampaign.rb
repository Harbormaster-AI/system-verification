class SalesCampaign < ApplicationRecord
  enum STATUS: [:Prospecting, :Proposal, :Negotiation, :Won, :Lost]


  has_many :Region, class_name: 'SalesRegion'
  has_many :Operator_, class_name: 'Operator_'
  has_many :Quotes, class_name: 'Quote'

end

