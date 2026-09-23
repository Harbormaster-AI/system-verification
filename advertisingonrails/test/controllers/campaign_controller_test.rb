require "test_helper"

class CampaignControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @campaign = campaigns(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create campaign" do
    assert_difference("Campaign.count") do
      post campaigns_url, params: { campaign: { name:"test string for name", totalBudget:"test value", flight:1.week.ago, Objective:Campaign.Objectives[0], Status:Campaign.Statuss[0] } }
    end

    assert_redirected_to campaigns_url
  end

 
  
  test "should destroy campaign" do
    assert_difference("Campaign.count", -1) do
      delete campaign_url(@campaign)
    end

    assert_redirected_to campaigns_url
  end
  
end


