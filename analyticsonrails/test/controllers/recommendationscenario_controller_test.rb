require "test_helper"

class RecommendationScenarioControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @recommendation_scenario = recommendation_scenarios(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create recommendation_scenario" do
    assert_difference("RecommendationScenario.count") do
      post recommendation_scenarios_url, params: { recommendation_scenario: {
        name:"test string for name", 
objective:"test string for objective", 
recommendation_type:RecommendationScenario.RecommendationTypes[0]
 } }
    end

    assert_redirected_to recommendation_scenarios_url
  end

 
  
  test "should destroy recommendation_scenario" do
    assert_difference("RecommendationScenario.count", -1) do
      delete recommendation_scenario_url(@recommendation_scenario)
    end

    assert_redirected_to recommendation_scenarios_url
  end
  
end


