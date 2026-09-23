require "test_helper"

class StandingInstructionControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @_standing_instruction = _standing_instructions(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create _standing_instruction" do
    assert_difference("StandingInstruction.count") do
      post _standing_instructions_url, params: { _standing_instruction: {
                        Status:StandingInstruction.Statuss[0]
 } }
    end

    assert_redirected_to _standing_instructions_url
  end

 
  
  test "should destroy _standing_instruction" do
    assert_difference("StandingInstruction.count", -1) do
      delete _standing_instruction_url(@_standing_instruction)
    end

    assert_redirected_to _standing_instructions_url
  end
  
end


