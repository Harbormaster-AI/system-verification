require "test_helper"

class InsertionOrderControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @insertionOrder = insertionOrders(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create insertionOrder" do
    assert_difference("InsertionOrder.count") do
      post insertionOrders_url, params: { insertionOrder: { ioNumber:"test string for ioNumber", agreedBudget:"test value", flight:1.week.ago, Status:InsertionOrder.Statuss[0] } }
    end

    assert_redirected_to insertionOrders_url
  end

 
  
  test "should destroy insertionOrder" do
    assert_difference("InsertionOrder.count", -1) do
      delete insertionOrder_url(@insertionOrder)
    end

    assert_redirected_to insertionOrders_url
  end
  
end


