class Dispute < ApplicationRecord
  enum Status: [:Open, :UnderReview, :Resolved, :Rejected, :Withdrawn]


  has_many :Transaction, class_name: 'Transaction'
  has_many :Customer, class_name: 'Customer'
  has_many :Account, class_name: 'Account'
  has_many :PaymentCard, class_name: 'PaymentCard'

end
