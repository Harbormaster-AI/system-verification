require "test_helper"

class LineItemControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @lineItem = lineItems(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create lineItem" do
    assert_difference("LineItem.count") do
      post lineItems_url, params: { lineItem: { name:"test string for name", bidAmount:"test value", dailyBudget:"test value", frequencyCap:"test value", Status:LineItem.Statuss[0], PricingModel:LineItem.PricingModels[0], BidStrategy:LineItem.BidStrategys[0], Pacing:LineItem.Pacings[0] } }
    end

    assert_redirected_to lineItems_url
  end

 
  
  test "should destroy lineItem" do
    assert_difference("LineItem.count", -1) do
      delete lineItem_url(@lineItem)
    end

    assert_redirected_to lineItems_url
  end
  
end


