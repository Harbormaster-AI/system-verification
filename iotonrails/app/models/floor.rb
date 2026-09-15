
class Floor < ApplicationRecord


  has_many :Building, class_name: 'Building'
  has_many :Rooms, class_name: 'Room'

end
