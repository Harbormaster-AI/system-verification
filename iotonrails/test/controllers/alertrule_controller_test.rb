require "test_helper"

class AlertRuleControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @alertRule = alertRules(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create alertRule" do
    assert_difference("AlertRule.count") do
      post alertRules_url, params: { alertRule: { name:"test string for name", expression:"test string for expression", Severity:AlertRule.Severitys[0] } }
    end

    assert_redirected_to alertRules_url
  end

 
  
  test "should destroy alertRule" do
    assert_difference("AlertRule.count", -1) do
      delete alertRule_url(@alertRule)
    end

    assert_redirected_to alertRules_url
  end
  
end


