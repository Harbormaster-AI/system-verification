
class Building < ApplicationRecord


  has_many :Site, class_name: 'Site'
  has_many :Floors, class_name: 'Floor'

end
