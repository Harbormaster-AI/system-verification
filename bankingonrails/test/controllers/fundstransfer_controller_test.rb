require "test_helper"

class FundsTransferControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @fundsTransfer = fundsTransfers(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create fundsTransfer" do
    assert_difference("FundsTransfer.count") do
      post fundsTransfers_url, params: { fundsTransfer: { transferReference:"test string for transferReference", amount:"test value", requestedDate:1.week.ago, executionDate:1.week.ago, purpose:"test string for purpose", feeAmount:"test value", Method:FundsTransfer.Methods[0], Status:FundsTransfer.Statuss[0] } }
    end

    assert_redirected_to fundsTransfers_url
  end

 
  
  test "should destroy fundsTransfer" do
    assert_difference("FundsTransfer.count", -1) do
      delete fundsTransfer_url(@fundsTransfer)
    end

    assert_redirected_to fundsTransfers_url
  end
  
end


