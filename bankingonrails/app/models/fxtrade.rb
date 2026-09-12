class FXTrade < ApplicationRecord
  enum Status: [:Booked, :Settled, :Cancelled]


  composed_of :money,
    class_name: "Money",
    mapping: [
      ${$mapping}, 
      %w[money_currency currency]
    ]

  composed_of :money,
    class_name: "Money",
    mapping: [
      ${$mapping}, 
      %w[money_currency currency]
    ]

  has_many :Customer, class_name: 'Customer'
  has_many :Bank, class_name: 'Bank'
  has_many :ExchangeRate, class_name: 'ExchangeRate'
  has_many :SourceAccount, class_name: 'Account'
  has_many :DestinationAccount, class_name: 'Account'
  has_many :Transaction, class_name: 'Transaction'

end
