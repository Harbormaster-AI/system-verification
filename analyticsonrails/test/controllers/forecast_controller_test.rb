require "test_helper"

class ForecastControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @forecast = forecasts(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create forecast" do
    assert_difference("Forecast.count") do
      post forecasts_url, params: { forecast: {
        name:"test string for name", 
horizon:100, 
granularity:Forecast.Granularitys[0]
 } }
    end

    assert_redirected_to forecasts_url
  end

 
  
  test "should destroy forecast" do
    assert_difference("Forecast.count", -1) do
      delete forecast_url(@forecast)
    end

    assert_redirected_to forecasts_url
  end
  
end


