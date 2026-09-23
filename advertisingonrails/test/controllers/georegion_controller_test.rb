require "test_helper"

class GeoRegionControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @geoRegion = geoRegions(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create geoRegion" do
    assert_difference("GeoRegion.count") do
      post geoRegions_url, params: { geoRegion: { code:"test string for code", name:"test string for name", RegionType:GeoRegion.RegionTypes[0] } }
    end

    assert_redirected_to geoRegions_url
  end

 
  
  test "should destroy geoRegion" do
    assert_difference("GeoRegion.count", -1) do
      delete geoRegion_url(@geoRegion)
    end

    assert_redirected_to geoRegions_url
  end
  
end


