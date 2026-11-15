class Notebook < ApplicationRecord
  enum LANGUAGE: [:Python, :R, :SQL, :Julia]


  composed_of :repository_ref,
    class_name: "RepositoryRef",
    mapping: [
      %w[repository_ref_url url], 
      %w[repository_ref_branch branch], 
      %w[repository_ref_path path]
    ]

  has_many :Workspace, class_name: 'AnalyticsWorkspace'
  has_many :Datasets, class_name: 'DataSet'
  has_many :Experiments, class_name: 'Experiment'
  has_many :Queries, class_name: 'BIQuery'

end

