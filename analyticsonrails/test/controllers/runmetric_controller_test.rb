require "test_helper"

class RunMetricControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @run_metric = run_metrics(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create run_metric" do
    assert_difference("RunMetric.count") do
      post run_metrics_url, params: { run_metric: {
        name:"test string for name", 
value:"test value"
 } }
    end

    assert_redirected_to run_metrics_url
  end

 
  
  test "should destroy run_metric" do
    assert_difference("RunMetric.count", -1) do
      delete run_metric_url(@run_metric)
    end

    assert_redirected_to run_metrics_url
  end
  
end


