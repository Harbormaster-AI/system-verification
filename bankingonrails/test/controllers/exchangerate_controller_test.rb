require "test_helper"

class ExchangeRateControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @exchange_rate = exchange_rates(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create exchange_rate" do
    assert_difference("ExchangeRate.count") do
      post exchange_rates_url, params: { exchange_rate: {
        source:"test string for source" } }
    end

    assert_redirected_to exchange_rates_url
  end

 
  
  test "should destroy exchange_rate" do
    assert_difference("ExchangeRate.count", -1) do
      delete exchange_rate_url(@exchange_rate)
    end

    assert_redirected_to exchange_rates_url
  end
  
end


