require "test_helper"

class FlightHealthEventControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @flight_health_event = flight_health_events(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create flight_health_event" do
    assert_difference("FlightHealthEvent.count") do
      post flight_health_events_url, params: { flight_health_event: {
        event_code:"test string for eventCode", 
severity:FlightHealthEvent.Severitys[0]
 } }
    end

    assert_redirected_to flight_health_events_url
  end

 
  
  test "should destroy flight_health_event" do
    assert_difference("FlightHealthEvent.count", -1) do
      delete flight_health_event_url(@flight_health_event)
    end

    assert_redirected_to flight_health_events_url
  end
  
end


