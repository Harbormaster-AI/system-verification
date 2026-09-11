require "test_helper"

class FXTradeControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @fXTrade = fXTrades(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create fXTrade" do
    assert_difference("FXTrade.count") do
      post fXTrades_url, params: { fXTrade: { tradeReference:"test string for tradeReference", tradeDate:1.week.ago, settlementDate:1.week.ago, amountSold:"test value", amountBought:"test value", rate:"test value", Status:FXTrade.Statuss[0] } }
    end

    assert_redirected_to fXTrades_url
  end

 
  
  test "should destroy fXTrade" do
    assert_difference("FXTrade.count", -1) do
      delete fXTrade_url(@fXTrade)
    end

    assert_redirected_to fXTrades_url
  end
  
end


