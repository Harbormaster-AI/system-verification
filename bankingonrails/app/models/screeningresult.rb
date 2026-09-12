class ScreeningResult < ApplicationRecord
  enum Outcome: [:Clear, :Match, :Review]


  has_many :KycProfile, class_name: 'KycProfile'

end
