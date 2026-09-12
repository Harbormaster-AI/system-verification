require "test_helper"

class ThirdPartyProviderControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @thirdPartyProvider = thirdPartyProviders(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create thirdPartyProvider" do
    assert_difference("ThirdPartyProvider.count") do
      post thirdPartyProviders_url, params: { thirdPartyProvider: { name:"test string for name", registrationId:"test string for registrationId", website:"test string for website" } }
    end

    assert_redirected_to thirdPartyProviders_url
  end

 
  
  test "should destroy thirdPartyProvider" do
    assert_difference("ThirdPartyProvider.count", -1) do
      delete thirdPartyProvider_url(@thirdPartyProvider)
    end

    assert_redirected_to thirdPartyProviders_url
  end
  
end


