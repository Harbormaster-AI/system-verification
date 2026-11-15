class InitialMigration < ActiveRecord::Migration[6.1]
  def change
    create_table :analyticsWorkspaces do |t|
      t.string :name      
      t.string :businessDomain      
      t.string :ownerTeam      
      t.integer :GovernanceTier      
      t.timestamps
    end
    create_table :dataSources do |t|
      t.string :name      
      t.string :connection      
      t.boolean :Streaming      
      t.integer :SourceType      
      t.integer :Format      
      t.timestamps
    end
    create_table :dataSets do |t|
      t.string :name      
      t.string :schemaVersion      
      t.string :refreshSchedule      
      t.boolean :Sensitive      
      t.integer :DataFormat      
      t.timestamps
    end
    create_table :dataPipelines do |t|
      t.string :name      
      t.string :schedule      
      t.integer :TriggerType      
      t.integer :Status      
      t.timestamps
    end
    create_table :dataTasks do |t|
      t.string :name      
      t.string :command      
      t.integer :retries      
      t.integer :TaskType      
      t.timestamps
    end
    create_table :semanticModels do |t|
      t.string :name      
      t.string :version      
      t.string :grain      
      t.timestamps
    end
    create_table :dimensions do |t|
      t.string :name      
      t.boolean :typeTime      
      t.integer :DimensionType      
      t.timestamps
    end
    create_table :measures do |t|
      t.string :name      
      t.string :format      
      t.integer :Aggregation      
      t.timestamps
    end
    create_table :metrics do |t|
      t.string :name      
      t.string :expression      
      t.string :unit      
      t.integer :MetricType      
      t.timestamps
    end
    create_table :reports do |t|
      t.string :title      
      t.string :audience      
      t.integer :Status      
      t.timestamps
    end
    create_table :dashboards do |t|
      t.string :title      
      t.string :theme      
      t.integer :Status      
      t.timestamps
    end
    create_table :visualizations do |t|
      t.string :title      
      t.string :options      
      t.integer :ChartType      
      t.timestamps
    end
    create_table :notebooks do |t|
      t.string :title      
      t.string :repository      
      t.integer :Language      
      t.timestamps
    end
    create_table :bIQuerys do |t|
      t.string :name      
      t.string :text      
      t.integer :Dialect      
      t.timestamps
    end
    create_table :experiments do |t|
      t.string :name      
      t.string :objective      
      t.integer :Status      
      t.timestamps
    end
    create_table :trainingRuns do |t|
      t.string :runLabel      
      t.date :startedAt      
      t.date :completedAt      
      t.integer :Status      
      t.timestamps
    end
    create_table :runMetrics do |t|
      t.string :name      
      t.decimal :value      
      t.timestamps
    end
    create_table :runParameters do |t|
      t.string :name      
      t.string :value      
      t.timestamps
    end
    create_table :model_s do |t|
      t.string :name      
      t.string :taskDescription      
      t.integer :ModelType      
      t.timestamps
    end
    create_table :modelVersions do |t|
      t.string :version      
      t.integer :Lifecycle      
      t.integer :TrainingStatus      
      t.timestamps
    end
    create_table :evaluationMetrics do |t|
      t.string :name      
      t.decimal :value      
      t.timestamps
    end
    create_table :featureSets do |t|
      t.string :name      
      t.string :refreshSchedule      
      t.integer :StoreType      
      t.timestamps
    end
    create_table :features do |t|
      t.string :name      
      t.string :description      
      t.integer :DataType      
      t.timestamps
    end
    create_table :inferenceEndpoints do |t|
      t.string :name      
      t.string :endpointUrl      
      t.string :trafficShare      
      t.integer :Mode      
      t.timestamps
    end
    create_table :predictions do |t|
      t.string :referenceKey      
      t.date :predictedAt      
      t.decimal :score      
      t.timestamps
    end
    create_table :forecasts do |t|
      t.string :name      
      t.integer :horizon      
      t.integer :Granularity      
      t.timestamps
    end
    create_table :timeSeriess do |t|
      t.string :name      
      t.string :timezone      
      t.integer :Granularity      
      t.timestamps
    end
    create_table :anomalys do |t|
      t.date :occurredAt      
      t.string :details      
      t.integer :AnomalyType      
      t.integer :Severity      
      t.timestamps
    end
    create_table :qualityRules do |t|
      t.string :name      
      t.string :threshold      
      t.string :targetField      
      t.integer :Dimension      
      t.integer :Operator_      
      t.timestamps
    end
    create_table :qualityChecks do |t|
      t.date :checkedAt      
      t.decimal :observedValue      
      t.integer :sampleSize      
      t.integer :Status      
      t.timestamps
    end
    create_table :lineageNodes do |t|
      t.string :name      
      t.string :qualifiedName      
      t.integer :NodeType      
      t.timestamps
    end
    create_table :tags do |t|
      t.string :name      
      t.integer :Category      
      t.timestamps
    end
    create_table :accessPolicys do |t|
      t.string :name      
      t.string :subjectName      
      t.integer :AccessLevel      
      t.integer :SubjectType      
      t.timestamps
    end
    create_table :alerts do |t|
      t.string :title      
      t.date :createdAt      
      t.integer :Severity      
      t.integer :Status      
      t.timestamps
    end
    create_table :subscribers do |t|
      t.string :name      
      t.string :address      
      t.integer :Channel      
      t.timestamps
    end
    create_table :businessGlossaryTerms do |t|
      t.string :term      
      t.string :definition      
      t.string :steward      
      t.timestamps
    end
    create_table :recommendationScenarios do |t|
      t.string :name      
      t.string :objective      
      t.integer :RecommendationType      
      t.timestamps
    end
    create_table :fraudScenarios do |t|
      t.string :name      
      t.string :riskAppetite      
      t.integer :DetectionType      
      t.timestamps
    end
    create_table :fraudSignals do |t|
      t.string :name      
      t.string :ruleLogic      
      t.integer :SignalType      
      t.timestamps
    end
  end
end
