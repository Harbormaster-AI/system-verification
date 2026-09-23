require "test_helper"

class FundsTransferControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @_funds_transfer = _funds_transfers(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create _funds_transfer" do
    assert_difference("FundsTransfer.count") do
      post _funds_transfers_url, params: { _funds_transfer: {
                        Status:FundsTransfer.Statuss[0]
 } }
    end

    assert_redirected_to _funds_transfers_url
  end

 
  
  test "should destroy _funds_transfer" do
    assert_difference("FundsTransfer.count", -1) do
      delete _funds_transfer_url(@_funds_transfer)
    end

    assert_redirected_to _funds_transfers_url
  end
  
end


