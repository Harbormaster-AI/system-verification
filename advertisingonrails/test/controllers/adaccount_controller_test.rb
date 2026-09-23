require "test_helper"

class AdAccountControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @adAccount = adAccounts(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create adAccount" do
    assert_difference("AdAccount.count") do
      post adAccounts_url, params: { adAccount: { name:"test string for name", accountCode:"test string for accountCode", defaultCurrency:"test string for defaultCurrency", defaultTimezone:"test string for defaultTimezone" } }
    end

    assert_redirected_to adAccounts_url
  end

 
  
  test "should destroy adAccount" do
    assert_difference("AdAccount.count", -1) do
      delete adAccount_url(@adAccount)
    end

    assert_redirected_to adAccounts_url
  end
  
end


