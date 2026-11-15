class Experiment < ApplicationRecord
  enum STATUS: [:Planned, :Running, :Completed, :Failed, :Stopped]


  has_many :Workspace, class_name: 'AnalyticsWorkspace'
  has_many :TrainingRuns, class_name: 'TrainingRun'
  has_many :Models, class_name: 'Model_'
  has_many :Notebooks, class_name: 'Notebook'

end

