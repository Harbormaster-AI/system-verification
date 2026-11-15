require "test_helper"

class SalesCampaignControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @sales_campaign = sales_campaigns(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create sales_campaign" do
    assert_difference("SalesCampaign.count") do
      post sales_campaigns_url, params: { sales_campaign: {
        campaign_code:"test string for campaignCode", 
status:SalesCampaign.Statuss[0]
 } }
    end

    assert_redirected_to sales_campaigns_url
  end

 
  
  test "should destroy sales_campaign" do
    assert_difference("SalesCampaign.count", -1) do
      delete sales_campaign_url(@sales_campaign)
    end

    assert_redirected_to sales_campaigns_url
  end
  
end


