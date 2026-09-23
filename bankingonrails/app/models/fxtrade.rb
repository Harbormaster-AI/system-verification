
class FXTrade < ApplicationRecord
  enum _STATUS: [:Booked, :Settled, :Cancelled]


  composed_of :_money,
    class_name: "Money",
    mapping: [
      %w[_money_amount amount], 
      %w[_money_currency currency]
    ]

  composed_of :_money,
    class_name: "Money",
    mapping: [
      %w[_money_amount amount], 
      %w[_money_currency currency]
    ]

  has_many :Customer, class_name: 'Customer'
  has_many :Bank, class_name: 'Bank'
  has_many :ExchangeRate, class_name: 'ExchangeRate'
  has_many :SourceAccount, class_name: 'Account'
  has_many :DestinationAccount, class_name: 'Account'
  has_many :Transaction, class_name: 'Transaction'

end
