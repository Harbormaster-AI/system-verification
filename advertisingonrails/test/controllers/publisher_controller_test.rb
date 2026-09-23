require "test_helper"

class PublisherControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @publisher = publishers(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create publisher" do
    assert_difference("Publisher.count") do
      post publishers_url, params: { publisher: { name:"test string for name", website:"test string for website", PublisherType:Publisher.PublisherTypes[0] } }
    end

    assert_redirected_to publishers_url
  end

 
  
  test "should destroy publisher" do
    assert_difference("Publisher.count", -1) do
      delete publisher_url(@publisher)
    end

    assert_redirected_to publishers_url
  end
  
end


