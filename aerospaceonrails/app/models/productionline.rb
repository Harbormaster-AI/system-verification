class ProductionLine < ApplicationRecord
  enum LINE_TYPE: [:FinalAssembly, :SubAssembly, :Integration, :TestAndDelivery]


  has_many :Plant, class_name: 'Plant'
  has_many :WorkCenters, class_name: 'WorkCenter'

end

