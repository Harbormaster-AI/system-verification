require "test_helper"

class RiskAssessmentControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @riskAssessment = riskAssessments(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create riskAssessment" do
    assert_difference("RiskAssessment.count") do
      post riskAssessments_url, params: { riskAssessment: { score:100, assessedOn:1.week.ago, Rating:RiskAssessment.Ratings[0] } }
    end

    assert_redirected_to riskAssessments_url
  end

 
  
  test "should destroy riskAssessment" do
    assert_difference("RiskAssessment.count", -1) do
      delete riskAssessment_url(@riskAssessment)
    end

    assert_redirected_to riskAssessments_url
  end
  
end


