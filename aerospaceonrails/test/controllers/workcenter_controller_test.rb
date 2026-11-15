require "test_helper"

class WorkCenterControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @work_center = work_centers(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create work_center" do
    assert_difference("WorkCenter.count") do
      post work_centers_url, params: { work_center: {
        name:"test string for name", 
capability:"test string for capability"
 } }
    end

    assert_redirected_to work_centers_url
  end

 
  
  test "should destroy work_center" do
    assert_difference("WorkCenter.count", -1) do
      delete work_center_url(@work_center)
    end

    assert_redirected_to work_centers_url
  end
  
end


