require "test_helper"

class AudienceSegmentControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @audienceSegment = audienceSegments(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create audienceSegment" do
    assert_difference("AudienceSegment.count") do
      post audienceSegments_url, params: { audienceSegment: { name:"test string for name", estimatedReach:100, description:"test string for description", ProviderType:AudienceSegment.ProviderTypes[0] } }
    end

    assert_redirected_to audienceSegments_url
  end

 
  
  test "should destroy audienceSegment" do
    assert_difference("AudienceSegment.count", -1) do
      delete audienceSegment_url(@audienceSegment)
    end

    assert_redirected_to audienceSegments_url
  end
  
end


