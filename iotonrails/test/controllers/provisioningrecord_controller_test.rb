require "test_helper"

class ProvisioningRecordControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @provisioningRecord = provisioningRecords(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create provisioningRecord" do
    assert_difference("ProvisioningRecord.count") do
      post provisioningRecords_url, params: { provisioningRecord: { enrolledAt:1.week.ago, provisioningService:"test string for provisioningService", Method:ProvisioningRecord.Methods[0], Status:ProvisioningRecord.Statuss[0] } }
    end

    assert_redirected_to provisioningRecords_url
  end

 
  
  test "should destroy provisioningRecord" do
    assert_difference("ProvisioningRecord.count", -1) do
      delete provisioningRecord_url(@provisioningRecord)
    end

    assert_redirected_to provisioningRecords_url
  end
  
end


