require "test_helper"

class ExchangeRateControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @exchangeRate = exchangeRates(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create exchangeRate" do
    assert_difference("ExchangeRate.count") do
      post exchangeRates_url, params: { exchangeRate: { baseCurrency:"test string for baseCurrency", counterCurrency:"test string for counterCurrency", rate:"test value", asOf:1.week.ago, source:"test string for source" } }
    end

    assert_redirected_to exchangeRates_url
  end

 
  
  test "should destroy exchangeRate" do
    assert_difference("ExchangeRate.count", -1) do
      delete exchangeRate_url(@exchangeRate)
    end

    assert_redirected_to exchangeRates_url
  end
  
end


