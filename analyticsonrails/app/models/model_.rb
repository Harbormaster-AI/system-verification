class Model_ < ApplicationRecord
  enum MODEL_TYPE: [:Classification, :Regression, :Clustering, :Forecasting, :Ranking, :NLP, :ComputerVision]


  has_many :Workspace, class_name: 'AnalyticsWorkspace'
  has_many :Versions, class_name: 'ModelVersion'
  has_many :FeatureSets, class_name: 'FeatureSet'
  has_many :Experiments, class_name: 'Experiment'
  has_many :Tags, class_name: 'Tag'

end

