require "test_helper"

class DisputeControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @_dispute = _disputes(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create _dispute" do
    assert_difference("Dispute.count") do
      post _disputes_url, params: { _dispute: {
                        Status:Dispute.Statuss[0]
 } }
    end

    assert_redirected_to _disputes_url
  end

 
  
  test "should destroy _dispute" do
    assert_difference("Dispute.count", -1) do
      delete _dispute_url(@_dispute)
    end

    assert_redirected_to _disputes_url
  end
  
end


