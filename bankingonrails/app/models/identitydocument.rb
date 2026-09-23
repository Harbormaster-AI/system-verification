class IdentityDocument < ApplicationRecord
  enum DOCUMENT_TYPE: %i[Passport NationalID DriverLicense ResidencePermit BusinessRegistration TaxCertificate]

  has_many :KycProfile, class_name: "KycProfile"
end
