
class RateCard < ApplicationRecord


  has_many :Publisher, class_name: 'Publisher'
  has_many :Rates, class_name: 'Rate'

end
