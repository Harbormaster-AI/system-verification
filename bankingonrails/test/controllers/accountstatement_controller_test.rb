require "test_helper"

class AccountStatementControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @accountStatement = accountStatements(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create accountStatement" do
    assert_difference("AccountStatement.count") do
      post accountStatements_url, params: { accountStatement: { statementNumber:"test string for statementNumber", periodStart:1.week.ago, periodEnd:1.week.ago, openingBalance:"test value", closingBalance:"test value", DeliveryMethod:AccountStatement.DeliveryMethods[0] } }
    end

    assert_redirected_to accountStatements_url
  end

 
  
  test "should destroy accountStatement" do
    assert_difference("AccountStatement.count", -1) do
      delete accountStatement_url(@accountStatement)
    end

    assert_redirected_to accountStatements_url
  end
  
end


