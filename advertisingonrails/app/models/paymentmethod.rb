
class PaymentMethod < ApplicationRecord
  enum MethodType: [:CreditCard, :Invoice, :Wire, :ACH]


  composed_of :address,
    class_name: "Address",
    mapping: [
      ${$mapping}, 
      ${$mapping}, 
      ${$mapping}, 
      ${$mapping}, 
      %w[address_country country]
    ]

  has_many :BillingProfile, class_name: 'BillingProfile'

end
