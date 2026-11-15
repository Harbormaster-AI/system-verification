require "test_helper"

class AircraftOrderControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @aircraft_order = aircraft_orders(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create aircraft_order" do
    assert_difference("AircraftOrder.count") do
      post aircraft_orders_url, params: { aircraft_order: {
        order_number:"test string for orderNumber", 
total_amount:"test value", 
status:AircraftOrder.Statuss[0]
 } }
    end

    assert_redirected_to aircraft_orders_url
  end

 
  
  test "should destroy aircraft_order" do
    assert_difference("AircraftOrder.count", -1) do
      delete aircraft_order_url(@aircraft_order)
    end

    assert_redirected_to aircraft_orders_url
  end
  
end


