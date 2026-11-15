require "test_helper"

class ConnectedAircraftControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @connected_aircraft = connected_aircrafts(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create connected_aircraft" do
    assert_difference("ConnectedAircraft.count") do
      post connected_aircrafts_url, params: { connected_aircraft: {
        communications_provider:"test string for communicationsProvider", 
connectivity_status:ConnectedAircraft.ConnectivityStatuss[0]
 } }
    end

    assert_redirected_to connected_aircrafts_url
  end

 
  
  test "should destroy connected_aircraft" do
    assert_difference("ConnectedAircraft.count", -1) do
      delete connected_aircraft_url(@connected_aircraft)
    end

    assert_redirected_to connected_aircrafts_url
  end
  
end


