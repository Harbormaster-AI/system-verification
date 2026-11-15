class Visualization < ApplicationRecord
  enum CHART_TYPE: [:Table, :Bar, :Line, :Area, :Pie, :Scatter, :Heatmap, :KPI]


  composed_of :chart_options,
    class_name: "ChartOptions",
    mapping: [
      %w[chart_options_stacked stacked], 
      %w[chart_options_legend_position legend_position]
    ]

  has_many :Dashboard, class_name: 'Dashboard'
  has_many :Report, class_name: 'Report'
  has_many :Metrics, class_name: 'Metric'
  has_many :Dimensions, class_name: 'Dimension'
  has_many :Datasets, class_name: 'DataSet'

end

