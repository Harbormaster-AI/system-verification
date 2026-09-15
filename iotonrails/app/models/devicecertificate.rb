
class DeviceCertificate < ApplicationRecord
  enum CertificateType: [:X509, :X509_CA, :X509_SelfSigned]


  has_many :Device, class_name: 'IoTDevice'
  has_many :Gateway, class_name: 'Gateway'

end
