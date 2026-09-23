require "test_helper"

class ConversionEventControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @conversionEvent = conversionEvents(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create conversionEvent" do
    assert_difference("ConversionEvent.count") do
      post conversionEvents_url, params: { conversionEvent: { timestamp:1.week.ago, value:"test value", EventType:ConversionEvent.EventTypes[0], AttributionModel:ConversionEvent.AttributionModels[0] } }
    end

    assert_redirected_to conversionEvents_url
  end

 
  
  test "should destroy conversionEvent" do
    assert_difference("ConversionEvent.count", -1) do
      delete conversionEvent_url(@conversionEvent)
    end

    assert_redirected_to conversionEvents_url
  end
  
end


