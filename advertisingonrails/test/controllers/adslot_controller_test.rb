require "test_helper"

class AdSlotControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @adSlot = adSlots(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create adSlot" do
    assert_difference("AdSlot.count") do
      post adSlots_url, params: { adSlot: { slotCode:"test string for slotCode", width:100, height:100, floorPrice:"test value", Format:AdSlot.Formats[0] } }
    end

    assert_redirected_to adSlots_url
  end

 
  
  test "should destroy adSlot" do
    assert_difference("AdSlot.count", -1) do
      delete adSlot_url(@adSlot)
    end

    assert_redirected_to adSlots_url
  end
  
end


