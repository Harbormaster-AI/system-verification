require "test_helper"

class ScreeningResultControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @screening_result = screening_results(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create screening_result" do
    assert_difference("ScreeningResult.count") do
      post screening_results_url, params: { screening_result: {
        screening_date:1.week.ago, 
provider:"test string for provider", 
outcome:ScreeningResult.Outcomes[0]
 } }
    end

    assert_redirected_to screening_results_url
  end

 
  
  test "should destroy screening_result" do
    assert_difference("ScreeningResult.count", -1) do
      delete screening_result_url(@screening_result)
    end

    assert_redirected_to screening_results_url
  end
  
end


