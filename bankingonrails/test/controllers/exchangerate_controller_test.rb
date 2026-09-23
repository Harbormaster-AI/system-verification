require "test_helper"

class ExchangeRateControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @_exchange_rate = _exchange_rates(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create _exchange_rate" do
    assert_difference("ExchangeRate.count") do
      post _exchange_rates_url, params: { _exchange_rate: {
                        source:"test string for source"
 } }
    end

    assert_redirected_to _exchange_rates_url
  end

 
  
  test "should destroy _exchange_rate" do
    assert_difference("ExchangeRate.count", -1) do
      delete _exchange_rate_url(@_exchange_rate)
    end

    assert_redirected_to _exchange_rates_url
  end
  
end


