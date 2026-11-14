class ScreeningResult < ApplicationRecord
  enum OUTCOME: [:Clear, :Match, :Review]


  has_many :KycProfile, class_name: 'KycProfile'

end

