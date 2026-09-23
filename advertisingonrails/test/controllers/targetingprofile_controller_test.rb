require "test_helper"

class TargetingProfileControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @targetingProfile = targetingProfiles(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create targetingProfile" do
    assert_difference("TargetingProfile.count") do
      post targetingProfiles_url, params: { targetingProfile: { name:"test string for name" } }
    end

    assert_redirected_to targetingProfiles_url
  end

 
  
  test "should destroy targetingProfile" do
    assert_difference("TargetingProfile.count", -1) do
      delete targetingProfile_url(@targetingProfile)
    end

    assert_redirected_to targetingProfiles_url
  end
  
end


