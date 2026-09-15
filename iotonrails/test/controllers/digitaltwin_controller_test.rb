require "test_helper"

class DigitalTwinControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @digitalTwin = digitalTwins(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create digitalTwin" do
    assert_difference("DigitalTwin.count") do
      post digitalTwins_url, params: { digitalTwin: { twinId:"test string for twinId", desiredStateVersion:100, reportedStateVersion:100, lastSyncAt:1.week.ago } }
    end

    assert_redirected_to digitalTwins_url
  end

 
  
  test "should destroy digitalTwin" do
    assert_difference("DigitalTwin.count", -1) do
      delete digitalTwin_url(@digitalTwin)
    end

    assert_redirected_to digitalTwins_url
  end
  
end


