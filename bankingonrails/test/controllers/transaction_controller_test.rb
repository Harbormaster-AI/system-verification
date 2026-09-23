require "test_helper"

class TransactionControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @_transaction = _transactions(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create _transaction" do
    assert_difference("Transaction.count") do
      post _transactions_url, params: { _transaction: {
                        Channel:Transaction.Channels[0]
 } }
    end

    assert_redirected_to _transactions_url
  end

 
  
  test "should destroy _transaction" do
    assert_difference("Transaction.count", -1) do
      delete _transaction_url(@_transaction)
    end

    assert_redirected_to _transactions_url
  end
  
end


