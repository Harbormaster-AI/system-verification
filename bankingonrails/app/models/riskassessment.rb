class RiskAssessment < ApplicationRecord
  enum RATING: %i[Low Medium High]

  has_many :KycProfile, class_name: "KycProfile"
end
