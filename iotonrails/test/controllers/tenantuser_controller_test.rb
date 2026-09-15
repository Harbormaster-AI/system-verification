require "test_helper"

class TenantUserControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @tenantUser = tenantUsers(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create tenantUser" do
    assert_difference("TenantUser.count") do
      post tenantUsers_url, params: { tenantUser: { firstName:"test string for firstName", lastName:"test string for lastName", email:"test string for email", Role:TenantUser.Roles[0] } }
    end

    assert_redirected_to tenantUsers_url
  end

 
  
  test "should destroy tenantUser" do
    assert_difference("TenantUser.count", -1) do
      delete tenantUser_url(@tenantUser)
    end

    assert_redirected_to tenantUsers_url
  end
  
end


