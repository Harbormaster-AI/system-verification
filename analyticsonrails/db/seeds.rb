# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


5.times do |i|
  AnalyticsWorkspace.create( name:"test string for name", 
business_domain:"test string for businessDomain", 
owner_team:"test string for ownerTeam", 
governance_tier:0
  )
  DataSource.create( name:"test string for name", 
connection:"test value", 
streaming:true, 
source_type:0, 
format:0
  )
  DataSet.create( name:"test string for name", 
schema_version:"test string for schemaVersion", 
refresh_schedule:"test value", 
sensitive:true, 
data_format:0
  )
  DataPipeline.create( name:"test string for name", 
schedule:"test value", 
trigger_type:0, 
status:0
  )
  DataTask.create( name:"test string for name", 
command:"test string for command", 
retries:100, 
task_type:0
  )
  SemanticModel.create( name:"test string for name", 
version:"test string for version", 
grain:"test string for grain"
  )
  Dimension.create( name:"test string for name", 
type_time:true, 
dimension_type:0
  )
  Measure.create( name:"test string for name", 
format:"test string for format", 
aggregation:0
  )
  Metric.create( name:"test string for name", 
expression:"test string for expression", 
unit:"test string for unit", 
metric_type:0
  )
  Report.create( title:"test string for title", 
audience:"test string for audience", 
status:0
  )
  Dashboard.create( title:"test string for title", 
theme:"test string for theme", 
status:0
  )
  Visualization.create( title:"test string for title", 
options:"test value", 
chart_type:0
  )
  Notebook.create( title:"test string for title", 
repository:"test value", 
language:0
  )
  BIQuery.create( name:"test string for name", 
text:"test string for text", 
dialect:0
  )
  Experiment.create( name:"test string for name", 
objective:"test string for objective", 
status:0
  )
  TrainingRun.create( run_label:"test string for runLabel", 
started_at:1.week.ago, 
completed_at:1.week.ago, 
status:0
  )
  RunMetric.create( name:"test string for name", 
value:"test value"
  )
  RunParameter.create( name:"test string for name", 
value:"test string for value"
  )
  Model_.create( name:"test string for name", 
task_description:"test string for taskDescription", 
model_type:0
  )
  ModelVersion.create( version:"test string for version", 
lifecycle:0, 
training_status:0
  )
  EvaluationMetric.create( name:"test string for name", 
value:"test value"
  )
  FeatureSet.create( name:"test string for name", 
refresh_schedule:"test value", 
store_type:0
  )
  Feature.create( name:"test string for name", 
description:"test string for description", 
data_type:0
  )
  InferenceEndpoint.create( name:"test string for name", 
endpoint_url:"test string for endpointUrl", 
traffic_share:"test value", 
mode:0
  )
  Prediction.create( reference_key:"test string for referenceKey", 
predicted_at:1.week.ago, 
score:"test value"
  )
  Forecast.create( name:"test string for name", 
horizon:100, 
granularity:0
  )
  TimeSeries.create( name:"test string for name", 
timezone:"test string for timezone", 
granularity:0
  )
  Anomaly.create( occurred_at:1.week.ago, 
details:"test string for details", 
anomaly_type:0, 
severity:0
  )
  QualityRule.create( name:"test string for name", 
threshold:"test value", 
target_field:"test string for targetField", 
dimension:0, 
operator_:0
  )
  QualityCheck.create( checked_at:1.week.ago, 
observed_value:"test value", 
sample_size:100, 
status:0
  )
  LineageNode.create( name:"test string for name", 
qualified_name:"test string for qualifiedName", 
node_type:0
  )
  Tag.create( name:"test string for name", 
category:0
  )
  AccessPolicy.create( name:"test string for name", 
subject_name:"test string for subjectName", 
access_level:0, 
subject_type:0
  )
  Alert.create( title:"test string for title", 
created_at:1.week.ago, 
severity:0, 
status:0
  )
  Subscriber.create( name:"test string for name", 
address:"test string for address", 
channel:0
  )
  BusinessGlossaryTerm.create( term:"test string for term", 
definition:"test string for definition", 
steward:"test string for steward"
  )
  RecommendationScenario.create( name:"test string for name", 
objective:"test string for objective", 
recommendation_type:0
  )
  FraudScenario.create( name:"test string for name", 
risk_appetite:"test string for riskAppetite", 
detection_type:0
  )
  FraudSignal.create( name:"test string for name", 
rule_logic:"test string for ruleLogic", 
signal_type:0
  )
end
