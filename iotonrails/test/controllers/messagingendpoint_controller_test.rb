require "test_helper"

class MessagingEndpointControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @messagingEndpoint = messagingEndpoints(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create messagingEndpoint" do
    assert_difference("MessagingEndpoint.count") do
      post messagingEndpoints_url, params: { messagingEndpoint: { host:"test string for host", port:100, secure:true, Protocol:MessagingEndpoint.Protocols[0] } }
    end

    assert_redirected_to messagingEndpoints_url
  end

 
  
  test "should destroy messagingEndpoint" do
    assert_difference("MessagingEndpoint.count", -1) do
      delete messagingEndpoint_url(@messagingEndpoint)
    end

    assert_redirected_to messagingEndpoints_url
  end
  
end


