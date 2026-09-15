require "test_helper"

class BuildingControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @building = buildings(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create building" do
    assert_difference("Building.count") do
      post buildings_url, params: { building: { name:"test string for name" } }
    end

    assert_redirected_to buildings_url
  end

 
  
  test "should destroy building" do
    assert_difference("Building.count", -1) do
      delete building_url(@building)
    end

    assert_redirected_to buildings_url
  end
  
end


