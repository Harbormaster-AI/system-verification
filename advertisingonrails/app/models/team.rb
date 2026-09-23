
class Team < ApplicationRecord


  has_many :Agency, class_name: 'Agency'
  has_many :Users, class_name: 'User'
  has_many :AdAccounts, class_name: 'AdAccount'

end
