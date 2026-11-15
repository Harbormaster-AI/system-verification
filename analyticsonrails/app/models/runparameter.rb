class RunParameter < ApplicationRecord


  has_many :TrainingRun, class_name: 'TrainingRun'

end

