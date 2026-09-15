require "test_helper"

class AlertControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @alert = alerts(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create alert" do
    assert_difference("Alert.count") do
      post alerts_url, params: { alert: { raisedAt:1.week.ago, clearedAt:1.week.ago, message:"test string for message", Status:Alert.Statuss[0] } }
    end

    assert_redirected_to alerts_url
  end

 
  
  test "should destroy alert" do
    assert_difference("Alert.count", -1) do
      delete alert_url(@alert)
    end

    assert_redirected_to alerts_url
  end
  
end


