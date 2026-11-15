require "test_helper"

class SalesRegionControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @sales_region = sales_regions(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create sales_region" do
    assert_difference("SalesRegion.count") do
      post sales_regions_url, params: { sales_region: {
        name:"test string for name", 
region_code:"test string for regionCode"
 } }
    end

    assert_redirected_to sales_regions_url
  end

 
  
  test "should destroy sales_region" do
    assert_difference("SalesRegion.count", -1) do
      delete sales_region_url(@sales_region)
    end

    assert_redirected_to sales_regions_url
  end
  
end


