
class AccessPolicy < ApplicationRecord


  has_many :Tenant, class_name: 'Tenant'
  has_many :ApiKeys, class_name: 'ApiKey'
  has_many :Users, class_name: 'TenantUser'

end
