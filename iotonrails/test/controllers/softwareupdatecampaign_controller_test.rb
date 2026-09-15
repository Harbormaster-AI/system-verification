require "test_helper"

class SoftwareUpdateCampaignControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @softwareUpdateCampaign = softwareUpdateCampaigns(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create softwareUpdateCampaign" do
    assert_difference("SoftwareUpdateCampaign.count") do
      post softwareUpdateCampaigns_url, params: { softwareUpdateCampaign: { campaignCode:"test string for campaignCode", scheduledStart:1.week.ago, scheduledEnd:1.week.ago, Status:SoftwareUpdateCampaign.Statuss[0] } }
    end

    assert_redirected_to softwareUpdateCampaigns_url
  end

 
  
  test "should destroy softwareUpdateCampaign" do
    assert_difference("SoftwareUpdateCampaign.count", -1) do
      delete softwareUpdateCampaign_url(@softwareUpdateCampaign)
    end

    assert_redirected_to softwareUpdateCampaigns_url
  end
  
end


