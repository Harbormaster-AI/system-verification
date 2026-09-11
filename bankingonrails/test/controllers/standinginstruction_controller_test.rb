require "test_helper"

class StandingInstructionControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @standingInstruction = standingInstructions(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create standingInstruction" do
    assert_difference("StandingInstruction.count") do
      post standingInstructions_url, params: { standingInstruction: { instructionId:"test string for instructionId", amount:"test value", nextExecutionDate:1.week.ago, Frequency:StandingInstruction.Frequencys[0], Status:StandingInstruction.Statuss[0] } }
    end

    assert_redirected_to standingInstructions_url
  end

 
  
  test "should destroy standingInstruction" do
    assert_difference("StandingInstruction.count", -1) do
      delete standingInstruction_url(@standingInstruction)
    end

    assert_redirected_to standingInstructions_url
  end
  
end


