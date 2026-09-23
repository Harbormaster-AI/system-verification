require "test_helper"

class RepaymentScheduleControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @repaymentSchedule = repaymentSchedules(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create repaymentSchedule" do
    assert_difference("RepaymentSchedule.count") do
      post repaymentSchedules_url, params: { repaymentSchedule: { installmentNumber:100, dueDate:1.week.ago, principalDue:"test value", interestDue:"test value", totalDue:"test value", Status:RepaymentSchedule.Statuss[0] } }
    end

    assert_redirected_to repaymentSchedules_url
  end

 
  
  test "should destroy repaymentSchedule" do
    assert_difference("RepaymentSchedule.count", -1) do
      delete repaymentSchedule_url(@repaymentSchedule)
    end

    assert_redirected_to repaymentSchedules_url
  end
  
end


