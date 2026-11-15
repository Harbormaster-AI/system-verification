require "test_helper"

class TimeSeriesControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @time_series = time_seriess(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create time_series" do
    assert_difference("TimeSeries.count") do
      post time_seriess_url, params: { time_series: {
        name:"test string for name", 
timezone:"test string for timezone", 
granularity:TimeSeries.Granularitys[0]
 } }
    end

    assert_redirected_to time_seriess_url
  end

 
  
  test "should destroy time_series" do
    assert_difference("TimeSeries.count", -1) do
      delete time_series_url(@time_series)
    end

    assert_redirected_to time_seriess_url
  end
  
end


