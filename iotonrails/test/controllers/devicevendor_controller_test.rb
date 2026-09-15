require "test_helper"

class DeviceVendorControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @deviceVendor = deviceVendors(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create deviceVendor" do
    assert_difference("DeviceVendor.count") do
      post deviceVendors_url, params: { deviceVendor: { name:"test string for name", legalName:"test string for legalName", headquartersCountry:"test string for headquartersCountry", website:"test string for website" } }
    end

    assert_redirected_to deviceVendors_url
  end

 
  
  test "should destroy deviceVendor" do
    assert_difference("DeviceVendor.count", -1) do
      delete deviceVendor_url(@deviceVendor)
    end

    assert_redirected_to deviceVendors_url
  end
  
end


