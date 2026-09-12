require "test_helper"

class ScreeningResultControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @screeningResult = screeningResults(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create screeningResult" do
    assert_difference("ScreeningResult.count") do
      post screeningResults_url, params: { screeningResult: { screeningDate:1.week.ago, provider:"test string for provider", Outcome:ScreeningResult.Outcomes[0] } }
    end

    assert_redirected_to screeningResults_url
  end

 
  
  test "should destroy screeningResult" do
    assert_difference("ScreeningResult.count", -1) do
      delete screeningResult_url(@screeningResult)
    end

    assert_redirected_to screeningResults_url
  end
  
end


