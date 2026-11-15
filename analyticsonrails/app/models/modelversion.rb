class ModelVersion < ApplicationRecord
  enum LIFECYCLE: [:Draft, :Staging, :Production, :Archived]
  enum TRAINING_STATUS: [:Queued, :Running, :Completed, :Failed]


  has_many :Model_, class_name: 'Model_'
  has_many :TrainingRun, class_name: 'TrainingRun'
  has_many :EvaluationMetrics, class_name: 'EvaluationMetric'
  has_many :Deployments, class_name: 'InferenceEndpoint'
  has_many :FeatureSets, class_name: 'FeatureSet'
  has_many :Datasets, class_name: 'DataSet'

end

