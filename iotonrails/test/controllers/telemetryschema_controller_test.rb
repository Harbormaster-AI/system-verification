require "test_helper"

class TelemetrySchemaControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @telemetrySchema = telemetrySchemas(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create telemetrySchema" do
    assert_difference("TelemetrySchema.count") do
      post telemetrySchemas_url, params: { telemetrySchema: { schemaId:"test string for schemaId", schemaUri:"test value", Encoding:TelemetrySchema.Encodings[0] } }
    end

    assert_redirected_to telemetrySchemas_url
  end

 
  
  test "should destroy telemetrySchema" do
    assert_difference("TelemetrySchema.count", -1) do
      delete telemetrySchema_url(@telemetrySchema)
    end

    assert_redirected_to telemetrySchemas_url
  end
  
end


