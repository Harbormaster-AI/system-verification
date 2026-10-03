require "test_helper"

class ThirdPartyProviderControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @third_party_provider = third_party_providers(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create third_party_provider" do
    assert_difference("ThirdPartyProvider.count") do
      post third_party_providers_url, params: { third_party_provider: {
        name:"test string for name", 
registration_id:"test string for registrationId", 
website:"test string for website"
 } }
    end

    assert_redirected_to third_party_providers_url
  end

 
  
  test "should destroy third_party_provider" do
    assert_difference("ThirdPartyProvider.count", -1) do
      delete third_party_provider_url(@third_party_provider)
    end

    assert_redirected_to third_party_providers_url
  end
  
end


