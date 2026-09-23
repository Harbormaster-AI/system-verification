require "test_helper"

class ExternalAccountControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @_external_account = _external_accounts(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create _external_account" do
    assert_difference("ExternalAccount.count") do
      post _external_accounts_url, params: { _external_account: {
                        country:"test string for country"
 } }
    end

    assert_redirected_to _external_accounts_url
  end

 
  
  test "should destroy _external_account" do
    assert_difference("ExternalAccount.count", -1) do
      delete _external_account_url(@_external_account)
    end

    assert_redirected_to _external_accounts_url
  end
  
end


