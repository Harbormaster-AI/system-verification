class Dashboard < ApplicationRecord
  enum STATUS: [:Draft, :Live, :Archived]


  has_many :Workspace, class_name: 'AnalyticsWorkspace'
  has_many :Visualizations, class_name: 'Visualization'
  has_many :Reports, class_name: 'Report'
  has_many :Datasets, class_name: 'DataSet'
  has_many :Alerts, class_name: 'Alert'
  has_many :Queries, class_name: 'BIQuery'
  has_many :Tags, class_name: 'Tag'

end

