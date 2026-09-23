require "test_helper"

class ConsentControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @consent = consents(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create consent" do
    assert_difference("Consent.count") do
      post consents_url, params: { consent: { grantedOn:1.week.ago, expiresOn:1.week.ago, ConsentType:Consent.ConsentTypes[0], Status:Consent.Statuss[0] } }
    end

    assert_redirected_to consents_url
  end

 
  
  test "should destroy consent" do
    assert_difference("Consent.count", -1) do
      delete consent_url(@consent)
    end

    assert_redirected_to consents_url
  end
  
end


