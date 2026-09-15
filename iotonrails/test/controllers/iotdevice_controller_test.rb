require "test_helper"

class IoTDeviceControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @ioTDevice = ioTDevices(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create ioTDevice" do
    assert_difference("IoTDevice.count") do
      post ioTDevices_url, params: { ioTDevice: { deviceId:"test value", serialNumber:"test string for serialNumber", lastSeen:1.week.ago, firmwareVersion:"test value", Status:IoTDevice.Statuss[0], PowerSource:IoTDevice.PowerSources[0] } }
    end

    assert_redirected_to ioTDevices_url
  end

 
  
  test "should destroy ioTDevice" do
    assert_difference("IoTDevice.count", -1) do
      delete ioTDevice_url(@ioTDevice)
    end

    assert_redirected_to ioTDevices_url
  end
  
end


