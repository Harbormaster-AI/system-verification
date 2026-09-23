require "test_helper"

class ExternalAccountControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @external_account = external_accounts(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create external_account" do
    assert_difference("ExternalAccount.count") do
      post external_accounts_url, params: { external_account: {
        country:"test string for country" } }
    end

    assert_redirected_to external_accounts_url
  end

 
  
  test "should destroy external_account" do
    assert_difference("ExternalAccount.count", -1) do
      delete external_account_url(@external_account)
    end

    assert_redirected_to external_accounts_url
  end
  
end


