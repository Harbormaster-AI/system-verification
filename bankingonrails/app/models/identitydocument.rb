class IdentityDocument < ApplicationRecord
  enum DocumentType: [:Passport, :NationalID, :DriverLicense, :ResidencePermit, :BusinessRegistration, :TaxCertificate]


  has_many :KycProfile, class_name: 'KycProfile'

end
