require "test_helper"

class RiskAssessmentControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @risk_assessment = risk_assessments(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create risk_assessment" do
    assert_difference("RiskAssessment.count") do
      post risk_assessments_url, params: { risk_assessment: {
                        Rating:RiskAssessment.Ratings[0]
 } }
    end

    assert_redirected_to risk_assessments_url
  end

 
  
  test "should destroy risk_assessment" do
    assert_difference("RiskAssessment.count", -1) do
      delete risk_assessment_url(@risk_assessment)
    end

    assert_redirected_to risk_assessments_url
  end
  
end


