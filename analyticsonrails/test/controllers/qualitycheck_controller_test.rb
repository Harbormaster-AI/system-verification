require "test_helper"

class QualityCheckControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @quality_check = quality_checks(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create quality_check" do
    assert_difference("QualityCheck.count") do
      post quality_checks_url, params: { quality_check: {
        checked_at:1.week.ago, 
observed_value:"test value", 
sample_size:100, 
status:QualityCheck.Statuss[0]
 } }
    end

    assert_redirected_to quality_checks_url
  end

 
  
  test "should destroy quality_check" do
    assert_difference("QualityCheck.count", -1) do
      delete quality_check_url(@quality_check)
    end

    assert_redirected_to quality_checks_url
  end
  
end


