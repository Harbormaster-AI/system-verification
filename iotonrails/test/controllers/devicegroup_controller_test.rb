require "test_helper"

class DeviceGroupControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @deviceGroup = deviceGroups(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create deviceGroup" do
    assert_difference("DeviceGroup.count") do
      post deviceGroups_url, params: { deviceGroup: { name:"test string for name", criteria:"test string for criteria" } }
    end

    assert_redirected_to deviceGroups_url
  end

 
  
  test "should destroy deviceGroup" do
    assert_difference("DeviceGroup.count", -1) do
      delete deviceGroup_url(@deviceGroup)
    end

    assert_redirected_to deviceGroups_url
  end
  
end


