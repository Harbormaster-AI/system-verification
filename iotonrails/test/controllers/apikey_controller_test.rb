require "test_helper"

class ApiKeyControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @apiKey = apiKeys(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create apiKey" do
    assert_difference("ApiKey.count") do
      post apiKeys_url, params: { apiKey: { keyId:"test string for keyId", hashedSecret:"test string for hashedSecret", createdAt:1.week.ago, lastUsedAt:1.week.ago } }
    end

    assert_redirected_to apiKeys_url
  end

 
  
  test "should destroy apiKey" do
    assert_difference("ApiKey.count", -1) do
      delete apiKey_url(@apiKey)
    end

    assert_redirected_to apiKeys_url
  end
  
end


