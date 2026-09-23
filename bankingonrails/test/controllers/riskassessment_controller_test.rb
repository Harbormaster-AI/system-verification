require "test_helper"

class RiskAssessmentControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @_risk_assessment = _risk_assessments(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create _risk_assessment" do
    assert_difference("RiskAssessment.count") do
      post _risk_assessments_url, params: { _risk_assessment: {
                        Rating:RiskAssessment.Ratings[0]
 } }
    end

    assert_redirected_to _risk_assessments_url
  end

 
  
  test "should destroy _risk_assessment" do
    assert_difference("RiskAssessment.count", -1) do
      delete _risk_assessment_url(@_risk_assessment)
    end

    assert_redirected_to _risk_assessments_url
  end
  
end


