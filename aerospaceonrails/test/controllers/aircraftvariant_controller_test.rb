require "test_helper"

class AircraftVariantControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @aircraft_variant = aircraft_variants(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create aircraft_variant" do
    assert_difference("AircraftVariant.count") do
      post aircraft_variants_url, params: { aircraft_variant: {
        variant_code:"test string for variantCode", 
range_nm:100, 
max_takeoff_weight_kg:"test value"
 } }
    end

    assert_redirected_to aircraft_variants_url
  end

 
  
  test "should destroy aircraft_variant" do
    assert_difference("AircraftVariant.count", -1) do
      delete aircraft_variant_url(@aircraft_variant)
    end

    assert_redirected_to aircraft_variants_url
  end
  
end


