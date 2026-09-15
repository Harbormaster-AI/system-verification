require "test_helper"

class SoftwareUpdateExecutionControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @softwareUpdateExecution = softwareUpdateExecutions(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create softwareUpdateExecution" do
    assert_difference("SoftwareUpdateExecution.count") do
      post softwareUpdateExecutions_url, params: { softwareUpdateExecution: { startedAt:1.week.ago, completedAt:1.week.ago, Status:SoftwareUpdateExecution.Statuss[0] } }
    end

    assert_redirected_to softwareUpdateExecutions_url
  end

 
  
  test "should destroy softwareUpdateExecution" do
    assert_difference("SoftwareUpdateExecution.count", -1) do
      delete softwareUpdateExecution_url(@softwareUpdateExecution)
    end

    assert_redirected_to softwareUpdateExecutions_url
  end
  
end


