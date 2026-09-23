require "test_helper"

class DealControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @deal = deals(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create deal" do
    assert_difference("Deal.count") do
      post deals_url, params: { deal: { floorPrice:"test value", DealType:Deal.DealTypes[0] } }
    end

    assert_redirected_to deals_url
  end

 
  
  test "should destroy deal" do
    assert_difference("Deal.count", -1) do
      delete deal_url(@deal)
    end

    assert_redirected_to deals_url
  end
  
end


