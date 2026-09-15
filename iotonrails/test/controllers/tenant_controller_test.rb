require "test_helper"

class TenantControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @tenant = tenants(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create tenant" do
    assert_difference("Tenant.count") do
      post tenants_url, params: { tenant: { name:"test string for name", TenantType:Tenant.TenantTypes[0] } }
    end

    assert_redirected_to tenants_url
  end

 
  
  test "should destroy tenant" do
    assert_difference("Tenant.count", -1) do
      delete tenant_url(@tenant)
    end

    assert_redirected_to tenants_url
  end
  
end


