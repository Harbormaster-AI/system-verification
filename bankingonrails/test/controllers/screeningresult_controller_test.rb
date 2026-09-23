require "test_helper"

class ScreeningResultControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @_screening_result = _screening_results(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create _screening_result" do
    assert_difference("ScreeningResult.count") do
      post _screening_results_url, params: { _screening_result: {
                        Outcome:ScreeningResult.Outcomes[0]
 } }
    end

    assert_redirected_to _screening_results_url
  end

 
  
  test "should destroy _screening_result" do
    assert_difference("ScreeningResult.count", -1) do
      delete _screening_result_url(@_screening_result)
    end

    assert_redirected_to _screening_results_url
  end
  
end


