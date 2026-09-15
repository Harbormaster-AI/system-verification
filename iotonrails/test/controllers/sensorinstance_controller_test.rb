require "test_helper"

class SensorInstanceControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @sensorInstance = sensorInstances(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create sensorInstance" do
    assert_difference("SensorInstance.count") do
      post sensorInstances_url, params: { sensorInstance: { name:"test string for name", unit:"test string for unit", samplingIntervalMs:100, SensorType:SensorInstance.SensorTypes[0] } }
    end

    assert_redirected_to sensorInstances_url
  end

 
  
  test "should destroy sensorInstance" do
    assert_difference("SensorInstance.count", -1) do
      delete sensorInstance_url(@sensorInstance)
    end

    assert_redirected_to sensorInstances_url
  end
  
end


