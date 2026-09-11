class ExternalAccount < ApplicationRecord


  composed_of :iBAN,
    class_name: "IBAN",
    mapping: [
      %w[iBAN_value value]
    ]

  composed_of :accountNumber,
    class_name: "AccountNumber",
    mapping: [
      %w[accountNumber_value value]
    ]

  composed_of :bIC,
    class_name: "BIC",
    mapping: [
      %w[bIC_value value]
    ]

  has_many :Customer, class_name: 'Customer'
  has_many :Transactions, class_name: 'Transaction'

end
