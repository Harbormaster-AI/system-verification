
class CreativeApproval < ApplicationRecord
  enum Status: [:Pending, :Approved, :Rejected]


  has_many :CreativeAsset, class_name: 'CreativeAsset'
  has_many :Publisher, class_name: 'Publisher'

end
