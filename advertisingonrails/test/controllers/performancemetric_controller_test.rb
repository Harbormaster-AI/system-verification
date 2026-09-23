require "test_helper"

class PerformanceMetricControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @performanceMetric = performanceMetrics(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create performanceMetric" do
    assert_difference("PerformanceMetric.count") do
      post performanceMetrics_url, params: { performanceMetric: { date:1.week.ago, value:"test value", MetricType:PerformanceMetric.MetricTypes[0] } }
    end

    assert_redirected_to performanceMetrics_url
  end

 
  
  test "should destroy performanceMetric" do
    assert_difference("PerformanceMetric.count", -1) do
      delete performanceMetric_url(@performanceMetric)
    end

    assert_redirected_to performanceMetrics_url
  end
  
end


