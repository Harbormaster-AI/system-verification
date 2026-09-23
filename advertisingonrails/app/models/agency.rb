
class Agency < ApplicationRecord


  has_many :Advertisers, class_name: 'Advertiser'
  has_many :Teams, class_name: 'Team'
  has_many :Users, class_name: 'User'
  has_many :InsertionOrders, class_name: 'InsertionOrder'

end
