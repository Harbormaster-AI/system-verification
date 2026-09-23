require "test_helper"

class LoanAccountControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @_loan_account = _loan_accounts(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create _loan_account" do
    assert_difference("LoanAccount.count") do
      post _loan_accounts_url, params: { _loan_account: {
                        Status:LoanAccount.Statuss[0]
 } }
    end

    assert_redirected_to _loan_accounts_url
  end

 
  
  test "should destroy _loan_account" do
    assert_difference("LoanAccount.count", -1) do
      delete _loan_account_url(@_loan_account)
    end

    assert_redirected_to _loan_accounts_url
  end
  
end


