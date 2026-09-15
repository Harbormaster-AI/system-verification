require "test_helper"

class DeviceModelControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @deviceModel = deviceModels(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create deviceModel" do
    assert_difference("DeviceModel.count") do
      post deviceModels_url, params: { deviceModel: { name:"test string for name", modelNumber:"test string for modelNumber", hardwareRevision:"test string for hardwareRevision", SupportedConnectivity:DeviceModel.SupportedConnectivitys[0], DefaultTelemetryEncoding:DeviceModel.DefaultTelemetryEncodings[0] } }
    end

    assert_redirected_to deviceModels_url
  end

 
  
  test "should destroy deviceModel" do
    assert_difference("DeviceModel.count", -1) do
      delete deviceModel_url(@deviceModel)
    end

    assert_redirected_to deviceModels_url
  end
  
end


