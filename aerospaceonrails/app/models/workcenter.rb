class WorkCenter < ApplicationRecord


  has_many :ProductionLine, class_name: 'ProductionLine'

end

