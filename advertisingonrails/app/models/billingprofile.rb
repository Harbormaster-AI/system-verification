
class BillingProfile < ApplicationRecord
  enum PaymentTerms: [:Prepaid, :NetFifteen, :NetThirty, :NetSixty]


  composed_of :address,
    class_name: "Address",
    mapping: [
      ${$mapping}, 
      ${$mapping}, 
      ${$mapping}, 
      ${$mapping}, 
      %w[address_country country]
    ]

  has_many :Advertiser, class_name: 'Advertiser'
  has_many :PaymentMethods, class_name: 'PaymentMethod'
  has_many :AdAccounts, class_name: 'AdAccount'

end
