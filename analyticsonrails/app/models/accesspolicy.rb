class AccessPolicy < ApplicationRecord
  enum ACCESS_LEVEL: [:View, :Query, :Modify, :Admin]
  enum SUBJECT_TYPE: [:User, :Group, :Service]


  has_many :Workspace, class_name: 'AnalyticsWorkspace'
  has_many :Datasets, class_name: 'DataSet'
  has_many :Dashboards, class_name: 'Dashboard'
  has_many :Reports, class_name: 'Report'
  has_many :Models, class_name: 'Model_'
  has_many :FeatureSets, class_name: 'FeatureSet'

end

