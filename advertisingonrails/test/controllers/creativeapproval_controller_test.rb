require "test_helper"

class CreativeApprovalControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @creativeApproval = creativeApprovals(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create creativeApproval" do
    assert_difference("CreativeApproval.count") do
      post creativeApprovals_url, params: { creativeApproval: { reviewer:"test string for reviewer", reviewedAt:1.week.ago, Status:CreativeApproval.Statuss[0] } }
    end

    assert_redirected_to creativeApprovals_url
  end

 
  
  test "should destroy creativeApproval" do
    assert_difference("CreativeApproval.count", -1) do
      delete creativeApproval_url(@creativeApproval)
    end

    assert_redirected_to creativeApprovals_url
  end
  
end


