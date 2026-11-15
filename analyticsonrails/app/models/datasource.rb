class DataSource < ApplicationRecord
  enum SOURCE_TYPE: [:Database, :File, :Stream, :API, :DataWarehouse, :DataLake]
  enum FORMAT: [:CSV, :JSON, :Parquet, :Avro, :ORC, :XML]


  composed_of :connection_info_,
    class_name: "ConnectionInfo_",
    mapping: [
      %w[connection_info__host host], 
      %w[connection_info__port port], 
      %w[connection_info__database database], 
      %w[connection_info__username username]
    ]

  has_many :Workspace, class_name: 'AnalyticsWorkspace'
  has_many :ProducedDatasets, class_name: 'DataSet'
  has_many :Pipelines, class_name: 'DataPipeline'

end

