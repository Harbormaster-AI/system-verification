class RiskAssessment < ApplicationRecord
  enum RATING: [:Low, :Medium, :High]


  has_many :KycProfile, class_name: 'KycProfile'

end

