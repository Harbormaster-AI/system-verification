require "test_helper"

class AircraftFamilyControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @aircraft_family = aircraft_familys(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create aircraft_family" do
    assert_difference("AircraftFamily.count") do
      post aircraft_familys_url, params: { aircraft_family: {
        name:"test string for name", 
family_code:"test string for familyCode"
 } }
    end

    assert_redirected_to aircraft_familys_url
  end

 
  
  test "should destroy aircraft_family" do
    assert_difference("AircraftFamily.count", -1) do
      delete aircraft_family_url(@aircraft_family)
    end

    assert_redirected_to aircraft_familys_url
  end
  
end


