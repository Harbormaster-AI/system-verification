require "test_helper"

class WarehouseControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @warehouse = warehouses(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create warehouse" do
    assert_difference("Warehouse.count") do
      post warehouses_url, params: { warehouse: {
        name:"test string for name"
 } }
    end

    assert_redirected_to warehouses_url
  end

 
  
  test "should destroy warehouse" do
    assert_difference("Warehouse.count", -1) do
      delete warehouse_url(@warehouse)
    end

    assert_redirected_to warehouses_url
  end
  
end


