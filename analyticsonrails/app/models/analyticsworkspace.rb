class AnalyticsWorkspace < ApplicationRecord
  enum GOVERNANCE_TIER: [:Open, :Internal, :Restricted, :Confidential]


  has_many :Datasets, class_name: 'DataSet'
  has_many :DataSources, class_name: 'DataSource'
  has_many :Pipelines, class_name: 'DataPipeline'
  has_many :Dashboards, class_name: 'Dashboard'
  has_many :Reports, class_name: 'Report'
  has_many :Notebooks, class_name: 'Notebook'
  has_many :Models, class_name: 'Model_'
  has_many :FeatureSets, class_name: 'FeatureSet'
  has_many :Policies, class_name: 'AccessPolicy'
  has_many :LineageNodes, class_name: 'LineageNode'

end

