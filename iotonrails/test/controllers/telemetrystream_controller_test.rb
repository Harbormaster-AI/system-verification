require "test_helper"

class TelemetryStreamControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @telemetryStream = telemetryStreams(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create telemetryStream" do
    assert_difference("TelemetryStream.count") do
      post telemetryStreams_url, params: { telemetryStream: { streamName:"test string for streamName", retentionDays:100, Qos:TelemetryStream.Qoss[0] } }
    end

    assert_redirected_to telemetryStreams_url
  end

 
  
  test "should destroy telemetryStream" do
    assert_difference("TelemetryStream.count", -1) do
      delete telemetryStream_url(@telemetryStream)
    end

    assert_redirected_to telemetryStreams_url
  end
  
end


