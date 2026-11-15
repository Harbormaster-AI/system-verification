require "test_helper"

class FraudScenarioControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @fraud_scenario = fraud_scenarios(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create fraud_scenario" do
    assert_difference("FraudScenario.count") do
      post fraud_scenarios_url, params: { fraud_scenario: {
        name:"test string for name", 
risk_appetite:"test string for riskAppetite", 
detection_type:FraudScenario.DetectionTypes[0]
 } }
    end

    assert_redirected_to fraud_scenarios_url
  end

 
  
  test "should destroy fraud_scenario" do
    assert_difference("FraudScenario.count", -1) do
      delete fraud_scenario_url(@fraud_scenario)
    end

    assert_redirected_to fraud_scenarios_url
  end
  
end


