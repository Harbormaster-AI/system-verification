require "test_helper"

class FXTradeControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @f_x_trade = f_x_trades(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create f_x_trade" do
    assert_difference("FXTrade.count") do
      post f_x_trades_url, params: { f_x_trade: {
        trade_reference: "test string for tradeReference",
        trade_date: 1.week.ago,
        settlement_date: 1.week.ago,
        amount_sold: "test value",
        amount_bought: "test value",
        rate: "test value",
        status: FXTrade.Statuss[0]
      } }
    end

    assert_redirected_to f_x_trades_url
  end

  test "should destroy f_x_trade" do
    assert_difference("FXTrade.count", -1) do
      delete f_x_trade_url(@f_x_trade)
    end

    assert_redirected_to f_x_trades_url
  end
end
