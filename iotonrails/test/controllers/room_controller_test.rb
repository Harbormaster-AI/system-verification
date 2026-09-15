require "test_helper"

class RoomControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @room = rooms(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create room" do
    assert_difference("Room.count") do
      post rooms_url, params: { room: { name:"test string for name" } }
    end

    assert_redirected_to rooms_url
  end

 
  
  test "should destroy room" do
    assert_difference("Room.count", -1) do
      delete room_url(@room)
    end

    assert_redirected_to rooms_url
  end
  
end


