require "test_helper"

class KycProfileControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @_kyc_profile = _kyc_profiles(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create _kyc_profile" do
    assert_difference("KycProfile.count") do
      post _kyc_profiles_url, params: { _kyc_profile: {
                        Status:KycProfile.Statuss[0]
 } }
    end

    assert_redirected_to _kyc_profiles_url
  end

 
  
  test "should destroy _kyc_profile" do
    assert_difference("KycProfile.count", -1) do
      delete _kyc_profile_url(@_kyc_profile)
    end

    assert_redirected_to _kyc_profiles_url
  end
  
end


