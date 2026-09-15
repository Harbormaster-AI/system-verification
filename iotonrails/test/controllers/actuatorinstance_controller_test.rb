require "test_helper"

class ActuatorInstanceControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @actuatorInstance = actuatorInstances(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create actuatorInstance" do
    assert_difference("ActuatorInstance.count") do
      post actuatorInstances_url, params: { actuatorInstance: { name:"test string for name", commandTopic:"test value", ActuatorType:ActuatorInstance.ActuatorTypes[0] } }
    end

    assert_redirected_to actuatorInstances_url
  end

 
  
  test "should destroy actuatorInstance" do
    assert_difference("ActuatorInstance.count", -1) do
      delete actuatorInstance_url(@actuatorInstance)
    end

    assert_redirected_to actuatorInstances_url
  end
  
end


