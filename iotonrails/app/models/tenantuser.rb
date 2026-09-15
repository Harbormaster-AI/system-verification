
class TenantUser < ApplicationRecord
  enum Role: [:Admin, :Operator, :Viewer, :Integrator]


  has_many :Tenant, class_name: 'Tenant'
  has_many :CommandInvocations, class_name: 'CommandInvocation'

end
