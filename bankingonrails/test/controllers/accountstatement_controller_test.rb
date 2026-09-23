require "test_helper"

class AccountStatementControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @account_statement = account_statements(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create account_statement" do
    assert_difference("AccountStatement.count") do
      post account_statements_url, params: { account_statement: {
        statement_number: "test string for statementNumber",
        period_start: 1.week.ago,
        period_end: 1.week.ago,
        opening_balance: "test value",
        closing_balance: "test value",
        delivery_method: AccountStatement.DeliveryMethods[0]
      } }
    end

    assert_redirected_to account_statements_url
  end

  test "should destroy account_statement" do
    assert_difference("AccountStatement.count", -1) do
      delete account_statement_url(@account_statement)
    end

    assert_redirected_to account_statements_url
  end
end
