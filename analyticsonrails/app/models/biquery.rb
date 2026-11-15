class BIQuery < ApplicationRecord
  enum DIALECT: [:ANSI, :Postgres, :MySQL, :SQLServer, :Oracle, :SparkSQL, :BigQuery]


  has_many :Workspace, class_name: 'AnalyticsWorkspace'
  has_many :Datasets, class_name: 'DataSet'
  has_many :Reports, class_name: 'Report'
  has_many :Dashboards, class_name: 'Dashboard'
  has_many :Notebooks, class_name: 'Notebook'

end

