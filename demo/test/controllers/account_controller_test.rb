require "test_helper"

class AccountControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @account = accounts(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create account" do
    assert_difference("Account.count") do
      post accounts_url, params: { account: {
        account_number:"test value", 
iban:"test value", 
account_name:"test string for accountName", 
currency:"test string for currency", 
opened_on:1.week.ago, 
closed_on:1.week.ago, 
account_type:Account.AccountTypes[0], 
ownership_type:Account.OwnershipTypes[0], 
status:Account.Statuss[0]
 } }
    end

    assert_redirected_to accounts_url
  end

 
  
  test "should destroy account" do
    assert_difference("Account.count", -1) do
      delete account_url(@account)
    end

    assert_redirected_to accounts_url
  end
  
end


