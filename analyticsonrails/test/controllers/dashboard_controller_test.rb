require "test_helper"

class DashboardControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @dashboard = dashboards(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create dashboard" do
    assert_difference("Dashboard.count") do
      post dashboards_url, params: { dashboard: {
        title:"test string for title", 
theme:"test string for theme", 
status:Dashboard.Statuss[0]
 } }
    end

    assert_redirected_to dashboards_url
  end

 
  
  test "should destroy dashboard" do
    assert_difference("Dashboard.count", -1) do
      delete dashboard_url(@dashboard)
    end

    assert_redirected_to dashboards_url
  end
  
end


