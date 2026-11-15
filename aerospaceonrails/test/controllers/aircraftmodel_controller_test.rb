require "test_helper"

class AircraftModelControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @aircraft_model = aircraft_models(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create aircraft_model" do
    assert_difference("AircraftModel.count") do
      post aircraft_models_url, params: { aircraft_model: {
        name:"test string for name", 
model_designation:"test string for modelDesignation", 
aircraft_type:AircraftModel.AircraftTypes[0]
 } }
    end

    assert_redirected_to aircraft_models_url
  end

 
  
  test "should destroy aircraft_model" do
    assert_difference("AircraftModel.count", -1) do
      delete aircraft_model_url(@aircraft_model)
    end

    assert_redirected_to aircraft_models_url
  end
  
end


