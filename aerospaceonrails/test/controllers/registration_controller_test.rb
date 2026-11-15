require "test_helper"

class RegistrationControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @registration = registrations(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create registration" do
    assert_difference("Registration.count") do
      post registrations_url, params: { registration: {
        tail_number:"test value", 
registry_country:"test string for registryCountry"
 } }
    end

    assert_redirected_to registrations_url
  end

 
  
  test "should destroy registration" do
    assert_difference("Registration.count", -1) do
      delete registration_url(@registration)
    end

    assert_redirected_to registrations_url
  end
  
end


