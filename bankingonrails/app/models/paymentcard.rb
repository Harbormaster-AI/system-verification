class PaymentCard < ApplicationRecord
  enum CARD_TYPE: [:Debit, :Credit, :Prepaid, :Virtual]
  enum CARD_STATUS: [:Active, :Blocked, :LostStolen, :Expired, :Closed]
  enum NETWORK: [:Visa, :Mastercard, :Amex, :Discover, :UnionPay, :Other]


  composed_of :card_p_a_n,
    class_name: "CardPAN",
    mapping: [
      %w[card_p_a_n_value value]
    ]

  has_many :Bank, class_name: 'Bank'
  has_many :Account, class_name: 'Account'
  has_many :Customer, class_name: 'Customer'
  has_many :Transactions, class_name: 'Transaction'

end

