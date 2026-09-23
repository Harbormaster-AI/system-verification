require "test_helper"

class InventorySourceControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @inventorySource = inventorySources(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create inventorySource" do
    assert_difference("InventorySource.count") do
      post inventorySources_url, params: { inventorySource: { name:"test string for name", domain:"test string for domain", Channel:InventorySource.Channels[0], PrimaryFormat:InventorySource.PrimaryFormats[0] } }
    end

    assert_redirected_to inventorySources_url
  end

 
  
  test "should destroy inventorySource" do
    assert_difference("InventorySource.count", -1) do
      delete inventorySource_url(@inventorySource)
    end

    assert_redirected_to inventorySources_url
  end
  
end


