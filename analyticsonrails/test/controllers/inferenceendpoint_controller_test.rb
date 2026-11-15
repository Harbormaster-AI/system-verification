require "test_helper"

class InferenceEndpointControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @inference_endpoint = inference_endpoints(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create inference_endpoint" do
    assert_difference("InferenceEndpoint.count") do
      post inference_endpoints_url, params: { inference_endpoint: {
        name:"test string for name", 
endpoint_url:"test string for endpointUrl", 
traffic_share:"test value", 
mode:InferenceEndpoint.Modes[0]
 } }
    end

    assert_redirected_to inference_endpoints_url
  end

 
  
  test "should destroy inference_endpoint" do
    assert_difference("InferenceEndpoint.count", -1) do
      delete inference_endpoint_url(@inference_endpoint)
    end

    assert_redirected_to inference_endpoints_url
  end
  
end


