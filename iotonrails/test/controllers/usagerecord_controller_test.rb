require "test_helper"

class UsageRecordControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @usageRecord = usageRecords(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create usageRecord" do
    assert_difference("UsageRecord.count") do
      post usageRecords_url, params: { usageRecord: { periodStart:1.week.ago, periodEnd:1.week.ago, messagesSent:100, dataVolumeMB:100 } }
    end

    assert_redirected_to usageRecords_url
  end

 
  
  test "should destroy usageRecord" do
    assert_difference("UsageRecord.count", -1) do
      delete usageRecord_url(@usageRecord)
    end

    assert_redirected_to usageRecords_url
  end
  
end


