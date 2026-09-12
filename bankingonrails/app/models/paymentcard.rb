class PaymentCard < ApplicationRecord
  enum CardType: [:Debit, :Credit, :Prepaid, :Virtual]
  enum CardStatus: [:Active, :Blocked, :LostStolen, :Expired, :Closed]
  enum Network: [:Visa, :Mastercard, :Amex, :Discover, :UnionPay, :Other]


  composed_of :cardPAN,
    class_name: "CardPAN",
    mapping: [
      %w[cardPAN_value value]
    ]

  has_many :Bank, class_name: 'Bank'
  has_many :Account, class_name: 'Account'
  has_many :Customer, class_name: 'Customer'
  has_many :Transactions, class_name: 'Transaction'

end
