
class ExternalAccount < ApplicationRecord


  composed_of :_i_b_a_n,
    class_name: "IBAN",
    mapping: [
      %w[_i_b_a_n_value value]
    ]

  composed_of :_account_number,
    class_name: "AccountNumber",
    mapping: [
      %w[_account_number_value value]
    ]

  composed_of :_b_i_c,
    class_name: "BIC",
    mapping: [
      %w[_b_i_c_value value]
    ]

  has_many :Customer, class_name: 'Customer'
  has_many :Transactions, class_name: 'Transaction'

end
