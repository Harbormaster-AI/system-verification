class EvaluationMetric < ApplicationRecord


  has_many :ModelVersion, class_name: 'ModelVersion'
  has_many :Metric, class_name: 'Metric'
  has_many :Dataset, class_name: 'DataSet'

end

