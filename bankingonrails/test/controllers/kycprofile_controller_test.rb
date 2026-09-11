require "test_helper"

class KycProfileControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @kycProfile = kycProfiles(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create kycProfile" do
    assert_difference("KycProfile.count") do
      post kycProfiles_url, params: { kycProfile: { profileId:"test string for profileId", lastReviewedOn:1.week.ago, Status:KycProfile.Statuss[0] } }
    end

    assert_redirected_to kycProfiles_url
  end

 
  
  test "should destroy kycProfile" do
    assert_difference("KycProfile.count", -1) do
      delete kycProfile_url(@kycProfile)
    end

    assert_redirected_to kycProfiles_url
  end
  
end


