require "test_helper"

class DataRetentionPolicyControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @dataRetentionPolicy = dataRetentionPolicys(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create dataRetentionPolicy" do
    assert_difference("DataRetentionPolicy.count") do
      post dataRetentionPolicys_url, params: { dataRetentionPolicy: { name:"test string for name", retentionDays:100 } }
    end

    assert_redirected_to dataRetentionPolicys_url
  end

 
  
  test "should destroy dataRetentionPolicy" do
    assert_difference("DataRetentionPolicy.count", -1) do
      delete dataRetentionPolicy_url(@dataRetentionPolicy)
    end

    assert_redirected_to dataRetentionPolicys_url
  end
  
end


