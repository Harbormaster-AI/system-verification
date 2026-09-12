class ExchangeRate < ApplicationRecord


  has_many :Bank, class_name: 'Bank'
  has_many :FxTrades, class_name: 'FXTrade'

end
