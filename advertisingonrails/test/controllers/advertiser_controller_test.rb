require "test_helper"

class AdvertiserControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @advertiser = advertisers(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create advertiser" do
    assert_difference("Advertiser.count") do
      post advertisers_url, params: { advertiser: { name:"test string for name", legalName:"test string for legalName", industry:"test string for industry", website:"test string for website" } }
    end

    assert_redirected_to advertisers_url
  end

 
  
  test "should destroy advertiser" do
    assert_difference("Advertiser.count", -1) do
      delete advertiser_url(@advertiser)
    end

    assert_redirected_to advertisers_url
  end
  
end


