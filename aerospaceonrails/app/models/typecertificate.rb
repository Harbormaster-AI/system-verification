class TypeCertificate < ApplicationRecord


  has_many :Program, class_name: 'AircraftProgram'

end

