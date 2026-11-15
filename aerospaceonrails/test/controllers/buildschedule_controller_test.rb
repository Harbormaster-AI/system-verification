require "test_helper"

class BuildScheduleControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @build_schedule = build_schedules(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create build_schedule" do
    assert_difference("BuildSchedule.count") do
      post build_schedules_url, params: { build_schedule: {
        schedule_number:"test string for scheduleNumber", 
status:BuildSchedule.Statuss[0]
 } }
    end

    assert_redirected_to build_schedules_url
  end

 
  
  test "should destroy build_schedule" do
    assert_difference("BuildSchedule.count", -1) do
      delete build_schedule_url(@build_schedule)
    end

    assert_redirected_to build_schedules_url
  end
  
end


