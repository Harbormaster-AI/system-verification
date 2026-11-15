require "test_helper"

class EvaluationMetricControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @evaluation_metric = evaluation_metrics(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create evaluation_metric" do
    assert_difference("EvaluationMetric.count") do
      post evaluation_metrics_url, params: { evaluation_metric: {
        name:"test string for name", 
value:"test value"
 } }
    end

    assert_redirected_to evaluation_metrics_url
  end

 
  
  test "should destroy evaluation_metric" do
    assert_difference("EvaluationMetric.count", -1) do
      delete evaluation_metric_url(@evaluation_metric)
    end

    assert_redirected_to evaluation_metrics_url
  end
  
end


