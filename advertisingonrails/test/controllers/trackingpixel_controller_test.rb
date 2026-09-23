require "test_helper"

class TrackingPixelControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @trackingPixel = trackingPixels(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create trackingPixel" do
    assert_difference("TrackingPixel.count") do
      post trackingPixels_url, params: { trackingPixel: { name:"test string for name", url:"test value", EventType:TrackingPixel.EventTypes[0], PixelType:TrackingPixel.PixelTypes[0] } }
    end

    assert_redirected_to trackingPixels_url
  end

 
  
  test "should destroy trackingPixel" do
    assert_difference("TrackingPixel.count", -1) do
      delete trackingPixel_url(@trackingPixel)
    end

    assert_redirected_to trackingPixels_url
  end
  
end


