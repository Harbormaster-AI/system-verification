require "test_helper"

class LoanAccountControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @loanAccount = loanAccounts(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create loanAccount" do
    assert_difference("LoanAccount.count") do
      post loanAccounts_url, params: { loanAccount: {
                        Status:LoanAccount.Statuss[0]
 } }
    end

    assert_redirected_to loanAccounts_url
  end

 
  
  test "should destroy loanAccount" do
    assert_difference("LoanAccount.count", -1) do
      delete loanAccount_url(@loanAccount)
    end

    assert_redirected_to loanAccounts_url
  end
  
end


