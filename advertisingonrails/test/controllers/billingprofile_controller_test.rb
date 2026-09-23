require "test_helper"

class BillingProfileControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @billingProfile = billingProfiles(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create billingProfile" do
    assert_difference("BillingProfile.count") do
      post billingProfiles_url, params: { billingProfile: { billingName:"test string for billingName", taxId:"test string for taxId", billingAddress:"test value", PaymentTerms:BillingProfile.PaymentTermss[0] } }
    end

    assert_redirected_to billingProfiles_url
  end

 
  
  test "should destroy billingProfile" do
    assert_difference("BillingProfile.count", -1) do
      delete billingProfile_url(@billingProfile)
    end

    assert_redirected_to billingProfiles_url
  end
  
end


