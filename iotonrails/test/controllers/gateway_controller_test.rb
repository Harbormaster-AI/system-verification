require "test_helper"

class GatewayControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @gateway = gateways(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create gateway" do
    assert_difference("Gateway.count") do
      post gateways_url, params: { gateway: { softwareVersion:"test string for softwareVersion", Status:Gateway.Statuss[0] } }
    end

    assert_redirected_to gateways_url
  end

 
  
  test "should destroy gateway" do
    assert_difference("Gateway.count", -1) do
      delete gateway_url(@gateway)
    end

    assert_redirected_to gateways_url
  end
  
end


