class FeatureSet < ApplicationRecord
  enum STORE_TYPE: [:Online, :Offline, :Hybrid]


  composed_of :cron_schedule,
    class_name: "CronSchedule",
    mapping: [
      %w[cron_schedule_expression expression], 
      %w[cron_schedule_timezone timezone]
    ]

  has_many :Workspace, class_name: 'AnalyticsWorkspace'
  has_many :Features, class_name: 'Feature'
  has_many :Datasets, class_name: 'DataSet'
  has_many :Models, class_name: 'Model_'
  has_many :ModelVersions, class_name: 'ModelVersion'
  has_many :Tags, class_name: 'Tag'

end

