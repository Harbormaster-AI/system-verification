
class Consent < ApplicationRecord
  enum _CONSENT_TYPE: [:OpenBanking, :PaymentInitiation, :AccountInformation, :Marketing, :DataSharing]
  enum _STATUS: [:Active, :Revoked, :Expired]


  has_many :Customer, class_name: 'Customer'
  has_many :Bank, class_name: 'Bank'
  has_many :AuthorizedAccounts, class_name: 'Account'
  has_many :ThirdPartyProvider, class_name: 'ThirdPartyProvider'

end
