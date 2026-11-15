class DataPipeline < ApplicationRecord
  enum TRIGGER_TYPE: [:Manual, :Schedule, :Event]
  enum STATUS: [:Draft, :Active, :Paused, :Failed, :Succeeded]


  composed_of :cron_schedule,
    class_name: "CronSchedule",
    mapping: [
      %w[cron_schedule_expression expression], 
      %w[cron_schedule_timezone timezone]
    ]

  has_many :Workspace, class_name: 'AnalyticsWorkspace'
  has_many :Tasks, class_name: 'DataTask'
  has_many :Sources, class_name: 'DataSource'
  has_many :Outputs, class_name: 'DataSet'
  has_many :LineageNode, class_name: 'LineageNode'

end

