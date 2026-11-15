class Tag < ApplicationRecord
  enum CATEGORY: [:Domain, :Sensitivity, :Priority, :Lifecycle]


  has_many :Datasets, class_name: 'DataSet'
  has_many :Models, class_name: 'Model_'
  has_many :ModelVersions, class_name: 'ModelVersion'
  has_many :Dashboards, class_name: 'Dashboard'
  has_many :Reports, class_name: 'Report'
  has_many :FeatureSets, class_name: 'FeatureSet'
  has_many :Metrics, class_name: 'Metric'

end

