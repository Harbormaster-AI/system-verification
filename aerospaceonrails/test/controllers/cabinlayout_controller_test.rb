require "test_helper"

class CabinLayoutControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @cabin_layout = cabin_layouts(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create cabin_layout" do
    assert_difference("CabinLayout.count") do
      post cabin_layouts_url, params: { cabin_layout: {
        layout_code:"test string for layoutCode", 
total_seats:100, 
class_layout:"test string for classLayout"
 } }
    end

    assert_redirected_to cabin_layouts_url
  end

 
  
  test "should destroy cabin_layout" do
    assert_difference("CabinLayout.count", -1) do
      delete cabin_layout_url(@cabin_layout)
    end

    assert_redirected_to cabin_layouts_url
  end
  
end


