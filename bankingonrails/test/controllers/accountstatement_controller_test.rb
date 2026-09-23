require "test_helper"

class AccountStatementControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @_account_statement = _account_statements(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create _account_statement" do
    assert_difference("AccountStatement.count") do
      post _account_statements_url, params: { _account_statement: {
                        DeliveryMethod:AccountStatement.DeliveryMethods[0]
 } }
    end

    assert_redirected_to _account_statements_url
  end

 
  
  test "should destroy _account_statement" do
    assert_difference("AccountStatement.count", -1) do
      delete _account_statement_url(@_account_statement)
    end

    assert_redirected_to _account_statements_url
  end
  
end


