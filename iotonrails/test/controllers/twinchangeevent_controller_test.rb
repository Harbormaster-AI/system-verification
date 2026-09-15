require "test_helper"

class TwinChangeEventControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @twinChangeEvent = twinChangeEvents(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create twinChangeEvent" do
    assert_difference("TwinChangeEvent.count") do
      post twinChangeEvents_url, params: { twinChangeEvent: { eventId:"test string for eventId", occurredAt:1.week.ago, ChangeType:TwinChangeEvent.ChangeTypes[0] } }
    end

    assert_redirected_to twinChangeEvents_url
  end

 
  
  test "should destroy twinChangeEvent" do
    assert_difference("TwinChangeEvent.count", -1) do
      delete twinChangeEvent_url(@twinChangeEvent)
    end

    assert_redirected_to twinChangeEvents_url
  end
  
end


