require "test_helper"

class RepaymentScheduleControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @repayment_schedule = repayment_schedules(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create repayment_schedule" do
    assert_difference("RepaymentSchedule.count") do
      post repayment_schedules_url, params: { repayment_schedule: {
        installment_number:100, 
due_date:1.week.ago, 
principal_due:"test value", 
interest_due:"test value", 
total_due:"test value", 
status:RepaymentSchedule.Statuss[0]
 } }
    end

    assert_redirected_to repayment_schedules_url
  end

 
  
  test "should destroy repayment_schedule" do
    assert_difference("RepaymentSchedule.count", -1) do
      delete repayment_schedule_url(@repayment_schedule)
    end

    assert_redirected_to repayment_schedules_url
  end
  
end


