class Warranty < ApplicationRecord
  enum WARRANTY_TYPE: [:Basic, :Powerplant, :Avionics, :Corrosion]


  has_many :Aircraft, class_name: 'Aircraft'

end

