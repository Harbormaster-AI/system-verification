require "test_helper"

class ConsentControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @_consent = _consents(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create _consent" do
    assert_difference("Consent.count") do
      post _consents_url, params: { _consent: {
                        Status:Consent.Statuss[0]
 } }
    end

    assert_redirected_to _consents_url
  end

 
  
  test "should destroy _consent" do
    assert_difference("Consent.count", -1) do
      delete _consent_url(@_consent)
    end

    assert_redirected_to _consents_url
  end
  
end


