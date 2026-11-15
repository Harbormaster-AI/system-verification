require "test_helper"

class AircraftControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @aircraft = aircrafts(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create aircraft" do
    assert_difference("Aircraft.count") do
      post aircrafts_url, params: { aircraft: {
        msn:"test value", 
delivery_date:1.week.ago
 } }
    end

    assert_redirected_to aircrafts_url
  end

 
  
  test "should destroy aircraft" do
    assert_difference("Aircraft.count", -1) do
      delete aircraft_url(@aircraft)
    end

    assert_redirected_to aircrafts_url
  end
  
end


