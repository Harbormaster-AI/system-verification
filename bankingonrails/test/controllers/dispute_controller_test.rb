require "test_helper"

class DisputeControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @dispute = disputes(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create dispute" do
    assert_difference("Dispute.count") do
      post disputes_url, params: { dispute: { disputeReference:"test string for disputeReference", raisedOn:1.week.ago, reason:"test string for reason", Status:Dispute.Statuss[0] } }
    end

    assert_redirected_to disputes_url
  end

 
  
  test "should destroy dispute" do
    assert_difference("Dispute.count", -1) do
      delete dispute_url(@dispute)
    end

    assert_redirected_to disputes_url
  end
  
end


