require "test_helper"

class CommandInvocationControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @commandInvocation = commandInvocations(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create commandInvocation" do
    assert_difference("CommandInvocation.count") do
      post commandInvocations_url, params: { commandInvocation: { invocationId:"test string for invocationId", requestedAt:1.week.ago, completedAt:1.week.ago, Status:CommandInvocation.Statuss[0] } }
    end

    assert_redirected_to commandInvocations_url
  end

 
  
  test "should destroy commandInvocation" do
    assert_difference("CommandInvocation.count", -1) do
      delete commandInvocation_url(@commandInvocation)
    end

    assert_redirected_to commandInvocations_url
  end
  
end


