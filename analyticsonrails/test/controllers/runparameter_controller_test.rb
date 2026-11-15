require "test_helper"

class RunParameterControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @run_parameter = run_parameters(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create run_parameter" do
    assert_difference("RunParameter.count") do
      post run_parameters_url, params: { run_parameter: {
        name:"test string for name", 
value:"test string for value"
 } }
    end

    assert_redirected_to run_parameters_url
  end

 
  
  test "should destroy run_parameter" do
    assert_difference("RunParameter.count", -1) do
      delete run_parameter_url(@run_parameter)
    end

    assert_redirected_to run_parameters_url
  end
  
end


