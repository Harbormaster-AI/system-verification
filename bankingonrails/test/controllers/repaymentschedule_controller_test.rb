require "test_helper"

class RepaymentScheduleControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @_repayment_schedule = _repayment_schedules(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create _repayment_schedule" do
    assert_difference("RepaymentSchedule.count") do
      post _repayment_schedules_url, params: { _repayment_schedule: {
                        Status:RepaymentSchedule.Statuss[0]
 } }
    end

    assert_redirected_to _repayment_schedules_url
  end

 
  
  test "should destroy _repayment_schedule" do
    assert_difference("RepaymentSchedule.count", -1) do
      delete _repayment_schedule_url(@_repayment_schedule)
    end

    assert_redirected_to _repayment_schedules_url
  end
  
end


