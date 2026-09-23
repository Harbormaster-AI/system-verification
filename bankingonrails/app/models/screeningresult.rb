
class ScreeningResult < ApplicationRecord
  enum _OUTCOME: [:Clear, :Match, :Review]


  has_many :KycProfile, class_name: 'KycProfile'

end
