class KycProfile < ApplicationRecord
  enum Status: [:Pending, :Verified, :Rejected, :Expired]


  has_many :Customer, class_name: 'Customer'
  has_many :IdentityDocuments, class_name: 'IdentityDocument'
  has_many :RiskAssessments, class_name: 'RiskAssessment'
  has_many :Screenings, class_name: 'ScreeningResult'

end
