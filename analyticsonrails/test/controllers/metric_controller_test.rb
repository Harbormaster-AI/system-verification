require "test_helper"

class MetricControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @metric = metrics(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create metric" do
    assert_difference("Metric.count") do
      post metrics_url, params: { metric: {
        name:"test string for name", 
expression:"test string for expression", 
unit:"test string for unit", 
metric_type:Metric.MetricTypes[0]
 } }
    end

    assert_redirected_to metrics_url
  end

 
  
  test "should destroy metric" do
    assert_difference("Metric.count", -1) do
      delete metric_url(@metric)
    end

    assert_redirected_to metrics_url
  end
  
end


