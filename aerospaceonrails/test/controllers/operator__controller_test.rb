require "test_helper"

class Operator_ControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @operator_ = operator_s(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create operator_" do
    assert_difference("Operator_.count") do
      post operator_s_url, params: { operator_: {
        name:"test string for name", 
icao_designator:"test string for icaoDesignator", 
operator_type:Operator_.OperatorTypes[0]
 } }
    end

    assert_redirected_to operator_s_url
  end

 
  
  test "should destroy operator_" do
    assert_difference("Operator_.count", -1) do
      delete operator__url(@operator_)
    end

    assert_redirected_to operator_s_url
  end
  
end


