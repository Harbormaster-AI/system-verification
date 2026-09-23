require "test_helper"

class AccountControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @_account = _accounts(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create _account" do
    assert_difference("Account.count") do
      post _accounts_url, params: { _account: {
                        Status:Account.Statuss[0]
 } }
    end

    assert_redirected_to _accounts_url
  end

 
  
  test "should destroy _account" do
    assert_difference("Account.count", -1) do
      delete _account_url(@_account)
    end

    assert_redirected_to _accounts_url
  end
  
end


