require "test_helper"

class SubscriberControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @subscriber = subscribers(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create subscriber" do
    assert_difference("Subscriber.count") do
      post subscribers_url, params: { subscriber: {
        name:"test string for name", 
address:"test string for address", 
channel:Subscriber.Channels[0]
 } }
    end

    assert_redirected_to subscribers_url
  end

 
  
  test "should destroy subscriber" do
    assert_difference("Subscriber.count", -1) do
      delete subscriber_url(@subscriber)
    end

    assert_redirected_to subscribers_url
  end
  
end


