require "test_helper"

class KycProfileControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @kyc_profile = kyc_profiles(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create kyc_profile" do
    assert_difference("KycProfile.count") do
      post kyc_profiles_url, params: { kyc_profile: {
                        Status:KycProfile.Statuss[0]
 } }
    end

    assert_redirected_to kyc_profiles_url
  end

 
  
  test "should destroy kyc_profile" do
    assert_difference("KycProfile.count", -1) do
      delete kyc_profile_url(@kyc_profile)
    end

    assert_redirected_to kyc_profiles_url
  end
  
end


