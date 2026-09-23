require "test_helper"

class LoanAccountControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @loan_account = loan_accounts(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create loan_account" do
    assert_difference("LoanAccount.count") do
      post loan_accounts_url, params: { loan_account: {
        status:LoanAccount.Statuss[0] } }
    end

    assert_redirected_to loan_accounts_url
  end

 
  
  test "should destroy loan_account" do
    assert_difference("LoanAccount.count", -1) do
      delete loan_account_url(@loan_account)
    end

    assert_redirected_to loan_accounts_url
  end
  
end


