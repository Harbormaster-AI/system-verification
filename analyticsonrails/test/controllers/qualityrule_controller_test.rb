require "test_helper"

class QualityRuleControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @quality_rule = quality_rules(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create quality_rule" do
    assert_difference("QualityRule.count") do
      post quality_rules_url, params: { quality_rule: {
        name:"test string for name", 
threshold:"test value", 
target_field:"test string for targetField", 
dimension:QualityRule.Dimensions[0], 
operator_:QualityRule.Operator_s[0]
 } }
    end

    assert_redirected_to quality_rules_url
  end

 
  
  test "should destroy quality_rule" do
    assert_difference("QualityRule.count", -1) do
      delete quality_rule_url(@quality_rule)
    end

    assert_redirected_to quality_rules_url
  end
  
end


