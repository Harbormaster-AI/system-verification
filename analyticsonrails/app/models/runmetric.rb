class RunMetric < ApplicationRecord


  has_many :TrainingRun, class_name: 'TrainingRun'
  has_many :Metric, class_name: 'Metric'
  has_many :Dataset, class_name: 'DataSet'

end

