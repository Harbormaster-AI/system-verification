require "test_helper"

class AircraftOptionControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @aircraft_option = aircraft_options(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create aircraft_option" do
    assert_difference("AircraftOption.count") do
      post aircraft_options_url, params: { aircraft_option: {
        code:"test string for code", 
name:"test string for name", 
option_category:AircraftOption.OptionCategorys[0]
 } }
    end

    assert_redirected_to aircraft_options_url
  end

 
  
  test "should destroy aircraft_option" do
    assert_difference("AircraftOption.count", -1) do
      delete aircraft_option_url(@aircraft_option)
    end

    assert_redirected_to aircraft_options_url
  end
  
end


