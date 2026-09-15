
class EdgeApplication < ApplicationRecord
  enum Status: [:Pending, :Deploying, :Running, :Failed, :Stopped]


  has_many :Gateway, class_name: 'Gateway'

end
