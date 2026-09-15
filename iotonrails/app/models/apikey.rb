
class ApiKey < ApplicationRecord


  has_many :AccessPolicy, class_name: 'AccessPolicy'

end
