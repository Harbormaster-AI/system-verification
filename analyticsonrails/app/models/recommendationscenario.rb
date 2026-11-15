class RecommendationScenario < ApplicationRecord
  enum RECOMMENDATION_TYPE: [:Personalized, :Trending, :SimilarItems, :FrequentlyBoughtTogether, :ContentBased]


  has_many :Models, class_name: 'Model_'
  has_many :Datasets, class_name: 'DataSet'
  has_many :Experiments, class_name: 'Experiment'
  has_many :Alerts, class_name: 'Alert'

end

