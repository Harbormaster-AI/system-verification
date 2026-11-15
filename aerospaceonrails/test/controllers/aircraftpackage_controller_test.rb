require "test_helper"

class AircraftPackageControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @aircraft_package = aircraft_packages(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create aircraft_package" do
    assert_difference("AircraftPackage.count") do
      post aircraft_packages_url, params: { aircraft_package: {
        name:"test string for name", 
package_type:AircraftPackage.PackageTypes[0]
 } }
    end

    assert_redirected_to aircraft_packages_url
  end

 
  
  test "should destroy aircraft_package" do
    assert_difference("AircraftPackage.count", -1) do
      delete aircraft_package_url(@aircraft_package)
    end

    assert_redirected_to aircraft_packages_url
  end
  
end


