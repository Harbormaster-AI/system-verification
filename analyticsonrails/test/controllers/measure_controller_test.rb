require "test_helper"

class MeasureControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @measure = measures(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create measure" do
    assert_difference("Measure.count") do
      post measures_url, params: { measure: {
        name:"test string for name", 
format:"test string for format", 
aggregation:Measure.Aggregations[0]
 } }
    end

    assert_redirected_to measures_url
  end

 
  
  test "should destroy measure" do
    assert_difference("Measure.count", -1) do
      delete measure_url(@measure)
    end

    assert_redirected_to measures_url
  end
  
end


