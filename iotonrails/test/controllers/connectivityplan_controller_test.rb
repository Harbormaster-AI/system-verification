require "test_helper"

class ConnectivityPlanControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @connectivityPlan = connectivityPlans(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create connectivityPlan" do
    assert_difference("ConnectivityPlan.count") do
      post connectivityPlans_url, params: { connectivityPlan: { name:"test string for name", dataCapMB:100, billingCycleDays:100 } }
    end

    assert_redirected_to connectivityPlans_url
  end

 
  
  test "should destroy connectivityPlan" do
    assert_difference("ConnectivityPlan.count", -1) do
      delete connectivityPlan_url(@connectivityPlan)
    end

    assert_redirected_to connectivityPlans_url
  end
  
end


