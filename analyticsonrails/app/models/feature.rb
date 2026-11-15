class Feature < ApplicationRecord
  enum DATA_TYPE: [:String, :Integer, :Decimal, :Boolean, :Date, :DateTime]


  has_many :FeatureSet, class_name: 'FeatureSet'
  has_many :SourceDatasets, class_name: 'DataSet'
  has_many :Models, class_name: 'Model_'
  has_many :TrainingRuns, class_name: 'TrainingRun'

end

