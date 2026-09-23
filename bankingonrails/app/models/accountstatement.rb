
class AccountStatement < ApplicationRecord
  enum _DELIVERY_METHOD: [:Electronic, :Paper]


  composed_of :_money,
    class_name: "Money",
    mapping: [
      ${$mapping}, 
      %w[_money_currency currency]
    ]

  composed_of :_money,
    class_name: "Money",
    mapping: [
      ${$mapping}, 
      %w[_money_currency currency]
    ]

  has_many :Account, class_name: 'Account'

end
