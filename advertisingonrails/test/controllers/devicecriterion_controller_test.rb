require "test_helper"

class DeviceCriterionControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @deviceCriterion = deviceCriterions(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create deviceCriterion" do
    assert_difference("DeviceCriterion.count") do
      post deviceCriterions_url, params: { deviceCriterion: { DeviceType:DeviceCriterion.DeviceTypes[0], PlatformType:DeviceCriterion.PlatformTypes[0], Operator_:DeviceCriterion.Operator_s[0] } }
    end

    assert_redirected_to deviceCriterions_url
  end

 
  
  test "should destroy deviceCriterion" do
    assert_difference("DeviceCriterion.count", -1) do
      delete deviceCriterion_url(@deviceCriterion)
    end

    assert_redirected_to deviceCriterions_url
  end
  
end


