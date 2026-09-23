require "test_helper"

class TransactionControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @transaction = transactions(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create transaction" do
    assert_difference("Transaction.count") do
      post transactions_url, params: { transaction: {
                        Channel:Transaction.Channels[0]
 } }
    end

    assert_redirected_to transactions_url
  end

 
  
  test "should destroy transaction" do
    assert_difference("Transaction.count", -1) do
      delete transaction_url(@transaction)
    end

    assert_redirected_to transactions_url
  end
  
end


