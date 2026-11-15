require "test_helper"

class ProductionOrderControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @production_order = production_orders(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create production_order" do
    assert_difference("ProductionOrder.count") do
      post production_orders_url, params: { production_order: {
        order_number:"test string for orderNumber", 
status:ProductionOrder.Statuss[0]
 } }
    end

    assert_redirected_to production_orders_url
  end

 
  
  test "should destroy production_order" do
    assert_difference("ProductionOrder.count", -1) do
      delete production_order_url(@production_order)
    end

    assert_redirected_to production_orders_url
  end
  
end


