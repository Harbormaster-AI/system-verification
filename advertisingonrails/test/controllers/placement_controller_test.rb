require "test_helper"

class PlacementControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @placement = placements(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create placement" do
    assert_difference("Placement.count") do
      post placements_url, params: { placement: { name:"test string for name", flight:1.week.ago, goalImpressions:100 } }
    end

    assert_redirected_to placements_url
  end

 
  
  test "should destroy placement" do
    assert_difference("Placement.count", -1) do
      delete placement_url(@placement)
    end

    assert_redirected_to placements_url
  end
  
end


