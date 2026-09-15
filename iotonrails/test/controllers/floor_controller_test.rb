require "test_helper"

class FloorControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @floor = floors(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create floor" do
    assert_difference("Floor.count") do
      post floors_url, params: { floor: { name:"test string for name", level:100 } }
    end

    assert_redirected_to floors_url
  end

 
  
  test "should destroy floor" do
    assert_difference("Floor.count", -1) do
      delete floor_url(@floor)
    end

    assert_redirected_to floors_url
  end
  
end


