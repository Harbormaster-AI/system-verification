require "test_helper"

class InventoryItemControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @inventory_item = inventory_items(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create inventory_item" do
    assert_difference("InventoryItem.count") do
      post inventory_items_url, params: { inventory_item: {
        quantity_on_hand:100, 
quantity_reserved:100, 
lot_number:"test string for lotNumber"
 } }
    end

    assert_redirected_to inventory_items_url
  end

 
  
  test "should destroy inventory_item" do
    assert_difference("InventoryItem.count", -1) do
      delete inventory_item_url(@inventory_item)
    end

    assert_redirected_to inventory_items_url
  end
  
end


