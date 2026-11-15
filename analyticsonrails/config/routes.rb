Rails.application.routes.draw do
  root "application#health"

  resources :analytics_workspaces do

    resources :datasets
    resources :datasources
    resources :pipelines
    resources :dashboards
    resources :reports
    resources :notebooks
    resources :models
    resources :featuresets
    resources :policies
    resources :lineagenodes
  end
  resources :data_sources do

    resource :workspace
    resources :produceddatasets
    resources :pipelines
  end
  resources :data_sets do

    resource :workspace
    resources :sources
    resources :pipelines
    resources :semanticmodels
    resources :dimensions
    resources :measures
    resources :metrics
    resources :qualityrules
    resource :lineagenode
    resources :tags
  end
  resources :data_pipelines do

    resource :workspace
    resources :tasks
    resources :sources
    resources :outputs
    resource :lineagenode
  end
  resources :data_tasks do

    resource :pipeline
    resources :inputdatasets
    resources :outputdatasets
  end
  resources :semantic_models do

    resources :datasets
    resources :metrics
    resources :dimensions
    resources :measures
    resources :glossaryterms
  end
  resources :dimensions do

    resource :semanticmodel
    resources :datasets
    resources :glossaryterms
  end
  resources :measures do

    resource :semanticmodel
    resources :datasets
    resources :glossaryterms
  end
  resources :metrics do

    resource :semanticmodel
    resources :datasets
    resources :glossaryterms
    resources :alerts
    resources :visualizations
  end
  resources :reports do

    resource :workspace
    resources :visualizations
    resources :datasets
    resources :semanticmodels
    resources :queries
    resources :tags
  end
  resources :dashboards do

    resource :workspace
    resources :visualizations
    resources :reports
    resources :datasets
    resources :alerts
    resources :queries
    resources :tags
  end
  resources :visualizations do

    resource :dashboard
    resource :report
    resources :metrics
    resources :dimensions
    resources :datasets
  end
  resources :notebooks do

    resource :workspace
    resources :datasets
    resources :experiments
    resources :queries
  end
  resources :b_i_querys do

    resource :workspace
    resources :datasets
    resources :reports
    resources :dashboards
    resources :notebooks
  end
  resources :experiments do

    resource :workspace
    resources :trainingruns
    resources :models
    resources :notebooks
  end
  resources :training_runs do

    resource :experiment
    resource :modelversion
    resources :inputdatasets
    resources :features
    resources :runmetrics
    resources :runparameters
  end
  resources :run_metrics do

    resource :trainingrun
    resource :metric
    resource :dataset
  end
  resources :run_parameters do

    resource :trainingrun
  end
  resources :model_s do

    resource :workspace
    resources :versions
    resources :featuresets
    resources :experiments
    resources :tags
  end
  resources :model_versions do

    resource :model_
    resource :trainingrun
    resources :evaluationmetrics
    resources :deployments
    resources :featuresets
    resources :datasets
  end
  resources :evaluation_metrics do

    resource :modelversion
    resource :metric
    resource :dataset
  end
  resources :feature_sets do

    resource :workspace
    resources :features
    resources :datasets
    resources :models
    resources :modelversions
    resources :tags
  end
  resources :features do

    resource :featureset
    resources :sourcedatasets
    resources :models
    resources :trainingruns
  end
  resources :inference_endpoints do

    resource :modelversion
    resource :workspace
    resources :predictions
  end
  resources :predictions do

    resource :endpoint
    resource :modelversion
    resource :dataset
  end
  resources :forecasts do

    resource :modelversion
    resource :timeseries
    resources :datasets
  end
  resources :time_seriess do

    resources :datasets
    resources :forecasts
    resources :anomalies
  end
  resources :anomalys do

    resource :timeseries
    resource :alert
    resource :dataset
  end
  resources :quality_rules do

    resource :dataset
    resources :checks
  end
  resources :quality_checks do

    resource :rule
    resource :dataset
  end
  resources :lineage_nodes do

    resource :workspace
    resources :inputs
    resources :outputs
    resources :datasets
    resources :models
    resources :pipelines
    resources :dashboards
    resources :reports
  end
  resources :tags do

    resources :datasets
    resources :models
    resources :modelversions
    resources :dashboards
    resources :reports
    resources :featuresets
    resources :metrics
  end
  resources :access_policys do

    resource :workspace
    resources :datasets
    resources :dashboards
    resources :reports
    resources :models
    resources :featuresets
  end
  resources :alerts do

    resource :metric
    resource :dashboard
    resource :dataset
    resource :rule
    resources :anomalies
    resources :subscribers
  end
  resources :subscribers do

    resources :alerts
  end
  resources :business_glossary_terms do

    resources :relatedterms
    resources :metrics
    resources :datasets
    resources :dimensions
    resources :measures
  end
  resources :recommendation_scenarios do

    resources :models
    resources :datasets
    resources :experiments
    resources :alerts
  end
  resources :fraud_scenarios do

    resources :models
    resources :datasets
    resources :alerts
    resources :signals
  end
  resources :fraud_signals do

    resource :scenario
    resource :dataset
    resource :modelversion
  end
end
