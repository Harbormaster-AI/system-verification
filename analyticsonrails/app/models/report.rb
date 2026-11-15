class Report < ApplicationRecord
  enum STATUS: [:Draft, :Published, :Archived]


  has_many :Workspace, class_name: 'AnalyticsWorkspace'
  has_many :Visualizations, class_name: 'Visualization'
  has_many :Datasets, class_name: 'DataSet'
  has_many :SemanticModels, class_name: 'SemanticModel'
  has_many :Queries, class_name: 'BIQuery'
  has_many :Tags, class_name: 'Tag'

end

