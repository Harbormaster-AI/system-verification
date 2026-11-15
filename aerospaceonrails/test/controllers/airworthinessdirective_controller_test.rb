require "test_helper"

class AirworthinessDirectiveControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @airworthiness_directive = airworthiness_directives(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create airworthiness_directive" do
    assert_difference("AirworthinessDirective.count") do
      post airworthiness_directives_url, params: { airworthiness_directive: {
        directive_number:"test string for directiveNumber", 
title:"test string for title"
 } }
    end

    assert_redirected_to airworthiness_directives_url
  end

 
  
  test "should destroy airworthiness_directive" do
    assert_difference("AirworthinessDirective.count", -1) do
      delete airworthiness_directive_url(@airworthiness_directive)
    end

    assert_redirected_to airworthiness_directives_url
  end
  
end


