require "test_helper"

class AvionicsSuiteControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @avionics_suite = avionics_suites(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create avionics_suite" do
    assert_difference("AvionicsSuite.count") do
      post avionics_suites_url, params: { avionics_suite: {
        suite_name:"test string for suiteName", 
software_baseline:"test string for softwareBaseline"
 } }
    end

    assert_redirected_to avionics_suites_url
  end

 
  
  test "should destroy avionics_suite" do
    assert_difference("AvionicsSuite.count", -1) do
      delete avionics_suite_url(@avionics_suite)
    end

    assert_redirected_to avionics_suites_url
  end
  
end


