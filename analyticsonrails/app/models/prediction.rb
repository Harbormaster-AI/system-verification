class Prediction < ApplicationRecord


  has_many :Endpoint, class_name: 'InferenceEndpoint'
  has_many :ModelVersion, class_name: 'ModelVersion'
  has_many :Dataset, class_name: 'DataSet'

end

