require "test_helper"

class ExternalAccountControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @externalAccount = externalAccounts(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create externalAccount" do
    assert_difference("ExternalAccount.count") do
      post externalAccounts_url, params: { externalAccount: {
                        country:"test string for country"
 } }
    end

    assert_redirected_to externalAccounts_url
  end

 
  
  test "should destroy externalAccount" do
    assert_difference("ExternalAccount.count", -1) do
      delete externalAccount_url(@externalAccount)
    end

    assert_redirected_to externalAccounts_url
  end
  
end


