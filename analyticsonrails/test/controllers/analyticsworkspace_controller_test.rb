require "test_helper"

class AnalyticsWorkspaceControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @analytics_workspace = analytics_workspaces(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create analytics_workspace" do
    assert_difference("AnalyticsWorkspace.count") do
      post analytics_workspaces_url, params: { analytics_workspace: {
        name:"test string for name", 
business_domain:"test string for businessDomain", 
owner_team:"test string for ownerTeam", 
governance_tier:AnalyticsWorkspace.GovernanceTiers[0]
 } }
    end

    assert_redirected_to analytics_workspaces_url
  end

 
  
  test "should destroy analytics_workspace" do
    assert_difference("AnalyticsWorkspace.count", -1) do
      delete analytics_workspace_url(@analytics_workspace)
    end

    assert_redirected_to analytics_workspaces_url
  end
  
end


