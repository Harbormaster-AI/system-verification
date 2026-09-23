class ScreeningResult < ApplicationRecord
  enum OUTCOME: %i[Clear Match Review]

  has_many :KycProfile, class_name: "KycProfile"
end
