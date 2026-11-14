require "test_helper"

class StandingInstructionControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @standing_instruction = standing_instructions(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create standing_instruction" do
    assert_difference("StandingInstruction.count") do
      post standing_instructions_url, params: { standing_instruction: {
        instruction_id:"test string for instructionId", 
amount:"test value", 
next_execution_date:1.week.ago, 
frequency:StandingInstruction.Frequencys[0], 
status:StandingInstruction.Statuss[0]
 } }
    end

    assert_redirected_to standing_instructions_url
  end

 
  
  test "should destroy standing_instruction" do
    assert_difference("StandingInstruction.count", -1) do
      delete standing_instruction_url(@standing_instruction)
    end

    assert_redirected_to standing_instructions_url
  end
  
end


