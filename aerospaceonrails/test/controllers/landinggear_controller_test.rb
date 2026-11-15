require "test_helper"

class LandingGearControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @landing_gear = landing_gears(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create landing_gear" do
    assert_difference("LandingGear.count") do
      post landing_gears_url, params: { landing_gear: {
        supplier_part_number:"test string for supplierPartNumber", 
gear_type:LandingGear.GearTypes[0]
 } }
    end

    assert_redirected_to landing_gears_url
  end

 
  
  test "should destroy landing_gear" do
    assert_difference("LandingGear.count", -1) do
      delete landing_gear_url(@landing_gear)
    end

    assert_redirected_to landing_gears_url
  end
  
end


