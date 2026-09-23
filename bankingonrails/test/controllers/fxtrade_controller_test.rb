require "test_helper"

class FXTradeControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @_f_x_trade = _f_x_trades(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create _f_x_trade" do
    assert_difference("FXTrade.count") do
      post _f_x_trades_url, params: { _f_x_trade: {
                        Status:FXTrade.Statuss[0]
 } }
    end

    assert_redirected_to _f_x_trades_url
  end

 
  
  test "should destroy _f_x_trade" do
    assert_difference("FXTrade.count", -1) do
      delete _f_x_trade_url(@_f_x_trade)
    end

    assert_redirected_to _f_x_trades_url
  end
  
end


