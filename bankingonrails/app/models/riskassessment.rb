class RiskAssessment < ApplicationRecord
  enum _RATING: [:Low, :Medium, :High]


  has_many :KycProfile, class_name: 'KycProfile'

end

