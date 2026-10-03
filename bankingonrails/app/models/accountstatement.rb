class AccountStatement < ApplicationRecord
  enum DELIVERY_METHOD: %i[Electronic Paper]

  composed_of :money,
              class_name: "Money",
              mapping: [
                %w[money_amount amount],
                %w[money_currency currency]
              ]

  composed_of :money,
              class_name: "Money",
              mapping: [
                %w[money_amount amount],
                %w[money_currency currency]
              ]

  has_many :Account, class_name: "Account"
end
