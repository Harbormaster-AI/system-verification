class ExternalAccount < ApplicationRecord


  composed_of :i_b_a_n,
    class_name: "IBAN",
    mapping: [
      %w[i_b_a_n_value value]
    ]

  composed_of :account_number,
    class_name: "AccountNumber",
    mapping: [
      %w[account_number_value value]
    ]

  composed_of :b_i_c,
    class_name: "BIC",
    mapping: [
      %w[b_i_c_value value]
    ]

  has_many :Customer, class_name: 'Customer'
  has_many :Transactions, class_name: 'Transaction'

end

