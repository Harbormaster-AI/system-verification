class RiskAssessment < ApplicationRecord
  enum Rating: [:Low, :Medium, :High]


  has_many :KycProfile, class_name: 'KycProfile'

end
