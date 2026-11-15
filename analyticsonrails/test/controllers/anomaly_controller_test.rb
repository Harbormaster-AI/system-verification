require "test_helper"

class AnomalyControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @anomaly = anomalys(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create anomaly" do
    assert_difference("Anomaly.count") do
      post anomalys_url, params: { anomaly: {
        occurred_at:1.week.ago, 
details:"test string for details", 
anomaly_type:Anomaly.AnomalyTypes[0], 
severity:Anomaly.Severitys[0]
 } }
    end

    assert_redirected_to anomalys_url
  end

 
  
  test "should destroy anomaly" do
    assert_difference("Anomaly.count", -1) do
      delete anomaly_url(@anomaly)
    end

    assert_redirected_to anomalys_url
  end
  
end


