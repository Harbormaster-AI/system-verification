require "test_helper"

class NetworkProfileControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @networkProfile = networkProfiles(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create networkProfile" do
    assert_difference("NetworkProfile.count") do
      post networkProfiles_url, params: { networkProfile: { profileName:"test string for profileName", ssid:"test string for ssid", apn:"test string for apn", ConnectivityType:NetworkProfile.ConnectivityTypes[0] } }
    end

    assert_redirected_to networkProfiles_url
  end

 
  
  test "should destroy networkProfile" do
    assert_difference("NetworkProfile.count", -1) do
      delete networkProfile_url(@networkProfile)
    end

    assert_redirected_to networkProfiles_url
  end
  
end


