require "test_helper"

class DimensionControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @dimension = dimensions(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create dimension" do
    assert_difference("Dimension.count") do
      post dimensions_url, params: { dimension: {
        name:"test string for name", 
type_time:true, 
dimension_type:Dimension.DimensionTypes[0]
 } }
    end

    assert_redirected_to dimensions_url
  end

 
  
  test "should destroy dimension" do
    assert_difference("Dimension.count", -1) do
      delete dimension_url(@dimension)
    end

    assert_redirected_to dimensions_url
  end
  
end


