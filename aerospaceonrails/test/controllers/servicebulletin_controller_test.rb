require "test_helper"

class ServiceBulletinControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @service_bulletin = service_bulletins(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create service_bulletin" do
    assert_difference("ServiceBulletin.count") do
      post service_bulletins_url, params: { service_bulletin: {
        bulletin_number:"test string for bulletinNumber", 
category:ServiceBulletin.Categorys[0]
 } }
    end

    assert_redirected_to service_bulletins_url
  end

 
  
  test "should destroy service_bulletin" do
    assert_difference("ServiceBulletin.count", -1) do
      delete service_bulletin_url(@service_bulletin)
    end

    assert_redirected_to service_bulletins_url
  end
  
end


