class IdentityDocument < ApplicationRecord
  enum _DOCUMENT_TYPE: [:Passport, :NationalID, :DriverLicense, :ResidencePermit, :BusinessRegistration, :TaxCertificate]


  has_many :KycProfile, class_name: 'KycProfile'

end

